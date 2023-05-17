import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FiChevronLeft } from 'react-icons/fi';
import classNames from 'classnames';

function Pagination({ pageLength, pageNumber, setPageNumber }) {
  if (pageLength === 0) return null;

  const handleChangePageNumberLinear = (value) => {
    if (pageNumber + value >= 1 && pageNumber + value <= pageLength) {
      setPageNumber(pageNumber + value);
    }
  };

  const renderPageNumber = () => {
    const beforePage = pageNumber === 1 ? pageNumber : pageNumber - 1;
    const afterPage = pageNumber === pageLength ? pageNumber : pageNumber + 1;
    const listPageNumberRender = [];

    const DotsItem = () => (
      <li className={classNames('w-[30px] h-[30px] flex justify-center items-end')}>
        <HiOutlineDotsHorizontal className="text-[24px] text-dark_primary relative top-2" />
      </li>
    );

    const styleBtnNum =
      'w-[30px] h-[30px]  rounded-md flex justify-center items-center hover:bg-dark_primary hover:text-white transition-all outline-none';
    const styleActive = 'bg-dark_primary text-white';
    const styleNormal = 'border-[1px] border-dark_primary text-dark_primary';

    // First number in pagination
    if (pageNumber > 2) {
      listPageNumberRender.push(
        <li>
          <button className={classNames(styleBtnNum, styleNormal)}>
            <span className="font-semibold text-h5">{1}</span>
          </button>
        </li>,
      );
      if (pageNumber > 3) {
        listPageNumberRender.push(<DotsItem />);
      }
    }
    // Last number in pagination
    for (let i = beforePage; i <= afterPage; i++) {
      listPageNumberRender.push(
        <li key={i}>
          <button className={classNames(styleBtnNum, pageNumber === i ? styleActive : styleNormal)}>
            <span className="font-semibold text-h5">{i}</span>
          </button>
        </li>,
      );
    }
    // number in last pagination
    if (pageNumber < pageLength - 1) {
      if (pageNumber < pageLength - 2) {
        listPageNumberRender.push(<DotsItem />);
      }
      listPageNumberRender.push(
        <li>
          <button className={classNames(styleBtnNum, styleNormal)}>
            <span className="font-semibold text-h5">{pageLength}</span>
          </button>
        </li>,
      );
    }
    return listPageNumberRender;
  };

  return (
    <ul className=" flex gap-2">
      {/* Prev button */}
      <li className=" mr-5">
        <button
          className={classNames('w-[30px] h-[30px] flex justify-center items-center outline-none')}
          onClick={() => handleChangePageNumberLinear(-1)}
        >
          <FiChevronLeft
            className={classNames(
              'text-[24px]',
              pageNumber > 1 ? 'text-dark_primary hover:scale-125 transition-all' : 'text-text_blur/70',
            )}
          />
        </button>
      </li>

      {/* Page number */}
      {renderPageNumber()}

      {/* Next button */}
      <li className="ml-5">
        <button
          className="w-[30px] h-[30px] flex justify-center items-center outline-none"
          onClick={() => handleChangePageNumberLinear(1)}
        >
          <FiChevronLeft
            className={classNames(
              'text-[24px] rotate-180',
              pageNumber < pageLength ? 'text-dark_primary hover:scale-125 transition-all' : 'text-text_blur/70',
            )}
          />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
