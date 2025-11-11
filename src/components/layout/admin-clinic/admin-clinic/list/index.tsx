import { cookies } from 'next/headers';

import { AdminClinic, columns } from './columns';
import { DataTable } from './data-table';

export default async function ListAdminClinic() {
  const _cookies = await cookies();
  const res = await fetch(
    `${process.env.APP_URL}/api/admin-clinic/admin-clinic`,
    {
      headers: {
        authorization: `Bearer ${_cookies.get('token')?.value}`,
      },
    },
  );

  const json = await res.json();
  const data = json.data as AdminClinic[];
  return <DataTable data={data} columns={columns} />;
}
