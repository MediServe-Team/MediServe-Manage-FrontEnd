import { useState, useEffect } from 'react';
import { UploadImg } from '../../.././components';

function MedicineCreate() {
  const [listImg, setListImg] = useState([]);

  return (
    <div className="w-full h-full rounded-lg bg-white p-5">
      <form className="h-full flex justify-between gap-8">
        <div className="w-1/3 h-full flex flex-col gap-[10px]">
          <UploadImg listImg={listImg} setListImg={setListImg} />
          {/* Barcode */}
          <div className="flex flex-col">
            <span className="text-text_primary">Mã vạch</span>
            <div className="w-full h-[100px] bg-green"></div>
          </div>
          {/* Note */}
          <div className="flex flex-col flex-1">
            <span className="text-text_primary">Ghi chú</span>
            <textarea
              className="border-2 border-text_primary outline-none rounded-md p-2 flex-1"
              placeholder="Thêm ghi chú cho sản phẩm"
            ></textarea>
          </div>
        </div>
        <div className="w-1/3 h-full"></div>
        <div className="w-1/3 h-full"></div>
      </form>
    </div>
  );
}

export default MedicineCreate;
