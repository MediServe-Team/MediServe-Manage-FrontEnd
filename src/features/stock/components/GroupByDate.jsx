function GroupByDate({ date, children }) {
  return (
    <div className="">
      {/* Group by Date */}
      <i className="text-h6 font-medium text-text_blur">Ngày: {date}</i>
      {/* list item */}
      <div className="flex flex-col gap-3 pl-8 mt-2">{children}</div>
    </div>
  );
}

export default GroupByDate;
