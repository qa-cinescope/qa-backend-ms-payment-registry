import { Injectable } from "@nestjs/common";
import { PaymentRegistryDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Status } from "@prisma/client";

@Injectable()
export class RegistryService {
  constructor(private readonly prismaService: PrismaService) {}

  async registryPayment(dto: PaymentRegistryDto) {
    const payment = await this.prismaService.payment
      .create({
        data: {
          userId: dto.userId,
          movieId: dto.movieId,
          total: dto.total,
          amount: dto.amount,
          status: dto.status,
        },
      })
      .catch(() => {
        return null;
      });

    if (!payment) {
      return { status: Status.ERROR };
    }

    return { status: Status.SUCCESS };
  }
}
