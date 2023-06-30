import { axiosBase } from '../../lib/axios';

export const createDoseService = async (data) => {
  const response = await axiosBase.post('/prescriptions/create', {
    staffId: data?.staffId,
    diagnose: data?.diagnose,
    isDose: data?.isDose,
    note: data?.note,
    listMedicines: data?.listMedicines,
  });

  return response.data;
};
