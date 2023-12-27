// case
/*
    - có search theo danh mục / không
    - Cho phép default type trong th kh có danh mục
*/

import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import TypeSelect from '../TypeSelect/TypeSelect.jsx';

function SearchToAdd({ value, onChange, types, typeSelected, onClear, onTypeChange, className }, ref) {
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <div className={classNames('relative', className)}>
      <div
        className={classNames(
          'flex gap-1 items-center  rounded-lg h-[40px] shadow-sm bg-slate-100 border-[1px]',
          isFocus && 'c border-blue-400',
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          className="flex-1 border-none outline-none bg-transparent pl-3 text-h5"
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
      <div className="absolute z-50 top-1/2 -translate-y-1/2 right-0 translate-x-[calc(100%+20px)]">
        <TypeSelect typeList={types} selectedIndex={typeSelected} onChange={onTypeChange} />
      </div>
    </div>
  );
}

export default forwardRef(SearchToAdd);
