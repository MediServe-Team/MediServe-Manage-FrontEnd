import { useState, useEffect } from 'react';
import {
  CustomSwitch,
  TitleShopping,
  ItemShopping,
  TitleStock,
  ItemStock,
  TitleDose,
  ItemDose,
  PermissionItem,
} from '../components';
import { BiXCircle } from 'react-icons/bi';
// import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Medicine, Prescription, Dose } from '../../selling/components';
import { BsImage, BsPlusCircle, BsX } from 'react-icons/bs';
// component
import { Button, Modal } from '../../../components';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
// services
import { updateAccountStaffService, deleteAccountService } from '../../../services/accountServices';
import { useAxiosWithToken } from '../../../hooks';
import { toast } from 'react-toastify';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateAccountStaffSchema } from '../../../validations/updateAccountStaff';
import { AiOutlineClose } from 'react-icons/ai';

// Permits in app
const _PERMITS = [
  { name: 'Trang chủ', permitId: 1 },
  { name: 'Quản lý kho', permitId: 2 },
  { name: 'Quản lý thuốc', permitId: 3 },
  { name: 'Quản lý sản phẩm', permitId: 4 },
  { name: 'Quản lý liều', permitId: 5 },
  { name: 'Quản lý danh mục', permitId: 6 },
  { name: 'Bán hàng', permitId: 7 },
];

function AccountStaff({ data, reloadParentPage }) {
  //* state
  const axiosWithToken = useAxiosWithToken();
  const [permits, setPermits] = useState([]);
  //* state modal
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalPermit, setOpenModalPermit] = useState(false);
  //* form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateAccountStaffSchema) });

  //* Set value init in first access
  useEffect(() => {
    setValue('name', data?.name);
    setValue('fullName', data?.fullName);
    setValue('address', data?.address ?? '');
    setValue('age', data?.age);
    if (data?.dateOfBirth) {
      setValue('dateOfBirth', new Date(data?.dateOfBirth));
    }
    setValue('phoneNumber', data?.phoneNumber ?? '');
    setValue('numOfPPC', data?.numOfPPC);
    setPermits(data?.permitList ?? []);
  }, [data]);

  //* Handle update account
  const handleUpdateAccount = async (dataForm) => {
    dataForm.permitList = permits;
    const result = await updateAccountStaffService(axiosWithToken, data.id, dataForm);
    if (result.status === 200) {
      toast.success('Cập nhật thông tin thành công!');
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật thông tin!');
    }
  };

  //* Handle delete account
  const handleDeleteAccount = async () => {
    const result = await deleteAccountService(axiosWithToken, data.id);
    if (result.status === 200) {
      toast.success('Xóa tài khoản thành công!');
      reloadParentPage((prevState) => !prevState);
    } else {
      toast.error('Hệ thống gặp sự cố xóa tài khoản!');
    }
  };

  // const [listShop, setListShop] = useState([1, 1, 1, 1, 1]);
  // const [preview, setPreview] = useState(false);

  //* Handle add permits
  const handleAddPermits = (permitId) => {
    const newPermits = [...permits, permitId];
    setPermits([...newPermits]);
  };

  //* Handle delete permits
  const handleDeletePermits = (permitId) => {
    const newPermits = permits.filter((permit) => permit !== permitId);
    setPermits([...newPermits]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl">
      <div className="flex h-[12.5%] min-h-0">
        <div className="flex w-[10%] justify-end items-end">
          <img src={data.avatar} alt="avatar" className="h-14 w-14 rounded-full object-cover" />
        </div>
        <div className="flex flex-col w-[90%] justify-end items-start pl-6">
          <div className="text-black text-h4 font-medium truncate">{data.fullName}</div>
          <div className="text-text_primary text-h6 font-medium">Nhân viên</div>
        </div>
      </div>

      {/* Account Information */}
      <div className="flex flex-col h-[87.5%] overflow-y-auto w-full items-center">
        <div className="flex justify-center flex-shrink w-full py-6">
          <form
            onSubmit={handleSubmit(handleUpdateAccount)}
            className="flex flex-col h-full w-[90%] border-text_blur/50 border-2 rounded-xl"
          >
            <div className="flex flex-col min-h-0">
              <div className="flex gap-12 px-6 pb-2 py-3 border-b-2 border-text_blur/50">
                <p className="w-full text-h6 font-medium pb-1">Thông tin cá nhân</p>
                <p className="w-full text-h6 font-medium pb-1">Thông tin liên hệ</p>
                <p className="w-full text-h6 font-medium pb-1">Bằng cấp và chứng nhận</p>
              </div>
              {/* Form account information */}
              <div className="flex gap-12 py-2 px-6 text-h6 min-h-0 min-w-0">
                {/* Field name */}
                <div className="flex flex-col w-1/3 gap-5">
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
                  {/* Field Age */}
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
                  {/* Field cardIdentify */}
                  <div className="flex flex-col">
                    <span className="text-text_primary font-medium">CMND/ CCCD</span>
                    <div className="h-[7rem] w-full bg-light_gray border-dashed border-2 border-text_blur rounded-xl flex flex-col justify-center items-center overflow-hidden">
                      {data?.identityCard ? (
                        <img src={data?.identityCard} alt="identityCard" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <BsImage
                            className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                            size={40}
                          />
                          <p className="text-text_primary">Chưa cung cấp</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* Field phoneNumber */}
                <div className="flex flex-col w-1/3 gap-5">
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
                {/* Field numOfPPC */}
                <div className="flex flex-col w-1/3 gap-5">
                  <div className="flex flex-col">
                    <p className="text-text_primary font-medium">Số chứng chỉ hành nghề dược</p>
                    <input
                      className={classNames(
                        'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                        errors.numOfPPC?.message ? 'border-danger' : 'border-text_primary/20',
                      )}
                      {...register('numOfPPC')}
                    />
                  </div>
                  {/* Field cerfication */}
                  <div className="flex flex-col">
                    <span className="text-text_primary font-medium">Bằng cấp</span>
                    <div className="h-[7rem] w-full bg-light_gray border-dashed border-2 border-text_blur rounded-xl flex flex-col justify-center items-center overflow-hidden">
                      {data?.certificate ? (
                        <img src={data?.certificate} alt="certificate" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <BsImage
                            className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                            size={40}
                          />
                          <p className="text-text_primary">Chưa cung cấp</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* List Permits of Account */}
            <div className="flex flex-col flex-shrink px-6 my-4 gap-1">
              <span className="text-h6 text-text_primary font-medium">Quyền hạn</span>
              <div className="flex border-2 border-text_blur rounded-md p-1 min-h-[40px]">
                <div className="flex w-[93%] gap-3 overflow-x-auto">
                  {permits &&
                    Array.isArray(permits) &&
                    permits.length > 0 &&
                    permits.map((permit, index) => {
                      const permitDisplay = _PERMITS.find((item) => item.permitId === permit);
                      return (
                        <div
                          key={index}
                          className="flex h-full rounded-md bg-secondary/80 justify-center items-center flex-grow-0 flex-shrink-0 p-2 gap-3"
                        >
                          <span className="text-white text-h6 h-full">{permitDisplay.name}</span>
                          <button
                            type="button"
                            className="flex items-center"
                            onClick={() => handleDeletePermits(permitDisplay.permitId)}
                          >
                            <BsX size={20} />
                          </button>
                        </div>
                      );
                    })}
                </div>
                {/* Button open modal add permit */}
                <div className="flex w-[7%] justify-center items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenModalPermit(true);
                    }}
                  >
                    <BsPlusCircle size={20} className="text-secondary" />
                  </button>
                </div>
              </div>
            </div>
            {/* Button control update and delete account */}
            <div className="flex flex-shrink">
              <div className="flex w-1/2 justify-start items-center min-h-0 min-w-0 text-h6 pl-5"></div>
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

        {/* <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
          <span className="text-[18px] font-medium min-h-0 mb-">Hóa đơn đã tạo</span>
          <TitleShopping>
            {listShop.map((item, index) => (
              <ItemShopping key={index} item={item}>
                <button className="rounded-xl bg-primary/80 text-white py-1 px-5" onClick={() => setPreview(true)}>
                  <span className="truncate">Chi tiết</span>
                </button>
              </ItemShopping>
            ))}
          </TitleShopping>

          // Modal preview 
        </div> */}

        {/* <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
          <span className="text-[18px] font-medium min-h-0 mb-">Đơn hàng đã nhập</span>
          <TitleStock>
            {listShop.map((item, index) => (
              <ItemStock key={index} item={item}>
                <button className="rounded-xl bg-primary/80 text-white py-1 px-5" onClick={() => setPreview(true)}>
                  <span className="truncate">Chi tiết</span>
                </button>
              </ItemStock>
            ))}
          </TitleStock>
        </div> */}

        {/* <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
          <span className="text-[18px] font-medium min-h-0 mb-">Liều thuốc đã tạo</span>
          <TitleDose>
            {listShop.map((item, index) => (
              <ItemDose key={index} item={item}>
                <button className="rounded-xl bg-primary/80 text-white py-1 px-5" onClick={() => setPreview(true)}>
                  <span className="truncate">Chi tiết</span>
                </button>
              </ItemDose>
            ))}
          </TitleDose>  
        </div> */}
      </div>

      {/* Modal add permits */}
      <Modal showModal={openModalPermit}>
        {/* Header modal add permits */}
        <header className="flex items-center pb-3 border-b-2 border-text_blur/50 min-w-[400px] max-w-[400px]">
          <div className="flex-shrink-0">
            <img src={data?.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
          </div>
          <div className="flex flex-col justify-start items-start flex-grow pl-4">
            <span className="text-text_primary text-h5 font-medium truncate">{data?.fullName}</span>
            <span className="text-text_blur text-h6 font-normal">Chọn quyền hạn muốn thêm</span>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="p-2 hover:bg-slate-100 rounded-md"
              onClick={() => {
                setOpenModalPermit(false);
              }}
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
        </header>
        {/* Body - Render permit rest of account */}
        <div className="flex gap-3 max-w-full flex-wrap py-4 w-[400px]">
          {(() => {
            const permitRest = _PERMITS.filter((item) => !permits.includes(item.permitId));
            return permitRest && Array.isArray(permitRest) && permitRest.length > 0 ? (
              permitRest.map((item, index) => (
                <PermissionItem key={index} name={item.name} onClick={() => handleAddPermits(item.permitId)} />
              ))
            ) : (
              <></>
            );
          })()}
        </div>
        {/* Button control Modal add Permits */}
        <div className="flex justify-end items-end gap-4 pt-4 h-full">
          <Button
            type={'button'}
            size={'medium'}
            modifier={'dark-primary'}
            width={120}
            onClick={() => setOpenModalPermit(false)}
          >
            Hoàn tất
          </Button>
        </div>
      </Modal>

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

export default AccountStaff;
