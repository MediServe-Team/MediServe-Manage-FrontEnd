import { useState, useEffect } from 'react';
import { filterHistoryInvoiceService } from '../stockServices';

const useStock = () => {
  const [sort, setSort] = useState('desc');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // set initial fromDate
    const currentDate = new Date();
    const initialDate = new Date();
    // set initial date is 10 day ago
    initialDate.setDate(currentDate.getDate() - 10);
    setFromDate(initialDate);
  }, []);

  const filterHistoryInvoice = async () => {
    try {
      const result = await filterHistoryInvoiceService(fromDate, toDate, sort, pageNumber, 10);
      const { listGroupDate, totalPage } = result.data;
      setPageLength(totalPage);
      setInvoices(listGroupDate);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    filterHistoryInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, fromDate, toDate, pageNumber]);

  return {
    invoices,
    pageLength,
    sort,
    fromDate,
    toDate,
    pageNumber,
    setSort,
    setFromDate,
    setToDate,
    setPageNumber,
  };
};

export default useStock;
