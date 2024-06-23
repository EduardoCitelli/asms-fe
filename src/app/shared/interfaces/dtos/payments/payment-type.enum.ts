export enum PaymentType {
  Cash = 1,
  WireTransfer,
  MercadoPago,
  CreditCard
}


/**
 * Use to get payment type description to show on UI
 * @param type enum for payment type
 * @returns payment type description
 */
export function getPaymentTypeLabel(type: PaymentType) {
  switch (type) {
    case PaymentType.Cash:
      return "Efectivo";
    case PaymentType.WireTransfer:
      return "Transferencia";
    case PaymentType.MercadoPago:
      return "Mercado pago";
    case PaymentType.CreditCard:
      return "Tarjeta de credito";
    default:
      throw new Error("Unsupported option");
  }
}
