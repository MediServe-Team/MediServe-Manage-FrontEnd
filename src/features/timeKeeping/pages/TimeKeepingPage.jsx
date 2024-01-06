import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import { getAllStaffAccountService } from '../../../services/accountServices';
import { getListCheckinOfUserService } from '../../../services/checkinServices';
import { useAxiosWithToken } from '../../../hooks';
import dateToString from '../../../helpers/dateToString';
import formatTime from '../../../helpers/formatTime';
import calcTimeDiff from '../../../helpers/calcTimeDiff';
import { getDaysInMonth } from '../../../helpers/dateTime';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

function TimeKeepingPage() {
  const [visible, setVisible] = useState(false);
  const [listCheckin, setListCheckin] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2023);
  const [staffSelected, setStaffSelected] = useState(null);
  const axiosWithToken = useAxiosWithToken();

  // Init month year
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  // get staff account
  useEffect(() => {
    const getStaffAccount = async () => {
      const result = await getAllStaffAccountService(axiosWithToken);
      setStaffs(result.data);
    };
    getStaffAccount();
  }, []);

  // get list checkin of staff
  useEffect(() => {
    const getListCheckin = async () => {
      const staffId = staffSelected ? staffSelected.id : -1;
      const result = await getListCheckinOfUserService(axiosWithToken, staffId, month, year);
      setListCheckin(result.data);
    };
    getListCheckin();
  }, [staffSelected, month, year]);

  // Export excel
  const handleExportFile = () => {
    const length = listCheckin.length;
    const workBook = XLSX.utils.book_new();

    if (listCheckin && length > 0) {
      const workSheet = XLSX.utils.json_to_sheet(listCheckin);

      // Tùy chọn định dạng cho các cột
      workSheet['!cols'] = [
        { width: 15 }, // Độ rộng cho cột id
        { width: 30 }, // Độ rộng cho cột userId
        { width: 20 }, // Độ rộng cho cột dateCheckin
        { width: 20 }, // Độ rộng cho cột checkinTime
        { width: 20 }, // Độ rộng cho cột checkoutTime
      ];

      // Tùy chọn định dạng cho tiêu đề
      workSheet['A1'].s = { font: { bold: true, color: { rgb: '0000FF' } }, alignment: { horizontal: 'center' } };
      workSheet['B1'].s = { font: { bold: true, color: { rgb: '0000FF' } }, alignment: { horizontal: 'center' } };
      workSheet['C1'].s = { font: { bold: true, color: { rgb: '0000FF' } }, alignment: { horizontal: 'center' } };
      workSheet['D1'].s = { font: { bold: true, color: { rgb: '0000FF' } }, alignment: { horizontal: 'center' } };
      workSheet['E1'].s = { font: { bold: true, color: { rgb: '0000FF' } }, alignment: { horizontal: 'center' } };

      XLSX.utils.book_append_sheet(workBook, workSheet, `${month}-${year}`);
      XLSX.writeFile(workBook, `${staffSelected.name}_${month}-${year}.xlsx`);
    } else {
      toast.warn('Không có dữ liệu để xuất file');
    }
  };
  // const handleExportFile = () => {
  //   const length = listCheckin.length;
  //   const workBook = XLSX.utils.book_new();
  //   if (listCheckin && length > 0) {
  //     const workSheet = XLSX.utils.json_to_sheet(listCheckin);
  //     XLSX.utils.book_append_sheet(workBook, workSheet, `${month}-${year}`);
  //     XLSX.writeFile(workBook, `${staffSelected.name}_${month}-${year}.xlsx`);
  //   } else {
  //     toast.warn('Không có dữ liệu để xuất file');
  //   }
  // };

  const prevMonth = () => {
    if (month == 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else setMonth((prev) => prev - 1);
  };

  const nextMonth = () => {
    if (month == 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else setMonth((prev) => prev + 1);
  };

  const renderList = () => {
    return Array.isArray(staffs) && staffs.length > 0 ? (
      staffs.map((item, index) => (
        <div
          key={index}
          className={'px-4 py-2 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap flex gap-3'}
          onClick={() => setStaffSelected({ id: item.id, name: item.fullName, avatar: item.avatar })}
        >
          <img className="w-[28px] h-[28px] rounded-full" src={item?.avatar} alt="avatar" />
          <span>{item?.fullName}</span>
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Danh sách rỗng!</div>
    );
  };

  return (
    <div className="h-full w-full bg-white rounded-[4px]">
      <div className="p-3 h-full flex flex-col">
        {/*  Filter */}
        <div className="mx-3 my-2 flex justify-between">
          <Tippy
            visible={visible}
            interactive={true}
            placement="bottom-start"
            onClickOutside={() => setVisible(false)}
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                <div
                  className={classNames(
                    'bg-white rounded-md shadow-[0px_3px_7px_-1px_rgba(0,0,0,0.45)] max-h-[400px] min-w-[200px] overflow-y-auto',
                  )}
                >
                  {renderList()}
                </div>
              </div>
            )}
          >
            <div
              className={classNames(
                'h-[44px] min-w-[200px] border-2 hover:border-text_primary rounded-md flex justify-between items-center px-3 cursor-pointer border-text_primary/20',
              )}
              onClick={() => setVisible(true)}
            >
              <span>{staffSelected ? staffSelected.name : 'Chọn nhân viên'}</span>
              <MdOutlineKeyboardArrowDown className="text-[20px] text-text_primary" />
            </div>
          </Tippy>
          {/* Wrap Button */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold leading-tight">
              Tháng {month}, {year}
            </h2>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="text-sm bg-gray-300 hover:bg-[#307dd5] hover:text-white font-semibold py-2 px-4 rounded-l"
                onClick={prevMonth}
              >
                Tháng trước
              </button>
              <button
                className="text-sm bg-gray-300 hover:bg-[#307dd5] hover:text-white font-semibold py-2 px-4 rounded-r"
                onClick={nextMonth}
              >
                Tháng sau
              </button>
            </div>
          </div>
          {/* Export Excel */}
          <div className="mr-5">
            <button
              className="text-sm bg-gray-300 hover:bg-[#307dd5] hover:text-white font-semibold py-2 px-4 rounded"
              onClick={handleExportFile}
            >
              Xuất File Excel
            </button>
          </div>
        </div>

        {/* Table List checkin of staff*/}
        <div className="px-4 py-4 overflow-x-auto flex-1">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#daf5ff] text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#daf5ff] text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nhân viên
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#daf5ff] text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#daf5ff] text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giờ vào
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#daf5ff] text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giờ ra
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#daf5ff] text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Số giờ làm
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="overflow-y-scroll">
                {Array.isArray(listCheckin) &&
                  listCheckin.map((item, index) => (
                    <tr>
                      <td className="px-5 py-2 bg-white text-sm">{index + 1}</td>
                      <td className="px-5 py-2 bg-white text-sm flex gap-3">
                        <img className="w-[28px] h-[28px] rounded-full" src={staffSelected?.avatar} alt="avatar" />
                        <p className="text-gray-900 whitespace-no-wrap">{staffSelected?.name}</p>
                      </td>
                      <td className="px-5 py-2 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{dateToString(item?.dateCheckin)}</p>
                      </td>
                      <td className="px-5 py-2 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-[#299f4b] leading-tight">
                          <span aria-hidden className="absolute inset-0 bg-[#299f4b]/10 rounded-full"></span>
                          <span className="relative">{formatTime(item?.checkinTime)}</span>
                        </span>
                      </td>
                      <td className="px-5 py-2 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-[#bd6340] leading-tight">
                          <span aria-hidden className="absolute inset-0 bg-[#bd6340]/10 rounded-full"></span>
                          <span className="relative">{formatTime(item?.checkoutTime)}</span>
                        </span>
                      </td>
                      <td className="px-5 py-2 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {calcTimeDiff(item?.checkinTime, item.checkoutTime)}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Total Time */}
            <div className="py-2 flex w-full px-5">
              <p className="ml-auto font-semibold">
                Tổng ngày làm: {Array.isArray(listCheckin) ? listCheckin.length : 0} / {getDaysInMonth(year, month)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeKeepingPage;
