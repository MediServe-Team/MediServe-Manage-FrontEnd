import { motion } from 'framer-motion';
import classNames from 'classnames';
import logo from '../assets/images/logo-full.png';
import background from '../assets/images/login-background.png';

function Login() {
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
            <img src={logo} className="h-[50px]" />
          </div>

          {/* Divider */}
          <div className="flex justify-between items-center gap-3 mt-8">
            <div className="border-white border-[1px] flex-1"></div>
            <span className="text-white">Tài khoản quản lý</span>
            <div className="border-white border-[1px] flex-1"></div>
          </div>

          {/* form submit */}
          <form action="#" className="mx-5">
            <div className="flex flex-col gap-4 mt-8">
              <input type="email" className="h-12 px-4 rounded-md" placeholder="Nhập email .." />
              <input type="password" className="h-12 px-4 rounded-md" placeholder="Nhập mật khẩu .." />
              <a href="#" className="text-white">
                Quên mật khẩu?
              </a>
            </div>
            <div className="mt-10">
              <button className="bg-dark_primary h-12 w-full rounded-md text-white">Đăng nhập</button>
            </div>
          </form>
          <p className="text-white text-center mt-10">
            Liên hệ{' '}
            <a href="#">
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
