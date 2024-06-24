// monitoring.tsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

interface Activity {
  id: string;
  url: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

function Monitoring() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const q = query(collection(db, 'activities'));
      const querySnapshot = await getDocs(q);
      const activityList: Activity[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activityList.push({
          id: doc.id,
          url: data.url,
          timestamp: data.timestamp,
        });
      });
      setActivities(activityList);
    };
    fetchActivities();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Monitoreo de Actividad</h1>
      <ul className="w-full max-w-lg">
        {activities.map((activity) => (
          <li key={activity.id} className="p-4 mb-2 bg-white rounded shadow">
            <p><strong>URL:</strong> {activity.url}</p>
            <p><strong>Fecha:</strong> {new Date(activity.timestamp.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Monitoring;