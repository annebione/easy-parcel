import { NextRequest, NextResponse } from 'next/server';
import { createLabel } from '@/api/services/labels/labels.service';

const easypost = require('@easypost/api'); 
const API_KEY = process.env.EASYPOST_API_KEY; 
const api = new easypost(API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    const mockLabelUrl = 'https://don16obqbay2c.cloudfront.net/wp-content/uploads/shipping-label-example-1672219567.jpg';
    
    const senderData = {
      zip: data.senderZip,
      street1: data.senderStreet1,
      street2: data.senderStreet2,
      city: data.senderCity,
      state: data.senderState,
      country: data.senderCountry,
      phone: data.senderPhone,
      email: data.senderEmail,
    };
    
    const recipientData = {
      zip: data.recipientZip,
      street1: data.recipientStreet1,
      street2: data.recipientStreet2,
      city: data.recipientCity,
      state: data.recipientState,
      country: data.recipientCountry,
      phone: data.recipientPhone,
      email: data.recipientEmail,
    };
    
    const parcelData = {
      length: data.parcelLength,
      width: data.parcelWidth,
      height: data.parcelHeight,
      weight: data.parcelWeight,
    };

    try {
        const toAddress = await api.Address.create({ ...recipientData, verify: ['delivery'] });
        const fromAddress = await api.Address.create({ ...senderData, verify: ['delivery'] });
        
        const parcelObj = await api.Parcel.create(parcelData);
    
        const shipment = await api.Shipment.create({
          to_address: toAddress,
          from_address: fromAddress,
          parcel: parcelObj,
          mode: 'test',
        });
    
        const rates = shipment.rates;
        const priorityRate = rates.find((rate: any) => 
          rate.carrier === 'USPS' && rate.service === 'Priority'
        );
        
        if (!priorityRate) {
          throw new Error('USPS Priority rate not available');
        }
        
        const purchasedShipment = await api.Shipment.buy(shipment.id, priorityRate);

        const labelUrl = purchasedShipment.postage_label.label_url;
        await createLabel({ label_url: labelUrl || mockLabelUrl });

        const successUrl = new URL('/print-label/success', request.url);
        successUrl.searchParams.set('labelUrl', labelUrl || mockLabelUrl);
        return NextResponse.redirect(successUrl);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to generate label' }, { status: 500 });
      } 
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate label' }, { status: 500 });
  }
} 