'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

// Tabel owners: Data pemilik hewan (klien).
export type Owner = {
  owner_id: number; // Primary key; identitas unik pemilik.
  owner_givenname: string; // Nama depan pemilik.
  owner_familyname: string; // Nama belakang/keluarga pemilik.
  owner_address?: string; // Alamat tempat tinggal pemilik.
  owner_phone?: string; // Nomor telepon pemilik.
};

// Kolom yang sesuai dengan type Owner
export const columns: ColumnDef<Owner>[] = [
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
    id: 'owner_id',
    accessorKey: 'owner_id',
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
      const id = row.original.owner_id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'owner_givenname',
    header: 'Nama Depan',
  },
  {
    accessorKey: 'owner_familyname',
    header: 'Nama Belakang',
  },
  {
    accessorKey: 'owner_address',
    header: 'Alamat',
  },
  {
    accessorKey: 'owner_phone',
    header: 'Telepon',
  },
];
