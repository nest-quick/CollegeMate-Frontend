import React from 'react';

interface SlidesProps {
    slidesLink: string;
}

const Slides: React.FC<SlidesProps> = ({ slidesLink }) => {
  return (
    <div className="mt-4">
      <h5>Slides Generated!</h5>
      <a href={slidesLink} target="_blank" rel="noopener noreferrer">
        Open Google Slides Link
      </a>
    </div>
  );
};

export default Slides;