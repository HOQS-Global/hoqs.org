import ImageCarousel from "../../images/ImageCarousel"

type Props = { src: string, alt?: string, title?: string }

export default function Image({src, alt, title}: Props) {
  return <ImageCarousel
        images={[
            {
            title: title ?? alt ?? 'No Title',
            url: src ?? '',
            updatedAt: '',
            createdAt: '',
            size: 0,
            mimetype: '',
            },
        ]}
    />
}