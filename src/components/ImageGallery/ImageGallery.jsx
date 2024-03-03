import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul>
      {images.map(image => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </ul>
  );
}
