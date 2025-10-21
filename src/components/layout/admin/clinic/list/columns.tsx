'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  MoreHorizontal,
} from 'lucide-react';

import DeleteConfirmationButton from '../delete-confirmation';
import EditFormOwnerButton from '../edit-form';

// Tabel clinic: Master data klinik hewan.
export type Clinic = {
  clinic_id: number; // Primary key; identitas unik klinik.
  clinic_name: string; // Nama klinik.
  clinic_address?: string; // Alamat klinik.
  clinic_phone?: string; // Nomor telepon klinik (maks 14 digit/karakter).
};

// Kolom yang sesuai dengan type Clinic
export const columns: ColumnDef<Clinic>[] = [
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
    id: 'clinic_id',
    accessorKey: 'clinic_id',
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
      const id = row.original.clinic_id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'clinic_name',
    header: 'Nama Klinik',
  },
  {
    accessorKey: 'clinic_address',
    header: 'Alamat',
  },
  {
    accessorKey: 'clinic_phone',
    header: 'Telepon',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const clinic = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DeleteConfirmationButton clinic={[clinic]} />
            <EditFormOwnerButton clinic={clinic} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
