import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator({ className }) {
  return (
    <Select
      placeholder="Giới tính"
      indicator={<KeyboardArrowDown />}
      sx={{
        [`&.${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
      className={className}
    >
      <Option value="Male">Nam</Option>
      <Option value="Female">Nữ</Option>
    </Select>
  );
}
