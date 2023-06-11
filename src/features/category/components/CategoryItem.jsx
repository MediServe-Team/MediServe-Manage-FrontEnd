import { BsCapsule } from 'react-icons/bs';

function CategotyItem({ order, categoryName, isMedicine, isDefault, note }) {
  let stylesColor;
  switch (order % 3) {
    case 0:
      stylesColor = '#38B3E1';
      break;
    case 1:
      stylesColor = '#EE9717';
      break;
    default:
      stylesColor = '#02D09E';
      break;
  }

  return (
    <div
      className="bg-white w-full rounded-lg mx-auto flex flex-col gap-2 border-[2px] p-3 h-fit"
      style={{ borderColor: stylesColor }}
    >
      <div className="flex items-center gap-4">
        <p
          className="h-[26px] w-[28px] flex items-center justify-center rounded-sm text-h7 text-white font-medium"
          style={{ backgroundColor: stylesColor }}
        >
          20
        </p>

        <div className="flex items-end gap-2">
          <div className="text-h5 font-medium text-blue_dark/90">{categoryName}</div>
          {isMedicine && <BsCapsule className="text-[20px] text-dark_primary relative -top-[1px]" />}
        </div>
      </div>

      <div className="flex justify-between items-center ml-[46px]">
        <div className="text-h8 text-text_blur">{note}</div>
        <div className="flex text-h8 text-black/70 font-medium items-center justify-center">
          {isDefault && <p className="bg-text_blur/30 py-1 px-2 rounded-md whitespace-nowrap">Mặc định</p>}
        </div>
      </div>
    </div>
  );
}

export default CategotyItem;
