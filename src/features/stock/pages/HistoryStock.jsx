import React, { useState, useRef } from 'react';
import { BillEntered, GroupByDate } from '../components';
import { IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Pagination } from '../../../components';

const mockData = [
  {
    date: '23/23/23',
    listIntoBill: [
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đã thanh toán đơn',
      },
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đơn chưa thanh toán',
      },
    ],
  },
  {
    date: '23/23/23',
    listIntoBill: [
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đã thanh toán đơn',
      },
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đơn chưa thanh toán',
      },
    ],
  },

  {
    date: '23/23/23',
    listIntoBill: [
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đã thanh toán đơn',
      },
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đơn chưa thanh toán',
      },
    ],
  },

  {
    date: '23/23/23',
    listIntoBill: [
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đã thanh toán đơn',
      },
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đơn chưa thanh toán',
      },
    ],
  },

  {
    date: '23/23/23',
    listIntoBill: [
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đã thanh toán đơn',
      },
      {
        billID: 'MsFJSD92w',
        staffID: 'ST0345',
        staffName: 'Hoàng Anh',
        totalImport: '1.560.000',
        totalSell: '2.600.000',
        note: 'đơn chưa thanh toán',
      },
    ],
  },
];

function HistoryStock() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const refFromDate = useRef();
  const refToDate = useRef();
  // pagination
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="h-full flex flex-col bg-white rounded-lg px-10 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-text_primary text-h5 font-bold">Lịch sử nhập kho</h2>

        {/* Filter  */}
        <div className="flex gap-10 mr-10">
          {/* from date */}
          <div
            className="flex items-center justify-between border-2 w-[140px] h-[30px] border-gray-400 rounded-[4px] px-2 cursor-pointer"
            onClick={() => refFromDate.current.setOpen(true)}
          >
            <DatePicker
              ref={refFromDate}
              className="text-h6 outline-none cursor-pointer max-w-[80px]"
              selected={fromDate}
              placeholderText="Từ ngày"
              onChange={(date) => {
                setFromDate(date);
              }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              dateFormat="dd/MM/yyyy"
            />
            <IoIosArrowDown className="text-gray-400" />
          </div>
          {/* to date */}
          <div
            className="flex items-center justify-between border-2 w-[140px] h-[30px] border-gray-400 rounded-[4px] px-2 cursor-pointer"
            onClick={() => refToDate.current.setOpen(true)}
          >
            <DatePicker
              ref={refToDate}
              className="text-h6 outline-none cursor-pointer max-w-[80px]"
              selected={toDate}
              placeholderText="Đến ngày"
              onChange={(date) => {
                setToDate(date);
              }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              dateFormat="dd/MM/yyyy"
            />
            <IoIosArrowDown className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* list bill item */}
      <div className="flex-1 pt-3 overflow-auto">
        <div className="flex flex-col gap-5">
          {mockData.map((groupItem, index) => {
            return (
              <GroupByDate date={groupItem.date} key={index}>
                {groupItem.listIntoBill.map((item, index) => {
                  return <BillEntered {...item} key={index} />;
                })}
              </GroupByDate>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center items-center">
        <Pagination pageLength={7} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
}

export default HistoryStock;
