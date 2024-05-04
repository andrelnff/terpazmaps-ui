import React from 'react';
import './Loading.css'; 

const Loading = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-circle"></div>
      </div>
    );
  }

  return children;
};

export default Loading;
