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

import { Animal } from './list/columns';

export default function DeleteConfirmationButton({
  animal,
}: {
  animal: Animal[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: Animal[]) {
    const resAll = async (animal: Animal) => {
      const res = await fetch(`/api/admin-clinic/animal/${animal.animal_id}`, {
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
      toast.success('Data hewan berhasil dihapus');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Sebagian data hewan gagal dihapus');
      router.refresh();
    } else {
      toast.error('Gagal menghapus data hewan');
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
              Apakah Anda yakin ingin menghapus data hewan ini?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data terkait hewan akan
              dihapus permanen.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Nama Hewan</TableHead>
                  <TableHead className="text-center">Tanggal Lahir</TableHead>
                  <TableHead className="text-center">ID Pemilik</TableHead>
                  <TableHead className="text-center">ID Jenis Hewan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {animal.map((animal) => (
                  <TableRow key={animal.animal_id}>
                    <TableCell className="text-center font-medium">
                      {animal.animal_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {animal.animal_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {animal.animal_born || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {animal.owner_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {animal.at_id}
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
            <Button variant="destructive" onClick={() => onSubmit(animal)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
