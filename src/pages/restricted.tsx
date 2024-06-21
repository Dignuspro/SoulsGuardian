import Link from 'next/link';

function Restricted() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Acceso Restringido</h1>
        <p>No tienes permiso para acceder a este sitio.</p>
        <Link href="/">
          <a className="text-blue-500">Volver al inicio</a>
        </Link>
      </div>
    </div>
  );
}

export default Restricted;