import { cookies } from 'next/headers';

import { columns, Specialisation } from './columns';
import { DataTable } from './data-table';

export default async function ListSpecialisation() {
  const _cookies = await cookies();
  const res = await fetch(
    `${process.env.APP_URL}/api/admin-clinic/specialisation`,
    {
      headers: {
        authorization: `Bearer ${_cookies.get('token')?.value}`,
      },
    },
  );
  const json = await res.json();
  const data = json.data as Specialisation[];
  return <DataTable data={data} columns={columns} />;
}
