import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeletePhoto({ photoId, setUser }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const remove = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/photos/${photoId}`, { method: "DELETE" });
      const data = await response.json();
      if (response.status === 401) {
        setUser(null);
        return;
      }
      if (!response.ok) {
        setError(typeof data === "string" ? data : data.message || "Could not delete photo.");
        return;
      }
      navigate("/photos");
    } catch (error) {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deletePhoto">
      {confirm ? (
        <>
          <p>Delete this photo and all its comments? This cannot be undone.</p>
          <div className="deleteButtons">
            <button type="button" disabled={loading} onClick={remove}>{loading ? "Deleting..." : "Confirm delete"}</button>
            <button type="button" disabled={loading} onClick={() => {
              setConfirm(false);
              setError("");
            }}>Cancel</button>
          </div>
        </>
      ) : (
        <button type="button" onClick={() => setConfirm(true)}>Delete photo</button>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default DeletePhoto;
