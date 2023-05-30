import { BsX } from 'react-icons/bs';

function TitleListMedicine({ children, title, isDrug }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* heading */}
      <ul className="flex justify-between items-center gap-2 bg-primary/20 rounded-lg text-h5 font-medium px-2 py-[10px] mb-2 text-text_primary">
        <li className="flex-[1] text-center">
          <span>#</span>
        </li>
        <li className="flex-[12]">
          <span>Tên thuốc</span>
        </li>
        <li className="flex-[5] text-center">
          <span>Số lượng</span>
        </li>
        <li className="flex-[5] text-center">
          <span>Giá</span>
        </li>
        <li className="flex-[7] text-center">
          <span>Thành tiền</span>
        </li>
        <li className="flex flex-[1] justify-center items-center invisible">
          <button>
            <BsX size={25} style={{ color: '#A8A8A8' }} />
          </button>
        </li>
      </ul>
      {/* body */}
      <ul className="flex h-full flex-col gap-3 mt-2 overflow-y-auto">{children}</ul>
    </div>
  );
}

export default TitleListMedicine;
