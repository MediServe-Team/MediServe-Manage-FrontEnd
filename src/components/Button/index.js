import React, { forwardRef } from 'react';
import classNames from 'classnames';

/*
    - style: 
        - solid
        - outline
    - modifier:
        - danger
        - primary
        - dark-primary
    - size:
        - normal
        - medium
        - large
        - elasticity
    - shape:
        - rectangle
        - circle
    - disabled
    - width 
    - height
    - padding
    - bold
    - icon
    - leftIcon
    - rightIcon
    - className
    - rounded: ARRAY-[topLeft, topRight, bottomRight, bottomLeft]
    - even:
        - onClick
*/

const TYPES = ['solid', 'outline', 'disable'];
const MODIFIERS = ['primary', 'dark-primary', 'danger'];
const SIZES = ['elasticity', 'normal', 'medium', 'large'];
const SHAPES = ['rectangle', 'circle'];

function Button(
  {
    styleBtn,
    type,
    modifier,
    size,
    shape,
    width,
    height,
    bold = false,
    leftIcon,
    rightIcon,
    circleIcon,
    className,
    disabled,
    children,
    onClick,
    padding,
  },
  ref,
) {
  // check props
  const checkType = TYPES.includes(styleBtn) ? styleBtn : TYPES[0];
  const checkModifier = MODIFIERS.includes(modifier) ? modifier : MODIFIERS[0];
  const checkSize = SIZES.includes(size) ? size : SIZES[0];
  const checkShape = SHAPES.includes(shape) ? shape : SHAPES[0];

  //   render text in Button
  const renderText = () => {
    if (checkShape === 'circle')
      if (!circleIcon) {
        return null;
      } else return circleIcon;
    else if (checkShape === 'rectangle')
      return (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      );
  };

  return (
    <button
      type={type}
      className={classNames(
        // style for button
        'flex justify-center items-center gap-2 shadow-sm transition-all duration-100',
        // style for button
        {
          'bg-primary text-white hover:opacity-60 active:opacity-100':
            checkType === 'solid' && checkModifier === 'primary',
          'bg-danger text-white hover:opacity-60 active:opacity-100':
            checkType === 'solid' && checkModifier === 'danger',
          'bg-text_primary text-white hover:opacity-60 active:opacity-100':
            checkType === 'solid' && checkModifier === 'dark-primary',

          'border-primary text-primary border-2 hover:bg-primary/10 active:bg-primary active:text-white transition-colors':
            checkType === 'outline' && checkModifier === 'primary',
          'border-danger text-danger border-2 hover:opacity-60 active:opacity-100':
            checkType === 'outline' && checkModifier === 'danger',
          'border-text_primary text-text_primary border-2 hover:opacity-60 active:opacity-100':
            checkType === 'outline' && checkModifier === 'dark-primary',

          'border-text_blur bg-slate-200 cursor-default shadow-none': disabled,
        },
        // style for size
        {
          'h-[36px]': checkSize === 'normal',
          'h-[44px]': checkSize === 'medium',
          'h-[52px]': checkSize === 'large',
        },
        // style for shape
        {
          'rounded-full aspect-square': checkShape === 'circle',
          'rounded-lg px-4': checkShape === 'rectangle',
        },
        // bold
        {
          'font-bold': bold,
        },
        className,
      )}
      //   style
      style={{ width: width, height: height, padding: padding }}
      //   event
      onClick={disabled ? () => {} : onClick}
      ref={ref}
    >
      {renderText()}
    </button>
  );
}

export default forwardRef(Button);
