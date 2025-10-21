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

import { Animal } from './list/columns';

const formSchema = z.object({
  animal_name: z.string().min(1, 'Nama hewan wajib diisi'),
  animal_born: z.string().optional(),
  owner_id: z.coerce.number(),
  at_id: z.coerce.number(),
});

function EditFormAnimal({
  defaultValues,
  onOpenChange,
}: {
  defaultValues: Animal;
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animal_name: defaultValues.animal_name || '',
      animal_born: defaultValues.animal_born || '',
      owner_id: defaultValues.owner_id,
      at_id: defaultValues.at_id,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/admin/animal/${defaultValues.animal_id}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${_cookies('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast.success('Data hewan berhasil diperbarui');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error(`Error: ${json.message || 'Gagal memperbarui data hewan'}`);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="animal_name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nama Hewan</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Nama hewan"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="animal_born"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Tanggal Lahir</FieldLabel>
            <Input
              type="date"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Tanggal lahir (opsional)"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="owner_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>ID Pemilik</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="ID pemilik"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="at_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>ID Jenis Hewan</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="ID jenis hewan"
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

export default function EditFormAnimalButton({ animal }: { animal: Animal }) {
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
          <ResponsiveModalTitle>Edit Hewan</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Edit detail untuk #{animal.animal_id} - {animal.animal_name}.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <EditFormAnimal
          defaultValues={animal}
          onOpenChange={handleOpenChange}
        />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
