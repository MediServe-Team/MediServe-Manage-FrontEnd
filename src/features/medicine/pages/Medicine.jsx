import { useState, useEffect } from 'react';
import { SearchOnChange, SubNavigate } from '../../../components';
import { MedicineGrid } from './SubPage';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../.././hooks';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function Medicine() {
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Medicines All',
        slug: '/medicines/all',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  const [navList, setNavList] = useState([]);
  // Search
  const [searchValue, setSearchValue] = useState('');
  const debounced = useDebounce(searchValue, 500);
  // getCategory
  const categories = useSelector((state) => state.category.categories);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    let navs = categories.filter((category) => category.isMedicine);
    navs = navs.map((category) => ({ name: category.categoryName, path: `/medicines/${category.id}` }));
    navs = [
      { name: 'Tất cả', path: '/medicines/all' },
      { name: 'Kê đơn', path: '/medicines/prescription' },
      { name: 'Không kê đơn', path: '/medicines/non-prescription' },
    ].concat(navs);
    setNavList(navs);
  }, [categories]);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-[80px] flex justify-between items-center px-5 bg-white rounded-lg flex-shrink-0">
        {/* navigate on page */}
        <div className="overflow-x-auto max-w-full py-[10px] mr-5">
          <SubNavigate navs={navList} />
        </div>
        {/* Search */}
        <SearchOnChange
          value={searchValue}
          onChange={handleSearchValueChange}
          onClear={() => setSearchValue('')}
          className={'w-[400px]'}
        />
      </div>
      {/* Main page */}
      <MedicineGrid searchValue={debounced} />
    </div>
  );
}

export default Medicine;
