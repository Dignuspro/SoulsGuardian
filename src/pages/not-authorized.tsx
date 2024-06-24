// src/pages/not-authorized.tsx
import Link from 'next/link';

function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">No Autorizado</h1>
        <p>No tienes permiso para acceder a esta página.</p>
        <Link href="/">
          <a className="mt-4 p-2 text-white bg-blue-500 rounded">Volver a Inicio</a>
        </Link>
      </div>
    </div>
  );
}

export default NotAuthorized;