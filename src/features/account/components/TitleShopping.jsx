export default function TitleShopping({ children, title, isDrug }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* heading */}
      <ul className="flex justify-center items-center gap-3 bg-primary/20 rounded-lg text-h6 font-medium mb-3 py-[10px] pr-1 text-text_primary">
        <li className="flex-[10] text-center">
          <span>Số hóa đơn</span>
        </li>
        <li className="flex-[14] text-center">
          <span>Tên nhân viên</span>
        </li>
        <li className="flex-[12] text-center">
          <span>Tổng tiền</span>
        </li>
        <li className="flex-[14] text-center">
          <span>Ghi chú</span>
        </li>
        <li className="flex-[14] text-center">
          <span>Ngày tạo</span>
        </li>
        <li className="flex-[10] text-center">
          <span>Xem chi tiết</span>
        </li>
        {/* <li className="w-[22px]"></li> */}
      </ul>
      {/* body */}
      <ul className="flex h-full flex-col gap-2 overflow-y-auto">{children}</ul>
    </div>
  );
}
