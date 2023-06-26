import { useState, useEffect } from 'react';
import { UploadImg } from '../../.././components';
import { IoMdCloudUpload } from 'react-icons/io';
import { TbRefresh } from 'react-icons/tb';
import getBase64 from '../../../helpers/getBase64';
import { Button, SelectUnit, SelectCategory } from '../../../components';
import { useSelector } from 'react-redux';
import { getListUnits } from '../../../slices/unitSlice';
// import lib handle form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProductSchema } from '../../../validations/createProduct';
import classNames from 'classnames';
import { createProductServices } from '../productServices';
import { toast } from 'react-toastify';

function ProductCreate() {
  const [listImg, setListImg] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [importUnit, setImportUnit] = useState('');
  const [sellUnit, setSellUnit] = useState('');
  // getCategory
  const categories = useSelector((state) => state.category.categories);
  const [productCategories, setProductCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [trackErrors, setTrackErrors] = useState({
    passErrs: true,
    listImg: '',
    barcode: '',
    importUnit: '',
    sellUnit: '',
    category: '',
  });

  //* use Form
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateProductSchema) });

  //* get data for units and categories
  const units = useSelector(getListUnits);
  useEffect(() => {
    const filterProductCategories = categories.filter((item) => !item.isMedicine);
    setProductCategories(filterProductCategories);
  }, [categories]);

  const handleUploadBarCode = async (e) => {
    const file = e.target.files[0];
    // check cancle file
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    if (!barcode) {
      const barcodeArea = document.querySelector('#product-barcode-form');
      const barcodeImg = document.createElement('img');
      barcodeImg.src = data;
      barcodeImg.id = 'barcode-img';
      barcodeImg.style = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;';
      barcodeArea.appendChild(barcodeImg);
    } else {
      const barcodeImg = document.querySelector('#barcode-img');
      barcodeImg.src = data;
    }
    setBarcode(data);
  };

  //* Track errors passed
  useEffect(() => {
    let newErrors = { ...trackErrors };
    if (listImg.length > 0 && barcode && importUnit && sellUnit && categoryId) newErrors.passErrs = true;
    if (listImg.length > 0) newErrors.listImg = '';
    if (barcode) newErrors.barcode = '';
    if (importUnit) newErrors.importUnit = '';
    if (sellUnit) newErrors.sellUnit = '';
    if (categoryId) newErrors.category = '';

    setTrackErrors(newErrors);
    // eslint-disable-next-line
  }, [listImg, barcode, importUnit, sellUnit, categoryId]);

  //* Hanlde check errors before submit form
  const handleTrackErrors = () => {
    let newErrors = { ...trackErrors };
    if (!(listImg.length > 0)) {
      newErrors.passErrs = false;
      newErrors.listImg = 'List image for product is required!';
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

  //* Handle before submit data to create new Product
  const handleSubmitCreateProduct = async (dataForm) => {
    if (!trackErrors.passErrs) return;
    const imgs = listImg.map((img) => img.data);
    const bodyRequest = {
      categoryId: categoryId,
      productName: dataForm.productName,
      registrationNumber: dataForm.registrationNumber,
      dosageForm: dataForm.dosageForm,
      productContent: dataForm.productContent,
      chemicalName: dataForm.chemicalName,
      chemicalCode: dataForm.chemicalCode,
      packingSpecification: dataForm.packingSpecification,
      barCode: barcode,
      sellUnit: sellUnit,
      inputUnit: importUnit,
      productFunction: dataForm.productFunction,
      productImage: imgs,
      note: dataForm.note,
    };

    const result = await createProductServices(bodyRequest);
    if (result.status === 201) {
      toast.success('Tạo mới sản phẩm thành công!');
    } else {
      toast.error('Hệ thống gặp sự cố khi tạo sẩn phẩm!');
    }
  };

  const handleClearForm = () => {
    // clear display img barcode
    const barcodeImg = document.querySelector('#barcode-img');
    barcodeImg.remove();
    // clear data
    setListImg([]);
    setBarcode('');
    setImportUnit('');
    setSellUnit('');
    setCategoryId(null);
    reset();
    clearErrors();
    setTrackErrors({
      passErrs: false,
      listImg: '',
      barcode: '',
      importUnit: '',
      sellUnit: '',
      category: '',
    });
  };

  return (
    <div className="w-full h-full rounded-lg bg-white p-5">
      <form
        id="create-product-form"
        className="h-full flex justify-between gap-8"
        onSubmit={handleSubmit(handleSubmitCreateProduct)}
      >
        {/* First column */}
        <div className="w-1/3 h-full flex flex-col gap-[10px]">
          <div>
            <UploadImg listImg={listImg} setListImg={setListImg} />
            {trackErrors.listImg && <span className="text-danger">Vui lòng thêm ảnh!</span>}
          </div>
          {/* Barcode */}
          <div>
            <div className="flex flex-col">
              <span className="text-text_primary font-medium">Mã vạch</span>
              <div className="w-full h-[100px] flex justify-center items-center px-[10px] bg-primary/10 rounded-md">
                <div
                  id="product-barcode-form"
                  className="w-2/3 h-[80px] bg-white rounded-md border-2 border-text_primary border-dashed flex flex-col items-center justify-center relative cursor-pointer"
                  onClick={() => document.querySelector('#upload-barcode').click()}
                >
                  <IoMdCloudUpload className="text-[30px] text-text_primary" />
                  <span className="text-text_primary">Nhấn để thêm</span>
                  <input
                    id="upload-barcode"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleUploadBarCode(e)}
                  />
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
            <Button
              type={'outline'}
              size={'medium'}
              width={150}
              leftIcon={<TbRefresh className="text-[20px]" />}
              onClick={() => handleClearForm()}
            >
              Làm rỗng
            </Button>
            <Button type={'solid'} size={'medium'} width={150} onClick={() => handleTrackErrors()}>
              Tạo sản phẩm
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
