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
  const response = await axiosBase.post('/receipts/create', newReceipt);
  return response.data;
};
