import React, { useState, useRef, useEffect } from 'react';
import { BillEntered, GroupByDate } from '../components';
import { IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Pagination, EmptyImage, Button } from '../../../components';
import Tippy from '@tippyjs/react/headless';
import useStock from '../hooks/useStock';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function HistoryStock() {
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Stock History',
        slug: '/stock/history',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  const [sortVisible, setSortVisible] = useState(false);
  const refFromDate = useRef();
  const refToDate = useRef();
  //* useStock
  const { invoices, pageLength, sort, fromDate, toDate, pageNumber, setSort, setFromDate, setToDate, setPageNumber } =
    useStock();

  const handleExportFile = () => {
    const length = invoices.length;
    const workBook = XLSX.utils.book_new();
    if (invoices && length > 0) {
      for (let i = 0; i < length; i++) {
        const workSheet = XLSX.utils.json_to_sheet(invoices[i].listInvoiceIndate);
        XLSX.utils.book_append_sheet(workBook, workSheet, invoices[i].createdAt.toString());
      }
      XLSX.writeFile(workBook, 'invoices-into-stocks.xlsx');
    }
  };

  const handleChangeOrder = (sort) => {
    if (sort === 'asc') setSort('asc');
    if (sort === 'desc') setSort('desc');
    setSortVisible(false);
  };

  const renderFilter = () => {
    return (
      <ul className="w-[140px] h-full">
        <li
          className="px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap"
          onClick={() => handleChangeOrder('asc')}
        >
          Tăng dần
        </li>
        <li
          className="px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap"
          onClick={() => handleChangeOrder('desc')}
        >
          Giảm dần
        </li>
      </ul>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg px-10 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-text_primary text-h5 font-bold">Lịch sử nhập kho</h2>

        {/* Filter  */}
        <div className="flex gap-10 mr-10">
          <Tippy
            visible={sortVisible}
            interactive={true}
            placement="bottom-start"
            onClickOutside={() => setSortVisible(false)}
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                <div className="bg-white rounded-md shadow-[0px_2px_13px_-4px_rgba(0,0,0,0.8)]">{renderFilter()}</div>
              </div>
            )}
          >
            <div
              onClick={() => setSortVisible(!sortVisible)}
              className="flex items-center justify-between border-2 w-[140px] h-[30px] border-gray-400 rounded-[4px] px-2 cursor-pointer"
            >
              <span className="text-gray-400">{sort === 'asc' ? 'Tăng dần' : 'Giảm dần'}</span>
              <IoIosArrowDown className="text-gray-400" />
            </div>
          </Tippy>

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
        <Button size="normal" styleBtn="outline" modifier="primary" className="px-6" onClick={handleExportFile}>
          Xuất file
        </Button>
      </div>

      {/* list bill item */}
      {Array.isArray(invoices) && invoices.length > 0 ? (
        <div className="flex-1 pt-3 overflow-auto pb-[60px]">
          <div className="flex flex-col gap-5">
            {invoices.map((groupItem, index) => {
              return (
                <GroupByDate date={groupItem.createdAt} key={index}>
                  {Array.isArray(groupItem?.listInvoiceIndate) &&
                    groupItem?.listInvoiceIndate?.length > 0 &&
                    groupItem.listInvoiceIndate.map((item, index) => {
                      return (
                        <BillEntered
                          billID={item.id}
                          staffID={item.staffId}
                          staffName={item.staff.fullName}
                          totalImport={item.totalImportPrice}
                          totalSell={item.totalSellPrice}
                          note={item.note}
                          key={index}
                        />
                      );
                    })}
                </GroupByDate>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyImage title="Không có đơn nhập kho nào trong khoảng thời gian này!" />
      )}

      <div className="flex justify-center relative">
        {pageLength > 0 && (
          <div className="absolute -top-[50px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
            <Pagination pageLength={pageLength} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryStock;
