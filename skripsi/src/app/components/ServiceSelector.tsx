import { Camera, Video, Heart, Package, User, Building2, MapPin, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ServiceOption {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

interface ServiceSelectorProps {
  title: string;
  options: ServiceOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  step: number;
  totalSteps: number;
}

export function ServiceSelector({
  title,
  options,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  step,
  totalSteps,
}: ServiceSelectorProps) {
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

      <h2 className="text-3xl font-bold text-center mb-8 text-white">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedValue === option.id;

          return (
            <Card
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 bg-gray-800 border-gray-700 ${
                isSelected
                  ? 'ring-2 ring-purple-500 bg-purple-900/30 border-purple-500'
                  : 'hover:border-purple-400'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-4 rounded-full ${
                    isSelected
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  } transition-colors duration-300`}
                >
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold text-lg text-white">{option.label}</h3>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        {onBack ? (
          <Button variant="outline" onClick={onBack} className="border-gray-700 hover:bg-gray-800 text-white">
            Kembali
          </Button>
        ) : (
          <div />
        )}
        <Button
          onClick={onNext}
          disabled={!selectedValue}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {step === totalSteps ? 'Selesai' : 'Lanjut'}
        </Button>
      </div>
    </div>
  );
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'photography',
    label: 'Fotografi',
    icon: Camera,
    description: 'Layanan foto profesional',
  },
  {
    id: 'videography',
    label: 'Videografi',
    icon: Video,
    description: 'Produksi & pengambilan video',
  },
];

export const CATEGORY_OPTIONS: ServiceOption[] = [
  {
    id: 'wedding',
    label: 'Pernikahan',
    icon: Heart,
    description: 'Abadikan momen spesial Anda',
  },
  {
    id: 'product',
    label: 'Produk',
    icon: Package,
    description: 'Foto produk profesional',
  },
  {
    id: 'portraits',
    label: 'Potret',
    icon: User,
    description: 'Potret personal & profesional',
  },
];

export const LOCATION_OPTIONS: ServiceOption[] = [
  {
    id: 'studio',
    label: 'Studio',
    icon: Building2,
    description: 'Lingkungan indoor terkontrol',
  },
  {
    id: 'nonstudio',
    label: 'Non-Studio',
    icon: MapPin,
    description: 'Pengambilan gambar di lokasi',
  },
  {
    id: 'event',
    label: 'Event (Anime Cons)',
    icon: Sparkles,
    description: 'Liputan konvensi & acara',
  },
];