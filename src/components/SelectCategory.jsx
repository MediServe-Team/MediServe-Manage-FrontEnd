import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames';

function SelectCategory({ categories, width, height, padding, selected, setSelected, danger }) {
  const [visible, setVisible] = useState(false);

  const renderList = () => {
    return Array.isArray(categories) && categories.length > 0 ? (
      categories.map((item, index) => (
        <div
          key={index}
          className={'px-4 py-1 hover:bg-text_blur/10 text-h5 cursor-pointer whitespace-nowrap'}
          onClick={() => setSelected(item.id)}
        >
          {item.categoryName}
        </div>
      ))
    ) : (
      <div className="px-4 py-1 text-text_blur">Danh sách rỗng!</div>
    );
  };

  const categorySelectedName = (id) => {
    if (id) {
      const categorySelected = categories.filter((item) => item.id === id);
      if (categorySelected.length > 0) return categorySelected[0].categoryName;
      return '';
    }
    return '';
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
        className={classNames(
          'border-2 hover:border-text_primary rounded-md flex justify-between items-center px-3 cursor-pointer',
          danger ? 'border-danger' : 'border-text_primary/20',
        )}
        //   style
        style={{ width: width, height: height, padding: padding }}
        onClick={() => setVisible(true)}
      >
        <span>{categorySelectedName(selected)}</span>
        <MdOutlineKeyboardArrowDown className="text-[20px] text-text_primary" />
      </div>
    </Tippy>
  );
}

export default SelectCategory;
