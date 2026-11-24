import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const { state } = useLocation();

  return (
    <section className="center">
      <h1 className="page-title">Tack för din beställning!</h1>

      {state && (
        <p>
          Tack {state.name}! Din beställning med {state.itemCount}{" "}
          {state.itemCount === 1 ? "vara" : "varor"} är mottagen.
        </p>
      )}

      <p>
        Vi skickar ett mejl när paketet är på väg. (Det här är en övningsbutik
        – ingenting skickas på riktigt.)
      </p>
      <Link to="/products" className="button">
        Fortsätt handla
      </Link>
    </section>
  );
}

export default OrderConfirmation;