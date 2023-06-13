import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SubNavigate } from '../components';
import { SearchOnChange } from '../../../components';

function Stock() {
  const [navList, setNavList] = useState([]);
  // Search
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const navs = [
      {
        name: 'Tất cả',
        path: '/stock/all',
        color: 'green',
        quantity: 8,
      },
      {
        name: 'Sắp hết hàng',
        path: '/stock/prepare-out-of-stock',
        color: 'yellow',
        quantity: 3,
      },
      {
        name: 'Sắp đến hạn',
        path: '/stock/prepare-expired',
        color: 'red',
        quantity: 8,
      },
      {
        name: 'Hến hạn',
        path: '/stock/expired',
        color: 'grey',
        quantity: 2,
      },
    ];

    setNavList(navs);
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-[80px] flex justify-between items-center px-5 bg-white rounded-lg flex-shrink-0">
        {/* navigate on page */}
        <SubNavigate navs={navList} />
        {/* Search */}
        <SearchOnChange
          value={searchValue}
          onChange={handleSearchValueChange}
          onClear={() => setSearchValue('')}
          className={'w-[400px]'}
        />
      </div>
      {/* Main page */}
      <Outlet />
    </div>
  );
}

export default Stock;
