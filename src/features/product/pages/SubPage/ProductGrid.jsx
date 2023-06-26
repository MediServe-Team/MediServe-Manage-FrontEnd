import { useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ProductItem } from '../../components';
import { Pagination } from '../../../../components';
import { getProductsService } from '../../productServices';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../components';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const overlay = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
};

const modal = {
  hidden: {
    x: 600,
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
    },
  },
  exit: {
    x: 600,
    transition: {
      duration: 0.7,
    },
  },
};

function ProductGrid({ searchValue }) {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const result = await getProductsService(categoryId, searchValue, pageNumber, 8);
      setPageLength(result.data.totalPage);
      setProducts(result.data.products);
      setIsOpen(false);
    };
    getProducts();
  }, [categoryId, searchValue, pageNumber]);

  const handleSelectProductItem = (index) => {
    setSelected(index);
    setIsOpen(true);
  };

  const handleClickOutSide = (event) => {
    if (event.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg px-5 py-3 min-h-0 relative overflow-hidden">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-10 pb-[60px] px-5 overflow-y-auto">
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductItem
              id={product.id}
              productImage={product.productImage}
              productName={product.productName}
              registrationNumber={product.registrationNumber}
              packingSpecification={product.packingSpecification}
              barCode={product.barCode}
              key={index}
              onclick={() => handleSelectProductItem(index)}
            />
          ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center relative">
        {pageLength > 0 && (
          <div className="absolute -top-[50px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
            <Pagination pageLength={pageLength} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </div>
        )}
      </div>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            variants={overlay}
            initial={'hidden'}
            animate={'visible'}
            exit={'exit'}
            className="absolute w-full h-full top-0 left-0 bg-black/20 "
            onClick={handleClickOutSide}
            ref={overlayRef}
          >
            {/* modal section */}
            <motion.div key="modal" variants={modal} className="bg-white h-full w-2/3 absolute right-0 rounded-lg py-5">
              <div className="absolute top-2 right-3 z-50">
                <Button onClick={() => setIsOpen(!isOpen)} type="solid" size="normal">
                  <MdKeyboardDoubleArrowRight className="text-[20px]" />
                </Button>
              </div>
              <div className="overflow-y-auto w-full h-full min-h-0 px-5">
                <div className="h-2/5 relative flex justify-center">
                  <img
                    src={products[selected].productImage}
                    alt={products[selected].productName}
                    className="h-full object-contain"
                  />
                </div>

                <div className="px-5 py-3 flex flex-col gap-5 flex-1 min-h-0">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="text-h4 text-black font-bold">{products[selected].productName}</h3>
                      <p className="text-h5 text-text_blur">{products[selected].packingSpecification}</p>
                      <p className="text-text_primary">
                        Mã sản phẩm: <span className="font-medium text-black">{products[selected].id}</span>
                      </p>
                    </div>
                    {/* mã vạch */}
                    <img src={products[selected].barCode} alt={products[selected].productName} className="h-[80px]" />
                  </div>
                  {/* grid */}
                  <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="grid grid-cols-3 grid-rows-3 gap-1">
                      <p className="text-text_primary">
                        Số đăng ký:{' '}
                        <span className="font-medium text-black">{products[selected].registrationNumber}</span>
                      </p>
                      <p className="text-text_primary">
                        Mã hoạt chất: <span className="font-medium text-black">{products[selected].chemicalCode}</span>
                      </p>
                      <p className="text-text_primary">
                        Mã đường dùng:{' '}
                        <span className="font-medium text-black">{products[selected].applyToAffectedAreaCode}</span>
                      </p>
                      <p className="text-text_primary">
                        Dạng bào chế: <span className="font-medium text-black">{products[selected].dosageForm}</span>
                      </p>
                      <p className="text-text_primary">
                        Tên hoạt chất: <span className="font-medium text-black">{products[selected].chemicalName}</span>
                      </p>
                      <p className="text-text_primary">
                        Tên đường dùng:{' '}
                        <span className="font-medium text-black">{products[selected].applyToAffectedArea}</span>
                      </p>
                      <p className="text-text_primary">
                        Hàm lượng: <span className="font-medium text-black">{products[selected].productContent}</span>
                      </p>
                    </div>

                    <div className="min-h-0 flex gap-5 pt-5">
                      <div className="flex-[5]">
                        <h3 className="text-blue_dark font-bold text-h5">Chức năng</h3>
                        <p>{products[selected].productFunction}</p>
                      </div>
                      <div className="flex-[3]">
                        <h3 className="text-blue_dark font-bold text-h5">Ghi chú sản phẩm</h3>
                        <p>{products[selected].note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(ProductGrid);
