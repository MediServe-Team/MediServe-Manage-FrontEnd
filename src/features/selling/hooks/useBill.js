import { useState, useEffect } from 'react';
import { filterBillService } from '../billServices';
import { useDebounce } from '../../../hooks';

function useBill() {
  const [sort, setSort] = useState('desc');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [staffName, setStaffName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [bills, setBills] = useState([]);
  //   debounce
  const customerDebounced = useDebounce(customerName, 500);
  const staffDebounced = useDebounce(staffName, 500);

  useEffect(() => {
    // set initial fromDate
    const currentDate = new Date();
    const initialDate = new Date();
    // set initial date is 1 day ago
    initialDate.setDate(currentDate.getDate() - 1);
    setFromDate(initialDate);
  }, []);

  const filterBills = async () => {
    try {
      const result = await filterBillService(staffName, customerName, fromDate, toDate, sort, pageNumber, 10);
      const { receipts, totalPage } = result.data;
      setPageLength(totalPage);
      setBills(receipts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    filterBills();
  }, [sort, fromDate, toDate, customerDebounced, staffDebounced, pageNumber]);

  return {
    bills,
    pageLength,
    sort,
    fromDate,
    toDate,
    staffName,
    customerName,
    pageNumber,
    setSort,
    setFromDate,
    setToDate,
    setStaffName,
    setCustomerName,
    setPageNumber,
  };
}

export default useBill;
