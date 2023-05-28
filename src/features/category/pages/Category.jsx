import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CategotyItem from '../components/CategoryItem';
import CategotyItemAdd from '../components/CategoryItemAdd';

function Category() {
  const [listCategory, setListCategory] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="h-full w-full bg-white rounded-xl px-14 py-8 relative">
      <p className="text-text_primary font-bold text-h4">Danh mục sản phẩm</p>
      <div className="border-b-2 border-text_primary/60"></div>
      <div className="grid gap-9 grid-cols-3 grid-rows-3 mt-3 bg-primary/10 rounded-md py-8 px-14 ">
        {listCategory.map((item) => (
          <CategotyItem order={item} />
        ))}
        <CategotyItemAdd order={listCategory.length + 1} />
      </div>
    </div>
  );
}

export default Category;
