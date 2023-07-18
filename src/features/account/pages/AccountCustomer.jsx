import { CustomSwitch, TitleShopping, ItemShopping } from '../components';
// import { FaShoppingCart } from 'react-icons/fa';
// import { BiDollar } from 'react-icons/bi';
import { Modal as MuiModal, ModalClose, ModalDialog } from '@mui/joy';
import { Medicine, Prescription, Dose } from '../../selling/components';
import { useState, useEffect } from 'react';
import { Button, Modal } from '../../../components';
import { AiOutlineClose } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import { BillPreview } from '../../selling/components/Bill';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateAccountSchema } from '../../../validations/updateAccount';
import classNames from 'classnames';
// services
import { updateAccountByIdService, deleteAccountService } from '../../../services/accountServices';
import { getBillOfUserService } from '../../selling/billServices';
import { useAxiosWithToken } from '../../../hooks';
import { toast } from 'react-toastify';

function AccountCustomer({ data, reloadParentPage }) {
  const [filter, setFilter] = useState('');
  const [listShop, setListShop] = useState([1, 1, 1, 1, 1]);
  const [preview, setPreview] = useState(false);
  const [bills, setBills] = useState([]);
  const [billSelectedId, setBillSelectedId] = useState(null);
  const axiosWithToken = useAxiosWithToken();
  //* modal
  const [openModalDelete, setOpenModalDelete] = useState(false);
  //* form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateAccountSchema) });

  // Set value init in first access
  useEffect(() => {
    setValue('name', data?.name);
    setValue('fullName', data?.fullName);
    setValue('address', data?.address ?? '');
    setValue('age', data?.age);
    if (data?.dateOfBirth) {
      setValue('dateOfBirth', new Date(data?.dateOfBirth));
    }
    setValue('phoneNumber', data?.phoneNumber ?? '');

    //* get all bill of user
    const getBills = async () => {
      const result = await getBillOfUserService(data.id);
      setBills(result?.data ?? []);
    };
    getBills();
  }, [data]);

  const handleUpdateAccount = async (dataForm) => {
    const result = await updateAccountByIdService(axiosWithToken, data.id, dataForm);
    console.log(result);
    if (result.status === 200) {
      toast.success('Cập nhật thông tin thành công!');
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật thông tin!');
    }
  };

  //* MODAL
  const handleDeleteAccount = async () => {
    const result = await deleteAccountService(axiosWithToken, data.id);
    if (result.status === 200) {
      toast.success('Xóa tài khoản thành công!');
      reloadParentPage((prevState) => !prevState);
    } else {
      toast.error('Hệ thống gặp sự cố xóa tài khoản!');
    }
  };

  //* PREVIEW BILL
  const handlePreviewBill = (billId) => {
    setBillSelectedId(billId);
    setPreview(true);
  };

  const handleClosePreviewBill = () => {
    setBillSelectedId(null);
    setPreview(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl">
      <div className="flex h-[12.5%] min-h-0">
        <div className="flex w-[10%] justify-end items-end">
          <img src={data.avatar} alt="avatar" className="h-14 w-14 rounded-full object-cover" />
        </div>
        <div className="flex flex-col w-[90%] justify-end items-start pl-6">
          <div className="text-black text-h4 font-medium truncate">{data.fullName}</div>
          <div className="text-text_primary text-h6 font-medium">Khách hàng </div>
        </div>
      </div>

      <div className="flex flex-col h-[87.5%] overflow-y-auto w-full items-center">
        <div className="flex justify-center w-full py-6">
          <form
            onSubmit={handleSubmit(handleUpdateAccount)}
            className="flex flex-col h-full w-[90%] border-text_blur/50 border-2 rounded-xl"
          >
            <div className="flex flex-col min-h-0">
              <div className="flex gap-12 px-6 pb-2 py-3 border-b-2 border-text_blur/50">
                <p className="w-full text-h6 font-medium pb-1">Thông tin cá nhân</p>
                <p className="w-full text-h6 font-medium pb-1">Thông tin liên hệ</p>
              </div>

              <div className="flex gap-12 py-2 px-6 text-h6 min-h-0 min-w-0">
                <div className="flex flex-col w-1/2 gap-5">
                  {/* Field name */}
                  <div className="flex flex-col">
                    <p className="text-text_primary font-medium">Tên</p>
                    <input
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                        errors.name?.message ? 'border-danger' : 'border-text_primary/20',
                      )}
                      {...register('name')}
                    />
                  </div>
                  {/* Field fullName */}
                  <div className="flex flex-col">
                    <p className="text-text_primary font-medium">Tên đầy đủ</p>
                    <input
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                        errors.fullName?.message ? 'border-danger' : 'border-text_primary/20',
                      )}
                      {...register('fullName')}
                    />
                  </div>
                  {/* Field age */}
                  <div className="flex gap-5">
                    <div className="flex flex-col flex-1">
                      <p className="text-text_primary font-medium">Tuổi</p>
                      <input
                        className={classNames(
                          'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                          errors.age?.message ? 'border-danger' : 'border-text_primary/20',
                        )}
                        {...register('age')}
                      />
                    </div>
                    {/* Field dateOfBirth */}
                    <div className="flex flex-col flex-[3]">
                      <p className="text-text_primary font-medium">Ngày sinh</p>
                      <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <DatePicker
                            className="border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2"
                            selected={field?.value}
                            onChange={(date) => {
                              return field.onChange(date);
                            }}
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* Field phoneNumber */}
                <div className="flex flex-col w-1/2 gap-5">
                  <div className="flex flex-col">
                    <p className="text-text_primary font-medium">Số điện thoại</p>
                    <input
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                        errors.phoneNumber?.message ? 'border-danger' : 'border-text_primary/20',
                      )}
                      {...register('phoneNumber')}
                    />
                  </div>
                  {/* Field email */}
                  <div className="flex flex-col">
                    <p className="text-text_primary font-medium">Email</p>
                    <input
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                      )}
                      defaultValue={data.email}
                      disabled
                    />
                  </div>
                  {/* Field address */}
                  <div className="flex flex-col">
                    <p className="text-text_primary font-medium">Địa chỉ</p>
                    <input
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                        errors.address?.message ? 'border-danger' : 'border-text_primary/20',
                      )}
                      {...register('address')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 py-4">
              <div className="flex w-1/2 justify-start items-center min-h-0 min-w-0 text-h6"></div>
              <div className="flex w-1/2 justify-end items-end min-h-0 min-w-0 pr-4 pb-3 gap-4">
                <Button type={'button'} size={'medium'} modifier={'danger'} onClick={() => setOpenModalDelete(true)}>
                  Xóa tài khoản
                </Button>
                <Button type={'submit'} size={'medium'} modifier={'dark-primary'} width={120}>
                  Lưu
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* <div className="flex flex-col min-h-[40%] w-[90%]">
          <div className="w-full flex justify-end min-h-0">
            <select className="px-2 py-1" onChange={({ target }) => setFilter(target.value)}>
              <option value="date" className="bg-white">
                Ngày
              </option>
              <option value="month" defaultChecked className="bg-white">
                Tháng
              </option>
              <option value="year" className="bg-white">
                Năm
              </option>
            </select>
          </div>

          <span className="text-[18px] font-medium min-h-0">Giá trị khách hàng</span>

          <div className="flex gap-6 h-[70%] mt-3">
            <div
              className="flex h-full flex-col w-1/3 rounded-lg drop-shadow-lg"
              style={{ background: 'linear-gradient(180deg, #3998BC 0%, rgba(126, 204, 234, 0.58) 100%)' }}
            >
              <div className="h-[30%]"></div>
              <div className="h-[50%]"></div>
              <span className="h-[20%] text-white text-end text-h8 font-medium pr-2 pb-2">Tần suất mua hàng</span>
            </div>

            <div className="flex h-full flex-col w-1/3 bg-white rounded-lg drop-shadow-lg">
              <div className="h-[30%] w-full pl-2 pt-1">
                <div className="rounded-full bg-orange-200/70 h-10 w-10 flex justify-center items-center">
                  <div className="text-[22px] text-text_primary">
                    <FaShoppingCart />
                  </div>
                </div>
              </div>
              <div className="h-[50%] flex justify-center items-center">
                <span className="text-text_primary text-h2 font-medium">
                  15<span className="text-h5 font-normal"> /tháng</span>
                </span>
              </div>
              <span className="h-[20%] text-end text-h8 text-text_blur font-medium pr-2 pb-2">Số lần mua hàng</span>
            </div>

            <div className="flex h-full flex-col w-1/3 bg-white rounded-lg drop-shadow-lg">
              <div className="h-[30%] w-full pl-2 pt-1">
                <div className="rounded-full bg-tertiary/50 h-10 w-10 flex justify-center items-center">
                  <div className="text-[28px] font-bold text-text_primary">
                    <BiDollar />
                  </div>
                </div>
              </div>
              <div className="h-[50%] flex justify-center items-center">
                <span className="text-text_primary text-h2 font-medium">
                  650.000<span className="text-h5 font-normal"> vnđ</span>
                </span>
              </div>
              <span className="h-[20%] text-end text-h8 text-text_blur font-medium pr-2 pb-2">Doanh thu mang lại</span>
            </div>
          </div>
        </div> */}

        {bills && Array.isArray(bills) && bills.length > 0 && (
          <div className="flex flex-col min-h-[60%] w-[90%] mt-4 mb-6 gap-3">
            <span className="text-[18px] font-medium min-h-0 mb-">Lịch sử mua hàng</span>
            <TitleShopping>
              {bills.map((bill, index) => (
                <ItemShopping key={index} data={bill}>
                  <button
                    className="rounded-xl bg-primary/80 text-white py-1 px-5"
                    onClick={() => handlePreviewBill(bill.id)}
                  >
                    <span className="truncate">Chi tiết</span>
                  </button>
                </ItemShopping>
              ))}
            </TitleShopping>
          </div>
        )}
      </div>

      {/* Preview bill */}
      <BillPreview preview={preview} closePreview={handleClosePreviewBill} billId={billSelectedId} />

      {/* Modal Delete */}
      <Modal showModal={openModalDelete}>
        <div className="w-[300px] flex flex-col items-center gap-5 relative">
          {/* Info modal */}
          <header className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-text_primary font-bold text-h4">Xác nhận</h3>
              <p className="text-text_blur text-h6">
                Bạn chắc chắn xác nhận muốn xóa tài khoản <b className="text-black">{data.fullName}</b> ra khỏi hệ
                thống?
              </p>
            </div>
            {/* close modal delete */}
            <button className="outline-none absolute right-0 top-0" onClick={() => setOpenModalDelete(false)}>
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </header>
          {/* Button control modal*/}
          <div className="flex justify-between items-center mt-5 gap-5">
            <Button
              size={'medium'}
              styleBtn={'outline'}
              modifier={'gray'}
              width={120}
              type={'button'}
              onClick={() => setOpenModalDelete(false)}
            >
              Hủy
            </Button>
            <Button size={'medium'} modifier={'danger'} width={120} type={'button'} onClick={handleDeleteAccount}>
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AccountCustomer;
