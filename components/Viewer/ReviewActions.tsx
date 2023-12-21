import React, { useState } from 'react';

interface ReviewActionsProps {
  onAcceptReview: () => void;
  onRejectReview: () => void;
}

const ReviewActions: React.FC<ReviewActionsProps> = ({ onAcceptReview, onRejectReview }) => {
  const [reviewComment, setReviewComment] = useState('');

  const handleAcceptReview = () => {
    // You can pass the review comment to the parent component or perform other actions
    onAcceptReview();
  };

  const handleRejectReview = () => {
    // You can pass the review comment to the parent component or perform other actions
    onRejectReview();
  };

  return (
    <div className="bg-gray-100 p-4">
      <label htmlFor="reviewComment">Review Comment</label>
      <textarea
        id="reviewComment"
        className="border p-2 mb-2"
        value={reviewComment}
        onChange={(e) => setReviewComment(e.target.value)}
      ></textarea>

      <button className="bg-green-500 text-white p-2" onClick={handleAcceptReview}>
        Accept Review
      </button>

      <button className="bg-red-500 text-white p-2 ml-2" onClick={handleRejectReview}>
        Reject Review
      </button>
    </div>
  );
};

export default ReviewActions;
