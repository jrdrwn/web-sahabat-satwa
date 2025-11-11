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
import EditFormVisitDrugButton from '../edit-form';

// Tabel visit_drug: Detail obat yang diresepkan/diberikan pada suatu kunjungan.
export type VisitDrug = {
  visit_id: number; // Bagian PK; FK ke visit.visit_id.
  drug_id: number; // Bagian PK; FK ke drug.drug_id.
  visit_drug_dose?: string; // Dosis obat (mis. 10 mg, 2 ml).
  visit_drug_frequency?: string; // Frekuensi pemberian (mis. 2x sehari).
  visit_drug_qtysupplied?: number; // Jumlah unit obat yang disuplai/diberikan.
};

export const columns: ColumnDef<VisitDrug>[] = [
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
    accessorKey: 'visit_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={column.getToggleSortingHandler()}>
        Visit ID
        <span className="sr-only">Sort by Visit ID</span>
        {{
          asc: <ChevronUp />,
          desc: <ChevronDown />,
        }[column.getIsSorted() as string] || <ChevronsUpDown />}
      </Button>
    ),
    cell: ({ row }) => <span className="pl-2">{row.original.visit_id}</span>,
  },
  {
    accessorKey: 'drug_id',
    header: 'Drug ID',
    cell: ({ row }) => <span>{row.original.drug_id}</span>,
  },
  {
    accessorKey: 'visit_drug_dose',
    header: 'Dosis',
    cell: ({ row }) => <span>{row.original.visit_drug_dose || '-'}</span>,
  },
  {
    accessorKey: 'visit_drug_frequency',
    header: 'Frekuensi',
    cell: ({ row }) => <span>{row.original.visit_drug_frequency || '-'}</span>,
  },
  {
    accessorKey: 'visit_drug_qtysupplied',
    header: 'Jumlah',
    cell: ({ row }) => (
      <span>{row.original.visit_drug_qtysupplied ?? '-'}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const visitDrug = row.original;
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
            {/* Komponen aksi untuk visit_drug */}
            <DeleteConfirmationButton visitDrug={[visitDrug]} />
            <EditFormVisitDrugButton visitDrug={visitDrug} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
