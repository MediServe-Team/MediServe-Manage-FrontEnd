import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import dateToString from '../../../helpers/dateToString';
import classNames from 'classnames';

export default function BlogItem({ createdDate, avatar, authorName, image, images, title, content, visibility }) {
  // handle edit post
  const handleEditPost = () => {
    console.log('Click Edit');
  };

  const BG_IMG_COLORS = {
    blue: 'bg-gradient-to-r from-[#00B37D] to-[#1F98DC]',
    yellow: 'bg-gradient-to-r from-[#DBD41E] to-[#B34000]',
    pink: 'bg-gradient-to-r from-[#E9AFDC] to-[#C51BA0]',
    gray: 'bg-gradient-to-r from-[#C8CECC] to-[#4A4C4D]',
    green: 'bg-gradient-to-r from-[#A8FBB0] to-[#207518]',
    purple: 'bg-gradient-to-r from-[#9C70A0] to-[#770865]',
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
        {image ? (
          <div className={classNames(`"w-full h-[153px] text-center  flex px-2 py-5`, BG_IMG_COLORS[image])}>
            <p className="m-auto text-white text-[12px] text-ellipsis overflow-hidden">{content}</p>
          </div>
        ) : (
          <img src={images[0].imageUrl} alt="image_blog" className="object-cover w-full h-[153px]" />
        )}
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
