export default function ImageCard({ image, onClick }) {
  return (
    <li>
      <div onClick={onClick}>
        <img src={image.urls.small} alt={image.urls.description} />
      </div>
    </li>
  );
}
