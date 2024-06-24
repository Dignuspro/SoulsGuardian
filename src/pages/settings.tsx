// settings.tsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface Settings {
  blockedCategories: string[];
  allowedCategories: string[];
  whitelist: string[];
  blacklist: string[];
}

function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsDoc = await getDoc(doc(db, 'settings', 'filtering'));
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data() as Settings);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (settings) {
      const settingsDoc = doc(db, 'settings', 'filtering');
      await updateDoc(settingsDoc, settings);
      alert('Configuración actualizada');
    }
  };

  return settings ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Configuraciones de Filtro</h1>
      {/* Añade formularios o inputs para editar las categorías de filtros aquí */}
      <button onClick={handleSave} className="p-2 mt-4 text-white bg-blue-500 rounded">
        Guardar Cambios
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default SettingsPage;