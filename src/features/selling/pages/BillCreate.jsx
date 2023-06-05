import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {
  SubNavigate,
  ItemListMedicine,
  TitleListMedicine,
  TitleListPre,
  ItemListPre,
  Medicine,
  Prescription,
  Dose,
} from '../components';
import Button from '@mui/joy/Button';
import { TbRefresh } from 'react-icons/tb';
import { BsX, BsSearch, BsXCircleFill } from 'react-icons/bs';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';

export default function BillCreate() {
  const [navList, setNavList] = useState([]);
  const [listMedicine, setListMedicine] = useState(['1', '2', '3', '4', '5']);
  const [customer, setCustomer] = useState('guest');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [preview, setPreview] = useState(false);
  let darkBlue = '#064861';

  useEffect(() => {
    const navs = [
      {
        name: 'Sản phẩm/ Thuốc',
        path: '/bills/create/no-prescription',
        color: 'primary',
      },
      {
        name: 'Kê đơn',
        path: '/bills/create/prescription',
        color: 'primary',
      },
      {
        name: 'Liều có sẵn',
        path: '/bills/create/available-dose',
        color: 'primary',
      },
    ];

    setNavList(navs);
  }, []);

  const handleClearSearchCustomer = () => {
    setSearchCustomer('');
  };

  const handleSearchCustomer = (e) => {
    setSearchCustomer(e.target.value);
  };

  return (
    <div className="h-full flex gap-3">
      <div className="flex flex-col justify-between items-center px-5 bg-white rounded-xl w-[40%] max-w-[40%]">
        {/* navigate on page */}
        <div className="flex h-[8%] items-end pt-3 border-b-2 border-text_blur/50">
          <SubNavigate navs={navList} />
        </div>
        {/* Navigated page */}
        <div className="h-[92%] w-full">
          <Outlet />
        </div>
      </div>

      <div className="flex flex-col h-full w-[60%] min-w-0 bg-white rounded-xl max-w-[60%]">
        <header className="border-b-2 border-text_blur/50 h-[8%] pl-6 pt-4 w-full">
          <h3 className="text-h4 text-text_primary font-bold">Tạo hóa đơn</h3>
        </header>
        <div className="flex flex-col h-[32%] w-full">
          <div className="flex h-[25%] w-full px-9 items-center">
            <span className="w-1/2 text-left text-h5 font-semibold">Thông tin khách hàng</span>
            <div className="w-1/2 text-right text-h5">
              <select
                className={`text-text_primary font-medium rounded-md pl-2 pr-1 py-2 ${
                  customer === 'vip' ? 'bg-secondary/30' : 'bg-tertiary/30'
                }`}
                onChange={({ target }) => {
                  setCustomer(target.value);
                }}
              >
                <option value="guest" defaultChecked className="bg-white">
                  Khách hàng vãng lai
                </option>
                <option value="vip" className="bg-white">
                  Khách hàng hệ thống
                </option>
              </select>
            </div>
          </div>

          <div className={`h-[75%] w-full px-9 p-2 ${customer === 'vip' ? 'hidden' : 'flex'}`}>
            <div className="flex rounded-lg bg-text_blur/5 border-2 border-text_primary/30 w-full h-full px-16 py-3 gap-8  text-h5">
              <div className="h-full w-[80%] flex flex-col gap-4">
                <input
                  type="text"
                  className="border-text_blur h-full border-2 border-text_blur/50 rounded-md w-full px-3"
                  placeholder="Họ tên khách hàng"
                />
                <input
                  type="text"
                  className="border-text_blur h-full border-2 border-text_blur/50 rounded-md w-full px-3"
                  placeholder="Địa chỉ"
                />
              </div>
              <div className="h-full w-[20%] flex flex-col gap-4">
                <input
                  type="number"
                  className="border-text_blur h-full border-2 border-text_blur/50 rounded-md w-full px-3"
                  placeholder="Tuổi"
                />
                <select
                  className="border-text_blur h-full border-2 border-text_blur/50 rounded-md w-full pl-2"
                  placeholder="Giới tính"
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`h-[75%] flex-col gap-3 w-full px-9 p-2 ${customer === 'vip' ? 'flex' : 'hidden'}`}>
            <div className="flex w-full h-[35%] relative">
              <input
                type="text"
                className="bg-text_blur/10 w-full h-full pl-12 pr-12 rounded-lg"
                value={searchCustomer}
                onChange={handleSearchCustomer}
                placeholder="Tên khách hàng"
              />
              <button>
                <BsSearch className="text-text_blur text-h3 absolute left-[1.5%] top-[20%]" />
              </button>
              <button onClick={handleClearSearchCustomer}>
                <BsXCircleFill className="text-text_blur text-h3 absolute right-[1.5%] top-[20%]" />
              </button>
            </div>

            <div className="flex w-full h-[65%] rounded-md border-slate-300 border-2 px-7 py-2">
              <div className="w-2/3 flex flex-col justify-start items-center h-full">
                <span className="font-medium w-full h-1/2 flex items-center">
                  Họ tên khách hàng<span className="font-normal">: Trần Minh Quang</span>
                </span>
                <span className="font-medium w-full h-1/2 flex items-center">
                  Địa chỉ<span className="font-normal">: KTX Khu A, ĐHQG Hồ Chí Minh</span>
                </span>
              </div>
              <div className="w-1/3 flex flex-col justify-start items-center h-full">
                <span className="font-medium w-full h-1/2 flex items-center">
                  Tuổi<span className="font-normal">: 21</span>
                </span>
                <span className="font-medium w-full h-1/2 flex items-center">
                  Giới tính<span className="font-normal">: Nam</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[49%] w-full overflow-y-auto">
          <div className="flex h-[15%] w-full px-9 items-center">
            <span className="text-left text-h5 font-semibold">Thông tin sản phẩm/ thuốc</span>
          </div>
          <div className="px-9">
            <TitleListMedicine>
              {/* Data */}
              {listMedicine.map((item, index) => (
                <ItemListMedicine key={index} item={item}>
                  <button>
                    <BsX size={25} style={{ color: '#A8A8A8' }} />
                  </button>
                </ItemListMedicine>
              ))}
            </TitleListMedicine>
          </div>

          <div className="flex h-[15%] w-full px-9 items-center mt-5">
            <span className="text-left text-h5 font-semibold">Thông tin kê đơn</span>
          </div>
          <div className="px-9 text-h5">
            <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
              <div className="flex items-center">
                <span className="w-1/2 italic font-medium flex justify-start">Chuẩn đoán: Đau nhức xương khớp</span>
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

          <div className="px-9 text-h5 mt-8">
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

          <div className="flex h-[15%] w-full px-9 items-center mt-5">
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

          <div className="flex flex-col w-full px-9 items-center mt-5">
            <span className="w-full text-left text-h5 font-semibold pb-1">Ghi chú hóa đơn</span>
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

        <div className="h-[11%] w-full flex py-3 px-3">
          <div className="w-1/2">
            <Button
              startDecorator={<TbRefresh size={20} />}
              variant="outlined"
              style={{
                color: darkBlue,
                borderColor: darkBlue,
                borderWidth: 2,
                paddingInline: '1rem',
                fontWeight: 600,
                fontSize: '16px',
              }}
              size="md"
            >
              Làm trống
            </Button>
          </div>
          <div className="w-1/2 flex gap-3 justify-end">
            <Button
              className="hover:opacity-90 active:opacity-100"
              variant="solid"
              style={{
                backgroundColor: darkBlue,
                paddingInline: '1rem',
                fontWeight: 600,
                fontSize: '16px',
                color: 'white',
              }}
              size="md"
              onClick={() => setPreview(true)}
            >
              Xem trước
            </Button>
            <Button
              className="hover:opacity-90 active:opacity-100"
              variant="solid"
              style={{
                backgroundColor: darkBlue,
                paddingInline: '1rem',
                fontWeight: 600,
                fontSize: '16px',
                color: 'white',
              }}
              size="md"
            >
              Thanh toán và in
            </Button>
          </div>
        </div>
      </div>

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
  );
}
