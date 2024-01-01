import classNames from 'classnames';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-full.png';
import background from '../assets/images/login-background.png';
import { toast } from 'react-toastify';
import { forgotPasswordService } from '../services/accountServices';

import { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPasswordService(email);
    if (result.status === 200) {
      toast.success('Thông tin đổi mật khẩu đã gửi về mail!');
    } else {
      toast.error('Email không tồn tại trên hệ thống!');
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <img className="w-full h-full object-cover" src={background} alt="Ảnh dược sỹ" />
      <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-black/20">
        {/* Form modal forgot pass */}
        <div className="w-[400px] p-6 bg-white rounded-md shadow-md m-auto">
          <div className="flex justify-center mt-3 mb-5">
            <img src={logo} className="h-[50px]" alt="Mediicine" />
          </div>
          <h2 className="text-[20px] text-center font-semibold mb-6">Quên mật khẩu</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className=" pb-3">
              <Link to="http://localhost:3000/login" className="text-blue-600">
                Quay lại đăng nhập
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Gửi mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
