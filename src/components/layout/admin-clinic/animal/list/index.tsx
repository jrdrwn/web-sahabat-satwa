import { cookies } from 'next/headers';

import { Animal, columns } from './columns';
import { DataTable } from './data-table';

export default async function ListAnimal() {
  const _cookies = await cookies();
  const res = await fetch(`${process.env.APP_URL}/api/admin-clinic/animal`, {
    headers: {
      authorization: `Bearer ${_cookies.get('token')?.value}`,
    },
  });
  const json = await res.json();
  const data = json.data as Animal[];
  return <DataTable data={data} columns={columns} />;
}
