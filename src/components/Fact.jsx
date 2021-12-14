import React, { useState } from 'react';

const Fact = ({ fact }) => {
  return (
    <>
      <h2>Fun fact:</h2>
      <p>{fact}</p>
    </>
  );
};

export default Fact;
