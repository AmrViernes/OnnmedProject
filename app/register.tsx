// components/Login.tsx
import { useSession, signIn } from 'next-auth/react';

const Register = () => {
  const { data: session } = useSession();

  if (session) {
    return <p>You are already logged in.</p>;
  }

  const handleLogin = () => {
    register('credentials', { redirect: false });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Register;
