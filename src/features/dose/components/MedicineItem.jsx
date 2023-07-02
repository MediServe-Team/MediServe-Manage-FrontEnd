import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addMedicineInDoseSchema } from '../../../validations/addMedicineInDose';
import { MdOutlineClose } from 'react-icons/md';
import classNames from 'classnames';

function MedicineItem(
  { number, medicineId, medicineName, packingSpecification, medicineUnit, morning, noon, night, quantity, onRemove },
  ref,
) {
  const {
    register,
    trigger,
    clearErrors,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(addMedicineInDoseSchema) });

  useImperativeHandle(ref, () => ({
    id: medicineId,
    getData: async () => {
      // trigger validate
      const passValidate = await trigger();
      if (passValidate) {
        clearErrors();
        const data = getValues();
        return data;
      }
      return;
    },
  }));

  useEffect(() => {
    // clean data in form when component unmounted
    return () => {
      reset();
    };
  }, [medicineId]);

  return (
    <form className="flex flex-col border-2 border-text_blur rounded-lg">
      <input type="hidden" value={medicineId} {...register('medicineId')} />
      {/* header item */}
      <div className="flex items-center bg-secondary/20 p-2">
        {/* number */}
        <div className="w-[32px] h-[32px] flex justify-center items-center bg-secondary/80 rounded-md flex-shrink-0">
          <span className="text-white">#{number}</span>
        </div>

        {/* usage */}
        <div className="flex px-3 justify-center items-center gap-4 min-w-0 ">
          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Sáng</span>
            <input
              type="text"
              defaultValue={morning}
              className={classNames(
                'border-2 rounded-md outline-none focus:border-text_primary transition-all duration-200 max-w-[80px] h-[30px] min-w-0 px-2 text-center',
                errors.morning?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('morning')}
            />
          </div>

          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Trưa</span>
            <input
              type="text"
              defaultValue={noon}
              className={classNames(
                'border-2 rounded-md outline-none focus:border-text_primary transition-all duration-200 max-w-[80px] h-[30px] min-w-0 px-2 text-center',
                errors.noon?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('noon')}
            />
          </div>

          <div className="flex-1 flex min-w-0 gap-1 items-center ">
            <span>Tối</span>
            <input
              type="text"
              defaultValue={night}
              className={classNames(
                'border-2 rounded-md outline-none focus:border-text_primary transition-all duration-200 max-w-[80px] h-[30px] min-w-0 px-2 text-center',
                errors.night?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('night')}
            />
          </div>
        </div>
      </div>

      {/* info medicine */}
      <div className="flex items-center bg-text_blur/5 py-4">
        <div className="w-1/2 pl-2">
          <p className="font-medium">{medicineName}</p>
          <p className="text-text_blur">{packingSpecification}</p>
        </div>

        <div className="flex items-center justify-between w-1/2 gap-2">
          {/* Input quantity for medicine */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue={quantity}
              className={classNames(
                'border-2 rounded-md outline-none focus:border-text_primary transition-all duration-200 max-w-[80px] h-[30px] min-w-0 px-2 text-center',
                errors.quantity?.message ? 'border-danger' : 'border-text_primary/20',
              )}
              {...register('quantity')}
            />
            <i>({medicineUnit})</i>
          </div>
          {/* Button remove medicine */}
          <button
            type="button"
            className="flex-shrink-0 flex text-text_blur text-h4 pr-5 font-semibold outline-none p-3 hover:text-danger"
            onClick={onRemove}
          >
            <MdOutlineClose className="text-[20px] m-auto" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default forwardRef(MedicineItem);
