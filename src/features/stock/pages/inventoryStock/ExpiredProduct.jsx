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
        if (item.medicine) {
          return (
            checkSubString(item.lotNumber, debounced) ||
            checkSubString(item.medicine.medicineName, debounced) ||
            checkSubString(item.medicine.packingSpecification, debounced) ||
            checkSubString(item.medicine.chemicalCode, debounced) ||
            checkSubString(item.medicine.chemicalName, debounced) ||
            checkSubString(item.medicine.dosageForm, debounced) ||
            checkSubString(item.medicine.registrationNumber, debounced)
          );
        } else if (item.product) {
          return (
            checkSubString(item.lotNumber, debounced) ||
            checkSubString(item.product.productName, debounced) ||
            checkSubString(item.product.packingSpecification, debounced) ||
            checkSubString(item.product.chemicalCode, debounced) ||
            checkSubString(item.product.chemicalName, debounced) ||
            checkSubString(item.product.dosageForm, debounced) ||
            checkSubString(item.product.registrationNumber, debounced)
          );
        }
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
              name={item?.medicine ? item.medicine.medicineName : item.product.productName}
              image={item?.medicine ? item.medicine.medicineImage : item.product.productImage}
              packingSpecification={
                item?.medicine ? item.medicine.packingSpecification : item.product.packingSpecification
              }
              productId={item?.medicineId ? item.medicineId : item.productId}
              soldQuantity={item.soldQuantity}
              inputQuantity={item.inputQuantity}
              specification={item.specification}
              manufactureDate={item.manufactureDate}
              expirationDate={item.expirationDate}
              lotNumber={item.lotNumber}
              importPrice={item.importPrice}
              sellPrice={item.sellPrice}
              invoiceId={item.invoiceIntoStock.id}
            />
          ))}
      </div>
    </div>
  );
}

export default ExpiredProduct;
