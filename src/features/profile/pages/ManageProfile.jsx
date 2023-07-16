import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewBreadcrumb, removeLastBreadcrumb } from '../../../slices/breadcrumbSlice';
import { getProfile } from '../profileSlice';
import { getProfileData } from '../profileSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateProfileServices } from '../profileServices';
import { updateProfileSchema } from '../../../validations/updateProfile';
import { toast } from 'react-toastify';
import { BsPencilSquare, BsCloudUploadFill } from 'react-icons/bs';
import classNames from 'classnames';
import { Button } from '../../../components';
import getBase64 from '../../../helpers/getBase64';

export default function ManageProfile() {
  const token = useSelector((state) => state.auth?.accessToken);
  const role = useSelector((state) => state.auth?.user?.role);
  const profile = useSelector(getProfileData);
  const [phone, setPhone] = useState(profile?.phoneNumber);
  const [age, setAge] = useState(profile?.age);
  const [dob, setDob] = useState('');
  const [numOfPPC, setNumOfPPC] = useState(profile?.numOfPPC);
  const [avatar, setAvatar] = useState(profile?.avatar);
  const [certi, setCerti] = useState(profile?.certificate);
  const [card, setCard] = useState(profile?.identityCard);

  const changeToDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    const result = [year, month, day].join('-');
    return result;
  };

  const changeToISO = (date) => {
    const result = date.toISOString();
    return result;
  };

  // addBreadcrumb
  const dispatch = useDispatch();
  useEffect(() => {
    setDob(changeToDate(profile?.dateOfBirth));
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

  //* use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateProfileSchema) });

  const handlePhoneNumber = (event) => {
    if (/^[0-9]*$/.test(event.target.value)) {
      setPhone(event.target.value);
    } else {
      return;
    }
  };

  const calAge = (dobi) => {
    const today = new Date();
    const birthDate = new Date(dobi);
    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now = age_now - 1;
    }
    setAge(age_now);
  };

  const changeDob = (value) => {
    setDob(value);
    calAge(dob);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    setAvatar(data);
  };

  const handleUploadCertificate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    if (!certi) {
      const certiArea = document.querySelector('#certificate-form');
      const certiImg = document.createElement('img');
      certiImg.src = data;
      certiImg.id = 'certi-img';
      certiImg.style = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;';
      certiArea.appendChild(certiImg);
    } else {
      const certiImg = document.querySelector('#certi-img');
      certiImg.src = data;
    }
    setCerti(data);
  };

  const handleUploadCard = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // convert file to base64
    const data = await getBase64(file);
    if (!card) {
      const cardArea = document.querySelector('#card-form');
      const cardImg = document.createElement('img');
      cardImg.src = data;
      cardImg.id = 'card-img';
      cardImg.style = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;';
      cardArea.appendChild(cardImg);
    } else {
      const cardImg = document.querySelector('#card-img');
      cardImg.src = data;
    }
    setCard(data);
  };

  //* Handle before submit data to create new Medicine
  const handleSubmitProfile = async (dataForm) => {
    const { name, fullName, gender, phoneNumber, address } = dataForm;
    const dd = changeToISO(new Date(dob));
    if (numOfPPC === '') return;

    const bodyRequest = {
      name,
      fullName,
      gender,
      age: age,
      phoneNumber,
      address,
      dateOfBirth: dd,
      avatar: avatar,
      certificate: certi,
      identityCard: card,
      numOfPPC: numOfPPC,
    };

    const result = await updateProfileServices(token, bodyRequest);
    if (result.status === 200) {
      toast.success('Cập nhật thông tin thành công!');
      dispatch(getProfile(token));
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật thông tin!');
      //console.log(result);
    }
  };

  // const renderProfile = (role) => {
  //   if (role === 'USER') return <CustomerProfile />;
  //   else if (role === 'STAFF') return <StaffProfile />;
  //   else if (role === 'ADMIN') return <AdminProfile />;
  // };
  return (
    <div className="h-full w-full bg-white rounded-xl px-8 py-5 relative">
      <form className="h-full w-full" onSubmit={handleSubmit(handleSubmitProfile)}>
        <div className="flex">
          <div className="w-3/5 pr-24">
            <h1 className="text-dark_primary text-h3 font-bold mb-2">Thông tin cá nhân</h1>
            <p className="text-h6 text-text_blur font-semibold leading-tight mb-7">
              Điền những thông tin cần thiết vào những ô còn trống dưới đây.
              <br />
              Bạn có thể thay đổi thông tin bất cứ khi nào bạn muốn.
            </p>

            <p className="text-text_primary font-medium">Email</p>
            <input
              type="text"
              className="border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2"
              defaultValue={profile.email}
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
                    onChange={(e) => handleUploadImage(e)}
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
                defaultValue={profile.name}
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
                defaultValue={profile.fullName}
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
                defaultChecked={profile.gender}
              />
              Nam
              <input
                id="radio-gender-female"
                type="radio"
                name="gender"
                value={false}
                className="ml-5 mr-2"
                {...register('gender')}
                defaultChecked={!profile.gender}
              />
              Nữ
            </div>
          </div>

          <div className="w-2/5">
            <div>
              <p className="text-text_primary font-medium">Số chứng chỉ hành nghề dược</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  numOfPPC === '' ? 'border-danger' : 'border-text_primary/20',
                )}
                value={numOfPPC}
                onChange={({ target }) => {
                  setNumOfPPC(target.value);
                }}
              />
            </div>
          </div>
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
                defaultValue={profile.address}
              />
            </div>

            <div className="flex pr-24 mt-5">
              <div className="w-1/6 pr-8">
                <p className="text-text_primary font-medium">Tuổi</p>
                <input
                  className="border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2"
                  value={age}
                  disabled
                />
              </div>
              <div className="w-1/3 pr-8">
                <p className="text-text_primary font-medium">Ngày sinh</p>
                <input
                  type="date"
                  className="border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2"
                  value={dob}
                  onChange={({ target }) => {
                    changeDob(target.value);
                  }}
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
                  value={phone}
                  onChange={handlePhoneNumber}
                />
              </div>
            </div>

            <div className="flex pr-24 mt-5">
              <div className="w-1/2 pr-8">
                <p className="text-text_primary font-medium">Mật khẩu mới</p>
                <input
                  type="text"
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.password?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  //value={curr_ava}
                  //{...register('password')}
                />
              </div>
              <div className="w-1/2">
                <p className="text-text_primary font-medium">Nhập lại mật khẩu mới</p>
                <input
                  type="password"
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.passwordRepeated?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  //{...register('passwordRepeated')}
                />
              </div>
            </div>
          </div>

          <div className="w-2/5 flex">
            <div className="w-1/2">
              <p className="text-text_primary font-medium">CMND hoặc CCCD</p>
              <div
                id="card-form"
                className="h-[150px] w-[220px] bg-light_gray border-dashed border-2 border-text_blur rounded-xl flex flex-col justify-center items-center mt-2 relative cursor-pointer"
                onClick={() => document.querySelector('#upload-card').click()}
              >
                <BsCloudUploadFill
                  className="text-dark_primary hover:text-dark_primary/80 active:text-dark_primary text-center mx-auto"
                  size={50}
                />
                <p className="text-h5 text-dark_primary">Nhấn vào đây để thêm ảnh</p>
                <input id="upload-card" type="file" accept="image/*" hidden onChange={(e) => handleUploadCard(e)} />
              </div>
            </div>

            <div className="w-1/2 ml-5">
              <p className="text-text_primary font-medium">Bằng cấp</p>
              <div
                id="certificate-form"
                className="h-[150px] w-[220px] bg-light_gray border-dashed border-2 border-text_blur rounded-xl flex flex-col justify-center items-center mt-2 relative cursor-pointer"
                onClick={() => document.querySelector('#upload-certificate').click()}
              >
                <BsCloudUploadFill
                  className="text-dark_primary hover:text-dark_primary/80 active:text-dark_primary text-center mx-auto"
                  size={50}
                />
                <p className="text-h5 text-dark_primary">Nhấn vào đây để thêm ảnh</p>
                <input
                  id="upload-certificate"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleUploadCertificate(e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-3/5"></div>
          <div className="flex w-2/5 justify-end items-end">
            <Button type={'submit'} styleBtn={'solid'} size={'medium'} width={120}>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
