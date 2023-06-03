import { useState } from 'react';

export default function Prescription() {
  const [listMedicine, setListMedicine] = useState([1, 1, 1, 1, 1]);

  function Title({ children, title, isDrug }) {
    return (
      <div className="flex flex-col h-full min-h-0">
        {/* heading */}
        <span className="font-medium italic">
          Chuẩn đoán: <span>Đau nhức xương khớp</span>
        </span>
        <ul className="flex justify-between items-center gap-2 text-h5 font-medium border-b-2 border-text_blur/30 py-[5px] ml-5">
          <li className="flex-[12]">
            <span>Thuốc</span>
          </li>
          <li className="flex-[5] text-center">
            <span>SL</span>
          </li>
          <li className="flex-[5] text-center">
            <span>Giá</span>
          </li>
          <li className="flex-[7] text-center">
            <span>Thành tiền</span>
          </li>
        </ul>
        {/* body */}
        <ul className="flex h-full flex-col gap-3 mt-2">{children}</ul>
      </div>
    );
  }

  function Item({ item, children }) {
    return (
      <ul className="flex h-[60px] justify-between items-center gap-2 text-h5 border-b-2 border-text_blur/30 ml-5">
        <li className="flex flex-[12] flex-col w-full truncate">
          <span className="font-medium">Levothyroxine (Viên)</span>
          <span className="text-text_blur">Sáng: 2v, Trưa: 1v, Tối: 2v</span>
        </li>

        <li className="flex-[5] text-center">
          <span>30</span>
        </li>

        <li className="flex-[5] text-center">
          <span>2,000</span>
        </li>

        <li className="flex-[7] text-center">
          <span>60,000</span>
        </li>
      </ul>
    );
  }

  return (
    <div className="">
      <Title>
        {/* Data */}
        {listMedicine.map((item, index) => (
          <Item key={index} item={item} />
        ))}
        <span className="ml-5 italic" style={{ textDecorationLine: 'underline' }}>
          Ghi chú: <span>Uống sau khi ăn ít nhất 30 phút</span>
        </span>
        <div className="text-end font-medium">
          Tổng giá đơn thuốc: <span>60,000</span>
        </div>
      </Title>
    </div>
  );
}
