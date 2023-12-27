import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

function TypeSelect({ typeList, selectedIndex, onChange }) {
  const [visible, setVisible] = useState(false);

  const categoryNameSelected = () => {
    if (Array.isArray(typeList) && typeList.length > 0) {
      const index = typeList.findIndex((obj) => obj?.id === selectedIndex);
      return typeList[index].categoryName;
    }
    return 'danh mục rỗng';
  };

  const renderMenuType = () => {
    return Array.isArray(typeList) && typeList.length > 0 ? (
      typeList.map((item, index) => (
        <div
          key={index}
          className="px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap"
          onClick={() => onChange(item.id)}
        >
          {item.categoryName}
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">No type item!</div>
    );
  };

  return (
    <Tippy
      visible={visible}
      interactive={true}
      placement="bottom-start"
      onClickOutside={() => setVisible(false)}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs}>
          <div className="bg-white rounded-md shadow-xl">{renderMenuType()}</div>
        </div>
      )}
    >
      <div
        onClick={() => setVisible(!visible)}
        className="flex justify-center items-center h-8 px-5 bg-secondary/70 rounded-md cursor-pointer hover:bg-secondary/90 active:bg-secondary/50 active:border-secondary/70 active:border-2 select-none shadow-lg transition-all"
      >
        <span className="text-white">{categoryNameSelected()}</span>
      </div>
    </Tippy>
  );
}

export default TypeSelect;
