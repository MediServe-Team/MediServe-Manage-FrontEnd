import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
//   TimeScale,
// } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BsPeopleFill, BsHeadset, BsCashCoin } from 'react-icons/bs';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { getLengthExp } from '../../stock/stockSlice';
import { filterBillService } from '../../selling/billServices';
import { useAxiosWithToken } from '../../../hooks';
import { getAllAccountService } from '../../../services/accountServices';
import formatToVND from '../../../helpers/formatToVND';

function Dashboard() {
  const dispatch = useDispatch();
  const lengthExp = useSelector(getLengthExp);
  const [revenue, setRevenue] = useState(0);
  const axiosWithToken = useAxiosWithToken();
  const [staff, setStaff] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [monthMoney, setMonthMoney] = useState([]);

  // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, TimeScale);
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const month = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
  const labels = [];
  const result = [];
  const addData = () => {
    monthMoney.forEach((e, index) => {
      labels.push(month[index]);
      result.push(e);
    });
  };
  addData();

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Doanh thu',
        data: result,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Biểu đồ đường thể hiện doanh thu năm nay theo tháng',
      },
    },
  };
  const changeTo12h = (date) => {
    const d = new Date(date);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
  };

  const calTotalPayment = (array) => {
    let price = 0;
    array.forEach((e) => {
      price = price + e.totalPayment;
    });
    return price;
  };

  const calStaff = (array) => {
    let num = 0;
    array.forEach((e) => {
      if (e.role === 'STAFF') {
        num = num + 1;
      }
    });
    return num;
  };

  const calCustomer = (array) => {
    const list = [];
    array.forEach((e) => {
      if (e.guestId) {
        list.push(e.guestId.toString());
      } else if (e.customerId) {
        list.push(e.customerId.toString());
      }
    });
    const result = new Set(list);
    return result.size;
  };

  useEffect(() => {
    const filterBills = async () => {
      const currentDate = new Date();
      const initialDate = changeTo12h(new Date());
      // initialDate.setDate(currentDate.getDate() - 30);
      try {
        const result = await filterBillService('', '', initialDate, currentDate, 'desc', 1, 1000);
        const { receipts } = result.data;
        setRevenue(calTotalPayment(receipts));
        setCustomer(calCustomer(receipts));
      } catch (err) {
        console.log(err);
      }
    };

    const getAllUsers = async () => {
      try {
        const result = await getAllAccountService(axiosWithToken);
        setStaff(calStaff(result.data));
      } catch (err) {
        console.log(err);
      }
    };
    filterBills();
    getAllUsers();
  }, []);

  useEffect(() => {
    const m = [];
    const filterBillsByMonths = async () => {
      const now = new Date().getMonth();
      for (let i = 1; i <= now + 1; i++) {
        const initialDate = new Date();
        initialDate.setMonth(i - 1);
        initialDate.setDate(1);
        initialDate.setHours(0);
        initialDate.setMinutes(0);
        initialDate.setSeconds(0);

        const currentDate = new Date();
        if (i !== now + 1) {
          currentDate.setMonth(i);
          currentDate.setDate(1);
          currentDate.setHours(0);
          currentDate.setMinutes(0);
          currentDate.setSeconds(-1);
        }

        try {
          const result = await filterBillService('', '', initialDate, currentDate, 'desc', 1, 30000);
          const { receipts } = result.data;
          const money = calTotalPayment(receipts);
          m.push(money);
        } catch (err) {
          console.log(err);
        }
      }
      setMonthMoney(m);
    };
    filterBillsByMonths();
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg justify-center items-center">
      <div className="h-1/4 w-full flex flex-row justify-between gap-5 py-3 px-5">
        {/* Total customer today */}
        <div className="bg-white shadow-[0px_3px_5px_1px_rgba(0,0,0,0.8)] text-[#028ffa] h-[110px] w-[22%] rounded-md px-2 flex gap-3 items-center">
          <div className="w-[60px] h-[50px] bg-[#028ffa]/30 flex justify-center items-center rounded-full flex-shrink-0">
            <BsPeopleFill className="text-[30px]" />
          </div>
          <div className="">
            <span className="text-[26px] font-bold text-text_primary">{customer}</span>
            <div className="h-1/3 w-full justify-center text-[14px]  font-medium flex">Số khách hàng hôm nay</div>
          </div>
        </div>

        {/* Total Staff */}
        <div className="bg-white shadow-[0px_3px_5px_1px_rgba(0,0,0,0.8)] text-[#f5982c] h-[110px] w-[22%] rounded-md px-2 flex gap-3 items-center">
          <div className="w-[60px] h-[50px] bg-[#f5982c]/30 flex justify-center items-center rounded-full flex-shrink-0">
            <BsHeadset className="text-[30px]" />
          </div>
          <div className="">
            <span className="text-[26px] font-bold text-text_primary">{staff}</span>
            <div className="h-1/3 w-full justify-center text-[14px]  font-medium flex">Tổng số nhân viên</div>
          </div>
        </div>

        {/* Revenue Today */}
        <div className="bg-white shadow-[0px_3px_5px_1px_rgba(0,0,0,0.8)] text-[#0fb806] h-[110px] w-[22%] rounded-md px-2 flex gap-3 items-center">
          <div className="w-[60px] h-[50px] bg-[#0fb806]/30 flex justify-center items-center rounded-full flex-shrink-0">
            <BsCashCoin className="text-[30px]" />
          </div>
          <div className="">
            <span className="text-[26px] font-bold text-text_primary">{formatToVND(revenue)}</span>
            <div className="h-1/3 w-full justify-center text-[14px]  font-medium flex">Doanh thu hôm nay</div>
          </div>
        </div>

        {/* Product expired */}
        <div className="bg-white shadow-[0px_3px_5px_1px_rgba(0,0,0,0.8)] text-[#fa342d] h-[110px] w-[22%] rounded-md px-2 flex gap-3 items-center">
          <div className="w-[60px] h-[50px] bg-[#fa342d]/30 flex justify-center items-center rounded-full flex-shrink-0">
            <FaRegCalendarTimes className="text-[30px]" />
          </div>
          <div className="">
            <span className="text-[26px] font-bold text-text_primary">{lengthExp}</span>
            <div className="h-1/3 w-full justify-center text-[14px]  font-medium flex">Sản phẩm đã hết hạn</div>
          </div>
        </div>
      </div>
      <div className="h-3/4 w-3/4 flex justify-center items-center">
        {/* <Line options={options} data={data} /> */}
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
