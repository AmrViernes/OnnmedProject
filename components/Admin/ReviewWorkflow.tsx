import React, { useState } from 'react';
import TrackHighlightedChanges from './TrackHighlightedChanges';
import AssignArticleToReviewer from './AssignArticleToReviewer';

interface ReviewWorkflowProps {
  initialContent: string;
}

const ReviewWorkflow: React.FC<ReviewWorkflowProps> = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [isChangesApproved, setChangesApproved] = useState(false);
  const [isReviewAccepted, setReviewAccepted] = useState(false);

  const handleApproveChanges = () => {
    // Your logic for approving changes and updating state
    setChangesApproved(true);
  };

  const handleAcceptReview = () => {
    // Your logic for accepting the review and updating state
    setReviewAccepted(true);
  };

  const handleAssignToReviewer = () => {
    // Your logic for assigning the article to a reviewer
    setChangesApproved(false); // Reset changes approval status
  };

  return (
    <div>
      {!isChangesApproved ? (
        <TrackHighlightedChanges oldContent={initialContent} newContent={content} />
      ) : !isReviewAccepted ? (
        <div>
          <AssignArticleToReviewer
            articles={[{ id: 1, title: 'Article Title', content: content }]} // Include other necessary article data
            reviewers={['Reviewer1', 'Reviewer2']} // List of available reviewers
            onAssign={(articleId, reviewer) => {
              // Logic for assigning the article to the selected reviewer
              handleAssignToReviewer();
            }}
          />
          <div className="mt-2">
            <button className="bg-green-500 text-white p-2" onClick={handleAcceptReview}>
              Accept Review
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Article Published!</p>
        </div>
      )}

      <div className="mt-2">
        {!isChangesApproved && (
          <button className="bg-green-500 text-white p-2" onClick={handleApproveChanges}>
            Approve Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewWorkflow;
