import { NextRequest, NextResponse } from 'next/server';
import { lookupZipCode } from '@/api/services/zip-code/zip-code.service';

export async function POST(request: NextRequest) {
  try {
    
    const body = await request.json();
    
    const { zipCode } = body;
    
    if (!zipCode) {
      return NextResponse.json({ error: 'Zip code is required' }, { status: 400 });
    }
    
    if (zipCode.length !== 5 || !/^\d{5}$/.test(zipCode)) {
      return NextResponse.json({ error: 'Zip code must be 5 digits' }, { status: 400 });
    }
    
    const addressData = await lookupZipCode(zipCode);
    
    return NextResponse.json(addressData);
    
  } catch (error) {
    console.error('Error in zip lookup API:', error);
    return NextResponse.json({ 
      error: 'Failed to lookup zip code',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 