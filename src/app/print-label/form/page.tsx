import { Suspense } from 'react';
import AddressSection from '@/components/print-label/form/AddressSection';
import GenerateLabelButton from '@/components/print-label/form/GenerateLabelButton';

function ShippingForm() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shipment Info</h1>
        
        <form className="space-y-12" action="/api/generate-label" method="POST">
          <AddressSection prefix="sender" title="Sender Data" />
          <AddressSection prefix="recipient" title="Recipient Data" />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Parcel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Length (inches)</label>
                <input
                  type="number"
                  name="parcelLength"
                  min="0"
                  step="0.1"
                  className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Width (inches)</label>
                <input
                  type="number"
                  name="parcelWidth"
                  min="0"
                  step="0.1"
                  className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Height (inches)</label>
                <input
                  type="number"
                  name="parcelHeight"
                  min="0"
                  step="0.1"
                  className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  name="parcelWeight"
                  min="0"
                  step="0.1"
                  className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <GenerateLabelButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PrintLabelForm() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShippingForm />
    </Suspense>
  );
}