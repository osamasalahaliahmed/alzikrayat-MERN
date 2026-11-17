import { useState } from "react";

function CommentForm({ photoId, setComments, setUser }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addComment = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/photos/${photoId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment.trim() }),
      });
      const data = await response.json();
      if (response.status === 401) {
        setUser(null);
        return;
      }
      if (!response.ok) {
        setError(typeof data === "string" ? data : data.message || "Could not add comment.");
        return;
      }

      setComments((comments) => [...comments, data.comment]);
      setComment("");
      setMessage("Comment added.");
    } catch (error) {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addComment} className="commentForm">
      <label htmlFor="comment">Add a comment</label>
      <textarea id="comment" rows={3} required value={comment} disabled={loading} onChange={(event) => setComment(event.target.value)} />
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post comment"}</button>
    </form>
  );
}

export default CommentForm;
