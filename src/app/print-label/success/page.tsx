import Link from 'next/link';
import { Suspense } from 'react';
import LabelActions from './LabelActions';
import LabelPreview from './LabelPreview';

interface SuccessPageProps {
  searchParams: Promise<{ labelUrl?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { labelUrl } = await searchParams;

  if (!labelUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-foreground mb-4">No label URL found. Please try generating a label again.</p>
          <Link 
            href="/print-label/form" 
            className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Generate New Label
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Label Generated Successfully!</h1>
            <p className="text-lg text-foreground/80">Your shipping label is ready to print or download.</p>
          </div>

          <Suspense fallback={<div>Loading preview...</div>}>
            <LabelPreview labelUrl={labelUrl} />
          </Suspense>

          <Suspense fallback={<div>Loading actions...</div>}>
            <LabelActions labelUrl={labelUrl} />
          </Suspense>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/print-label/form" 
              className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Generate Another Label
            </Link>
            
            <Link 
              href="/" 
              className="inline-block border border-foreground text-foreground px-6 py-3 rounded-lg hover:bg-foreground hover:text-background transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 