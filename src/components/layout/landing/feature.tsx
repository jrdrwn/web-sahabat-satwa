import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function Feature() {
  return (
    <section className="container mx-auto px-2 py-16">
      <div className="grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <Card className="py-3 sm:py-6 lg:row-span-2 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
              }
              alt="Perlindungan Satwa"
              width={1024}
              height={1024}
              className="h-60 rounded-lg object-cover object-center"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Kenapa Sahabat Satwa Diciptakan?
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Banyak satwa membutuhkan perlindungan, perawatan, dan rumah baru.
              Sahabat Satwa hadir untuk memudahkan kolaborasi relawan, donatur,
              dan pecinta hewan dalam satu platform.
            </CardDescription>
            <CardDescription className="text-base xl:text-lg">
              Semua proses adopsi, donasi, dan edukasi satwa kini bisa dilakukan
              secara digital, transparan, dan efisien. Platform ini membantu
              mempercepat aksi nyata dan memperluas jangkauan perlindungan
              satwa.
            </CardDescription>
            <CardDescription className="text-base xl:text-lg">
              Dengan Sahabat Satwa, kolaborasi untuk kesejahteraan hewan menjadi
              lebih mudah dan terstruktur.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-1 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
              }
              alt="Manajemen Data Satwa"
              width={1024}
              height={1024}
              className="rounded-lg object-cover object-center lg:h-45 xl:h-40"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Manajemen Data Satwa
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Relawan dan admin dapat mengelola data satwa, adopsi, dan
              kebutuhan hewan dengan mudah. Pecinta satwa dapat melihat profil
              hewan, status adopsi, dan kebutuhan donasi secara real-time.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-1 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1528901166007-3784c7dd3653'
              }
              alt="Peran Relawan Satwa"
              width={1024}
              height={1024}
              className="h-35 rounded-lg object-cover object-center"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Peran Relawan Satwa
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Relawan dapat membantu perawatan, edukasi, dan kampanye adopsi
              satwa secara online. Kolaborasi antara relawan, donatur, dan admin
              menjadi lebih mudah.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-2 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1587691592099-24045742c181'
              }
              alt="Integrasi & Transparansi Satwa"
              width={1024}
              height={1024}
              className="w-full rounded-lg object-cover object-center lg:h-45 xl:h-50"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Integrasi & Transparansi
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Semua data dan proses perlindungan satwa terintegrasi dalam satu
              platform. Setiap pengguna (relawan, donatur, admin) memiliki akses
              sesuai peran dan kebutuhan.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
