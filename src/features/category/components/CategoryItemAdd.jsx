import { color } from 'framer-motion';
import { BsCapsule, BsPlusSquareFill } from 'react-icons/bs';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function CategotyItemAdd(props) {
  const num = props.order;
  let colorVar = '';
  if (num % 3 === 1) {
    colorVar = '#38B3E1';
  } else if (num % 3 === 2) {
    colorVar = '#EE9717';
  } else {
    colorVar = '#02D09E';
  }

  let darkBlue = '#064861';

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
    <div className="bg-white h-[80px] w-[300px] rounded-lg mx-auto flex border-[2px]" style={{ borderColor: colorVar }}>
      <Button onClick={handleClickOpen} className="w-full">
        <p className="w-1/6 flex justify-center items-center text-h1" style={{ color: colorVar }}>
          +
        </p>
        <p className="text-h6 flex items-center justify-start w-5/6" style={{ color: colorVar }}>
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
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Tên danh mục" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Ghi chú" type="text" fullWidth variant="standard" />

          <FormControl style={{ marginTop: '1rem' }}>
            <RadioGroup name="controlled-radio-buttons-group" value={selectedValue} onChange={handleChange} row>
              <FormControlLabel value="drug" control={<Radio />} label="Thuốc" />
              <FormControlLabel value="notDrug" control={<Radio />} label="Khác thuốc" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        {/* Footer */}
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ color: darkBlue, borderColor: darkBlue, borderWidth: 2 }}
          >
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
