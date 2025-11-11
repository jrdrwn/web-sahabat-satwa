'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

// Tabel admin_clinic: Admin yang mengelola data pada suatu klinik.
export type AdminClinic = {
  id: number; // Primary key; identitas unik admin.
  username: string; // Username unik untuk login.
  email: string; // Email unik admin.
  password: string; // Kata sandi (disimpan dalam bentuk hash).
  name: string; // Nama lengkap admin.
  clinic_id: number; // FK ke clinic.clinic_id; klinik yang dikelola.
};

// Kolom yang sesuai dengan type AdminClinic
export const columns: ColumnDef<AdminClinic>[] = [
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
    id: 'id',
    accessorKey: 'id',
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
      const id = row.original.id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'name',
    header: 'Nama Lengkap',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'clinic_id',
    header: 'Klinik ID',
  },
];
