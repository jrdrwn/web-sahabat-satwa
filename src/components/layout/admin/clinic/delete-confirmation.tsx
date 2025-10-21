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

import { Clinic } from './list/columns';

export default function DeleteConfirmationButton({
  clinic,
}: {
  clinic: Clinic[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: Clinic[]) {
    const resAll = async (clinic: Clinic) => {
      const res = await fetch(`/api/admin/clinic/${clinic.clinic_id}`, {
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
      toast.success('Klinik berhasil dihapus');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Sebagian klinik gagal dihapus');
      router.refresh();
    } else {
      toast.error('Gagal menghapus klinik');
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
              Apakah Anda yakin ingin menghapus Klinik ini?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data terkait klinik
              akan dihapus permanen.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Nama Klinik</TableHead>
                  <TableHead className="text-center">Telepon</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clinic.map((clinic) => (
                  <TableRow key={clinic.clinic_id}>
                    <TableCell className="text-center font-medium">
                      {clinic.clinic_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {clinic.clinic_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {clinic.clinic_phone}
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
            <Button variant="destructive" onClick={() => onSubmit(clinic)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
