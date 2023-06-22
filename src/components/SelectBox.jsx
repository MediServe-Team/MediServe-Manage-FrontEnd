import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';

function SelectBox({ list, width, height, padding, selected, setSelected }) {
  const [visible, setVisible] = useState(false);

  const renderList = () => {
    return Array.isArray(list) && list.length > 0 ? (
      list.map((item, index) => (
        <div
          key={index}
          className={'px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap'}
          onClick={() => setSelected(item.name)}
        >
          {item.name}
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Danh sách rỗng!</div>
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
          <div className={classNames('bg-white rounded-md shadow-xl', `min-w-full`)}>{renderList()}</div>
        </div>
      )}
    >
      <div
        className="border-2 border-text_primary/20 hover:border-text_primary rounded-md flex justify-between items-center px-3 cursor-pointer"
        //   style
        style={{ width: width, height: height, padding: padding }}
        onClick={() => setVisible(true)}
      >
        <span>{selected}</span>
        <MdOutlineKeyboardArrowDown className="text-[20px] text-text_primary" />
      </div>
    </Tippy>
  );
}

export default SelectBox;
