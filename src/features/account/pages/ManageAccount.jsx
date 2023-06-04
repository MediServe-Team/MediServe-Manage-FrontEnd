import { useState, useEffect } from 'react';
import StaffItem from '../components/StaffItem';
import CustomerItem from '../components/CustomerItem';
import CustomSwitch from '../components/CustomSwitch';
import Checkbox from '@mui/material/Checkbox';
import { BtnAddAcc } from '../components';
import Button from '@mui/joy/Button';
import { FaShoppingCart } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { AccountCustomer } from '../pages';

function ManageAccount() {
  const [listUser, setListUser] = useState(['staff', 'customer', 'staff', 'staff', 'staff', 'staff', 'staff', 'staff']);
  const [filter, setFilter] = useState('');

  let red = '#FF6060',
    darkBlue = '#064861';

  return (
    <div className="flex h-full">
      {/* List of accounts */}
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
      {/* Info of accounts */}
      <div className="flex flex-col h-full w-3/4 bg-white rounded-2xl min-h-0">
        <AccountCustomer />
      </div>
    </div>
  );
}

export default ManageAccount;
