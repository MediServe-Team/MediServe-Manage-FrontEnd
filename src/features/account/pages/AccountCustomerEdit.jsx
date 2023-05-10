function AccountCustomerEdit() {
  return (
    <div className="h-[526px] w-full bg-white rounded-xl px-6 py-2 relative">
      <div className="flex">
        <div className="w-3/5 pr-24">
          <h1 className="text-dark_primary text-h4 font-bold mb-2">Thông tin cá nhân</h1>
          <p className="text-[13px] text-text_blur font-semibold leading-tight mb-4">
            Điền những thông tin cần thiết vào những ô còn trống dưới đây.
            <br />
            Bạn có thể thay đổi thông tin bất cứ khi nào bạn muốn.
          </p>

          <p className="titleInputProfile">Email</p>
          <input type="email" className="inputProfile" placeholder="Ex:username@gmail.com" />
        </div>

        <div className="w-2/5">
          <div className="bg-orange-50 rounded-xl border-slate-400 border-solid border-2 h-[170px] py-2 px-3 relative">
            <h1 className="font-bold text-h5 text-dark_primary mb-2">Ảnh hồ sơ</h1>
            <div>
              <img className="h-[100px] mx-auto" src="https://i.ibb.co/cDz1NGp/86.jpg" alt="Failed" />
              <button className="fa-solid fa-pen-to-square bg-primary text-white rounded-full p-2 absolute right-24 bottom-3"></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-3">
        <div className="flex w-3/5">
          <div className="w-1/3 pr-14">
            <p className="titleInputProfile">Tên</p>
            <input className="inputProfile" />
          </div>
          <div className="w-2/3 pr-24">
            <p className="titleInputProfile">Tên đầy đủ</p>
            <input className="inputProfile" />
          </div>
        </div>
        <div className="w-2/5 pr-24">
          <p className="titleInputProfile">Số điểm tích lũy</p>
          <input className="inputProfile" />
        </div>
      </div>

      <div className="flex mt-5">
        <div className="w-3/5">
          <div className="pr-24">
            <p className="titleInputProfile">Địa chỉ thường trú</p>
            <input className="inputProfile" />
          </div>
          <div className="flex pr-24 mt-3">
            <div className="w-1/6 pr-8">
              <p className="titleInputProfile">Tuổi</p>
              <input className="inputProfile" />
            </div>
            <div className="w-1/3 pr-8">
              <p className="titleInputProfile">Ngày sinh</p>
              <input className="inputProfile" />
            </div>
            <div className="w-1/2">
              <p className="titleInputProfile">Số điện thoại</p>
              <input className="inputProfile" />
            </div>
          </div>
        </div>

        <div className="w-2/5"></div>
      </div>

      <div className="flex mt-5">
        <div className="w-3/5">
          <div className="flex pr-24">
            <div className="w-1/3 pr-8">
              <p className="titleInputProfile">Giới tính</p>
              <input type="radio" name="gender" value="Male" className="mr-2" />
              Nam
              <input type="radio" name="gender" value="Female" className="ml-5 mr-2" />
              Nữ
            </div>
            <div className="w-2/3">
              <p className="titleInputProfile">Mật khẩu</p>
              <input className="inputProfile" />
            </div>
          </div>
        </div>

        <div className="flex w-2/5 justify-end items-end">
          <button className="btnProfile px-10 py-2 absolute bottom-4 right-6">Lưu</button>
        </div>
      </div>
    </div>
  );
}

export default AccountCustomerEdit;
