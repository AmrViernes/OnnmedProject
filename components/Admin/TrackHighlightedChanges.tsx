import React, { useState, useEffect } from 'react';
import { Diff, diff_match_patch } from 'diff-match-patch';

interface TrackHighlightedChangesProps {
  oldContent: string;
  newContent: string;
}

const TrackHighlightedChanges: React.FC<TrackHighlightedChangesProps> = ({ oldContent, newContent }) => {
  const [changes, setChanges] = useState<Diff[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [acceptedChanges, setAcceptedChanges] = useState<number[]>([]);

  const calculateChanges = () => {
    const diff = new diff_match_patch();
    const diffResult = diff.diff_main(oldContent, newContent);
    diff.diff_cleanupSemantic(diffResult);
    setChanges(diffResult);
  };

  const handleAcceptChange = () => {
    if (currentIndex !== null) {
      const updatedAcceptedChanges = [...acceptedChanges, currentIndex];
      setAcceptedChanges(updatedAcceptedChanges);
      setCurrentIndex(null);
    }
  };

  const handleRejectChange = () => {
    if (currentIndex !== null) {
      const updatedChanges = changes.filter((_, i) => i !== currentIndex);
      setChanges(updatedChanges);
      setCurrentIndex(null);
    }
  };

  useEffect(() => {
    calculateChanges();
  }, [oldContent, newContent]);

  return (
    <div className="bg-gray-100 p-4">
      <h3>Highlighted Changes:</h3>
      <div>
        {changes.map((part, index) => (
          <span
            key={index}
            className={`change ${acceptedChanges.includes(index) ? 'accepted' : ''} ${
              currentIndex === index ? 'current' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {part[1]}
          </span>
        ))}
      </div>

      {currentIndex !== null && (
        <div className="mt-2">
          <button className="bg-green-500 text-white p-2" onClick={handleAcceptChange}>
            Accept Change
          </button>
          <button className="bg-red-500 text-white p-2 ml-2" onClick={handleRejectChange}>
            Reject Change
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackHighlightedChanges;
