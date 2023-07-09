import { useState, useEffect } from 'react';
import { SearchOnChange, SubNavigate } from '../../../components';
import { ProductGrid } from './SubPage';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from '../../.././hooks';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function Medicine() {
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Products All',
        slug: '/products/all',
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
    let navs = categories.filter((category) => !category.isMedicine);
    navs = navs.map((category) => ({ name: category.categoryName, path: `/products/${category.id}` }));
    navs = [{ name: 'Tất cả', path: '/products/all' }].concat(navs);
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
      <ProductGrid searchValue={debounced} />
    </div>
  );
}

export default Medicine;
