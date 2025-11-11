import { cookies } from 'next/headers';

import { columns, SpecVisit } from './columns';
import { DataTable } from './data-table';

export default async function ListSpecVisit() {
  const _cookies = await cookies();
  const res = await fetch(
    `${process.env.APP_URL}/api/admin-clinic/spec-visit`,
    {
      headers: {
        authorization: `Bearer ${_cookies.get('token')?.value}`,
      },
    },
  );
  const json = await res.json();
  const data = json.data as SpecVisit[];
  return <DataTable data={data} columns={columns} />;
}
