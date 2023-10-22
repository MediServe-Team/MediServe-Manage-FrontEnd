import { useState, useEffect } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import getBase64 from '../../../helpers/getBase64';
import { Button, SelectUnit, SelectCategory } from '../../../components';
import { useSelector } from 'react-redux';
import { getListUnits } from '../../../slices/unitSlice';
// import lib handle form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateMedicineSchema } from '../../../validations/createMedicine';
import classNames from 'classnames';
import { toast } from 'react-toastify';
// services
import { getOneMedicineService, updateMedicineService } from '../medicineServices';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MedicineUpdate() {
  const navigate = useNavigate();
  const [medicineImg, setMedicineImg] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [importUnit, setImportUnit] = useState('');
  const [sellUnit, setSellUnit] = useState('');
  // state isPrescription
  const [isPrescription, setIsPrescription] = useState(false);
  // getCategory
  const categories = useSelector((state) => state.category.categories);
  const [medicineCategories, setMedicineCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [trackErrors, setTrackErrors] = useState({
    passErrs: true,
    medicineImg: '',
    barcode: '',
    importUnit: '',
    sellUnit: '',
    category: '',
  });

  //* use Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateMedicineSchema) });

  //* get data for units and categories
  const units = useSelector(getListUnits);
  useEffect(() => {
    const filtermedicineCategories = categories.filter((item) => item.isMedicine);
    setMedicineCategories(filtermedicineCategories);
  }, [categories]);

  const { medicineId } = useParams();

  //* get data medicine update
  useEffect(() => {
    const getDataMedicineUpdate = async () => {
      const result = await getOneMedicineService(medicineId);
      // set data
      setBarcode(result.data.barCode);
      setCategoryId(result.data.categoryId);
      setImportUnit(result.data.inputUnit);
      setSellUnit(result.data.sellUnit);
      setMedicineImg(result.data.medicineImage);
      setIsPrescription(result.data.isPrescription);
      // set data in form
      setValue('medicineName', result.data.medicineName);
      setValue('registrationNumber', result.data.registrationNumber);
      setValue('dosageForm', result.data.dosageForm);
      setValue('productContent', result.data.productContent);
      setValue('chemicalName', result.data.chemicalName);
      setValue('chemicalCode', result.data.chemicalCode);
      setValue('packingSpecification', result.data.packingSpecification);
      setValue('medicineFunction', result.data.medicineFunction);
      setValue('applyToAffectedAreaCode', result.data.applyToAffectedAreaCode);
      setValue('applyToAffectedArea', result.data.applyToAffectedArea);
      setValue('note', result.data.note);
    };
    getDataMedicineUpdate();
  }, []);

  //* upload medicine img
  const handleUploadMedicineImg = async (e) => {
    const file = e.target.files[0];
    // check cancle file
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    const medicineImg = document.querySelector('#upload-img');
    medicineImg.src = data;
    setMedicineImg(data);
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
    if (medicineImg && barcode && importUnit && sellUnit && categoryId) newErrors.passErrs = true;
    if (medicineImg) newErrors.medicineImg = '';
    if (barcode) newErrors.barcode = '';
    if (importUnit) newErrors.importUnit = '';
    if (sellUnit) newErrors.sellUnit = '';
    if (categoryId) newErrors.category = '';

    setTrackErrors(newErrors);
    // eslint-disable-next-line
  }, [medicineImg, barcode, importUnit, sellUnit, categoryId]);

  //* Hanlde check errors before submit form
  const handleTrackErrors = () => {
    let newErrors = { ...trackErrors };
    if (!medicineImg) {
      newErrors.passErrs = false;
      newErrors.medicineImg = 'Image for medicine is required!';
    }
    if (!barcode) {
      newErrors.passErrs = false;
      newErrors.barcode = 'barCode for medicine is required!';
    }
    if (!importUnit) {
      newErrors.passErrs = false;
      newErrors.importUnit = 'importUnit for medicine is required!';
    }
    if (!sellUnit) {
      newErrors.passErrs = false;
      newErrors.sellUnit = 'sellUnit for medicine is required!';
    }
    if (!categoryId) {
      newErrors.passErrs = false;
      newErrors.category = 'category for medicine is required!';
    }
    setTrackErrors(newErrors);
  };

  //* Handle before submit data to create new Medicine
  const handleSubmitCreateMedicine = async (dataForm) => {
    if (!trackErrors.passErrs) return;
    const bodyRequest = {
      categoryId: categoryId,
      medicineName: dataForm.medicineName,
      registrationNumber: dataForm.registrationNumber,
      dosageForm: dataForm.dosageForm,
      productContent: dataForm.productContent,
      chemicalName: dataForm.chemicalName,
      chemicalCode: dataForm.chemicalCode,
      packingSpecification: dataForm.packingSpecification,
      barCode: barcode,
      sellUnit: sellUnit,
      inputUnit: importUnit,
      medicineFunction: dataForm.medicineFunction,
      medicineImage: medicineImg,
      applyToAffectedAreaCode: dataForm.applyToAffectedAreaCode,
      applyToAffectedArea: dataForm.applyToAffectedArea,
      isPrescription: dataForm.isPrescription === 'true' ? true : false,
      note: dataForm.note,
    };

    const result = await updateMedicineService(medicineId, bodyRequest);
    if (result.status === 200) {
      toast.success('Cập nhật sản phẩm thành công!');
      navigate(-1);
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật sẩn phẩm!');
    }
  };

  return (
    <div className="w-full h-full rounded-lg bg-white p-5 overflow-y-auto">
      <form
        id="create-medicine-form"
        className="h-full flex justify-between gap-8"
        onSubmit={handleSubmit(handleSubmitCreateMedicine)}
      >
        {/* First column */}
        <div className="w-1/3 h-full flex flex-col gap-[10px]">
          <div className="w-full flex justify-center items-center rounded-md h-[320px] bg-primary/10">
            <div
              className="w-4/5 h-4/5 border-2 bg-white border-text_primary rounded-md border-dashed relative cursor-pointer"
              onClick={() => document.querySelector('#upload-img').click()}
            >
              <input id="upload-img" type="file" accept="image/*" hidden onChange={(e) => handleUploadMedicineImg(e)} />
              {medicineImg && (
                <img id="medicine-img" src={medicineImg} className="absolute top-0 left-0 w-full h-full object-cover" />
              )}
            </div>
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
          {/* medicine name */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Tên sản phẩm</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.medicineName?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('medicineName')}
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
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Mã đường dùng</span>
              <input
                type="text"
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.applyToAffectedAreaCode?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('applyToAffectedAreaCode')}
              />
            </div>
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

          {/* apply to effect area name */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Tên đường dùng</span>
            <input
              type="text"
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.applyToAffectedArea?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('applyToAffectedArea')}
            />
          </div>

          {/* functional */}
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-text_primary font-medium">Chức năng sản phẩm</span>
            <textarea
              className="border-2 outline-none rounded-md p-2 flex-1 border-text_primary/20 focus:border-text_primary transition-all duration-200"
              placeholder="Mô tả chức năng sản phẩm"
              {...register('medicineFunction')}
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

          {/* Type of medicine */}
          <div className="flex flex-col gap-1">
            <span className="text-text_primary font-medium">Loại thuốc</span>
            <div className="flex gap-12 h-[40px]">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="radio-prescription"
                  name="type-medicine"
                  value={true}
                  checked={isPrescription}
                  {...register('isPrescription')}
                />
                <label htmlFor="radio-prescription">Kê đơn</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="radio-non-prescription"
                  name="type-medicine"
                  value={false}
                  checked={!isPrescription}
                  {...register('isPrescription')}
                />
                <label htmlFor="radio-non-prescription">Không kê đơn</label>
              </div>
            </div>
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
              categories={medicineCategories}
              selected={categoryId}
              setSelected={setCategoryId}
              danger={trackErrors.category ? true : false}
            />
          </div>

          {/* Button create medicine */}
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
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MedicineUpdate;
