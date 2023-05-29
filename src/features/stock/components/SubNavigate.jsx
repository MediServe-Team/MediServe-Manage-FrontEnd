import { memo } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

function SubNavigate({ navs }) {
  /*
  navs = [
    {
        name        : display name for nav item
        path        : path to link
        color       : primary for nav item
        quantity    : quantity attach with nav item
    },
  ] 
 */

  //   defind color in props object
  const COLORS = ['primary', 'green', 'yellow', 'red', 'grey'];

  const styleNavItem = (isActive, color) => {
    let baseStyle =
      'border-b-[3px] px-4 flex gap-2 items-center py-2 transition-colors duration-300 hover:opacity-80  ';
    let activeStyle = '';
    // check active color
    if (isActive) {
      switch (color) {
        case 'primary':
          activeStyle = 'border-text_primary';
          break;
        case 'green':
          activeStyle = 'border-tertiary';
          break;
        case 'yellow':
          activeStyle = 'border-secondary/80';
          break;
        case 'red':
          activeStyle = 'border-danger/80';
          break;
        case 'grey':
          activeStyle = 'border-gray-500';
        default:
          activeStyle = '';
      }
    } else {
      activeStyle = 'border-transparent';
    }
    return baseStyle.concat(activeStyle);
  };

  return (
    <nav>
      <ul className="flex gap-3">
        {navs.map((item, index) => {
          const color = COLORS.includes(item.color) ? item.color : COLORS[0];
          return (
            <li key={index}>
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive, isPending }) => styleNavItem(isActive, color)}
              >
                <span>{item.name}</span>
                {item.quantity && (
                  <div
                    className={classNames(
                      ' top-0 right-0 w-[22px] h-[18px] rounded-md flex justify-center items-center',
                      {
                        'bg-primary/30 text-primary': color === 'primary',
                        'bg-tertiary/30 text-tertiary': color === 'green',
                        'bg-secondary/30 text-secondary': color === 'yellow',
                        'bg-danger/30 text-danger': color === 'red',
                        'bg-gray-500/30 text-gray-500': color === 'grey',
                      },
                    )}
                  >
                    <span className="font-bold text-h6">{item.quantity}</span>
                  </div>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default memo(SubNavigate);
