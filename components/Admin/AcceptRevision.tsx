import React, { useState } from 'react';

interface AcceptRevisionProps {
  onAcceptRevision: (revisionComment: string) => void;
}

const AcceptRevision: React.FC<AcceptRevisionProps> = ({ onAcceptRevision }) => {
  const [revisionComment, setRevisionComment] = useState('');

  const handleAcceptRevision = () => {
    if (revisionComment.trim() !== '') {
      onAcceptRevision(revisionComment);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <label htmlFor="revisionComment">Revision Comment</label>
      <textarea
        id="revisionComment"
        className="border p-2 mb-2"
        value={revisionComment}
        onChange={(e) => setRevisionComment(e.target.value)}
      ></textarea>

      <button className="bg-green-500 text-white p-2" onClick={handleAcceptRevision}>
        Accept Revision
      </button>
    </div>
  );
};

export default AcceptRevision;
