import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '@mui/joy';
import { BiFilterAlt } from 'react-icons/bi';

function Bill() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const refFromDate = useRef();
  const refToDate = useRef();
  const [activeFilter, setActiveFilter] = useState(false);

  let red = 'rgba(255, 96, 96, 1)',
    darkBlue = '#064861';

  const handleActiveFilter = () => {
    setActiveFilter((pre) => !pre);
  };

  return (
    <div className="h-full w-full bg-white rounded-xl flex flex-col px-16 pb-16 pt-3">
      <div className="flex flex-col h-[18%]">
        <div className={`flex h-1/2 items-start justify-end ${activeFilter ? '' : 'invisible'}`}>
          <div className="flex gap-3 justify-end">
            <input
              type="text"
              placeholder="Mã nhân viên"
              className="w-[16%] border-2 border-gray-400 rounded-lg px-3"
            />
            <input
              type="text"
              placeholder="Mã khách hàng"
              className="w-[18%] border-2 border-gray-400 rounded-lg px-3"
            />
            <div
              className="flex items-center justify-between border-2 w-[15%] border-gray-400 rounded-lg px-2 cursor-pointer"
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
              className="flex items-center justify-between border-2 w-[15%] border-gray-400 rounded-lg px-2 cursor-pointer"
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

            <Button
              className="hover:opacity-90 active:opacity-100 w-[15%]"
              variant="solid"
              style={{ backgroundColor: darkBlue, fontSize: '16px', fontWeight: '400' }}
              size="md"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>

        <div className="flex h-1/2">
          <div className="w-1/2">
            <Button
              className="hover:opacity-90 active:opacity-100 w-[30%]"
              startDecorator={<BiFilterAlt size={20} />}
              variant="outlined"
              style={{
                color: activeFilter ? red : darkBlue,
                borderColor: activeFilter ? red : darkBlue,
                borderWidth: '2px',
                fontSize: '16px',
              }}
              onClick={handleActiveFilter}
            >
              {activeFilter ? 'Hủy bộ lọc' : 'Thêm bộ lọc'}
            </Button>
          </div>

          <div className="w-1/2 flex justify-end gap-3">
            <Button
              className="hover:opacity-90 active:opacity-100 w-[21.8%] h-[80%]"
              variant="outlined"
              style={{
                color: red,
                borderColor: red,
                borderWidth: '2px',
                fontSize: '16px',
              }}
            >
              Hủy xóa
            </Button>

            <Button
              className="hover:opacity-90 active:opacity-100 w-[21.8%] h-[80%]"
              variant="solid"
              style={{
                backgroundColor: red,
                borderWidth: '2px',
                fontSize: '16px',
                paddingInline: '2.84rem',
              }}
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-[82%] bg-yellow-100"></div>
    </div>
  );
}

export default Bill;
