import { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { ItemListMP, TitleListMP, TitleListPre, ItemListPre } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
// service
import { getBillService } from '../billServices';
import formatToVND from '../../../helpers/formatToVND';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function BillDetail() {
  const [medicines, setMedicines] = useState([]);
  const [products, setProducts] = useState([]);
  const [presciptions, setPrescriptions] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [bill, setBill] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBillDetail = async () => {
      const result = await getBillService(id);
      //* detach data:
      const { note, totalPayment, givenByCustomer, DetailReceiptItems } = result.data;
      const DetailReceiptMedicines = [];
      const DetailReceiptProducts = [];
      DetailReceiptItems.map((data) => {
        if (data.itemInStock.item.itemType === 'MEDICINE') DetailReceiptMedicines.push(data);
        else DetailReceiptProducts.push(data);
      });

      const { DetailReceiptPrescriptions } = result.data;
      const { customer, guest } = result.data;
      const billData = { note, totalPayment, givenByCustomer };
      const medicinesData = [...DetailReceiptMedicines];
      const productsData = [...DetailReceiptProducts];
      const prescriptionsData = [...DetailReceiptPrescriptions];

      setBill(billData);
      setProducts(productsData);
      setMedicines(medicinesData);
      setPrescriptions(prescriptionsData);
      if (guest && Object.keys(guest).length !== 0) setCustomerInfo({ ...guest });
      else setCustomerInfo({ ...customer });
    };
    getBillDetail();
  }, [id]);

  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Danh sách hóa đơn',
        slug: '/bills',
      }),
    );
    dispatch(
      addNewBreadcrumb({
        name: 'Chi tiết hóa đơn',
        slug: `/bills/${id}`,
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="h-full w-full bg-white rounded-xl flex flex-col ">
      <header className="border-b-2 border-text_blur/50 h-[10%] flex gap-3 pl-10 pt-5 pb-1 w-full">
        <button className="text-text_primary text-h3" onClick={() => navigate(-1)}>
          <BsArrowLeftCircleFill />
        </button>
        <h3 className="text-h4 text-text_primary font-bold">Xem chi tiết hóa đơn</h3>
      </header>

      <div className="h-[90%] w-full overflow-y-auto">
        <div className="flex w-full pt-5 pb-3 px-9 items-center">
          <span className="text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
            Thông tin khách hàng
          </span>
        </div>

        <div className="flex px-9 ">
          <div className="flex w-full h-full px-9 py-5 rounded-md border-2 border-text_blur">
            <div className="w-2/3 flex flex-col justify-start items-center gap-3">
              <span className="font-medium w-full h-1/2 flex items-center">
                Họ tên khách hàng<span className="font-normal">: {customerInfo?.fullName}</span>
              </span>
              <span className="font-medium w-full h-1/2 flex items-center">
                Địa chỉ<span className="font-normal">: {customerInfo?.address}</span>
              </span>
            </div>
            <div className="w-1/3 flex flex-col justify-start items-center gap-3">
              <span className="font-medium w-full h-1/2 flex items-center">
                Tuổi<span className="font-normal">: {customerInfo?.age}</span>
              </span>
              <span className="font-medium w-full h-1/2 flex items-center">
                Giới tính<span className="font-normal">: {customerInfo?.gender === true ? 'Nam' : 'Nữ'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Product info  */}
        {products && products.length > 0 && (
          <div>
            <div className="flex pt-5 pb-3 w-full px-9 items-center mt-5">
              <span className="text-left text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
                Thông tin sản phẩm
              </span>
            </div>
            <div className="px-9">
              <TitleListMP title={'Tên sản phẩm'}>
                {/* Data */}
                {products.map((product, index) => (
                  <ItemListMP
                    key={index}
                    number={index + 1}
                    name={product?.itemInStock?.item?.itemName}
                    unit={product?.itemInStock?.item?.sellUnit}
                    quantity={product?.quantity}
                    totalPrice={product?.totalPrice}
                    sellPrice={Number(product.itemInStock.sellPrice)}
                  />
                ))}
              </TitleListMP>
            </div>
          </div>
        )}

        {/* Medicine info  */}
        {medicines && medicines.length > 0 && (
          <div>
            <div className="flex pt-5 pb-3 w-full px-9 items-center mt-5">
              <span className="text-left text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
                Thông tin thuốc
              </span>
            </div>
            <div className="px-9">
              <TitleListMP title={'Tên thuốc'}>
                {/* Data */}
                {medicines.map((medicine, index) => (
                  <ItemListMP
                    key={index}
                    number={index + 1}
                    name={medicine?.itemInStock?.item?.itemName}
                    unit={medicine?.itemInStock?.item?.sellUnit}
                    quantity={medicine?.quantity}
                    totalPrice={medicine?.totalPrice}
                    sellPrice={Number(medicine.itemInStock.sellPrice)}
                  />
                ))}
              </TitleListMP>
            </div>
          </div>
        )}

        {/* Prescription info */}
        {presciptions && presciptions.length > 0 && (
          <div>
            <div className="flex pt-5 pb-3 w-full px-9 items-center mt-5">
              <span className="text-left text-[18px] font-semibold" style={{ textDecorationLine: 'underline' }}>
                Thông tin kê đơn
              </span>
            </div>
            {presciptions.map((presciption) => (
              <div className="px-9 text-h5">
                <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
                  <div className="flex items-center">
                    <span className="w-1/2 italic font-medium flex justify-start">
                      Chuẩn đoán: {presciption.prescription.diagnose}
                    </span>
                  </div>
                  <div className="pt-3">
                    <TitleListPre>
                      {/* Data */}
                      {presciption.prescription.MedicineGuideSells.map((guide, index) => (
                        <ItemListPre
                          key={index}
                          medicineName={guide?.medicine?.item?.itemName}
                          morning={guide.morning}
                          noon={guide.noon}
                          night={guide.night}
                          quantity={guide.quantity}
                          sellPrice={guide.medicine.sellPrice}
                          sellUnit={guide?.medicine?.item?.sellUnit}
                        />
                      ))}
                    </TitleListPre>
                  </div>

                  <div className="pt-3 pb-1 flex flex-col">
                    {presciption.note && <i>ghi chú: {presciption.note}</i>}
                    <div className="flex justify-between">
                      <span>{/* số lượng: x <b>{presciption.quantity}</b> */}</span>
                      <span className=" font-medium">
                        Tổng giá:{' '}
                        <span className="text-secondary font-normal">{formatToVND(presciption.totalPrice)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Checkout info  */}
        <div className="flex pt-5 pb-3 w-full px-9 items-center mt-5">
          <span className="w-full text-left text-h5 font-semibold border-b-2 border-text_blur/30">
            Thông tin thanh toán (VNĐ)
          </span>
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
              <span className="text-secondary">{formatToVND(bill?.totalPayment ?? 0)}</span>
              <input
                type="text"
                value={formatToVND(bill?.givenByCustomer ?? 0)}
                className="pl-2 w-[60%] py-1 border-2 border-text_blur/50 rounded-lg"
                disabled
              />
              <span className="text-tertiary">
                {formatToVND(Number(bill.givenByCustomer) - Number(bill.totalPayment))}
              </span>
            </div>
          </div>
        </div>

        {/* Note bill */}
        <div className="flex flex-col w-full px-9 items-center my-5">
          <span className="w-full text-left text-h5 font-semibold pb-1">Ghi chú hóa đơn</span>
          <div className=" w-full">
            <textarea
              disabled
              value={bill?.note}
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
  );
}

export default BillDetail;
