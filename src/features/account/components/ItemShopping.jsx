import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import formatToVND from '../../../helpers/formatToVND';
import dateToString from '../../../helpers/dateToString';

export default function ItemList({ data, children }) {
  return (
    <ul className="flex justify-center items-center py-2 rounded-lg gap-3 text-h6">
      <li className="flex-[10] text-center flex justify-center">
        <span className="truncate">{data?.id}</span>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">{data?.staff?.fullName}</span>
      </li>
      <li className="flex-[12] text-center flex justify-center">
        <div className="rounded-xl bg-tertiary/40 font-medium w-3/4 px-2 py-1">
          <span className="truncate">{formatToVND(data?.totalPayment)}</span>
        </div>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">{data?.note}</span>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">{dateToString(data?.updatedAt)}</span>
      </li>
      <li className="flex-[10] text-center flex justify-center">{children}</li>
    </ul>
  );
}
