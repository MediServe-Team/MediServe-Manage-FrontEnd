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
        className="bg-text_blur/10 w-[90%] h-[7%] pl-4 pr-12 rounded-lg"
        placeholder="Tên liều thuốc"
        value={searchDose}
        onChange={handleSearchDose}
      />
      <button onClick={handleClearSearchDose}>
        <BsXCircleFill className="text-text_blur text-h3 absolute right-[8%] top-[4.5%]" />
      </button>
    </div>
  );
}

export default AvailableDose;
