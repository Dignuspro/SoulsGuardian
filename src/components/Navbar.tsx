// src/components/Navbar.tsx
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex items-center justify-between p-6 bg-gray-800">
      <div className="text-white">
        <Link href="/">
          <a className="text-lg font-bold">Control Parental</a>
        </Link>
      </div>
      <div className="flex items-center">
        {!loading && (
          <>
            {!user && (
              <>
                <Link href="/login">
                  <a className="mx-2 text-white">Login</a>
                </Link>
                <Link href="/register">
                  <a className="mx-2 text-white">Registro</a>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link href="/profile">
                  <a className="mx-2 text-white">Perfil</a>
                </Link>
                <Link href="/settings">
                  <a className="mx-2 text-white">Configuraciones</a>
                </Link>
                <Link href="/monitoring">
                  <a className="mx-2 text-white">Monitorización</a>
                </Link>
                <Link href="/reports">
                  <a className="mx-2 text-white">Reportes</a>
                </Link>
                <button onClick={() => auth.signOut()} className="mx-2 text-white">
                  Salir
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;