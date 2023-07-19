import formatToVND from '../../../helpers/formatToVND';
import { BsX } from 'react-icons/bs';

function ItemListMP({ number, id, quantity, name, unit, packingSpecification, sellPrice, totalPrice, children }) {
  return (
    <ul className="flex justify-between items-center bg-text_blur/5 p-2 rounded-lg gap-2 text-h5 px-2 flex-shrink-0 border-2 border-text_blur/30">
      {/* number */}
      <li className="flex flex-[1] justify-center items-center">
        <span className="text-text_primary">{number}</span>
      </li>

      {/* dose */}
      <li className="flex flex-[12] flex-col w-full truncate">
        <span>
          {name} ({unit})
        </span>
        <span className="text-text_blur">{packingSpecification}</span>
      </li>

      <li className="flex flex-[5] items-center justify-center">
        <span className="text-text_primary bg-white rounded-md px-6 py-1 border-2 border-text_blur/30">{quantity}</span>
      </li>

      <li className="flex flex-[5] items-center justify-center">
        <span className="text-text_primary bg-white rounded-md px-6 py-1 border-2 border-text_blur/30">
          {sellPrice}
        </span>
      </li>

      <li className="flex flex-[7] items-center justify-center">
        <span className="text-secondary px-6">{formatToVND(Number(totalPrice))}</span>
      </li>

      <li className="flex flex-[1] justify-center items-center">{children}</li>
    </ul>
  );
}

export default ItemListMP;
