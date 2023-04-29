import React, { useState } from 'react';
import classNames from 'classnames';
import { useTransition, animated } from 'react-spring';
import logoFull from '../../assets/images/logo-full.png';
import logo from '../../assets/images/logo.png';
import { TbSquareRoundedArrowRightFilled } from 'react-icons/tb';
import { MdAddHomeWork } from 'react-icons/md';
import { FaWarehouse } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { RiShoppingBag3Fill, RiBillFill, RiAccountBoxFill, RiShoppingCartFill } from 'react-icons/ri';
import { TbCategory2 } from 'react-icons/tb';

const MENUS = [
  { title: 'Trang chủ', icon: ({ className }) => <MdAddHomeWork className={className} /> },
  { title: 'Quản lý kho', icon: ({ className }) => <FaWarehouse className={className} /> },
  { title: 'Quản lý thuốc', icon: ({ className }) => <GiMedicines className={className} /> },
  { title: 'Quản lý sản phẩm', icon: ({ className }) => <RiShoppingBag3Fill className={className} /> },
  { title: 'Quản lý liều', icon: ({ className }) => <RiBillFill className={className} /> },
  { title: 'Quản lý danh mục', icon: ({ className }) => <TbCategory2 className={className} /> },
  { title: 'Quản lý tài khoản', icon: ({ className }) => <RiAccountBoxFill className={className} /> },
  { title: 'Bán hàng', icon: ({ className }) => <RiShoppingCartFill className={className} /> },
];

function SideBar() {
  const [expand, setExpand] = useState(true);
  const transition = useTransition(expand, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    config: { duration: 300 },
  });

  const handleExpandSideBar = () => {
    setExpand(!expand);
  };

  const renderMenu = () => {
    return MENUS.map((item, index) => {
      const Icon = item.icon;
      return (
        <div
          key={index}
          className={classNames(
            'flex gap-5 items-center px-2 py-2 mx-3 cursor-pointer text-h5 rounded-lg text-dark_primary hover:bg-primary hover:text-white overflow-hidden',
          )}
        >
          <Icon className="text-[22px] flex-shrink-0 " />
          <h5 className={classNames('flex-1 text-h5 whitespace-nowrap ')}>{item.title}</h5>
        </div>
      );
    });
  };

  return (
    <div
      className={classNames(
        'h-full rounded-2xl shadow-[0_35px_40px_-15px_rgba(0,0,0,0.3)] bg-[#f9f9f9]/30  relative z-10 transition-all duration-700 delay-700 overflow-hidden',
        expand ? 'w-[260px]' : 'w-16',
      )}
    >
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

      {/* Menu sideBar */}
      <div className={classNames('mt-10 flex flex-col gap-2 select-none')}>{renderMenu()}</div>
    </div>
  );
}

export default SideBar;
