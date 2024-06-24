// settings.tsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

interface Settings {
  blockedCategories: string[];
  allowedCategories: string[];
  whitelist: string[];
  blacklist: string[];
  [key: string]: any;
}

function SettingsPage() {
  const [user, loading] = useAuthState(auth);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const fetchUserRole = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role) {
          setRole(userDoc.data().role);
          if (userDoc.data().role !== 'padre') {
            router.push('/'); // Redirige a la página de inicio si no es 'padre'
          }
        }
      };
      fetchUserRole();
    } else if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (role === 'padre') {
      const fetchSettings = async () => {
        const settingsDoc = await getDoc(doc(db, 'settings', 'filtering'));
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data() as Settings);
        }
      };
      fetchSettings();
    }
  }, [role]);

  const handleSave = async () => {
    if (settings) {
      const settingsDoc = doc(db, 'settings', 'filtering');
      await updateDoc(settingsDoc, settings);
      alert('Configuración actualizada');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      const { name, value } = e.target;
      setSettings({ ...settings, [name]: value.split(',') }); // asume que los inputs son cadenas separadas por comas
    }
  };

  return role === 'padre' ? (
    settings ? (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-4 text-2xl font-bold">Configuraciones de Filtro</h1>
        <div>
          <label>Categorías Bloqueadas:</label>
          <input
            type="text"
            name="blockedCategories"
            value={settings.blockedCategories.join(',')}
            onChange={handleChange}
            className="mb-2"
          />
        </div>
        <div>
          <label>Categorías Permitidas:</label>
          <input
            type="text"
            name="allowedCategories"
            value={settings.allowedCategories.join(',')}
            onChange={handleChange}
            className="mb-2"
          />
        </div>
        <div>
          <label>Lista Blanca:</label>
          <input
            type="text"
            name="whitelist"
            value={settings.whitelist.join(',')}
            onChange={handleChange}
            className="mb-2"
          />
        </div>
        <div>
          <label>Lista Negra:</label>
          <input
            type="text"
            name="blacklist"
            value={settings.blacklist.join(',')}
            onChange={handleChange}
            className="mb-2"
          />
        </div>
        <button onClick={handleSave} className="p-2 mt-4 text-white bg-blue-500 rounded">
          Guardar Cambios
        </button>
      </div>
    ) : (
      <div>Loading...</div>
    )
  ) : (
    <div>No tienes permiso para ver esta página</div>
  );
}

export default SettingsPage;