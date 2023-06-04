import { useState, useEffect } from 'react';
import { CustomSwitch, TitleShopping, ItemShopping } from '../components';
import Button from '@mui/joy/Button';
import { FaShoppingCart } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Medicine, Prescription, Dose } from '../../selling/components';

function AccountCustomer() {
  const [filter, setFilter] = useState('');
  const [listShop, setListShop] = useState([1, 1, 1, 1, 1]);
  const [preview, setPreview] = useState(false);

  let red = '#FF6060',
    darkBlue = '#064861';

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl">
      <div className="flex h-[12.5%] min-h-0">
        <div className="flex w-[10%] justify-end items-end">
          <div className="bg-[url('https://i.ibb.co/cDz1NGp/86.jpg')] bg-cover h-14 w-14 rounded-full"></div>
        </div>
        <div className="flex flex-col w-[90%] justify-end items-start pl-6">
          <div className="text-black text-h4 font-medium truncate">Hoàng Văn Phúc</div>
          <div className="text-text_primary text-h6 font-medium">30 phút trước</div>
        </div>
      </div>

      <div className="flex flex-col h-[87.5%] overflow-y-auto w-full items-center">
        <div className="flex justify-center h-[80%] min-h-[80%] w-full py-6">
          <div className="flex flex-col h-full w-[90%] border-text_blur/50 border-2 rounded-xl">
            <div className="flex h-[12%] min-h-0 justify-start pl-3 py-2">
              <p className="text-h6 rounded-lg flex justify-center items-center p-1.5 bg-tertiary/50">Khách hàng</p>
            </div>

            <div className="flex flex-col h-[73%] min-h-0">
              <div className="flex px-6 pb-2 pt-1">
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Thông tin cá nhân</p>
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Thông tin liên hệ</p>
                <p className="w-full border-b-2 border-text_blur/50 text-h6 font-medium pb-1">Khách hàng thành viên</p>
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
                    <p className="text-text_primary font-medium">Số điểm tích lũy</p>
                    <input type="number" className="inputAccount" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[15%] min-h-0">
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

        <div className="flex flex-col min-h-[40%] w-[90%]">
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
        </div>

        <div className="flex flex-col min-h-[60%] w-[90%] mt-8 mb-6 gap-3">
          <span className="text-[18px] font-medium min-h-0 mb-">Lịch sử mua hàng</span>
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
            <ModalDialog style={{ width: '45%', fontSize: '16px', paddingLeft: '2rem' }}>
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

export default AccountCustomer;
