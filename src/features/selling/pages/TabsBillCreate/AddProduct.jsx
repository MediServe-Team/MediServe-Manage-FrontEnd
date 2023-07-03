import { useState } from 'react';
import { SearchOnChange } from '../../../../components';
import SearchResultItem from '../../../stock/components/SearchResultItem';

function AddProduct() {
  return (
    <div className="h-full flex flex-col w-full gap-4">
      <div className="pt-5 py-2 flex-shrink-0">
        <SearchOnChange placeholder={'Nhập từ khóa tìm kiếm sản phẩm'} />
      </div>
      {/* List products filter */}
      <div className="flex-1 overflow-y-auto mb-3">
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
      </div>
    </div>
  );
}

export default AddProduct;
