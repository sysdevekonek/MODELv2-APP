"use client"
import withAuth from '@/components/utils/withAuth';

function DashboardPage() {

const handleLogout = () => {
  sessionStorage.removeItem('accessToken');
  window.location.href = '/login'; // or router.push('/login') if inside client
};

  return (

    <div>
      <h1>Welcome to your dashboard</h1>
      <button
        onClick={() => {
          sessionStorage.removeItem('accessToken');
          window.location.href = '/login';
        }}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
   
  );
}

export default withAuth(DashboardPage);
