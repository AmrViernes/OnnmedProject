// components/Login.tsx
import { useSession, signIn } from 'next-auth/react';

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    // Redirect to home if the user is already authenticated
    return <p>You are already logged in.</p>;
  }

  const handleLogin = () => {
    // Perform login using NextAuth.js
    signIn('credentials', { redirect: false });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
