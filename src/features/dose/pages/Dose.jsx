import { useState, useRef } from 'react';
import { ItemList, MedicineItem, TitleList } from '../components';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import { Button, SearchOnChange } from '../../../components';

function Dose() {
  const [medicineName, setMedicineName] = useState('');
  const [note, setNote] = useState('');
  const [listMedicine, setListMedicine] = useState(['1', '2', '3', '4', '5']);
  const [searchDose, setSearchDose] = useState('');
  const [searchMedicineValue, setSearchMedicineValue] = useState('');
  //* list ref to MedicineItem
  const medicineItemRef = useRef([]);

  //* Handle form create dose
  const handleCreateDose = () => {
    //
  };

  const handleClearFormCreateDose = () => {
    //
  };

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
        <header className="flex items-center h-[50px] pl-6 border-b-2 border-text_blur/50 flex-shrink-0">
          <h3 className="text-h4 text-text_primary font-semibold">Tạo liều thuốc</h3>
        </header>

        <div className="px-5 flex flex-col min-h-0">
          {/* Search */}
          <div className="flex justify-between items-center mt-5 gap-3">
            <SearchOnChange
              className={'w-full'}
              value={searchMedicineValue}
              onChange={(e) => setSearchMedicineValue(e.target.value)}
              onClear={() => setSearchMedicineValue('')}
            />
            <Button className="hover:opacity-90 active:opacity-100" styleBtn="solid" size={'medium'}>
              Thêm
            </Button>
          </div>

          {/* Name of dose */}
          <div className="pt-4 pb-1">
            <h3 className="text-text_primary font-medium">Tên liều thuốc:</h3>
            <input
              type="text"
              className="border-2 w-full h-[40px] outline-none rounded-md border-text_primary/20 focus:border-text_primary transition-all duration-200 px-2"
              placeholder="VD: Liều thuốc cảm cúm cho người lớn"
            />
          </div>

          {/* List medicine */}
          <div className="flex-1 flex flex-col pt-4 gap-5 overflow-auto min-h-0">
            {listMedicine.map((item, index) => (
              <MedicineItem key={index} ref={(el) => (medicineItemRef.current[index] = el)} />
            ))}
          </div>

          {/* Button control area */}
          <div className="flex justify-between items-end gap-5 py-2 flex- shrink-0">
            {/* Note */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-text_primary font-medium">Ghi chú:</h3>
              <input
                type="text"
                className="border-2 w-full h-[44px] outline-none rounded-md border-text_primary/20 focus:border-text_primary transition-all duration-200 px-2"
                placeholder="Thêm ghi chú"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                styleBtn={'solid'}
                modifier={'danger'}
                size={'medium'}
                width={100}
                onClick={handleClearFormCreateDose}
              >
                Hủy
              </Button>
              <Button
                styleBtn={'solid'}
                modifier={'dark_primary'}
                size={'medium'}
                width={100}
                onClick={handleCreateDose}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* List Dose */}
      <div className="w-3/5 bg-white rounded-lg">
        <header className="flex items-center h-[50px] pl-6 border-b-2 border-text_blur/50">
          <h3 className="text-h4 text-text_primary font-semibold">Danh sách liều thuốc</h3>
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
