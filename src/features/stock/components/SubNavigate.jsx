import { memo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

  const COLORS = ['primary', 'green', 'yellow', 'red', 'grey'];

  return (
    <nav>
      <ul className="flex gap-3">
        {navs.map((item) => {
          const color = COLORS.includes(item.color) ? item.color : COLORS[0];
          return (
            <li>
              <Link
                to={item.path}
                className={classNames(
                  'border-b-[3px] px-4 flex gap-2 items-center py-2',
                  // style underline color
                  {
                    'border-text_primary': color === 'primary',
                    'border-tertiary': color === 'green',
                    'border-secondary/80': color === 'yellow',
                    'border-danger/80': color === 'red',
                    'border-gray-500': color === 'grey',
                  },
                )}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default memo(SubNavigate);
