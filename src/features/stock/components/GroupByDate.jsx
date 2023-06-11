function GroupByDate({ date, children }) {
  const formatDate = (date) => {
    return '26/03/2023';
  };

  return (
    <div className="">
      {/* Group by Date */}
      <i className="text-h6 font-medium text-text_blur">{formatDate(date)}</i>
      {/* list item */}
      <div className="flex flex-col gap-3 pl-8 mt-2">{children}</div>
    </div>
  );
}

export default GroupByDate;
