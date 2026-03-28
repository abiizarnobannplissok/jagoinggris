import { trackInitiateCheckout } from './tracking';

export function scrollToOrder(e: React.MouseEvent) {
  e.preventDefault();
  trackInitiateCheckout();
  const element = document.getElementById('order');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
