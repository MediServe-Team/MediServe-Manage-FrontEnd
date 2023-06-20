import { useState, useRef } from 'react';
import { ItemList, MedicineItem, TitleList } from '../components';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import Button from '@mui/joy/Button';

function Dose() {
  //const categories = useSelector(getlistCategories);
  const [listMedicine, setListMedicine] = useState(['1', '2', '3', '4', '5']);
  const [searchDose, setSearchDose] = useState('');
  const [searchMedicine, setSearchMedicine] = useState('');

  let red = '#D41919',
    darkBlue = '#064861';

  const handleClearSearchDose = () => {
    setSearchDose('');
  };

  const handleSearchDose = (e) => {
    setSearchDose(e.target.value);
  };

  const [listDose, setlistDose] = useState(['1', '2', '3', '4', '5']);

  return (
    <div className="h-full flex gap-3">
      {/* Dose */}
      <div className="flex flex-col w-2/5 bg-white rounded-lg h-full">
        <header className="border-b-2 border-text_blur/50 h-[8%] pl-6 pt-4 ">
          <h3 className="text-h4 text-dark_primary font-semibold">Tạo liều thuốc</h3>
        </header>
        {/* Search */}
        <div className="h-[6.5%] justify-center mt-5 flex gap-3">
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
        {/* Name of dose */}
        <div className="mx-auto pt-5 pb-7">
          <h3 className="text-h5 font-semibold">Tên liều thuốc:</h3>
          <input
            type="text"
            className="border-dark_primary border-2 rounded-md w-[385px] h-[37px] px-3 mt-2"
            placeholder="VD: Liều thuốc cảm cúm cho người lớn"
          />
        </div>

        {/* List medicine */}
        <div className="h-[50%] px-5 flex flex-col gap-5 overflow-auto">
          {listMedicine.map((item, index) => (
            <MedicineItem key={index} />
          ))}
        </div>

        <div className="flex justify-end items-end gap-3 my-auto mx-auto">
          <Button
            variant="outlined"
            style={{ color: red, borderColor: red, borderWidth: 2, paddingInline: '2rem', fontSize: '16px' }}
          >
            Hủy
          </Button>
          <Button
            className="hover:opacity-90 active:opacity-100"
            variant="solid"
            style={{ backgroundColor: darkBlue, paddingInline: '2rem', fontSize: '16px' }}
          >
            Lưu
          </Button>
        </div>
      </div>

      {/* List Dose */}
      <div className="w-3/5 bg-white rounded-lg">
        <header className="border-b-2 border-text_blur/50 h-[8%] pl-6 pt-4">
          <h3 className="text-h4 text-dark_primary font-semibold">Danh sách liều thuốc</h3>
        </header>
        {/* Search */}
        <div className="h-[14%] flex justify-center py-5 relative">
          <input
            type="text"
            className="bg-text_blur/10 w-[84%] h-full pl-12 pr-12 rounded-lg"
            value={searchDose}
            onChange={handleSearchDose}
            placeholder="Tên liều thuốc"
          />
          <button>
            <BsSearch className="text-text_blur text-h3 absolute left-[9.75%] top-[35%]" />
          </button>
          <button onClick={handleClearSearchDose}>
            <BsXCircleFill className="text-text_blur text-h3 absolute right-[9.75%] top-[35%]" />
          </button>
        </div>
        {/* Table of data */}
        <div className="">
          {/* Title */}
          <div className="px-10">
            <TitleList>
              {/* Data */}
              {listDose.map((item, index) => (
                <ItemList key={index} />
              ))}
            </TitleList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dose;
