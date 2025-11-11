'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/expansions/responsive-modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCookie } from 'cookies-next/client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Visit } from './list/columns';

export default function DeleteConfirmationButton({
  visit,
}: {
  visit: Visit[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: Visit[]) {
    const resAll = async (visit: Visit) => {
      const res = await fetch(`/api/admin-clinic/visit/${visit.visit_id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${_cookies('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return res.ok;
    };
    const results = await Promise.all(data.map(resAll));
    if (results.every((result) => result)) {
      toast.success('Data kunjungan berhasil dihapus');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Sebagian data kunjungan gagal dihapus');
      router.refresh();
    } else {
      toast.error('Gagal menghapus data kunjungan');
    }
    handleOpenChange(false);
  }
  return (
    <>
      <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
        <ResponsiveModalTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent>
          <ResponsiveModalHeader className="mb-4">
            <ResponsiveModalTitle>
              Apakah Anda yakin ingin menghapus data kunjungan ini?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data terkait kunjungan
              akan dihapus permanen.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Tanggal & Waktu</TableHead>
                  <TableHead className="text-center">Catatan</TableHead>
                  <TableHead className="text-center">ID Hewan</TableHead>
                  <TableHead className="text-center">ID Dokter</TableHead>
                  <TableHead className="text-center">Rujukan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visit.map((visit) => (
                  <TableRow key={visit.visit_id}>
                    <TableCell className="text-center font-medium">
                      {visit.visit_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {visit.visit_date_time || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {visit.visit_notes || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {visit.animal_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {visit.vet_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {visit.from_visit_id || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResponsiveModalHeader>
          <ResponsiveModalFooter className="gap-2">
            <ResponsiveModalClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </ResponsiveModalClose>
            <Button variant="destructive" onClick={() => onSubmit(visit)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
