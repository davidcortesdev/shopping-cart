import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";
import "../src/app/globals.css";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <CartProvider>
      <div style={{position: "fixed", top: 18, left: 18, zIndex: 9999}}>
        <button
          className="darkmode-switch"
          onClick={() => setDark((d) => !d)}
          aria-label="Alternar modo oscuro"
        >
          {/* Elimina los iconos, solo deja el slider */}
          <span className={`slider ${dark ? "slider-dark" : ""}`}></span>
        </button>
      </div>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;