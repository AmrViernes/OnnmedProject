// AdminArticleList.tsx
import React from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

interface AdminArticleListProps {
  articles: Article[];
  onAccept: (articleId: number) => void;
  onReject: (articleId: number) => void;
}

const AdminArticleList: React.FC<AdminArticleListProps> = ({ articles, onAccept, onReject }) => {
  return (
    <div className="bg-gray-100 p-4">
      {articles.map((article) => (
        <div key={article.id} className="mb-4">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <button className="bg-green-500 text-white p-2" onClick={() => onAccept(article.id)}>
            Accept
          </button>
          <button className="bg-red-500 text-white p-2" onClick={() => onReject(article.id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminArticleList;
