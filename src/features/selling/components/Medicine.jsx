import formatToVND from '../../../helpers/formatToVND';

export default function Medicine({ title, data }) {
  function Title({ children }) {
    return (
      <div className="flex flex-col h-full min-h-0">
        {/* heading */}
        <ul className="flex justify-between items-center gap-2 text-h5 font-medium border-b-2 border-text_blur/30 py-[5px]">
          <li className="flex-[12]">
            <span>{title}</span>
          </li>
          <li className="flex-[5] text-center">
            <span>SL</span>
          </li>
          <li className="flex-[5] text-center">
            <span>Giá</span>
          </li>
          <li className="flex-[7] text-center">
            <span>Thành tiền</span>
          </li>
        </ul>
        {/* body */}
        <ul className="flex h-full flex-col gap-3 mt-2">{children}</ul>
      </div>
    );
  }

  function Item({ name, unit, quantity, totalPrice, sellPrice, packingSpecification }) {
    return (
      <ul className="flex h-[60px] justify-between items-center gap-2 text-h5 border-b-2 border-text_blur/30">
        <li className="flex flex-[12] flex-col w-full truncate">
          <span className="font-medium">
            {name} ({unit})
          </span>
          <span className="text-text_blur">{packingSpecification}</span>
        </li>

        <li className="flex-[5] text-center">
          <span>{quantity}</span>
        </li>

        <li className="flex-[5] text-center">
          <span>{sellPrice}</span>
        </li>

        <li className="flex-[7] text-center">
          <span>{formatToVND(totalPrice)}</span>
        </li>
      </ul>
    );
  }

  return (
    <div className="">
      <Title>
        {/* Data */}
        {data &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((item, index) => (
            <>
              {item?.medicine ? (
                <Item
                  key={index}
                  name={item?.medicine?.medicineName}
                  unit={item?.medicine?.sellUnit}
                  packingSpecification={item?.medicine?.packingSpecification}
                  quantity={item?.quantity}
                  totalPrice={item?.totalPrice}
                  sellPrice={Number(item?.totalPrice) / Number(item?.quantity)}
                />
              ) : (
                <Item
                  key={index}
                  name={item?.product?.productName}
                  unit={item?.product?.sellUnit}
                  packingSpecification={item?.product?.packingSpecification}
                  quantity={item?.quantity}
                  totalPrice={item?.totalPrice}
                  sellPrice={Number(item?.totalPrice) / Number(item?.quantity)}
                />
              )}
            </>
          ))}
      </Title>
    </div>
  );
}
