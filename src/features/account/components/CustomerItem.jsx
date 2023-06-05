import Button from '../../../components/Button';

function CustomerItem() {
  return (
    <div className="bg-white h-full w-11/12 mx-auto flex flex-shrink-0 px-0">
      <div className="flex w-3/12 justify-center items-center">
        <div className="bg-[url('https://i.ibb.co/cDz1NGp/86.jpg')] bg-cover h-9 w-9 rounded-full"></div>
      </div>

      <div className="flex flex-col w-6/12">
        <div className="flex h-1/2 truncate">
          <div className="text-h6 font-medium text-black">Hoàng Văn Phúc</div>
        </div>
        <div className="flex h-1/2 truncate">
          <div className="text-h8 text-text_blur">hvp@gmail.com</div>
        </div>
      </div>

      <div className="flex w-3/12 items-center justify-center flex-shrink-0">
        <p className="bg-tertiary/50 rounded-md flex text-[11px] py-1 w-full items-center justify-center text-black">
          Khách hàng
        </p>
      </div>
    </div>
  );
}

export default CustomerItem;
