// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDisclosure } from '@heroui/react';
import ImageFullscreenButton from './ImageFullscreenButton';
import { useEffect, useState } from 'react';
import ImageDescription from './ImageDescription';
import ImageEditForm from './ImageEditForm';
import { ButtonWithConfirm } from '@hoqs/core-components';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import { StorageImage } from './ImageTypes';

interface Props {
  images: StorageImage[] | null;
  isFullscreen?: boolean;
  initialSlide?: number;
  setImages?: (images: StorageImage[]) => void;
  className?: string;
}

export function ImageCarousel({
  images,
  isFullscreen = false,
  initialSlide = 0,
  setImages,
  className,
}: Props) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const currentImage = images?.[slideIndex];

  /* useEffect(() => {
    // If fullscreen add event listener to a arrows to navigate
    if (isFullscreen && images) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
          setSlideIndex((index) =>
            index + 1 < images.length ? index + 1 : index
          );
        } else if (e.key === 'ArrowLeft') {
          setSlideIndex((index) => (index - 1 >= 0 ? index - 1 : index));
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen]); */

  function deleteImage(index: number) {
    setImages?.(images?.filter((_, i) => i !== index) || []);
  }

  function setImage(index: number, image: StorageImage) {
    setImages?.(images?.map((img, i) => (i === index ? image : img)) || []);
  }

  return (
    <>
      {isFullscreen && <ImageDescription image={currentImage} />}
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: isFullscreen,
        }}
        navigation={true}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => {
          setSlideIndex(swiper.activeIndex);
        }}
        className={`w-full h-full rounded-lg ${
          isFullscreen ? '' : 'max-h-[30rem]'
        } ${className ?? ''}`}
        onClick={onOpen}
      >
        {images?.map((image, i) => (
          <SwiperSlide key={i + image.url} className="w-full h-full">
            <div
              className={`flex justify-center items-center w-full max-h-full max-w-full ${
                isFullscreen ? 'h-full' : 'h-[30rem]'
              } ${className ?? ''}`}
            >
              <img
                src={image.url}
                className="object-contain h-full w-full max-w-full max-h-full"
                alt={'image of ' + image.title}
              />
            </div>
          </SwiperSlide>
        ))}
        {setImages && currentImage && (
          <div className="absolute flex gap-2 top-2 right-2 z-10">
            <ImageEditForm
              isIconOnly
              color="secondary"
              initialImage={currentImage}
              onChange={(image) => setImage(slideIndex, image)}
            >
              <LuPencil/>
            </ImageEditForm>
            <ButtonWithConfirm
              title="Are you sure?"
              description="Are you sure you want to delete this image? This action cannot be undone."
              cancelText="Cancel"
              color="danger"
              onConfirm={() => deleteImage(slideIndex)}
              isIconOnly
            >
              <LuTrash2/>
            </ButtonWithConfirm>
          </div>
        )}
      </Swiper>
      {images && !isFullscreen && (
        <ImageFullscreenButton
          images={images}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          initialSlide={slideIndex}
        />
      )}
    </>
  );
}

export default ImageCarousel;
