import * as yup from 'yup';

export const CreateCategorySchema = yup.object({
  categoryName: yup.string().required(),
  note: yup.string().optional(),
});
