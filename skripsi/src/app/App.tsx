import { useState } from 'react';
import { ServiceSelector, SERVICE_OPTIONS, CATEGORY_OPTIONS, LOCATION_OPTIONS } from './components/ServiceSelector';
import { PricingDisplay } from './components/PricingDisplay';
import { AvailabilityCalendar } from './components/AvailabilityCalendar';
import { SpecialRequests } from './components/SpecialRequests';
import { Receipt } from './components/Receipt';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceType, setServiceType] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const totalSteps = 6;

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

  const basePrice = pricing[serviceType]?.[category]?.[location] || 0;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(7); // Show receipt
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToggleRequest = (id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((req) => req !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCurrentStep(1);
    setServiceType('');
    setCategory('');
    setLocation('');
    setSelectedDate(undefined);
    setSelectedRequests([]);
    setAdditionalNotes('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Pilih Layanan
        </h1>
        <p className="text-gray-400">
          Mari temukan layanan yang sempurna untuk kebutuhan Anda
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        {currentStep === 1 && (
          <ServiceSelector
            title="Pilih Layanan Anda"
            options={SERVICE_OPTIONS}
            selectedValue={serviceType}
            onSelect={setServiceType}
            onNext={handleNext}
            step={1}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 2 && (
          <ServiceSelector
            title="Pilih Kategori"
            options={CATEGORY_OPTIONS}
            selectedValue={category}
            onSelect={setCategory}
            onNext={handleNext}
            onBack={handleBack}
            step={2}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 3 && (
          <ServiceSelector
            title="Pilih Jenis Lokasi"
            options={LOCATION_OPTIONS}
            selectedValue={location}
            onSelect={setLocation}
            onNext={handleNext}
            onBack={handleBack}
            step={3}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 4 && (
          <PricingDisplay
            serviceType={serviceType}
            category={category}
            location={location}
            onNext={handleNext}
            onBack={handleBack}
            step={4}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 5 && (
          <AvailabilityCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onNext={handleNext}
            onBack={handleBack}
            step={5}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 6 && (
          <SpecialRequests
            selectedRequests={selectedRequests}
            onToggleRequest={handleToggleRequest}
            additionalNotes={additionalNotes}
            onNotesChange={setAdditionalNotes}
            onNext={handleNext}
            onBack={handleBack}
            step={6}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 7 && (
          <Receipt
            serviceType={serviceType}
            category={category}
            location={location}
            selectedDate={selectedDate}
            selectedRequests={selectedRequests}
            additionalNotes={additionalNotes}
            basePrice={basePrice}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}