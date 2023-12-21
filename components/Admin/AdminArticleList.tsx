// components/ArticleList.tsx
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AdminActions from './AdminActions';

const ArticleList = () => {
  const { data: session } = useSession();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles when the component mounts
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Article List</h2>
      {articles.map((article) => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          {session?.role === 'admin' && <AdminActions articleId={article._id} status={article.status} />}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
