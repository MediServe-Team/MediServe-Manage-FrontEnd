import * as yup from 'yup';

export const updateAccountStaffSchema = yup.object({
  name: yup.string().required(),
  fullName: yup.string().required(),
  address: yup.string().optional(),
  age: yup.number().optional().nullable(),
  dateOfBirth: yup.date().optional().nullable(),
  phoneNumber: yup.string().optional(),
  numOfPPC: yup.string().optional(),
});
