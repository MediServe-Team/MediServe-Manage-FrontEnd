import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState, useEffect } from 'react';

export default function PermissionItem({ name, onClick }) {
  return (
    <button
      className={`hover:opacity-90 active:opacity-100 flex rounded-lg bg-secondary/80 
      justify-center items-center flex-grow-0 flex-shrink-0 p-2 gap-3`}
      onClick={onClick}
    >
      <span className="text-white text-h5 h-full">{name}</span>
      <AiOutlinePlusCircle className="text-white text-[20px]" />
    </button>
  );
}
