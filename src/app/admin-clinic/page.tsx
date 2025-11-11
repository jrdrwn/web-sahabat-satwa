import DaftarHewanPerJenis from '@/components/layout/admin-clinic/overview/daftar-hewan-per-jenis';
import DaftarKunjunganDalamRentangTanggal from '@/components/layout/admin-clinic/overview/daftar-kunjungan-dalam-rentang-tanggal';
import RiwayatKunjunganHewan from '@/components/layout/admin-clinic/overview/riwayat-kunjungan-hewan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function AdminPage() {
  return (
    <>
      <section className="m-8">
        <Tabs
          defaultValue="daftar-kunjungan-dalam-rentang-tanggal"
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="daftar-kunjungan-dalam-rentang-tanggal">
              Daftar Kunjungan Dalam Rentang Tanggal
            </TabsTrigger>
            <TabsTrigger value="riwayat-kunjungan-hewan">
              Riwayat Kunjungan Hewan
            </TabsTrigger>
            <TabsTrigger value="daftar-hewan-per-jenis">
              Daftar Hewan per Jenis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="daftar-kunjungan-dalam-rentang-tanggal">
            <DaftarKunjunganDalamRentangTanggal />
          </TabsContent>
          <TabsContent value="riwayat-kunjungan-hewan">
            <RiwayatKunjunganHewan />
          </TabsContent>
          <TabsContent value="daftar-hewan-per-jenis">
            <DaftarHewanPerJenis />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
