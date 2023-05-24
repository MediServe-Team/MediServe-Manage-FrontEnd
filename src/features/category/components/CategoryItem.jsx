import { BsCapsule } from 'react-icons/bs';

function CategotyItem(props) {
  const num = props.order;
  let color = '',
    background = '';
  if (num % 3 === 1) {
    color = '#38B3E1';
    background = '#38B3E1';
  } else if (num % 3 === 2) {
    color = '#EE9717';
    background = '#EE9717';
  } else {
    color = '#02D09E';
    background = '#02D09E';
  }

  return (
    <div className="bg-white h-[80px] w-[300px] rounded-lg mx-auto flex border-[2px] " style={{ borderColor: color }}>
      <div className="w-1/6 pt-1 pl-1">
        <p
          className="h-1/3 w-1/2 flex items-center justify-center rounded-sm mt-2 ml-2 text-h7 text-white font-medium"
          style={{ backgroundColor: background }}
        >
          20
        </p>
      </div>

      <div className="flex flex-col w-5/6">
        <div className="flex h-1/2 items-end">
          <div className="w-4/5 text-h5 font-medium text-blue_dark/90">Thuốc kiểm soát đặc biệt</div>
          <div className="w-1/5 pb-1">
            <BsCapsule />
          </div>
        </div>
        <div className="flex h-1/2">
          <div className="w-2/3 text-h8 text-text_blur">Lưu ý với các thuốc dạng này</div>
          <div className="flex w-1/3 text-h8 text-black/70 font-medium items-center justify-center">
            <p className="bg-text_blur/30 py-1 px-2 rounded-md">Mặc định</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategotyItem;
