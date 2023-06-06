import { BsPencilFill, BsTrashFill } from 'react-icons/bs';

export default function ItemList({ children }) {
  return (
    <ul className="flex justify-center items-center py-2 rounded-lg gap-3 text-h6">
      <li className="flex-[10] text-center flex justify-center">
        <span className="truncate">56</span>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">Mai Anh Tuấn</span>
      </li>
      <li className="flex-[12] text-center flex justify-center">
        <div className="rounded-xl bg-tertiary/40 font-medium w-3/4 px-2 py-1">
          <span className="truncate">156.000đ</span>
        </div>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">abcxyz</span>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">22/03/2023</span>
      </li>
      <li className="flex-[10] text-center flex justify-center">{children}</li>
    </ul>
  );
}
