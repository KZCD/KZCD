import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AvailabilityCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  onNext: () => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export function AvailabilityCalendar({
  selectedDate,
  onSelectDate,
  onNext,
  onBack,
  step,
  totalSteps,
}: AvailabilityCalendarProps) {
  // Mock booked dates (you would fetch these from a backend in production)
  const bookedDates = [
    new Date(2026, 2, 18), // March 18, 2026
    new Date(2026, 2, 20), // March 20, 2026
    new Date(2026, 2, 25), // March 25, 2026
    new Date(2026, 3, 5),  // April 5, 2026
    new Date(2026, 3, 12), // April 12, 2026
  ];

  const isDateBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear()
    );
  };

  const disabledDays = [
    { before: new Date() }, // Disable past dates
    ...bookedDates,
  ];

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
        Pilih Tanggal
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Calendar */}
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="text-purple-400" size={20} />
            <h3 className="font-semibold text-white">Kalender Ketersediaan</h3>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            disabled={disabledDays}
            className="rounded-md border-0"
            locale={id}
          />
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Tanggal dipilih</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 bg-gray-600 rounded"></div>
              <span>Tidak tersedia</span>
            </div>
          </div>
        </Card>

        {/* Information */}
        <div className="space-y-4">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-purple-400" size={20} />
              <h3 className="font-semibold text-white">Tanggal Dipilih</h3>
            </div>
            {selectedDate ? (
              <div className="space-y-3">
                <div className="text-2xl font-bold text-white">
                  {format(selectedDate, 'dd MMMM yyyy', { locale: id })}
                </div>
                <div className="text-sm text-gray-400">
                  {format(selectedDate, 'EEEE', { locale: id })}
                </div>
                <div className="mt-4 p-3 bg-green-900/30 border border-green-500/30 rounded-md">
                  <p className="text-sm text-green-300">
                    ✓ Tanggal ini tersedia untuk booking
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                Silakan pilih tanggal dari kalender
              </div>
            )}
          </Card>

          <Card className="p-4 bg-yellow-900/20 border-yellow-500/30">
            <p className="text-sm text-yellow-300">
              <strong>Catatan:</strong> Konfirmasi final akan dilakukan setelah pembayaran deposit. Tanggal dapat berubah jika terdapat bentrok jadwal.
            </p>
          </Card>

          <Card className="p-4 bg-gray-800 border-gray-700">
            <h4 className="font-semibold text-white mb-3 text-sm">Waktu Pengerjaan:</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Foto: 7-14 hari kerja</li>
              <li>• Video: 14-30 hari kerja</li>
              <li>• Pernikahan: 30-45 hari kerja</li>
            </ul>
          </Card>
        </div>
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
          disabled={!selectedDate}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          Lanjut ke Permintaan Khusus
        </Button>
      </div>
    </div>
  );
}
