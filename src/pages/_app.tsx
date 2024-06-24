import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from './NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;