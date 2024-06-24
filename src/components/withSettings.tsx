import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface Settings {
  blockedCategories: string[];
  allowedCategories: string[];
  whitelist: string[];
  blacklist: string[];
}

const withSettings = (WrappedComponent: React.ComponentType<any>) => {
  const WithSettingsComponent = (props: any) => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchSettings = async () => {
        const db = getFirestore();
        const settingsDoc = await getDoc(doc(db, 'settings', 'filtering'));
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data() as Settings);
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      };

      fetchSettings();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} settings={settings} />;
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithSettingsComponent.displayName = `withSettings(${wrappedComponentName})`;

  return WithSettingsComponent;
};

export default withSettings;