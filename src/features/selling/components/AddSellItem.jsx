import { MdOutlineAddCircleOutline } from 'react-icons/md';
import formatToVND from '../../../helpers/formatToVND';

function AddSellItem({ name, sellUnit, sellPrice, quantity, onClick }) {
  return (
    <div
      className="flex justify-between items-center px-4 py-2 hover:bg-text_blur/10 text-h5 cursor-pointer border-[1px] rounded-[4px] bg-[#f7fefe]"
      onClick={onClick}
    >
      <div className="flex gap-5 items-center">
        <div className="rounded-full w-[20px] h-[20px] shadow-md bg-tertiary/10">
          <MdOutlineAddCircleOutline className="text-[22px] text-tertiary" />
        </div>
        <div className="flex items-center gap-1">
          <p className="text-h5 font-medium">{name}</p>
          <i className="font-normal text-gray-700">({sellUnit})</i>
        </div>
      </div>
      <span>
        còn <b className="text-secondary"> {quantity}</b>
      </span>
    </div>
  );
}

export default AddSellItem;
