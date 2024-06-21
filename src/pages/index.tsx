import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Home.module.css";
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Control Parental</title>
        <meta name="description" content="Bienvenido a la aplicación de control parental" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>¡Bienvenido a Control Parental!</h1>
        <p className={styles.description}>
          Esta es tu página de inicio personalizada.
        </p>
      </main>
    </div>
  );
};

export default Home;