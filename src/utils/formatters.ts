import { Currency } from '../types/travel';
import { CURRENCY_RATES } from '../data/mockTravelData';

export function formatPrice(amountPKR: number, currency: Currency = 'PKR'): string {
  const rate = CURRENCY_RATES[currency] || 1;
  const converted = Math.round(amountPKR * rate);

  switch (currency) {
    case 'USD':
      return `$${converted.toLocaleString()}`;
    case 'AED':
      return `AED ${converted.toLocaleString()}`;
    case 'SAR':
      return `SAR ${converted.toLocaleString()}`;
    case 'GBP':
      return `£${converted.toLocaleString()}`;
    case 'PKR':
    default:
      return `PKR ${amountPKR.toLocaleString()}`;
  }
}

export function generatePNR(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = 'ST-';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}

export function calculatePointsDiscount(pointsUsed: number): number {
  // 1 point = 0.5 PKR discount (1,000 points = PKR 500 discount)
  return Math.floor(pointsUsed * 0.5);
}

export function calculatePointsEarned(totalPKR: number): number {
  // Earn 1 point per 100 PKR spent
  return Math.floor(totalPKR / 100);
}
