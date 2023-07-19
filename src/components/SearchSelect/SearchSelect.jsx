import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import Tippy from '@tippyjs/react/headless';
import SearchBox from './SearchBox';
import DropBox from './DropBox';

function SearchSelect(
  { value, onChange, onClear, types, selectedTypeIndex, onChangeType, onSearchClick, onKeyDown },
  ref,
) {
  const [visible, setVisible] = useState(false);

  const handleSelectType = (index) => {
    onChangeType(index);
    setVisible(false);
  };

  const renderMenuType = () => {
    return Array.isArray(types) && types.length > 0 ? (
      types.map((item, index) => (
        <div
          key={index}
          className="px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer"
          onClick={() => handleSelectType(index)}
        >
          {item.title}
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">No type item!</div>
    );
  };

  return (
    <div className={classNames('flex gap-4 items-center')}>
      <SearchBox
        value={value}
        onChange={onChange}
        onClear={onClear}
        onClick={onSearchClick}
        onKeyDown={onKeyDown}
        ref={ref}
      />

      <Tippy
        visible={visible}
        interactive={true}
        placement="bottom-start"
        onClickOutside={() => setVisible(false)}
        render={(attrs) => (
          <div tabIndex="-1" {...attrs}>
            <div className="bg-white rounded-md shadow-md">{renderMenuType()}</div>
          </div>
        )}
      >
        <DropBox title={types[selectedTypeIndex].title} onClick={() => setVisible(!visible)} />
      </Tippy>
    </div>
  );
}

export default forwardRef(SearchSelect);
