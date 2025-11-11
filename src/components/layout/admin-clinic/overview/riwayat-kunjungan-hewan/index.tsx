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

import { columns, TRiwayatKunjunganHewan } from './columns';
import { DataTable } from './data-table';

export default function RiwayatKunjunganHewan() {
  const _cookies = useGetCookie();
  const [animalId, setAnimalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [kunjungan, setKunjungan] = useState<TRiwayatKunjunganHewan[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCari = async () => {
    setError(null);
    setKunjungan([]);
    if (!animalId) {
      setError('ID hewan wajib diisi');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin-clinic/overview/animal/${animalId}/visits`,
        {
          headers: {
            authorization: `Bearer ${_cookies('token')}`,
          },
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengambil data');
      setKunjungan(json.data || []);
    } catch (e: any) {
      toast.error(e.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Riwayat Kunjungan Hewan</CardTitle>
        <CardDescription>
          Masukkan ID hewan untuk melihat riwayat kunjungan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex max-w-md gap-2">
          <Input
            placeholder="ID Hewan"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            type="number"
            min={1}
            className=""
            disabled={loading}
          />
          <Button onClick={handleCari} disabled={loading || !animalId}>
            {loading ? 'Mencari...' : 'Cari'}
          </Button>
        </div>
        <DataTable columns={columns} data={kunjungan} />
      </CardContent>
    </Card>
  );
}
