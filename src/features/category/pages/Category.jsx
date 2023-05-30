import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import CategotyItem from '../components/CategoryItem';
import CategotyItemAdd from '../components/CategoryItemAdd';
import { getAllCategory, getlistCategories } from '../categorySlice';

import { useDispatch, useSelector } from 'react-redux';

function Category() {
  const listCategory = useSelector(getlistCategories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl px-14 py-8 relative">
      <div className="flex-shrink-0">
        <p className="text-blue_dark font-bold text-h4">Danh mục sản phẩm</p>
        <div className="border-b-2 border-blue_dark/60"></div>
      </div>
      <div className="flex-1 mt-3 bg-primary/10 rounded-md py-8 px-10 ">
        <div className="grid grid-cols-3 gap-x-9 gap-y-5">
          {listCategory.map((item, index) => (
            <CategotyItem
              order={index}
              key={index}
              categoryName={item.categoryName}
              isMedicine={item.isMedicine}
              // isDefault={item.isDefault}
              isDefault={true}
              note={item.note}
            />
          ))}
          <CategotyItemAdd order={listCategory.length} />
        </div>
      </div>
    </div>
  );
}

export default Category;
