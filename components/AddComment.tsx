import React, { useState } from 'react';

interface AddCommentProps {
  selectedText: string;
  onAddComment: (commentData: { selectedText: string; comment: string }) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ selectedText, onAddComment }) => {
  const [comment, setComment] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      onAddComment({ selectedText, comment });
      setComment('');
      setModalOpen(false);
    }
  };

  return (
    <div className="relative bg-gray-100 p-4">
      <p>Selected Text: {selectedText}</p>

      <button
        className="bg-blue-500 text-white p-2"
        onClick={() => setModalOpen(true)}
      >
        Add Comment
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 max-w-md">
            <label htmlFor="comment">Add Comment</label>
            <textarea
              id="comment"
              className="border p-2 mb-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button className="bg-blue-500 text-white p-2" onClick={handleAddComment}>
              Add Comment
            </button>

            <button className="bg-gray-500 text-white p-2 ml-2" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddComment;
