import formatToVND from '../../../helpers/formatToVND';

export default function Prescription({ data }) {
  function Title({ children, diagnose }) {
    return (
      <div className="flex flex-col h-full min-h-0">
        {/* heading */}
        <span className="font-medium italic">
          Chuẩn đoán: <span>{diagnose}</span>
        </span>
        <ul className="flex justify-between items-center gap-2 text-h5 font-medium border-b-2 border-text_blur/30 py-[5px] ml-5">
          <li className="flex-[12]">
            <span>Thuốc</span>
          </li>
          <li className="flex-[5] text-center">
            <span>SL</span>
          </li>
          <li className="flex-[5] text-center">
            <span>Giá</span>
          </li>
          <li className="flex-[7] text-center">
            <span>Thành tiền</span>
          </li>
        </ul>
        {/* body */}
        <ul className="flex h-full flex-col gap-3 mt-2">{children}</ul>
      </div>
    );
  }

  function Item({ medicineName, morning, noon, night, quantity, sellPrice, sellUnit }) {
    return (
      <ul className="flex h-[60px] justify-between items-center gap-2 text-h5 border-b-2 border-text_blur/30 ml-5">
        <li className="flex flex-[12] flex-col w-full truncate">
          <span className="font-medium">
            {medicineName} ({sellUnit})
          </span>
          <span className="text-text_blur">
            Sáng: {morning}v, Trưa: {noon}v, Tối: {night}v
          </span>
        </li>

        <li className="flex-[5] text-center">
          <span>{quantity}</span>
        </li>

        <li className="flex-[5] text-center">
          <span>{sellPrice}</span>
        </li>

        <li className="flex-[7] text-center">
          <span>{formatToVND(Number(quantity) * Number(sellPrice))}</span>
        </li>
      </ul>
    );
  }

  return (
    <>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((detailPrescription, index) => (
          <div key={index}>
            <Title diagnose={detailPrescription?.prescription?.diagnose}>
              {/* Data */}
              {detailPrescription?.prescription?.MedicineGuides &&
                detailPrescription?.prescription?.MedicineGuides.map((item, index) => (
                  <Item
                    key={index}
                    medicineName={item?.medicine?.medicineName}
                    morning={item?.morning}
                    noon={item?.noon}
                    night={item?.night}
                    quantity={item?.quantity}
                    sellPrice={item.totalPrice ? Number(item.totalPrice) / Number(item.quantity) : 0}
                    sellUnit={item?.medicine?.sellUnit}
                  />
                ))}
              <div className="flex gap-2">
                <span className="ml-5 italic underline">Số lượng:</span>
                <span className="italic"> x {detailPrescription?.quantity}</span>
              </div>
              <div className="flex gap-2">
                <span className="ml-5 italic underline">Ghi chú:</span>
                <span className="italic"> {detailPrescription?.prescription?.note}</span>
              </div>
              <div className="text-end font-medium">
                Tổng giá đơn thuốc: <span>{formatToVND(detailPrescription?.prescription?.totalPrice)}</span>
              </div>
            </Title>
          </div>
        ))}
    </>
  );
}
