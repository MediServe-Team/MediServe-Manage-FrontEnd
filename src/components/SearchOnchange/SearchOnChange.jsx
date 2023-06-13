import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function SearchOnChange({ value, onChange, onClear, className }) {
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef();

  return (
    <div className={className}>
      <div
        className={classNames(
          'flex gap-1 items-center  rounded-lg h-[40px] shadow-sm bg-slate-100 ',
          isFocus && 'border-[1px]',
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          className="flex-1 border-none outline-none bg-transparent pl-3 text-h5 w-auto"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <div className="px-2">
          <IoIosCloseCircleOutline
            className={classNames(
              'text-[20px] transition-all duration-200',
              value ? 'text-dark_primary cursor-pointer' : 'text-text_blur',
            )}
            onClick={() => {
              onClear();
              inputRef.current.focus();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchOnChange;
