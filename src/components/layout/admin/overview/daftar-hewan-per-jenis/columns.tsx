'use client';

import { ColumnDef } from '@tanstack/react-table';

export type TDaftarHewanPerJenis = {
  animal_id: number;
  animal_name: string;
  owner_name: string;
};

export const columns: ColumnDef<TDaftarHewanPerJenis>[] = [
  {
    accessorKey: 'animal_id',
    header: 'ID Hewan',
  },
  {
    accessorKey: 'animal_name',
    header: 'Nama Hewan',
  },
  {
    accessorKey: 'owner_name',
    header: 'Nama Pemilik',
  },
];
