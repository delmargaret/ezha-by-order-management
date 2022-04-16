interface PaymentType {
  [index: number]: string;
}

export const PaymentTypes: PaymentType = {
  0: 'Наличные',
  1: 'Банковская карта',
};
