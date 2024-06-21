import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from "../styles/Home.module.css";

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
        <div className={styles.grid}>
          <a href="/profile" className={styles.card}>
            <h3>Perfil &rarr;</h3>
            <p>Ver y actualizar tu perfil.</p>
          </a>
          <a href="/monitoring" className={styles.card}>
            <h3>Monitoreo &rarr;</h3>
            <p>Monitorea la actividad en línea de tus hijos.</p>
          </a>
          <a href="/settings" className={styles.card}>
            <h3>Configuraciones &rarr;</h3>
            <p>Configuraciones de control parental.</p>
          </a>
          <a href="/reports" className={styles.card}>
            <h3>Reportes &rarr;</h3>
            <p>Ver reportes de actividad.</p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;