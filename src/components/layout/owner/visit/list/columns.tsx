'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

// Tabel visit: Kunjungan/pemeriksaan hewan oleh dokter.
export type Visit = {
  visit_id: number; // Primary key; identitas unik kunjungan.
  visit_date_time?: string; // Tanggal dan waktu kunjungan (timestamp), format ISO.
  visit_notes?: string; // Catatan medis/temuan/anjuran singkat.
  animal_id: number; // FK ke animal.animal_id; hewan yang diperiksa.
  vet_id: number; // FK ke vet.vet_id; dokter yang memeriksa.
  from_visit_id?: number; // FK self-reference; rujukan ke kunjungan sebelumnya (follow-up).
};

export const columns: ColumnDef<Visit>[] = [
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
        ID
        <span className="sr-only">Sort by ID</span>
        {{
          asc: <ChevronUp />,
          desc: <ChevronDown />,
        }[column.getIsSorted() as string] || <ChevronsUpDown />}
      </Button>
    ),
    cell: ({ row }) => <span className="pl-2">{row.original.visit_id}</span>,
  },
  {
    accessorKey: 'visit_date_time',
    header: 'Tanggal & Waktu',
    cell: ({ row }) => <span>{row.original.visit_date_time || '-'}</span>,
  },
  {
    accessorKey: 'visit_notes',
    header: 'Catatan',
    cell: ({ row }) => <span>{row.original.visit_notes || '-'}</span>,
  },
  {
    accessorKey: 'animal_id',
    header: 'ID Hewan',
    cell: ({ row }) => <span>{row.original.animal_id}</span>,
  },
  {
    accessorKey: 'vet_id',
    header: 'ID Dokter',
    cell: ({ row }) => <span>{row.original.vet_id}</span>,
  },
  {
    accessorKey: 'from_visit_id',
    header: 'Rujukan',
    cell: ({ row }) => <span>{row.original.from_visit_id || '-'}</span>,
  },
];
