import React from 'react';

const AddToPortfolio = (props) => {
  const { title, addCallback } = props;
  return (
    <div className='flex flex-col space-y-2 items-center'>
      <div className='border border-solid border-gray-400 rounded-full h-32 w-32 bg-white shadow-inner flex items-center justify-center cursor-pointer' onClick={addCallback}>
        <div className="font-thin pb-2 text-white rounded-full flex items-center justify-center text-6xl addToPortfolio">+</div>
      </div>
      <div className='text-center'><label>{title}</label></div>
    </div>
  );
};

export default AddToPortfolio;