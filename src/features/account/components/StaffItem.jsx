import Button from '../../../components/Button';

function UserItem() {
  return (
    <div className="bg-white h-full w-11/12 mx-auto flex flex-shrink-0 p-0">
      <div className="flex w-3/12 justify-center items-center">
        <div className="bg-[url('https://i.ibb.co/GnM8rdR/22f41791a0dd8909af17f46dbccd8af8-Expires-1688342400-Signature-g-Ws-Xx-V4-Hvs-PPYeh-Zzq-Pa31e-KYmq-MK.jpg')] bg-cover h-9 w-9 rounded-full"></div>
      </div>

      <div className="flex flex-col w-6/12">
        <div className="flex h-1/2 truncate">
          <div className="text-h6 font-medium text-black">Trần Minh Quang</div>
        </div>
        <div className="flex h-1/2 truncate">
          <div className="text-h8 text-text_blur">quang@gmail.com</div>
        </div>
      </div>

      <div className="flex w-3/12 items-center justify-center flex-shrink-0">
        <p className="bg-secondary/30 rounded-md flex text-[11px] py-1 w-full items-center justify-center text-black">
          Nhân viên
        </p>
      </div>
    </div>
  );
}

export default UserItem;
