import { BsXCircleFill } from 'react-icons/bs';
import { useState } from 'react';

function AvailableDose() {
  const [searchDose, setSearchDose] = useState('');

  const handleClearSearchDose = () => {
    setSearchDose('');
  };

  const handleSearchDose = (e) => {
    setSearchDose(e.target.value);
  };

  return (
    <div className="flex h-full justify-center py-5 relative">
      <input
        className="bg-text_blur/10 w-[90%] h-[8%] pl-4 pr-12 rounded-lg border-2 py-0"
        placeholder="Tên liều thuốc"
        value={searchDose}
        onChange={handleSearchDose}
      />
      <button onClick={handleClearSearchDose}>
        <BsXCircleFill className="text-text_blur text-h3 absolute right-[7%] top-[5.2%]" />
      </button>
    </div>
  );
}

export default AvailableDose;
