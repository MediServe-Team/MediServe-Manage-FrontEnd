import * as yup from 'yup';

export const addMedicineInDoseSchema = yup.object({
  morning: yup.number().default(0),
  noon: yup.number().default(0),
  night: yup.number().default(0),
  quantity: yup.number().required(),
});

export const doseNameSchema = yup.object({
  diagnose: yup.string().required(),
});
