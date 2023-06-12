import representImg from '../assets/images/medicine.png';

function EmptyImage({ title }) {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <img src={representImg} alt="medicine app" className="w-[100px] h-[100px]" />
        <span className="text-h5 font-medium text-text_blur">{title}</span>
      </div>
    </div>
  );
}

export default EmptyImage;
