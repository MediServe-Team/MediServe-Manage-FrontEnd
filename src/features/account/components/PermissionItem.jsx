import { BsX } from 'react-icons/bs';
import { useState, useEffect } from 'react';

export default function PermissionItem({ item }) {
  const [activePer, setActivePer] = useState(item.active);

  useEffect(() => {
    item.active = activePer;
  }, [activePer, item]);

  return (
    <button
      className={`hover:opacity-90 active:opacity-100 flex rounded-lg ${
        activePer ? 'bg-secondary/80' : 'bg-text_blur'
      } justify-center items-center flex-grow-0 flex-shrink-0 px-6 py-3 gap-3`}
      onClick={() => setActivePer((pre) => !pre)}
    >
      <span className="text-white text-[18px] h-full">{item.name}</span>
    </button>
  );
}
