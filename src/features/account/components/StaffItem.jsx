function UserItem({ avatar, fullName, email }) {
  return (
    <div className="bg-white h-full w-11/12 mx-auto flex flex-shrink-0 p-0">
      <div className="flex w-3/12 justify-center items-center">
        <img src={avatar} alt="avatar" className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
      </div>

      <div className="flex flex-col w-6/12">
        <div className="flex h-1/2 truncate">
          <div className="text-h6 font-medium text-black">{fullName}</div>
        </div>
        <div className="flex h-1/2 truncate">
          <div className="text-h8 text-text_blur">{email}</div>
        </div>
      </div>

      <div className="flex w-3/12 items-center justify-center flex-shrink-0">
        <p className="bg-secondary/30 rounded-md flex text-[11px] py-1 w-full items-center justify-center text-text_primary shadow-sm font-medium">
          Nhân viên
        </p>
      </div>
    </div>
  );
}

export default UserItem;
