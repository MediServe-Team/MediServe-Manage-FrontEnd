import { useState, useEffect } from 'react';
import { Button } from '../../../components';
import { GroupItem, ItemRowReadOnly } from '../components';
import { useParams } from 'react-router-dom';

function StockIntoDetail() {
  const [listMedicine, setListMedicine] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  const productId = useParams();

  useEffect(() => {
    // filter mechandise and classify medicine, product
    setListMedicine(mockData);
    setListProduct(mockData);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white rounded-lg px-10 py-4">
      {/* Header page*/}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-text_primary text-h5 font-bold">
            Chi tiết đơn nhập: <span className="text-black">{productId.id}</span>
          </h2>
          <p className="text-h6 font-medium text-text_blur">Ghi chú: Danh sách thuốc cần bán hết trong vòng 30 ngày</p>
        </div>
        <Button size="normal" type="outline" modifier="primary" className="px-6">
          Xuất file
        </Button>
      </div>

      {/* Invoice */}
      <div className="flex-1 pt-3 min-h-0">
        <GroupItem>
          {/* render list medicine */}
          {Array.isArray(listMedicine) && listMedicine.length > 0 && (
            <>
              <h3 className="text-text_primary text-h5 font-bold">Thuốc</h3>
              {listMedicine.map((item, index) => (
                <ItemRowReadOnly key={index} name={item.name} packingSpecification={item.specifications} />
              ))}
            </>
          )}
          {/* render list product */}
          {Array.isArray(listProduct) && listProduct.length > 0 && (
            <>
              <h3 className="text-text_primary text-h5 font-bold">Sản phẩm khác</h3>
              {listProduct.map((item, index) => (
                <ItemRowReadOnly key={index} name={item.name} packingSpecification={item.specifications} />
              ))}
            </>
          )}
        </GroupItem>
      </div>
    </div>
  );
}

export default StockIntoDetail;

const mockData = [
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 2,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 3,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
];
