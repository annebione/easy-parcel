import { ZipCodeProvider, ZipCodeData } from '@/types/zip-code.types';


export class ZippopotamProvider implements ZipCodeProvider {
  name = 'Zippopotam';
  
  async lookup(zipCode: string): Promise<ZipCodeData> {
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
    
    if (!response.ok) {
      throw new Error(`Zippopotam API error: ${response.status}`);
    }
    
    const data = await response.json();
    const place = data.places?.[0] || {};
    
    return {
      street1: '',
      street2: '',
      city: place['place name'] || '',
      state: place['state abbreviation'] || '',
      country: 'USA',
      zipCode: zipCode,
      latitude: parseFloat(place.latitude) || undefined,
      longitude: parseFloat(place.longitude) || undefined
    };
  }
}

export class MockProvider implements ZipCodeProvider {
  name = 'Mock';
  
  async lookup(zipCode: string): Promise<ZipCodeData> {
    // Simulate API query response time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const mockData: { [key: string]: ZipCodeData } = {
      '10001': {
        street1: '123 Main Street',
        street2: '',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001'
      },
      '90210': {
        street1: '456 Hollywood Blvd',
        street2: '',
        city: 'Beverly Hills',
        state: 'CA',
        country: 'USA',
        zipCode: '90210'
      },
      '33101': {
        street1: '789 Ocean Drive',
        street2: '',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        zipCode: '33101'
      },
      '20001': {
        street1: '1600 Pennsylvania Ave',
        street2: '',
        city: 'Washington',
        state: 'DC',
        country: 'USA',
        zipCode: '20001'
      },
      '94102': {
        street1: '123 Market Street',
        street2: '',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        zipCode: '94102'
      }
    };
    
    return mockData[zipCode] || {
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: 'USA',
      zipCode: zipCode
    };
  }
}

export class ZipCodeService {
  private providers: ZipCodeProvider[];
  
  constructor(providers: ZipCodeProvider[] = []) {
    this.providers = providers.length > 0 ? providers : [
      new ZippopotamProvider(),
      new MockProvider()
    ];
  }
  
  async lookup(zipCode: string): Promise<ZipCodeData> {
    let lastError: Error | null = null;
    
    for (const provider of this.providers) {
      try {
        const result = await provider.lookup(zipCode);
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        continue;
      }
    }
    
    throw lastError || new Error('All zip code providers failed');
  }
}

export const zipCodeService = new ZipCodeService(); 