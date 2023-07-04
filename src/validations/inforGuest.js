import * as yup from 'yup';

export const InforGuestSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
  gender: yup.boolean().required(),
  address: yup.string().optional(),
});
