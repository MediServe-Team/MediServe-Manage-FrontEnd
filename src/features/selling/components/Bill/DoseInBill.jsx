import { BsX } from 'react-icons/bs';
import { TitleListPre, ItemListPre } from '../../components';
import formatToVND from '../../../../helpers/formatToVND';

function DoseInBill({ diagnose, listMedicines, note, totalPrice, onRemove }) {
  return (
    <div className="px-2 text-h5">
      <div className="flex flex-col bg-text_blur/5 rounded-md py-2 px-4 border-2 border-text_blur/30">
        <div className="flex items-center">
          <span className="w-1/2 italic font-medium flex justify-start">Chuẩn đoán: {diagnose}</span>
          <div className="w-1/2 flex justify-end">
            <button onClick={onRemove}>
              <BsX size={25} style={{ color: '#A8A8A8' }} />
            </button>
          </div>
        </div>
        <div className="pt-3">
          <TitleListPre>
            {/* Data */}
            {listMedicines &&
              Array.isArray(listMedicines) &&
              listMedicines.map((item, index) => (
                <ItemListPre
                  key={index}
                  medicineName={item.medicineName}
                  sellUnit={item.medicineUnit}
                  morning={item.morning}
                  noon={item.noon}
                  night={item.night}
                  quantity={item.quantity}
                  sellPrice={item.sellPrice}
                />
              ))}
          </TitleListPre>
        </div>
        <div className="pt-3 pb-1 flex flex-col">
          {note && <i>ghi chú: {note}</i>}
          <div className="flex justify-between">
            <span></span>
            <span className=" font-medium">
              Tổng giá: <span className="text-secondary font-normal">{formatToVND(totalPrice)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoseInBill;
