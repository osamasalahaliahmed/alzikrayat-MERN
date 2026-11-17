import { useState } from "react";
import { Link } from "react-router-dom";

function AddPhoto({ user, setUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setMessage("");

    if (!photo) {
      setError("Please choose a photo.");
      return;
    }
    if (photo.size > 5 * 1024 * 1024) {
      setError("Photo must be 5 MB or smaller.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("photo", photo);
    setLoading(true);

    try {
      const response = await fetch("/api/photos", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.status === 401) {
        setUser(null);
        return;
      }
      if (!response.ok) {
        setError(typeof result === "string" ? result : result.message || "Could not upload photo.");
        return;
      }

      setTitle("");
      setDescription("");
      setPhoto(null);
      form.reset();
      setMessage("Photo uploaded successfully.");
    } catch (error) {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Please <Link to="/login">log in</Link> to upload a photo.</p>;
  }

  return (
    <section className="uploadPage">
      <h1>Add Photo</h1>
      <p>JPEG, PNG, or WebP. Maximum size: 5 MB.</p>
      {message && <p role="status">{message} <Link to="/photos">View gallery</Link></p>}
      <form onSubmit={upload} className="uploadForm">
        <label htmlFor="title">Title</label>
        <input id="title" required value={title} disabled={loading} onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="description">Description (optional)</label>
        <textarea id="description" rows={3} value={description} disabled={loading} onChange={(event) => setDescription(event.target.value)} />
        <label htmlFor="photo">Photo</label>
        <input id="photo" type="file" accept="image/jpeg,image/png,image/webp" required disabled={loading} onChange={(event) => setPhoto(event.target.files[0])} />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
      </form>
    </section>
  );
}

export default AddPhoto;
