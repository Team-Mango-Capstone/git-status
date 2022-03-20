import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      This page does not exist.
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default NotFound;
