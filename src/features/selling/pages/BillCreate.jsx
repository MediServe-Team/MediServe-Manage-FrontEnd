import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { SubNavigate, ItemListMP, TitleListMP, TitleListPre, ItemListPre } from '../components';
import { Button } from '../../../components';
// component
import { CustomerInfor } from '../components/Bill';
import { BsX } from 'react-icons/bs';
// import { Modal, ModalClose, ModalDialog } from '@mui/joy';

export default function BillCreate() {
  const [navList, setNavList] = useState([]);
  const customerRef = useRef();
  // product & medicine in bill
  const [products, setProducts] = useState([]);
  const [medicines, setMedicines] = useState([]);
  // dose in bill
  const [doses, setDoses] = useState([]);

  // Tab Navigate
  useEffect(() => {
    const navs = [
      {
        name: 'Sản phẩm',
        path: '/bills/create/product',
      },
      {
        name: 'Thuốc',
        path: '/bills/create/medicine',
      },
      {
        name: 'Kê đơn',
        path: '/bills/create/new-dose',
      },
      {
        name: 'Liều có sẵn',
        path: '/bills/create/available-dose',
      },
    ];
    setNavList(navs);
  }, []);

  //*TODO: products
  const handleDeleteProduct = (index) => {
    const newProduct = [...products];
    setProducts([...newProduct.slice(0, index), ...newProduct.slice(index + 1)]);
  };

  //*TODO: medicines
  const handleDeleteMedicine = (index) => {
    const newMedicine = [...medicines];
    setMedicines([...newMedicine.slice(0, index), ...newMedicine.slice(index + 1)]);
  };

  //todo: Checkout
  const handleCheckout = async () => {
    const customerData = await customerRef.current.getCustomer();
    console.log(customerData);
  };

  useEffect(() => {
    console.log(doses);
  }, [doses]);

  const NewDoseItem = (dose) => {
    return (
      <div className="px-2 text-h5">
        <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
          <div className="flex items-center">
            <span className="w-1/2 italic font-medium flex justify-start">Chuẩn đoán: {dose.dose.diagnose}</span>
            <div className="w-1/2 flex justify-end">
              <button>
                <BsX size={25} style={{ color: '#A8A8A8' }} />
              </button>
            </div>
          </div>
          <div className="pt-3">
            <TitleListPre>
              {console.log(dose.dose?.listMedicines)}
              {/* Data */}
              {dose.dose?.listMedicines &&
                dose.dose.listMedicines.map((item, index) => (
                  <ItemListPre
                    key={index}
                    medicineName={dose.dose.medicineName}
                    sellUnit={dose.dose.sellUnit}
                    morning={dose.dose.morning}
                    noon={dose.dose.noon}
                    night={dose.dose.night}
                    quantity={dose.dose.quantity}
                    sellPrice={dose.dose.sellPrice}
                  />
                ))}
            </TitleListPre>
          </div>
          <div className="pt-3 pb-1 flex justify-between">
            <span>*{dose.dose.note}</span>
            <span className=" font-medium">
              Tổng giá đơn thuốc: <span className="text-secondary font-normal">250,000</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(doses);
  }, [doses]);

  return (
    <div className="h-full flex gap-3">
      <div className="flex flex-col justify-between px-5 bg-white rounded-xl w-[40%]">
        {/* navigate on page */}
        <div className="flex justify-start pt-3 flex-shrink-0">
          <SubNavigate navs={navList} />
        </div>
        {/* Navigated page */}
        <div className="flex-1 w-full min-h-0">
          <Outlet context={{ setProducts, setMedicines, setDoses }} />
        </div>
      </div>

      {/* Sub page right */}
      <div className="flex flex-col h-full w-[60%] bg-white rounded-xl">
        <header className="border-b-2 border-text_blur/50 pl-6 pt-4 pb-1 w-full">
          <h3 className="text-h4 text-text_primary font-bold">Tạo hóa đơn</h3>
        </header>
        {/* body */}
        <div className="flex-1 flex flex-col w-full min-h-0 px-6 pt-5">
          <div className="flex-1 flex flex-col gap-5 overflow-y-auto min-h-0">
            {/* Customer info */}
            <CustomerInfor ref={customerRef} />

            {/* Info product in dose */}
            {products && products.length > 0 && (
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">Thông tin sản phẩm</span>
                </div>
                <div className="px-2">
                  <TitleListMP title="Tên sản phẩm">
                    {/* Data */}
                    {products.map((product, index) => (
                      <ItemListMP
                        key={index}
                        number={index + 1}
                        id={product.productId}
                        name={product.productName}
                        quantity={product.quantity}
                        sellPrice={product.sellPrice}
                        unit={product.sellUnit}
                        totalPrice={product.totalPrice}
                      >
                        <button onClick={() => handleDeleteProduct(index)}>
                          <BsX size={25} style={{ color: '#A8A8A8' }} />
                        </button>
                      </ItemListMP>
                    ))}
                  </TitleListMP>
                </div>
              </div>
            )}

            {/* Info  medicine in dose */}
            {medicines && medicines.length > 0 && (
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">Thông tin thuốc</span>
                </div>
                <div className="px-2">
                  <TitleListMP title="Tên sản phẩm">
                    {/* Data */}
                    {medicines.map((medicine, index) => (
                      <ItemListMP
                        key={index}
                        number={index + 1}
                        id={medicine.medicineId}
                        name={medicine.medicineName}
                        quantity={medicine.quantity}
                        sellPrice={medicine.sellPrice}
                        unit={medicine.sellUnit}
                        totalPrice={medicine.totalPrice}
                      >
                        <button onClick={() => handleDeleteMedicine(index)}>
                          <BsX size={25} style={{ color: '#A8A8A8' }} />
                        </button>
                      </ItemListMP>
                    ))}
                  </TitleListMP>
                </div>
              </div>
            )}

            {/* Info Prescription */}
            {true && (
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Thông tin kê đơn</span>
                <div>
                  {/* new Dose */}
                  <div className="flex flex-col gap-2">
                    {doses.length > 0 && doses.map((item, index) => <NewDoseItem key={index} dose={item} />)}
                  </div>

                  {/* Dose Availble */}
                  <div className="px-2 text-h5 mt-8">
                    <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
                      <div className="flex items-center">
                        <span className="w-1/2 italic font-medium flex justify-start">Liều thuốc: Đau mỏi vai gáy</span>
                        <div className="w-1/2 flex justify-end">
                          <button>
                            <BsX size={25} style={{ color: '#A8A8A8' }} />
                          </button>
                        </div>
                      </div>
                      <div className="pt-3">
                        <TitleListPre>
                          {/* Data */}
                          {[1, 1].map((item, index) => (
                            <ItemListPre key={index} />
                          ))}
                        </TitleListPre>
                      </div>
                      <span className="pt-3 pb-1 text-right font-medium">
                        Tổng giá đơn thuốc: <span className="text-secondary font-normal">250,000</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Infor checkout */}
            <div className="">
              <div className="flex items-center mt-5">
                <span className="w-full font-semibold border-b-2 border-text_blur/30">Thanh toán (VNĐ)</span>
              </div>
              <div className="flex w-full">
                <div className="w-1/2"></div>
                <div className="flex w-1/2">
                  <div className="w-1/2 flex flex-col gap-3 font-medium">
                    <span>Tổng tiền phải trả:</span>
                    <span>Tiền khách đưa:</span>
                    <span>Tiền thừa:</span>
                  </div>
                  <div className="w-1/2 flex gap-3 flex-col">
                    <span className="text-secondary">750,000 đ</span>
                    <input
                      type="text"
                      value="750,000 đ"
                      className="pl-2 w-[60%] py-1 border-2 border-text_blur/50 rounded-lg"
                      disabled
                    />
                    <span className="text-tertiary">0 đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Bill */}
            <div className="flex flex-col w-full items-center mt-5">
              <span className="w-full font-semibold pb-1">Ghi chú hóa đơn</span>
              <div className=" w-full">
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="3"
                  className="w-full rounded-md border-text_blur/50 border-2 p-2"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Area control button */}
        <div className="w-full flex py-3 px-6 flex-shrink-0">
          {/* Cancel Btn */}
          <div className="w-1/2">
            <Button size="medium" modifier={'danger'} width={120}>
              Loại bỏ
            </Button>
          </div>
          {/* Preview Btn */}
          <div className="w-1/2 flex gap-5 justify-end">
            <Button size="medium" modifier={'dark-primary'} width={120}>
              Xem trước
            </Button>
            <Button size="medium" modifier={'dark-primary'} onClick={handleCheckout}>
              Thanh toán và in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
