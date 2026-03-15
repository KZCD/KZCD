import { Card } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Camera, Calendar, MapPin, Receipt as ReceiptIcon, Download, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { SPECIAL_REQUESTS } from './SpecialRequests';

interface ReceiptProps {
  serviceType: string;
  category: string;
  location: string;
  selectedDate: Date | undefined;
  selectedRequests: string[];
  additionalNotes: string;
  basePrice: number;
  onReset: () => void;
}

const serviceLabels: Record<string, string> = {
  photography: 'Fotografi',
  videography: 'Videografi',
};

const categoryLabels: Record<string, string> = {
  wedding: 'Pernikahan',
  product: 'Produk',
  portraits: 'Potret',
};

const locationLabels: Record<string, string> = {
  studio: 'Studio',
  nonstudio: 'Non-Studio',
  event: 'Event (Anime Cons)',
};

export function Receipt({
  serviceType,
  category,
  location,
  selectedDate,
  selectedRequests,
  additionalNotes,
  basePrice,
  onReset,
}: ReceiptProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const extraCosts = SPECIAL_REQUESTS.filter((req) =>
    selectedRequests.includes(req.id)
  );

  const totalExtraCost = extraCosts.reduce((sum, req) => sum + req.price, 0);
  const subtotal = basePrice + totalExtraCost;
  const deposit = Math.round(subtotal * 0.3); // 30% deposit
  const remaining = subtotal - deposit;

  // Generate a mock receipt number
  const receiptNumber = `INV-${format(new Date(), 'yyyyMMdd')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
          <ReceiptIcon className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Ringkasan Booking</h2>
        <p className="text-gray-400">
          Simpan halaman ini sebagai referensi
        </p>
      </div>

      {/* Receipt Card */}
      <Card className="p-8 bg-gray-800 border-gray-700 mb-6">
        {/* Receipt Header */}
        <div className="text-center mb-6 pb-6 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-1">KWITANSI SEMENTARA</h3>
          <p className="text-sm text-gray-400">Nomor: {receiptNumber}</p>
          <p className="text-sm text-gray-400">
            Tanggal: {format(new Date(), 'dd MMMM yyyy', { locale: id })}
          </p>
        </div>

        {/* Service Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Camera className="text-purple-400 mt-1 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Layanan</p>
              <p className="text-white font-semibold">
                {serviceLabels[serviceType]} - {categoryLabels[category]}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-purple-400 mt-1 flex-shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Lokasi</p>
              <p className="text-white font-semibold">{locationLabels[location]}</p>
            </div>
          </div>

          {selectedDate && (
            <div className="flex items-start gap-3">
              <Calendar className="text-purple-400 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Tanggal Booking</p>
                <p className="text-white font-semibold">
                  {format(selectedDate, 'dd MMMM yyyy (EEEE)', { locale: id })}
                </p>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-6 bg-gray-700" />

        {/* Pricing Breakdown */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-white mb-3">Rincian Biaya</h4>
          
          <div className="flex justify-between text-gray-300">
            <span>Paket Dasar ({serviceLabels[serviceType]} - {categoryLabels[category]})</span>
            <span>{formatPrice(basePrice)}</span>
          </div>

          {extraCosts.length > 0 && (
            <>
              <div className="pl-4 space-y-2 border-l-2 border-purple-500/30">
                <p className="text-sm text-gray-400 font-medium">Layanan Tambahan:</p>
                {extraCosts.map((req) => (
                  <div key={req.id} className="flex justify-between text-sm text-gray-300">
                    <span>• {req.label}</span>
                    <span>{formatPrice(req.price)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Separator className="my-6 bg-gray-700" />

        {/* Totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-lg">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-lg bg-purple-900/30 p-3 rounded-lg border border-purple-500/30">
            <span className="text-purple-300 font-semibold">DP (30%)</span>
            <span className="text-purple-300 font-bold">{formatPrice(deposit)}</span>
          </div>

          <div className="flex justify-between text-lg">
            <span className="text-gray-300">Sisa Pembayaran</span>
            <span className="text-white font-semibold">{formatPrice(remaining)}</span>
          </div>
        </div>

        {/* Additional Notes */}
        {additionalNotes && (
          <>
            <Separator className="my-6 bg-gray-700" />
            <div>
              <h4 className="font-semibold text-white mb-2">Catatan Khusus</h4>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{additionalNotes}</p>
              </div>
            </div>
          </>
        )}

        <Separator className="my-6 bg-gray-700" />

        {/* Terms */}
        <div className="text-xs text-gray-400 space-y-2">
          <p className="font-semibold text-gray-300">Syarat & Ketentuan:</p>
          <ul className="space-y-1 pl-4">
            <li>• DP 30% wajib dibayarkan untuk konfirmasi booking</li>
            <li>• Sisa pembayaran dilunasi H-3 sebelum sesi</li>
            <li>• Pembatalan dari klien: DP hangus</li>
            <li>• Reschedule maksimal 1x, 7 hari sebelum tanggal sesi</li>
            <li>• Hasil foto/video dikirim sesuai waktu pengerjaan yang telah ditentukan</li>
          </ul>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          className="border-gray-700 hover:bg-gray-800 text-white"
          onClick={() => window.print()}
        >
          <Download size={18} className="mr-2" />
          Simpan PDF
        </Button>
        <Button
          variant="outline"
          className="border-gray-700 hover:bg-gray-800 text-white"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Ringkasan Booking',
                text: 'Lihat ringkasan booking saya',
              });
            }
          }}
        >
          <Share2 size={18} className="mr-2" />
          Bagikan
        </Button>
      </div>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 mb-6">
        <h3 className="font-semibold text-green-300 mb-3">Langkah Selanjutnya</h3>
        <ol className="space-y-2 text-sm text-green-200">
          <li className="flex gap-2">
            <span className="font-bold">1.</span>
            <span>Screenshot/simpan halaman ini</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">2.</span>
            <span>Tim kami akan menghubungi Anda via Instagram dalam 24 jam</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3.</span>
            <span>Konfirmasi booking & detail pembayaran DP</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">4.</span>
            <span>Booking dikonfirmasi setelah DP diterima</span>
          </li>
        </ol>
      </Card>

      {/* Contact Info */}
      <Card className="p-4 bg-gray-800 border-gray-700 mb-6">
        <p className="text-sm text-gray-300 text-center">
          <strong className="text-white">Pertanyaan?</strong> Hubungi kami di Instagram{' '}
          <span className="text-purple-400">@yourstudio</span> atau WhatsApp{' '}
          <span className="text-purple-400">+62 812-3456-7890</span>
        </p>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={onReset}
          className="border-gray-700 hover:bg-gray-800 text-white"
        >
          Mulai Booking Baru
        </Button>
      </div>
    </div>
  );
}
