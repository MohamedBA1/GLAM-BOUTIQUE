export interface DressInquiryDetails {
  name: string;
  category: string;
  rentalPrice: number;
  size?: string;
  selectedSize?: string;
}

export const WHATSAPP_NUMBER = '201042096306';
export const WHATSAPP_FORMATTED = '01042096306';
export const BOUTIQUE_PHONE = '01042096306';
export const BOUTIQUE_INSTAGRAM = 'https://instagram.com/glam__2026';
export const BOUTIQUE_MAPS_URL = 'https://maps.google.com/?q=New+Damietta+Lebanon+Street+Egypt';

export function getGeneralWhatsAppUrl(customMessage?: string): string {
  const text = customMessage || 'Hello GLAM Boutique, I would like to learn more about your dress rental collection in New Damietta.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getFittingWhatsAppUrl(
  preferredDateOrOptions?: string | { dressName?: string; preferredDate?: string }
): string {
  let message = 'Hello GLAM Boutique, I would like to book a private fitting at your New Damietta boutique.';
  if (typeof preferredDateOrOptions === 'string') {
    message += ` My preferred date is ${preferredDateOrOptions}.`;
  } else if (preferredDateOrOptions) {
    if (preferredDateOrOptions.dressName) {
      message += ` for dress "${preferredDateOrOptions.dressName}".`;
    }
    if (preferredDateOrOptions.preferredDate) {
      message += ` My preferred date is ${preferredDateOrOptions.preferredDate}.`;
    }
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getDressInquiryWhatsAppUrl(dress: DressInquiryDetails): string {
  const sizeToDisplay = dress.selectedSize || dress.size;
  const message = `Hello GLAM Boutique,
I am interested in the following dress:

Dress: ${dress.name}
Category: ${dress.category}
Rental Price: ${dress.rentalPrice.toLocaleString()} EGP${sizeToDisplay ? `\nSize: ${sizeToDisplay}` : ''}

I would like to know about availability and arrange a fitting.

Thank you.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
