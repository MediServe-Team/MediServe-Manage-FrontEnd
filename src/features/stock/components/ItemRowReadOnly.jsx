import React from 'react';
// import classNames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
// import { CgRemove } from 'react-icons/cg';
import { BsCheckLg } from 'react-icons/bs';
import dateToString from '../../../helpers/dateToString';
import formatToVND from '../../../helpers/formatToVND';

function ItemRowReadOnly({
  name,
  packingSpecification,
  inputQuantity,
  specification,
  importPrice,
  sellPrice,
  manufactureDate,
  expirationDate,
  lotNumber,
}) {
  return (
    <div className="flex flex-col bg-slate-50 px-5 py-2 border-2 rounded-lg ">
      <div className="flex justify-between items-center gap-2 ">
        {/* Item info */}
        <div className="flex flex-1 justify-between items-center gap-2">
          {/* name & package*/}
          <div className="flex-[4] w-0 flex flex-col">
            <h3 className="font-medium text-ellipsis overflow-hidden">{name}</h3>
            <p className="text-text_blur">{packingSpecification}</p>
          </div>

          {/* quantity & specifications*/}
          <div className="w-0 flex-[5] flex gap-2 items-center ">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {inputQuantity}
            </span>
            <span className="text-text_blur">x</span>
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {specification}
            </span>
            <span>=</span>
            <span className="text-h6 whitespace-nowrap text-text_blur">{inputQuantity * specification} (viên)</span>
          </div>

          {/* import price */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {importPrice}
            </span>
          </div>

          {/* sell price */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {sellPrice}
            </span>
          </div>

          {/* total price */}
          <span className="w-0 flex-[2] font-medium text-secondary">
            {formatToVND(inputQuantity * specification * importPrice)}
          </span>

          {/* manufacture Date */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {dateToString(manufactureDate)}
            </span>
          </div>

          {/* exp Date */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {dateToString(expirationDate)}
            </span>
          </div>

          {/* Lot number */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-medium py-[3px] text-h6 text-center outline-none bg-white">
              {lotNumber}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="shadow-md w-[16px] h-[16px] rounded-full bg-green flex justify-center items-center">
          <BsCheckLg className="text-[10px] text-white font-bold" />
        </div>
      </div>
      <div className="flex justify-end">
        <span className="text-green">Đã bán hết</span>
      </div>
    </div>
  );
}

export default ItemRowReadOnly;
