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

import { Drug } from './list/columns';

export default function DeleteConfirmationButton({ drug }: { drug: Drug[] }) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: Drug[]) {
    const resAll = async (drug: Drug) => {
      const res = await fetch(`/api/admin/drug/${drug.drug_id}`, {
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
      toast.success('Obat/vaksin berhasil dihapus');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Sebagian obat/vaksin gagal dihapus');
      router.refresh();
    } else {
      toast.error('Gagal menghapus obat/vaksin');
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
              Apakah Anda yakin ingin menghapus Obat/Vaksin ini?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data terkait
              obat/vaksin akan dihapus permanen.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">
                    Nama Obat/Vaksin
                  </TableHead>
                  <TableHead className="text-center">
                    Penggunaan/Indikasi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drug.map((drug) => (
                  <TableRow key={drug.drug_id}>
                    <TableCell className="text-center font-medium">
                      {drug.drug_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {drug.drug_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {drug.drug_usage}
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
            <Button variant="destructive" onClick={() => onSubmit(drug)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
