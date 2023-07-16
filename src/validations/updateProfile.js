import * as yup from 'yup';

export const updateProfileSchema = yup.object({
  name: yup.string().required(),
  fullName: yup.string().required(),
  gender: yup.boolean().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
});
