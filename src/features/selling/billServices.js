import { axiosBase } from '../../lib/axios';

export const createBillService = async (data) => {
  const { staffId, customerId, totalPayment, givenByCustomer, note, guest, products, medicines, newPrescriptions } =
    data;
  const newReceipt = {
    staffId,
    customerId,
    totalPayment,
    givenByCustomer,
    note,
    guest,
    products,
    medicines,
    newPrescriptions,
  };
  try {
    const response = await axiosBase.post('/receipts/create', newReceipt);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const filterBillService = async (staffName, customerName, fromDate, toDate, sort, pageNumber, limit) => {
  const response = await axiosBase.get(
    `/receipts/filter?staffName=${staffName}&customerName=${customerName}&fromDate=${fromDate}&toDate=${toDate}&sort=${sort}&pageNumber=${pageNumber}&limit=${limit}`,
  );
  return response.data;
};

export const getBillService = async (billId) => {
  const response = await axiosBase.get(`/receipts/detail/${billId}`);
  return response.data;
};

export const getBillOfUserService = async (userId) => {
  const response = await axiosBase.get(`/receipts/of-user/${userId}`);
  return response.data;
};
