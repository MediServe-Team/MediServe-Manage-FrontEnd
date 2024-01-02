import { useState, useEffect, useLayoutEffect } from 'react';
import { getAllBlogService } from '../blogServices';

const useBlog = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [status, setStatus] = useState(true);
  const [search, setSearch] = useState('');
  const [listBlogs, setListBlogs] = useState([]);

  const fitlerListBlog = async (num) => {
    try {
      const result = await getAllBlogService(num, 4, status, search);
      const { blogs, totalPage } = result.data;
      setPageLength(totalPage);
      setListBlogs(blogs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fitlerListBlog(1);
    setPageNumber(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  useEffect(() => {
    fitlerListBlog(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return {
    listBlogs,
    search,
    setStatus,
    setSearch,
    pageLength,
    pageNumber,
    setPageNumber,
  };
};

export default useBlog;
