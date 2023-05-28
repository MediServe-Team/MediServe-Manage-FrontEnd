import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SubNavigate } from '../components';

function BillCreate() {
  const [navList, setNavList] = useState([]);

  useEffect(() => {
    const navs = [
      {
        name: 'Sản phẩm/ Thuốc',
        path: '/bills/create/no-prescription',
        color: 'primary',
      },
      {
        name: 'Kê đơn',
        path: '/bills/create/prescription',
        color: 'primary',
      },
      {
        name: 'Liều có sẵn',
        path: '/bills/create/available-dose',
        color: 'primary',
      },
    ];

    setNavList(navs);
  }, []);

  return (
    <div className="h-full flex gap-3">
      <div className="flex flex-col justify-between items-center px-5 bg-white rounded-xl w-[40%]">
        {/* navigate on page */}
        <div className="flex h-[8%] items-end pt-3 border-b-2 border-text_blur/50">
          <SubNavigate navs={navList} />
        </div>
        {/* Navigated page */}
        <div className="h-[92%] w-full">
          <Outlet />
        </div>
      </div>

      <div className="flex h-full w-[60%] min-w-0 bg-white rounded-xl"></div>
    </div>
  );
}

export default BillCreate;
