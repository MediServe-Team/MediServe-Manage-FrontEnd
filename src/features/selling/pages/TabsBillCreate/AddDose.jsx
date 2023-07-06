import { useState, useEffect, useRef } from 'react';
import MedicineItem from '../../components/MedicineItem';
import { Button, EmptyImage, SearchOnChange, Modal } from '../../../../components';
import SearchResultItem from '../../../stock/components/SearchResultItem';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { doseNameSchema } from '../../../../validations/addMedicineInDose';
import classNames from 'classnames';
import Tippy from '@tippyjs/react/headless';
import { useDebounce } from '../../../../hooks';
// service
import { filterMedicineStockService } from '../../../medicine/medicineServices';
import { useOutletContext } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

function AddDose() {
  const [listMedicine, setListMedicine] = useState([]);
  const [visibleMedicineResult, setVisibleMedicineResult] = useState(true);
  const [searchMedicineResult, setSearchMedicineResult] = useState([]);
  const [searchMedicineValue, setSearchMedicineValue] = useState('');
  // modal
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // useOutlet context
  const { setDoses } = useOutletContext();
  // debounce
  const medicineDebounced = useDebounce(searchMedicineValue, 500);
  //* list ref to MedicineItem
  const medicineItemRefs = useRef([]);
  //* resize width for tippy search result box
  const searchMedicineBoxRef = useRef(null);
  useEffect(() => {
    const searchMedicineResultBox = searchMedicineBoxRef.current;
    const searchMedicineWrapper = document.querySelector('.search-medicine-wrapper');
    if (searchMedicineResultBox && searchMedicineWrapper) {
      const setWidthSearchMedicine = () => {
        const width = searchMedicineWrapper.offsetWidth;
        searchMedicineResultBox.style.width = `${width}px`;
      };
      setWidthSearchMedicine();
      window.addEventListener('resize', setWidthSearchMedicine);
      // clean up fn
      return () => {
        window.removeEventListener('resize', setWidthSearchMedicine);
      };
    }
  });

  //* Medicine with search
  useEffect(() => {
    const filterMedicine = async () => {
      if (medicineDebounced) {
        const result = await filterMedicineStockService(medicineDebounced);
        setSearchMedicineResult(result.data);
      }
    };
    filterMedicine();
  }, [medicineDebounced]);

  // form
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(doseNameSchema) });

  //* search medicine change
  const handleSearchMedicineChange = (e) => {
    const value = e.target.value;
    setSearchMedicineValue(value);
    if (!value) setVisibleMedicineResult(false);
    else setVisibleMedicineResult(true);
  };

  //* clear search medicine
  const clearSearchMedicine = () => {
    setSearchMedicineValue('');
    setVisibleMedicineResult(false);
  };

  //* add medicine
  const handleAddMedicineToDose = (medicineId, medicineName, packingSpecification, sellUnit, sellPrice) => {
    const newListMedicine = [...listMedicine, { medicineId, medicineName, packingSpecification, sellUnit, sellPrice }];
    setListMedicine(newListMedicine);
  };

  //* delete medicine
  const handleRemoveMedicineFromDose = (index) => {
    // remove out of refs
    medicineItemRefs.current = [];
    // remove out of state
    const newListMedicine = [...listMedicine];
    setListMedicine([...newListMedicine.slice(0, index), ...newListMedicine.slice(index + 1)]);
  };

  //*todo: create dose
  const handleCreateDose = async () => {
    if (medicineItemRefs.current.length > 0 && listMedicine.length > 0) {
      let checkValidate = true;
      const listMedicines = await medicineItemRefs.current.reduce(async (acc, curr) => {
        if (curr) {
          const data = await curr.getData();
          const {
            medicineId,
            medicineName,
            medicineUnit,
            morning,
            night,
            noon,
            packingSpecification,
            quantity,
            sellPrice,
          } = data;
          if (!data) checkValidate = false;
          acc = await Promise.resolve(acc);
          acc.push({
            medicineId: Number(medicineId),
            medicineName,
            medicineUnit,
            morning: Number(morning),
            night: Number(night),
            noon: Number(noon),
            packingSpecification,
            quantity: Number(quantity),
            sellPrice: Number(quantity),
          });
        }
        return acc;
      }, []);
      if (checkValidate) {
        const passValidate = await trigger();
        if (passValidate) {
          const data = getValues();
          // calc price of dose
          const totalPrice = listMedicines.reduce((acc, curr) => {
            return acc + Number(curr.sellPrice) * Number(curr.quantity);
          }, 0);
          data.listMedicines = listMedicines;
          data.quantity = Number(quantity);
          data.totalPrice = totalPrice * Number(quantity);
          setOpenModal(false);
          setDoses((prev) => {
            return [...prev, data];
          });
          handleClearFormCreateDose();
        }
      }
    }
  };

  //todo: clear form create dose
  const handleClearFormCreateDose = () => {
    setListMedicine([]);
    setSearchMedicineValue('');
    medicineItemRefs.current = [];
    reset({ diagnose: '', note: '' });
  };

  //* fn: render list medicine in dose
  const renderSearchMedicineResult = () => {
    return Array.isArray(searchMedicineResult) && searchMedicineResult.length > 0 ? (
      searchMedicineResult.map((item, index) => (
        <SearchResultItem
          key={index}
          name={item.medicine.medicineName}
          packingSpecification={item.medicine.packingSpecification}
          onClick={() =>
            handleAddMedicineToDose(
              item.medicine.id,
              item.medicine.medicineName,
              item.medicine.packingSpecification,
              item.medicine.sellUnit,
              item.sellPrice,
            )
          }
        />
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Không có kết quả tìm kiếm phù hợp!</div>
    );
  };

  //* modal: close
  const handleCloseModal = () => {
    setOpenModal(false);
    setQuantity(1);
  };

  //* modal: open
  const handleOpenModal = async () => {
    // check validate data
    if (medicineItemRefs.current.length > 0 && listMedicine.length > 0) {
      let checkValidate = true;
      await medicineItemRefs.current.map(async (item) => {
        if (item) {
          const data = await item.getData();
          if (!data) checkValidate = false;
        }
      });
      if (checkValidate) {
        const passValidate = await trigger();
        if (passValidate) {
          setOpenModal(true);
        }
      }
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg h-full min-h-0">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Search */}
        <div className="mt-5">
          <Tippy
            visible={visibleMedicineResult && searchMedicineResult.length > 0}
            interactive={true}
            placement="bottom-start"
            onClickOutside={() => setVisibleMedicineResult(false)}
            render={(attrs) => (
              <div
                tabIndex="-1"
                {...attrs}
                className={'w-full max-h-[480px] overflow-y-auto shadow-lg'}
                ref={searchMedicineBoxRef}
              >
                <div className="bg-white rounded-md shadow-xl">{renderSearchMedicineResult()}</div>
              </div>
            )}
          >
            <div className="w-full search-medicine-wrapper">
              <SearchOnChange
                className={'w-full'}
                value={searchMedicineValue}
                placeholder={'Thêm từ khóa tìm kiếm thuốc'}
                onChange={handleSearchMedicineChange}
                onClear={clearSearchMedicine}
              />
            </div>
          </Tippy>
        </div>

        {/* Name of dose */}
        <div className="pt-4 pb-1">
          <h3 className="text-text_primary font-medium">Tên liều thuốc:</h3>
          <input
            type="text"
            className={classNames(
              'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
              errors.diagnose?.message ? 'border-danger' : 'border-text_primary/20',
            )}
            placeholder="VD: Liều thuốc cảm cúm cho người lớn"
            {...register('diagnose')}
          />
        </div>

        {/* List medicine */}
        <div className="flex-1 flex flex-col pt-4 gap-5 overflow-y-auto">
          {listMedicine && listMedicine.length > 0 ? (
            listMedicine.map((item, index) => (
              <MedicineItem
                key={index}
                ref={(el) => (medicineItemRefs.current[index] = el)}
                number={index + 1}
                medicineId={item.medicineId}
                medicineName={item.medicineName}
                packingSpecification={item.packingSpecification}
                medicineUnit={item.sellUnit}
                sellPrice={item.sellPrice}
                onRemove={() => handleRemoveMedicineFromDose(index)}
              />
            ))
          ) : (
            <EmptyImage title={'Chưa có thuốc được thêm để tạo liều'} />
          )}
        </div>

        {/* Button control area */}
        <div className="flex justify-between items-end gap-5 py-2 flex-shrink-0">
          {/* Note */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-text_primary font-medium">Ghi chú:</h3>
            <input
              type="text"
              className="border-2 w-full h-[44px] outline-none rounded-md border-text_primary/20 focus:border-text_primary transition-all duration-200 px-2"
              placeholder="Thêm ghi chú"
              {...register('note')}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              styleBtn={'solid'}
              modifier={'danger'}
              size={'medium'}
              width={100}
              onClick={handleClearFormCreateDose}
            >
              Làm rỗng
            </Button>
            <Button styleBtn={'solid'} modifier={'dark_primary'} size={'medium'} width={100} onClick={handleOpenModal}>
              Thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal showModal={openModal}>
        <div className="w-[300px] flex flex-col items-center gap-5">
          <header className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-text_primary font-bold text-h4">Nhập số lượng</h3>
              <p className="text-text_blur text-h6">Thêm số lượng cho thuốc</p>
            </div>
            {/* close modal update */}
            <button className="w-[40px] h-full flex outline-none" onClick={handleCloseModal}>
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </header>
          {/* input */}
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="text-center border-2 w-full h-[40px] outline-none rounded-md border-text_primary/20 focus:border-text_primary transition-all duration-200 px-2"
          />
          {/* Button */}
          <Button size={'medium'} width={140} modifier={'dark-primary'} onClick={handleCreateDose}>
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddDose;
