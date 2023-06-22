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
          onClick={() => setSelected(item.unitName)}
        >
          {item.unitName}
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
          <div
            className={classNames(
              'bg-white rounded-md shadow-[0px_3px_7px_-1px_rgba(0,0,0,0.45)] max-h-[400px] overflow-y-auto',
            )}
          >
            {renderList()}
          </div>
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
