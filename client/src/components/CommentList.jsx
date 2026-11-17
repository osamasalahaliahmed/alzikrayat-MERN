function CommentList({ comments }) {
  return (
    <section className="comments">
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((comment) => (
        <article className="comment" key={comment._id}>
          <p><strong>{comment.userId ? `${comment.userId.firstName} ${comment.userId.lastName}` : "Unknown user"}</strong></p>
          <p className="commentText">{comment.comment}</p>
          <p>{new Date(comment.dateTime).toLocaleString()}</p>
        </article>
      ))}
    </section>
  );
}

export default CommentList;
