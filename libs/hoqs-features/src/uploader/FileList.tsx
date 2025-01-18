import {
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from '@heroui/react';
import { BadgeList, ButtonWithConfirm, FILE_BADGES, FileIcon, StorageFile } from '@hoqs/core-components';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import FileEditForm from './FileEditForm';
import { formatBytes } from '../helpers/translations';


interface Props {
  files: StorageFile[] | null;
  setFiles?: (files: StorageFile[] | null) => void;
}

export function FileList({ files, setFiles }: Props) {
  function deleteFile(index: number) {
    if (setFiles) {
      setFiles(files?.filter((_, i) => i !== index) || []);
    }
  }

  function updateFile(index: number, file: StorageFile) {
    if (setFiles) {
      setFiles(files?.map((f, i) => (i === index ? file : f)) || [file]);
    }
  }

  function downloadFile(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    file: StorageFile
  ) {
    // Prevent the download from happening when clicking on the buttons
    // @ts-expect-error target type does not have closest, but it does
    if (!e.target.closest('tr')) return;
    const a = document.createElement('a');
    a.href = file.url;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.download = file.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <Table selectionMode="single" aria-label="A Table of files">
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No files to display.'}>
        {files
          ? files.map((file, index) => (
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={(e) => downloadFile(e, file)}
              >
                <TableCell className="flex gap-2">
                  {setFiles && (
                    <>
                      <ButtonWithConfirm
                        title={`Are you sure you want to delete ${file.title}`}
                        description="After deleting the file, the file will become unaccessable. The change happens after you save the changes."
                        onConfirm={() => deleteFile(index)}
                        isIconOnly
                        color="danger"
                      >
                        <LuTrash2 />
                      </ButtonWithConfirm>
                      <FileEditForm
                        onChange={(changedFile) =>
                          updateFile(index, changedFile)
                        }
                        initialFile={file}
                        isIconOnly
                        color="primary"
                      >
                        <LuPencil />
                      </FileEditForm>
                    </>
                  )}
                  <FileIcon className="w-12 h-12" mimetype={file.mimetype} />
                  <div className="block">
                    {file.title}{' '}
                    <span className="text-default-400">
                      {formatBytes(file.size)} - {file.mimetype.split('/')[1]}
                    </span>
                    <BadgeList
                      size="sm"
                      badges={file.badges}
                      badgeTypes={FILE_BADGES}
                    />
                  </div>
                </TableCell>
                <TableCell>{file.description}</TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
}

export default FileList;
