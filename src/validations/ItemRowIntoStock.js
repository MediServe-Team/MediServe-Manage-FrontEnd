import * as yup from 'yup';

export const ItemRowIntoStockSchema = yup.object({
  inputQuantity: yup.number().min(1).required(),
  specification: yup.number().min(1).required(),
  importPrice: yup.number().required(),
  sellPrice: yup.number().required(),
  manufactureDate: yup.date().required(),
  expirationDate: yup.date().required(),
  lotNumber: yup.string().required(),
});
