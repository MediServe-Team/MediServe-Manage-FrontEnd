import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

function MedicineItem({ id, medicineName, registrationNumber, medicineImage, packingSpecification, barCode, onclick }) {
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
          <h3 className="text-h5 text-black font-medium">{medicineName}</h3>
          <p className="text-h5 text-text_blur">{packingSpecification}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-text_primary">
            Mã số thuốc: <span className="font-medium text-black">{id}</span>
          </p>
          {/* Barcode */}
          <div className="">
            <img
              src="https://chiaki.vn/upload/news/content/2020/11/ma-vach-jpg-1604390780-03112020150620.jpg"
              alt=""
              className="h-[80px]"
            />
          </div>
          {/* registrationNumber */}
          <p className="text-text_primary">
            Số đăng ký: <span className="font-medium text-secondary">{registrationNumber}</span>
          </p>
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
