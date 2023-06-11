import Button from '../../../components/Button';

function UserItem() {
  return (
    <Button className="bg-white h-1/6 w-11/12 rounded-2xl mx-auto flex flex-shrink-0 px-0" padding={0}>
      <div className="flex w-3/12 justify-center items-center">
        <div className="bg-[url('https://s3-alpha-sig.figma.com/img/711e/d2ed/22f41791a0dd8909af17f46dbccd8af8?Expires=1685923200&Signature=Df8uzSuQIW4cCzWheeEP6~zX9~~kTUXwRMI0VxZbii6FVFsUQlbaE~G6K3WHzQWHPAVZ7Dqeeh9x67BU2LT-uLA8QoRJLe35jgEP7X~mkSsYRzjq-NVZ4Ngi664ssb56eCMaV91WHVyKQ7oLf34ZArNon6l3B6C0nLFqFzYgvqvt~vydSdhqE8DDIHJUO1lr5PBmZWNx~a4OaBGC8nAwEttn96PrrxMk8wj~2cg43zH~GvKYbctogPw5GXe-d4QgKpt5ekmQmXqJWPYJQ1QrD-HcmqEt2KYe8X8~gBh0xL78ZCJ6KfpNPUs9Wmz4~7ZTe00tb8DXraicYGxDXDdszw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')] bg-cover h-9 w-9 rounded-full"></div>
      </div>

      <div className="flex flex-col w-6/12">
        <div className="flex h-1/2 truncate">
          <div className="text-h6 font-medium text-black">Trần Minh Quang</div>
        </div>
        <div className="flex h-1/2 truncate">
          <div className="text-h8 text-text_blur">quang@gmail.com</div>
        </div>
      </div>

      <div className="flex w-3/12 items-center justify-center flex-shrink-0">
        <p className="bg-secondary/30 rounded-md flex text-[11px] py-1 w-full items-center justify-center text-black">
          Nhân viên
        </p>
      </div>
    </Button>
  );
}

export default UserItem;
