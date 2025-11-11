import { cookies } from 'next/headers';

import { columns, Owner } from './columns';
import { DataTable } from './data-table';

export default async function ListOwner() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/admin-clinic/owners`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as Owner[];
  return <DataTable data={data} columns={columns} />;
}
