// register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db, createUserWithEmailAndPassword } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Aquí asignamos el rol 'hijo' por defecto. Puedes ajustar esto según sea necesario.
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: 'hijo' // o 'padre' para tu cuenta
      });
      alert('Registro exitoso');
      router.push('/'); // redirecciona a la página de inicio
    } catch (error) {
      console.error(error);
      alert('Error al registrar');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-lg font-bold">Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;