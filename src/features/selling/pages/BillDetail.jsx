import { useState } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { ItemListMedicine, TitleListMedicine, TitleListPre, ItemListPre } from '../components';
import { useNavigate } from 'react-router-dom';

function BillDetail() {
  const [listMedicine, setListMedicine] = useState(['1', '2', '3', '4', '5', '3', '4', '5']);
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-white rounded-xl flex flex-col ">
      <header className="border-b-2 border-text_blur/50 h-[10%] flex gap-3 pl-10 pt-5 pb-1 w-full">
        <button className="text-text_primary text-h3" onClick={() => navigate(-1)}>
          <BsArrowLeftCircleFill />
        </button>
        <h3 className="text-h4 text-text_primary font-bold">Xem chi tiết hóa đơn</h3>
      </header>

      <div className="h-[90%] w-full overflow-y-auto">
        <div className="flex w-full h-[15%] px-9 items-center">
          <span className="text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
            Thông tin khách hàng
          </span>
        </div>

        <div className="flex px-9 h-[15%]">
          <div className="flex w-full h-full px-9 rounded-md border-2 border-text_blur">
            <div className="w-2/3 flex flex-col justify-start items-center h-full">
              <span className="font-medium w-full h-1/2 flex items-center">
                Họ tên khách hàng<span className="font-normal">: Hoàng Văn Phúc</span>
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

        <div className="flex h-[15%] w-full px-9 items-center mt-5">
          <span className="text-left text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
            Thông tin sản phẩm/ thuốc
          </span>
        </div>
        <div className="px-9">
          <TitleListMedicine>
            {/* Data */}
            {listMedicine.map((item, index) => (
              <ItemListMedicine key={index} item={item} />
            ))}
          </TitleListMedicine>
        </div>

        <div className="flex h-[15%] w-full px-9 items-center mt-5">
          <span className="text-left text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
            Thông tin kê đơn
          </span>
        </div>

        <div className="px-9 text-h5">
          <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
            <div className="flex items-center">
              <span className="w-1/2 italic font-medium flex justify-start">Chuẩn đoán: Đau nhức xương khớp</span>
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
    </div>
  );
}

export default BillDetail;
