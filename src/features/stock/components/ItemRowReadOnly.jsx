import React, { useEffect, useState } from 'react';
// import classNames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
// import { CgRemove } from 'react-icons/cg';
import { BsCheckLg, BsFillExclamationCircleFill } from 'react-icons/bs';
import dateToString from '../../../helpers/dateToString';
import formatToVND from '../../../helpers/formatToVND';

function ItemRowReadOnly({
  name,
  packingSpecification,
  importQuantity,
  specification,
  importPrice,
  sellPrice,
  manufactureDate,
  expirationDate,
  lotNumber,
  destroyed,
  soldQuantity,
}) {
  const renderTextStatus = () => {
    const quantity = importQuantity * specification;
    if (destroyed) {
      const destroyQnt = quantity - soldQuantity;
      return <span className="text-danger">Đã tiêu hủy {destroyQnt} viên</span>;
    } else if (quantity === soldQuantity) {
      return <span className="text-green">Đã bán hết</span>;
    } else if (quantity > soldQuantity) {
      const restQnt = quantity - soldQuantity;
      return <span className="text-yellow-500">Còn lại {restQnt} viên</span>;
    }
  };

  const renderIconStatus = () => {
    const quantity = importQuantity * specification;
    if (destroyed) {
      return (
        <div className="shadow-md w-[16px] h-[16px] rounded-full flex justify-center items-center">
          <BsFillExclamationCircleFill className="text-[16px] text-danger font-bold" />
        </div>
      );
    } else if (quantity === soldQuantity) {
      return (
        <div className="shadow-md w-[16px] h-[16px] rounded-full bg-green flex justify-center items-center">
          <BsCheckLg className="text-[10px] text-white font-bold" />
        </div>
      );
    } else if (quantity > soldQuantity) {
      return (
        <div className="shadow-md w-[16px] h-[16px] rounded-full bg-yellow-500 flex justify-center items-center">
          <BsCheckLg className="text-[10px] text-white font-bold" />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 px-5 py-2 border-[1px] rounded-[2px] ">
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
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {importQuantity}
            </span>
            <span className="text-text_blur">x</span>
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {specification}
            </span>
            <span>=</span>
            <span className="text-h6 whitespace-nowrap">{importQuantity * specification} (viên)</span>
          </div>

          {/* import price */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {importPrice}
            </span>
          </div>

          {/* sell price */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {sellPrice}
            </span>
          </div>

          {/* total price */}
          <span className="w-0 flex-[2]">{formatToVND(importQuantity * specification * importPrice)}</span>

          {/* manufacture Date */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {dateToString(manufactureDate)}
            </span>
          </div>

          {/* exp Date */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {dateToString(expirationDate)}
            </span>
          </div>

          {/* Lot number */}
          <div className="w-0 flex-[2] flex">
            <span className="flex-1 min-w-[60px] max-w-[80px]  h-[28px] rounded-md text-text_primary font-normal py-[3px] text-h6 text-center outline-none bg-white">
              {lotNumber}
            </span>
          </div>
        </div>

        {/* Status */}
        {renderIconStatus()}
      </div>
      <div className="flex justify-end">{renderTextStatus()}</div>
    </div>
  );
}

export default ItemRowReadOnly;
