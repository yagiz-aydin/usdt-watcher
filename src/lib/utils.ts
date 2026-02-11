import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatChange = (percentage: number) => {
  // Yüzde 0.01'den küçük değişimler için "Bindelik" (‰) veya 4 haneli yüzde göster
  if (Math.abs(percentage) < 0.01) {
    // Seçenek A: 4 Haneli Yüzde -> %0.0030
    return `%${percentage.toFixed(4)}`; 
  }
  return `%${percentage.toFixed(2)}`;
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    }).format(value);
};

export const formatContract = (address: string) => {
    if (!address || address.length < 10) return address;
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return { start, end };
};
