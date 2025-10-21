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

import { AnimalType } from './list/columns';

export default function DeleteConfirmationButton({
  animalType,
}: {
  animalType: AnimalType[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: AnimalType[]) {
    const resAll = async (animalType: AnimalType) => {
      const res = await fetch(`/api/admin/animal-type/${animalType.at_id}`, {
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
      toast.success('Jenis hewan berhasil dihapus');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Sebagian jenis hewan gagal dihapus');
      router.refresh();
    } else {
      toast.error('Gagal menghapus jenis hewan');
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
              Apakah Anda yakin ingin menghapus Jenis Hewan ini?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Tindakan ini tidak dapat dibatalkan. Semua data terkait jenis
              hewan akan dihapus permanen.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Jenis Hewan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {animalType.map((animalType) => (
                  <TableRow key={animalType.at_id}>
                    <TableCell className="text-center font-medium">
                      {animalType.at_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {animalType.at_description}
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
            <Button variant="destructive" onClick={() => onSubmit(animalType)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
