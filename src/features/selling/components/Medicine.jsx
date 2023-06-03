import { useState } from 'react';

export default function Medicine() {
  const [listMedicine, setListMedicine] = useState([1, 1, 1, 1, 1]);

  function Title({ children, title, isDrug }) {
    return (
      <div className="flex flex-col h-full min-h-0">
        {/* heading */}
        <ul className="flex justify-between items-center gap-2 text-h5 font-medium border-b-2 border-text_blur/30 py-[5px]">
          <li className="flex-[12]">
            <span>Sản phẩm</span>
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
      <ul className="flex h-[60px] justify-between items-center gap-2 text-h5 border-b-2 border-text_blur/30">
        <li className="flex flex-[12] flex-col w-full truncate">
          <span className="font-medium">Levothyroxine (Viên)</span>
          <span className="text-text_blur">hộp 4 vĩ x 20 viên</span>
        </li>

        <li className="flex-[5] text-center">
          <span>5</span>
        </li>

        <li className="flex-[5] text-center">
          <span>10,000</span>
        </li>

        <li className="flex-[7] text-center">
          <span>50,000</span>
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
      </Title>
    </div>
  );
}
