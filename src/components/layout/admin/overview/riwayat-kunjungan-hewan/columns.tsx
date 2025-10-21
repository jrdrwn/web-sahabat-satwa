'use client';

import { ColumnDef } from '@tanstack/react-table';

export type TRiwayatKunjunganHewan = {
  visit_id: number;
  visit_date_time: string;
  vet_name: string;
  visit_notes: string;
};

export const columns: ColumnDef<TRiwayatKunjunganHewan>[] = [
  {
    accessorKey: 'visit_id',
    header: 'ID Kunjungan',
  },
  {
    accessorKey: 'visit_date_time',
    header: 'Tanggal & Waktu',
  },
  {
    accessorKey: 'vet_name',
    header: 'Nama Dokter Hewan',
  },
  {
    accessorKey: 'visit_notes',
    header: 'Catatan Kunjungan',
  },
];
