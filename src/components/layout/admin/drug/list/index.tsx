import { cookies } from 'next/headers';

import { columns, Drug } from './columns';
import { DataTable } from './data-table';

export default async function ListDrug() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/admin/drug`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as Drug[];
  return <DataTable data={data} columns={columns} />;
}
