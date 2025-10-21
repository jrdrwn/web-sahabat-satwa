import Prefix from '@/components/layout/admin/core/Prefix';
import Header from '@/components/layout/shared/header';
import MainLayout from '@/components/layout/shared/main-layout';
import { cookies } from 'next/headers';

import LoginPage from './login/page';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const _cookies = await cookies();
  if (!_cookies.get('token')?.value) {
    return <LoginPage />;
  }

  return (
    <>
      <Header
        suffix={'Sahabat Satwa'}
        prefix={<Prefix />}
        menus={[
          {
            title: 'Overview',
            href: '/admin',
          },
          {
            title: 'Vet',
            href: '/admin/vet',
          },
          {
            title: 'Owners',
            href: '/admin/owners',
          },
          {
            title: 'Clinic',
            href: '/admin/clinic',
          },
          {
            title: 'Drug',
            href: '/admin/drug',
          },
          {
            title: 'Animal Type',
            href: '/admin/animal-type',
          },
          {
            title: 'Specialisation',
            href: '/admin/specialisation',
          },
          {
            title: 'Animal',
            href: '/admin/animal',
          },
          {
            title: 'Visit',
            href: '/admin/visit',
          },
          {
            title: 'Visit Drug',
            href: '/admin/visit-drug',
          },
          {
            title: 'Specialisation Visit',
            href: '/admin/specialisation-visit',
          },
        ]}
      />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
