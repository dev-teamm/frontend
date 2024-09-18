import React from 'react';

const StatCard = ({ title, value, quantity, bgColor }: { title: string; value: number; quantity: string | number; bgColor: string }) => {
  return (
    <div className={`w-full p-6 flex flex-col items-center gap-y-3 shadow-md rounded-md border ${bgColor}`}>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-4xl font-bold'>{value}</p>
      <p className='text-md font-semibold'>{quantity}</p>
    </div>
  );
};

export default StatCard;
