import { useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const withActivityLogger = (Component) => {
  const WrappedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const logActivity = async () => {
        try {
          const docRef = doc(db, 'restrictions', 'current');
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const { blockedUrls, allowedTime } = docSnap.data();
            const currentUrl = window.location.href;

            // this is a placeholder function; needs implementation of time tracking logic
            const totalUsageTime = 0; // calculateUsageTime(); 

            if (blockedUrls.includes(currentUrl) || totalUsageTime > allowedTime) {
              alert('El acceso a este sitio está restringido');
              router.push('/restricted'); // Página de restricción
            } else {
              await addDoc(collection(db, 'activities'), {
                url: currentUrl,
                timestamp: new Date(),
              });
            }
          } else {
            console.log('No such document!');
          }
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      };

      logActivity();
    }, [router]);

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withActivityLogger(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

export default withActivityLogger;