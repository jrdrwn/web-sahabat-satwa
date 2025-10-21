import Header from '@/components/layout/shared/header';
import MainLayout from '@/components/layout/shared/main-layout';
import Prefix from '@/components/layout/vet/core/Prefix';
import { cookies } from 'next/headers';

import LoginPage from './login/page';

export default async function PraktikanLayout({
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
            title: 'Animals',
            href: '/vet/animal',
          },
          {
            title: 'Owners',
            href: '/vet/owners',
          },
          {
            title: 'Vets',
            href: '/vet/vet',
          },
          {
            title: 'Visits',
            href: '/vet/visit',
          },
          {
            title: 'Visit Drugs',
            href: '/vet/visit-drug',
          },
        ]}
      />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
