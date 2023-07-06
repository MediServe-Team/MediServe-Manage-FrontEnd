import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { IoIosArrowDown } from 'react-icons/io';
import { Button, Pagination } from '../../../components';
import { BiFilterAlt } from 'react-icons/bi';
import { ItemBill, TitleBillList } from '../components';
import { Link } from 'react-router-dom';
// services
import useBill from '../hooks/useBill';

function Bill() {
  const refFromDate = useRef();
  const refToDate = useRef();
  const [activeFilter, setActiveFilter] = useState(false);
  // use bill
  const {
    bills,
    customerName,
    staffName,
    fromDate,
    toDate,
    pageNumber,
    pageLength,
    setCustomerName,
    setStaffName,
    setFromDate,
    setToDate,
    setPageNumber,
  } = useBill();

  const handleActiveFilter = () => {
    setActiveFilter((pre) => !pre);
  };

  useEffect(() => {
    if (activeFilter === false) {
      setCustomerName('');
      setStaffName('');
      const resetDate = new Date();
      // set date is 1 day ago
      resetDate.setDate(resetDate.getDate() - 1);
      setFromDate(resetDate);
      setToDate(new Date());
      setPageNumber(1);
    }
  }, [activeFilter]);

  return (
    <div className="w-full h-full">
      <div className=" flex flex-col h-full bg-white rounded-xl px-16">
        <div className="flex justify-between items-center py-8 flex-shrink-0">
          <Button
            variant="outlined"
            styleBtn={'outline'}
            size={'medium'}
            leftIcon={<BiFilterAlt className="text-[20px]" />}
            width={160}
            onClick={handleActiveFilter}
          >
            {activeFilter ? 'Hủy bộ lọc' : 'Thêm bộ lọc'}
          </Button>

          <form className={`flex h-1/2 items-center justify-end ${activeFilter ? '' : 'invisible'}`}>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Tên nhân viên"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-[200px] h-[34px] outline-none border-2 border-gray-400 rounded-md px-3"
              />
              <input
                type="text"
                placeholder="Tên khách hàng"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-[200px] h-[34px] outline-none border-2 border-gray-400 rounded-md px-3"
              />
              <div
                className="flex items-center justify-between border-2 w-[120px] h-[34px] border-gray-400 rounded-md px-2 cursor-pointer"
                onClick={() => refFromDate.current.setOpen(true)}
              >
                <DatePicker
                  ref={refFromDate}
                  className="text-h5 outline-none cursor-pointer max-w-[80px]"
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

              <div
                className="flex items-center justify-between border-2 w-[120px] h-[34px] border-gray-400 rounded-md px-2 cursor-pointer"
                onClick={() => refToDate.current.setOpen(true)}
              >
                <DatePicker
                  ref={refToDate}
                  className="text-h5 outline-none cursor-pointer max-w-[80px]"
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

              {/* <Button styleBtn={'solid'} size={'medium'} width={120}>
                Tìm kiếm
              </Button> */}
            </div>
          </form>
        </div>

        {/* List Invoice */}
        <div className="flex flex-col flex-1 bg-white min-h-0 pb-2">
          <div className="pb-2">
            <TitleBillList />
          </div>
          {/* List*/}
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-20 min-h-0">
            {bills.map((item, index) => (
              <div>
                <ItemBill
                  key={index}
                  billId={item.id}
                  staffId={item.staffId}
                  staffName={item.staff.fullName}
                  createdAt={item.createdAt}
                  customerId={item.customerId ? item.customerId : item.guestId}
                  customerName={item.customerId ? item.customer.fullName : item.guest.fullName}
                  totalPrice={item.totalPayment}
                >
                  <Link to={`/bills/${index}`}>Chi tiết</Link>
                </ItemBill>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center relative">
          {/* {pageLength > 0 && ( */}
          <div className="absolute -top-[70px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
            <Pagination pageLength={pageLength} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default Bill;
