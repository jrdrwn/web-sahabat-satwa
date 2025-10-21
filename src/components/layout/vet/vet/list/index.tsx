import { cookies } from 'next/headers';

import { columns, Vet } from './columns';
import { DataTable } from './data-table';

export default async function ListVet() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/vet/vet`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as Vet[];
  return <DataTable data={data} columns={columns} />;
}
