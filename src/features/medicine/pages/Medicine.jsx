import { useState, useEffect } from 'react';
import { SubNavigate } from '../../../components';
import { Outlet } from 'react-router-dom';

function Medicine() {
  const [navList, setNavList] = useState([]);

  useEffect(() => {
    const navs = [
      {
        name: 'Tất cả',
        path: 'all',
      },
      {
        name: 'Kê đơn',
        path: 'prescription',
      },
      {
        name: 'Không kê đơn',
        path: 'non-prescription',
      },
      {
        name: 'Kiểm soát đặc biệt',
        path: 'special',
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
        <div className=" w-[200px] h-[30px] bg-gray-100"></div>
      </div>
      {/* Main page */}
      <Outlet />
    </div>
  );
}

export default Medicine;
