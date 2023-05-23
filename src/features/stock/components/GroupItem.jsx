function GroupItem({ children, title, isDrug }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* heading */}
      <ul className="flex justify-between items-center gap-2 bg-primary/30 rounded-lg text-h5 font-medium px-5 py-[10px]">
        <li className="flex-[4] ">
          <span className="text-text_primary">Tên loại hàng</span>
        </li>
        <li className="flex-[5]   ">
          <span className="text-text_primary">Số lượng x Quy cách</span>
        </li>
        <li className="flex-[2] ">
          <span className="text-text_primary">Giá nhập</span>
        </li>
        <li className="flex-[2] ">
          <span className="text-text_primary">Giá bán</span>
        </li>
        <li className="flex-[2] ">
          <span className="text-text_primary">Thành tiền</span>
        </li>
        <li className="flex-[2] ">
          <span className="text-text_primary">NSX</span>
        </li>
        <li className="flex-[2] ">
          <span className="text-text_primary">Hạn dùng</span>
        </li>
        <li className="flex-[2] ">
          <span className="text-text_primary">Mã số lô</span>
        </li>
        <li className="w-[22px]"></li>
      </ul>
      {/* body */}
      <ul className="flex h-full flex-col gap-2 mt-2 overflow-y-auto">{children}</ul>
    </div>
  );
}

export default GroupItem;
