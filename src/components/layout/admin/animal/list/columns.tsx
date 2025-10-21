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
import EditFormAnimalButton from '../edit-form';

// Tabel animal: Data hewan peliharaan pasien.
export type Animal = {
  animal_id: number; // Primary key; identitas unik hewan.
  animal_name: string; // Nama hewan.
  animal_born?: string; // Tanggal lahir hewan (opsional), format ISO date.
  owner_id: number; // FK ke owners.owner_id; pemilik hewan.
  at_id: number; // FK ke animal_type.at_id; jenis hewan.
};

export const columns: ColumnDef<Animal>[] = [
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
    accessorKey: 'animal_id',
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
    cell: ({ row }) => <span className="pl-2">{row.original.animal_id}</span>,
  },
  {
    accessorKey: 'animal_name',
    header: 'Nama Hewan',
    cell: ({ row }) => <span>{row.original.animal_name}</span>,
  },
  {
    accessorKey: 'animal_born',
    header: 'Tanggal Lahir',
    cell: ({ row }) => <span>{row.original.animal_born || '-'}</span>,
  },
  {
    accessorKey: 'owner_id',
    header: 'ID Pemilik',
    cell: ({ row }) => <span>{row.original.owner_id}</span>,
  },
  {
    accessorKey: 'at_id',
    header: 'ID Jenis Hewan',
    cell: ({ row }) => <span>{row.original.at_id}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const animal = row.original;
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
            {/* Komponen aksi untuk animal */}
            <DeleteConfirmationButton animal={[animal]} />
            {/* EditFormAnimal bisa ditambahkan di sini jika ada */}
            <EditFormAnimalButton animal={animal} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
