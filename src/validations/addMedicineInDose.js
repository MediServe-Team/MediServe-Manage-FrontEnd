import * as yup from 'yup';

export const addMedicineInDoseSchema = yup.object({
  morning: yup.number().required(),
  noon: yup.number().required(),
  night: yup.number().required(),
  quantity: yup.number().required(),
});

export const doseNameSchema = yup.object({
  diagnose: yup.string().required(),
});
