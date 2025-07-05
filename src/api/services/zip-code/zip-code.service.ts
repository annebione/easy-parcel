import { zipCodeService } from './zip-code.provider';
import { ZipCodeData } from '@/types/zip-code.types';

export async function lookupZipCode(zipCode: string): Promise<ZipCodeData> {
  return await zipCodeService.lookup(zipCode);
}