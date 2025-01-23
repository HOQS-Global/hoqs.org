
import { AbstractStorageFile, ImageCarousel, StorageImage } from '@hoqs/core-components';
import Uploader from './Uploader';

interface Props {
  images: StorageImage[] | null;
  setImages: (images: StorageImage[]) => void;
  bucket: string;
  path: string;
}

export function ImageUploader({ images, setImages, path, bucket }: Props) {
  function addImages(files: AbstractStorageFile[]) {
    if (!images) {
      setImages(files);
      return;
    }

    setImages([...images, ...files]);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Uploader
        supabaseBucket={bucket}
        supabasePath={path}
        onFilesUploaded={addImages}
        subtitle="PNG, JPG or SVG"
        allowedTypes={allowedFileTypes}
      />
      <ImageCarousel images={images} setImages={setImages} />
    </div>
  );
}

const allowedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/jpg',
  'image/svg',
];

export default ImageUploader;
