import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import classNames from 'classnames';
// component
import { SearchOnChange } from '../../../../components';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InforGuestSchema } from '../../../../validations/inforGuest';
import Tippy from '@tippyjs/react/headless';
// service
import { filterAccountCustomer } from '../../../../services/accountServices';
import { useDebounce } from '../../../../hooks';

function CustomerInfor({}, ref) {
  const [searchCustomer, setSearchCustomer] = useState('');
  const [isGuest, setIsGuest] = useState(true);
  const [visibleSelectCustomer, setVisibleSelectCustomer] = useState(false);
  const [visibleCustomerResult, setVisibleCustomerResult] = useState(true);
  const [customerResults, setCustomerResults] = useState([]);
  const [cusomerSystem, setCustomerSystem] = useState({});
  const customerDebounced = useDebounce(searchCustomer);
  // Form customer data
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(InforGuestSchema) });

  useImperativeHandle(ref, () => ({
    getCustomer: async () => {
      if (isGuest) {
        const passValidate = await trigger();
        if (passValidate) {
          const customerInfo = getValues();
          return {
            fullName: customerInfo.fullName,
            age: Number(customerInfo.age),
            gender: Boolean(customerInfo.gender),
            address: customerInfo.address,
          };
        }
      } else if (Object.keys(cusomerSystem).length !== 0) {
        return cusomerSystem;
      }
    },
    clearCustomer: () => {
      setCustomerSystem({});
      reset({ fullName: '', address: '', age: '' });
    },
  }));

  //? handle search onchage customer
  useEffect(() => {
    const filterCustomer = async () => {
      if (customerDebounced) {
        const result = await filterAccountCustomer(customerDebounced);
        setCustomerResults(result.data);
      } else {
        setCustomerResults([]);
      }
    };
    filterCustomer();
  }, [customerDebounced]);

  //* fn render result search customer:
  const renderSearchCustomerResult = () => {
    return (
      <div className="flex flex-col">
        {customerResults &&
          customerResults.map((account, index) => (
            <div
              className="flex justify-around items-center py-2 hover:bg-text_blur/10 cursor-pointer"
              key={index}
              onClick={() => handleAddCustomerSystem(account)}
            >
              <p className="font-medium">{account.fullName}</p>
              <p className="text-text_blur">{account.gender === 0 ? 'Nữ' : 'Nam'}</p>
              <p className="text-text_blur">{account.age} tuổi</p>
              <p className="text-text_blur">{account.email}</p>
            </div>
          ))}
      </div>
    );
  };

  //* handle search customer change:
  const handleSearchCustomerChange = (e) => {
    setVisibleCustomerResult(true);
    setSearchCustomer(e.target.value);
  };

  //* fn handle add customer system
  const handleAddCustomerSystem = (account) => {
    const { id, fullName, gender, age, email } = account;
    const accountSelected = { id, fullName, gender, age, email };
    setCustomerSystem(accountSelected);
    setVisibleCustomerResult(false);
  };

  //* handle clear seach customer:
  const handleClearSeachCustomer = () => {
    setVisibleCustomerResult(false);
    setSearchCustomer('');
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Thông tin khách hàng</span>
        <Tippy
          visible={visibleSelectCustomer}
          interactive={true}
          placement="bottom-start"
          onClickOutside={() => setVisibleSelectCustomer(false)}
          render={(attrs) => (
            <div tabIndex="-1" {...attrs}>
              <div className="bg-white w-[200px] rounded-md shadow-[0px_3px_7px_-1px_rgba(0,0,0,0.45)]">
                <p
                  className="p-2 cursor-pointer hover:bg-text_blur/10"
                  onClick={() => {
                    setIsGuest(true);
                    setVisibleSelectCustomer(false);
                    setCustomerSystem({});
                    setSearchCustomer('');
                  }}
                >
                  Khách hàng vãng lai
                </p>
                <p
                  className="p-2 cursor-pointer hover:bg-text_blur/10"
                  onClick={() => {
                    setIsGuest(false);
                    setVisibleSelectCustomer(false);
                  }}
                >
                  Khách hàng hệ thống
                </p>
              </div>
            </div>
          )}
        >
          <div
            className={classNames(
              'w-[200px] h-[40px] rounded-md flex justify-evenly items-center cursor-pointer hover:opacity-90 shadow-[0px_3px_4px_-1px_rgba(0,0,0,0.25)]',
              isGuest ? 'bg-[#c1fcff]' : 'bg-secondary/40',
            )}
            onClick={() => setVisibleSelectCustomer(true)}
          >
            <span className="text-text_primary">{isGuest ? 'Khách hàng vãng lai' : 'Khách hàng hệ thống'}</span>
            <MdOutlineKeyboardArrowDown className="text-[20px]" />
          </div>
        </Tippy>
      </div>
      {isGuest ? (
        //*  Customer not have account:
        <div className="flex gap-4 border-[1px] border-text_primary/20 rounded-[4px] p-5 bg-text_blur/5">
          <div className="flex flex-col gap-4 w-3/5">
            {/* Name customer */}
            <input
              type="text"
              {...register('fullName')}
              placeholder="Họ tên khách hàng"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-[#89acb4] transition-all duration-200 px-2',
                errors.fullName?.message ? 'border-danger' : 'border-text_primary/20',
              )}
            />
            {/* Address */}
            <input
              type="text"
              {...register('address')}
              placeholder="Địa chỉ"
              className="border-2 w-full h-[40px] outline-none rounded-md border-text_primary/20 focus:border-[#89acb4] transition-all duration-200 px-2"
            />
          </div>
          {/* Age */}
          <div className="flex flex-col gap-5 w-2/5">
            <input
              type="text"
              {...register('age')}
              placeholder="Tuổi"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-[#89acb4] transition-all duration-200 px-2',
                errors.age?.message ? 'border-danger' : 'border-text_primary/20',
              )}
            />
            {/* Gender */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value={true}
                  {...register('gender')}
                  defaultChecked
                />
                <label htmlFor="gender-male">Nam</label>
              </div>
              <div className="flex items-center gap-3">
                <input id="gender-female" type="radio" name="gender" {...register('gender')} value={false} />
                <label htmlFor="gender-female">Nữ</label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        //* Customer have account:
        <div className="flex flex-col gap-4">
          <Tippy
            visible={visibleCustomerResult && customerResults?.length > 0}
            interactive={true}
            placement="bottom-start"
            onClickOutside={() => setVisibleCustomerResult(false)}
            render={(attrs) => (
              <div
                tabIndex="-1"
                {...attrs}
                className={
                  'w-full min-w-[600px] max-h-[400px] rounded-md overflow-y-auto shadow-[0px_2px_13px_-4px_rgba(0,0,0,0.8)]'
                }
              >
                <div className="bg-white rounded-md">{renderSearchCustomerResult()}</div>
              </div>
            )}
          >
            <div className="">
              <SearchOnChange
                placeholder={'Tìm kiếm với tên khách hàng'}
                value={searchCustomer}
                onChange={handleSearchCustomerChange}
                onClear={handleClearSeachCustomer}
              />
            </div>
          </Tippy>
          {/* Customer infor selected */}
          {cusomerSystem && Object.keys(cusomerSystem).length > 0 && (
            <div className="flex gap-5 border-2 border-text_primary/20 rounded-md p-5 bg-text_blur/5">
              <div className="flex flex-col gap-5 w-3/5">
                {/* Name customer */}
                <p className="font-medium">
                  Họ tên khách hàng: <span className="font-normal">{cusomerSystem.fullName}</span>
                </p>
                {/* Address */}
                <p className="font-medium">
                  Địa chỉ: <span className="font-normal">{cusomerSystem.address}</span>
                </p>
              </div>
              {/* Age */}
              <div className="flex flex-col gap-5 w-2/5">
                <p className="font-medium">
                  Tuổi: <span className="font-normal">{cusomerSystem.age}</span>
                </p>
                {/* Gender */}
                <p className="font-medium">
                  Giới tính: <span className="font-normal">{cusomerSystem.gender === 0 ? 'Nữ' : 'Nam'}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default forwardRef(CustomerInfor);
