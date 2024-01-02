import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import dateToString from '../../../helpers/dateToString';

export default function BlogItem({ createdDate, avatar, authorName, image, title, visibility }) {
  // handle edit post
  const handleEditPost = () => {
    console.log('Click Edit');
  };

  return (
    <div className="flex flex-col border-2 rounded-lg shrink h-fit">
      <div className="flex flex-row py-1 px-2 justify-between">
        <div className="flex flex-row gap-1">
          <div className="flex justify-center items-center shrink-0">
            <img className="object-cover w-[35px] h-[35px] rounded-full" src={avatar} alt="image_author" />
          </div>

          <div className="flex flex-col">
            <p className="font-medium text-h7">{authorName}</p>
            <p className="font-medium text-gray-400 text-h8">{dateToString(createdDate)}</p>
          </div>
        </div>

        <div className="flex justify-center items-center" onClick={handleEditPost}>
          <BsPencilSquare size={20} color="rgba(254, 167, 64, 1)" />
        </div>
      </div>
      <div className="w-full">
        <img src={image} alt="image_blog" className="object-cover w-full h-[153px]" />
      </div>

      <div className="px-4 py-2">
        <p className="text-h7 leading-tight font-medium line-clamp-2">{title}</p>
      </div>

      <div className="flex justify-end pr-2 pb-1.5">
        <div className={`py-0.5 px-3 rounded-lg ${visibility === true ? 'bg-[#A3EDA1]' : 'bg-[#8BBBE7]'}`}>
          <p className={`text-h8 ${visibility === true ? 'text-[#10BC2B]' : 'text-[#1464DC]'}`}>
            {visibility === true ? 'Công khai' : 'Không hiển thị'}
          </p>
        </div>
      </div>
    </div>
  );
}
