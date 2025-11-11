'use client';

import { ColumnDef } from '@tanstack/react-table';

export type TDaftarKunjunganRentangTanggal = {
  visit_id: number;
  visit_date_time: string;
  animal_name: string;
  owner_name: string;
  vet_name: string;
};

export const columns: ColumnDef<TDaftarKunjunganRentangTanggal>[] = [
  {
    accessorKey: 'visit_id',
    header: 'ID Kunjungan',
  },
  {
    accessorKey: 'visit_date_time',
    header: 'Tanggal & Waktu',
  },
  {
    accessorKey: 'animal_name',
    header: 'Nama Hewan',
  },
  {
    accessorKey: 'owner_name',
    header: 'Nama Pemilik',
  },
  {
    accessorKey: 'vet_name',
    header: 'Nama Dokter Hewan',
  },
];
