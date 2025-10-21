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
  spec_description: z.string().min(1, 'Spesialisasi wajib diisi'),
});

function CreateFormSpecialisation({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spec_description: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetch('/api/admin/specialisation', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${_cookies('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      toast('Spesialisasi berhasil dibuat');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast(`Error: ${json.message || 'Gagal membuat spesialisasi'}`);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="spec_description"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Spesialisasi</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Nama/uraian spesialisasi"
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

export default function CreateFormSpecialisationButton() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <ResponsiveModal open={open} onOpenChange={handleOpenChange}>
      <ResponsiveModalTrigger asChild>
        <Button>
          <PlusCircle />
          Create Specialisation
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className="mb-4">
          <ResponsiveModalTitle>Buat Spesialisasi Baru</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Isi data untuk membuat spesialisasi baru.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <CreateFormSpecialisation onOpenChange={handleOpenChange} />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
