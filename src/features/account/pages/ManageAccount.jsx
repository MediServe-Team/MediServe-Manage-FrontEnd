import { useState, useEffect } from 'react';
import StaffItem from '../components/StaffItem';
import CustomerItem from '../components/CustomerItem';
import CustomSwitch from '../components/CustomSwitch';
import Checkbox from '@mui/material/Checkbox';
import { BtnAddAcc } from '../components';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@mui/joy/Button';
import representImg from '../../../assets/images/GiaTriKhachHang.png';

function ManageAccount() {
  const [listUser, setListUser] = useState(['staff', 'customer', 'staff', 'staff', 'staff', 'staff', 'staff', 'staff']);
  const [navList, setNavList] = useState([]);

  let red = '#D41919',
    darkBlue = '#064861';

  useEffect(() => {
    const navs = [
      {
        name: 'staff',
        path: '/stock/all',
      },
      {
        name: 'customer',
        path: '/stock/prepare-out-of-stock',
      },
    ];

    setNavList(navs);
  }, []);

  return (
    <div className="flex h-full">
      <div className="h-full w-1/4 bg-white rounded-2xl mr-3 pt-2">
        <div className="flex flex-col min-h-0 h-1/6 px-7 pb-2">
          <p className="text-text_primary font-bold text-h5 text-center min-h-0 flex items-center justify-center">
            Tài Khoản
          </p>
          <div className="flex min-h-0 pt-2">
            <Checkbox value="customer" size="small" />
            <p className="text-h6 my-auto">Khách Hàng</p>
          </div>

          <div className="flex min-h-0 pb-2">
            <Checkbox value="staff" size="small" />
            <p className="text-h6 my-auto">Nhân Viên</p>
          </div>
          <div className="border-text_blur/60 border-t-2"></div>
        </div>

        <div className="flex h-4/6 min-h-0 pt-2 justify-center w-full">
          <div className="flex flex-col h-full overflow-y-auto gap-1 w-full">
            {listUser.map((item, index) =>
              item !== 'customer' ? <StaffItem order={item} key={index} /> : <CustomerItem order={item} key={index} />,
            )}
          </div>
        </div>

        <div className="flex h-1/6 min-h-0 justify-center items-center">
          <BtnAddAcc />
        </div>
      </div>

      <div className="flex flex-col h-full w-3/4 bg-white rounded-2xl min-h-0">
        <div className="flex h-[12.5%] min-h-0">
          <div className="flex w-[10%] justify-end items-end">
            <div className="bg-[url('https://i.ibb.co/cDz1NGp/86.jpg')] bg-cover h-14 w-14 rounded-full"></div>
          </div>
          <div className="flex flex-col w-[90%] justify-end items-start pl-6">
            <div className="text-black text-h4 font-medium truncate">Hoàng Văn Phúc</div>
            <div className="text-text_primary text-h6 font-medium">30 phút trước</div>
          </div>
        </div>

        <div className="flex justify-center h-[57.5%] w-full py-4 min-h-0">
          <div className="flex flex-col h-full w-5/6 border-text_blur/50 border-2 rounded-xl">
            <div className="flex h-[12%] min-h-0 justify-start pl-3 py-2">
              <p className="text-h6 rounded-lg flex justify-center items-center p-1.5 bg-tertiary/50">Khách hàng</p>
            </div>

            <div className="flex flex-col h-[76%] min-h-0">
              <div className="flex px-6">
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Thông tin cá nhân</p>
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Thông tin liên hệ</p>
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Khách hàng thành viên</p>
              </div>

              <div className="flex py-2 px-6 text-h7 min-h-0 min-w-0">
                <div className="flex flex-col w-1/3 gap-2">
                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Tên</p>
                    <input type="text" className="inputAccount" />
                  </div>

                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Tên đầy đủ</p>
                    <input type="text" className="inputAccount" />
                  </div>

                  <div className="flex pr-12 gap-5">
                    <div className="flex flex-col w-1/4">
                      <p className="text-text_primary font-medium">Tuổi</p>
                      <input type="number" className="inputAccount" />
                    </div>

                    <div className="flex flex-col w-3/4">
                      <p className="text-text_primary font-medium">Ngày sinh</p>
                      <input type="date" className="inputAccount" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/3 gap-2">
                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Số điện thoại</p>
                    <input type="number" className="inputAccount" />
                  </div>

                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Email</p>
                    <input type="email" className="inputAccount" />
                  </div>

                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Địa chỉ</p>
                    <input type="text" className="inputAccount" />
                  </div>
                </div>

                <div className="flex flex-col w-1/3 gap-2">
                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Số điểm tích lũy</p>
                    <input type="number" className="inputAccount" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[12%] min-h-0">
              <div className="flex w-1/2 justify-start items-start min-h-0 min-w-0 text-h6 pl-5">
                <CustomSwitch defaultChecked />
                <span className="ml-3">Cho phép hoạt động</span>
              </div>
              <div className="flex w-1/2 justify-end items-end min-h-0 min-w-0 pr-4 pb-3 gap-4">
                <Button
                  variant="outlined"
                  style={{
                    color: red,
                    borderColor: red,
                    borderWidth: 2,
                    paddingInline: '0.5rem',
                    fontSize: '15px',
                  }}
                  size="md"
                >
                  Xóa tài khoản
                </Button>
                <Button
                  className="hover:opacity-90 active:opacity-100"
                  variant="solid"
                  style={{ backgroundColor: darkBlue, paddingInline: '3rem', fontSize: '15px' }}
                  size="md"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[30%] min-h-0 min-w-0 w-full justify-center">
          <img src={representImg} alt="" />
        </div>
      </div>
      {/* Main page */}
    </div>
  );
}

export default ManageAccount;
