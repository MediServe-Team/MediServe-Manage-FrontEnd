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
      'border-b-[3.5px] px-4 flex gap-2 items-center py-2 transition-colors duration-300 hover:opacity-80  ';
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
          break;
        default:
          activeStyle = '';
          break;
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
            <li>
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive, isPending }) => styleNavItem(isActive, color)}
              >
                <span className="text-[17px] text-text_primary font-medium">{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default memo(SubNavigate);
