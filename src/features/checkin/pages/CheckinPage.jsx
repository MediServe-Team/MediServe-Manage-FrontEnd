import { useState, useEffect } from 'react';
import { BiLogIn } from 'react-icons/bi';
import classNames from 'classnames';
import { useAxiosWithToken } from '../../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getMyCheckinServices, getCheckinToday, checkin, checkout } from '../checkinServices';
import dateToString from '../../../helpers/dateToString';
import formatTime from '../../../helpers/formatTime';
import calcTimeDiff from '../../../helpers/calcTimeDiff';
import { toast } from 'react-toastify';
import { BsBookmarkCheckFill } from 'react-icons/bs';

const CheckinPage = () => {
  const [checkinToday, setCheckinToday] = useState(null);
  const [listCheckins, setListCheckins] = useState([]);
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2023);
  // const dispatch = useDispatch();
  const axiosWithToken = useAxiosWithToken();

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  useEffect(() => {
    const getCheckins = async () => {
      const result = await getMyCheckinServices(axiosWithToken, month, year);
      const todayCheckin = await getCheckinToday(axiosWithToken);
      // set value
      setCheckinToday(todayCheckin.data);
      setListCheckins(result.data);
    };
    getCheckins();
  }, [month, year, checkinToday]);

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

  const handleCheckin = async () => {
    const result = await checkin(axiosWithToken);
    if (result.status == 200) {
      toast.success(`Bạn đã checkin vào lúc ${formatTime(result?.data?.checkinTime)}`);
      setCheckinToday(result.data);
    } else {
      toast.error('checkin thất bại.');
    }
  };

  const handleCheckout = async () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    const currentTime = currentDate.getTime();
    const defaultCheckoutTime = new Date('2023-12-27T17:30:00.000Z').getTime();
    // check checkout time after 17h30
    if (currentTime <= defaultCheckoutTime) {
      const result = await checkout(axiosWithToken);
      if (result.status == 200) {
        toast.success('Bạn đã chekout thành công.');
        const result = await getMyCheckinServices(axiosWithToken, month, year);
        setListCheckins(result.data);
      } else {
        toast.error('checkout thất bại.');
      }
    }
  };

  return (
    <div className="flex h-full w-full gap-5 bg-white rounded-[4px] px-14 py-8">
      <div className="w-1/3 h-full flex flex-col">
        <section>
          <p className="bg-gradient-to-r from-[#cea35d] to-[#f3e9d8] px-5 py-1 font-medium flex gap-2">
            <BsBookmarkCheckFill className="w-[25px] h-[25px] text-[#f9ffb4]" />
            <span>Điểm danh trước khi vào làm</span>
          </p>
        </section>
        <p className="my-5 text-[#296c38]">
          {checkinToday ? `Bạn đã đăng ký vào lúc ${formatTime(checkinToday?.checkinTime)}` : 'Đăng ký vào'}
        </p>
        {/* Checkin Button */}
        <div className="flex flex-col gap-5">
          <section>
            <div
              className={classNames(
                `w-[280px] h-[150px] rounded-lg flex active:opacity-80`,
                checkinToday !== null
                  ? 'bg-[#e0dede] '
                  : 'bg-[#29CE4D] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.44)] hover:shadow-none cursor-pointer',
              )}
              onClick={() => handleCheckin()}
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
                checkinToday?.checkoutTime &&
                  new Date(checkinToday.checkoutTime).getTime() === new Date('2023-12-27T17:30:00.000Z').getTime()
                  ? 'bg-[#346CD9] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.44)] hover:shadow-none cursor-pointer'
                  : 'bg-[#e0dede]',
              )}
              onClick={handleCheckout}
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
        <div class="text-gray-900 bg-[#bed9f444]">
          <div class="px-4 pt-4 flex justify-between">
            <h2 className="font-medium text-h4">
              Tháng {month}, {year}
            </h2>
            <div class="flex gap-2">
              <button
                type="button"
                class="bg-gray-400 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-[#307dd5] hover:text-black px-3"
              >
                <div class="flex flex-row align-middle" onClick={prevMonth}>
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
                <div class="flex flex-row align-middle" onClick={nextMonth}>
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
                  <th class="w-2/5 text-left p-3 px-5">Ngày </th>
                  <th class="w-2/5 text-left p-3 px-5">Giờ vào</th>
                  <th class="w-2/5 text-left p-3 px-5">Giờ ra</th>
                  <th class="w-2/5 text-left p-3 px-5">Số giờ làm</th>
                </tr>
              </thead>
              <tbody className="block overflow-y-auto h-[450px]">
                {Array.isArray(listCheckins) &&
                  listCheckins.map((item, index) => (
                    <tr class="flex border-b hover:bg-orange-100 bg-gray-100">
                      <td class="w-1/5 p-3 px-5">{index + 1}</td>
                      <td class="w-2/5 p-3 px-5">{dateToString(item.dateCheckin)}</td>
                      <td class="w-2/5 p-3 px-5">{formatTime(item?.checkinTime)}</td>
                      <td class="w-2/5 p-3 px-5">{formatTime(item?.checkoutTime)}</td>
                      <td class="w-2/5 p-3 px-5">{calcTimeDiff(item?.checkinTime, item.checkoutTime)}</td>
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
