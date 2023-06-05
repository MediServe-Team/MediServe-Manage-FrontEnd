import { BsPencilFill, BsTrashFill } from 'react-icons/bs';

export default function ItemDose({ children }) {
  return (
    <ul className="flex justify-center items-center py-2 rounded-lg gap-3 text-h6">
      <li className="flex-[10] text-center flex justify-center">
        <span className="truncate">56</span>
      </li>
      <li className="flex-[34] text-center flex justify-start">
        <span className="truncate">TRỊ ĐAU NỬA ĐẦU</span>
      </li>
      <li className="flex-[14] text-center flex justify-center">
        <span className="truncate">22/03/2023</span>
      </li>
      <li className="flex-[14] text-center flex justify-center">{children}</li>
    </ul>
  );
}
