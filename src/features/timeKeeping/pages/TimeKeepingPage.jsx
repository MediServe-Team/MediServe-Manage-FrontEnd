import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';

function TimeKeepingPage() {
  const [visible, setVisible] = useState(false);
  const [listCheckin, setListCheckin] = useState([1, 1, 1, 1, 1, 1]);

  const renderList = () => {
    return Array.isArray(listCheckin) && listCheckin.length > 0 ? (
      listCheckin.map((item, index) => (
        <div
          key={index}
          className={'px-4 py-2 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap flex gap-3'}
        >
          <img
            className="w-[28px] h-[28px] rounded-full"
            src="https://res.cloudinary.com/dwskvqnkc/image/upload/v1689603617/fivc9s1hrmbxp1ufbwqm.png"
            alt="avatar"
          />
          <span>Hoàng Văn Phúc</span>
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Danh sách rỗng!</div>
    );
  };

  return (
    <div className="h-full w-full bg-gray-200 rounded-[4px]">
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
              <span>Chọn nhân viên</span>
              <MdOutlineKeyboardArrowDown className="text-[20px] text-text_primary" />
            </div>
          </Tippy>
          {/* Wrap Button */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold leading-tight">Tháng 3, 2023</h2>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                Tháng trước
              </button>
              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                Tháng sau
              </button>
            </div>
          </div>
          {/* Export Excel */}
          <div className="mr-5">
            <button className="text-sm bg-gray-300 hover:bg-[#88dfff] text-gray-800 font-semibold py-2 px-4 rounded">
              Xuất File Excel
            </button>
          </div>
        </div>

        {/* Table List staff*/}
        <div className="px-4 py-4 overflow-x-auto flex-1">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nhân viên
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giờ vào
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giờ ra
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Số giờ làm
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="overflow-y-scroll">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                  <tr>
                    <td className="px-5 py-2 bg-white text-sm">{index + 1}</td>
                    <td className="px-5 py-2 bg-white text-sm flex gap-3">
                      <img
                        className="w-[28px] h-[28px] rounded-full"
                        src="https://res.cloudinary.com/dwskvqnkc/image/upload/v1689603617/fivc9s1hrmbxp1ufbwqm.png"
                        alt="avatar"
                      />
                      <p className="text-gray-900 whitespace-no-wrap">Văn Phúc</p>
                    </td>
                    <td className="px-5 py-2 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Jan 18, 2020</p>
                    </td>
                    <td className="px-5 py-2 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                        <span className="relative">16:20 00:00:00</span>
                      </span>
                    </td>
                    <td className="px-5 py-2 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                        <span className="relative">07:20 00:00:00</span>
                      </span>
                    </td>
                    <td className="px-5 py-2 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">8 giờ, 30 phút</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Total Time */}
            <div className="py-2 flex w-full px-5">
              <p className="ml-auto font-semibold">Tổng giờ làm: 100 giờ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeKeepingPage;
