import { IoMdCloudUpload, IoMdCloseCircleOutline } from 'react-icons/io';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import getBase64 from '.././helpers/getBase64';
import formatToKBMBGB from '.././helpers/formatToKBMBGB';

function UploadImg({ listImg, setListImg }) {
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    // check cancle file
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    setListImg((prev) => {
      const newImgs = [...prev, { fileName: file.name, size: formatToKBMBGB(file.size), data }];
      return newImgs;
    });
  };

  const handleRemoveImage = (index) => {
    setListImg((prev) => {
      const newImgs = [...prev];
      newImgs.splice(index, 1);
      return newImgs;
    });
  };

  const UploadItem = ({ name, size, index }) => (
    <div className="flex justify-between px-3 items-center h-[50px] rounded-md bg-white mt-2">
      <div className="flex gap-2 items-center">
        <BsFillFileEarmarkTextFill className="text-text_primary text-[24px]" />
        <div className="flex flex-col">
          <p className="text-text_primary">{name}</p>
          <p className="text-text_blur">{size}</p>
        </div>
      </div>
      <IoMdCloseCircleOutline
        className="text-[24px] text-text_blur cursor-pointer"
        onClick={() => handleRemoveImage(index)}
      />
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center rounded-md h-[320px] bg-primary/10">
      <div className="flex-shrink-1 w-full">
        <h3 className="font-bold text-text_primary text-center py-2">Tải ảnh lên</h3>
        <div
          className="w-4/5 h-[100px] border-2 bg-white border-text_primary border-dashed mx-auto flex flex-col justify-center items-center cursor-pointer"
          onClick={() => document.querySelector('#upload-file').click()}
        >
          <IoMdCloudUpload className="text-[30px] text-text_primary" />
          <span className="text-text_primary">Nhấn để thêm ảnh</span>
          <input id="upload-file" type="file" accept="image/*" hidden onChange={(e) => handleUploadImage(e)} />
        </div>
      </div>
      {/* List image uploading */}
      <div className="w-4/5 mt-3">
        <span className="font-medium">{listImg.length > 0 ? 'Ảnh được thêm' : 'Chưa có ảnh được thêm!'}</span>
      </div>
      <div className="flex-1 w-4/5 my-2 overflow-y-auto">
        {Array.isArray(listImg) &&
          listImg.length > 0 &&
          listImg.map((image, index) => {
            return <UploadItem key={index} name={image.fileName} size={image.size} index={index} />;
          })}
      </div>
    </div>
  );
}

export default UploadImg;
