'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main
      className={cn(
        'h-svh',
        ['/admin/login', '/vet/login', '/vet/register'].includes(pathname)
          ? null
          : 'pt-16',
      )}
    >
      {children}
    </main>
  );
}
