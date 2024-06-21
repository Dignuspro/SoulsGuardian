import withActivityLogger from '../components/withActivityLogger';

function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
        <p>Esta es una página protegida y registrada</p>
        {/* Agrega más contenido del dashboard aquí */}
      </div>
    </div>
  );
}

export default withActivityLogger(Dashboard);