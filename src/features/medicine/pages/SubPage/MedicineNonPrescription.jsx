import { useState } from 'react';
import { MedicineItem } from '../../components';
import { Pagination } from '../../../../components';

function MedicineNonPrescription() {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg px-5 py-3 min-h-0 ">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-10 pb-[60px] overflow-y-auto">
        <MedicineItem />
        <MedicineItem />
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center relative">
        <div className="absolute -top-[50px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
          <Pagination pageLength={7} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      </div>
    </div>
  );
}

export default MedicineNonPrescription;
