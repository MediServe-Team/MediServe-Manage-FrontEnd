import { useEffect } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Breadcrumb() {
  const list = useSelector((state) => state.breadcrumb?.breadcrumb);
  const renderBreadcrumb = (list) => {
    return list.length !== 0
      ? list.map((tab, index) =>
          index !== list.length - 1 ? (
            <div className="flex items-center" key={index}>
              <div className="flex border-2 border-gray-400 bg-light_gray rounded-md px-2">
                <Link to={tab.slug} className="font-medium text-h6">
                  {tab.name}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center" key={index}>
              <div className="flex border-2 border-gray-400 bg-light_gray rounded-md px-2">
                <span className="font-medium text-h6">{tab.name}</span>
              </div>
            </div>
          ),
        )
      : '';
  };

  useEffect(() => {
    console.log(list);
  }, []);

  return <ul>{renderBreadcrumb(list)}</ul>;
}

export default Breadcrumb;
