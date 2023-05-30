import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

function MedicineItem({ onclick }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden">
        <div className="flex justify-center">
          <img
            src="https://intriphat.com/wp-content/uploads/2021/07/mau-hop-thuoc-dep-5.jpg"
            alt="thuốc"
            className="object-cover h-[200px]"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-h5 text-black font-medium">Levothyroxine (Viên)</h3>
          <p className="text-h5 text-text_blur">hộp 4 vĩ x 20 viên</p>
        </div>
        <div className="flex flex-col">
          <p className="text-text_primary">
            Mã sản phẩm: <span className="font-medium text-black">MsWD36</span>
          </p>
          {/* Quantiry */}
          <div className="flex gap-2">
            <p className="text-text_primary">
              Đã bán: <span className="font-medium text-secondary">306</span>
            </p>
            <p className="text-text_primary">
              Còn lại: <span className="font-medium text-primary">480</span>
            </p>
          </div>
          {/* Date */}
          <div className="flex gap-2">
            <p className="text-text_primary">
              NSX: <span className="text-black text-h6">12/03/2022</span>
            </p>
            <p className="text-text_primary">
              HSD: <span className="text-black text-h6">24/06/2023</span>
            </p>
          </div>
        </div>
      </div>
      {/* Button View detail */}
      <button
        className="w-full h-[40px] rounded-md shadow-[0px_3px_7px_-1px_rgba(0,0,0,0.45)] outline-none hover:shadow-[0px_0px_4px_-1px_rgba(0,0,0,0.45)] hover:bg-primary/5"
        onClick={onclick}
      >
        <h3 className="text-text_primary text-h5 font-bold">THÔNG TIN THUỐC</h3>
      </button>
    </div>
  );
}

export default MedicineItem;
