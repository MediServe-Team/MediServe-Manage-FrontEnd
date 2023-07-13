import { useState, useEffect } from 'react';
import StaffItem from '../components/StaffItem';
import CustomerItem from '../components/CustomerItem';
import Checkbox from '@mui/material/Checkbox';
import { BtnAddAcc } from '../components';
import { AccountCustomer, AccountStaff } from '../pages';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function ManageAccount() {
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Tài khoản',
        slug: '/accounts',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const all = ['staff', 'customer', 'customer', 'staff', 'staff', 'customer', 'staff', 'staff'];
  const [listUser, setListUser] = useState(all);
  const [role, setRole] = useState('customer');
  const [filterCustomer, setFilterCustomer] = useState(false);
  const [filterStaff, setFilterStaff] = useState(false);

  useEffect(() => {
    if ((filterCustomer === true && filterStaff === true) || (filterCustomer === false && filterStaff === false)) {
      setListUser(all);
    } else if (filterCustomer === true) {
      let result = all.filter((item) => item === 'customer');
      setListUser(result);
    } else if (filterStaff === true) {
      let result = all.filter((item) => item === 'staff');
      setListUser(result);
    }
  }, [all, filterCustomer, filterStaff]);

  const handleFilterCustomer = () => {
    setFilterCustomer(!filterCustomer);
  };

  const handleFilterStaff = () => {
    setFilterStaff(!filterStaff);
  };

  return (
    <div className="flex h-full">
      {/* List of accounts */}
      <div className="h-full w-1/4 bg-white rounded-2xl mr-3 pt-2">
        <div className="flex flex-col min-h-0 h-1/6 px-7 pb-2">
          <p className="text-text_primary font-bold text-h5 text-center min-h-0 flex items-center justify-center">
            Tài Khoản
          </p>
          <div className="flex min-h-0 pt-2">
            <Checkbox value="customer" size="small" onChange={handleFilterCustomer} />
            <p className="text-h6 my-auto">Khách Hàng</p>
          </div>

          <div className="flex min-h-0 pb-2">
            <Checkbox value="staff" size="small" onChange={handleFilterStaff} />
            <p className="text-h6 my-auto">Nhân Viên</p>
          </div>
          <div className="border-text_blur/60 border-t-2"></div>
        </div>

        <div className="flex h-4/6 min-h-0 pt-2 justify-center w-full">
          <div className="flex flex-col h-full overflow-y-auto gap-5 w-full">
            {listUser.map((item, index) =>
              item !== 'customer' ? (
                <button
                  className="w-full flex-grow-0 flex-shrink-0 hover:opacity-80 active:opacity-100"
                  order={item}
                  key={index}
                  onClick={() => setRole('staff')}
                >
                  <StaffItem order={item} key={index} />
                </button>
              ) : (
                <button
                  className="w-full flex-grow-0 flex-shrink-0 hover:opacity-80 active:opacity-100"
                  order={item}
                  key={index}
                  onClick={() => setRole('customer')}
                >
                  <CustomerItem order={item} key={index} />
                </button>
              ),
            )}
          </div>
        </div>

        <div className="flex h-1/6 min-h-0 justify-center items-center">
          <BtnAddAcc />
        </div>
      </div>
      {/* Info of accounts */}
      <div className={`${role === 'customer' ? 'flex' : 'hidden'} flex-col h-full w-3/4 bg-white rounded-2xl min-h-0`}>
        <AccountCustomer />
      </div>

      <div className={`${role === 'staff' ? 'flex' : 'hidden'} flex-col h-full w-3/4 bg-white rounded-2xl min-h-0`}>
        <AccountStaff />
      </div>
    </div>
  );
}

export default ManageAccount;
