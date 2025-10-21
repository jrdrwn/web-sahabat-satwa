import Prefix from '@/components/layout/owner/core/Prefix';
import Header from '@/components/layout/shared/header';
import MainLayout from '@/components/layout/shared/main-layout';
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
            href: '/owner/animal',
          },
          {
            title: 'Visits',
            href: '/owner/visit',
          },
        ]}
      />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
