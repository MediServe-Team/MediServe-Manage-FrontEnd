import { useState, useEffect } from 'react';
import { ProductItem } from '../../components';
import { Pagination } from '../../../../components';
import { useSelector } from 'react-redux';
import { getAllMerchandise } from '../../stockSlice';

function AllProduct() {
  const [pageNumber, setPageNumber] = useState(1);
  const listProduct = useSelector(getAllMerchandise);
  console.log(listProduct);
  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg px-5 py-3 min-h-0 ">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-10 pb-[60px] overflow-y-auto px-5">
        {Array.isArray(listProduct) &&
          listProduct.length > 0 &&
          listProduct.map((item, index) => (
            <ProductItem
              key={index}
              name={item?.medicine ? item.medicine.medicineName : item.product.productName}
              image={item?.medicine ? item.medicine.medicineImage : item.product.medicineImage}
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
      {/* Pagination */}
      <div className="flex justify-center items-center relative">
        <div className="absolute -top-[50px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
          <Pagination pageLength={7} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
