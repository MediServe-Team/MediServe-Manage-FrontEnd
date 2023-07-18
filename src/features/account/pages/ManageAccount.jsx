import { useState, useEffect } from 'react';
import StaffItem from '../components/StaffItem';
import CustomerItem from '../components/CustomerItem';
import Checkbox from '@mui/material/Checkbox';
import { BtnAddAcc } from '../components';
import { Button } from '../../../components';
import { AccountCustomer, AccountStaff } from '../pages';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
// services
import { getAllAccountService } from '../../../services/accountServices';
import { useAxiosWithToken } from '../../../hooks';

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

  // state
  const [accounts, setAccounts] = useState([]);
  const [filterOption, setFilterOption] = useState('all'); //* option filter in ['none', 'customer', 'staff', 'all']
  const [filterAccounts, setFilterAccounts] = useState([]); //* filter from accounts and display in UI
  // api with token
  const axiosWithToken = useAxiosWithToken();

  //* Get all accounts
  useEffect(() => {
    const getAllAccounts = async () => {
      const result = await getAllAccountService(axiosWithToken);
      console.log(result.data);
      setAccounts(result.data);
    };
    getAllAccounts();
  }, []);

  //* Filter accounts
  useEffect(() => {
    let filters = [];
    switch (filterOption) {
      case 'all':
        filters = accounts;
        break;
      case 'customer':
        filters = accounts.filter((account) => account.role === 'USER');
        break;
      case 'staff':
        filters = accounts.filter((account) => account.role === 'STAFF');
        break;
      default:
        filters = [];
        break;
    }
    setFilterAccounts(filters);
  }, [accounts, filterOption]);

  //* Handle change filter option
  const handleChangeFilter = () => {
    const checkboxCustomer = document.querySelector('#checkbox-customer');
    const checkboxStaff = document.querySelector('#checkbox-staff');
    // check option
    if (checkboxCustomer.checked && checkboxStaff.checked) setFilterOption('all');
    else if (checkboxCustomer.checked) setFilterOption('customer');
    else if (checkboxStaff.checked) setFilterOption('staff');
    else setFilterOption('none');
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
            <Checkbox
              defaultChecked
              id="checkbox-customer"
              value="customer"
              size="small"
              onChange={handleChangeFilter}
            />
            <p className="text-h6 my-auto">Khách Hàng</p>
          </div>

          <div className="flex min-h-0 pb-2">
            <Checkbox defaultChecked id="checkbox-staff" value="staff" size="small" onChange={handleChangeFilter} />
            <p className="text-h6 my-auto">Nhân Viên</p>
          </div>
          <div className="border-text_primary/20 border-t-2"></div>
        </div>

        {/* List Accounts */}
        <div className="flex h-4/6 min-h-0 pt-2 justify-center w-full">
          <div className="flex flex-col h-full overflow-y-auto gap-5 w-full">
            {filterAccounts &&
              Array.isArray(filterAccounts) &&
              filterAccounts.map((account, index) =>
                account.role === 'USER' ? (
                  <button className="w-full flex-grow-0 flex-shrink-0 hover:opacity-80 active:opacity-100" key={index}>
                    <CustomerItem
                      key={index}
                      avatar={account.avatar}
                      fullName={account.fullName}
                      email={account.email}
                    />
                  </button>
                ) : (
                  <button className="w-full flex-grow-0 flex-shrink-0 hover:opacity-80 active:opacity-100" key={index}>
                    <StaffItem key={index} avatar={account.avatar} fullName={account.fullName} email={account.email} />
                  </button>
                ),
              )}
          </div>
        </div>

        <div className="flex h-1/6 min-h-0 justify-center items-center">
          <Button size={'medium'} className={'px-5'} modifier={'dark-primary'}>
            Thêm tài khoản
          </Button>
        </div>
      </div>
      {/* Info of accounts
      <div className={`${role === 'customer' ? 'flex' : 'hidden'} flex-col h-full w-3/4 bg-white rounded-2xl min-h-0`}>
        <AccountCustomer />
      </div>

      <div className={`${role === 'staff' ? 'flex' : 'hidden'} flex-col h-full w-3/4 bg-white rounded-2xl min-h-0`}>
        <AccountStaff />
      </div> */}
    </div>
  );
}

export default ManageAccount;
