'use client';

interface LabelPreviewProps {
  labelUrl: string;
}

export default function LabelPreview({ labelUrl }: LabelPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Label Preview</h2>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-6">
        <img 
          src={labelUrl} 
          alt="Shipping Label" 
          className="max-w-full h-auto mx-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const container = target.parentElement;
            if (container) {
              container.innerHTML = `
                <div class="text-center">
                  <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-gray-500">Label preview not available</p>
                  <p class="text-sm text-gray-400 mt-2">Click download or print to access your label</p>
                </div>
              `;
            }
          }}
        />
      </div>
    </div>
  );
} 