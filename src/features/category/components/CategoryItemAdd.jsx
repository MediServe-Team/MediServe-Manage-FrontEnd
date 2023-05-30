import { color } from 'framer-motion';
import { BsCapsule, BsPlusSquareFill } from 'react-icons/bs';
import CustomSwitch from '../components/CustomSwitch';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function CategotyItemAdd({ order }) {
  let stylesColor;
  switch (order % 3) {
    case 0:
      stylesColor = '#38B3E1';
      break;
    case 1:
      stylesColor = '#EE9717';
      break;
    default:
      stylesColor = '#02D09E';
      break;
  }

  const darkBlue = '#064861',
    red = '#D41919';

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedValue, setSelectedValue] = useState('drug');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="bg-white h-[87px] w-full rounded-lg mx-auto flex border-[2px]" style={{ borderColor: stylesColor }}>
      <Button onClick={handleClickOpen} className="w-full">
        <p className="w-1/6 flex justify-center items-center text-h1" style={{ color: stylesColor }}>
          +
        </p>
        <p className="text-h6 flex items-center justify-start w-5/6" style={{ color: stylesColor }}>
          Thêm danh mục
        </p>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        {/* Title */}
        <DialogTitle className="flex ">
          <span className="text-blue_dark my-auto">
            <BsPlusSquareFill />
          </span>
          <span className="text-blue_dark font-semibold ml-3">Thêm Danh Mục</span>
        </DialogTitle>
        {/* Underline */}
        <div className="border-b-2 border-blue_dark/60 w-11/12 mx-auto"></div>
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

export default CategotyItemAdd;
