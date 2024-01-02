import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
import { SubNavigate } from '../../../components';
import { SearchOnChange } from '../../../components';
import { Outlet } from 'react-router-dom';

export default function BlogManagePage() {
  const [navList, setNavList] = useState([]);
  // Search
  const [searchValue, setSearchValue] = useState('');
  // dispatch
  const dispatch = useDispatch();

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  // addBreadcrumb
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Danh sách bài đăng',
        slug: '/blog/all',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  useEffect(() => {
    const navs = [
      {
        name: 'Tất cả',
        path: '/blog/all',
        color: 'green',
        //quantity: lengthAll,
      },
      {
        name: 'Đang hiển thị',
        path: '/blog/public',
        color: 'yellow',
        //quantity: lengthPublic,
      },
      {
        name: 'Đã ẩn',
        path: '/blog/private',
        color: 'grey',
        //quantity: lengthPrivate,
      },
    ];
    setNavList(navs);
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-[60px] flex justify-between items-center px-5 bg-white rounded-[4px] flex-shrink-0">
        {/* navigate on page */}
        <SubNavigate navs={navList} />
        {/* Search */}
        <SearchOnChange
          value={searchValue}
          onChange={handleSearchValueChange}
          onClear={() => setSearchValue('')}
          className={'w-[400px]'}
          placeholder="Tìm bài viết"
        />
      </div>
      {/* Main page */}
      <Outlet context={searchValue} />
    </div>
  );
}
