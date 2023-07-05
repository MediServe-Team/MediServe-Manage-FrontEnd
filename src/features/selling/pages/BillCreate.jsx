import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import { getUserId } from '../../Auth/AuthSlice';
import { useSelector } from 'react-redux';
// component
import { SubNavigate, ItemListMP, TitleListMP, TitleListPre, ItemListPre } from '../components';
import { Button } from '../../../components';
import { CustomerInfor, DoseInBill } from '../components/Bill';

function BillCreate() {
  const [navList, setNavList] = useState([]);
  const customerRef = useRef();
  const [products, setProducts] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [doses, setDoses] = useState([]);
  const staffId = useSelector(getUserId);

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

  //*TODO: new prescriptions
  const handleDeleteNewPres = (index) => {
    const newPres = [...doses];
    setDoses([...newPres.slice(0, index), ...newPres.slice(index + 1)]);
  };

  //todo: Checkout
  const handleCheckout = async () => {
    // get customer
    const customerData = await customerRef.current.getCustomer();
    const customer = customerData?.id ? { customerId: customerData.id } : { guest: customerData };
    // get products data
    const productsData = products.map((pd) => {
      const { productId, quantity, totalPrice } = pd;
      return { productId, quantity, totalPrice };
    });
    // get medicines data
    const medicineData = medicines.map((mc) => {
      const { medicineId, quantity, totalPrice } = mc;
      return { medicineId, quantity, totalPrice };
    });
    const data = {
      staffId,
      totalPayment: 0,
      givenByCustomer: 0,
      ...customer,
      products: productsData,
      medicines: medicineData,
      newPrescriptions: doses,
    };

    console.log(doses);
  };

  return (
    <div className="h-full flex gap-3">
      {/*//* Subpage left */}
      <div className="flex flex-col justify-between px-5 bg-white rounded-xl w-[40%]">
        {/* navigate on page */}
        <div className="flex justify-start pt-3 flex-shrink-0">
          <SubNavigate navs={navList} />
        </div>
        {/* outlet page */}
        <div className="flex-1 w-full min-h-0">
          <Outlet context={{ setProducts, setMedicines, setDoses }} />
        </div>
      </div>

      {/*//* Sub page right */}
      <div className="flex flex-col h-full w-[60%] bg-white rounded-xl">
        {/* header */}
        <header className="border-b-2 border-text_blur/50 pl-6 pt-4 pb-1 w-full">
          <h3 className="text-h4 text-text_primary font-bold">Tạo hóa đơn</h3>
        </header>
        {/* body */}
        <div className="flex-1 flex flex-col w-full min-h-0 px-6 pt-5">
          <div className="flex-1 flex flex-col gap-5 overflow-y-auto min-h-0">
            {/* Customer info */}
            <CustomerInfor ref={customerRef} />

            {/* Products info */}
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
                          <BsX size={25} className="text-text_blur" />
                        </button>
                      </ItemListMP>
                    ))}
                  </TitleListMP>
                </div>
              </div>
            )}

            {/* Medicines info */}
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
                          <BsX size={25} className="text-text_blur" />
                        </button>
                      </ItemListMP>
                    ))}
                  </TitleListMP>
                </div>
              </div>
            )}

            {/* Prescription Info */}
            {true && (
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Thông tin kê đơn</span>
                <div>
                  {/*//* New */}
                  <div className="flex flex-col gap-2">
                    {doses.length > 0 &&
                      doses.map((item, index) => {
                        return (
                          <DoseInBill
                            key={index}
                            diagnose={item.diagnose}
                            listMedicines={item.listMedicines}
                            note={item.note}
                            quantity={item.quantity}
                            totalPrice={item.totalPrice}
                            onRemove={() => handleDeleteNewPres(index)}
                          />
                        );
                      })}
                  </div>

                  {/*//* Availble */}
                </div>
              </div>
            )}

            {/* Checkout Info */}
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

export default BillCreate;
