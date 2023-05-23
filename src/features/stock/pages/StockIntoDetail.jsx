import { useState } from 'react';
import { Button } from '../../../components';
import { GroupItem, ItemRowReadOnly } from '../components';

function StockIntoDetail() {
  const [list, setList] = useState(mockData);

  return (
    <div className="h-full flex flex-col bg-white rounded-lg px-10 py-4">
      {/* Header page*/}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-text_primary text-h5 font-bold">Chi tiết đơn nhập</h2>
        <Button size="normal" type="outline" modifier="primary" className="px-6">
          Xuất file
        </Button>
      </div>

      {/* Invoice */}
      <div className="flex-1 pt-3 min-h-0">
        <GroupItem>
          {Array.isArray(list) &&
            list.map((item, index) => (
              <ItemRowReadOnly key={index} name={item.name} packingSpecification={item.specifications} />
            ))}
        </GroupItem>
      </div>
    </div>
  );
}

export default StockIntoDetail;

const mockData = [
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
  {
    id: 1,
    name: 'nameme',
    specifications: '1 hộp 23 viên',
  },
];
