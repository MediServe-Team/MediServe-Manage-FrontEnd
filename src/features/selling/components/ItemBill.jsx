import dateToString from '../../../helpers/dateToString';
import formatToVND from '../../../helpers/formatToVND';

function ItemBill({ billId, staffId, staffName, createdAt, customerId, customerName, totalPrice, children }) {
  return (
    <ul className="flex justify-between items-center bg-slate-50 p-2 rounded-lg gap-2 text-h5 px-2 flex-shrink-0 border-2 border-text_blur/30 text-text_primary">
      <li className="flex-[4] items-center flex justify-center">
        <div className="bg-white flex justify-center w-2/3 py-1 px-4 rounded-md truncate">
          <span>{billId}</span>
        </div>
      </li>
      <li className="flex-[5] items-center flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <span>{staffName}</span>
          <span className="text-text_blur whitespace-nowrap max-w-[200px] text-ellipsis overflow-hidden">
            {staffId}
          </span>
        </div>
      </li>
      <li className="flex-[4] items-center flex justify-center">
        <div className="bg-white flex justify-center w-[5/6] py-1 px-4 rounded-md truncate">
          <span>{dateToString(createdAt)}</span>
        </div>
      </li>
      <li className="flex-[5] items-center flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <span>{customerName}</span>
          <span className="text-text_blur whitespace-nowrap max-w-[200px] text-ellipsis overflow-hidden">
            {customerId}
          </span>
        </div>
      </li>
      <li className="flex-[5] items-center flex justify-center">
        <div className="bg-white flex justify-center w-2/3 py-1 px-4 rounded-md truncate">
          <span className="text-secondary">{formatToVND(totalPrice)}</span>
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
