import * as yup from 'yup';

export const ItemRowIntoStockSchema = yup.object({
  quantity: yup.number().min(1).required(),
  specification: yup.number().min(1).required(),
  importPrice: yup.number().required(),
  sellPrice: yup.number().required(),
  manufactureDate: yup.date().required(),
  expDate: yup.date().required(),
  lotNumber: yup.string().required(),
});
