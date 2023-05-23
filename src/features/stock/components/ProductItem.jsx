import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

function ProductItem() {
  const [y, setY] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden">
        <div className="flex justify-center">
          <img
            src="https://hct.com.vn/wp-content/uploads/2020/05/thuoc-elevit-bau-uc-2.jpg"
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
            Mã sản phẩm: <spam className="font-medium text-black">MsWD36</spam>
          </p>
          {/* Quantiry */}
          <div className="flex gap-2">
            <p className="text-text_primary">
              Đã bán: <spam className="font-medium text-secondary">306</spam>
            </p>
            <p className="text-text_primary">
              Còn lại: <spam className="font-medium text-primary">480</spam>
            </p>
          </div>
          {/* Date */}
          <div className="flex gap-2">
            <p className="text-text_primary">
              NSX: <spam className="text-black text-h6">12/03/2022</spam>
            </p>
            <p className="text-text_primary">
              HSD: <spam className="text-black text-h6">24/06/2023</spam>
            </p>
          </div>
        </div>
        {/* item 2 */}
        <motion.div className="w-full h-full bg-white absolute top-0 ]" animate={{ y }} transition={{ duration: 0.5 }}>
          <div className="w-full h-full bg-gradient-to-t from-white to-primary/30 rounded-t-lg "></div>
        </motion.div>
      </div>
      {/* View detail */}
      <div
        className="w-full flex justify-center items-center h-[40px]  rounded-md shadow-[0px_6px_7px_-1px_rgba(0,0,0,0.45)] cursor-default hover:shadow-none hover:opacity-50 hover:border-[1px] border-text_primary transition-all"
        onMouseOver={() => setY(0)}
        onMouseOut={() => setY(400)}
      >
        <h3 className="text-text_primary text-h5 font-bold">XEM CHI TIẾT</h3>
      </div>
    </div>
  );
}

export default ProductItem;

// box-shadow: 0px 8px 11px 2px rgba(0,0,0,0.5);

//box-shadow: 0px -4px 11px 3px rgba(0,0,0,0.41);
