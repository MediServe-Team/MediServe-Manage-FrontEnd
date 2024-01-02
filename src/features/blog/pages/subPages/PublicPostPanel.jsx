import { useState, useEffect } from 'react';
import { useDebounce } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import checkSubString from '../../../../helpers/checkSubString';
import BlogItem from '../../components/BlogItem';
import { getPublicBlog } from '../../blogSlice';
import { Pagination } from '../../../../components';

export default function PublicPostPanel() {
  const searchValue = useOutletContext();
  const debounced = useDebounce(searchValue, 500);
  const [listBlog, setListBlog] = useState([]);
  // const publicBlog = useSelector(getPublicBlog);
  const publicBlog = getPublicBlog;

  const [pageLength, setPageLength] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!searchValue) {
      setListBlog(publicBlog);
    } else {
      const filterBlog = publicBlog.filter((item) => {
        return checkSubString(item.title, debounced) || checkSubString(item.nameAuthor, debounced);
      });
      setListBlog(filterBlog);
    }
  }, [debounced, publicBlog]);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[4px] px-3 py-6 min-h-0">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-7 overflow-y-auto px-5">
        {Array.isArray(listBlog) &&
          listBlog.length > 0 &&
          listBlog.map((item, index) => <BlogItem key={index} info={item} />)}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center relative">
        {pageLength > 0 && (
          <div className="absolute -top-[50px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
            <Pagination pageLength={pageLength} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </div>
        )}
      </div>
    </div>
  );
}
