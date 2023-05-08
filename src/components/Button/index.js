import React, { forwardRef } from 'react';
import classNames from 'classnames';

/*
    - type: 
        - solid
        - outline
    - modifier:
        - danger
        - primary
    - size:
        - normal
        - medium
        - large
    - shape:
        - rectangle
        - circle
    - disabled
    - width 
    - height
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
const MODIFIERS = ['primary', 'danger'];
const SIZES = ['elasticity', 'normal', 'medium', 'large'];
const SHAPES = ['rectangle', 'circle'];

function Button(
  {
    type,
    modifier,
    size,
    shape,
    width,
    height,
    bold = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    // rounded = [],
    children,
    onClick,
  },
  ref,
) {
  // check props
  const checkType = TYPES.includes(type) ? type : TYPES[0];
  const checkModifier = MODIFIERS.includes(modifier) ? modifier : MODIFIERS[0];
  const checkSize = SIZES.includes(size) ? size : SIZES[0];
  const checkShape = SHAPES.includes(shape) ? shape : SHAPES[0];

  // render text in Button
  //   const renderText = () => {
  //     if (checkShape === 'circle' && !icon) {
  //       return null;
  //     }
  //     else if()

  //   };

  return (
    <button
      className={classNames(
        // style for button
        'flex justify-center items-center gap-2 transition-all duration-300',
        // style for Type
        {
          'bg-primary text-white': checkType === 'solid' && checkModifier === 'primary',
          'bg-danger text-white': checkType === 'solid' && checkModifier === 'danger',
          'border-primary text-primary': type === 'outline' && checkModifier === 'primary',
          'bg-danger text-danger': type === 'outline' && checkModifier === 'danger',
          'border-text_blur bg-slate-200 opacity-50 cursor-default': disabled,
        },
        // style for size
        {
          'h-[36px]': size === 'small',
          'h-[44px]': size === 'medium',
          'h-[52px]': size === 'large',
        },
        // style for shape
        {
          'rounded-full': shape === 'circle',
          'rounded-lg px-[10px]': shape === 'rectangle',
        },
        // bold
        {
          'font-bold': bold,
        },
        className,
      )}
      //   style
      style={{ width: width, height: height }}
      //   event
      onclick={disabled ? () => {} : onClick}
      ref={ref}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export default forwardRef(Button);
