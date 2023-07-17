import { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { updateProfileSchema } from '../../../validations/updateProfile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { Button } from '../../../components';
import { updateProfileServices } from '../profileServices';
import { toast } from 'react-toastify';
//react router
import { useSelector, useDispatch } from 'react-redux';
// import { getProfileData } from '../profileSlice';
// import { getProfile } from '../profileSlice';
import { useAxiosWithToken } from '../../../hooks';
import { getProfileServices } from '../profileServices';

function CustomerProfile() {
  const profile = useSelector(getProfileData);
  const [phone, setPhone] = useState(profile?.phoneNumber);
  const token = useSelector((state) => state.auth?.accessToken);
  const dispatch = useDispatch();
  const axiosWithToken = useAxiosWithToken();

  //* use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(updateProfileSchema) });

  const handlePhoneNumber = (event) => {
    if (/^[0-9]*$/.test(event.target.value)) {
      setPhone(event.target.value);
    } else {
      return;
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const result = await getProfileServices(axiosWithToken);
      console.log(result);
    };
    getProfile();
  }, []);

  //* Handle before submit data to create new Medicine
  const handleSubmitProfile = async (dataForm) => {
    const { name, fullName, gender, age, phoneNumber, address } = dataForm;
    const bodyRequest = {
      name,
      fullName,
      gender,
      age,
      phoneNumber,
      address,
      dateOfBirth: profile.dateOfBirth,
      avatar: profile.avatar,
      certificate: profile.certificate,
      identityCard: profile.identityCard,
      numOfPPC: profile.numOfPPC,
    };

    const result = await updateProfileServices(token, bodyRequest);
    if (result.status === 200) {
      toast.success('Cập nhật thông tin thành công!').then(dispatch(getProfile(token)));
    } else {
      toast.error('Hệ thống gặp sự cố khi cập nhật thông tin!');
    }
  };

  return (
    <div className="h-full w-full bg-white rounded-xl px-14 py-5 relative">
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
            <div className="bg-orange-50 rounded-xl border-slate-400 border-solid border-2 h-[210px] py-2 px-3 relative">
              <h1 className="font-bold text-h4 text-dark_primary mb-2">Ảnh hồ sơ</h1>
              <div>
                <img className="h-[120px] mx-auto" src="https://i.ibb.co/cDz1NGp/86.jpg" alt="Failed" />
                <button className=" bg-primary hover:bg-dark_primary/80 active:bg-dark_primary rounded-full p-2 absolute right-24 bottom-6">
                  <BsPencilSquare className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-3">
          <div className="flex w-3/5">
            <div className="w-1/3 pr-14">
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
            <div className="w-2/3 pr-24">
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
          </div>

          <div className="w-2/5">
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
            <div className="flex pr-24 mt-7">
              <div className="w-1/6 pr-8">
                <p className="text-text_primary font-medium">Tuổi</p>
                <input
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.age?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  {...register('age')}
                  defaultValue={profile?.age}
                />
              </div>
              <div className="w-1/3 pr-8">
                {/* <p className="text-text_primary font-medium">Ngày sinh</p>
                <input
                  type="date"
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.dateOfBirth?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  {...register('dateOfBirth')}
                  defaultValue={dateOfBirth}
                /> */}
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
          </div>

          <div className="w-2/5">
            {/* <div>
              <p className="text-text_primary font-medium">Mật khẩu mới</p>
              <input
                type="password"
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.password?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('password')}
              />
            </div>
            <div className="mt-7">
              <p className="text-text_primary font-medium">Nhập lại mật khẩu mới</p>
              <input
                type="password"
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.passwordRepeated?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('passwordRepeated')}
              />
            </div> */}
            {/* <div className="mt-7">
            <p className="text-text_primary font-medium">Số điểm tích lũy</p>
            <input type="text" />
          </div> */}
          </div>
        </div>

        <div className="flex mt-5">
          <div className="w-3/5"></div>
          <div className="flex w-2/5 justify-end items-end">
            <Button type={'submit'} styleBtn={'solid'} size={'medium'} width={150}>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerProfile;
