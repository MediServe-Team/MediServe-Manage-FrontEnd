import formatToVND from '../../../helpers/formatToVND';

function ItemListPre({ medicineName, sellUnit, morning, noon, night, quantity, sellPrice }) {
  return (
    <ul className="flex justify-between items-center py-2 gap-2 text-h5 px-5 flex-shrink-0 border-b-2 border-text_blur/30">
      {/* dose */}
      <li className="flex flex-[12] flex-col w-full truncate">
        <span>
          {medicineName} ({sellUnit})
        </span>
        <span className="text-text_blur">
          sáng: {morning}, trưa: {noon}, tối: {night}
        </span>
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
        <span className="text-secondary px-6">{formatToVND(Number(quantity) * Number(sellPrice))}</span>
      </li>
    </ul>
  );
}

export default ItemListPre;
