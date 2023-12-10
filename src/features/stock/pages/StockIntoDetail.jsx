import { useState, useEffect } from 'react';
import { Button } from '../../../components';
import { GroupItem, ItemRowReadOnly } from '../components';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { getDetailInvoiceServices } from '../stockServices';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function StockIntoDetail() {
  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Lịch sử nhập kho',
        slug: '/stock/history',
      }),
    );
    dispatch(
      addNewBreadcrumb({
        name: 'Chi tiết nhập kho',
        slug: `/stock/invoice/${id}`,
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
      dispatch(removeLastBreadcrumb());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        const { ItemInStocks, ...invoiceData } = data;
        setInvoice(invoiceData);

        setListMedicine(() => ItemInStocks?.filter((item) => item.item.itemType === 'MEDICINE'));
        setListProduct(() => ItemInStocks?.filter((item) => item.item.itemType === 'PRODUCT'));
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
    <div className="h-full flex flex-col bg-white rounded-[4px] px-10 py-4">
      {/* Header page*/}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-text_primary text-h5 font-bold">
            Chi tiết đơn nhập: <span className="text-black">{id}</span>
          </h2>
          <p className="text-h6 font-medium text-text_blur">
            {' '}
            <span className="text-text_primary">Ghi chú:</span> {invoice.note}
          </p>
        </div>
        <Button size="normal" styleBtn="outline" modifier="primary" className="px-6" onClick={handleExportFile}>
          Xuất file
        </Button>
      </div>
      {/* Invoice */}
      <div className="flex-1 pt-3 min-h-0">
        {}
        <GroupItem>
          {/* render list medicine */}
          {Array.isArray(listMedicine) && listMedicine.length > 0 && (
            <>
              <h3 className="text-text_primary text-h5 font-bold">Thuốc</h3>
              {listMedicine.map((item, index) => (
                <ItemRowReadOnly
                  key={index}
                  name={item.item.itemName}
                  packingSpecification={item.item.packingSpecification}
                  importQuantity={item.importQuantity}
                  specification={item.specification}
                  importPrice={item.importPrice}
                  sellPrice={item.sellPrice}
                  manufactureDate={item.manufactureDate}
                  expirationDate={item.expirationDate}
                  lotNumber={item.lotNumber}
                  destroyed={item.destroyed}
                  soldQuantity={item.soldQuantity}
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
                  name={item.item.itemName}
                  packingSpecification={item.item.packingSpecification}
                  importQuantity={item.importQuantity}
                  specification={item.specification}
                  importPrice={item.importPrice}
                  sellPrice={item.sellPrice}
                  manufactureDate={item.manufactureDate}
                  expirationDate={item.expirationDate}
                  lotNumber={item.lotNumber}
                  destroyed={item.destroyed}
                  soldQuantity={item.soldQuantity}
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
