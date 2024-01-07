import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
import { Button, SubNavigate } from '../../../components';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdCloudUpload } from 'react-icons/io';
import getBase64 from '../../../helpers/getBase64';
import { TbRefresh } from 'react-icons/tb';
import { ClipLoader } from 'react-spinners';
import classNames from 'classnames';
import { CiCirclePlus } from 'react-icons/ci';
import { TbCircleOff } from 'react-icons/tb';
import { IoIosCloseCircle } from 'react-icons/io';
import { createBlogService } from '../blogServices';
import { axiosPrivate } from '../../../lib/axios';

export default function BlogCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setPublic] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  //* BG COLOR CONST
  const BG_IMG_COLORS = {
    blue: 'bg-gradient-to-r from-[#00B37D] to-[#1F98DC]',
    yellow: 'bg-gradient-to-r from-[#DBD41E] to-[#B34000]',
    pink: 'bg-gradient-to-r from-[#E9AFDC] to-[#C51BA0]',
    gray: 'bg-gradient-to-r from-[#C8CECC] to-[#4A4C4D]',
    green: 'bg-gradient-to-r from-[#A8FBB0] to-[#207518]',
    purple: 'bg-gradient-to-r from-[#9C70A0] to-[#770865]',
  };
  //* Breadcrumb
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Tạo bài băng',
        slug: '/blog/create',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  //* File ref
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  //* Change public Post
  const handleChangePublic = () => {
    setPublic(!isPublic);
  };

  //* Handle pick background color
  const handlePickBackgroundColor = (key) => {
    setImagePreview({ type: 'div', value: key });
    setImages([]);
  };

  //* Handle remove background color
  const handleRemoveBackgroundColor = () => {
    if (imagePreview.type !== 'div') return;
    setImagePreview(null);
  };

  //* Handle Add image to list
  const handleAddImageToList = async (e) => {
    if (images.length >= 4) {
      toast.warning('Chỉ được thêm tối đa 4 ảnh');
      return;
    }
    const file = e.target.files[0];
    //* check cancled file
    if (!file) return;
    //* convert file to base64
    const data = await getBase64(file);
    // setImagePreview({ type: 'img', value: data });
    setImages((prev) => {
      return [...prev, data];
    });
  };

  //* Handle remove Image from list
  const handleRemoveImageFromList = (index) => {
    setImages((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      setImages(newList);
    });
  };

  //* Set preview image When images change
  useEffect(() => {
    if (images.length > 0) {
      setImagePreview({ type: 'img', value: images[images.length - 1] });
    } else if (imagePreview?.type === 'img') {
      setImagePreview(null);
    }
  }, [images]);

  //* Handle before submit data to create new Medicine
  const handleSubmitCreateBlog = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Tiêu đề trống!');
      setIsCreating(false);
      return;
    }
    if (!imagePreview) {
      toast.error('Bạn cần thêm nội dung hình ảnh');
      setIsCreating(false);
      return;
    }
    // body request
    const bodyRequest = {
      title: title,
      content: content,
      visibility: isPublic,
      images: images,
      bgColor: imagePreview?.type === 'div' ? imagePreview.value : null,
    };

    //* CALL API
    // setIsCreating(true);

    const result = await createBlogService(axiosPrivate, bodyRequest);
    if (result.status === 201 || result.status === 200) {
      toast.success('Tạo bài đăng thành công!');
      // navigate(-1);
    } else {
      toast.error('Hệ thống gặp sự cố khi tạo bài đăng!');
      setIsCreating(false);
    }
    setIsCreating(false);
  };

  const handleClearForm = () => {};

  //* ITEM COMPONENT
  const PublicItem = () => (
    <div
      className="text-[#289224] bg-[#289224]/20 px-5 py-[2px] rounded-full cursor-pointer font-medium text-h6 hover:opacity-90 select-none"
      onClick={handleChangePublic}
    >
      <span>Công khai</span>
    </div>
  );
  const PrivateItem = () => (
    <div
      className="text-[#2c3e85] bg-[#2c3e85]/20 px-5 py-[2px] rounded-full cursor-pointer font-medium text-h6 hover:opacity-90 select-none"
      onClick={handleChangePublic}
    >
      <span>Không công khai</span>
    </div>
  );

  //* UI RENDER
  return (
    <form
      className="h-full flex flex-col px-5 pt-3 pb-5 bg-white flex-1 rounded-lg gap-5 overflow-y-auto"
      onSubmit={(e) => handleSubmitCreateBlog(e)}
    >
      <p className="text-[18px] font-medium">Tạo bài đăng</p>

      <div className="flex flex-row px-5 gap-10">
        <div className="flex flex-col w-1/2 gap-5">
          <div className="flex flex-row gap-5 items-center">
            <p className="font-medium text-text_primary">Trạng thái</p>

            <div>{isPublic ? <PublicItem /> : <PrivateItem />}</div>
          </div>

          {/* Post Title  */}
          <div className="flex flex-col gap-1">
            <p className="font-medium text-text_primary">Tiêu đề</p>
            <input
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-[4px] border-text_primary/60 focus:border-text_primary transition-all duration-200 px-2',
              )}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Post content box */}
          <div className="flex flex-col gap-1">
            <p className="font-medium text-text_primary">Nội dung bài đăng</p>
            <textarea
              className={classNames(
                'border-2 w-full h-[200px] outline-none rounded-md border-text_primary/60 focus:border-text_primary transition-all duration-200 p-2 min-h-[160px]',
              )}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* List Image */}
          <div className="flex flex-col gap-1">
            <p className="font-medium text-text_primary">Thêm hình ảnh</p>
            <div className="flex flex-row gap-5">
              {Array.isArray(images) &&
                images.length > 0 &&
                images.map((source, index) => (
                  <div
                    key={index}
                    onClick={() => setImagePreview({ type: 'img', value: source })}
                    className="w-[100px] h-[100px] relative group cursor-pointer"
                  >
                    <img src={source} className="w-full h-full rounded-md object-cover" />
                    <IoIosCloseCircle
                      className="text-[#e84545] text-[20px] absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      onClick={() => handleRemoveImageFromList(index)}
                    />
                  </div>
                ))}
              <button
                type="button"
                className="w-[100px] h-[100px] rounded-md bg-white shadow-[0px_3px_5px_1px_rgba(0,0,0,0.8)] hover:shadow-[0px_3px_5px_1px_rgba(0,0,0,0.2)] flex"
                onClick={handleButtonClick}
              >
                <input
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={(e) => handleAddImageToList(e)}
                />
                <CiCirclePlus className="text-[25px] m-auto text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 gap-5">
          {/* Preview Post Image */}
          <div className="flex flex-col gap-1">
            <p className="font-medium text-text_primary">Hình ảnh</p>
            <div
              id="image-form"
              className="w-full min-h-[300px] bg-white rounded-md border-2 border-text_primary border-dashed flex flex-col items-center justify-center relative"
            >
              {!imagePreview?.type ? (
                <>
                  <IoMdCloudUpload size={80} className="text-[30px] text-gray-400" />
                  <span className="text-gray-400">Chọn ảnh hoặc nền bên dưới</span>
                </>
              ) : imagePreview.type === 'img' ? (
                <img src={imagePreview.value} className="w-full h-[300px] object-cover" />
              ) : (
                <div className={classNames(`w-full h-full text-center  flex p-10`, BG_IMG_COLORS[imagePreview.value])}>
                  <p className="m-auto text-white font-medium text-h4">{content}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-medium text-text_primary">Chọn màu nền</p>
            {/* Select Background */}
            <div className="flex gap-5">
              <button
                type="button"
                className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_5px_1px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.2)] cursor-pointer flex"
                onClick={handleRemoveBackgroundColor}
              >
                <TbCircleOff className="text-gray-400 m-auto text-[20px]" />
              </button>
              {Object.keys(BG_IMG_COLORS).map((key, index) => (
                <button
                  key={index}
                  type="button"
                  className={classNames(
                    `w-[40px] h-[40px] rounded-full shadow-[0px_3px_5px_1px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.2)] cursor-pointer`,
                    BG_IMG_COLORS[key],
                  )}
                  onClick={() => handlePickBackgroundColor(key)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Button create blog */}
      <div className="flex-1 flex justify-between items-end px-5">
        <Button
          styleBtn={'outline'}
          type={'button'}
          size={'medium'}
          width={150}
          leftIcon={<TbRefresh className="text-[20px]" />}
          onClick={() => {
            handleClearForm();
          }}
        >
          Làm rỗng
        </Button>
        <Button type="submit" styleBtn={'solid'} size={'medium'} width={150} disabled={isCreating}>
          {isCreating ? <ClipLoader color={'#ffffff'} loading={isCreating} size={30} /> : 'Tạo bài đăng'}
        </Button>
      </div>
    </form>
  );
}
