import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="banner">
        <h1>Welcome to Alzikrayat</h1>
        <p>A place to share your photos and the memories behind them.</p>
        <Link to="/photos">Browse photos</Link>
      </section>
      <section id="about" className="about">
        <h2>Keep your memories together</h2>
        <p>
          Share your favorite moments, explore photos from others, and leave a
          comment on the memories you enjoy.
        </p>
      </section>
    </>
  );
}

export default Home;
