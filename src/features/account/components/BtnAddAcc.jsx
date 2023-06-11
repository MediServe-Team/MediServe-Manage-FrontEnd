import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CustomSwitch from '../../category/components/CustomSwitch';
import { BsPlusSquareFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { useState } from 'react';

function BtnAddAcc() {
  const [open, setOpen] = useState(false);

  const darkBlue = '#064861',
    red = '#D41919';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-white h-1/2 w-3/4 rounded-lg mx-auto flex border-[2px] border-dark_primary">
      <Button
        onClick={handleClickOpen}
        className="flex min-h-0 w-full"
        style={{ borderWidth: '3px', borderColor: '#1490BF' }}
      >
        <p className="flex justify-center items-center text-h1 text-dark_primary pr-2">+</p>
        <p className="text-h6 flex items-center justify-start text-dark_primary">Thêm tài khoản</p>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        {/* Title */}
        <DialogTitle className="flex ">
          <span className="text-text_primary my-auto">
            <BsPlusSquareFill />
          </span>
          <span className="text-text_primary font-semibold ml-3">Thêm Danh Mục</span>
        </DialogTitle>
        {/* Underline */}
        <div className="border-b-2 border-text_primary/60 w-11/12 mx-auto"></div>
        {/* Content */}
        <DialogContent className="text-center">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            style={{ width: '80%' }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Ghi chú"
            type="text"
            fullWidth
            variant="standard"
            style={{ width: '80%' }}
          />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            style={{ marginTop: '2rem' }}
            className="flex justify-center"
          >
            <span className="text-text_blur">Khác</span>
            <CustomSwitch defaultChecked />
            <span>Thuốc</span>
          </Stack>
        </DialogContent>
        {/* Footer */}
        <DialogActions style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
          <Button variant="outlined" onClick={handleClose} style={{ color: red, borderColor: red, borderWidth: 2 }}>
            Quay lại
          </Button>
          <Button variant="contained" onClick={handleClose} style={{ backgroundColor: darkBlue }}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BtnAddAcc;
