import { LuFile, LuFileCode, LuFileText, LuImage, LuMusic, LuVideo } from 'react-icons/lu';
import { ComponentProps } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  mimetype: string;
} & ComponentProps<IconType>;

export function FileIcon({ mimetype, ...props }: Props) {
  const Icon = MimeToIcon[mimetype] || LuFile;
  return <Icon {...props}></Icon>;
}

const MimeToIcon = {
  'text/plain': LuFileText,
  'text/html': LuFileCode,
  'text/css': LuFileCode,
  'application/javascript': LuFileCode,
  'application/json': LuFileCode,
  'application/xml': LuFileCode,
  'application/pdf': LuFileText,
  'application/msword': LuFileText,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
  LuFileText,
  'application/vnd.ms-excel': LuFileText,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': LuFileText,
  'application/vnd.ms-powerpoint': LuFileText,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
  LuFileText,
  'image/jpeg': LuImage,
  'image/png': LuImage,
  'image/gif': LuImage,
  'image/svg+xml': LuImage,
  'audio/mpeg': LuMusic,
  'audio/ogg': LuMusic,
  'audio/*': LuMusic,
  'video/mp4': LuVideo,
  'video/x-matroska': LuVideo,
  'video/quicktime': LuVideo,
  'video/*': LuVideo,
};

export default FileIcon;
