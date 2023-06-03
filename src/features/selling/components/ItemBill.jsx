import { Children } from 'react';
import { BsX, BsPencilFill, BsTrashFill } from 'react-icons/bs';

function ItemBill({ item, children }) {
  return (
    <ul className="flex justify-between items-center bg-primary/20 p-2 rounded-lg gap-2 text-h5 px-2 flex-shrink-0 border-2 border-text_blur/30 text-text_primary">
      <li className="flex-[1] text-center items-center flex justify-center">
        <input type="checkbox" className="h-[1rem] w-[1rem]" />
      </li>
      <li className="flex-[4] items-center flex justify-center">
        <div className="bg-white flex justify-center w-2/3 py-1 px-4 rounded-md truncate">
          <span>HD2052</span>
        </div>
      </li>
      <li className="flex-[5] items-center flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <span>Trần Minh Quang</span>
          <span className="text-text_blur">NV2052</span>
        </div>
      </li>
      <li className="flex-[4] items-center flex justify-center">
        <div className="bg-white flex justify-center w-[5/6] py-1 px-4 rounded-md truncate">
          <span>22/03/2023</span>
        </div>
      </li>
      <li className="flex-[5] items-center flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <span>Hoàng Văn Phúc</span>
          <span className="text-text_blur">KH2052</span>
        </div>
      </li>
      <li className="flex-[5] items-center flex justify-center">
        <div className="bg-white flex justify-center w-2/3 py-1 px-4 rounded-md truncate">
          <span>50,000</span>
        </div>
      </li>
      <li
        className="flex-[2] items-center flex justify-center font-semibold"
        style={{ textDecorationLine: 'underline' }}
      >
        {children}
      </li>
    </ul>
  );
}

export default ItemBill;
