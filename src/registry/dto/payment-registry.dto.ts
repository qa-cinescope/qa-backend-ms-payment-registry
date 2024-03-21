import { Status } from "@repo/database";

export class PaymentRegistryDto {
  userId: string;
  movieId: number;
  status: Status;
  total: number;
  amount: number;
}
