import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomCoordinates(center: [number, number], count: number, radius: number = 0.05) {
  const coordinates = [];
  
  for (let i = 0; i < count; i++) {
    // Generate random offsets
    const latOffset = (Math.random() - 0.5) * 2 * radius;
    const lngOffset = (Math.random() - 0.5) * 2 * radius;
    
    coordinates.push({
      lat: center[0] + latOffset,
      lng: center[1] + lngOffset,
    });
  }
  
  return coordinates;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getRandomPercentages(): [number, number, number] {
  // Generate three random percentages that sum to 100
  const a = Math.random() * 33 + 20; // Between 20 and 53
  const b = Math.random() * 33 + 20; // Between 20 and 53
  let c = 100 - a - b;
  
  // Ensure c is also reasonable (not too small)
  if (c < 10) {
    const adjust = 10 - c;
    c = 10;
    // Adjust a and b proportionally
    const aRatio = a / (a + b);
    const aAdjust = adjust * aRatio;
    const bAdjust = adjust * (1 - aRatio);
    
    return [
      Number((a - aAdjust).toFixed(1)), 
      Number((b - bAdjust).toFixed(1)), 
      Number(c.toFixed(1))
    ];
  }
  
  return [
    Number(a.toFixed(1)), 
    Number(b.toFixed(1)), 
    Number(c.toFixed(1))
  ];
}