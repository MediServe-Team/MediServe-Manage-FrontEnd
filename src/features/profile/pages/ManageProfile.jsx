import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BsCloudUploadFill, BsPencilSquare } from 'react-icons/bs';
import { Button } from '../../../components';
import getBase64 from '../../../helpers/getBase64';
import DatePicker from 'react-datepicker';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from '../../../validations/updateProfile';
// services
import { useAxiosWithToken } from '../../../hooks';
import { getProfileServices, updateProfileServices } from '../profileServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';

function ManageProfile() {
  //* state:
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState('');
  const [certificate, setCertificate] = useState('');
  const [identityCard, setIdentityCard] = useState('');
  const [reLoad, setReload] = useState(false);
  //* form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateProfileSchema) });

  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: 'Thông tin cá nhân',
        slug: '/profile',
      }),
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //* fetch api with access token
  const axiosWithToken = useAxiosWithToken();

  //* get data profile
  useEffect(() => {
    const getProfile = async () => {
      const result = await getProfileServices(axiosWithToken);
      setProfile(result.data);
      // set init value for form
      setValue('name', result.data?.name);
      setValue('fullName', result.data?.fullName);
      setValue('address', result.data?.address ?? '');
      setValue('age', result.data?.age);
      if (result.data?.dateOfBirth) {
        setValue('dateOfBirth', new Date(result.data?.dateOfBirth));
      }
      // console.log();
      setValue('phoneNumber', result.data?.phoneNumber ?? '');
      setValue('numOfPPC', result.data?.numOfPPC);
      setAvatar(result.data?.avatar);
      setIdentityCard(result.data?.identityCard);
      setCertificate(result.data?.certificate);
    };
    getProfile();
  }, [reLoad]);

  //todo: upload avatar
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    setAvatar(data);
  };

  //todo: upload identity card
  const handleUploadCard = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    const cardImg = document.querySelector('#card-img');
    cardImg.src = data;
    setIdentityCard(data);
    const Bs_Image = document.querySelector('#BsCloudUploadFill');
    Bs_Image.setAttribute('visibility', 'hidden');
    const Text_cmnd = document.querySelector('#cmnd_cccd');
    Text_cmnd.setAttribute('visibility', 'hidden');
  };

  //todo: upload certificate
  //todo: upload identity card
  const handleUploadCertificate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    const certiImg = document.querySelector('#certi-img');
    certiImg.src = data;
    setCertificate(data);
  };

  //* Handle before submit data to create new Medicine
  const handleSubmitProfile = async (dataForm) => {
    const { name, fullName, gender, address, age, dateOfBirth, phoneNumber, numOfPPC } = dataForm;
    const bodyRequest = {
      name,
      fullName,
      gender,
      address,
      age,
      dateOfBirth,
      phoneNumber,
      numOfPPC,
      avatar,
      certificate,
      identityCard,
    };
    const result = await updateProfileServices(axiosWithToken, bodyRequest);
    if (result.status === 200) {
      toast.success('Cập nhật thông tin thành công!');
      setReload(!reLoad);
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật thông tin!');
    }
  };

  return (
    <div className="h-full w-full bg-white rounded-xl px-8 py-5 relative">
      <form className="h-full w-full" onSubmit={handleSubmit(handleSubmitProfile)}>
        <div className="flex">
          <div className="w-3/5 pr-24">
            <h1 className="text-text_primary text-h3 font-bold mb-2">Thông tin cá nhân</h1>
            <p className="text-h6 text-text_blur font-semibold leading-tight mb-7">
              Điền những thông tin cần thiết vào những ô còn trống dưới đây.
              <br />
              Bạn có thể thay đổi thông tin bất cứ khi nào bạn muốn.
            </p>

            <p className="text-text_primary font-medium">Email</p>
            <input
              type="text"
              className="border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2"
              defaultValue={profile?.email ?? ''}
              disabled
            />
          </div>

          <div className="w-2/5">
            <div className="flex justify-center items-center">
              <div
                className={classNames(
                  'h-[170px] w-[170px] rounded-full border-[3px] border-black/70 bg-cover relative',
                )}
                style={{ backgroundImage: `url(${avatar})` }}
              >
                <div
                  className="bg-primary hover:bg-dark_primary/80 active:bg-dark_primary rounded-full p-2 absolute right-1 bottom-1 border-2 border-white"
                  onClick={() => document.querySelector('#upload-avatar').click()}
                >
                  <BsPencilSquare size={25} className="text-white" />
                  <input
                    id="upload-avatar"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleUploadAvatar(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="flex w-3/5">
            <div className="w-1/5 pr-10">
              <p className="text-text_primary font-medium">Tên</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.name?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('name')}
              />
            </div>
            <div className="w-2/5 pr-10">
              <p className="text-text_primary font-medium">Tên đầy đủ</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.fullName?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('fullName')}
              />
            </div>
            <div className="w-2/5 pr-24">
              <p className="text-text_primary font-medium">Giới tính</p>
              <input
                id="radio-gender-male"
                type="radio"
                name="gender"
                value={true}
                className="mr-2"
                {...register('gender')}
                defaultChecked={profile?.gender}
              />
              Nam
              <input
                id="radio-gender-female"
                type="radio"
                name="gender"
                value={false}
                className="ml-5 mr-2"
                {...register('gender')}
                defaultChecked={!profile?.gender}
              />
              Nữ
            </div>
          </div>

          {profile?.role && profile.role !== 'USER' && (
            <div className="w-2/5">
              <div>
                <p className="text-text_primary font-medium">Số chứng chỉ hành nghề dược</p>
                <input
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  )}
                  {...register('numOfPPC')}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex mt-5">
          <div className="w-3/5">
            <div className="pr-24">
              <p className="text-text_primary font-medium">Địa chỉ thường trú</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.address?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('address')}
              />
            </div>

            <div className="flex pr-24 mt-5">
              <div className="w-1/6 pr-8" hidden>
                <p className="text-text_primary font-medium">Tuổi</p>
                <input
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.age?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  {...register('age')}
                />
              </div>
              <div className="w-1/3 pr-8">
                <p className="text-text_primary font-medium">Ngày sinh</p>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <DatePicker
                      className="border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2"
                      selected={field?.value}
                      onChange={(date) => {
                        return field.onChange(date);
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      maxDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                    />
                  )}
                />
              </div>
              <div className="w-1/2">
                <p className="text-text_primary font-medium">Số điện thoại</p>
                <input
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.phoneNumber?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  {...register('phoneNumber')}
                />
              </div>
            </div>
          </div>

          {profile?.role && profile.role !== 'USER' && (
            <div className="w-2/5 flex">
              {/* IdetityCard */}
              <div className="w-1/2">
                <p className="text-text_primary font-medium">CMND hoặc CCCD</p>
                <div
                  id="card-form"
                  className="h-[150px] w-[220px] bg-light_gray border-dashed border-2 border-text_blur rounded-xl flex flex-col justify-center items-center mt-2 relative cursor-pointer"
                  onClick={() => document.querySelector('#upload-card').click()}
                >
                  <div>
                    {!identityCard && (
                      <>
                        <BsCloudUploadFill
                          className="text-dark_primary hover:text-dark_primary/80 active:text-dark_primary text-center mx-auto"
                          size={50}
                        />
                        <p className="text-h5 text-dark_primary">Nhấn vào đây để thêm ảnh</p>
                      </>
                    )}
                    <input id="upload-card" type="file" accept="image/*" hidden onChange={(e) => handleUploadCard(e)} />
                    <img
                      id="card-img"
                      src={identityCard}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      hidden={identityCard ? false : true}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              {/* Certificate */}
              <div className="w-1/2 ml-5">
                <p className="text-text_primary font-medium">Bằng cấp</p>
                <div
                  id="certificate-form"
                  className="h-[150px] w-[220px] bg-light_gray border-dashed border-2 border-text_blur rounded-xl flex flex-col justify-center items-center mt-2 relative cursor-pointer"
                  onClick={() => document.querySelector('#upload-certificate').click()}
                >
                  {!certificate && (
                    <>
                      <BsCloudUploadFill
                        className="text-dark_primary hover:text-dark_primary/80 active:text-dark_primary text-center mx-auto"
                        size={50}
                      />
                      <p className="text-h5 text-dark_primary">Nhấn vào đây để thêm ảnh</p>
                    </>
                  )}
                  <input
                    id="upload-certificate"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleUploadCertificate(e)}
                  />
                  <img
                    id="certi-img"
                    src={certificate}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    hidden={certificate ? false : true}
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-1/2 mt-10 justify-start">
          <Button type={'submit'} styleBtn={'solid'} size={'medium'} width={120}>
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ManageProfile;
