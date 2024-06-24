// reports.tsx
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

interface Report {
  id: string;
  description: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

function Reports() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(collection(db, 'reports'));
      const querySnapshot = await getDocs(q);
      const reportList: Report[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reportList.push({
          id: doc.id,
          description: data.description,
          timestamp: data.timestamp,
        });
      });
      setReports(reportList);
    };
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Reportes de Actividad</h1>
      <ul className="w-full max-w-lg">
        {reports.map((report) => (
          <li key={report.id} className="p-4 mb-2 bg-white rounded shadow">
            <p><strong>Descripción:</strong> {report.description}</p>
            <p><strong>Fecha:</strong> {new Date(report.timestamp.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;