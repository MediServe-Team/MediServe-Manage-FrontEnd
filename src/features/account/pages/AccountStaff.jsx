import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  CustomSwitch,
  TitleShopping,
  ItemShopping,
  TitleStock,
  ItemStock,
  TitleDose,
  ItemDose,
  Permission,
  PermissionItem,
} from '../components';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/material/Checkbox';
import { BiXCircle } from 'react-icons/bi';
import { Modal, ModalClose, ModalDialog, Radio, RadioGroup } from '@mui/joy';
import { Medicine, Prescription, Dose } from '../../selling/components';
import { BsCloudUploadFill, BsPlusCircle, BsX } from 'react-icons/bs';

function AccountStaff() {
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
          <div className="bg-[url('https://s3-alpha-sig.figma.com/img/711e/d2ed/22f41791a0dd8909af17f46dbccd8af8?Expires=1685923200&Signature=Df8uzSuQIW4cCzWheeEP6~zX9~~kTUXwRMI0VxZbii6FVFsUQlbaE~G6K3WHzQWHPAVZ7Dqeeh9x67BU2LT-uLA8QoRJLe35jgEP7X~mkSsYRzjq-NVZ4Ngi664ssb56eCMaV91WHVyKQ7oLf34ZArNon6l3B6C0nLFqFzYgvqvt~vydSdhqE8DDIHJUO1lr5PBmZWNx~a4OaBGC8nAwEttn96PrrxMk8wj~2cg43zH~GvKYbctogPw5GXe-d4QgKpt5ekmQmXqJWPYJQ1QrD-HcmqEt2KYe8X8~gBh0xL78ZCJ6KfpNPUs9Wmz4~7ZTe00tb8DXraicYGxDXDdszw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')] bg-cover h-14 w-14 rounded-full"></div>
        </div>
        <div className="flex flex-col w-[90%] justify-end items-start pl-6">
          <div className="text-black text-h4 font-medium truncate">Trần Minh Quang</div>
          <div className="text-text_primary text-h6 font-medium">1 phút trước</div>
        </div>
      </div>

      <div className="flex flex-col h-[87.5%] overflow-y-auto w-full items-center">
        <div className="flex justify-center flex-shrink w-full py-6">
          <div className="flex flex-col flex-shrink w-[90%] border-text_blur/50 border-2 rounded-xl">
            <div className="flex h-[12%] min-h-0 justify-start pl-3 py-2">
              <p className="text-h6 rounded-lg flex justify-center items-center px-3 py-1 bg-secondary/50">Nhân viên</p>
            </div>

            <div className="flex flex-col flex-shrink">
              <div className="flex px-6 pb-2 pt-1">
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Thông tin cá nhân</p>
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Thông tin liên hệ</p>
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Bằng cấp và chứng nhận</p>
              </div>

              <div className="flex py-2 px-6 text-h7 min-h-0 min-w-0">
                <div className="flex flex-col w-1/3 gap-5">
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
                      <input type="" className="inputAccount" />
                    </div>

                    <div className="flex flex-col w-3/4">
                      <p className="text-text_primary font-medium">Ngày sinh</p>
                      <input type="date" className="inputAccount" />
                    </div>
                  </div>

                  <div className="flex flex-col pr-12">
                    <span className="text-text_primary font-medium">CMND/ CCCD</span>
                    <button className="h-[7rem] w-full bg-light_gray border-dashed border-2 border-text_blur rounded-xl">
                      <BsCloudUploadFill
                        className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                        size={40}
                      />
                      <p className="text-text_primary">Nhấn vào đây để thêm ảnh</p>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-1/3 gap-5">
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

                <div className="flex flex-col w-1/3 gap-5">
                  <div className="flex flex-col pr-12">
                    <p className="text-text_primary font-medium">Số chứng chỉ hành nghề dược</p>
                    <input type="number" className="inputAccount" />
                  </div>

                  <div className="flex flex-col pr-12">
                    <span className="text-text_primary font-medium">Bằng cấp</span>
                    <button className="h-[7rem] w-full bg-light_gray border-dashed border-2 border-text_blur rounded-xl">
                      <BsCloudUploadFill
                        className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                        size={40}
                      />
                      <p className="text-text_primary">Nhấn vào đây để thêm ảnh</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-shrink px-6 my-4 gap-1">
              <span className="text-h7 text-text_primary font-medium">Cấp quyền</span>
              <div className="flex border-2 border-text_blur rounded-xl py-2 pl-2">
                <div className="flex w-[93%] gap-3 overflow-x-auto">
                  {listPermission.map((item, index) =>
                    item.active ? (
                      <div
                        key={index}
                        className="flex h-full rounded-lg bg-secondary/80 justify-center items-center flex-grow-0 flex-shrink-0 px-2 py-1 gap-3"
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
              <div className="flex w-1/2 justify-start items-center min-h-0 min-w-0 text-h6 pl-5">
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

        <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
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

          <Modal open={preview} onClose={() => setPreview(false)}>
            <ModalDialog variant="outlined" style={{ width: '45%', fontSize: '16px', paddingLeft: '2rem' }}>
              <ModalClose />
              {/* Header */}
              <header className="text-text_primary text-[18px] font-semibold">Hóa đơn xem trước</header>
              {/* Info of pharmacy */}
              <div className="px-2 overflow-y-auto mt-4">
                <div className="font-semibold">Thông tin nhà dược</div>

                <div className="px-2">
                  <div className="flex">
                    <span>Tên nhà dược</span>
                    <p>: abc</p>
                  </div>
                  <div className="flex">
                    <span>Địa chỉ nhà dược</span>
                    <p>: abc</p>
                  </div>
                  <div className="flex">
                    <span>Thồng tin liên hệ</span>
                    <p>: abc</p>
                  </div>
                </div>

                <div className="text-h4 font-bold flex justify-center items-center mt-3">HÓA ĐƠN</div>
                {/* Info of customer */}
                <div className="flex my-3">
                  <div className="flex flex-col w-[70%]">
                    <span>
                      Họ tên khách hàng: <span className="font-semibold">Hoàng Văn Phúc</span>
                    </span>
                    <span>
                      Địa chỉ: <span className="font-semibold">KTX khu A, DHQG tp HCM</span>
                    </span>
                  </div>

                  <div className="flex flex-col w-[30%]">
                    <span>
                      Tuổi: <span className="font-semibold">21</span>
                    </span>
                    <span>
                      Giới tính: <span className="font-semibold">Nam</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Info of Medicine */}
                  <Medicine />
                  {/* Info of Prescription */}
                  <div className="text-[18px] font-semibold">Kê đơn</div>
                  <Prescription />
                  {/* Info of Dose */}
                  <Dose />
                  {/* Info of Price and Note */}
                  <div className="flex w-full">
                    <span className="w-full text-left text-h5 font-semibold border-b-2 border-text_blur/30">
                      Thanh toán (VNĐ)
                    </span>
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
                        <span>750,000 đ</span>
                        <span>750,000 đ</span>
                        <span>0 đ</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="w-full text-left text-h5 font-semibold pb-1">Ghi chú hóa đơn</span>
                    <div className=" w-full">
                      <textarea
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        className="w-full rounded-md border-text_blur/50 border-2 p-2"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </ModalDialog>
          </Modal>
        </div>

        <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
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

          <Modal open={preview} onClose={() => setPreview(false)}>
            <ModalDialog variant="outlined" style={{ width: '45%', fontSize: '16px', paddingLeft: '2rem' }}>
              <ModalClose />
              {/* Header */}
              <header className="text-text_primary text-[18px] font-semibold">Hóa đơn xem trước</header>
              {/* Info of pharmacy */}
              <div className="px-2 overflow-y-auto mt-4">
                <div className="font-semibold">Thông tin nhà dược</div>

                <div className="px-2">
                  <div className="flex">
                    <span>Tên nhà dược</span>
                    <p>: abc</p>
                  </div>
                  <div className="flex">
                    <span>Địa chỉ nhà dược</span>
                    <p>: abc</p>
                  </div>
                  <div className="flex">
                    <span>Thồng tin liên hệ</span>
                    <p>: abc</p>
                  </div>
                </div>

                <div className="text-h4 font-bold flex justify-center items-center mt-3">HÓA ĐƠN</div>
                {/* Info of customer */}
                <div className="flex my-3">
                  <div className="flex flex-col w-[70%]">
                    <span>
                      Họ tên khách hàng: <span className="font-semibold">Hoàng Văn Phúc</span>
                    </span>
                    <span>
                      Địa chỉ: <span className="font-semibold">KTX khu A, DHQG tp HCM</span>
                    </span>
                  </div>

                  <div className="flex flex-col w-[30%]">
                    <span>
                      Tuổi: <span className="font-semibold">21</span>
                    </span>
                    <span>
                      Giới tính: <span className="font-semibold">Nam</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Info of Medicine */}
                  <Medicine />
                  {/* Info of Prescription */}
                  <div className="text-[18px] font-semibold">Kê đơn</div>
                  <Prescription />
                  {/* Info of Dose */}
                  <Dose />
                  {/* Info of Price and Note */}
                  <div className="flex w-full">
                    <span className="w-full text-left text-h5 font-semibold border-b-2 border-text_blur/30">
                      Thanh toán (VNĐ)
                    </span>
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
                        <span>750,000 đ</span>
                        <span>750,000 đ</span>
                        <span>0 đ</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="w-full text-left text-h5 font-semibold pb-1">Ghi chú hóa đơn</span>
                    <div className=" w-full">
                      <textarea
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        className="w-full rounded-md border-text_blur/50 border-2 p-2"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </ModalDialog>
          </Modal>
        </div>

        <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
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

          <Modal open={preview} onClose={() => setPreview(false)}>
            <ModalDialog variant="outlined" style={{ width: '45%', fontSize: '16px', paddingLeft: '2rem' }}>
              <ModalClose />
              {/* Header */}
              <header className="text-text_primary text-[18px] font-semibold">Hóa đơn xem trước</header>
              {/* Info of pharmacy */}
              <div className="px-2 overflow-y-auto mt-4">
                <div className="font-semibold">Thông tin nhà dược</div>

                <div className="px-2">
                  <div className="flex">
                    <span>Tên nhà dược</span>
                    <p>: abc</p>
                  </div>
                  <div className="flex">
                    <span>Địa chỉ nhà dược</span>
                    <p>: abc</p>
                  </div>
                  <div className="flex">
                    <span>Thồng tin liên hệ</span>
                    <p>: abc</p>
                  </div>
                </div>

                <div className="text-h4 font-bold flex justify-center items-center mt-3">HÓA ĐƠN</div>
                {/* Info of customer */}
                <div className="flex my-3">
                  <div className="flex flex-col w-[70%]">
                    <span>
                      Họ tên khách hàng: <span className="font-semibold">Hoàng Văn Phúc</span>
                    </span>
                    <span>
                      Địa chỉ: <span className="font-semibold">KTX khu A, DHQG tp HCM</span>
                    </span>
                  </div>

                  <div className="flex flex-col w-[30%]">
                    <span>
                      Tuổi: <span className="font-semibold">21</span>
                    </span>
                    <span>
                      Giới tính: <span className="font-semibold">Nam</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Info of Medicine */}
                  <Medicine />
                  {/* Info of Prescription */}
                  <div className="text-[18px] font-semibold">Kê đơn</div>
                  <Prescription />
                  {/* Info of Dose */}
                  <Dose />
                  {/* Info of Price and Note */}
                  <div className="flex w-full">
                    <span className="w-full text-left text-h5 font-semibold border-b-2 border-text_blur/30">
                      Thanh toán (VNĐ)
                    </span>
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
                        <span>750,000 đ</span>
                        <span>750,000 đ</span>
                        <span>0 đ</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <span className="w-full text-left text-h5 font-semibold pb-1">Ghi chú hóa đơn</span>
                    <div className=" w-full">
                      <textarea
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        className="w-full rounded-md border-text_blur/50 border-2 p-2"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </ModalDialog>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AccountStaff;
