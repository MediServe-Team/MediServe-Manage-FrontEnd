import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CustomSwitch from '../../category/components/CustomSwitch';
import { BsPlusSquareFill } from 'react-icons/bs';
import { BiXCircle } from 'react-icons/bi';
import { BsCloudUploadFill, BsCheckCircle } from 'react-icons/bs';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { Modal, ModalDialog, Radio, RadioGroup } from '@mui/joy';
import Checkbox from '@mui/material/Checkbox';
import { create } from '@mui/material/styles/createTransitions';

function BtnAddAcc({ children }) {
  const [open, setOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);

  const darkBlue = '#064861',
    red = '#D41919';

  return (
    <div className="bg-white h-1/2 w-3/4 rounded-lg mx-auto flex">
      <Button
        onClick={() => {
          setOpen(true);
          console.log(createAcc);
        }}
        className="flex min-h-0 w-full"
        variant="outlined"
        style={{ borderColor: darkBlue, borderWidth: '2px' }}
      >
        <p className="flex justify-center items-center text-h1 pr-2 text-text_primary/80 pb-2">+</p>
        <p className="flex items-center justify-start text-h4 text-text_primary/80">Thêm tài khoản</p>
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" style={{ width: '45%', fontSize: '16px', height: '100%' }}>
          <div className="flex items-center border-b-2 border-text_blur/50 pb-3">
            <div className="text-white bg-text_primary rounded-xl w-12 h-9 flex flex-shrink-0 justify-center items-center pb-2">
              <span className="h-full text-h2 flex justify-center items-center">+</span>
            </div>

            <span className="text-text_primary font-semibold ml-3 text-[18px] flex-shrink-0">Tạo mới khách hàng</span>

            <div className="w-full flex items-center justify-end">
              <button onClick={() => setOpen(false)}>
                <BiXCircle size={30} style={{ color: darkBlue }} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-7 px-6 h-[86%] border-b-2 border-text_blur/50 pb-3">
            <div className="flex pt-3 gap-16">
              <div className="w-1/2 flex flex-col gap-5 text-h6 font-semibold min-w-0">
                <span className="text-h5">Thông tin cá nhân</span>

                <div className="flex flex-col gap-1">
                  <span className="text-text_primary ">Tên</span>
                  <input className="px-2 py-1 border-2 border-text_primary rounded-lg" type="text" name="name" id="" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-text_primary">Tên đầy đủ</span>
                  <input className="px-2 py-1 border-2 border-text_primary rounded-lg" type="text" name="name" id="" />
                </div>

                <div className="flex gap-6">
                  <div className="w-[25%] flex flex-col min-w-0 gap-1">
                    <span className="text-text_primary">Tuổi</span>
                    <input
                      className="px-2 py-1 border-2 border-text_primary rounded-lg"
                      type="text"
                      name="name"
                      id=""
                    />
                  </div>

                  <div className="w-[75%] flex flex-col gap-1">
                    <span className="text-text_primary">Ngày sinh</span>
                    <input
                      className="px-2 py-1 border-2 border-text_primary rounded-lg"
                      type="date"
                      name="name"
                      id=""
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2 flex flex-col gap-5 text-h6 font-semibold min-w-0">
                <span className="text-h5">Thông tin liên hệ</span>

                <div className="flex flex-col gap-1">
                  <span className="text-text_primary">Số điện thoại</span>
                  <input
                    className="px-2 py-1 border-2 border-text_primary rounded-lg"
                    type="number"
                    name="name"
                    id=""
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-text_primary">Email</span>
                  <input className="px-2 py-1 border-2 border-text_primary rounded-lg" type="email" name="name" id="" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-text_primary">Địa chỉ</span>
                  <input className="px-2 py-1 border-2 border-text_primary rounded-lg" type="text" name="name" id="" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-h5 font-semibold">Vai trò</span>
              <div className="flex">
                <RadioGroup defaultValue="customer" name="role" orientation="horizontal" className="flex gap-10">
                  <Radio value="customer" label="Khách hàng" variant="outlined" size="sm" />
                  <Radio value="staff" label="Nhân viên" variant="outlined" size="sm" />
                </RadioGroup>
              </div>
            </div>

            <div className="flex h-[30%]">
              <div className="w-full h-full flex flex-col gap-1">
                <span className="text-h5 font-semibold">CMND/ CCCD</span>
                <button className="h-[9rem] w-[17rem] bg-light_gray border-dashed border-2 border-text_blur rounded-xl ">
                  <BsCloudUploadFill
                    className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                    size={50}
                  />
                  <p className="text-h5 text-text_primary">Nhấn vào đây để thêm ảnh</p>
                </button>
              </div>

              <div className="h-full flex flex-col flex-shrink-0 gap-1">
                <span className="text-h5 font-semibold">Bằng cấp</span>
                <button className="h-[9rem] w-[17rem] bg-light_gray border-dashed border-2 border-text_blur rounded-xl ">
                  <BsCloudUploadFill
                    className="text-text_primary hover:text-text_primary/80 active:text-text_primary text-center mx-auto"
                    size={50}
                  />
                  <p className="text-h5 text-text_primary">Nhấn vào đây để thêm ảnh</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex h-full w-full">
            <div className="w-1/2 h-full flex items-center justify-start">
              <Checkbox
                value="createAccount"
                size="small"
                className="bg-text_primary border-text_primary text-text_primary"
                onChange={() => {
                  setCreateAcc((pre) => !pre);
                }}
              />
              <span>Tạo kèm tài khoản</span>
            </div>
            <div className="flex w-1/2 h-full justify-end items-end gap-4">
              <Button
                variant="outlined"
                style={{
                  color: red,
                  borderColor: red,
                  borderWidth: 2,
                  paddingInline: '2rem',
                  fontSize: '15px',
                }}
                size="md"
                onClick={() => {
                  setOpen(false);
                  setCreateAcc(false);
                }}
              >
                Hủy bỏ
              </Button>
              <Button
                className="hover:opacity-90 active:opacity-100"
                variant="solid"
                style={{ backgroundColor: darkBlue, paddingInline: '2rem', fontSize: '15px' }}
                size="md"
                onClick={() => {
                  if (createAcc === true) {
                    setOpen(false);
                    setCreateAcc(false);
                    setOpenAcc(true);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                Tạo ngay
              </Button>
            </div>
          </div>
        </ModalDialog>
      </Modal>

      <Modal open={openAcc} onClose={() => setOpenAcc(false)}>
        <ModalDialog variant="outlined" style={{ width: '25%', fontSize: '16px' }}>
          <div className="flex items-center border-b-2 border-text_blur/50 pb-3 mb-3">
            <div className="text-white bg-text_primary rounded-xl w-12 h-9 flex flex-shrink-0 justify-center items-center">
              <BsCheckCircle size={22} />
            </div>

            <span className="text-text_primary font-semibold ml-3 text-[18px] flex-shrink-0">
              Tài khoản đã được tạo
            </span>
          </div>

          <div className="flex flex-col gap-5 px-12">
            <div className="flex flex-col gap-1 ">
              <span className="text-text_primary font-medium">Tài khoản</span>
              <input className="px-2 py-1 border-2 border-text_primary rounded-lg" type="text" name="account" id="" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Mật khẩu</span>
              <input
                className="px-2 py-1 border-2 border-text_primary rounded-lg"
                type="password"
                name="password"
                id=""
              />
            </div>
          </div>

          <div className="flex h-full justify-center items-center mt-5">
            <Button
              className="hover:opacity-90 active:opacity-100"
              variant="solid"
              style={{ backgroundColor: darkBlue, paddingInline: '2rem', fontSize: '15px' }}
              size="md"
              onClick={() => setOpenAcc(false)}
            >
              Xác nhận
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default BtnAddAcc;
