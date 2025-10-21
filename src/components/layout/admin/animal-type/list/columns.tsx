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
import EditFormAnimalTypeButton from '../edit-form';

// Tabel animal_type: Kamus jenis hewan (mis. Cat, Dog, Bird).
export type AnimalType = {
  at_id: number; // Primary key; identitas unik jenis hewan.
  at_description: string; // Nama/uraian jenis hewan.
};

// Kolom yang sesuai dengan type AnimalType
export const columns: ColumnDef<AnimalType>[] = [
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
    id: 'at_id',
    accessorKey: 'at_id',
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
      const id = row.original.at_id;
      return <span className="pl-2">{id}</span>;
    },
  },
  {
    accessorKey: 'at_description',
    header: 'Jenis Hewan',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const animalType = row.original;
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
            <DeleteConfirmationButton animalType={[animalType]} />
            <EditFormAnimalTypeButton animalType={animalType} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
