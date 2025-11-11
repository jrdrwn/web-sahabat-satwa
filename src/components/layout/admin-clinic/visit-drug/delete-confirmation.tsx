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

import { VisitDrug } from './list/columns';

export default function DeleteConfirmationButton({
  visitDrug,
}: {
  visitDrug: VisitDrug[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: VisitDrug[]) {
    const resAll = async (item: VisitDrug) => {
      const res = await fetch(
        `/api/admin-clinic/visit-drug/${item.visit_id}/${item.drug_id}`,
        {
          method: 'DELETE',
          headers: {
            'authorization': `Bearer ${_cookies('token')}`,
            'Content-Type': 'application/json',
          },
        },
      );
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
                  <TableHead className="text-center">Visit ID</TableHead>
                  <TableHead className="text-center">Drug ID</TableHead>
                  <TableHead className="text-center">Dosis</TableHead>
                  <TableHead className="text-center">Frekuensi</TableHead>
                  <TableHead className="text-center">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitDrug.map((item) => (
                  <TableRow key={`${item.visit_id}-${item.drug_id}`}>
                    <TableCell className="text-center font-medium">
                      {item.visit_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.drug_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.visit_drug_dose || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.visit_drug_frequency || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.visit_drug_qtysupplied ?? '-'}
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
            <Button variant="destructive" onClick={() => onSubmit(visitDrug)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
