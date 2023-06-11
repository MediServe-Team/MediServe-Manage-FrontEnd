import React, { useState, useRef, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';
import { GroupItem, ItemRow } from '../components';
import { SearchToAdd } from '../../../components/SearchToAdd';
import { SearchResultItem } from '../components';
import { default as Button } from '../../../components/Button';
import { MdOutlineInput, MdOutlineOutput } from 'react-icons/md';
import representImg from '../../../assets/images/medicine.png';
import { filterItemService, createInvoiceService } from '../stockServices';
import { useDebounce } from '../../../hooks';
import { useSelector } from 'react-redux';
import { getUserId } from '../../Auth/AuthSlice';
import formatToVND from '../../../helpers/formatToVND';
import { toast } from 'react-toastify';

const TYPES = [
  {
    title: 'Thuốc',
    type: 'medicine',
  },
  {
    title: 'Vật tư Y tế',
    type: 'medical_supplies',
  },
  {
    title: 'Thực phẩm chức năng',
    type: 'functional_foods',
  },
];

function StockInto() {
  const [merchandises, setMerchandises] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleResult, setVisibleResult] = useState(false);
  const [note, setNote] = useState('');
  const userId = useSelector(getUserId);
  const searchRef = useRef();
  // ref to list itemRow
  const itemRowRef = useRef([]);
  // value debounce
  const debounced = useDebounce(searchValue, 500);

  const [selectedIndex, setSelectedIndex] = useState(0);
  // total price
  const [totalImportPrice, setTotalImportPrice] = useState(0);
  const [totalSellPrice, setTotalSellPrice] = useState(0);

  const handleSelectType = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }
    (async () => {
      const result = await filterItemService(debounced, 3);
      setSearchResults(result.data);
    })();
  }, [debounced]);

  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value !== 0) setVisibleResult(true);
    else setVisibleResult(false);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
    setVisibleResult(false);
    searchRef.current.focus();
  };

  const handleAddMerchandise = (item) => {
    setMerchandises([
      ...merchandises,
      {
        name: item.productName ? item.productName : item.medicineName,
        packingSpecification: 'Hộp 4 vĩ, 30 viên',
        id: item.id,
        isMedicine: item.isMedicine,
      },
    ]);
  };

  const handleRemove = (index) => {
    const newMerchandises = [...merchandises];
    newMerchandises.splice(index, 1);
    setMerchandises(newMerchandises);
  };

  const handleIntoStock = async () => {
    let checkValidate = true;
    const listItemData = await itemRowRef.current.reduce(async (acc, curr) => {
      if (curr) {
        const result = await curr.getData();
        // an item not valid
        if (!result) {
          checkValidate = false;
        } else {
          // delete field not using to create item
          delete result.totalImportPrice;
          delete result.totalSellPrice;
        }
        // async fn always return a promise
        acc = await Promise.resolve(acc);
        acc.push(result);
      }
      return acc;
    }, []);
    if (checkValidate) {
      // handle call api to post here
      const data = {
        note,
        staffId: userId,
        totalImportPrice,
        totalSellPrice,
        listItem: listItemData,
      };
      const result = await createInvoiceService(data);
      if (result.status === 200) {
        toast.success('Sản phẩm và thuốc đã được thêm vào kho!');
        //* clear data
        setMerchandises([]);
        setTotalImportPrice(0);
        setTotalSellPrice(0);
        setNote('');
      } else {
        toast.error('Hệ thống gặp sự cố khi nhập kho!');
      }
    }
  };

  const calculateTotalPrice = async () => {
    // calc total import price
    let totalImport = 0;
    let totalSell = 0;
    const listItemPrice = await itemRowRef.current.reduce(async (acc, curr) => {
      if (curr) {
        const result = await curr.getPrice();
        // async fn always return a promise
        acc = await Promise.resolve(acc);
        acc.push(result);
      }
      return acc;
    }, []);
    listItemPrice.map((item) => {
      totalImport += item.totalImportPrice;
      totalSell += item.totalSellPrice;
    });
    setTotalImportPrice(totalImport);
    setTotalSellPrice(totalSell);
  };

  const renderSearchResult = () => {
    return Array.isArray(searchResults) && searchResults.length > 0 ? (
      searchResults.map((item, index) => (
        <SearchResultItem
          key={index}
          name={item.productName ? item.productName : item.medicineName}
          // type={item.type}
          packingSpecification={item.packingSpecification}
          onClick={() => handleAddMerchandise(item)}
        />
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Không có kết quả tìm kiếm phù hợp!</div>
    );
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg px-10 py-3">
        {/* Search product */}
        <div className="flex justify-center bg-inherit pb-3">
          <Tippy
            visible={visibleResult && searchResults.length > 0}
            interactive={true}
            placement="bottom-start"
            onClickOutside={() => setVisibleResult(false)}
            render={(attrs) => (
              <div tabIndex="-1" {...attrs} className={classNames('w-[600px] max-h-[480px] overflow-y-auto shadow-lg')}>
                <div className="bg-white rounded-md shadow-xl">{renderSearchResult()}</div>
              </div>
            )}
          >
            <div className="w-[600px]">
              <SearchToAdd
                ref={searchRef}
                value={searchValue}
                onChange={handleSearchValueChange}
                onClear={handleClearSearch}
                types={TYPES}
                typeSelected={selectedIndex}
                onTypeChange={handleSelectType}
              />
            </div>
          </Tippy>
        </div>

        <div className="flex-1 min-h-0">
          {/* Group */}
          <GroupItem>
            {Array.isArray(merchandises) && merchandises.length > 0 ? (
              merchandises.map((item, index) => (
                <ItemRow
                  {...item}
                  ref={(el) => (itemRowRef.current[index] = el)}
                  onRemove={() => handleRemove(index)}
                  handleChangeField={() => calculateTotalPrice()}
                  key={index}
                />
              ))
            ) : (
              <div className="flex-1 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                  <img src={representImg} alt="medicine app" className="w-[100px] h-[100px]" />
                  <span className="text-h5 font-medium text-text_blur">Chưa có sản phẩm được thêm!</span>
                </div>
              </div>
            )}
          </GroupItem>
        </div>
      </div>

      {/* note box */}
      <div className="flex justify-between items-center h-[80px] bg-white rounded-lg px-10">
        <div className="flex flex-col w-[400px] gap-1 pb-1">
          <h5 className="font-medium">Ghi chú</h5>
          <input
            type="text"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thêm ghi chú"
            className="border rounded-md p-2 text-h6"
          />
        </div>

        {/* Total import price */}
        <div className="flex flex-col gap-1">
          <h5 className="font-medium">Tổng giá nhập</h5>
          <div className="flex justify-between gap-2 items-center min-w-[150px] h-[40px] rounded-lg p-3 bg-red-300 text-red-600">
            <MdOutlineInput className="text-[22px]" />
            <span className="font-bold">{formatToVND(totalImportPrice)}</span>
          </div>
        </div>

        {/* Total sell price */}
        <div className="flex flex-col gap-1">
          <h5 className="font-medium">Tổng giá bán</h5>
          <div className="flex justify-between gap-2 items-center min-w-[150px] h-[40px] rounded-lg p-3 bg-lime-200 text-green-600">
            <span className="font-bold">{formatToVND(totalSellPrice)}</span>
            <MdOutlineOutput className="text-[22px]" />
          </div>
        </div>

        <div className="">
          <Button size={'medium'} bold disabled={!(merchandises.length > 0)} onClick={handleIntoStock}>
            Nhập kho
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StockInto;
