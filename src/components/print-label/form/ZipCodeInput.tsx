'use client';

interface ZipCodeInputProps {
  name: string;
  onAddressFound: (address: any) => void;
  placeholder?: string;
}

export default function ZipCodeInput({ name, onAddressFound, placeholder }: ZipCodeInputProps) {
  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.length === 5) {
      try {
        const response = await fetch('/api/zip-lookup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ zipCode: value }),
        });
        
        if (response.ok) {
          const addressData = await response.json();
          onAddressFound(addressData);
        }
      } catch (error) {
        console.error('Failed to lookup zip code:', error);
      }
    }
  };

  return (
    <input
      type="text"
      name={name}
      onChange={handleZipChange}
      maxLength={5}
      className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
      placeholder={placeholder || "Enter zip code"}
    />
  );
} 