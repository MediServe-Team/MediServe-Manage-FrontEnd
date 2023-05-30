function ItemListPre({ item }) {
  return (
    <ul className="flex justify-between items-center py-2 gap-2 text-h5 px-5 flex-shrink-0 border-b-2 border-text_blur/30">
      {/* dose */}
      <li className="flex flex-[12] flex-col w-full truncate">
        <span>Levothyroxine (Viên)</span>
        <span className="text-text_blur">Sáng: 2v, Trưa: 1v, Tối: 2v </span>
      </li>

      <li className="flex flex-[5] items-center justify-center">
        <span className="text-text_primary bg-white rounded-md px-6 py-1 border-2 border-text_blur/30">5</span>
      </li>

      <li className="flex flex-[5] items-center justify-center">
        <span className="text-text_primary bg-white rounded-md px-6 py-1 border-2 border-text_blur/30">10000</span>
      </li>

      <li className="flex flex-[7] items-center justify-center">
        <span className="text-secondary px-6">50000</span>
      </li>
    </ul>
  );
}

export default ItemListPre;
