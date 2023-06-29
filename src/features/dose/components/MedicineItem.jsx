function MedicineItem({ number, medicineId, medicineName, specification, medicineUnit }) {
  return (
    <div className="flex flex-col border-2 border-text_blur rounded-lg">
      {/* header item */}
      <div className="flex items-center bg-secondary/20 p-2">
        {/* number */}
        <div className="w-[32px] h-[32px] flex justify-center items-center bg-secondary/80 rounded-md flex-shrink-0">
          <span className="text-white">#1</span>
        </div>

        {/* usage */}
        <div className="flex px-3 justify-center items-center gap-4 min-w-0 ">
          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Sáng</span>
            <input
              type="text"
              className="border-2 rounded-md border-primary max-w-[80px] h-[30px] min-w-0 px-2 text-center"
            />
          </div>

          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Trưa</span>
            <input
              type="text"
              className="border-2 rounded-md border-primary max-w-[80px] h-[30px] min-w-0 px-2 text-center"
            />
          </div>

          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Chiều</span>
            <input
              type="text"
              className="border-2 rounded-md border-primary max-w-[80px] h-[30px] min-w-0 px-2 text-center"
            />
          </div>
        </div>
      </div>
      {/* info medicine */}
      <div className="flex items-center bg-text_blur/5 py-4">
        <div className="w-1/2 pl-2">
          <p className="">Levothyroxine (Viên)</p>
          <p className="text-text_blur">Hộp 4 vĩ x 20 viên</p>
        </div>
        <div className="flex items-center w-1/2 gap-6">
          <div className="w-2/5">
            <input
              type="text"
              className="border-2 rounded-md border-text_blur max-w-[72px] h-[30px] min-w-0 px-2 text-center"
            />
          </div>
          <div className="w-2/5">
            <span>(Viên)</span>
          </div>
          <button className="w-1/5 text-text_blur text-h4 pr-5 font-semibold">x</button>
        </div>
      </div>
    </div>
  );
}

export default MedicineItem;
