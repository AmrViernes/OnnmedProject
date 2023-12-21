// AddArticle.tsx
import React, { useState } from 'react';

interface AddArticleProps {
  onAddArticle: (articleData: { title: string; content: string }) => void;
}

const AddArticle: React.FC<AddArticleProps> = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddArticle = () => {
    onAddArticle({ title, content });
  };

  return (
    <div className="bg-gray-100 p-4">
      <label htmlFor="articleTitle">Article Title</label>
      <input
        type="text"
        id="articleTitle"
        className="border p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        id="articleContent"
        className="border p-2 mb-2"
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button className="bg-blue-500 text-white p-2" onClick={handleAddArticle}>
        Add Article
      </button>
    </div>
  );
};

export default AddArticle;
