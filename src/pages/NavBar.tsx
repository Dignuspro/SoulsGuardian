import Link from 'next/link';
import { auth } from '../firebase';
import { useRouter } from 'next/router';

function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
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