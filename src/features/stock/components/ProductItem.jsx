import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import formatToVND from '../../../helpers/formatToVND';
import dateToString from '../../../helpers/dateToString';

function ProductItem({
  name,
  image,
  packingSpecification,
  productId,
  soldQuantity,
  inputQuantity,
  specification,
  manufactureDate,
  expirationDate,
  lotNumber,
  importPrice,
  sellPrice,
  invoiceId,
}) {
  const [y, setY] = useState(400);
  const [opacity, setOpacity] = useState(0.3);
  const [hiden, setHiden] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden">
        <div className="flex justify-center">
          <img src={image} alt="thuốc" className="object-cover h-[200px]" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-h5 text-black font-medium">{name}</h3>
          <p className="text-h5 text-text_blur whitespace-nowrap">{packingSpecification}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-text_primary">
            Mã sản phẩm: <span className="font-medium text-black">{productId}</span>
          </p>
          {/* Quantiry */}
          <div className="flex gap-2">
            <p className="text-text_primary">
              Đã bán: <span className="font-medium text-secondary">{soldQuantity}</span>
            </p>
            <p className="text-text_primary">
              Còn lại: <span className="font-medium text-primary">{inputQuantity * specification - soldQuantity}</span>
            </p>
          </div>
          {/* Date */}
          <div className="flex gap-2">
            <p className="text-text_primary">
              NSX: <span className="text-black text-h6">{dateToString(manufactureDate)}</span>
            </p>
            <p className="text-text_primary">
              HSD: <span className="text-black text-h6">{dateToString(expirationDate)}</span>
            </p>
          </div>
        </div>

        {/* item 2 */}
        <motion.div
          className={classNames('w-full h-full bg-white absolute top-[0]', hiden ? 'hidden' : '')}
          animate={{ y, opacity }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full flex flex-col justify-between bg-gradient-to-t from-white to-primary/30 rounded-t-lg px-3 py-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-h5 text-black font-medium">{name}</h3>
              <p className="text-h5 text-text_blur">{packingSpecification}</p>
            </div>
            {/* Mã số */}
            <div className="flex flex-col gap-1">
              <p className="text-text_primary">
                Mã đơn nhập: <span className="font-medium text-black">{invoiceId}</span>
              </p>
              <p className="text-text_primary">
                Mã lô sản xuất: <span className="font-medium text-black">{lotNumber}</span>
              </p>
            </div>
            {/* Price */}
            <div className="flex flex-col gap-1">
              <p className="text-text_primary">
                Giá nhập: <span className="font-medium text-danger">{formatToVND(importPrice)}</span>
              </p>
              <p className="text-text_primary">
                Giá bán: <span className="font-medium text-tertiary">{formatToVND(sellPrice)}</span>
              </p>
            </div>
            {/* other */}
            <div className="flex flex-col gap-1">
              <p className="text-text_primary">
                Mã sản phẩm: <span className="font-medium text-black">{productId}</span>
              </p>
              {/* Quantiry */}
              <div className="flex gap-2">
                <p className="text-text_primary">
                  Đã bán: <span className="font-medium text-secondary">{soldQuantity}</span>
                </p>
                <p className="text-text_primary">
                  Còn lại:{' '}
                  <span className="font-medium text-primary">{inputQuantity * specification - soldQuantity}</span>
                </p>
              </div>
              {/* Date */}
              <div className="flex gap-2">
                <p className="text-text_primary">
                  NSX: <span className="text-black text-h6">{dateToString(manufactureDate)}</span>
                </p>
                <p className="text-text_primary">
                  HSD: <span className="text-black text-h6">{dateToString(expirationDate)}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* View detail */}
      <div
        className="w-full flex justify-center items-center h-[40px]  rounded-md shadow-[0px_2px_7px_-1px_rgba(0,0,0,0.45)] cursor-default hover:shadow-none hover:opacity-50 hover:border-[1px] border-text_primary transition-all"
        onMouseOver={() => {
          setY(0);
          setOpacity(1);
          setHiden(false);
        }}
        onMouseOut={() => {
          setY(400);
          setOpacity(0.3);
        }}
      >
        {/* Hover Button */}
        <h3 className="text-text_primary text-h5 font-bold">XEM CHI TIẾT</h3>
      </div>
    </div>
  );
}

export default ProductItem;
