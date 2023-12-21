import React, { useState } from 'react';

interface RequestRevisionsProps {
  onRequestRevisions: (revisionComment: string) => void;
}

const RequestRevisions: React.FC<RequestRevisionsProps> = ({ onRequestRevisions }) => {
  const [revisionComment, setRevisionComment] = useState('');

  const handleRequestRevisions = () => {
    if (revisionComment.trim() !== '') {
      onRequestRevisions(revisionComment);
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

      <button className="bg-blue-500 text-white p-2" onClick={handleRequestRevisions}>
        Request Revisions
      </button>
    </div>
  );
};

export default RequestRevisions;
