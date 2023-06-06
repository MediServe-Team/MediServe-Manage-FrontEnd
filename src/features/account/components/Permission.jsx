import { BsX } from 'react-icons/bs';

export default function Permission({ item, children }) {
  return (
    <div className="flex h-full rounded-lg bg-secondary/80 justify-center items-center flex-grow-0 flex-shrink-0 px-2 py-1 gap-3">
      <span className="text-white text-h6 h-full">{item}</span>
      {children}
    </div>
  );
}
