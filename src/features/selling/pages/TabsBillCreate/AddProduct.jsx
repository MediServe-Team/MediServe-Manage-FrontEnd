import { useState, useEffect } from 'react';
import { SearchOnChange, EmptyImage } from '../../../../components';
import { AddSellItem } from '../../components';
import { useDebounce } from '../../../../hooks';
// service
import { filterProductService } from '../../../product/productServices';

function AddProduct() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const debounced = useDebounce(searchValue);

  useEffect(() => {
    const filterProducts = async () => {
      if (debounced) {
        const result = await filterProductService(debounced);
        setResults(result.data);
      } else {
        setResults([]);
      }
    };
    filterProducts();
  }, [debounced]);

  //* search change:
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //* clear search:
  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="h-full flex flex-col w-full gap-4">
      <div className="pt-5 py-2 flex-shrink-0">
        <SearchOnChange
          placeholder={'Nhập từ khóa tìm kiếm sản phẩm'}
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
      </div>
      {/* List products filter */}
      <div className="flex-1 overflow-y-auto mb-3">
        {results && results.length > 0 ? (
          results.map((item, index) => {
            return (
              <AddSellItem
                key={index}
                name={item.product.productName}
                sellUnit={item.product.sellUnit}
                sellPrice={item.sellPrice}
              />
            );
          })
        ) : (
          <div className="h-full flex justify-center items-center">
            <EmptyImage title={'Không có kết quả tìm kiếm sản phẩm'} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
