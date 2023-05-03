import * as yup from 'yup';

export const numberSchema = yup.object({
  number: yup.number().required().trim(),
});
