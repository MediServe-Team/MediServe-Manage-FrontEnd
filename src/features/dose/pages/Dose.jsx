import { useState, useRef, useEffect } from 'react';
import { ItemList, MedicineItem, TitleList } from '../components';
import SearchResultItem from '../../stock/components/SearchResultItem';
import { Button, SearchOnChange, EmptyImage } from '../../../components';
import classNames from 'classnames';
import Tippy from '@tippyjs/react/headless';
import { filterMedicineServices } from '../../medicine/medicineServices';
import { useDebounce } from '../../../hooks';
// handle form data and validate
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { doseNameSchema } from '../../../validations/addMedicineInDose';
// get user ID
import { useSelector } from 'react-redux';
import { getUserId } from '../../Auth/AuthSlice';
// service call api
import { createDoseService, filterDoseService } from '../doseServices';
import { toast } from 'react-toastify';

function Dose() {
  const staffId = useSelector(getUserId);
  const [listMedicine, setListMedicine] = useState([]);
  const [searchDoseValue, setSearchDoseValue] = useState('');
  const [listDose, setlistDose] = useState([]);
  const [searchMedicineValue, setSearchMedicineValue] = useState('');
  const [visibleMedicineResult, setVisibleMedicineResult] = useState(true);
  const [searchMedicineResult, setSearchMedicineResult] = useState([]);
  //* list ref to MedicineItem
  const medicineItemRefs = useRef([]);
  //* use Debounce delay value
  const medicineDebounced = useDebounce(searchMedicineValue, 500);
  const doseDebounced = useDebounce(searchMedicineValue, 500);
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

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(doseNameSchema) });

  //* Medicine with search
  useEffect(() => {
    const filterMedicine = async () => {
      if (medicineDebounced) {
        const result = await filterMedicineServices(medicineDebounced);
        setSearchMedicineResult(result.data);
      }
    };
    filterMedicine();
  }, [medicineDebounced]);

  const handleSearchMedicineChange = (e) => {
    const value = e.target.value;
    setSearchMedicineValue(value);
    if (!value) setVisibleMedicineResult(false);
    else setVisibleMedicineResult(true);
  };

  const clearSearchMedicine = () => {
    setSearchMedicineValue('');
    setVisibleMedicineResult(false);
  };

  //* Handle form create dose
  const handleCreateDose = async () => {
    if (medicineItemRefs.current.length > 0 && listMedicine.length > 0) {
      let checkValidate = true;
      const listMedicines = await medicineItemRefs.current.reduce(async (acc, curr) => {
        if (curr) {
          const data = await curr.getData();
          if (!data) checkValidate = false;
          acc = await Promise.resolve(acc);
          acc.push(data);
        }
        return acc;
      }, []);
      if (checkValidate) {
        // console.log(listMedicines);
        const passValidate = await trigger();
        if (passValidate) {
          const data = getValues();
          data.staffId = staffId;
          data.isDose = true;
          data.listMedicines = listMedicines;
          // call api save new dose
          const result = await createDoseService(data);
          if (result.status === 201) {
            toast.success('Tạo liều thuốc thành công!');
          } else {
            toast.error('Tạo liều thuốc thất bại!');
          }
        }
      }
    }
  };

  const handleClearFormCreateDose = () => {
    reset({ diagnose: '', note: '' });
    medicineItemRefs.current = [];
    setListMedicine([]);
  };

  const handleAddMedicineToDose = (medicineId, medicineName, packingSpecification, sellUnit) => {
    const newListMedicine = [...listMedicine, { medicineId, medicineName, packingSpecification, sellUnit }];
    setListMedicine(newListMedicine);
  };

  const handleRemoveMedicineFromDose = (id) => {
    // remove out of refs
    const removeIndex = medicineItemRefs.current.findIndex((item) => item.id === id);
    if (removeIndex !== -1) medicineItemRefs.current.splice(removeIndex, 1);
    // remove out of state
    const newListMedicine = listMedicine.filter((medicine) => medicine.medicineId !== id);
    setListMedicine(newListMedicine);
  };

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

  // DOSE
  useEffect(() => {
    const filterDose = async () => {
      const doseData = await filterDoseService(doseDebounced);
      setlistDose(doseData.data);
    };
    filterDose();
  }, [doseDebounced]);

  const handleClearSearchDose = () => {
    //
  };
  const handleSearchDoseChange = (e) => {
    setSearchDoseValue(e.target.value);
  };

  return (
    <div className="h-full flex gap-3">
      {/* Dose */}
      <div className="flex flex-col bg-white rounded-lg h-full">
        <header className="flex items-center h-[50px] pl-6 border-b-2 border-text_blur/50 flex-shrink-0">
          <h3 className="text-h4 text-text_primary font-semibold">Tạo liều thuốc</h3>
        </header>

        <div className="px-5 flex-1 flex flex-col min-h-0">
          {/* Search */}
          <div className="mt-5">
            {/* <h3 className="text-text_primary font-medium">Tìm thuốc:</h3> */}
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
          <div className="flex-1 flex flex-col pt-4 gap-5 overflow-auto min-h-0">
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
                  onRemove={() => handleRemoveMedicineFromDose(item.medicineId)}
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
              <Button
                styleBtn={'solid'}
                modifier={'dark_primary'}
                size={'medium'}
                width={100}
                onClick={handleCreateDose}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* List Dose */}
      <div className="w-3/5 flex flex-col bg-white rounded-lg">
        <header className="flex items-center h-[50px] pl-6 border-b-2 border-text_blur/50">
          <h3 className="text-h4 text-text_primary font-semibold">Danh sách liều thuốc</h3>
        </header>
        {/* Search */}
        <div className="px-10 py-5">
          <SearchOnChange
            value={searchDoseValue}
            onChange={handleSearchDoseChange}
            placeholder={'Thêm từ khóa tìm kiếm liều thuốc'}
          />
        </div>
        {/* Title */}
        <div className="px-10 flex-1 overflow-y-auto mb-3">
          <TitleList>
            {/* Data */}
            {listDose.map((dose, index) => (
              <ItemList key={index} number={index + 1} />
            ))}
          </TitleList>
        </div>
      </div>
    </div>
  );
}

export default Dose;
