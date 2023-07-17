import * as yup from 'yup';

export const updateProfileSchema = yup.object({
  name: yup.string().required(),
  fullName: yup.string().required(),
  gender: yup.boolean().required(),
  address: yup.string().optional(),
  age: yup.number().optional().nullable(),
  dateOfBirth: yup.date().optional().nullable(),
  phoneNumber: yup.string().optional(),
  numOfPPC: yup.string().optional().nullable(),
});
