import * as yup from 'yup';

export const CreateMedicineSchema = yup.object({
  medicineName: yup.string().required(),
  registrationNumber: yup.string().required(),
  dosageForm: yup.string().required(),
  productContent: yup.string().required(),
  chemicalName: yup.string().required(),
  chemicalCode: yup.string().required(),
  packingSpecification: yup.string().required(),
  applyToAffectedAreaCode: yup.string().required(),
  applyToAffectedArea: yup.string().required(),
  medicineFunction: yup.string().optional(),
  note: yup.string().optional(),
  isPrescription: yup.string().required(),
  //   categoryId: yup.required(),
  //   inputUnit: yup.required(),
  //   sellUnit: yup.required(),
  //   medicineImage: yup.required(),
  //   barCode: yup.string().required(),
});
