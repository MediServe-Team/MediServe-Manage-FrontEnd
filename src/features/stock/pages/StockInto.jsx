import React, { useState, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import { GroupItem, ItemRow } from '../components';
import { SearchToAdd } from '../../../components/SearchToAdd';
import { SearchResultItem } from '../components';

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

function StockInto() {
  const [merchandises, setMerchandises] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleResult, setVisibleResult] = useState(false);
  const searchRef = useRef();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectType = (index) => {
    setSelectedIndex(index);
  };

  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value != 0) setVisibleResult(true);
    else setVisibleResult(false);
    setSearchResults([...searchResults, { name: e.target.value, type: TYPES[selectedIndex].title }]);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setVisibleResult(false);
    searchRef.current.focus();
  };

  const handleAddMerchandise = (item) => {
    setMerchandises([...merchandises, { name: item.name, packingSpecification: 'Hộp 4 vĩ, 30 viên' }]);
  };

  const handleRemove = (index) => {
    // remove item
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

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 bg-white rounded-lg px-10 py-3">
        {/* Search product */}
        <div className="flex justify-center">
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
            <div className="w-[600px]">
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

        <div className="overflow-hidden">
          {/* Group */}
          <GroupItem>
            {Array.isArray(merchandises) &&
              merchandises.map((item, index) => <ItemRow {...item} onRemove={() => handleRemove(index)} key={index} />)}
          </GroupItem>
        </div>
      </div>
      <div className="h-[80px] bg-white rounded-lg"></div>
    </div>
  );
}

export default StockInto;
