import { useState, useEffect } from 'react';
import StaffItem from '../components/StaffItem';
import CustomerItem from '../components/CustomerItem';
import Checkbox from '@mui/material/Checkbox';
import { BtnAddAcc } from '../components';
import { Button, EmptyImage } from '../../../components';
import { AccountCustomer, AccountStaff } from '../pages';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
// services
import { getAllAccountService, getAccountByIdService } from '../../../services/accountServices';
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
  const [accountSlected, setAccountSelected] = useState(null);
  const [reload, setReload] = useState(false);
  // api with token
  const axiosWithToken = useAxiosWithToken();

  //* Get all accounts
  useEffect(() => {
    const getAllAccounts = async () => {
      const result = await getAllAccountService(axiosWithToken);
      setAccounts(result.data);
    };
    getAllAccounts();
    // reset account selected when reload data
    setAccountSelected(null);
  }, [reload]);

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

  //* Handle select Account Customer
  const handleSelectCustomerAccount = async (accountId) => {
    const result = await getAccountByIdService(axiosWithToken, accountId);
    const accountData = { role: 'USER', data: result.data };
    setAccountSelected(accountData);
  };

  //* Handle select Account Staff
  const handleSelectStaffAccount = async (accountId) => {
    const result = await getAccountByIdService(axiosWithToken, accountId);
    const accountData = { role: 'STAFF', data: result.data };
    setAccountSelected(accountData);
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
          <div className="flex flex-col h-full overflow-y-auto gap-2 w-full">
            {filterAccounts &&
              Array.isArray(filterAccounts) &&
              filterAccounts.map((account, index) =>
                account.role === 'USER' ? (
                  <button
                    className="w-full flex-grow-0 flex-shrink-0 active:opacity-100"
                    key={index}
                    onClick={() => handleSelectCustomerAccount(account.id)}
                  >
                    <CustomerItem avatar={account.avatar} fullName={account.fullName} email={account.email} />
                  </button>
                ) : (
                  <button
                    className="w-full flex-grow-0 flex-shrink-0 hover:opacity-80 active:opacity-100"
                    key={index}
                    onClick={() => handleSelectStaffAccount(account.id)}
                  >
                    <StaffItem avatar={account.avatar} fullName={account.fullName} email={account.email} />
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

      {/* Info of accounts */}
      {!accountSlected ? (
        <div className="flex-col h-full w-3/4 bg-white rounded-2xl min-h-0 flex justify-center items-center">
          <EmptyImage title="Chưa có tài khoản được chọn" />
        </div>
      ) : accountSlected?.role === 'USER' ? (
        <div className={`flex-col h-full w-3/4 bg-white rounded-2xl min-h-0`}>
          <AccountCustomer data={accountSlected.data} reloadParentPage={setReload} />
        </div>
      ) : (
        <div className={`flex-col h-full w-3/4 bg-white rounded-2xl min-h-0`}>
          <AccountStaff />
        </div>
      )}
    </div>
  );
}

export default ManageAccount;
