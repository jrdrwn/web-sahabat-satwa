import { cookies } from 'next/headers';

export interface Kelas {
  id: number;
  nama: string;
  mata_kuliah: MataKuliah;
}

export interface MataKuliah {
  id: number;
  nama: string;
  kode: string;
}
export default async function PraktikanPage() {
  const _cookies = await cookies();

  return <></>;
}
