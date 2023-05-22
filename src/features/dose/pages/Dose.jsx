import { useState } from 'react';
import { MedicineItem } from '../components';

function Dose() {
  const [listMedicine, setListMedicine] = useState(['1', '1', '1', '1', '1', '1']);

  return (
    <div className="h-full flex gap-3 ">
      {/* Dose */}
      <div className="w-1/3 bg-white rounded-lg">
        <header className="border-b-2 h-[50px] ">
          <h3 className="">Tạo liều thuốc</h3>
        </header>
        {/* Search */}
        <div className=""></div>
        {/* Name of dose */}
        <div className="">
          <h3>Tên liều thuốc</h3>
          <input type="text" className="border-dark_primary border-2" />
        </div>

        {/* List medicine */}
        <div className="px-5 flex flex-col gap-5 A">
          {listMedicine.map((item) => (
            <MedicineItem />
          ))}
        </div>
      </div>

      {/* List Dose */}
      <div className="w-2/3 bg-white rounded-lg">
        <h3>Danh sách liều thuốc</h3>
      </div>
    </div>
  );
}

export default Dose;
