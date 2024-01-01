import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
import { Button, SubNavigate } from '../../../components';
import { SearchOnChange } from '../../../components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateBlogSchema } from '../../../validations/createBlog';
import { toast } from 'react-toastify';
import { IoMdCloudUpload } from 'react-icons/io';
import getBase64 from '../../../helpers/getBase64';
import { TbRefresh } from 'react-icons/tb';
import { ClipLoader } from 'react-spinners';
import classNames from 'classnames';

export default function BlogCreatePage() {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(true);
  const [title, setTitle] = useState('');
  const [titleImage, setTitleImage] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [chooseImage, setChooseImage] = useState(false);

  const [trackErrors, setTrackErrors] = useState({
    passErrs: true,
    image: '',
  });

  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  // addBreadcrumb
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

  //* use Form
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateBlogSchema) });

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    // check cancle file
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    if (!image) {
      const imageArea = document.querySelector('#image-form');
      const imgBlog = document.createElement('img');
      imgBlog.src = data;
      imgBlog.id = 'image_blog';
      imgBlog.style = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;';
      imageArea.appendChild(imgBlog);
    } else {
      const imgBlog = document.querySelector('#image_blog');
      imgBlog.src = data;
    }
    setImage(data);
  };

  //* Handle before submit data to create new Medicine
  const handleSubmitCreateBlog = async (dataForm) => {
    if (!trackErrors.passErrs) return;

    // set loading is true
    setIsCreating(true);

    const bodyRequest = {
      title: dataForm.title,
      content: dataForm.content,
      visibility: dataForm.visibility,
      image: image,
      titleImage: dataForm.titleImage,
    };

    const result = { status: 201 };
    // const result = await createBlogServices(bodyRequest);
    if (result.status === 201 || result.status === 200) {
      toast.success('Tạo mới sản phẩm thành công!');
      // set loading is false
      setIsCreating(false);
      navigate(-1);
    } else {
      toast.error('Hệ thống gặp sự cố khi tạo thuốc!');
      // set loading is false
      setIsCreating(false);
    }
  };

  const handleTrackErrors = () => {
    let newErrors = { ...trackErrors };
    if (image === '') {
      newErrors.passErrs = false;
      newErrors.image = 'image for blog is required!';
    }
    setTrackErrors(newErrors);
  };

  const handleClearForm = () => {
    // clear display img barcode
    const barcodeImg = document.querySelector('#barcode-img');
    barcodeImg?.remove();
    // clear data
    setTitle('');
    setTitleImage('');
    setContent('');
    setImage('');
    setVisibility(true);
    reset();
    clearErrors();
    setTrackErrors({
      passErrs: false,
      title: '',
      titleImage: '',
      content: '',
      image: '',
      visibility: '',
    });
  };

  return (
    <form
      className="h-full flex flex-col px-5 pt-3 pb-5 bg-white flex-1 rounded-lg gap-5 overflow-y-auto"
      onSubmit={handleSubmit(handleSubmitCreateBlog)}
    >
      <p className="text-[18px] font-medium">Tạo bài đăng</p>

      <div className="flex flex-row px-5 gap-10">
        <div className="flex flex-col w-1/2 gap-5">
          <div className="flex flex-row gap-5 items-center">
            <p>Trạng thái</p>

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className={classNames(
                'border-2 outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2 py-1',
                errors.visibility?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('visibility')}
            >
              <option value={true}>Công khai</option>
              <option value={false}>Không hiển thị</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <p>Tiêu đề</p>
            <input
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.title?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              {...register('title')}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Nội dung</p>
            <textarea
              className={classNames(
                'border-2 w-full h-[200px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.content?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              {...register('content')}
            />
          </div>
        </div>

        <div className="flex flex-col w-1/2 gap-5">
          <div className="flex flex-col gap-1">
            <p>Hình ảnh</p>
            <div
              id="image-form"
              className="w-full h-[258px] bg-white rounded-md border-2 border-text_primary border-dashed flex flex-col items-center justify-center relative cursor-pointer"
              onClick={() => document.querySelector('#upload-image').click()}
            >
              {!image && (
                <>
                  <IoMdCloudUpload size={80} className="text-[30px] text-text_primary" />
                  <span className="text-text_primary">Nhấn để thêm ảnh</span>
                </>
              )}
              <input id="upload-image" type="file" accept="image/*" hidden onChange={(e) => handleUploadImage(e)} />
            </div>
            {trackErrors.image && <span className="text-danger">Vui lòng thêm ảnh!</span>}
          </div>

          <div className="flex flex-col gap-1">
            <p>Tiêu đề hình ảnh</p>
            <input
              className={classNames(
                'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                errors.titleImage?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              value={titleImage}
              onChange={(e) => setTitleImage(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Button create blog */}
      <div className="flex-1 flex justify-between items-end px-5">
        <Button
          styleBtn={'outline'}
          size={'medium'}
          width={150}
          leftIcon={<TbRefresh className="text-[20px]" />}
          onClick={() => {
            handleClearForm();
          }}
        >
          Làm rỗng
        </Button>
        <Button
          type={'submit'}
          styleBtn={'solid'}
          size={'medium'}
          width={150}
          onClick={() => handleTrackErrors()}
          disabled={isCreating}
        >
          {isCreating ? <ClipLoader color={'#ffffff'} loading={isCreating} size={30} /> : 'Tạo bài đăng'}
        </Button>
      </div>
    </form>
  );
}
