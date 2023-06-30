import { BsPencilFill, BsTrashFill } from 'react-icons/bs';

function ItemList({ number, doseName, note }) {
  return (
    <ul className="flex justify-between items-center bg-primary/5 border-2 border-text_primary/10 p-2 rounded-lg gap-3 text-h5 px-2 flex-shrink-0">
      {/* number */}
      <li className="w-[32px] h-[32px] flex flex-[1] justify-center items-center bg-white rounded-md px-1">
        <span className="text-dark_primary">{number}</span>
      </li>

      {/* dose */}
      <li className="flex flex-[12] items-center truncate">
        <span className="font-medium">Liều cảm cúm cho trẻ nhỏ</span>
      </li>

      <li className="flex flex-[10] items-center truncate">
        <span>Trần Minh Quang, tạo lúc: 10h35p</span>
      </li>

      <li className="flex flex-[1.5] items-center justify-center text-white">
        <button className="h-[25px] w-[25px] bg-yellow-400 items-center justify-center flex hover:opacity-80 active:opacity-100">
          <BsPencilFill />
        </button>
      </li>

      <li className="flex flex-[1.5] items-center justify-center text-white ">
        <button className="h-[25px] w-[25px] bg-red-400 items-center justify-center flex hover:opacity-80 active:opacity-100">
          <BsTrashFill />
        </button>
      </li>
    </ul>
  );
}

export default ItemList;
