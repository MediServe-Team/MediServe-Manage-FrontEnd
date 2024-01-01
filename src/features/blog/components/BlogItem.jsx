import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

export default function BlogItem({ info }) {
  return (
    <div className="flex flex-col border-2 rounded-lg shrink h-fit">
      <div className="flex flex-row py-1 px-2 justify-between">
        <div className="flex flex-row gap-1">
          <div className="flex justify-center items-center">
            <img className="object-cover w-[35px] h-[35px] rounded-full" src={info.imageAuthor} alt="image_author" />
          </div>

          <div className="flex flex-col">
            <p className="font-medium text-h7">{info.nameAuthor}</p>
            <p className="font-medium text-gray-400 text-h8">
              {info.datePost.toLocaleString('default', { day: '2-digit' }) +
                '/' +
                info.datePost.toLocaleString('default', { month: '2-digit' }) +
                '/' +
                info.datePost.toLocaleString('default', { year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center" onClick={() => console.log('Click Edit')}>
          <BsPencilSquare size={20} color="rgba(254, 167, 64, 1)" />
        </div>
      </div>
      <div className="w-full">
        <img src={info.image} alt="image_blog" className="object-cover w-full h-[153px]" />
      </div>

      <div className="px-4 py-2">
        <p className="text-h7 leading-tight font-medium line-clamp-2">{info.title}</p>
      </div>

      <div className="flex justify-end pr-2 pb-1.5">
        <div className={`py-0.5 px-3 rounded-lg ${info.visibility === true ? 'bg-[#A3EDA1]' : 'bg-[#8BBBE7]'}`}>
          <p className={`text-h8 ${info.visibility === true ? 'text-[#10BC2B]' : 'text-[#1464DC]'}`}>
            {info.visibility === true ? 'Công khai' : 'Không hiển thị'}
          </p>
        </div>
      </div>
    </div>
  );
}
