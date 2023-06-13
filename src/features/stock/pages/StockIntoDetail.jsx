import { useState, useEffect } from 'react';
import { Button } from '../../../components';
import { GroupItem, ItemRowReadOnly } from '../components';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { getDetailInvoiceServices } from '../stockServices';

function StockIntoDetail() {
  const [invoice, setInvoice] = useState({});
  const [listMedicine, setListMedicine] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchDetailInvoice = async () => {
      try {
        const result = await getDetailInvoiceServices(id);
        return result.data;
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetailInvoice()
      .then((data) => {
        const { MedicineIntoStocks, ProductIntoStocks, ...invoiceData } = data;
        setInvoice(invoiceData);
        setListMedicine(MedicineIntoStocks);
        setListProduct(ProductIntoStocks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleExportFile = () => {
    const workBook = XLSX.utils.book_new();
    if (listMedicine && listMedicine.length > 0) {
      const medicineSheet = XLSX.utils.json_to_sheet(listMedicine);
      XLSX.utils.book_append_sheet(workBook, medicineSheet, 'Thuốc nhập');
    }
    if (listProduct && listProduct.length > 0) {
      const productSheet = XLSX.utils.json_to_sheet(listProduct);
      XLSX.utils.book_append_sheet(workBook, productSheet, 'Sản phẩm nhập');
    }
    XLSX.writeFile(workBook, `invoice-stock-${id}.xlsx`);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg px-10 py-4">
      {/* Header page*/}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-text_primary text-h5 font-bold">
            Chi tiết đơn nhập: <span className="text-black">{id}</span>
          </h2>
          <p className="text-h6 font-medium text-text_blur">{invoice.note}</p>
        </div>
        <Button size="normal" type="outline" modifier="primary" className="px-6" onClick={handleExportFile}>
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
                <ItemRowReadOnly
                  key={index}
                  name={item.medicine.medicineName}
                  packingSpecification={item.medicine.packingSpecification}
                  inputQuantity={item.inputQuantity}
                  specification={item.specification}
                  importPrice={item.importPrice}
                  sellPrice={item.sellPrice}
                  manufactureDate={item.manufactureDate}
                  expirationDate={item.expirationDate}
                  lotNumber={item.lotNumber}
                />
              ))}
            </>
          )}
          {/* render list product */}
          {Array.isArray(listProduct) && listProduct.length > 0 && (
            <>
              <h3 className="text-text_primary text-h5 font-bold">Sản phẩm khác</h3>
              {listProduct.map((item, index) => (
                <ItemRowReadOnly
                  key={index}
                  name={item.product.productName}
                  packingSpecification={item.product.packingSpecification}
                  inputQuantity={item.inputQuantity}
                  specification={item.specification}
                  importPrice={item.importPrice}
                  sellPrice={item.sellPrice}
                  manufactureDate={item.manufactureDate}
                  expirationDate={item.expirationDate}
                  lotNumber={item.lotNumber}
                />
              ))}
            </>
          )}
        </GroupItem>
      </div>
    </div>
  );
}

export default StockIntoDetail;
