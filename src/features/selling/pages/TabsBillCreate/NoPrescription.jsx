import { SearchToAdd } from '../../../../components/SearchToAdd';
import { SearchResultItem } from '../../../stock/components';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import { useState, useRef } from 'react';

function NoPrescription() {
  const [merchandises, setMerchandises] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleResult, setVisibleResult] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef();

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
      title: 'TPCN',
      type: 'functional_foods',
    },
  ];

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

  const handleSelectType = (index) => {
    setSelectedIndex(index);
  };

  return (
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
        <div className=" w-[70%] pl-5 pt-5">
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
  );
}

export default NoPrescription;
