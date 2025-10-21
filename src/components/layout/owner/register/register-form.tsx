'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LockKeyhole, MailIcon, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Checkbox } from '../../../ui/checkbox';
import { Field, FieldError, FieldLabel } from '../../../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../../ui/input-group';

const phoneRegex = /^[0-9+()\-\s]*$/;

const formSchema = z.object({
  owner_givenname: z
    .string({
      required_error: 'Nama depan wajib diisi',
    })
    .trim()
    .min(1, 'Nama depan wajib diisi')
    .max(30, 'Nama depan maksimal 30 karakter'),
  owner_familyname: z
    .string({
      required_error: 'Nama belakang wajib diisi',
    })
    .trim()
    .min(1, 'Nama belakang wajib diisi')
    .max(30, 'Nama belakang maksimal 30 karakter'),
  owner_address: z
    .string()
    .trim()
    .max(100, 'Alamat maksimal 100 karakter')
    .optional(),
  owner_phone: z
    .string()
    .trim()
    .max(14, 'Nomor telepon maksimal 14 karakter')
    .regex(
      phoneRegex,
      'Nomor telepon hanya boleh berisi angka, spasi, +, -, dan tanda kurung',
    )
    .optional(),
  email: z
    .string({
      required_error: 'Email wajib diisi',
      invalid_type_error: 'Email tidak valid',
    })
    .trim()
    .email('Alamat email tidak valid')
    .max(100, 'Email maksimal 100 karakter'),
  password: z
    .string({
      required_error: 'Kata sandi wajib diisi',
    })
    .min(8, 'Kata sandi minimal 8 karakter')
    .max(255, 'Kata sandi maksimal 255 karakter'),
  confirmPassword: z
    .string({
      required_error: 'Konfirmasi kata sandi wajib diisi',
    })
    .min(8, 'Konfirmasi kata sandi minimal 8 karakter'),
  terms: z
    .boolean({
      required_error: 'Anda harus menyetujui Syarat dan Ketentuan',
    })
    .refine((val) => val === true, {
      message: 'Anda harus menyetujui Syarat dan Ketentuan',
    }),
});

export default function CreateAccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner_givenname: '',
      owner_familyname: '',
      owner_address: '',
      owner_phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    const res = await fetch('/api/owner/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner_givenname: data.owner_givenname,
        owner_familyname: data.owner_familyname,
        owner_address: data.owner_address,
        owner_phone: data.owner_phone,
        email: data.email,
        password: data.password,
      }),
    });

    if (res.ok) {
      toast.success('Account created successfully! You can now log in.');
      form.reset();
    } else {
      const errorData = await res.json();
      toast.error(
        errorData?.message || 'Failed to create account. Please try again.',
      );
    }
  }

  return (
    <section className="py-20">
      <div className="container">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-md border-primary">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-primary">
                Create a New Account
              </CardTitle>
              <CardDescription className="text-center">
                Sign up to save your persona history and access advanced
                features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="owner_givenname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Nama Depan</FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Nama depan"
                        type="text"
                        autoComplete="off"
                        maxLength={30}
                      />
                      <InputGroupAddon>
                        <User className="text-primary" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="owner_familyname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Nama Belakang</FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Nama belakang"
                        type="text"
                        autoComplete="off"
                        maxLength={30}
                      />
                      <InputGroupAddon>
                        <User className="text-primary" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="owner_address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Alamat (opsional)
                    </FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Alamat"
                        type="text"
                        autoComplete="off"
                        maxLength={100}
                      />
                      <InputGroupAddon>
                        <User className="text-primary" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="owner_phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Nomor Telepon (opsional)
                    </FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="+62 812-3456-7890"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={14}
                        pattern="[0-9+()\-\s]*"
                      />
                      <InputGroupAddon>
                        <User className="text-primary" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="nama@email.com"
                        type="email"
                        autoComplete="email"
                      />
                      <InputGroupAddon>
                        <MailIcon className="text-primary" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Kata Sandi</FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukkan kata sandi"
                        type={passwordVisible ? 'text' : 'password'}
                        autoComplete="new-password"
                      />
                      <InputGroupAddon>
                        <LockKeyhole className="text-primary" />
                      </InputGroupAddon>

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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="mb-4 w-full gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Konfirmasi Kata Sandi
                    </FieldLabel>
                    <InputGroup className="border-primary">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Ulangi kata sandi"
                        type={passwordVisible ? 'text' : 'password'}
                        autoComplete="new-password"
                      />
                      <InputGroupAddon>
                        <LockKeyhole className="text-primary" />
                      </InputGroupAddon>

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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="mb-4">
                    <FieldLabel className="flex items-center gap-2">
                      <Checkbox
                        id={field.name}
                        checked={field.value}
                        aria-invalid={fieldState.invalid}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <span className="text-sm text-muted-foreground">
                        Saya menyetujui{' '}
                        <Link href="#" className="text-primary hover:underline">
                          Syarat dan Ketentuan
                        </Link>
                        .
                      </span>
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button className="w-full" type="submit">
                Create Account
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Sudah punya akun?{' '}
                <Link
                  href="/login/owner"
                  className="text-primary hover:underline"
                >
                  Masuk.
                </Link>
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  );
}
