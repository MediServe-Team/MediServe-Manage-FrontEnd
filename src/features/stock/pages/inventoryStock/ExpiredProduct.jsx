import { useState, useEffect } from 'react';
import { useDebounce } from '../../../.././hooks';
import { ProductItem } from '../../components';
import { useSelector } from 'react-redux';
import { getExpMerchandise } from '../../stockSlice';
import { useOutletContext } from 'react-router';
import checkSubString from '../../../../helpers/checkSubString';

function ExpiredProduct() {
  const searchValue = useOutletContext();
  const debounced = useDebounce(searchValue, 500);
  const [listProduct, setListProduct] = useState([]);
  const expMerchandise = useSelector(getExpMerchandise);

  useEffect(() => {
    if (!searchValue) {
      setListProduct(expMerchandise);
    } else {
      const filterMerchandise = expMerchandise.filter((item) => {
        if (item.item.itemType === 'MEDICINE') {
          return (
            checkSubString(item.lotNumber, debounced) ||
            checkSubString(item.item.itemName, debounced) ||
            checkSubString(item.item.packingSpecification, debounced) ||
            checkSubString(item.item.registrationNumber, debounced)
          );
        } else if (item.item.itemType === 'PRODUCT') {
          return (
            checkSubString(item.lotNumber, debounced) ||
            checkSubString(item.item.itemName, debounced) ||
            checkSubString(item.item.packingSpecification, debounced) ||
            checkSubString(item.item.registrationNumber, debounced)
          );
        }
        return false;
      });
      setListProduct(filterMerchandise);
    }
  }, [debounced, expMerchandise]);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg px-5 py-3 min-h-0 ">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-10 pb-[60px] overflow-y-auto px-5">
        {Array.isArray(listProduct) &&
          listProduct.length > 0 &&
          listProduct.map((item, index) => (
            <ProductItem
              key={index}
              name={item?.item.itemName}
              image={item?.item.itemImage}
              packingSpecification={item?.item.packingSpecification}
              productId={item?.item.id}
              soldQuantity={item.soldQuantity}
              importQuantity={item.importQuantity}
              specification={item.specification}
              manufactureDate={item.manufactureDate}
              expirationDate={item.expirationDate}
              lotNumber={item.lotNumber}
              importPrice={item.importPrice}
              sellPrice={item.sellPrice}
              invoiceId={item.invoiceIntoStockId}
            />
          ))}
      </div>
    </div>
  );
}

export default ExpiredProduct;
