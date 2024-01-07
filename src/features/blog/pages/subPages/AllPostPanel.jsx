import { useState, useEffect } from 'react';
import { useDebounce } from '../../../../hooks';
import { useOutletContext } from 'react-router';
import BlogItem from '../../components/BlogItem';
import { Pagination } from '../../../../components';
import useBlog from '../../hooks/useBlog';

function AllPostPanel() {
  const searchValue = useOutletContext();
  const debounced = useDebounce(searchValue, 500);
  const { listBlogs, pageLength, pageNumber, setPageNumber, setSearch, setStatus } = useBlog();

  useEffect(() => {
    setStatus(null);
  }, []);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced]);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[4px] px-3 py-6 min-h-0">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-7 overflow-y-auto px-5">
        {Array.isArray(listBlogs) &&
          listBlogs.length > 0 &&
          listBlogs.map((item, index) => (
            <BlogItem
              authorName={item?.user.fullName}
              avatar={item?.user.avatar}
              createdDate={item?.updatedAt}
              image={item?.image}
              images={item?.BlogImages}
              title={item?.title}
              content={item?.content}
              visibility={item?.visibility}
              key={index}
            />
          ))}
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

export default AllPostPanel;
