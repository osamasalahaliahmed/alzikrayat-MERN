import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard.jsx";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    const getPhotos = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/photos");
        if (!response.ok) {
          throw new Error("Could not load photos. Please try again.");
        }
        const data = await response.json();
        if (active) {
          setPhotos(data.photos);
        }
      } catch (error) {
        if (active) {
          setError("Could not load photos. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getPhotos();
    return () => {
      active = false;
    };
  }, [retry]);

  return (
    <>
      <div className="galleryToolbar">
        <h1>Gallery</h1>
        <div className="viewButtons">
          <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>Grid</button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
        </div>
      </div>
      {loading && <p role="status">Loading photos...</p>}
      {!loading && error && (
        <div>
          <p role="alert">{error}</p>
          <button type="button" onClick={() => setRetry(retry + 1)}>Try again</button>
        </div>
      )}
      {!loading && !error && photos.length === 0 && <p>No photos yet.</p>}
      {!loading && !error && (
        <div className={view === "grid" ? "photoGrid" : "photoList"}>
          {photos.map((photo) => <PhotoCard key={photo._id} photo={photo} />)}
        </div>
      )}
    </>
  );
}

export default Gallery;
