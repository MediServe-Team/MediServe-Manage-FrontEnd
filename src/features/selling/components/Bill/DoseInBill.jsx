import { BsX } from 'react-icons/bs';
import { TitleListPre, ItemListPre } from '../../components';

function DoseInBill({ dose }) {
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
}

export default DoseInBill;
