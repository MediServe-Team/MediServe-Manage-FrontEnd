import { MdOutlineAddCircleOutline } from 'react-icons/md';

function SearchResultMedicine({ name, packingSpecification, quantity, onClick }) {
  return (
    <div className="flex gap-5 items-center px-4 py-2 hover:bg-text_blur/10 text-h5 cursor-pointer" onClick={onClick}>
      <div className="rounded-full w-[20px] h-[20px] shadow-md bg-tertiary/10">
        <MdOutlineAddCircleOutline className="text-[22px] text-tertiary" />
      </div>
      <div className="flex items-center gap-1">
        <p className="text-h5 font-medium">{name}</p>
        <i className="font-normal text-gray-700">({packingSpecification})</i>
      </div>
      <span className="ml-auto">
        còn <b className="text-secondary"> {quantity}</b>
      </span>
    </div>
  );
}

export default SearchResultMedicine;
