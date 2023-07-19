import { useEffect, useState } from 'react';
import { getAllCategory } from '../../category/categorySlice';
import { getAllUnits } from '../../../slices/unitSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from 'chart.js';
import { BsPeopleFill, BsHeadset, BsCashCoin } from 'react-icons/bs';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { getInventoryStock, getLengthExp } from '../../stock/stockSlice';
import { filterBillService } from '../../selling/billServices';
import { useAxiosWithToken } from '../../../hooks';
import { getAllAccountService } from '../../../services/accountServices';

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.accessToken);
  const lengthExp = useSelector(getLengthExp);
  const [revenue, setRevenue] = useState(0);
  const axiosWithToken = useAxiosWithToken();
  const [staff, setStaff] = useState(0);
  const [customer, setCustomer] = useState(0);

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
      initialDate.setDate(currentDate.getDate() - 30);
      try {
        const result = await filterBillService('', '', initialDate, currentDate, 'desc', 1, 1000);
        const { receipts } = result.data;
        //console.log(receipts);
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
    dispatch(getAllCategory());
    dispatch(getAllUnits());
    dispatch(getInventoryStock());
  }, [dispatch, token]);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, TimeScale);

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
    const m = new Date().getMonth();
    let i = 0;
    do {
      labels.push(month[i]);
      result.push(i + 1);
      i = i + 1;
    } while (i <= m);
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

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg justify-center items-center">
      <div className="h-1/4 w-full flex flex-row gap-9 py-3 px-14">
        <div className="bg-[#028ffa]/30 text-[#028ffa] h-full w-full rounded-2xl flex flex-col px-2">
          <div className="h-2/3 w-full flex gap-6 justify-center items-center text-[50px] font-semibold">
            <BsPeopleFill />
            <span className="text-[38px]">{customer}</span>
          </div>
          <div className="h-1/3 w-full justify-center text-[17px]  font-medium flex">Số khách hàng hôm nay</div>
        </div>
        <div className="bg-[#f5982c]/30 text-[#f5982c] h-full w-full rounded-2xl flex flex-col px-2">
          <div className="h-2/3 w-full flex gap-6 justify-center items-center text-[50px] font-semibold">
            <BsHeadset />
            <span className="text-[38px]">{staff}</span>
          </div>
          <div className="h-1/3 w-full justify-center text-[17px]  font-medium flex">Tổng số nhân viên</div>
        </div>
        <div className="bg-[#0fb806]/30 text-[#0fb806] h-full w-full rounded-2xl flex flex-col px-2">
          <div className="h-2/3 w-full flex gap-6 justify-center items-center text-[50px] font-semibold">
            <BsCashCoin />
            <span className="text-[38px]">{revenue}</span>
          </div>
          <div className="h-1/3 w-full justify-center text-[17px]  font-medium flex">Doanh thu hôm nay</div>
        </div>
        <div className="bg-[#fa342d]/30 text-[#fa342d] h-full w-full rounded-2xl flex flex-col px-2">
          <div className="h-2/3 w-full flex gap-6 justify-center items-center text-[50px] font-semibold">
            <FaRegCalendarTimes />
            <span className="text-[38px]">{lengthExp}</span>
          </div>
          <div className="h-1/3 w-full justify-center text-[17px] font-medium flex">Số loại sản phẩm đã hết hạn</div>
        </div>
      </div>
      <div className="h-3/4 w-3/4 flex justify-center items-center">
        <Line options={options} data={data} />
        <button type="button" onClick={() => console.log('')}>
          click
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
