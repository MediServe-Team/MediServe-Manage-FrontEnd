import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { useTransition, animated } from 'react-spring';
import logoFull from '../../assets/images/logo-full.png';
import logo from '../../assets/images/logo.png';
import { TbSquareRoundedArrowRightFilled } from 'react-icons/tb';
import { MdAddHomeWork, MdKeyboardArrowDown } from 'react-icons/md';
import { FaWarehouse } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { RiShoppingBag3Fill, RiBillFill, RiAccountBoxFill, RiShoppingCartFill } from 'react-icons/ri';
import { TbCategory2 } from 'react-icons/tb';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoIosExit } from 'react-icons/io';
import { BsPersonVcardFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const MENUS = [
  {
    title: 'Trang chủ',
    icon: ({ className }) => <MdAddHomeWork className={className} />,
    link: routes.dashboard,
  },
  {
    title: 'Quản lý kho',
    icon: ({ className }) => <FaWarehouse className={className} />,
    submenu: true,
    submenuItem: [
      { title: 'Nhập kho', link: routes.stockIntoManage },
      { title: 'Lịch sử nhập', link: routes.historyStockManage },
      { title: 'Kiểm kho', link: routes.stockManageWithFistSubPage },
    ],
  },
  {
    title: 'Quản lý thuốc',
    icon: ({ className }) => <GiMedicines className={className} />,
    submenu: true,
    submenuItem: [
      { title: 'Thuốc trong hệ thống', link: routes.medicineManageWithFistSubPage },
      { title: 'Thêm thuốc', link: routes.medicineCreate },
    ],
  },
  {
    title: 'Quản lý sản phẩm',
    icon: ({ className }) => <RiShoppingBag3Fill className={className} />,
    submenu: true,
    submenuItem: [
      { title: 'Danh sách sản phẩm', link: routes.productManageWithFistSubPage },
      { title: 'Thêm sản phẩm', link: routes.productCreate },
    ],
  },
  {
    title: 'Quản lý liều',
    icon: ({ className }) => <RiBillFill className={className} />,
    link: routes.doseManage,
  },
  {
    title: 'Quản lý danh mục',
    icon: ({ className }) => <TbCategory2 className={className} />,
    link: routes.categoryManage,
  },
  {
    title: 'Quản lý tài khoản',
    icon: ({ className }) => <RiAccountBoxFill className={className} />,
    link: routes.accountManage,
  },
  {
    title: 'Bán hàng',
    icon: ({ className }) => <RiShoppingCartFill className={className} />,
    submenu: true,
    submenuItem: [
      { title: 'Danh sách hóa đơn', link: routes.billManage },
      { title: 'Tạo hóa đơn', link: routes.billCreateWithFirstPage },
    ],
  },
  {
    title: 'Thông tin cá nhân',
    icon: ({ className }) => <BsPersonVcardFill className={className} />,
    link: routes.profile,
  },
];

function SideBar() {
  const [expand, setExpand] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState(-1);
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  const transition = useTransition(expand, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    config: { duration: 300 },
  });

  const handleExpandSideBar = () => {
    setExpand(!expand);
  };

  const handleOpenSubmenu = (index, link) => {
    if (link) {
      navigate(link);
      setMenuOpenId(index);
    } else {
      if (index === menuOpenId) {
        setOpenSubmenu(!openSubmenu);
      } else {
        setOpenSubmenu(true);
        setMenuOpenId(index);
      }
    }
  };

  const handleLogout = () => {
    console.log(state);
  };

  const renderMenu = () => {
    return MENUS.map((item, index) => {
      const Icon = item.icon;

      return (
        <li key={index} onClick={() => handleOpenSubmenu(index, item?.link)}>
          <div
            className={classNames(
              'flex gap-5 items-center px-2 py-2 mx-3 cursor-pointer text-h5 rounded-lg text-dark_primary hover:bg-primary hover:text-white transition-all active:scale-95 active:bg-primary/80  overflow-hidden',
            )}
          >
            <Icon className="text-[22px] flex-shrink-0 " />
            <h5 className={classNames('flex-1 text-h5 whitespace-nowrap ')}>{item.title}</h5>
            {item.submenu && (
              <MdKeyboardArrowDown
                className={classNames(
                  'text-[20px]',
                  menuOpenId === index && openSubmenu && item?.submenu
                    ? '-rotate-180 duration-300'
                    : 'rotate-0 duration-300',
                )}
              />
            )}
          </div>
          {menuOpenId === index && openSubmenu && item?.submenu && (
            <ul className={classNames('flex flex-col', !expand && 'hidden')}>
              {item.submenuItem.map((submenu, subIndex) => (
                <Link
                  key={subIndex}
                  to={submenu.link}
                  onClick={(e) => e.stopPropagation()}
                  className="mx-3 pl-[50px] py-2 text-black/80 hover:bg-black/10 hover:text-white rounded-lg transition-all active:scale-95 overflow-hidden"
                >
                  <span className="whitespace-nowrap">{submenu.title}</span>
                </Link>
              ))}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <div
      className={classNames(
        'flex flex-col justify-between h-full rounded-2xl shadow-[0_35px_40px_-15px_rgba(0,0,0,0.3)] bg-[#f9f9f9]/30  relative z-10 transition-all duration-700 delay-700 overflow-hidden',
        expand ? 'w-[260px]' : 'w-16',
      )}
    >
      {/* Header */}
      <header>
        {/* Logo */}
        <div className={classNames('flex justify-center items-center h-[72px] ')}>
          {transition((style, item) =>
            item ? (
              <animated.img
                style={style}
                src={logoFull}
                alt="Medicine"
                className={classNames('h-[36px] mx-auto my-auto object-contain transition-transform duration-700 ')}
              />
            ) : (
              <animated.img
                style={style}
                src={logo}
                alt="Medicine"
                className={classNames('h-[30px] mx-auto my-auto object-contain transition-transform duration-700 ')}
              />
            ),
          )}
        </div>

        {/* Toggle sideBar */}
        <div className="relative top-[-2px]">
          <div className="absolute right-[-4px] bg-[#a6c0cd] rounded-md p-[2px]">
            <TbSquareRoundedArrowRightFilled
              className={classNames('text-[24px]  text-dark_primary duration-700', expand && 'rotate-[540deg]')}
              onClick={handleExpandSideBar}
            />
          </div>
        </div>
      </header>

      {/* Menu sideBar */}
      <nav className="mt-10 justify-between flex-1 flex flex-col overflow-y-auto">
        <ul className={classNames('flex-1 flex flex-col gap-2 select-none')}>{renderMenu()}</ul>
      </nav>

      <footer className="pb-5 flex flex-col mx-3">
        <Devider />
        {/* Help section*/}
        <div className="flex gap-5 items-center py-2 px-[12px] mt-2 text-dark_primary cursor-pointer hover:opacity-80 active:opacity-100 overflow-hidden">
          <BsFillQuestionCircleFill className="flex-shrink-0 text-[16px]" />
          <span className="text-h5 whitespace-nowrap">Trợ giúp</span>
        </div>
        {/* logout */}
        <button
          className="flex items-center justify-center h-[40px]  px-2 mt-2 outline-none rounded-xl cursor-pointer shadow-xl bg-dark_primary hover:bg-dark_primary/80 active:bg-dark_primary transition-all text-white overflow-hidden"
          onClick={handleLogout}
        >
          <IoIosExit className="rotate-180 text-[24px] flex-shrink-0" />
          {expand && <span>Thoát</span>}
        </button>
      </footer>
    </div>
  );
}

const Devider = () => <div className="border-t-[1px] border-dark_primary w-full "></div>;

export default SideBar;
