import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="center">
      <h1 className="page-title">Sidan hittades inte</h1>
      <p>Sidan du letar efter finns inte eller har flyttats.</p>
      <Link to="/" className="button">
        Tillbaka till startsidan
      </Link>
    </section>
  );
}

export default NotFound;