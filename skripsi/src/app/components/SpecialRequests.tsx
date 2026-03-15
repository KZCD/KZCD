import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Wind, Link2, Gem, Plus } from 'lucide-react';

interface SpecialRequest {
  id: string;
  label: string;
  icon: React.ElementType;
  price: number;
  description: string;
}

interface SpecialRequestsProps {
  selectedRequests: string[];
  onToggleRequest: (id: string) => void;
  additionalNotes: string;
  onNotesChange: (notes: string) => void;
  onNext: () => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

const SPECIAL_REQUESTS: SpecialRequest[] = [
  {
    id: 'smoke',
    label: 'Mesin Asap (Smoke Machine)',
    icon: Wind,
    price: 500000,
    description: 'Efek asap untuk foto/video yang lebih dramatis',
  },
  {
    id: 'ropes',
    label: 'Tali & Rigging',
    icon: Link2,
    price: 300000,
    description: 'Untuk foto aerial atau sudut unik',
  },
  {
    id: 'accessories',
    label: 'Aksesori Tambahan',
    icon: Gem,
    price: 400000,
    description: 'Props, backdrop, lighting tambahan',
  },
  {
    id: 'assistant',
    label: 'Asisten Tambahan',
    icon: Plus,
    price: 600000,
    description: 'Fotografer/videografer kedua',
  },
];

export function SpecialRequests({
  selectedRequests,
  onToggleRequest,
  additionalNotes,
  onNotesChange,
  onNext,
  onBack,
  step,
  totalSteps,
}: SpecialRequestsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalExtraCost = SPECIAL_REQUESTS.filter((req) =>
    selectedRequests.includes(req.id)
  ).reduce((sum, req) => sum + req.price, 0);

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

      <h2 className="text-3xl font-bold text-center mb-2 text-white">
        Permintaan Khusus
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Tambahkan layanan ekstra untuk sesi Anda (opsional)
      </p>

      <div className="space-y-6 mb-8">
        {/* Special Requests Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {SPECIAL_REQUESTS.map((request) => {
            const Icon = request.icon;
            const isSelected = selectedRequests.includes(request.id);

            return (
              <Card
                key={request.id}
                className={`p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 bg-gray-800 border-gray-700 ${
                  isSelected
                    ? 'ring-2 ring-purple-500 bg-purple-900/30 border-purple-500'
                    : 'hover:border-purple-400'
                }`}
                onClick={() => onToggleRequest(request.id)}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onToggleRequest(request.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon
                          size={20}
                          className={isSelected ? 'text-purple-400' : 'text-gray-400'}
                        />
                        <h3 className="font-semibold text-white">{request.label}</h3>
                      </div>
                      <span className="text-purple-400 font-semibold text-sm whitespace-nowrap">
                        +{formatPrice(request.price)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{request.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Notes */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="font-semibold text-white mb-3">Catatan Tambahan</h3>
          <p className="text-sm text-gray-400 mb-3">
            Ada permintaan khusus lainnya? Tuliskan di sini
          </p>
          <Textarea
            placeholder="Contoh: Butuh tema cosplay tertentu, lokasi spesifik, waktu khusus, dll..."
            value={additionalNotes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-32 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 resize-none"
          />
        </Card>

        {/* Cost Summary */}
        {selectedRequests.length > 0 && (
          <Card className="p-5 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white mb-1">Biaya Tambahan</h3>
                <p className="text-sm text-gray-400">
                  {selectedRequests.length} layanan ekstra dipilih
                </p>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatPrice(totalExtraCost)}
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 bg-blue-900/20 border-blue-500/30">
          <p className="text-sm text-blue-300 text-center">
            💡 Semua permintaan khusus akan dikonfirmasi terlebih dahulu sebelum eksekusi
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
          Lihat Ringkasan
        </Button>
      </div>
    </div>
  );
}

export { SPECIAL_REQUESTS };
