import { Button } from '@heroui/react';
import { AbstractStorageFile } from '@hoqs/core-components';
import React, { useRef } from 'react';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';
import { supabase } from '../helpers/supabase';
import { useFileUpdater } from '../helpers/upload';

type Props<T> = {
  file: T;
  allowedTypes?: string[];
  setFile: (file: T) => void;
} & React.ComponentProps<typeof Button>;

export function UploaderReplacerButton<T extends AbstractStorageFile>({
  file,
  allowedTypes,
  setFile,
  children,
  ...props
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const updateFile = useFileUpdater({
      allowedTypes,
      fileToReplace: file,
  });

  function uploadFile(files: File[]) {
    if (files.length > 1 || files.length === 0) {
      toast.error('You can only upload 1 file at a time');
    }
    const file = files[0];

    updateFile(file).then((newFile) => {
      setFile(newFile);
    });
  }

  return (
    <Dropzone onDrop={uploadFile}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            onDrop: (event) => event.stopPropagation(),
          })}
          ref={inputRef}
        >
          <Button
            {...props}
            onPress={(e) => {
              inputRef.current?.click();
              props.onPress?.(e);
            }}
          >
            {children}
          </Button>
          <input id="dropzone-file" {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
}

export default UploaderReplacerButton;
