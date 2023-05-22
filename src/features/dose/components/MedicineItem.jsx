function MedicineItem({ number, name, specification }) {
  return (
    <div className="flex flex-col gap-3 border-2 border-text_blur rounded-lg">
      {/* header item */}
      <div className="flex items-center bg-secondary/20 px-1 py-1">
        {/* number */}
        <div className="w-[32px] h-[32px] flex justify-center items-center bg-secondary/80 rounded-md flex-shrink-0">
          <span className="text-white">#1</span>
        </div>

        {/* usage */}
        <div className="flex px-3 justify-center items-center gap-4 min-w-0 ">
          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Sang</span>
            <input type="text" className="border-2 rounded-md border-primary max-w-[80px] h-[30px] min-w-0" />
          </div>

          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Trua</span>
            <input type="text" className="border-2 rounded-md border-primary max-w-[80px] h-[30px] min-w-0" />
          </div>

          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Chieu</span>
            <input type="text" className="border-2 rounded-md border-primary max-w-[80px] h-[30px] min-w-0" />
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default MedicineItem;
