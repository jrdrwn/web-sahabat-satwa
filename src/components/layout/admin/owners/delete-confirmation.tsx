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

import { Owner } from './list/columns';

export default function DeleteConfirmationButton({
  owner,
}: {
  owner: Owner[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const _cookies = useGetCookie();
  const router = useRouter();
  async function onSubmit(data: Owner[]) {
    const resAll = async (owner: Owner) => {
      const res = await fetch(`/api/admin/owners/${owner.owner_id}`, {
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
      toast.success('Owner deleted successfully');
      router.refresh();
    } else if (results.some((result) => result)) {
      toast.warning('Some Owner could not be deleted');
      router.refresh();
    } else {
      toast.error('Failed to delete Owner');
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
              Are you sure you want to delete this Owner?
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              This action cannot be undone. All data associated with this Owner
              will be permanently deleted.
            </ResponsiveModalDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {owner.map((owner) => (
                  <TableRow key={owner.owner_id}>
                    <TableCell className="text-center font-medium">
                      {owner.owner_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {owner.owner_givenname} {owner.owner_familyname}
                    </TableCell>
                    <TableCell className="text-center">
                      {owner.owner_phone}
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
            <Button variant="destructive" onClick={() => onSubmit(owner)}>
              Delete
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}
