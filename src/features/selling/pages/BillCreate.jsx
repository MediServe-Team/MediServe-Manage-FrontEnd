import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SubNavigate, ItemListMP, TitleListMP, TitleListPre, ItemListPre } from '../components';
import { Button, SearchOnChange } from '../../../components';
import Tippy from '@tippyjs/react/headless';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsX } from 'react-icons/bs';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import classNames from 'classnames';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InforGuestSchema } from '../../../validations/inforGuest';
// service
import { filterAccountCustomer } from '../../../services/accountServices';
import { useDebounce } from '../../../hooks';

export default function BillCreate() {
  const [navList, setNavList] = useState([]);
  const [listMedicine, setListMedicine] = useState(['1', '2']);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [preview, setPreview] = useState(false);
  // customer
  const [isGuest, setIsGuest] = useState(true);
  const [visibleSelectCustomer, setVisibleSelectCustomer] = useState(false);
  const [visibleCustomerResult, setVisibleCustomerResult] = useState(true);
  const [customerResults, setCustomerResults] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [cusomerSystem, setCustomerSystem] = useState({});
  // product & medicine in bill
  const [products, setProducts] = useState([]);
  const [medicines, setMedicines] = useState([]);
  // debounce
  const customerDebounced = useDebounce(searchCustomer);

  // Tab Navigate
  useEffect(() => {
    const navs = [
      {
        name: 'Sản phẩm',
        path: '/bills/create/product',
      },
      {
        name: 'Thuốc',
        path: '/bills/create/medicine',
      },
      {
        name: 'Kê đơn',
        path: '/bills/create/new-dose',
      },
      {
        name: 'Liều có sẵn',
        path: '/bills/create/available-dose',
      },
    ];
    setNavList(navs);
  }, []);

  // Form customer data
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(InforGuestSchema) });

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

  //* handle search customer change:
  const handleSearchCustomerChange = (e) => {
    setVisibleCustomerResult(true);
    setSearchCustomer(e.target.value);
  };

  //* handle clear seach customer:
  const handleClearSeachCustomer = () => {
    setVisibleCustomerResult(false);
    setSearchCustomer('');
  };

  //* fn handle add customer system
  const handleAddCustomerSystem = (account) => {
    const { id, fullName, gender, age, email } = account;
    const accountSelected = { id, fullName, gender, age, email };
    setCustomerSystem(accountSelected);
    setVisibleCustomerResult(false);
  };

  //* fn render result search customer:
  const renderSearchCustomerResult = () => {
    return (
      <div className="flex flex-col">
        {customerResults.map((account, index) => (
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

  //*TODO: products
  const handleDeleteProduct = (index) => {
    console.log('~removed', index);
    const newProduct = [...products];
    setProducts([...newProduct.slice(0, index), ...newProduct.slice(index + 1)]);
  };

  //*TODO: medicines
  const handleDeleteMedicine = (index) => {
    const newMedicine = [...medicines];
    setMedicines([...newMedicine.slice(0, index), ...newMedicine.slice(index + 1)]);
  };

  //todo: Checkout
  const handleCheckout = async () => {
    if (isGuest) {
      const passValidate = await trigger();
      if (passValidate) {
        const customerInfo = getValues();
        console.log(customerInfo);
      }
    } else if (Object.keys(cusomerSystem).length !== 0) {
      console.log(cusomerSystem);
    }
  };

  useEffect(() => {
    console.log('~change', products);
  }, [products]);

  return (
    <div className="h-full flex gap-3">
      <div className="flex flex-col justify-between px-5 bg-white rounded-xl w-[40%]">
        {/* navigate on page */}
        <div className="flex justify-start pt-3 flex-shrink-0">
          <SubNavigate navs={navList} />
        </div>
        {/* Navigated page */}
        <div className="flex-1 w-full min-h-0">
          <Outlet context={{ setProducts, setMedicines }} />
        </div>
      </div>

      {/* Sub page right */}
      <div className="flex flex-col h-full w-[60%] bg-white rounded-xl">
        <header className="border-b-2 border-text_blur/50 pl-6 pt-4 pb-1 w-full">
          <h3 className="text-h4 text-text_primary font-bold">Tạo hóa đơn</h3>
        </header>
        {/* body */}
        <div className="flex-1 flex flex-col w-full min-h-0 px-6 pt-5">
          <div className="flex-1 flex flex-col gap-5 overflow-y-auto min-h-0">
            {/* Customer info */}
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
                      'w-[200px] h-[40px] rounded-md flex justify-evenly items-center cursor-pointer hover:opacity-90',
                      isGuest ? 'bg-tertiary' : 'bg-secondary/40',
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
                <div className="flex gap-5 border-2 border-text_primary/20 rounded-md p-5 bg-text_blur/5">
                  <div className="flex flex-col gap-5 w-3/5">
                    {/* Name customer */}
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="Họ tên khách hàng"
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                        errors.name?.message ? 'border-danger' : 'border-text_primary/20',
                      )}
                    />
                    {/* Address */}
                    <input
                      type="text"
                      {...register('address')}
                      placeholder="Địa chỉ"
                      className="border-2 w-full h-[40px] outline-none rounded-md border-text_primary/20 focus:border-text_primary transition-all duration-200 px-2"
                    />
                  </div>
                  {/* Age */}
                  <div className="flex flex-col gap-5 w-2/5">
                    <input
                      type="text"
                      {...register('age')}
                      placeholder="Tuổi"
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
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
                          value={1}
                          {...register('gender')}
                          defaultChecked
                        />
                        <label htmlFor="gender-male">Nam</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input id="gender-female" type="radio" name="gender" {...register('gender')} value={0} />
                        <label htmlFor="gender-female">Nữ</label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                //* Customer have account:
                <div className="flex flex-col gap-4">
                  <Tippy
                    visible={visibleCustomerResult && customerResults.length > 0}
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
                          Giới tính: <span className="font-normal">{cusomerSystem.gender == 0 ? 'Nữ' : 'Nam'}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info product in dose */}
            {products && products.length > 0 && (
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">Thông tin sản phẩm</span>
                </div>
                <div className="px-2">
                  <TitleListMP title="Tên sản phẩm">
                    {/* Data */}
                    {products.map((product, index) => (
                      <ItemListMP
                        key={index}
                        number={index + 1}
                        id={product.productId}
                        name={product.productName}
                        quantity={product.quantity}
                        sellPrice={product.sellPrice}
                        unit={product.sellUnit}
                        totalPrice={product.totalPrice}
                      >
                        <button onClick={() => handleDeleteProduct(index)}>
                          <BsX size={25} style={{ color: '#A8A8A8' }} />
                        </button>
                      </ItemListMP>
                    ))}
                  </TitleListMP>
                </div>
              </div>
            )}

            {/* Info  medicine in dose */}
            {medicines && medicines.length > 0 && (
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">Thông tin thuốc</span>
                </div>
                <div className="px-2">
                  <TitleListMP title="Tên sản phẩm">
                    {/* Data */}
                    {medicines.map((medicine, index) => (
                      <ItemListMP
                        key={index}
                        number={index + 1}
                        id={medicine.medicineId}
                        name={medicine.medicineName}
                        quantity={medicine.quantity}
                        sellPrice={medicine.sellPrice}
                        unit={medicine.sellUnit}
                        totalPrice={medicine.totalPrice}
                      >
                        <button onClick={() => handleDeleteMedicine(index)}>
                          <BsX size={25} style={{ color: '#A8A8A8' }} />
                        </button>
                      </ItemListMP>
                    ))}
                  </TitleListMP>
                </div>
              </div>
            )}

            {/* Info Prescription */}
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Thông tin kê đơn</span>
              <div>
                {/* new Dose */}
                <div className="px-2 text-h5">
                  <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
                    <div className="flex items-center">
                      <span className="w-1/2 italic font-medium flex justify-start">
                        Chuẩn đoán: Đau nhức xương khớp
                      </span>
                      <div className="w-1/2 flex justify-end">
                        <button>
                          <BsX size={25} style={{ color: '#A8A8A8' }} />
                        </button>
                      </div>
                    </div>
                    <div className="pt-3">
                      <TitleListPre>
                        {/* Data */}
                        {listMedicine.map((item, index) => (
                          <ItemListPre key={index} item={item} />
                        ))}
                      </TitleListPre>
                    </div>
                    <span className="pt-3 pb-1 text-right font-medium">
                      Tổng giá đơn thuốc: <span className="text-secondary font-normal">250,000</span>
                    </span>
                  </div>
                </div>

                {/* Dose Availble */}
                <div className="px-2 text-h5 mt-8">
                  <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
                    <div className="flex items-center">
                      <span className="w-1/2 italic font-medium flex justify-start">Liều thuốc: Đau mỏi vai gáy</span>
                      <div className="w-1/2 flex justify-end">
                        <button>
                          <BsX size={25} style={{ color: '#A8A8A8' }} />
                        </button>
                      </div>
                    </div>
                    <div className="pt-3">
                      <TitleListPre>
                        {/* Data */}
                        {listMedicine.map((item, index) => (
                          <ItemListPre key={index} />
                        ))}
                      </TitleListPre>
                    </div>
                    <span className="pt-3 pb-1 text-right font-medium">
                      Tổng giá đơn thuốc: <span className="text-secondary font-normal">250,000</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Infor checkout */}
            <div className="">
              <div className="flex items-center mt-5">
                <span className="w-full font-semibold border-b-2 border-text_blur/30">Thanh toán (VNĐ)</span>
              </div>
              <div className="flex w-full">
                <div className="w-1/2"></div>
                <div className="flex w-1/2">
                  <div className="w-1/2 flex flex-col gap-3 font-medium">
                    <span>Tổng tiền phải trả:</span>
                    <span>Tiền khách đưa:</span>
                    <span>Tiền thừa:</span>
                  </div>
                  <div className="w-1/2 flex gap-3 flex-col">
                    <span className="text-secondary">750,000 đ</span>
                    <input
                      type="text"
                      value="750,000 đ"
                      className="pl-2 w-[60%] py-1 border-2 border-text_blur/50 rounded-lg"
                      disabled
                    />
                    <span className="text-tertiary">0 đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Bill */}
            <div className="flex flex-col w-full items-center mt-5">
              <span className="w-full font-semibold pb-1">Ghi chú hóa đơn</span>
              <div className=" w-full">
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="3"
                  className="w-full rounded-md border-text_blur/50 border-2 p-2"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Area control button */}
        <div className="w-full flex py-3 px-6 flex-shrink-0">
          {/* Cancel Btn */}
          <div className="w-1/2">
            <Button size="medium" modifier={'danger'} width={120}>
              Loại bỏ
            </Button>
          </div>
          {/* Preview Btn */}
          <div className="w-1/2 flex gap-5 justify-end">
            <Button size="medium" modifier={'dark-primary'} width={120} onClick={() => setPreview(true)}>
              Xem trước
            </Button>
            <Button size="medium" modifier={'dark-primary'} onClick={handleCheckout}>
              Thanh toán và in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
