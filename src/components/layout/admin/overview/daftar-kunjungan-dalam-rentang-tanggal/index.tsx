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

import { columns, TDaftarKunjunganRentangTanggal } from './columns';
import { DataTable } from './data-table';

export default function DaftarKunjunganDalamRentangTanggal() {
  const _cookies = useGetCookie();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [kunjungan, setKunjungan] = useState<TDaftarKunjunganRentangTanggal[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);

  const handleCari = async () => {
    setError(null);
    setKunjungan([]);
    if (!startDate || !endDate) {
      setError('Tanggal mulai dan akhir wajib diisi');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/overview/visits/range?start_date=${startDate}&end_date=${endDate}`,
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
        <CardTitle>Daftar Kunjungan Dalam Rentang Tanggal</CardTitle>
        <CardDescription>
          Masukkan tanggal mulai dan tanggal akhir untuk melihat daftar
          kunjungan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex max-w-md gap-2">
          <Input
            placeholder="Tanggal Mulai"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            max={endDate || undefined}
            disabled={loading}
          />
          <Input
            placeholder="Tanggal Akhir"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            min={startDate || undefined}
            disabled={loading}
          />
          <Button
            onClick={handleCari}
            disabled={loading || !startDate || !endDate}
          >
            {loading ? 'Mencari...' : 'Cari'}
          </Button>
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <DataTable columns={columns} data={kunjungan} />
      </CardContent>
    </Card>
  );
}
