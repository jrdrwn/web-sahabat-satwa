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
import EditFormSpecialisation from '../edit-form';

// Tabel specialisation: Master daftar spesialisasi dokter hewan.
export type Specialisation = {
  spec_id: number; // Primary key; identitas unik spesialisasi.
  spec_description: string; // Nama/uraian singkat spesialisasi (maks 30 karakter).
};

export const columns: ColumnDef<Specialisation>[] = [
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
    id: 'spec_id',
    accessorKey: 'spec_id',
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
      const id = row.original.spec_id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'spec_description',
    header: 'Spesialisasi',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const specialisation = row.original;
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
            {/* Ganti komponen berikut sesuai kebutuhan spesialisasi */}
            <DeleteConfirmationButton specialisation={[specialisation]} />
            <EditFormSpecialisation specialisation={specialisation} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
