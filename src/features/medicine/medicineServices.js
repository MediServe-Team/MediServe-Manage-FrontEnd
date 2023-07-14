import { axiosBase } from '../.././lib/axios';

export const getMedicinesService = async (categoryId, searchValue, pageNumber, limit) => {
  const response = await axiosBase.get(
    `/medicines/by-category/${categoryId}?pageNumber=${pageNumber}&limit=${limit}&searchValue=${searchValue}`,
  );
  return response.data;
};

export const createMedicineServices = async (data) => {
  const response = await axiosBase.post('/medicines/create', {
    categoryId: data?.categoryId,
    medicineName: data?.medicineName,
    registrationNumber: data?.registrationNumber,
    dosageForm: data?.dosageForm,
    productContent: data?.productContent,
    chemicalName: data?.chemicalName,
    chemicalCode: data?.chemicalCode,
    packingSpecification: data?.packingSpecification,
    barCode: data?.barCode,
    sellUnit: data?.sellUnit,
    inputUnit: data?.inputUnit,
    applyToAffectedAreaCode: data?.applyToAffectedAreaCode,
    applyToAffectedArea: data?.applyToAffectedArea,
    medicineFunction: data?.medicineFunction,
    medicineImage: data?.medicineImage,
    isPrescription: data?.isPrescription,
    note: data?.note,
  });
  return response.data;
};

export const filterMedicineServices = async (searchValue) => {
  const response = await axiosBase.get(`/medicines/filter?searchValue=${searchValue}`);
  return response.data;
};

export const filterMedicineStockService = async (searchValue) => {
  const response = await axiosBase.get(`/medicines/filter-stock?searchValue=${searchValue}`);
  return response.data;
};

export const deleteMedicineService = async (medicineId) => {
  const response = await axiosBase.delete(`/medicines/delete/${medicineId}`);
  return response.data;
};
