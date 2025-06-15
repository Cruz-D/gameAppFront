export interface IBillingUser {
  paymentMethodId: string;      // ID del método de pago (ej. Stripe)
  userId: string;               // ID del usuario (ej. "user_001")
  tipo: string;                 // Tipo de método de pago (ej. "Tarjeta")
  ultimosDigitos: string;       // Últimos dígitos (ej. "****1234")
  paymentProvider: string;      // Proveedor de pago (ej. "Stripe")
}
