import React, { useState } from 'react';
import { GroupItem, ItemRow } from '../components';

const fakeData = [
  {
    id: 1,
    productName: 'thực phẩm a',
  },
  {
    id: 2,
    productName: 'thực phẩm b',
  },
  {
    id: 3,
    productName: 'thực phẩm c',
  },
];

function StockInto() {
  const [merchandises, setMerchandises] = useState(fakeData);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 bg-white rounded-lg px-10 py-3">
        {/* Search product */}
        <div className="flex justify-center gap-3">
          <div className="w-1/2 h-[40px] bg-slate-600"></div>
          <div className="w-[80px] h-[40px] bg-slate-600"></div>
        </div>

        {/* Group */}
        <GroupItem>
          {fakeData.map((item, index) => (
            <ItemRow />
          ))}
        </GroupItem>
      </div>
      <div className="h-[80px] bg-white rounded-lg"></div>
    </div>
  );
}

export default StockInto;
