import { useState, useRef } from 'react';
import { ItemList, MedicineItem, TitleList } from '../components';
import Tippy from '@tippyjs/react/headless';
import { SearchToAdd } from '../../../components/SearchToAdd';
import classNames from 'classnames';
import { SearchResultItem } from '../../stock/components';
// import Button from '../../../components/Button';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import Button from '@mui/material/Button';

const TYPES = [
  {
    title: 'Thuốc',
    type: 'medicine',
  },
  {
    title: 'Vật tư Y tế',
    type: 'medical_supplies',
  },
  {
    title: 'Thực phẩm chức năng',
    type: 'functional_foods',
  },
];

function Dose() {
  const [listMedicine, setListMedicine] = useState(['1', '2', '3', '4', '5']);
  const [merchandises, setMerchandises] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleResult, setVisibleResult] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef();

  let red = '#D41919',
    darkBlue = '#064861';

  const handleSelectType = (index) => {
    setSelectedIndex(index);
  };

  const renderSearchResult = () => {
    return Array.isArray(searchResults) && searchResults.length > 0 ? (
      searchResults.map((item, index) => (
        <SearchResultItem
          key={index}
          name={item.name}
          type={item.type}
          packingSpecification="Hộp 4 vĩ, 30 viên"
          onClick={() => handleAddMerchandise(item)}
        />
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Không có kết quả tìm kiếm phù hợp!</div>
    );
  };

  const handleAddMerchandise = (item) => {
    setMerchandises([...merchandises, { name: item.name, packingSpecification: 'Hộp 4 vĩ, 30 viên' }]);
  };

  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value !== 0) setVisibleResult(true);
    else setVisibleResult(false);
    setSearchResults([...searchResults, { name: e.target.value, type: TYPES[selectedIndex].title }]);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
    setVisibleResult(false);
    searchRef.current.focus();
  };

  const [listDose, setlistDose] = useState(['1', '2', '3', '4', '5']);

  return (
    <div className="h-full flex gap-3">
      {/* Dose */}
      <div className="flex flex-col w-2/5 bg-white rounded-lg">
        <header className="border-b-2 border-text_blur/50 h-[50px] pl-6 pt-4 ">
          <h3 className="text-h4 text-dark_primary font-semibold">Tạo liều thuốc</h3>
        </header>
        {/* Search */}
        <div className="">
          <Tippy
            visible={visibleResult && searchResults.length > 0}
            interactive={true}
            placement="bottom-start"
            onClickOutside={() => setVisibleResult(false)}
            render={(attrs) => (
              <div tabIndex="-1" {...attrs} className={classNames('w-[600px] max-h-[480px] overflow-y-auto shadow-lg')}>
                <div className="bg-white rounded-md shadow-xl">{renderSearchResult()}</div>
              </div>
            )}
          >
            <div className="w-[330px] pl-12 pt-5">
              <SearchToAdd
                ref={searchRef}
                value={searchValue}
                onChange={handleSearchValueChange}
                onClear={handleClearSearch}
                types={TYPES}
                typeSelected={selectedIndex}
                onTypeChange={handleSelectType}
              />
            </div>
          </Tippy>
        </div>
        {/* Name of dose */}
        <div className="pl-12 pt-5 pb-7">
          <h3 className="text-h5 font-semibold">Tên liều thuốc:</h3>
          <input
            type="text"
            className="border-dark_primary border-2 rounded-md w-[385px] h-[37px] px-3 mt-2"
            placeholder="VD: Liều thuốc cảm cúm cho người lớn"
          />
        </div>

        {/* List medicine */}
        <div className="h-1/2 px-5 flex flex-col gap-5 overflow-auto">
          {listMedicine.map((item, index) => (
            <MedicineItem key={index} />
          ))}
        </div>

        <div className="flex justify-end items-end gap-3 my-auto mx-auto">
          <Button variant="outlined" style={{ color: red, borderColor: red, borderWidth: 2, paddingInline: '2rem' }}>
            Hủy
          </Button>
          <Button variant="contained" style={{ backgroundColor: darkBlue, paddingInline: '2rem' }}>
            Lưu
          </Button>
        </div>
      </div>

      {/* List Dose */}
      <div className="w-3/5 bg-white rounded-lg">
        <header className="border-b-2 border-text_blur/50 h-[50px] pl-6 pt-4">
          <h3 className="text-h4 text-dark_primary font-semibold">Danh sách liều thuốc</h3>
        </header>
        {/* Search */}
        <div className="flex justify-center py-5 relative">
          <input className="bg-text_blur/10 w-[600px] h-[40px] pl-12 pr-2 round-lg" placeholder="Tên liều thuốc" />
          <button>
            <BsSearch className="text-text_blur text-h3 absolute left-[70px] top-7" />
          </button>
          <button>
            <BsXCircleFill className="text-text_blur text-h3 absolute right-[70px] top-7" />
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
