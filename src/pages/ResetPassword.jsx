import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/images/logo-full.png';
import background from '../assets/images/login-background.png';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { resetPasswordService } from '../services/accountServices';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
    } else {
      const result = await resetPasswordService(token, password);
      if (result.status === 200) {
        toast.success('Đổi mật khẩu thành công!');
        navigate('/login');
      } else if (result.status === 401) {
        toast.error('Đã hết thời gian làm mới mật khẩu');
      } else {
        toast.error('Đổi mật khẩu thất bại');
      }
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <img className="w-full h-full object-cover" src={background} alt="Ảnh dược sỹ" />
      <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-black/20">
        {/* Form modal forgot pass */}
        <div className="w-[400px] p-6 bg-white rounded-md shadow-md m-auto">
          <h2 className="text-2xl font-semibold mb-6">Đổi khẩu mới</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-md"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-2 border rounded-md"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
