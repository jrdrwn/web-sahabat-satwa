'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGetCookie } from 'cookies-next/client';
import { useState } from 'react';
import { toast } from 'sonner';

import { columns, TDaftarHewanPerJenis } from './columns';
import { DataTable } from './data-table';

export default function DaftarHewanPerJenis() {
  const _cookies = useGetCookie();
  const [jenis, setJenis] = useState('');
  const [loading, setLoading] = useState(false);
  const [hewan, setHewan] = useState<TDaftarHewanPerJenis[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCari = async () => {
    setError(null);
    setHewan([]);
    if (!jenis) {
      setError('Jenis hewan wajib diisi');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin-clinic/overview/animal-type/${jenis}/animals`,
        {
          headers: {
            authorization: `Bearer ${_cookies('token')}`,
          },
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengambil data');
      setHewan(json.data || []);
    } catch (e: any) {
      toast.error(e.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daftar Hewan per Jenis</CardTitle>
        <CardDescription>
          Masukkan ID jenis hewan untuk melihat daftar hewan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex max-w-md gap-2">
          <Input
            placeholder="ID Jenis Hewan"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className=""
            disabled={loading}
          />
          <Button onClick={handleCari} disabled={loading || !jenis}>
            {loading ? 'Mencari...' : 'Cari'}
          </Button>
        </div>
        <DataTable columns={columns} data={hewan} />
      </CardContent>
    </Card>
  );
}
