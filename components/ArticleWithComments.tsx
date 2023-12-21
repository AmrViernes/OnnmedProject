import React, { useState } from 'react';

interface Comment {
  id: number;
  text: string;
  highlightedText: string;
}

interface ArticleWithCommentsProps {
  articleText: string;
  comments: Comment[];
}

const ArticleWithComments: React.FC<ArticleWithCommentsProps> = ({ articleText, comments }) => {
  const [selectedText, setSelectedText] = useState('');
  const [isCommentVisible, setCommentVisible] = useState(false);

  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString() || '';
    setSelectedText(selectedText);

    const isCommentVisible = selectedText.trim() !== '';
    setCommentVisible(isCommentVisible);
  };

  const renderHighlightedText = () => {
    let highlightedText = articleText;

    comments.forEach((comment) => {
      highlightedText = highlightedText.replace(
        new RegExp(comment.highlightedText, 'g'),
        `<span class="highlighted" data-comment-id="${comment.id}">${comment.highlightedText}</span>`
      );
    });

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const handleMouseLeave = () => {
    setCommentVisible(false);
  };

  return (
    <div className="relative bg-gray-100 p-4" onMouseUp={handleTextSelection} onMouseLeave={handleMouseLeave}>
      {renderHighlightedText()}

      {isCommentVisible && (
        <div className="absolute bg-white p-2 border border-gray-300">
          <p>Selected Text: {selectedText}</p>
          {/* Add logic to display comments related to the selected text */}
        </div>
      )}
    </div>
  );
};

export default ArticleWithComments;
