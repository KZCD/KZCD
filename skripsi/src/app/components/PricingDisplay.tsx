import { DollarSign, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface PricingDisplayProps {
  serviceType: string;
  category: string;
  location: string;
  onNext: () => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

// Pricing structure in IDR
const pricing: Record<string, Record<string, Record<string, number>>> = {
  photography: {
    wedding: {
      studio: 3500000,
      nonstudio: 4500000,
      event: 5000000,
    },
    product: {
      studio: 1500000,
      nonstudio: 2000000,
      event: 2500000,
    },
    portraits: {
      studio: 1000000,
      nonstudio: 1500000,
      event: 2000000,
    },
  },
  videography: {
    wedding: {
      studio: 5000000,
      nonstudio: 6500000,
      event: 7500000,
    },
    product: {
      studio: 2500000,
      nonstudio: 3000000,
      event: 3500000,
    },
    portraits: {
      studio: 2000000,
      nonstudio: 2500000,
      event: 3000000,
    },
  },
};

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

export function PricingDisplay({
  serviceType,
  category,
  location,
  onNext,
  onBack,
  step,
  totalSteps,
}: PricingDisplayProps) {
  const basePrice = pricing[serviceType]?.[category]?.[location] || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Langkah {step} dari {totalSteps}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round((step / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Daftar Harga
      </h2>

      <div className="space-y-6 mb-8">
        {/* Selection Summary */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
            <Info size={20} className="text-purple-400" />
            Pilihan Anda
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Layanan:</span>
              <span className="text-white font-medium">{serviceLabels[serviceType]}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Kategori:</span>
              <span className="text-white font-medium">{categoryLabels[category]}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Lokasi:</span>
              <span className="text-white font-medium">{locationLabels[location]}</span>
            </div>
          </div>
        </Card>

        {/* Pricing Card */}
        <Card className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/50">
          <div className="text-center mb-6">
            <DollarSign className="inline-block text-purple-400 mb-2" size={40} />
            <h3 className="text-xl font-semibold text-white mb-2">Harga Paket Dasar</h3>
            <p className="text-sm text-gray-400">Harga dapat disesuaikan dengan kebutuhan spesifik</p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-4">
              {formatPrice(basePrice)}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 text-center mb-4">Sudah termasuk:</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                {serviceType === 'photography' ? 'Semua foto hasil (RAW + Edited)' : 'Video hasil editing (Full HD)'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                {category === 'wedding' ? 'Durasi 6-8 jam' : 'Sesi 2-3 jam'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                1 fotografer/videografer profesional
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                Konsultasi pre-event gratis
              </li>
            </ul>
          </div>
        </Card>

        <Card className="p-4 bg-blue-900/20 border-blue-500/30">
          <p className="text-sm text-blue-300 text-center">
            💡 <strong>Catatan:</strong> Harga dapat berubah tergantung permintaan tambahan dan jarak lokasi
          </p>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-gray-700 hover:bg-gray-800 text-white"
        >
          Kembali
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          Lanjut ke Kalender
        </Button>
      </div>
    </div>
  );
}
