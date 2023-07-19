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
// import Button from '@mui/joy/Button';
import { BiXCircle } from 'react-icons/bi';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Medicine, Prescription, Dose } from '../../selling/components';
import { BsImage, BsPlusCircle, BsX } from 'react-icons/bs';
// component
import { Button } from '../../../components';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateAccountSchema } from '../../../validations/updateAccount';

function AccountStaff({ data, reloadParentPage }) {
  //* form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateAccountSchema) });

  const [listShop, setListShop] = useState([1, 1, 1, 1, 1]);
  const [preview, setPreview] = useState(false);
  const [listPermission, setListPermission] = useState([
    { name: 'Trang chủ', active: true },
    { name: 'Quản lý kho', active: false },
    { name: 'Quản lý thuốc', active: false },
    { name: 'Quản lý sản phẩm', active: false },
    { name: 'Quản lý liều', active: false },
    { name: 'Quản lý danh mục', active: false },
    { name: 'Quản lý tài khoản', active: false },
    { name: 'Bán hàng', active: false },
    { name: 'Thông tin cá nhân', active: false },
  ]);
  const [listTemp, setListTemp] = useState([
    { name: 'Trang chủ', active: true },
    { name: 'Quản lý kho', active: false },
    { name: 'Quản lý thuốc', active: false },
    { name: 'Quản lý sản phẩm', active: false },
    { name: 'Quản lý liều', active: false },
    { name: 'Quản lý danh mục', active: false },
    { name: 'Quản lý tài khoản', active: false },
    { name: 'Bán hàng', active: false },
    { name: 'Thông tin cá nhân', active: false },
  ]);
  const [openEditPer, setOpenEditPer] = useState(false);

  let red = '#FF6060',
    darkBlue = '#064861',
    orange = '#EA7408';

  useEffect(() => {
    listPermission.forEach((permission) => {
      setListTemp((prev) =>
        prev.map((item) => (item.name === permission.name ? { ...item, active: permission.active } : { ...item })),
      );
    });
  }, [listPermission]);

  const handleCloseModal = () => {
    listPermission.forEach((permission) => {
      setListTemp((prev) =>
        prev.map((item) => (item.name === permission.name ? { ...item, active: permission.active } : { ...item })),
      );
    });
  };

  const handleSavePermission = () => {
    setOpenEditPer(false);

    listTemp.forEach((temp) => {
      setListPermission((permission) =>
        permission.map((item) => (item.name === temp.name ? { ...item, active: temp.active } : { ...item })),
      );
    });
  };

  const handleDeletePer = (name) => {
    setListPermission((pre) => pre.map((item) => (item.name === name ? { ...item, active: false } : { ...item })));
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
          <div className="flex flex-col h-full w-[90%] border-text_blur/50 border-2 rounded-xl">
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
                    <button className="h-[7rem] w-full bg-light_gray border-dashed border-2 border-text_blur rounded-xl">
                      <BsImage
                        className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                        size={40}
                      />
                      <p className="text-text_primary">Chưa cung cấp</p>
                    </button>
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
                    <button className="h-[7rem] w-full bg-light_gray border-dashed border-2 border-text_blur rounded-xl">
                      <BsImage
                        className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                        size={40}
                      />
                      <p className="text-text_primary">Chưa cung cấp</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Permits */}
            <div className="flex flex-col flex-shrink px-6 my-4 gap-1">
              <span className="text-h7 text-text_primary font-medium">Cấp quyền</span>
              <div className="flex border-2 border-text_blur rounded-md p-1">
                <div className="flex w-[93%] gap-3 overflow-x-auto">
                  {listPermission.map((item, index) =>
                    item.active ? (
                      <div
                        key={index}
                        className="flex h-full rounded-md bg-secondary/80 justify-center items-center flex-grow-0 flex-shrink-0 p-2 gap-3"
                      >
                        <span className="text-white text-h6 h-full">{item.name}</span>
                        <button className="flex items-center" onClick={() => handleDeletePer(item.name)}>
                          <BsX size={20} />
                        </button>
                      </div>
                    ) : null,
                  )}
                </div>

                <div className="flex w-[7%] justify-center items-center">
                  <button
                    onClick={() => {
                      setOpenEditPer(true);
                    }}
                  >
                    <BsPlusCircle size={20} style={{ color: orange }} />
                  </button>

                  <Modal open={openEditPer} onClose={() => setOpenEditPer(false)}>
                    <ModalDialog
                      variant="outlined"
                      style={{
                        width: '45%',
                        height: '70%',
                        paddingInline: '0',
                        paddingBlock: '0',
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '1rem',
                        borderBottomLeftRadius: '0px',
                      }}
                    >
                      <div className="flex items-center border-b-2 border-text_blur/50 bg-primary rounded-tl-2xl py-2 px-3">
                        <div className="">
                          <div className="bg-[url('https://s3-alpha-sig.figma.com/img/711e/d2ed/22f41791a0dd8909af17f46dbccd8af8?Expires=1685923200&Signature=Df8uzSuQIW4cCzWheeEP6~zX9~~kTUXwRMI0VxZbii6FVFsUQlbaE~G6K3WHzQWHPAVZ7Dqeeh9x67BU2LT-uLA8QoRJLe35jgEP7X~mkSsYRzjq-NVZ4Ngi664ssb56eCMaV91WHVyKQ7oLf34ZArNon6l3B6C0nLFqFzYgvqvt~vydSdhqE8DDIHJUO1lr5PBmZWNx~a4OaBGC8nAwEttn96PrrxMk8wj~2cg43zH~GvKYbctogPw5GXe-d4QgKpt5ekmQmXqJWPYJQ1QrD-HcmqEt2KYe8X8~gBh0xL78ZCJ6KfpNPUs9Wmz4~7ZTe00tb8DXraicYGxDXDdszw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')] bg-cover h-10 w-10 rounded-full"></div>
                        </div>

                        <div className="flex justify-start items-center flex-grow pl-4">
                          <span className="text-white text-h4 font-medium truncate">Trần Minh Quang</span>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => {
                              handleCloseModal();
                              setOpenEditPer(false);
                            }}
                          >
                            <BiXCircle size={30} style={{ color: darkBlue }} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-grow p-8">
                        <div className="flex gap-8 flex-wrap">
                          {listTemp.map((item, index) => (
                            <PermissionItem key={index} item={item} />
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end items-end gap-4 pr-4 pb-4 h-full">
                        <Button
                          className="hover:opacity-90 active:opacity-100"
                          variant="solid"
                          style={{
                            backgroundColor: darkBlue,
                            width: '5rem',
                            height: '5rem',
                            fontSize: '18px',
                            borderRadius: '9999px',
                          }}
                          size="md"
                          onClick={handleSavePermission}
                        >
                          Lưu
                        </Button>
                      </div>
                    </ModalDialog>
                  </Modal>
                </div>
              </div>
            </div>

            <div className="flex flex-shrink">
              <div className="flex w-1/2 justify-start items-center min-h-0 min-w-0 text-h6 pl-5"></div>
              <div className="flex w-1/2 justify-end items-end min-h-0 min-w-0 pr-4 pb-3 gap-4">
                <Button size={'medium'} modifier={'danger'}>
                  Xóa tài khoản
                </Button>
                <Button size={'medium'} modifier={'dark-primary'} width={120}>
                  Lưu
                </Button>
              </div>
            </div>
          </div>
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
    </div>
  );
}

export default AccountStaff;
