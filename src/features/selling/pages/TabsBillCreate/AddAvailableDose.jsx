import { useState, useEffect } from 'react';
import { SearchOnChange, EmptyImage, Modal, Button } from '../../../../components';
import { AddDoseItem } from '../../components';
import { useDebounce } from '../../../../hooks';
import { useOutletContext } from 'react-router-dom';
// icon
import { AiOutlineClose } from 'react-icons/ai';
// service
import { filterDoseService, getDoseService } from '../../../dose/doseServices';

function AddAvailableDose() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const debounced = useDebounce(searchValue);
  const { setDoseAvails } = useOutletContext();
  const [doseIdSelected, setDoseIdSelected] = useState({});
  // modal
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const filterDoses = async () => {
      if (debounced) {
        const result = await filterDoseService(debounced);
        setResults(result.data);
      } else {
        setResults([]);
      }
    };
    filterDoses();
  }, [debounced]);

  //* search change:
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //* clear search:
  const handleClearSearch = () => {
    setSearchValue('');
  };

  //* fn add meidicine to dose:
  const handleAddDoseToReceipt = async () => {
    const result = await getDoseService(doseIdSelected);
    const { id, note, diagnose, MedicineGuides } = result.data;
    // close modal
    setOpenModal(false);
    setQuantity(1); // reset value
    // setDoseAvails((prev) => {
    //   return [...prev, newdata];
    // });
  };

  //* modal: open
  const handleOpenModal = (doseId) => {
    setDoseIdSelected(doseId);
    setOpenModal(true);
  };

  //* modal: close
  const handleCloseModal = () => {
    setOpenModal(false);
    setDoseIdSelected('');
    setQuantity(1);
  };

  return (
    <div className="h-full flex flex-col w-full gap-4">
      <div className="pt-5 py-2 flex-shrink-0">
        <SearchOnChange
          placeholder={'Nhập từ khóa tìm kiếm liều đã tạo'}
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
      </div>
      {/* List prescriptions filter */}
      <div className="flex-1 overflow-y-auto mb-3">
        {results && results.length > 0 ? (
          results.map((item, index) => {
            return (
              <AddDoseItem key={index} name={item.diagnose} note={item.note} onClick={() => handleOpenModal(item.id)} />
            );
          })
        ) : (
          <div className="h-full flex justify-center items-center">
            <EmptyImage title={'Không có kết quả tìm kiếm sản phẩm'} />
          </div>
        )}
      </div>
      {
        <Modal showModal={openModal}>
          <div className="w-[300px] flex flex-col items-center gap-5">
            <header className="w-full flex justify-between items-center">
              <div className="flex flex-col">
                <h3 className="text-text_primary font-bold text-h4">Nhập số lượng</h3>
                <p className="text-text_blur text-h6">Thêm số lượng cho liều thuốc</p>
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
            <Button size={'medium'} width={140} modifier={'dark-primary'} onClick={handleAddDoseToReceipt}>
              Xác nhận
            </Button>
          </div>
        </Modal>
      }
    </div>
  );
}

export default AddAvailableDose;
