// pages/article/[id].tsx
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import AdminActions from '@/components/Admin/AdminActions';


const ArticlePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  // Fetch article details based on id

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Article Title</h1>
      <p className="mb-4">Article Content</p>
      {session?.role === 'admin' && <AdminActions articleId={id} status="pending" />}
    </div>
  );
};

export default ArticlePage;
