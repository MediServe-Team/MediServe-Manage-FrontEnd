import { useState, useEffect } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import getBase64 from '../../../helpers/getBase64';
import { Button, SelectUnit, SelectCategory } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { getListUnits } from '../../../slices/unitSlice';
// import lib handle form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProductSchema } from '../../../validations/createProduct';
import classNames from 'classnames';
import { toast } from 'react-toastify';
// services
import { getOneProductService, updateProductService } from '../productServices';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function ProductUpdate() {
  const { productId } = useParams();

  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Cập nhật sản phẩm',
        slug: `/products/update/${productId}`,
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch, productId]);

  const navigate = useNavigate();
  const [productImg, setProductImg] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [importUnit, setImportUnit] = useState('');
  const [sellUnit, setSellUnit] = useState('');
  // getCategory
  const categories = useSelector((state) => state.category.categories);
  const [productCategories, setProductCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [trackErrors, setTrackErrors] = useState({
    passErrs: true,
    productImg: '',
    barcode: '',
    importUnit: '',
    sellUnit: '',
    category: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  //* use Form
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateProductSchema) });

  //* get data for units and categories
  const units = useSelector(getListUnits);
  useEffect(() => {
    const filterProductCategories = categories.filter((item) => !item.isMedicine);
    setProductCategories(filterProductCategories);
  }, [categories]);

  //* get data product update
  useEffect(() => {
    const getDataProductUpdate = async () => {
      const result = await getOneProductService(productId);
      // set data
      setBarcode(result.data.barCode);
      setCategoryId(result.data.categoryId);
      setImportUnit(result.data.inputUnit);
      setSellUnit(result.data.sellUnit);
      setProductImg(result.data.itemImage);
      // set data in form
      setValue('productName', result.data.itemName);
      setValue('registrationNumber', result.data.registrationNumber);
      setValue('dosageForm', result.data.dosageForm);
      setValue('productContent', result.data.productContent);
      setValue('chemicalName', result.data.chemicalName);
      setValue('chemicalCode', result.data.chemicalCode);
      setValue('packingSpecification', result.data.packingSpecification);
      setValue('productFunction', result.data.itemFunction);
      setValue('note', result.data.note);
    };
    getDataProductUpdate();
  }, []);

  //* convert to Base64 string
  const convertToBase64 = async (url, callback) => {
    try {
      await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            callback(reader.result);
          };
          reader.readAsDataURL(blob);
        });
    } catch (err) {
      console.error('Error converting image to base64: ', err);
    }
  };

  //* upload product img
  const handleUploadProductImg = async (e) => {
    const file = e.target.files[0];
    // check cancel file
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    const productImg = document.querySelector('#upload-img');
    productImg.src = data;
    setProductImg(data);
  };

  //* upload barcode
  const handleUploadBarCode = async (e) => {
    const file = e.target.files[0];
    // check cancle file
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    const barcodeImg = document.querySelector('#barcode-img');
    barcodeImg.src = data;
    setBarcode(data);
  };

  //* Track errors passed
  useEffect(() => {
    let newErrors = { ...trackErrors };
    if (productImg && barcode && importUnit && sellUnit && categoryId) newErrors.passErrs = true;
    if (productImg) newErrors.productImg = '';
    if (barcode) newErrors.barcode = '';
    if (importUnit) newErrors.importUnit = '';
    if (sellUnit) newErrors.sellUnit = '';
    if (categoryId) newErrors.category = '';

    setTrackErrors(newErrors);
    // eslint-disable-next-line
  }, [productImg, barcode, importUnit, sellUnit, categoryId]);

  //* Hanlde check errors before submit form
  const handleTrackErrors = () => {
    let newErrors = { ...trackErrors };
    if (!productImg) {
      newErrors.passErrs = false;
      newErrors.productImg = 'Image for product is required!';
    }
    if (!barcode) {
      newErrors.passErrs = false;
      newErrors.barcode = 'barCode for product is required!';
    }
    if (!importUnit) {
      newErrors.passErrs = false;
      newErrors.importUnit = 'importUnit for product is required!';
    }
    if (!sellUnit) {
      newErrors.passErrs = false;
      newErrors.sellUnit = 'sellUnit for product is required!';
    }
    if (!categoryId) {
      newErrors.passErrs = false;
      newErrors.category = 'category for product is required!';
    }
    setTrackErrors(newErrors);
  };

  //Check if url is in the base64String's format
  const checkUrlBeforeUpdate = (url) => {
    if (Array.isArray(url)) {
      const lastUrl = url[url.length - 1];
      if (lastUrl.substring(0, 5) === 'data:') return lastUrl;
      else {
        let baseString64 = '';
        convertToBase64(lastUrl, (base) => {
          baseString64 = base;
        });
        return baseString64;
      }
    } else {
      if (url.substring(0, 5) === 'data:') return url;
      else {
        let baseString64 = '';
        convertToBase64(url, (base) => {
          baseString64 = base;
        });
        return baseString64;
      }
    }
  };

  //* Handle before submit data to update Product
  const handleSubmitUpdateProduct = async (dataForm) => {
    if (!trackErrors.passErrs) {
      return;
    }

    // set loading is true
    setIsUpdating(true);

    const bodyRequest = {
      categoryId: categoryId,
      productName: dataForm.productName,
      registrationNumber: dataForm.registrationNumber,
      dosageForm: dataForm.dosageForm,
      productContent: dataForm.productContent,
      chemicalName: dataForm.chemicalName,
      chemicalCode: dataForm.chemicalCode,
      packingSpecification: dataForm.packingSpecification,
      barCode: checkUrlBeforeUpdate(barcode),
      sellUnit: sellUnit,
      inputUnit: importUnit,
      productFunction: dataForm.productFunction,
      productImage: checkUrlBeforeUpdate(productImg),
      note: dataForm.note,
    };

    const result = await updateProductService(productId, bodyRequest);
    console.log(bodyRequest);
    if (result.status === 200) {
      toast.success('Cập nhật sản phẩm thành công!');
      // set loading is false
      setIsUpdating(false);
      navigate(-1);
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật phẩm!');
      // set loading is false
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full h-full rounded-lg bg-white p-5 overflow-y-auto">
      <form
        id="create-product-form"
        className="h-full flex justify-between gap-8"
        onSubmit={handleSubmit(handleSubmitUpdateProduct)}
      >
        {/* First column */}
        <div className="w-1/3 h-full flex flex-col gap-[10px]">
          <div className="w-full flex justify-center items-center rounded-md h-[320px] bg-primary/10">
            <div
              className="w-4/5 h-4/5 border-2 bg-white border-text_primary rounded-md border-dashed relative cursor-pointer"
              onClick={() => document.querySelector('#upload-img').click()}
            >
              <input id="upload-img" type="file" accept="image/*" hidden onChange={(e) => handleUploadProductImg(e)} />
              {productImg && (
                <img id="product-img" src={productImg} className="absolute top-0 left-0 w-full h-full object-cover" />
              )}
            </div>
            {trackErrors.productImg && <span className="text-danger">Vui lòng thêm ảnh!</span>}
          </div>
          {/* Barcode */}
          <div>
            <div className="flex flex-col">
              <span className="text-text_primary font-medium">Mã vạch</span>
              <div className="w-full h-[100px] flex justify-center items-center px-[10px] bg-primary/10 rounded-md">
                <div
                  className="w-2/3 h-[80px] bg-white rounded-md border-2 border-text_primary border-dashed flex flex-col items-center justify-center relative cursor-pointer"
                  onClick={() => document.querySelector('#upload-barcode').click()}
                >
                  {!barcode && (
                    <>
                      <IoMdCloudUpload className="text-[30px] text-text_primary" />
                      <span className="text-text_primary">Nhấn để thêm</span>
                    </>
                  )}
                  <input
                    id="upload-barcode"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleUploadBarCode(e)}
                  />
                  {barcode && (
                    <img id="barcode-img" src={barcode} className="absolute top-0 left-0 w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>
            {trackErrors.barcode && <span className="text-danger">Vui lòng thêm mã vạch sản phẩm!</span>}
          </div>
          {/* Note */}
          <div className="flex flex-col flex-1">
            <span className="text-text_primary font-medium">Ghi chú</span>
            <textarea
              className="border-2 outline-none rounded-md p-2 flex-1 border-text_primary/20 focus:border-text_primary transition-all duration-200"
              placeholder="Thêm ghi chú cho sản phẩm"
              {...register('note')}
            />
          </div>
        </div>

        {/* Second column */}
        <div className="w-1/3 h-full flex flex-col gap-[20px]">
          {/* product name */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Tên sản phẩm</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.productName?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('productName')}
            />
          </div>

          {/* dose form */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Dạng bào chế</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.dosageForm?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('dosageForm')}
            />
          </div>

          <div className="flex gap-5">
            {/* Chemical code */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Mã hoạt chất</span>
              <input
                type="text"
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.chemicalCode?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('chemicalCode')}
              />
            </div>
          </div>

          {/* Chemical name */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Tên hoạt chất</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.chemicalName?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('chemicalName')}
            />
          </div>

          {/* functional */}
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-text_primary font-medium">Chức năng sản phẩm</span>
            <textarea
              className="border-2 outline-none rounded-md p-2 flex-1 border-text_primary/20 focus:border-text_primary transition-all duration-200"
              placeholder="Mô tả chức năng sản phẩm"
              {...register('productFunction')}
            />
          </div>
        </div>

        {/* Third column */}
        <div className="w-1/3 h-full flex flex-col gap-5">
          {/* Number registration */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Số đăng ký</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.registrationNumber?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('registrationNumber')}
            />
          </div>

          {/* packing specification */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Quy cách đóng gói</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.packingSpecification?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('packingSpecification')}
            />
          </div>

          {/* Product content */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Hàm lượng</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.productContent?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('productContent')}
            />
          </div>

          {/* Unit */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 w-1/2">
              <span className="text-text_primary font-medium">Đơn vị nhập</span>
              <SelectUnit
                height={40}
                list={units}
                selected={importUnit}
                setSelected={setImportUnit}
                danger={trackErrors.importUnit ? true : false}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <span className="text-text_primary font-medium">Đơn vị bán</span>
              <SelectUnit
                height={40}
                list={units}
                selected={sellUnit}
                setSelected={setSellUnit}
                danger={trackErrors.sellUnit ? true : false}
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Danh mục sản phẩm</span>
            <SelectCategory
              height={40}
              categories={productCategories}
              selected={categoryId}
              setSelected={setCategoryId}
              danger={trackErrors.category ? true : false}
            />
          </div>

          {/* Button create product */}
          <div className="flex-1 flex justify-between items-end">
            <Button type={'button'} size={'medium'} modifier={'danger'} width={150} onClick={() => navigate(-1)}>
              Hủy
            </Button>
            <Button
              styleBtn={'solid'}
              size={'medium'}
              modifier={'dark-primary'}
              width={150}
              onClick={() => handleTrackErrors()}
              disabled={isUpdating}
            >
              {isUpdating ? <ClipLoader color={'#ffffff'} loading={isUpdating} size={30} /> : 'Cập nhật'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductUpdate;
