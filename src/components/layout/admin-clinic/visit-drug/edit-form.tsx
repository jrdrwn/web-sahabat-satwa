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

import { VisitDrug } from './list/columns';

const visitDrugFormSchema = z.object({
  visit_id: z.coerce.number(),
  drug_id: z.coerce.number(),
  visit_drug_dose: z.string().optional(),
  visit_drug_frequency: z.string().optional(),
  visit_drug_qtysupplied: z.coerce.number().optional(),
});

function EditFormVisitDrug({
  defaultValues,
  onOpenChange,
}: {
  defaultValues: VisitDrug;
  onOpenChange: (open: boolean) => void;
}) {
  const _cookies = useGetCookie();
  const router = useRouter();
  const form = useForm<z.infer<typeof visitDrugFormSchema>>({
    resolver: zodResolver(visitDrugFormSchema),
    defaultValues: {
      visit_id: defaultValues.visit_id,
      drug_id: defaultValues.drug_id,
      visit_drug_dose: defaultValues.visit_drug_dose || '',
      visit_drug_frequency: defaultValues.visit_drug_frequency || '',
      visit_drug_qtysupplied: defaultValues.visit_drug_qtysupplied,
    },
  });

  async function onSubmit(data: z.infer<typeof visitDrugFormSchema>) {
    const res = await fetch(
      `/api/admin-clinic/visit-drug/${defaultValues.visit_id}/${defaultValues.drug_id}`,
      {
        method: 'PUT',
        headers: {
          'authorization': `Bearer ${_cookies('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const json = await res.json();
    if (res.ok) {
      toast.success('Data obat kunjungan berhasil diperbarui');
      form.reset();
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error(
        `Error: ${json.message || 'Gagal memperbarui data obat kunjungan'}`,
      );
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="visit_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Visit ID</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Visit ID"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="drug_id"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Drug ID</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Drug ID"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="visit_drug_dose"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Dosis</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Dosis obat"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="visit_drug_frequency"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Frekuensi</FieldLabel>
            <Input
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Frekuensi pemberian"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="visit_drug_qtysupplied"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Jumlah</FieldLabel>
            <Input
              type="number"
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder="Jumlah obat"
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

export default function EditFormVisitDrugButton({
  visitDrug,
}: {
  visitDrug: VisitDrug;
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
          <ResponsiveModalTitle>Edit Obat Kunjungan</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Edit detail untuk Visit ID #{visitDrug.visit_id}, Drug ID #
            {visitDrug.drug_id}.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <EditFormVisitDrug
          defaultValues={visitDrug}
          onOpenChange={handleOpenChange}
        />
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
