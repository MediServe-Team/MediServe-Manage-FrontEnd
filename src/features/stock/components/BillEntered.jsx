import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';

function BillEntered({ billID, staffID, staffName, totalImport, totalSell, note }) {
  return (
    <div className="h-[70px] rounded-lg flex justify-between items-center gap-5 px-8 border-2 bg-slate-50">
      <div className="flex flex-col gap-2 justify-between ">
        <span className="text-text_primary font-normal">Mã số đơn</span>
        <span>{billID}</span>
      </div>
      <div className="flex flex-col gap-2 justify-between ">
        <span className="text-text_primary font-normal">Mã nhân viên</span>
        <span>{staffID}</span>
      </div>
      <div className="flex flex-col gap-2 justify-between ">
        <span className="text-text_primary font-normal">Nhân viên</span>
        <span>{staffName}</span>
      </div>
      <div className="flex flex-col gap-2 justify-between ">
        <span className="text-text_primary font-normal">Ghi chú đơn nhập</span>
        <span>{note}</span>
      </div>
      <div className="flex flex-col gap-2 justify-between ">
        <span className="text-text_primary font-normal">Tổng nhập</span>
        <div className="flex gap-1 items-center text-danger font-bold">
          <IoMdArrowDropdown className="text-[24px]" />
          <span>{totalImport}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between ">
        <span className="text-text_primary font-normal">Tổng bán</span>
        <div className="flex gap-1 items-center text-tertiary font-bold">
          <IoMdArrowDropdown className="text-[24px] rotate-180" />
          <span>{totalSell}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between font-bold underline text-text_primary">
        <Link to={`http://localhost:3000/stock/invoice/${billID}`} className="py-5">
          Chi tiết
        </Link>
      </div>
    </div>
  );
}

export default BillEntered;
