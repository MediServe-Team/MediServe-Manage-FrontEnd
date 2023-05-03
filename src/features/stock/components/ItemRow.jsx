import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CgRemove } from 'react-icons/cg';

function ItemRow({ onRemove, ...props }) {
  const [manufactureDate, setManufactureDate] = useState(null);
  const [expDate, setExpDate] = useState(null);

  return (
    <li className="flex justify-between items-center gap-2 bg-slate-50 px-5 py-2 border-2 rounded-lg">
      {/* name */}
      <div className="flex-[4] w-0 flex flex-col">
        <h3 className="font-medium text-ellipsis overflow-hidden">{props.name}</h3>
        <p className="text-text_blur">{props.packingSpecification}</p>
      </div>

      {/* quantity */}
      <div className="w-0 flex-[5] flex gap-2 items-center ">
        <input
          type="text"
          className="min-w-[50px] max-w-[80px] rounded-md border-[1px] border-primary/20 shadow-inner py-[3px] text-h6 text-center outline-dark_primary"
        />
        <span className="text-text_blur">x</span>
        <input
          type="text"
          className="min-w-[50px] max-w-[80px] rounded-md border-[1px] border-primary/20 shadow-inner py-[3px] text-h6 text-center outline-dark_primary"
        />
        <span>=</span>
        <span className="text-h6 whitespace-nowrap text-text_blur">160 (viên)</span>
      </div>

      {/* import price */}
      <div className="w-0 flex-[2]">
        <input
          type="text"
          className="min-w-[50px] max-w-[80px] rounded-md border-[1px] border-primary/20 shadow-inner py-[3px] text-h6 text-center outline-dark_primary"
        />
      </div>

      {/* sell price */}
      <div className="w-0 flex-[2]">
        <input
          type="text"
          className="min-w-[50px] max-w-[80px] rounded-md border-[1px] border-primary/20 shadow-inner py-[3px] text-h6 text-center outline-dark_primary"
        />
      </div>

      {/* total price */}
      <span className="w-0 flex-[2]">240.000</span>

      {/* Date */}
      <div className="w-0 flex-[2]">
        <DatePicker
          className="w-[90px] border-[1px] border-primary/20 shadow-inner cursor-pointer rounded-md py-[3px] text-h6 text-center outline-dark_primary"
          selected={manufactureDate}
          onChange={(date) => setManufactureDate(date)}
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Date */}
      <div className="w-0 flex-[2]">
        <DatePicker
          className="w-[90px] border-[1px] border-primary/20 shadow-inner cursor-pointer rounded-md py-[3px] text-h6 text-center outline-dark_primary"
          selected={expDate}
          onChange={(date) => setExpDate(date)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Lot number */}
      <div className="w-0 flex-[2]">
        <input
          type="text"
          className="min-w-[50px] max-w-[80px] rounded-md border-[1px] border-primary/20 shadow-inner py-[3px] text-h6 text-center outline-dark_primary"
        />
      </div>

      {/* Remove button */}
      <button
        className="shadow-md w-[22px] h-[22px] rounded-full bg-secondary/10 outline-none active:opacity-30 "
        onClick={onRemove}
      >
        <CgRemove className="text-[22px] text-secondary" />
      </button>
    </li>
  );
}

export default ItemRow;
