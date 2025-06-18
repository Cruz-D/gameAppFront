export interface ICreateOrder {
  id?: string;
  orderId?: string;      // PartitionKey
  userId?: string;
  stateOfOrder?: string;
  orderDate: string;     // ISO string (DateTime en .NET)
  receivedDate: string;  // ISO string (DateTime en .NET)
}
