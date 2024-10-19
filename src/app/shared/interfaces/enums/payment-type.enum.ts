import { ComboDto } from "../combo-dto";

export enum PaymentType {
  Efectivo = 1,
  Transferencia,
  MercadoPago,
  Credito,
}

/**
 * Use to get combo values for payment type
 * @returns Payment type combo values
 */
export function getPaymentTypeCombo() : ComboDto<PaymentType>[] {
  let options = Object.values(PaymentType) as PaymentType[];
  let values = options.slice(options.length / 2);

  const response: ComboDto<PaymentType>[] = values.map(x => {
    return {
      id: x,
      name: PaymentType[x],
    }
  });

  return response;
}
