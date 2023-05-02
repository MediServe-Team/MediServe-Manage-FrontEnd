import React, { useState, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import SearchSelect from '../../components/SearchSelect/SearchSelect';
import { IoMdNotificationsOutline } from 'react-icons/io';

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

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const searchInput = useRef();
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [visibleResult, setVisibleResult] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleClear = () => {
    setSearchValue('');
    setVisibleResult(false);
    searchInput.current.focus();
  };

  const handleChangeSearchType = (index) => {
    setSelectedTypeIndex(index);
  };

  const handleSearch = () => {
    if (searchValue) {
      // handle search with key + type
      console.log('searchValue: ' + searchValue);
      console.log('type: ' + TYPES[selectedTypeIndex].title);

      //   set result after search process
      setSearchResults([{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }]);
      setVisibleResult(true);
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const renderSearchResult = () => {
    return Array.isArray(searchResults) && searchResults.length > 0 ? (
      searchResults.map((item, index) => (
        // create custom component result here
        <div
          key={index}
          className="px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer"
          // onClick={() => navigate to item}
        >
          {item.name}
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Không có kết quả phù hợp!</div>
    );
  };

  return (
    <div className="flex justify-between items-center flex-shrink-0  px-10 rounded-2xl shadow-[0_35px_40px_-15px_rgba(0,0,0,0.3)] bg-[#f9f9f9]/30 backdrop-blur-md h-16 relative z-10">
      {/* Search */}
      <Tippy
        visible={visibleResult}
        interactive={true}
        placement="bottom-start"
        onClickOutside={() => setVisibleResult(false)}
        render={(attrs) => (
          <div tabIndex="-1" {...attrs} className="min-w-[300px]">
            <div className="bg-white rounded-md shadow-xl">{renderSearchResult()}</div>
          </div>
        )}
      >
        <div>
          <SearchSelect
            ref={searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trimStart())}
            onClear={handleClear}
            types={TYPES}
            selectedTypeIndex={selectedTypeIndex}
            onChangeType={handleChangeSearchType}
            onSearchClick={handleSearch}
            onKeyDown={handlePressEnter}
          />
        </div>
      </Tippy>

      <div className="flex items-center gap-10">
        {/* Notify */}
        <div className="relative">
          <IoMdNotificationsOutline className="text-[24px]" />
          <div className="flex justify-center items-center w-[14px] h-[14px] bg-red-500 rounded-full absolute top-[-4px] right-[-6px] animate-bounce ">
            <span className="font-bold text-white text-[10px]">2</span>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dwskvqnkc/image/upload/v1681721772/samples/MediSever/default-avatar_ahyatj.png"
            alt="avatar"
            className="w-6 h-6 rounded-full"
          />
          <p className="font-medium">Phúc</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
