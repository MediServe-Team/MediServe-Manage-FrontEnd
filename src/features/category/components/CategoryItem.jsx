import { useState } from 'react';
import { BsCapsule } from 'react-icons/bs';
import { BsPlusSquareFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import CustomSwitch from '../components/CustomSwitch';
import classNames from 'classnames';
import { Modal, Button } from '../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCategorySchema } from '../../../validations/createCategory';
// services
import { updateCategoryServices, deleteCategoryServices } from '../categoryServices';
// dispatch
import { useDispatch } from 'react-redux';
import { getAllCategory } from '../categorySlice';
import { toast } from 'react-toastify';

function CategotyItem({ order, categoryId, categoryName, isMedicine, isDefault, note }) {
  const [openModal, setOpenModal] = useState(false);
  const [checkMedicine, setCheckMedicine] = useState(isMedicine);
  const dispatch = useDispatch();

  const {
    formState: { errors },
    getValues,
    trigger,
    register,
    reset,
  } = useForm({ resolver: yupResolver(CreateCategorySchema) });

  let stylesColor;
  switch (order % 3) {
    case 0:
      stylesColor = '#38B3E1';
      break;
    case 1:
      stylesColor = '#EE9717';
      break;
    default:
      stylesColor = '#02D09E';
      break;
  }

  const handleUpdateCategory = async () => {
    //* trigger validate all field
    const passValidate = await trigger();
    if (passValidate) {
      const dataForm = getValues();
      const newCategory = {
        id: dataForm?.id,
        categoryName: dataForm?.categoryName,
        isMedicine: dataForm?.isMedicine,
        note: dataForm?.note,
      };
      //* update category
      const result = await updateCategoryServices(newCategory);
      if (result.status === 200) {
        toast.success('Cập nhật danh mục thành công!');
        //* reset modal
        reset();
        setOpenModal(false);
        dispatch(getAllCategory());
      } else {
        toast.error('Cập nhật danh mục thất bại!');
      }
    }
  };

  const handleDeleteCategory = async () => {
    const dataForm = getValues();
    const { id } = dataForm;
    //* delete category
    const result = await deleteCategoryServices(id);
    if (result.status === 200) {
      toast.success('Xóa danh mục thành công!'); //* reset modal
      reset();
      setOpenModal(false);
      dispatch(getAllCategory());
    } else {
      toast.error('Xóa danh mục thất bại!');
    }
  };

  return (
    <div
      className="bg-white w-full rounded-lg mx-auto flex flex-col gap-2 border-[2px] p-3 h-fit"
      style={{ borderColor: stylesColor }}
    >
      <div className="flex items-center gap-4">
        <p
          className="h-[26px] w-[28px] flex items-center justify-center rounded-sm text-h7 text-white font-medium"
          style={{ backgroundColor: stylesColor }}
        >
          {order}
        </p>

        <div className="flex items-end gap-2">
          <div className="text-h5 font-medium text-blue_dark/90">{categoryName}</div>
          {isMedicine && <BsCapsule className="text-[20px] text-dark_primary relative -top-[1px]" />}
        </div>
      </div>

      <div className="flex justify-between items-center ml-[46px] gap-2">
        <div className="text-h8 text-text_blur">{note}</div>
        <div className="flex text-h8 text-black/70 font-medium items-center justify-center">
          {isDefault ? (
            <p className="bg-text_blur/30 py-1 px-2 rounded-md whitespace-nowrap">Mặc định</p>
          ) : (
            <button
              className="outline-none py-1 px-2 rounded-md whitespace-nowrap text-white"
              style={{ backgroundColor: stylesColor }}
              onClick={() => setOpenModal(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal showModal={openModal}>
        <div className="w-[340px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-5">
              <span className="text-text_primary my-auto">
                <BsPlusSquareFill className="text-[20px]" />
              </span>
              <h3 className="text-text_primary font-semibold text-h4">Chỉnh sửa danh mục</h3>
            </div>
            {/* close modal */}
            <button
              className="w-[40px] h-full flex outline-none"
              onClick={() => {
                reset();
                setOpenModal(false);
              }}
            >
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </div>
          {/* divider */}
          <div className="bg-text_primary h-[1px] w-full mt-3"></div>

          {/* Form update category */}
          <form className="flex flex-col gap-4 mt-5 w-5/6">
            {/* CategoryId */}
            <input type="hidden" value={categoryId} {...register('id')} />
            {/* Category Name */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Tên danh mục</span>
              <input
                type="text"
                defaultValue={categoryName}
                {...register('categoryName')}
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  false ? 'border-danger' : 'border-text_primary/20',
                )}
              />
              {errors.categoryName?.message && <span className="text-danger">Tên danh mục không được trống</span>}
            </div>
            {/* Category Note */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Ghi chú</span>
              <input
                type="text"
                defaultValue={note}
                {...register('note')}
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  false ? 'border-danger' : 'border-text_primary/20',
                )}
              />
            </div>
            {/* Is Medicine */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <span
                className={classNames(
                  'font-medium transition-colors',
                  checkMedicine ? 'text-text_blur' : 'text-text_primary',
                )}
              >
                Khác thuốc
              </span>
              <CustomSwitch checked={checkMedicine} onChange={() => setCheckMedicine(!checkMedicine)} />
              <span
                className={classNames(
                  'font-medium transition-colors',
                  checkMedicine ? 'text-text_primary' : 'text-text_blur',
                )}
              >
                Thuốc
              </span>
            </div>
            {/* Button control modal*/}
            <div className="flex justify-between items-center mt-3">
              <Button size={'medium'} modifier={'danger'} width={120} type={'button'} onClick={handleDeleteCategory}>
                Xóa
              </Button>
              <Button
                size={'medium'}
                modifier={'dark-primary'}
                width={120}
                type={'button'}
                onClick={handleUpdateCategory}
              >
                Lưu
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CategotyItem;
