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

// Tabel drug: Master data obat/vaksin yang tersedia.
export type Drug = {
  drug_id: number; // Primary key; identitas unik obat.
  drug_name: string; // Nama obat.
  drug_usage?: string; // Catatan singkat penggunaan/indikasi obat.
};

// Kolom yang sesuai dengan type Drug
export const columns: ColumnDef<Drug>[] = [
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
    id: 'drug_id',
    accessorKey: 'drug_id',
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
      const id = row.original.drug_id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'drug_name',
    header: 'Nama Obat/Vaksin',
  },
  {
    accessorKey: 'drug_usage',
    header: 'Penggunaan/Indikasi',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const drug = row.original;
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
            <DeleteConfirmationButton drug={[drug]} />
            <EditFormOwnerButton drug={drug} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
