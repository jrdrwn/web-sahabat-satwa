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

import { Vet } from './list/columns';

export default function DeleteConfirmationButton({ vet }: { vet: Vet[] }) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: Vet[]) {
    const resAll = async (vet: Vet) => {
      const res = await fetch(`/api/admin-clinic/vet/${vet.vet_id}`, {
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
      toast.success('Vet deleted successfully');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Some Vet could not be deleted');
      router.refresh();
    } else {
      toast.error('Failed to delete Vet');
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
              {/* Ubah judul agar sesuai dengan konteks Vet */}
              Are you sure you want to delete this Vet?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              {/* Ubah deskripsi agar sesuai dengan konteks Vet */}
              This action cannot be undone. All data associated with this Vet
              will be permanently deleted.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Name</TableHead>
                  {/* Comment kolom yang tidak penting jika ada */}
                  {/* <TableHead className="text-center">Other Info</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {vet.map((vet) => (
                  <TableRow key={vet.vet_id}>
                    <TableCell className="text-center font-medium">
                      {vet.vet_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {/* Tampilkan nama lengkap vet */}
                      {vet.vet_givenname} {vet.vet_familyname}
                    </TableCell>
                    {/* Comment cell yang tidak penting jika ada */}
                    {/* <TableCell className="text-center">-</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResponsiveModalHeader>
          <ResponsiveModalFooter className="gap-2">
            <ResponsiveModalClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </ResponsiveModalClose>
            <Button variant="destructive" onClick={() => onSubmit(vet)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
