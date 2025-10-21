'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/expansions/responsive-modal';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCookie } from 'cookies-next/client';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Drug } from './list/columns';

const formSchema = z.object({
  drug_name: z.string().min(1, 'Nama obat/vaksin wajib diisi'),
  drug_usage: z.string().optional(),
});

function EditFormDrug({
  defaultValues,
  onOpenChange,
}: {
  defaultValues: Drug;
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drug_name: defaultValues.drug_name || '',
      drug_usage: defaultValues.drug_usage || '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/admin/drug/${defaultValues.drug_id}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${_cookies('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast.success('Data obat/vaksin berhasil diperbarui');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error(
        `Error: ${json.message || 'Gagal memperbarui data obat/vaksin'}`,
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="drug_name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nama Obat/Vaksin</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Nama obat/vaksin"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="drug_usage"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Penggunaan/Indikasi</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Penggunaan/Indikasi"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export default function EditFormDrugButton({ drug }: { drug: Drug }) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
      <ResponsiveModalTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil />
          Edit
        </DropdownMenuItem>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="mb-4">
          <ResponsiveModalTitle>Edit Obat/Vaksin</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Edit detail untuk #{drug.drug_id} - {drug.drug_name}.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <EditFormDrug defaultValues={drug} onOpenChange={handleOpenChange} />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
