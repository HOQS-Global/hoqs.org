import toast from 'react-hot-toast';
import { removeFileExtension } from './translations';
import { supabase } from './supabase';
import { useMemo } from 'react';
import { AbstractStorageFile } from '@hoqs/core-components';

type FileUploaderProps = {
  allowedTypes: string[] | undefined;
  supabasePath: string;
  supabaseBucket: string;
};

export function useFileUploader({
  allowedTypes,
  supabasePath,
  supabaseBucket
}: FileUploaderProps) {
  const uploadFiles = useMemo(() => {
    return async function uploadFile(file: File): Promise<AbstractStorageFile> {
      return new Promise((resolve, reject) => {
        if (!filetypeIsAllowed(file, allowedTypes)) {
          reject();
          return;
        }

        toast.promise(
          uploadToSupabase(file, supabasePath, supabaseBucket, resolve),
          {
            loading: `Uploading ${file.name}`,
            success: `Successfully uploaded ${file.name}`,
            error: (err) => {
              reject(`Failed to upload ${file.name} - ${err.message}`);
              return `Failed to upload ${file.name} - ${err.message}`;
            },
          }
        );
      });
    };
  }, [allowedTypes, supabasePath, supabaseBucket]);

  return uploadFiles;
}

export function filetypeIsAllowed(
  file: File,
  allowedTypes: string[] | undefined
) {
  if (allowedTypes === undefined) return true;

  if (!allowedTypes.includes(file.type)) {
    toast.error(`File type ${file.type} is not allowed`);
    return false;
  }
  return true;
}

export async function uploadToSupabase(
  file: File,
  supabasePath: string,
  supabaseBucket: string,
  onFileUploaded: (file: AbstractStorageFile) => void
) {
  const uploadPath = supabasePath + '/' + file.name;

  const { data, error } = await supabase.storage
    .from(supabaseBucket)
    .upload(uploadPath, file);

  // @ts-expect-error error.error is not defined in the Supabase error type
  if (error && error.error !== 'Duplicate') throw error;

  const url = supabase.storage
    .from(supabaseBucket)
    .getPublicUrl(data?.path || uploadPath);
  onFileUploaded({
    title: removeFileExtension(file.name),
    size: file.size,
    mimetype: file.type,
    url: url.data.publicUrl,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });

  // If the file already exists, we throw an error to let the user know that the file was not uploaded,
  // but we still return the file, so that the user can use the existing file.
  if (error)
    throw new Error(
      'File of same name already exists. Opted to use existing file in cloud storage. If the current file is deprecated or wrong, please rename the file to be uploaded and try again.'
    );
}

type FileUpdaterProps<T extends AbstractStorageFile> = {
  allowedTypes: string[] | undefined;
  fileToReplace: T;
}

export function useFileUpdater<T extends AbstractStorageFile>({
  allowedTypes,
  fileToReplace,
}: FileUpdaterProps<T>) {
  const uploadFiles = useMemo(() => {
    return async function uploadFile(newFile: File): Promise<T> {
      return new Promise((resolve, reject) => {
        if (!filetypeIsAllowed(newFile, allowedTypes)) {
          reject();
          return;
        }

        toast.promise(
          updateFileOnSupabase(newFile, fileToReplace, resolve),
          {
            loading: `Uploading ${newFile.name}`,
            success: `Successfully uploaded ${newFile.name}`,
            error: (err) => {
              reject(`Failed to upload ${newFile.name} - ${err.message}`);
              return `Failed to upload ${newFile.name} - ${err.message}`;
            },
          }
        );
      });
    };
  }, [allowedTypes, fileToReplace]);

  return uploadFiles;
}

async function updateFileOnSupabase<T extends AbstractStorageFile>(newFile: File, oldFile: T, onFileUploaded: (file: T) => void) {
    const totalPath = oldFile.url.split('/storage/v1/object/public/')?.[1];
    const bucket = totalPath?.split('/')?.[0];
    const path = totalPath?.substring(bucket?.length + 1);
    if (!totalPath || !path || !bucket) throw new Error('Invalid path');

    const { error } = await supabase.storage
      .from(bucket)
      .update(path, newFile, {
        upsert: true,
      });

    if (error) throw error;

    onFileUploaded({
      ...oldFile,
      updatedAt: new Date().toISOString(),
      mimetype: newFile.type,
      size: newFile.size,
    });
  }