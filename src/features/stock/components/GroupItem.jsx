function GroupItem({ children, title, isDrug }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* heading */}
      <ul className="flex justify-between items-center gap-2 bg-primary/30 rounded-lg text-h5 font-medium px-5 py-[10px]">
        <li className="flex-[4] ">
          <span>Tên loại hàng</span>
        </li>
        <li className="flex-[5]   ">
          <span>Số lượng x Quy cách</span>
        </li>
        <li className="flex-[2] ">
          <span>Giá nhập</span>
        </li>
        <li className="flex-[2] ">
          <span>Giá bán</span>
        </li>
        <li className="flex-[2] ">
          <span>Thành tiền</span>
        </li>
        <li className="flex-[2] ">
          <span>NSX</span>
        </li>
        <li className="flex-[2] ">
          <span>Hạn dùng</span>
        </li>
        <li className="flex-[2] ">
          <span>Mã số lô</span>
        </li>
        <li className="w-[22px]"></li>
      </ul>
      {/* body */}
      <ul className="flex h-full flex-col gap-2 mt-2 overflow-y-auto">{children}</ul>
    </div>
  );
}

export default GroupItem;
