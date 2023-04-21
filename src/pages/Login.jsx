import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../features/Auth/AuthSlice';
import { getUserId } from '../features/Auth/AuthSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/Login';
import logo from '../assets/images/logo-full.png';
import background from '../assets/images/login-background.png';

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get userId from auth global state
  const userId = useSelector(getUserId);

  // Check user login success
  useEffect(() => {
    if (userId) navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSubmitLogin = async (dataForm) => {
    const { email, password } = dataForm;
    const responseData = await dispatch(loginAction({ email, password }));

    if (responseData.type === 'auth/login/fulfilled') {
      if (responseData.payload.status === 200) {
        clearErrors('password');
      } else if (responseData.payload.status === 401) {
        setError('password', { message: 'Đăng nhập sai email hoặc mật khẩu' });
      } else {
        setError('password', { message: 'Đăng nhập thất bại' });
      }
    }
  };

  return (
    <div className={classNames(`w-screen h-screen relative`)}>
      <img className="w-full h-full object-cover" src={background} alt="Ảnh dược sỹ" />
      <div className="flex justify-between items-center absolute top-0 left-0 right-0 bottom-0">
        <div className="h-full w-1/4 bg-black opacity-20"></div>
        {/* Login form */}
        <motion.div
          className="w-[360px] h-[540px] bg-[#75ABD2]/50 backdrop-blur-md  rounded-3xl shadow-2xl"
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex justify-center mt-8">
            <img src={logo} className="h-[50px]" alt="Mediicine" />
          </div>

          {/* Divider */}
          <div className="flex justify-between items-center gap-3 mt-8">
            <div className="border-white border-[1px] flex-1"></div>
            <span className="text-white">Tài khoản quản lý</span>
            <div className="border-white border-[1px] flex-1"></div>
          </div>

          {/* form submit */}
          <form onSubmit={handleSubmit(handleSubmitLogin)} className="mx-5">
            <div className="flex flex-col gap-4 mt-8">
              <input type="email" {...register('email')} className="h-12 px-4 rounded-md" placeholder="Nhập email .." />
              <p className="text-body-sm text-red-700">{errors.email?.message}</p>
              <input
                type="password"
                {...register('password')}
                className="h-12 px-4 rounded-md"
                placeholder="Nhập mật khẩu .."
              />
              <p className="text-body-sm text-red-700">{errors.password?.message}</p>
              <Link to="http://localhost:3000/forgot-password" className="text-white">
                Quên mật khẩu?
              </Link>
            </div>

            <div className="mt-10">
              <button className="bg-dark_primary h-12 w-full rounded-md text-white">Đăng nhập</button>
            </div>
          </form>
          <p className="text-white text-center mt-10">
            Liên hệ{' '}
            <a href="https://www.facebook.com/phuc.hoangvan.77736" target="_blank" rel="noreferrer">
              <u className="font-bold">quản trị viên</u>
            </a>{' '}
            để nhận hỗ trợ!
          </p>
        </motion.div>

        <div className="h-full w-1/4 bg-black opacity-20"></div>
      </div>
    </div>
  );
}

export default Login;
