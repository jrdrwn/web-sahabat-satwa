import { cookies } from 'next/headers';

import { Clinic, columns } from './columns';
import { DataTable } from './data-table';

export default async function ListClinic() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/admin-clinic/clinic`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as Clinic[];
  return <DataTable data={data} columns={columns} />;
}
