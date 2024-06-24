import Link from 'next/link';
import { auth } from '../firebase';

function NavBar() {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around text-white">
        <li><Link href="/"><a>Inicio</a></Link></li>
        <li><Link href="/profile"><a>Perfil</a></Link></li>
        <li><Link href="/monitoring"><a>Monitoreo</a></Link></li>
        <li><Link href="/settings"><a>Configuraciones</a></Link></li>
        <li><Link href="/reports"><a>Reportes</a></Link></li>
        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;