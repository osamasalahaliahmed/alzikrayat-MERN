function PhotoCard({ photo }) {
  return (
    <article className="photoCard">
      <img src={`/uploads/${encodeURIComponent(photo.fileName)}`} alt={photo.title} loading="lazy" />
      <div className="photoInfo">
        <h2>{photo.title}</h2>
        {photo.description && <p>{photo.description}</p>}
        <p>{new Date(photo.dateTime).toLocaleDateString()}</p>
      </div>
    </article>
  );
}

export default PhotoCard;
