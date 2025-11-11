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

import { SpecVisit } from './list/columns';

export default function DeleteConfirmationButton({
  specVisit,
}: {
  specVisit: SpecVisit[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: SpecVisit[]) {
    const resAll = async (item: SpecVisit) => {
      const res = await fetch(
        `/api/admin-clinic/spec-visit/${item.clinic_id}/${item.vet_id}`,
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
      toast.success('Data kunjungan spesialisasi berhasil dihapus');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Sebagian data kunjungan spesialisasi gagal dihapus');
      router.refresh();
    } else {
      toast.error('Gagal menghapus data kunjungan spesialisasi');
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
              Apakah Anda yakin ingin menghapus data kunjungan spesialisasi ini?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data terkait kunjungan
              spesialisasi akan dihapus permanen.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Clinic ID</TableHead>
                  <TableHead className="text-center">Vet ID</TableHead>
                  <TableHead className="text-center">Jumlah Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specVisit.map((item) => (
                  <TableRow key={`${item.clinic_id}-${item.vet_id}`}>
                    <TableCell className="text-center font-medium">
                      {item.clinic_id}
                    </TableCell>
                    <TableCell className="text-center">{item.vet_id}</TableCell>
                    <TableCell className="text-center">
                      {item.sv_count ?? '-'}
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
            <Button variant="destructive" onClick={() => onSubmit(specVisit)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
