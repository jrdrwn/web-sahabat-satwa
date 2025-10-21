'use client';

import { Button } from '@/components/ui/button';
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
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  owner_givenname: z.string().min(1, 'Nama depan harus diisi'),
  owner_familyname: z.string().min(1, 'Nama belakang harus diisi'),
  owner_address: z.string().min(1, 'Alamat harus diisi'),
  owner_phone: z.string().min(1, 'Nomor telepon harus diisi'),
});

function CreateFormOwner({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner_givenname: '',
      owner_familyname: '',
      owner_address: '',
      owner_phone: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetch('/api/admin/owners', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${_cookies('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast('Owner berhasil dibuat');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast(`Error: ${json.message || 'Gagal membuat owner'}`);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="owner_givenname"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nama Depan</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Masukkan nama depan"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="owner_familyname"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nama Belakang</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Masukkan nama belakang"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="owner_address"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Alamat</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Masukkan alamat"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="owner_phone"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nomor Telepon</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Masukkan nomor telepon"
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

export default function CreateFormOwnerButton() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
      <ResponsiveModalTrigger asChild>
        <Button>
          <PlusCircle />
          Create Owner
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="mb-4">
          <ResponsiveModalTitle>Create New Owner</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Isi data untuk membuat owner baru.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <CreateFormOwner onOpenChange={handleOpenChange} />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
