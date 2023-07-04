import { MedicineItem } from '../../../dose/components';
//import Button from '@mui/material/Button';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { BsXCircleFill } from 'react-icons/bs';

function AddDose() {
  const [listMedicine, setListMedicine] = useState(['1', '2', '3', '4', '5']);
  const [searchDose, setSearchDose] = useState('');

  let red = '#D41919',
    darkBlue = '#064861';

  const handleClearSearchDose = () => {
    setSearchDose('');
  };

  const handleSearchDose = (e) => {
    setSearchDose(e.target.value);
  };

  return (
    <div className="h-full flex flex-col w-full gap-4">
      {/* Search */}
      <div className="flex justify-center pt-5 gap-4">
        <div className="relative flex justify-center w-[64%]">
          <input
            className="bg-text_blur/10 w-full pl-4 pr-10 rounded-lg py-2 border-2"
            placeholder="Tên thuốc"
            value={searchDose}
            onChange={handleSearchDose}
          />
          <button onClick={handleClearSearchDose}>
            <BsXCircleFill className="text-text_blur text-h4 absolute right-[4%] top-[25%]" />
          </button>
        </div>
        <Button
          className="hover:opacity-90 active:opacity-100 w-[20%]"
          variant="solid"
          style={{
            backgroundColor: '#38B3E1',
            paddingInline: '1rem',
            borderRadius: '0.5rem',
            fontSize: '16px',
          }}
        >
          Thêm
        </Button>
      </div>
      {/* Name of dose */}
      <div className="pb-0 mx-auto w-[87%] flex flex-col flex-shrink-0 gap-2">
        <h3 className="text-h5 font-semibold">Chuẩn đoán:</h3>
        <input
          type="text"
          className="border-dark_primary border-2 rounded-md w-full py-2 px-3 flex flex-shrink-0"
          placeholder="VD: Đau nhức vai gáy"
        />
      </div>

      {/* List medicine */}
      <div className="pr-2 flex flex-col gap-5 overflow-y-auto w-full">
        {listMedicine.map((item, index) => (
          <MedicineItem key={index} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mb-2">
        <Button
          variant="outlined"
          style={{ color: red, borderColor: red, borderWidth: 2, paddingInline: '2rem', fontSize: '16px' }}
        >
          Hủy
        </Button>
        <Button variant="solid" style={{ backgroundColor: darkBlue, paddingInline: '2rem', fontSize: '16px' }}>
          Thêm vào hóa đơn
        </Button>
      </div>
    </div>
  );
}

export default AddDose;
