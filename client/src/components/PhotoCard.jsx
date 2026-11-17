import { Link } from "react-router-dom";

function PhotoCard({ photo }) {
  return (
    <article className="photoCard">
      <Link to={`/photos/${photo._id}`} className="photoLink">
        <img src={`/uploads/${encodeURIComponent(photo.fileName)}`} alt={photo.title} loading="lazy" />
      </Link>
      <div className="photoInfo">
        <h2><Link to={`/photos/${photo._id}`}>{photo.title}</Link></h2>
        {photo.description && <p>{photo.description}</p>}
        <p>{new Date(photo.dateTime).toLocaleDateString()}</p>
      </div>
    </article>
  );
}

export default PhotoCard;
