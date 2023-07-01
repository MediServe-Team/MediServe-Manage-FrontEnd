import { useState } from 'react';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { Modal, Button } from '../../../components';
// icon
import { AiOutlineClose } from 'react-icons/ai';
import { deleteDoseService } from '../doseServices';
import { toast } from 'react-toastify';

function ItemList({ number, doseId, doseName, note, setReloadList }) {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleUpdateDose = () => {
    setOpenModalUpdate(true);
  };

  const handleDeleteDose = async () => {
    const result = await deleteDoseService(doseId);
    if (result.status === 200) {
      toast.success('Xóa liều thuốc thành công!');
      setReloadList();
      setOpenModalDelete(false);
    } else {
      toast.error('Xóa liều thuốc thất bại!');
    }
  };

  return (
    <>
      <ul className="flex justify-between items-center bg-primary/5 border-2 border-text_primary/10 p-2 rounded-lg gap-3 text-h5 px-2 flex-shrink-0">
        {/* number */}
        <li className="w-[32px] h-[32px] flex flex-[1] justify-center items-center bg-white rounded-md px-1">
          <span className="text-dark_primary">{number}</span>
        </li>

        {/* dose */}
        <li className="flex flex-[12] items-center truncate">
          <span className="font-medium">{doseName}</span>
        </li>

        <li className="flex flex-[10] items-center truncate">
          <span className="whitespace-nowrap">{note}</span>
        </li>

        <li className="flex flex-[1.5] items-center justify-center text-white">
          <button
            className="h-[25px] w-[25px] bg-yellow-400 items-center justify-center flex hover:opacity-80 active:opacity-100"
            onClick={handleUpdateDose}
          >
            <BsPencilFill />
          </button>
        </li>

        <li className="flex flex-[1.5] items-center justify-center text-white ">
          <button
            className="h-[25px] w-[25px] bg-red-400 items-center justify-center flex hover:opacity-80 active:opacity-100"
            onClick={() => setOpenModalDelete(true)}
          >
            <BsTrashFill />
          </button>
        </li>
      </ul>

      {/* Modal Update*/}
      <Modal showModal={openModalUpdate}>
        <div className="w-[340px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-text_primary font-bold text-h4">Chỉnh sửa liều thuốc</h3>
              <p className="text-text_blur text-h6">Thay đổi thông tin bên dưới để cập nhật liều thuốc</p>
            </div>
            {/* close modal update */}
            <button
              className="w-[40px] h-full flex outline-none"
              onClick={() => {
                // reset();
                setOpenModalUpdate(false);
              }}
            >
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </div>
          {/* divider */}
          <div className="bg-text_primary h-[1px] w-full mt-3"></div>
          {/* Form update dose */}
          <form></form>
        </div>
      </Modal>

      {/* Modal Delete */}
      <Modal showModal={openModalDelete}>
        <div className="w-[340px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-text_primary font-bold text-h4">Xóa liều thuốc</h3>
              <p className="text-text_blur text-h6">Liều thuốc sẽ bị xóa khỏi hệ thống</p>
            </div>
            {/* close modal Delete */}
            <button
              className="w-[40px] h-full flex outline-none"
              onClick={() => {
                // reset();
                setOpenModalDelete(false);
              }}
            >
              <AiOutlineClose className="text-[20px] m-auto" />
            </button>
          </div>
          {/* Form delete dose */}
          <form className="flex flex-col w-full gap-4 mt-5">
            {/* Dose name */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Tên liều thuốc</span>
              <input
                type="text"
                defaultValue={doseName}
                className="border-2 w-full h-[40px] outline-none rounded-md px-2"
                readOnly
              />
            </div>
            {/* Dose note */}
            <div className="flex flex-col gap-1">
              <span className="text-text_primary font-medium">Ghi chú</span>
              <input
                type="text"
                defaultValue={note}
                className="border-2 w-full h-[40px] outline-none rounded-md px-2"
                readOnly
              />
            </div>
            {/* Button control delete */}
            <div className="flex justify-between items-center gap-5 mt-3">
              <Button
                size={'medium'}
                modifier={'gray'}
                styleBtn={'outline'}
                width={'100%'}
                type={'button'}
                onClick={() => setOpenModalDelete(false)}
              >
                Đóng
              </Button>
              <Button size={'medium'} modifier={'danger'} width={'100%'} type={'button'} onClick={handleDeleteDose}>
                Xóa
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ItemList;
