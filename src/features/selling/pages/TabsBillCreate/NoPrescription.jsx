import { useState } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import Button from '@mui/joy/Button';

function NoPrescription() {
  const [searchMedicine, setSearchMedicine] = useState('');

  return (
    <div className="h-[7%] justify-center mt-5 flex gap-3">
      <div className="relative w-[59%]">
        <input
          type="text"
          className="bg-text_blur/10 w-full h-full pl-4 pr-9 rounded-lg border-2"
          value={searchMedicine}
          onChange={(e) => setSearchMedicine(e.target.value)}
          placeholder="Tên thuốc"
        />
        <button onClick={() => setSearchMedicine('')}>
          <BsXCircleFill className="text-text_blur text-h4 absolute right-[3%] top-[23%]" />
        </button>
      </div>
      <Button
        className="hover:opacity-90 active:opacity-100"
        variant="solid"
        style={{ backgroundColor: '#38B3E1', paddingInline: '1.5rem', fontSize: '16px' }}
      >
        Thêm
      </Button>
    </div>
  );
}

export default NoPrescription;
