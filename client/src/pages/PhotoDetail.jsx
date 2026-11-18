import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentList from "../components/CommentList.jsx";
import CommentForm from "../components/CommentForm.jsx";
import DeletePhoto from "../components/DeletePhoto.jsx";

function PhotoDetail({ user, setUser }) {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    const getPhoto = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/photos/${id}`);
        if (!response.ok) {
          if (response.status === 404 || response.status === 400) {
            throw new Error("Photo not found.");
          }
          throw new Error("Could not load photo. Please try again.");
        }
        const data = await response.json();
        if (active) {
          setPhoto(data.foundPhoto);
          setComments(data.comments);
        }
      } catch (error) {
        if (active) {
          setError(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    getPhoto();
    return () => {
      active = false;
    };
  }, [id, retry]);

  return (
    <section className="photoDetail">
      <Link to="/photos">Back to gallery</Link>
      {loading && <p role="status">Loading photo...</p>}
      {!loading && error && (
        <div>
          <p role="alert">{error}</p>
          <button type="button" onClick={() => setRetry(retry + 1)}>Try again</button>
        </div>
      )}
      {!loading && !error && photo && (
        <>
          <h1>{photo.title}</h1>
          <img className="fullPhoto" src={`/uploads/${encodeURIComponent(photo.fileName)}`} alt={photo.title} />
          {photo.description && <p className="photoDescription">{photo.description}</p>}
          <p>Uploaded by {photo.userId ? `${photo.userId.firstName} ${photo.userId.lastName}` : "Unknown user"}</p>
          <p>{new Date(photo.dateTime).toLocaleString()}</p>
          {user && user.id === photo.userId?._id && (
            <DeletePhoto key={photo._id} photoId={photo._id} setUser={setUser} />
          )}
          <CommentList comments={comments} />
          {user ? (
            <CommentForm key={photo._id} photoId={photo._id} setComments={setComments} setUser={setUser} />
          ) : (
            <p>Please <Link to="/login">log in</Link> to add a comment.</p>
          )}
        </>
      )}
    </section>
  );
}

export default PhotoDetail;
