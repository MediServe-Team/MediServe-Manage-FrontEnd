import React, { useState, forwardRef } from 'react';
import classNames from 'classnames';
import { BsSearch } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function SearchBox({ value, onChange, onClear, onClick, onKeyDown }, ref) {
  const [isFocus, setFocus] = useState(false);

  return (
    <div
      className={classNames(
        'flex items-center h-10 w-[300px] bg-white/40 rounded-2xl shadow-md transition-all duration-100',
        isFocus && 'border-[1px] border-primary bg-white/90',
      )}
    >
      <div
        className={classNames('px-3 border-r-primary/30 border-r-[1px]', value && 'cursor-pointer active:opacity-20')}
        onClick={onClick}
      >
        <BsSearch
          className={classNames('text-[24px] transition-all duration-300', value ? 'text-primary' : 'text-text_blur')}
        />
      </div>

      {/* input */}
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="flex-1 border-none outline-none bg-transparent pl-2 text-h5"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className="px-2">
        <IoIosCloseCircleOutline
          className={classNames(
            'text-[20px] transition-all duration-200',
            value ? 'text-dark_primary cursor-pointer' : 'text-text_blur',
          )}
          onClick={onClear}
        />
      </div>
    </div>
  );
}

export default forwardRef(SearchBox);
