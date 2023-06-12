import { useState, useEffect, useCallback } from 'react';
import { filterHistoryInvoiceService } from '../stockServices';

const useStock = () => {
  const [sort, setSort] = useState('desc');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [invoices, setInvoices] = useState([]);

  const filterHistoryInvoice = async () => {
    try {
      const result = await filterHistoryInvoiceService(fromDate, toDate, sort, pageNumber, 10);
      const { listGroupDate, totalPage } = result.data;
      setPageLength(totalPage);
      setInvoices(listGroupDate);
    } catch (err) {
      console.log(err);
    }
    return {};
  };

  useEffect(() => {
    filterHistoryInvoice();
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
