import { useState, useEffect } from 'react';
import { SearchOnChange, EmptyImage, Modal, Button } from '../../../../components';
import { AddSellItem } from '../../components';
import { useDebounce } from '../../../../hooks';
import { useOutletContext } from 'react-router-dom';
// icon
import { AiOutlineClose } from 'react-icons/ai';
// service
import { filterProductService } from '../../../product/productServices';

function AddProduct() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const debounced = useDebounce(searchValue);
  const { setProducts } = useOutletContext();
  const [productSelected, setProductSelected] = useState({});
  // modal
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const filterProducts = async () => {
      if (debounced) {
        const result = await filterProductService(debounced);
        setResults(result.data);
      } else {
        setResults([]);
      }
    };
    filterProducts();
  }, [debounced]);

  //* search change:
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //* clear search:
  const handleClearSearch = () => {
    setSearchValue('');
  };

  //* fn add product to dose:
  const handleAddProductItemToDose = () => {
    // close modal
    setOpenModal(false);
    const totalPrice = Number(quantity) * Number(productSelected.sellPrice);
    const newdata = {
      productId: productSelected.product.id,
      productName: productSelected.product.productName,
      packingSpecification: productSelected.product.packingSpecification,
      sellUnit: productSelected.product.sellUnit,
      sellPrice: productSelected.sellPrice,
      quantity: Number(quantity),
      totalPrice,
    };
    setQuantity(1); // reset value
    setProducts((prev) => {
      return [...prev, newdata];
    });
  };

  //* modal: open
  const handleOpenModal = (item) => {
    setProductSelected(item);
    setOpenModal(true);
  };

  //* modal: close
  const handleCloseModal = () => {
    setOpenModal(false);
    setProductSelected({});
    setQuantity(1);
  };

  return (
    <div className="h-full flex flex-col w-full gap-4">
      <div className="pt-5 py-2 flex-shrink-0">
        <SearchOnChange
          placeholder={'Nhập từ khóa tìm kiếm sản phẩm'}
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
      </div>
      {/* List products filter */}
      <div className="flex-1 overflow-y-auto mb-3">
        {results && results.length > 0 ? (
          results.map((item, index) => {
            return (
              <AddSellItem
                key={index}
                name={item.product.productName}
                sellUnit={item.product.sellUnit}
                sellPrice={item.sellPrice}
                onClick={() => handleOpenModal(item)}
              />
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
            <Button size={'medium'} width={140} modifier={'dark-primary'} onClick={handleAddProductItemToDose}>
              Xác nhận
            </Button>
          </div>
        </Modal>
      }
    </div>
  );
}

export default AddProduct;
