'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

// Tabel vet: Data dokter hewan yang praktik pada klinik.
export type Vet = {
  vet_id: number; // Primary key; identitas unik dokter hewan.
  vet_title: string; // Gelar/sapaan (contoh: Dr., Drh.).
  vet_givenname: string; // Nama depan dokter hewan.
  vet_familyname: string; // Nama belakang/keluarga dokter hewan.
  vet_phone?: string; // Nomor telepon dokter hewan.
  vet_employed?: string; // Tanggal mulai bekerja/bergabung.
  spec_id?: number; // FK ke specialisation.spec_id; spesialisasi utama dokter.
  clinic_id?: number; // FK ke clinic.clinic_id; klinik tempat berpraktik.
};

// Kolom yang sesuai dengan type Vet
export const columns: ColumnDef<Vet>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'vet_id',
    accessorKey: 'vet_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={column.getToggleSortingHandler()}>
        ID
        <span className="sr-only">Sort by ID</span>
        {{
          asc: <ChevronUp />,
          desc: <ChevronDown />,
        }[column.getIsSorted() as string] || <ChevronsUpDown />}
      </Button>
    ),
    cell: ({ row }) => {
      const id = row.original.vet_id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'vet_givenname',
    header: 'Nama Depan',
  },
  {
    accessorKey: 'vet_familyname',
    header: 'Nama Belakang',
  },
  {
    accessorKey: 'vet_title',
    header: 'Gelar',
  },
  {
    accessorKey: 'vet_phone',
    header: 'Telepon',
  },
  {
    accessorKey: 'vet_employed',
    header: 'Tanggal Bergabung',
  },
  // todo: spec_id, clinic_id bisa ditampilkan jika ada relasi/lookup data
  {
    accessorKey: 'spec_id',
    header: 'Spesialisasi ID',
  },
  {
    accessorKey: 'clinic_id',
    header: 'Klinik ID',
  },
];
