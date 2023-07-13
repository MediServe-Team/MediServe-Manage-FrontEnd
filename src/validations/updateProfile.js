import * as yup from 'yup';

export const updateProfileSchema = yup.object({
  email: yup.string().email().required().trim(),
  password: yup.string().min(8).required().trim(),
});
