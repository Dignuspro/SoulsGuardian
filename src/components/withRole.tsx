// src/components/withRole.tsx
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const withRole = (Component: React.ComponentType, requiredRole: string) => {
  const ComponentWithRole = (props: any) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        const getUserRole = async () => {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role !== requiredRole) {
              router.push('/not-authorized'); // Redirige si no tiene el rol requerido
            }
          }
        };
        getUserRole();
      } else if (!user && !loading) {
        router.push('/login'); // Redirige si no está autenticado
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  ComponentWithRole.displayName = `WithRole(${Component.displayName || Component.name || 'Component'})`;

  return ComponentWithRole;
};

export default withRole;