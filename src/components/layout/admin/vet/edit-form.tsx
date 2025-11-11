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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCookie } from 'cookies-next/client';
import { Eye, EyeOff, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Vet } from './list/columns';

const formSchema = z.object({
  vet_title: z.string().min(1, 'Judul wajib diisi'),
  vet_givenname: z.string().min(1, 'Nama depan wajib diisi'),
  vet_familyname: z.string().min(1, 'Nama belakang wajib diisi'),
  vet_phone: z.string().min(1, 'Nomor telepon wajib diisi'),
  vet_employed: z.string().min(1, 'Tanggal wajib diisi'), // ISO date string
  spec_id: z.coerce.number().int().min(1, 'Spesialis wajib diisi'),
  clinic_id: z.coerce.number().int().min(1, 'Klinik wajib diisi'),
  email: z.string().email('Email tidak valid'),
  // password is optional during edit; only fill if you want to change it
  password: z.string().min(8).optional(),
});

function EditFormVet({
  defaultValues,
  onOpenChange,
}: {
  defaultValues: Vet; // Use actual Vet type if available
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vet_title: defaultValues.vet_title || '',
      vet_givenname: defaultValues.vet_givenname || '',
      vet_familyname: defaultValues.vet_familyname || '',
      vet_phone: defaultValues.vet_phone || '',
      vet_employed: defaultValues.vet_employed
        ? defaultValues.vet_employed.slice(0, 10)
        : '',
      spec_id: defaultValues.spec_id || 1,
      clinic_id: defaultValues.clinic_id || 1,
      email: defaultValues.email || '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/admin/vet/${defaultValues.vet_id}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${_cookies('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast.success('Data vet berhasil diperbarui');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error(`Error: ${json.message || 'Gagal memperbarui data vet'}`);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="vet_title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Judul</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Dr., Prof., dll"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="vet_givenname"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nama Depan</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Nama depan"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="vet_familyname"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nama Belakang</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Nama belakang"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="vet_phone"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>No. Telepon</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Nomor telepon"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="vet_employed"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Tanggal Masuk</FieldLabel>
            <Input aria-invalid={fieldState.invalid} {...field} type="date" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              type="email"
              placeholder="Masukkan email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                aria-invalid={fieldState.invalid}
                {...field}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Masukkan password"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <EyeOff className="text-primary" />
                  ) : (
                    <Eye className="text-primary" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Isi hanya jika ingin mengubah password.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="spec_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>ID Spesialis</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              type="number"
              placeholder="ID Spesialis"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="clinic_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>ID Klinik</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              type="number"
              placeholder="ID Klinik"
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

export default function EditFormVetButton({
  vet,
}: {
  vet: Vet; // Use actual Vet type if available
}) {
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
          <ResponsiveModalTitle>Edit Vet</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Edit details for #{vet.vet_id} - {vet.vet_givenname}{' '}
            {vet.vet_familyname}.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <EditFormVet defaultValues={vet} onOpenChange={handleOpenChange} />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
