// profile.tsx
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

function Profile() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setName(docSnap.data().name || '');
          setEmail(user.email || '');
          setRole(docSnap.data().role || '');
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, { name, role });
      alert('Perfil actualizado');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-lg font-bold">Perfil</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(user.email || '')}
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          disabled
        />
        {role === 'padre' && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="padre">Padre</option>
            <option value="hijo">Hijo</option>
          </select>
        )}
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default Profile;