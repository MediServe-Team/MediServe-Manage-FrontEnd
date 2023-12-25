import { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import classNames from 'classnames';

const CheckinPage = () => {
  const [isCheckin, setIscheckin] = useState(false);

  return (
    <div className="flex h-full w-full gap-5 bg-white rounded-[4px] px-14 py-8">
      <div className="w-1/3 h-full flex flex-col">
        <section>
          <span className="bg-[#dd9f3c] rounded-sm py-2 px-5 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.44)] font-medium text-white">
            Thứ 2
          </span>
          <span className="bg-gradient-to-r from-[#d6b47e] to-[#f3e9d8] px-5 py-1">
            ngày <b>6</b> tháng <b>10</b> năm <b>2023</b>
          </span>
        </section>
        <p className="my-5 text-[#296c38]">Bạn đã đăng ký vào lúc 07:20:30-06/10/2023</p>
        {/* Checkin Button */}
        <div className="flex flex-col gap-5">
          <section>
            <div
              className={classNames(
                `w-[280px] h-[150px] rounded-lg flex active:opacity-80`,
                isCheckin
                  ? 'bg-[#e0dede] '
                  : 'bg-[#29CE4D] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.44)] hover:shadow-none cursor-pointer',
              )}
              onClick={() => setIscheckin(true)}
            >
              <div className="m-auto flex gap-5 items-center">
                <span className="text-white">Đăng ký vào</span>
                <BiLogIn className="text-[24px] text-white" />
              </div>
            </div>
          </section>
          {/* Checkout Button */}
          <section>
            <div
              className={classNames(
                `w-[280px] h-[150px]  rounded-lg flex active:opacity-80`,
                isCheckin
                  ? 'bg-[#346CD9] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.44)] hover:shadow-none cursor-pointer'
                  : 'bg-[#e0dede]',
              )}
              onClick={() => setIscheckin(false)}
            >
              <div className="m-auto flex gap-5 items-center">
                <span className="text-white">Đăng ký ra</span>
                <BiLogIn className="text-[24px] text-white rotate-180" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-2/3 h-full">
        {/* List historical checkin */}
        <div class="text-gray-900 bg-gray-200">
          <div class="px-4 pt-4 flex justify-between">
            <h2 className="font-medium text-h4">Tháng 3, 2023</h2>
            <div class="flex gap-2">
              <button
                type="button"
                class="bg-gray-400 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-[#307dd5] hover:text-black px-3"
              >
                <div class="flex flex-row align-middle">
                  <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p class="ml-2">Prev</p>
                </div>
              </button>
              <button
                type="button"
                class="bg-gray-400 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-[#307dd5] hover:text-black px-3"
              >
                <div class="flex flex-row align-middle">
                  <span class="mr-2">Next</span>
                  <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div class="px-3 py-4">
            <table class="w-full text-md bg-white shadow-md rounded mb-4">
              <thead>
                <tr class="flex border-b">
                  <th class="w-1/5 text-left p-3 px-5">STT</th>
                  <th class="w-1/5 text-left p-3 px-5">Ngày </th>
                  <th class="w-1/5 text-left p-3 px-5">Giờ vào</th>
                  <th class="w-1/5 text-left p-3 px-5">Giờ ra</th>
                  <th class="w-1/5 text-left p-3 px-5">Số giờ làm</th>
                </tr>
              </thead>
              <tbody className="block overflow-y-auto h-[450px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1, 1].map((u, index) => (
                  <tr class="flex border-b hover:bg-orange-100 bg-gray-100">
                    <td class="w-1/5 p-3 px-5">{index + 1}</td>
                    <td class="w-1/5 p-3 px-5">text</td>
                    <td class="w-1/5 p-3 px-5">text</td>
                    <td class="w-1/5 p-3 px-5">text</td>
                    <td class="w-1/5 p-3 px-5">text</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinPage;
