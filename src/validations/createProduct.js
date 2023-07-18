import * as yup from 'yup';

export const CreateProductSchema = yup.object({
  productName: yup.string().required(),
  registrationNumber: yup.string().required(),
  dosageForm: yup.string().optional(),
  productContent: yup.string().optional(),
  chemicalName: yup.string().optional(),
  chemicalCode: yup.string().optional(),
  packingSpecification: yup.string().required(),
  productFunction: yup.string().optional(),
  note: yup.string().optional(),
  //   categoryId: yup.required(),
  //   inputUnit: yup.required(),
  //   sellUnit: yup.required(),
  //   productImage: yup.required(),
  //   barCode: yup.string().required(),
});
