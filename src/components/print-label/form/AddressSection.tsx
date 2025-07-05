'use client';

import { useState } from 'react';
import ZipCodeInput from './ZipCodeInput';

interface AddressSectionProps {
  prefix: string;
  title: string;
}

export default function AddressSection({ prefix, title }: AddressSectionProps) {
  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: ''
  });

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleAddressFound = (addressData: any) => {
    setAddress(addressData);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, '');
    
    const truncated = digitsOnly.slice(0, 10);
    
    let formatted = '';
    if (truncated.length > 0) {
      formatted = '(' + truncated.slice(0, 3);
      if (truncated.length > 3) {
        formatted += ') ' + truncated.slice(3, 6);
        if (truncated.length > 6) {
          formatted += '-' + truncated.slice(6, 10);
        }
      }
    }
    
    setPhone(formatted);
    
    if (truncated.length === 10) {
      setPhoneError('');
    } else if (truncated.length > 0) {
      setPhoneError('Phone number must be exactly 10 digits');
    } else {
      setPhoneError('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Zip Code</label>
          <ZipCodeInput 
            name={`${prefix}Zip`}
            onAddressFound={handleAddressFound}
            placeholder="Enter zip code"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Street 1</label>
          <input
            type="text"
            name={`${prefix}Street1`}
            value={address.street1}
            onChange={(e) => setAddress(prev => ({ ...prev, street1: e.target.value }))}
            className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Street address"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Street 2</label>
          <input
            type="text"
            name={`${prefix}Street2`}
            value={address.street2}
            onChange={(e) => setAddress(prev => ({ ...prev, street2: e.target.value }))}
            className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Apartment, suite, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            name={`${prefix}City`}
            value={address.city}
            className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-gray-100 dark:bg-gray-800 text-foreground"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            name={`${prefix}State`}
            value={address.state}
            className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-gray-100 dark:bg-gray-800 text-foreground"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <input
            type="text"
            name={`${prefix}Country`}
            value={address.country}
            className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-gray-100 dark:bg-gray-800 text-foreground"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            name={`${prefix}Phone`}
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full rounded-lg border border-solid px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 ${
              phoneError 
                ? 'border-red-500 focus:ring-red-500/20' 
                : 'border-black/[.08] dark:border-white/[.145]'
            }`}
            placeholder="(555) 123-4567"
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name={`${prefix}Email`}
            className="w-full rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="email@example.com"
          />
        </div>
      </div>
    </div>
  );
} 