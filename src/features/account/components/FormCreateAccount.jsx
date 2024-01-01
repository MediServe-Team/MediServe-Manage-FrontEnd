import { Button } from '../../../components';
import DatePicker from 'react-datepicker';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountSchema } from '../../../validations/createAccount';
import classNames from 'classnames';
// services
import { useAxiosWithToken } from '../../../hooks';
import { createAccountService } from '../../../services/accountServices';
import { toast } from 'react-toastify';

function FormCreateAccount({ onClose, reloadParentPage }) {
  const axiosWithToken = useAxiosWithToken();
  //* form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createAccountSchema) });

  //* Handle create new account
  const handleCreateAccount = async (dataForm) => {
    const result = await createAccountService(axiosWithToken, dataForm);
    if (result.status === 409) {
      toast.error('Email này đã tồn tại trên hệ thống!');
    } else if (result.status === 201) {
      toast.success('Tạo tài khoản thành công!');
      //* handle close modal & reload parent page
      onClose();
      reloadParentPage((prevState) => !prevState);
    } else {
      toast.error('Hệ thống gặp vấn đề khi tạo tài khoản');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateAccount)}>
      <div className="flex flex-col gap-7 px-6 h-[86%]">
        <div className="flex pt-3 gap-16">
          <div className="w-1/2 flex flex-col gap-5 text-h6 min-w-0">
            <span className="text-h5 font-semibold">Thông tin cá nhân</span>
            {/* Field name */}
            <div className="flex flex-col">
              <p className="text-text_primary font-medium">Tên</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.name?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('name')}
              />
            </div>
            {/* Field fullName */}
            <div className="flex flex-col">
              <p className="text-text_primary font-medium">Tên đầy đủ</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.fullName?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('fullName')}
              />
            </div>
            {/* Field Age */}
            <div className="flex gap-5">
              {/* <div className="flex flex-col flex-1">
                <p className="text-text_primary font-medium">Tuổi</p>
                <input
                  className={classNames(
                    'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                    errors.age?.message ? 'border-danger' : 'border-text_primary/20',
                  )}
                  {...register('age')}
                />
              </div> */}

              {/* Field dateOfBirth */}
              <div className="flex flex-col flex-[3]">
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
                      showYearDropdown
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-5 text-h6 min-w-0">
            <span className="text-h5 font-semibold">Thông tin liên hệ</span>
            {/* Field phoneNumber */}
            <div className="flex flex-col">
              <p className="text-text_primary font-medium">Số điện thoại</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.phoneNumber?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('phoneNumber')}
              />
            </div>
            {/* Field email */}
            <div className="flex flex-col">
              <p className="text-text_primary font-medium">Email</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.email?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('email')}
              />
            </div>
            {/* Field address */}
            <div className="flex flex-col">
              <p className="text-text_primary font-medium">Địa chỉ</p>
              <input
                className={classNames(
                  'border-2 w-full h-[40px] outline-none rounded-md focus:border-text_primary transition-all duration-200 px-2',
                  errors.address?.message ? 'border-danger' : 'border-text_primary/20',
                )}
                {...register('address')}
              />
            </div>
          </div>
        </div>
        {/* Field Role */}
        <div className="flex flex-col gap-2">
          <span className="text-h5 font-semibold">Vai trò</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="radio-role-customer"
                name="role-account"
                value={'USER'}
                defaultChecked
                {...register('role')}
              />
              <label htmlFor="radio-role-customer">Tài khoản khách hàng</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="radio" id="radio-role-staff" name="role-account" value={'STAFF'} {...register('role')} />
              <label htmlFor="radio-role-staff">Tài khoản nhân viên</label>
            </div>
          </div>
        </div>
      </div>
      {/* Button control */}
      <div className="flex h-full w-full">
        <div className="w-1/2 h-full flex items-center justify-start"></div>
        <div className="flex w-1/2 h-full justify-end items-end gap-4 mt-4">
          <Button type={'button'} size={'medium'} modifier={'danger'} width={120} onClick={() => onClose()}>
            Hủy bỏ
          </Button>
          <Button type={'submit'} size={'medium'} modifier={'dark-primary'} width={120}>
            Tạo ngay
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FormCreateAccount;
