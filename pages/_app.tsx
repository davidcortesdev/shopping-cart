import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../src/app/globals.css";
import { Inter, Montserrat, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CartProvider>
        <main className={`${inter.variable} ${montserrat.variable} ${poppins.variable}`}>
          <Component {...pageProps} />
        </main>
      </CartProvider>
    </ThemeProvider>
  );
}

export default MyApp;