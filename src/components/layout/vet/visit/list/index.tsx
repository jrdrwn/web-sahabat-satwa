import { cookies } from 'next/headers';

import { columns, Visit } from './columns';
import { DataTable } from './data-table';

export default async function ListVisit() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/vet/visit`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as Visit[];
  return <DataTable data={data} columns={columns} />;
}
