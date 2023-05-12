import { forwardRef } from 'react';

function DropBox({ title, onClick }, ref) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="flex justify-center items-center h-8 px-5 bg-primary rounded-xl cursor-pointer hover:bg-primary/90 active:bg-primary/50 active:border-primary active:border-2 select-none shadow-lg transition-all"
    >
      <span className="text-white">{title}</span>
    </div>
  );
}

export default forwardRef(DropBox);
