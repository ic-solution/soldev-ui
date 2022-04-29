import { memo, useId } from 'react';
import TableHeader from './table-header';
import TableRow from './table-row';
import { modules } from '../../utils/course-map';

function Table() {
  const id = useId();
  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      <div className="">
        <TableHeader title="Client interaction with the Solana Network" subTitle="Module 1" />

        {modules[0].map((item, index) => {
          return <TableRow ready={true} item={item} index={index} key={id} />;
        })}
      </div>

      <div>
        <TableHeader
          title="Client interaction with the Solana Program Library"
          subTitle="Module 2"
        />

        {modules[1].map((item, index) => {
          return <TableRow item={item} index={index} key={id} />;
        })}
      </div>

      <div>
        <TableHeader title="Basic Solana Program Development" subTitle="Module 3" />

        {modules[2].map((item, index) => {
          return <TableRow item={item} index={index} key={id} />;
        })}
      </div>

      <div>
        <TableHeader title="Advanced Solana Program Development" subTitle="Module 4" />

        {modules[3].map((item, index) => {
          return <TableRow item={item} index={index} key={id} />;
        })}
      </div>
    </div>
  );
}

export default memo(Table);
