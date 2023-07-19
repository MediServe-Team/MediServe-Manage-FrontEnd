import * as yup from 'yup';

export const createAccountSchema = yup.object({
  email: yup.string().required(),
  name: yup.string().required(),
  fullName: yup.string().required(),
  address: yup.string().optional(),
  age: yup
    .number()
    .nullable()
    .transform((value, originValue) => (isNaN(originValue) || originValue === '' ? null : value)),
  dateOfBirth: yup.date().optional().nullable(),
  phoneNumber: yup.string().optional(),
  role: yup.string().required(),
});
