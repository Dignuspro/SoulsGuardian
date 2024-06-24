import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from "../styles/Home.module.css";
import withSettings from '../components/withSettings';

const Home: NextPage = ({ settings }: any) => {
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
        <div>
          <h2>Configuración de Filtrado</h2>
          <pre>{JSON.stringify(settings, null, 2)}</pre>
          <div>
            <h3>Categorías Permitidas</h3>
            <ul>
              {settings.allowedCategories.map((category: string, index: number) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
            <h3>Categorías Bloqueadas</h3>
            <ul>
              {settings.blockedCategories.map((category: string, index: number) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
            <h3>Lista Blanca</h3>
            <ul>
              {settings.whitelist.map((site: string, index: number) => (
                <li key={index}>{site}</li>
              ))}
            </ul>
            <h3>Lista Negra</h3>
            <ul>
              {settings.blacklist.map((site: string, index: number) => (
                <li key={index}>{site}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withSettings(Home);