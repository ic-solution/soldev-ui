import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TableRow({ item, index, ready }) {
  return (
    <Link href={item.link} passHref>
      <div
        className={classNames(
          'border-x border-b border-gray-300 py-3 pl-8  dark:border-gray-600 dark:bg-gray-900 ',
          ready
            ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
            : 'cursor-not-allowed blur-sm'
        )}
      >
        <span className="mr-3 text-xl text-gray-400 dark:text-gray-500">{++index}.</span>
        <span className=" tracking-wide text-gray-700 dark:text-gray-300">{item.title}</span>
      </div>
    </Link>
  );
}

TableRow.propType = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  ready: PropTypes.bool
};

export default memo(TableRow);
