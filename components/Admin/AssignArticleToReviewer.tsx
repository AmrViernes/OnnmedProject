import React, { useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  assignedReviewer?: string;
}

interface AssignArticleToReviewerProps {
  articles: Article[];
  reviewers: string[]; // Assuming an array of reviewer names
  onAssign: (articleId: number, reviewer: string) => void;
}

const AssignArticleToReviewer: React.FC<AssignArticleToReviewerProps> = ({ articles, reviewers, onAssign }) => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [selectedReviewer, setSelectedReviewer] = useState('');

  const handleAssign = () => {
    if (selectedArticle !== null) {
      onAssign(selectedArticle, selectedReviewer);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <label htmlFor="articleSelect">Select Article</label>
      <select
        id="articleSelect"
        className="border p-2 mb-2"
        value={selectedArticle !== null ? selectedArticle : ''}
        onChange={(e) => setSelectedArticle(Number(e.target.value))}
      >
        <option value="" disabled>Select an article</option>
        {articles.map((article) => (
          <option key={article.id} value={article.id}>{article.title}</option>
        ))}
      </select>

      <label htmlFor="reviewerSelect">Select Reviewer</label>
      <select
        id="reviewerSelect"
        className="border p-2 mb-2"
        value={selectedReviewer}
        onChange={(e) => setSelectedReviewer(e.target.value)}
      >
        <option value="" disabled>Select a reviewer</option>
        {reviewers.map((reviewer) => (
          <option key={reviewer} value={reviewer}>{reviewer}</option>
        ))}
      </select>

      <button className="bg-blue-500 text-white p-2" onClick={handleAssign}>
        Assign Article
      </button>
    </div>
  );
};

export default AssignArticleToReviewer;
