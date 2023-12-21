import React, { useState } from 'react';

interface EditArticleProps {
  currentContent: string;
  onEditArticle: (newContent: string) => void;
}

const EditArticle: React.FC<EditArticleProps> = ({ currentContent, onEditArticle }) => {
  const [newContent, setNewContent] = useState(currentContent);

  const handleEditArticle = () => {
    if (newContent.trim() !== '') {
      onEditArticle(newContent);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <label htmlFor="newContent">Edit Article</label>
      <textarea
        id="newContent"
        className="border p-2 mb-2"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      ></textarea>

      <button className="bg-blue-500 text-white p-2" onClick={handleEditArticle}>
        Save Edits
      </button>
    </div>
  );
};

export default EditArticle;
