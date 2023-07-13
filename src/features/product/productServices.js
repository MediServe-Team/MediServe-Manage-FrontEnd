import { axiosBase } from '../../lib/axios';

export const getProductsService = async (categoryId, searchValue, pageNumber, limit) => {
  const response = await axiosBase.get(
    `/products/by-category/${categoryId}?pageNumber=${pageNumber}&limit=${limit}&searchValue=${searchValue}`,
  );
  return response.data;
};

export const createProductServices = async (data) => {
  const response = await axiosBase.post('/products/create', {
    categoryId: data?.categoryId,
    productName: data?.productName,
    registrationNumber: data?.registrationNumber,
    dosageForm: data?.dosageForm,
    productContent: data?.productContent,
    chemicalName: data?.chemicalName,
    chemicalCode: data?.chemicalCode,
    packingSpecification: data?.packingSpecification,
    barCode: data?.barCode,
    sellUnit: data?.sellUnit,
    inputUnit: data?.inputUnit,
    productFunction: data?.productFunction,
    productImage: data?.productImage,
    note: data?.note,
  });
  return response.data;
};

export const filterProductService = async (searchValue) => {
  const response = await axiosBase.get(`/products/filter?searchValue=${searchValue}`);
  return response.data;
};

export const deleteProductService = async (productId) => {
  const response = await axiosBase.delete(`/products/delete/${productId}`);
  return response.data;
};

export const getOneProductService = async (productId) => {
  const response = await axiosBase.get(`/products/detail/${productId}`);
  return response.data;
};
