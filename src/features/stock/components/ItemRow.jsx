import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ItemRow() {
  const [manufactureDate, setManufactureDate] = useState(new Date());

  return (
    <li className="flex justify-between items-center gap-2 bg-slate-50 px-5 py-2 border-2 rounded-lg">
      {/* name */}
      <div className="flex-[4] w-0 flex flex-col">
        <h3 className="font-medium text-ellipsis overflow-hidden">Alexikasdfgsdfgbse</h3>
        <p className="text-text_blur">hộp 4 vĩ x 20 viên</p>
      </div>

      {/* quantity */}
      <div className="w-0 flex-[5] flex gap-2 items-center ">
        <input type="text" className="min-w-[50px] max-w-[80px] rounded-md border-[1px]" />
        <span className="text-text_blur">x</span>
        <input type="text" className="min-w-[50px] max-w-[80px] rounded-md border-[1px]" />
        <span>=</span>
        <span className="text-h6 whitespace-nowrap text-text_blur">160 (viên)</span>
      </div>

      {/* import price */}
      <div className="w-0 flex-[2]">
        <input type="text" className="min-w-[50px] max-w-[80px] rounded-md border-[1px]" />
      </div>

      {/* sell price */}
      <div className="w-0 flex-[2]">
        <input type="text" className="min-w-[50px] max-w-[80px] rounded-md border-[1px]" />
      </div>

      {/* total price */}
      <span className="w-0 flex-[2]">240.000</span>

      {/* Date */}
      <div className="w-0 flex-[2]">
        <DatePicker className="max-w-[80px] border-[1px]" />
      </div>
      <span className="w-0 flex-[2]">14/12/2023</span>

      {/* Lot number */}
      <div className="w-0 flex-[2]">
        <input type="text" className="min-w-[50px] max-w-[80px] rounded-md border-[1px]" />
      </div>
      <span className="w-0 flex-[1]">icon</span>
    </li>
  );
}

export default ItemRow;
