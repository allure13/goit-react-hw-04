import css from './ImageCard.module.css';

export default function ImageCard({ image, onOpenModal }) {
  return (
    <li>
      <div onClick={() => onOpenModal(image)}>
        <img
          className={css.img}
          src={image.urls.small}
          alt={image.urls.description}
        />
      </div>
    </li>
  );
}
