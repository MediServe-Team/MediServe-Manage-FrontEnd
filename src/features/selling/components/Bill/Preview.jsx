import { useState, useEffect } from 'react';
import { Modal as MuiModal, ModalClose, ModalDialog } from '@mui/joy';
import { Medicine, Prescription } from '../../../selling/components';
import formatToVND from '../../../../helpers/formatToVND';
// services
import { getBillService } from '../../billServices';

function BillPreview({ billId, preview, closePreview }) {
  const [medicines, setMedicines] = useState([]);
  const [products, setProducts] = useState([]);
  const [presciptions, setPrescriptions] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [bill, setBill] = useState({});

  useEffect(() => {
    const getBillDetail = async () => {
      if (billId) {
        const result = await getBillService(billId);
        //* detach data:
        const { note, totalPayment, givenByCustomer } = result.data;
        const { DetailReceiptMedicines } = result.data;
        const { DetailReceiptProducts } = result.data;
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
      }
    };
    getBillDetail();
  }, [billId]);

  return (
    <>
      <MuiModal open={preview} onClose={() => closePreview()}>
        <ModalDialog variant="outlined" style={{ width: '45%', fontSize: '16px', paddingLeft: '2rem' }}>
          <ModalClose />
          {/* Header */}
          <header className="text-text_primary text-[18px] font-semibold">Hóa đơn mua hàng</header>
          {/* Info of pharmacy */}
          <div className="px-2 overflow-y-auto mt-4">
            <div className="font-semibold">Thông tin nhà dược</div>

            <div className="mt-2 px-2 flex flex-col gap-2">
              <div className="flex">
                <span className="font-medium">Tên nhà dược</span>
                <p>: Nhà Thuốc MediServe</p>
              </div>
              <div className="flex">
                <span className="font-medium">Địa chỉ nhà dược</span>
                <p>: Đường Tạ Quang Bửu, Phường Linh Trung, Quận Thủ Đức, TP.HCM</p>
              </div>
              <div className="flex">
                <span className="font-medium">Thông tin liên hệ</span>
                <p>: 0835.443.655</p>
              </div>
            </div>

            <div className="text-h4 font-bold flex justify-center items-center mt-3">HÓA ĐƠN</div>
            {/* Info of customer */}
            <div className="flex my-3">
              <div className="flex flex-col w-[70%]">
                <span>
                  Họ tên khách hàng: <span className="font-semibold">{customerInfo?.fullName}</span>
                </span>
                <span>
                  Địa chỉ: <span className="font-semibold">{customerInfo?.address}</span>
                </span>
              </div>

              <div className="flex flex-col w-[30%]">
                <span>
                  Tuổi: <span className="font-semibold">{customerInfo?.age}</span>
                </span>
                <span>
                  Giới tính: <span className="font-semibold">{customerInfo?.gender === true ? 'Nam' : 'Nữ'}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {/* Info of Product */}
              {products && Array.isArray(products) && products.length > 0 && (
                <Medicine title={'Sản phẩm'} data={products} />
              )}
              {/* Info of Medicine */}
              {medicines && Array.isArray(medicines) && medicines.length > 0 && (
                <Medicine title={'Thuốc'} data={medicines} />
              )}

              {/* Info of Prescription */}
              <div className="text-[18px] font-semibold">Kê đơn</div>
              {presciptions && Array.isArray(presciptions) && presciptions.length > 0 && (
                <Prescription data={presciptions} />
              )}
              {/* Info of Price and Note */}
              <div className="flex w-full">
                <span className="w-full text-left text-h5 font-semibold border-b-2 border-text_blur/30">
                  Thanh toán (VNĐ)
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
                    <span>{formatToVND(bill?.totalPayment ?? 0)}</span>
                    <span>{formatToVND(bill?.givenByCustomer ?? 0)}</span>
                    <span>{formatToVND(Number(bill.givenByCustomer) - Number(bill.totalPayment))}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <span className="w-full text-left text-h5 font-semibold pb-1">Ghi chú hóa đơn</span>
                <div className=" w-full">
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="3"
                    className="w-full rounded-md border-text_blur/50 border-2 p-2"
                    value={bill?.note}
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </ModalDialog>
      </MuiModal>
    </>
  );
}

export default BillPreview;
