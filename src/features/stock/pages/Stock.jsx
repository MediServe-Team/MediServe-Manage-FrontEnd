import { Link } from 'react-router-dom';
import { ProductItem } from '../components';

function Stock() {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-[80px] flex justify-between items-center px-5 bg-white rounded-lg flex-shrink-0">
        {/* navigate on page */}
        <nav>
          <ul className="flex gap-3">
            <li className="border-b-[3px] px-4 border-tertiary flex gap-2 items-center py-2">
              <span>Tất cả</span>
              <div className=" top-0 right-0 w-[22px] h-[18px] rounded-md bg-tertiary/30 text-tertiary flex justify-center items-center">
                <span className="font-bold text-h6">1</span>
              </div>
            </li>

            <li className="border-b-[3px] px-4 border-secondary/80 flex gap-2 items-center py-2">
              <span>Sắp hết hàng</span>
              <div className=" top-0 right-0 w-[22px] h-[18px] rounded-md bg-secondary/30 text-secondary flex justify-center items-center">
                <span className="font-bold text-h6">1</span>
              </div>
            </li>

            <li className="border-b-[3px] px-4 border-danger/80 flex gap-2 items-center py-2">
              <span>Sắp đến hạn</span>
              <div className=" top-0 right-0 w-[22px] h-[18px] rounded-md bg-danger/30 text-danger flex justify-center items-center">
                <span className="font-bold text-h6">1</span>
              </div>
            </li>

            <li className="border-b-[3px] px-4 border-gray-500 flex gap-2 items-center py-2">
              <span>Hết hạn</span>
              <div className=" top-0 right-0 w-[22px] h-[18px] rounded-md bg-gray-500/30 text-gray-500 flex justify-center items-center">
                <span className="font-bold text-h6">1</span>
              </div>
            </li>
          </ul>
        </nav>
        {/* Search */}
        <div className=" w-[200px] h-[30px] bg-gray-100"></div>
      </div>

      {/* Main page */}
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-10 bg-white rounded-lg px-5 py-3">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
}

export default Stock;
