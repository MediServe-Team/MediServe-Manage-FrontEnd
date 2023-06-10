import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import { CgRemove } from 'react-icons/cg';
import { ItemRowIntoStockSchema } from '../../../validations/ItemRowIntoStock';
import formatToVND from '../../../helpers/formatToVND';

function ItemRow({ onRemove, ...props }, ref) {
  const {
    register,
    control,
    trigger,
    clearErrors,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(ItemRowIntoStockSchema) });

  useImperativeHandle(ref, () => ({
    getData: async () => {
      // trigger validate all field
      const passValidate = await trigger();
      if (passValidate) {
        clearErrors();
        const data = getValues();
        data.id = props.id;
        data.isMedicine = props.isMedicine;
        data.totalImportPrice = totalImportPrice;
        data.totalSellPrice = totalSellPrice;
        return data;
      }
      return null;
    },
  }));

  const quantity = watch('quantity', 0);
  const specificate = watch('specification', 0);
  const importPrice = watch('importPrice', 0);
  const sellPrice = watch('sellPrice', 0);
  const [totalImportPrice, setTotalImportPrice] = useState(0);
  const [totalSellPrice, setTotalSellPrice] = useState(0);

  const [totalQnt, setTotalQnt] = useState(0);
  // calc total quantity
  useEffect(() => {
    if (isNaN(quantity) || isNaN(specificate)) setTotalQnt(0);
    else {
      const total = quantity * specificate;
      setTotalQnt(total);
    }
  }, [quantity, specificate]);
  // cacl total price
  useEffect(() => {
    if (!isNaN(totalQnt)) {
      if (isNaN(importPrice)) setTotalImportPrice(0);
      else {
        const totalImport = importPrice * totalQnt;
        setTotalImportPrice(totalImport);
      }
      if (isNaN(sellPrice)) setTotalSellPrice(0);
      else {
        const totalSell = sellPrice * totalQnt;
        setTotalSellPrice(totalSell);
      }
    } else {
      setTotalImportPrice(0);
      setTotalSellPrice(0);
    }
  }, [importPrice, sellPrice, totalQnt]);

  return (
    <li className="flex justify-between items-center gap-2 bg-slate-50 px-5 py-2 border-2 rounded-lg">
      {/* form data ItemRow */}
      <form className="flex flex-1 justify-between items-center gap-2">
        {/* name */}
        <div className="flex-[4] w-0 flex flex-col">
          <h3 className="font-medium text-ellipsis overflow-hidden" ref={ref}>
            {props.name}
          </h3>
          <p className="text-text_blur">{props.packingSpecification}</p>
        </div>

        {/* quantity */}
        <div className="w-0 flex-[5] flex gap-2 items-center ">
          <input
            type="text"
            {...register('quantity')}
            className={classNames(
              'min-w-[50px] max-w-[80px] rounded-md border-[1px]  shadow-inner py-[3px] text-h6 text-center outline-dark_primary',
              errors.quantity?.message ? 'border-danger border-[2px]' : 'border-primary/20',
            )}
          />
          <span className="text-text_blur">x</span>
          {/* specifications */}
          <input
            type="text"
            {...register('specification')}
            className={classNames(
              'min-w-[50px] max-w-[80px] rounded-md border-[1px] shadow-inner py-[3px] text-h6 text-center outline-dark_primary',
              errors.specification?.message ? 'border-danger border-[2px]' : 'border-primary/20',
            )}
          />
          <span>=</span>
          <span className="text-h6 whitespace-nowrap">{totalQnt} viên</span>
        </div>

        {/* import price */}
        <div className="w-0 flex-[2]">
          <input
            type="text"
            {...register('importPrice')}
            className={classNames(
              'min-w-[50px] max-w-[80px] rounded-md border-[1px] shadow-inner py-[3px] text-h6 text-center outline-dark_primary',
              errors.importPrice?.message ? 'border-danger border-[2px]' : 'border-primary/20',
            )}
          />
        </div>

        {/* sell price */}
        <div className="w-0 flex-[2]">
          <input
            type="text"
            {...register('sellPrice')}
            className={classNames(
              'min-w-[50px] max-w-[80px] rounded-md border-[1px] shadow-inner py-[3px] text-h6 text-center outline-dark_primary',
              errors.sellPrice?.message ? 'border-danger border-[2px]' : 'border-primary/20',
            )}
          />
        </div>

        {/* total price */}
        <span className="w-0 flex-[2]">{formatToVND(totalImportPrice)}</span>

        {/* manufacture Date */}
        <div className="w-0 flex-[2]">
          <Controller
            control={control}
            name="manufactureDate"
            render={({ field }) => (
              <DatePicker
                className={classNames(
                  'w-[90px] border-[1px] shadow-inner cursor-pointer rounded-md py-[3px] text-h6 text-center outline-dark_primary',
                  errors.manufactureDate?.message ? 'border-danger border-[2px]' : 'border-primary/20',
                )}
                selected={field?.value}
                onChange={(date) => {
                  return field.onChange(date);
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
        </div>

        {/* exp Date */}
        <div className="w-0 flex-[2]">
          <Controller
            control={control}
            name="expDate"
            render={({ field }) => (
              <DatePicker
                className={classNames(
                  'w-[90px] border-[1px] shadow-inner cursor-pointer rounded-md py-[3px] text-h6 text-center outline-dark_primary',
                  errors.expDate?.message ? 'border-danger border-[2px]' : 'border-primary/20',
                )}
                selected={field?.value}
                onChange={(date) => {
                  field.onChange(date);
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
        </div>

        {/* Lot number */}
        <div className="w-0 flex-[2]">
          <input
            type="text"
            {...register('lotNumber')}
            className={classNames(
              'min-w-[50px] max-w-[80px] rounded-md border-[1px] shadow-inner py-[3px] text-h6 text-center outline-dark_primary',
              errors.lotNumber?.message ? 'border-danger border-[2px]' : 'border-primary/20',
            )}
          />
        </div>
      </form>

      {/* Remove button */}
      <button
        className="shadow-md w-[22px] h-[22px] rounded-full bg-secondary/10 outline-none active:opacity-30 "
        onClick={onRemove}
      >
        <CgRemove className="text-[22px] text-secondary" />
      </button>
    </li>
  );
}

export default forwardRef(ItemRow);
