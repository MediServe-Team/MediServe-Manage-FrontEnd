import * as yup from 'yup';

export const updateProfileSchema = yup.object({
  name: yup.string().required(),
  fullName: yup.string().required(),
  gender: yup.boolean().required(),
  age: yup.number().positive().integer().required(),
  dateOfBirth: yup.date().optional(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
});
