import { MdOutlineAddCircleOutline } from 'react-icons/md';

function AddDoseItem({ name, note, onClick }) {
  return (
    <div
      className="flex justify-between items-center px-4 py-2 hover:bg-text_blur/10 text-h5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-5 items-center">
        <div className="rounded-full w-[20px] h-[20px] shadow-md bg-tertiary/10">
          <MdOutlineAddCircleOutline className="text-[22px] text-tertiary" />
        </div>
        <p className="text-h5 font-medium">
          {name} <i className="font-normal ">({note})</i>
        </p>
      </div>
    </div>
  );
}

export default AddDoseItem;
