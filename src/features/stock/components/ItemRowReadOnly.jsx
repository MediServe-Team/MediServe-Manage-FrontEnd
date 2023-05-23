import React from 'react';
import classNames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import { CgRemove } from 'react-icons/cg';
import { BsCheckLg } from 'react-icons/bs';

function ItemRowReadOnly({ ...props }) {
  return (
    <div className="flex flex-col bg-slate-50 px-5 py-2 border-2 rounded-lg ">
      <div className="flex justify-between items-center gap-2 ">
        {/* Item info */}
        <div className="flex flex-1 justify-between items-center gap-2">
          {/* name & package*/}
          <div className="flex-[4] w-0 flex flex-col">
            <h3 className="font-medium text-ellipsis overflow-hidden">{props.name}</h3>
            <p className="text-text_blur">{props.packingSpecification}</p>
          </div>

          {/* quantity & specifications*/}
          <div className="w-0 flex-[5] flex gap-2 items-center ">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              3
            </span>
            <span className="text-text_blur">x</span>
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              3
            </span>
            <span>=</span>
            <span className="text-h6 whitespace-nowrap text-text_blur">160 (viên)</span>
          </div>

          {/* import price */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              3
            </span>
          </div>

          {/* sell price */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              3
            </span>
          </div>

          {/* total price */}
          <span className="w-0 flex-[2]">240.000</span>

          {/* manufacture Date */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              33/33/33
            </span>
          </div>

          {/* exp Date */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              3/22/22
            </span>
          </div>

          {/* Lot number */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md border-[1px] py-[3px] text-h6 text-center outline-none bg-white">
              jabdhbva
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="shadow-md w-[22px] h-[22px] rounded-full bg-tertiary flex justify-center items-center">
          <BsCheckLg className="text-[18px] text-white" />
        </div>
      </div>
      <div className="flex justify-end">
        <span className="text-tertiary">Đã bán hết</span>
      </div>
    </div>
  );
}

export default ItemRowReadOnly;
