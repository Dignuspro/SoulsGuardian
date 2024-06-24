import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Monitoring() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const q = query(collection(db, 'activities'));
      const querySnapshot = await getDocs(q);
      const activityList = [];
      querySnapshot.forEach((doc) => {
        activityList.push({ id: doc.id, ...doc.data() });
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