function TitleList({ children, title, isDrug }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* heading */}
      <ul className="flex justify-between items-center gap-2 bg-primary/20 rounded-lg text-h5 font-medium px-2 py-[10px] mb-3 text-text_primary">
        <li className="flex-[1] px-1 text-center">
          <span>#</span>
        </li>
        <li className="flex-[12]   ">
          <span>Tên liều thuốc</span>
        </li>
        <li className="flex-[10] ">
          <span>Ghi chú</span>
        </li>
        <li className="flex-[1.5] text-center">
          <span>Sửa</span>
        </li>
        <li className="flex-[1.5] text-center">
          <span>Xóa</span>
        </li>
        {/* <li className="w-[22px]"></li> */}
      </ul>
      {/* body */}
      <ul className="flex h-full flex-col gap-2 mt-2 overflow-y-auto">{children}</ul>
    </div>
  );
}

export default TitleList;
