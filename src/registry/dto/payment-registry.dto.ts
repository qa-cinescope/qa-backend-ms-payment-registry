import { Status } from "@prisma/client";

export class PaymentRegistryDto {
  userId: string;
  movieId: number;
  status: Status;
  total: number;
  amount: number;
}
