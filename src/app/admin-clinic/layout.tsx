import Prefix from '@/components/layout/admin-clinic/core/Prefix';
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
            href: '/admin-clinic',
          },
          {
            title: 'Clinic',
            href: '/admin-clinic/clinic',
          },
          {
            title: 'Admin Clinic',
            href: '/admin-clinic/admin-clinic',
          },
          {
            title: 'Vet',
            href: '/admin-clinic/vet',
          },
          {
            title: 'Owners',
            href: '/admin-clinic/owners',
          },
          {
            title: 'Drug',
            href: '/admin-clinic/drug',
          },
          {
            title: 'Animal Type',
            href: '/admin-clinic/animal-type',
          },
          {
            title: 'Specialisation',
            href: '/admin-clinic/specialisation',
          },
          {
            title: 'Animal',
            href: '/admin-clinic/animal',
          },
          {
            title: 'Visit',
            href: '/admin-clinic/visit',
          },
          {
            title: 'Visit Drug',
            href: '/admin-clinic/visit-drug',
          },
          {
            title: 'Specialisation Visit',
            href: '/admin-clinic/specialisation-visit',
          },
        ]}
      />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
