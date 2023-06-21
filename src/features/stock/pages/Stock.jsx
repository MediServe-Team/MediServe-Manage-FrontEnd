import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SubNavigate } from '../components';
import { SearchOnChange } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryStock, getLengthAll, getLengthExp, getLengthPreExp, getLengthPreSoldOut } from '../stockSlice';

function Stock() {
  const [navList, setNavList] = useState([]);
  // Search
  const [searchValue, setSearchValue] = useState('');
  // dispatch
  const dispatch = useDispatch();

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    //* fetch data inventory stock
    dispatch(getInventoryStock({}));
  }, []);

  const lengthAll = useSelector(getLengthAll);
  const lengthPreSoldOut = useSelector(getLengthPreSoldOut);
  const lengthPreExp = useSelector(getLengthPreExp);
  const lengthExp = useSelector(getLengthExp);

  useEffect(() => {
    const navs = [
      {
        name: 'Tất cả',
        path: '/stock/all',
        color: 'green',
        quantity: lengthAll,
      },
      {
        name: 'Sắp hết hàng',
        path: '/stock/prepare-out-of-stock',
        color: 'yellow',
        quantity: lengthPreSoldOut,
      },
      {
        name: 'Sắp đến hạn',
        path: '/stock/prepare-expired',
        color: 'red',
        quantity: lengthPreExp,
      },
      {
        name: 'Hến hạn',
        path: '/stock/expired',
        color: 'grey',
        quantity: lengthExp,
      },
    ];

    setNavList(navs);
  }, [lengthAll, lengthPreSoldOut, lengthPreExp, lengthExp]);

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
      <Outlet context={searchValue} />
    </div>
  );
}

export default Stock;
