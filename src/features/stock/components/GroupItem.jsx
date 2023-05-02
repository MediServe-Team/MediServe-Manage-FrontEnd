function GroupItem({ children, title, isDrug }) {
  return (
    <div className="">
      <h2 className="font-bold text-h4">Thuốc</h2>
      {/* heading */}
      <ul className="flex justify-between items-center gap-2 bg-primary/30 rounded-lg text-h5 font-medium px-5 py-[10px]">
        <li className="flex-[4]">
          <span>Tên thuốc</span>
        </li>
        <li className="flex-[5]  ">
          <span>Số lượng x Quy cách</span>
        </li>
        <li className="flex-[2]">
          <span>Giá nhập</span>
        </li>
        <li className="flex-[2]">
          <span>Giá bán</span>
        </li>
        <li className="flex-[2]">
          <span>Thành tiền</span>
        </li>
        <li className="flex-[2]">
          <span>NSX</span>
        </li>
        <li className="flex-[2]">
          <span>Hạn dùng</span>
        </li>
        <li className="flex-[2]">
          <span>Số lô</span>
        </li>
        <li className="flex-[1]"></li>
      </ul>
      {/* body */}
      <ul className="flex flex-col gap-2 mt-2">{children}</ul>
    </div>
  );
}

export default GroupItem;
