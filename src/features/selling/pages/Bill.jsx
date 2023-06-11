import { useState } from 'react';

function Bill() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div>
      <p className={`${isActive ? 'text-secondary' : 'text-light_gray'}`}>This is Bill page manage</p>
      <button onClick={() => setIsActive((prev) => !prev)}>Button</button>
    </div>
  );
}

export default Bill;
