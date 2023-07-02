import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
// component
import { Modal, Button, SearchOnChange } from '../../../components';
import Tippy from '@tippyjs/react/headless';
import MedicineItem from './MedicineItem';
import SearchResultItem from '../../stock/components/SearchResultItem';
// icon
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillEyeFill, BsTrashFill } from 'react-icons/bs';
// debounce
import { useDebounce } from '../../../hooks';
// services api
import { deleteDoseService, getDoseService, updateDoseService } from '../doseServices';
import { filterMedicineServices } from '../../medicine/medicineServices';
// form validate
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { doseNameSchema } from '../../../validations/addMedicineInDose';

function ItemList({ number, doseId, doseName, note, setReloadList }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  // search medicine
  const [searchMedicineValue, setSearchMedicineValue] = useState('');
  const [searchMedicineResult, setSearchMedicineResult] = useState([]);
  const [visibleMedicineResult, setVisibleMedicineResult] = useState(false);
  const [listGuide, setListGuide] = useState([]);
  const medicineDebounced = useDebounce(searchMedicineValue);
  const medicineItemRefs = useRef([]);
  // form
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(doseNameSchema) });

  //? Effect: Medicine with search
  useEffect(() => {
    const filterMedicine = async () => {
      if (medicineDebounced) {
        const result = await filterMedicineServices(medicineDebounced);
        setSearchMedicineResult(result.data);
      }
    };
    filterMedicine();
  }, [medicineDebounced]);

  //* modal: add medicine to dose
  const handleAddMedicineToDose = (medicineId, medicineName, packingSpecification, sellUnit) => {
    const newList = [...listGuide, { medicineId, medicineName, packingSpecification, medicineUnit: sellUnit }];
    setListGuide(newList);
  };

  //* modal: remove medicine from dose
  const handleRemoveMedicineFromDose = (id) => {
    // remove out of refs
    medicineItemRefs.current = [];
    // remove out of state
    const newList = listGuide.filter((guide) => guide.medicineId !== id);
    setListGuide([...newList]);
  };

  //* modal: search medicine change
  const handleSearchMedicineChange = (e) => {
    const value = e.target.value;
    setSearchMedicineValue(value);
    if (!value) setVisibleMedicineResult(false);
    else setVisibleMedicineResult(true);
  };

  //* modal: clear search medicine
  const clearSearchMedicine = () => {
    setSearchMedicineValue('');
    setVisibleMedicineResult(false);
  };

  //* modal: open update-modal
  const handleOpenUpdateDose = async () => {
    const result = await getDoseService(doseId);
    const listGuides = result.data.MedicineGuides.map((item) => ({
      medicineId: item.medicineId,
      medicineName: item.medicine.medicineName,
      packingSpecification: item.medicine.packingSpecification,
      medicineUnit: item.medicine.sellUnit,
      morning: item.morning,
      noon: item.noon,
      night: item.night,
      quantity: item.quantity,
    }));
    setListGuide(listGuides);
    setOpenModalUpdate(true);
  };

  //* modal: close update-modal
  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    setListGuide([]);
    medicineItemRefs.current = [];
    setSearchMedicineValue('');
    reset();
  };

  //* fn: update dose
  const handleUpdateDose = async () => {
    let checkValidate = true;
    const listMedicineGuides = await medicineItemRefs.current.reduce(async (acc, curr) => {
      if (curr) {
        const data = await curr.getData();
        if (!data) checkValidate = false;
        acc = await Promise.resolve(acc);
        acc.push(data);
      }
      return acc;
    }, []);
    if (checkValidate) {
      const passValidate = await trigger();
      if (passValidate) {
        const data = getValues();
        data.listMedicines = listMedicineGuides;
        // call api save new dose
        const result = await updateDoseService(doseId, data);
        if (result.status === 200) {
          toast.success('Cập nhật liều thuốc thành công!');
          setOpenModalUpdate(false);
          medicineItemRefs.current = [];
          setListGuide([]);
          setReloadList();
          reset();
        } else {
          toast.error('Cập nhật liều thuốc thất bại!');
        }
      }
    }
  };

  //todo fn: render search medicine result
  const renderSearchMedicineResult = () => {
    return Array.isArray(searchMedicineResult) && searchMedicineResult.length > 0 ? (
      searchMedicineResult.map((item, index) => (
        <SearchResultItem
          key={index}
          name={item.medicineName}
          packingSpecification={item.packingSpecification}
          onClick={() => handleAddMedicineToDose(item.id, item.medicineName, item.packingSpecification, item.sellUnit)}
        />
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Không có kết quả tìm kiếm phù hợp!</div>
    );
  };

  //* fn: delete dose
  const handleDeleteDose = async () => {
    const result = await deleteDoseService(doseId);
    if (result.status === 200) {
      toast.success('Xóa liều thuốc thành công!');
      setReloadList();
      setOpenModalDelete(false);
    } else {
      toast.error('Xóa liều thuốc thất bại!');
    }
  };

  return (
    <>
      <ul className="flex justify-between items-center bg-primary/5 border-2 border-text_primary/10 p-2 rounded-lg gap-3 text-h5 px-2 flex-shrink-0">
        {/* number */}
        <li className="w-[32px] h-[32px] flex justify-center items-center bg-white rounded-md px-1 flex-shrink-0">
          <span className="text-dark_primary">{number}</span>
        </li>

        {/* dose */}
        <li className="flex flex-[12] items-center truncate">
          <span className="font-medium">{doseName}</span>
        </li>

        <li className="flex flex-[10] items-center truncate">
          <span className="whitespace-nowrap">{note}</span>
        </li>

        <li className="flex flex-[1.5] items-center justify-center text-white">
          <button
            className="h-[25px] w-[25px] bg-yellow-400 items-center justify-center flex hover:opacity-80 active:opacity-100"
            onClick={handleOpenUpdateDose}
          >
            <BsFillEyeFill />
          </button>
        </li>

        <li className="flex flex-[1.5] items-center justify-center text-white ">
          <button
            className="h-[25px] w-[25px] bg-red-400 items-center justify-center flex hover:opacity-80 active:opacity-100"
            onClick={() => setOpenModalDelete(true)}
          >
            <BsTrashFill />
          </button>
        </li>
      </ul>

      {/* Modal Update*/}
      <Modal showModal={openModalUpdate}>
        <div className="w-[600px] flex flex-col items-center">
          <header className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-text_primary font-bold text-h4">Thông tin liều thuốc</h3>
              <p className="text-text_blur text-h6">Thay đổi thông tin bên dưới để cập nhật liều thuốc</p>
            </div>
            {/* close modal update */}
            <button className="w-[40px] h-full flex outline-none" onClick={handleCloseModalUpdate}>
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </header>

          {/* Body modal update */}
          <div className="pt-4 w-full">
            {/* Search add medicine */}
            <Tippy
              visible={visibleMedicineResult && searchMedicineResult.length > 0}
              interactive={true}
              placement="bottom-start"
              appendTo={document.querySelector('.search-medicine-wrapper')}
              onClickOutside={() => setVisibleMedicineResult(false)}
              render={(attrs) => (
                <div tabIndex="-1" {...attrs} className={'w-[600px] max-h-[480px] overflow-y-auto shadow-lg'}>
                  <div className="bg-white rounded-md shadow-xl">{renderSearchMedicineResult()}</div>
                </div>
              )}
            >
              <div className="search-medicine-wrapper">
                <SearchOnChange
                  value={searchMedicineValue}
                  onChange={handleSearchMedicineChange}
                  onClear={clearSearchMedicine}
                  placeholder={'Thêm từ khóa tìm kiếm thuốc'}
                />
              </div>
            </Tippy>
            {/* Form update dose */}
            <div className="w-full flex flex-col gap-4 pt-4">
              {/* Dose name */}
              <div className="flex flex-col">
                <h3 className="text-text_primary font-medium">Tên liều thuốc:</h3>
                <input
                  type="text"
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.diagnose?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  defaultValue={doseName}
                  {...register('diagnose')}
                />
              </div>
              {/* Dose note */}
              <div className="flex flex-col">
                <h3 className="text-text_primary font-medium">Ghi chú liều thuốc:</h3>
                <input
                  type="text"
                  className="border-2 w-full h-[40px] outline-none rounded-md border-text_primary/20 focus:border-text_primary transition-all duration-200 px-2"
                  defaultValue={note}
                  {...register('note')}
                />
              </div>
              {/* List guide medicine */}
              <div className="flex flex-col">
                <h3 className="text-text_primary font-medium">Danh sách thuốc trong liều:</h3>
                <div className="max-h-[300px] flex flex-col gap-4 overflow-y-auto">
                  {Array.isArray(listGuide) &&
                    listGuide.map((guide, index) => (
                      <MedicineItem
                        key={index}
                        ref={(el) => (medicineItemRefs.current[index] = el)}
                        number={index + 1}
                        medicineId={guide.medicineId}
                        medicineName={guide.medicineName}
                        packingSpecification={guide.packingSpecification}
                        medicineUnit={guide.medicineUnit}
                        morning={guide.morning}
                        noon={guide.noon}
                        night={guide.night}
                        quantity={guide.quantity}
                        onRemove={() => handleRemoveMedicineFromDose(guide.medicineId)}
                      />
                    ))}
                </div>
              </div>
              {/* Button control update */}
              <div className="flex justify-end items-center gap-5 mt-3">
                <Button
                  size={'medium'}
                  modifier={'gray'}
                  styleBtn={'outline'}
                  width={140}
                  type={'button'}
                  onClick={handleCloseModalUpdate}
                >
                  Đóng
                </Button>
                <Button
                  size={'medium'}
                  modifier={'dark-primary'}
                  width={140}
                  type={'button'}
                  onClick={handleUpdateDose}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Delete */}
      <Modal showModal={openModalDelete}>
        <div className="w-[340px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-text_primary font-bold text-h4">Xóa liều thuốc</h3>
              <p className="text-text_blur text-h6">Liều thuốc sẽ bị xóa khỏi hệ thống</p>
            </div>
            {/* close modal Delete */}
            <button
              className="w-[40px] h-full flex outline-none"
              onClick={() => {
                // reset();
                setOpenModalDelete(false);
              }}
            >
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </div>
          {/* Form delete dose */}
          <form className="flex flex-col w-full gap-4 mt-5">
            {/* Dose name */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Tên liều thuốc</span>
              <input
                type="text"
                defaultValue={doseName}
                className="border-2 w-full h-[40px] outline-none rounded-md px-2"
                readOnly
              />
            </div>
            {/* Dose note */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Ghi chú</span>
              <input
                type="text"
                defaultValue={note}
                className="border-2 w-full h-[40px] outline-none rounded-md px-2"
                readOnly
              />
            </div>
            {/* Button control delete */}
            <div className="flex justify-between items-center gap-5 mt-3">
              <Button
                size={'medium'}
                modifier={'gray'}
                styleBtn={'outline'}
                width={'100%'}
                type={'button'}
                onClick={() => setOpenModalDelete(false)}
              >
                Đóng
              </Button>
              <Button size={'medium'} modifier={'danger'} width={'100%'} type={'button'} onClick={handleDeleteDose}>
                Xóa
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ItemList;
