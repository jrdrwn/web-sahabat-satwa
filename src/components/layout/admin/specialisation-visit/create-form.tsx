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

const specVisitSchema = z.object({
  clinic_id: z.coerce.number(),
  vet_id: z.coerce.number(),
  sv_count: z.coerce.number().optional(),
});

function CreateFormSpecVisit({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();

  const form = useForm<z.infer<typeof specVisitSchema>>({
    resolver: zodResolver(specVisitSchema),
    defaultValues: {
      clinic_id: 0,
      vet_id: 0,
      sv_count: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof specVisitSchema>) {
    const res = await fetch('/api/admin/spec-visit', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${_cookies('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast.success('Data kunjungan spesialisasi berhasil dibuat');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error(
        `Error: ${json.message || 'Gagal membuat data kunjungan spesialisasi'}`,
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="clinic_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Clinic ID</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Clinic ID"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="vet_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Vet ID</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Vet ID"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="sv_count"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Jumlah Visit</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Jumlah visit"
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

export default function CreateFormSpecVisitButton() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
      <ResponsiveModalTrigger asChild>
        <Button>
          <PlusCircle />
          Tambah Kunjungan Spesialisasi
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="mb-4">
          <ResponsiveModalTitle>
            Buat Data Kunjungan Spesialisasi Baru
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Isi data untuk menambah kunjungan spesialisasi.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <CreateFormSpecVisit onOpenChange={handleOpenChange} />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
