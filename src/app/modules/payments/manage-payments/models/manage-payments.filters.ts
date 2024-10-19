import { getPaymentTypeCombo } from "src/app/shared/interfaces/enums/payment-type.enum";
import { InstituteMemberFilter, MembershipPaymentFilter, PaymentFilter, UserFilter } from "src/app/shared/interfaces/filters/payments/payment.filter";
import { FilterField } from "src/app/shared/modules/filter/models/filter-field";
import { nameofFactory } from "src/app/shared/utils/nameof-proxy";

const nameofPaymentClassFilter = nameofFactory<PaymentFilter>();
const nameofMembershipPaymentFilter = nameofFactory<MembershipPaymentFilter>();
const nameofInstituteMemberFilter = nameofFactory<InstituteMemberFilter>();
const nameofUserFilter = nameofFactory<UserFilter>();

export const managePaymentsFilter: FilterField[] = [
  {
    type: 'date',
    field: nameofPaymentClassFilter.emittedDate,
    value: null,
    operator: 'gt',
    logic: 'and',
    description: 'Desde Fecha de emisión',
  },
  {
    type: 'number',
    field: nameofPaymentClassFilter.amount,
    value: null,
    operator: 'gt',
    logic: 'and',
    description: 'Monto desde',
  },
  {
    type: 'combo',
    field: nameofPaymentClassFilter.paymentType,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: 'Forma de pago',
    comboData: getPaymentTypeCombo(),
  },
  {
    type: 'string',
    field: `${nameofPaymentClassFilter.membershipPayment}.${nameofMembershipPaymentFilter.instituteMember}.${nameofInstituteMemberFilter.user}.${nameofUserFilter.firstName}`,
    value: null,
    operator: 'contains',
    logic: 'and',
    description: 'Nombre socio',
  },
  {
    type: 'string',
    field: `${nameofPaymentClassFilter.membershipPayment}.${nameofMembershipPaymentFilter.instituteMember}.${nameofInstituteMemberFilter.user}.${nameofUserFilter.lastName}`,
    value: null,
    operator: 'contains',
    logic: 'and',
    description: 'Apellido socio',
  },
]
