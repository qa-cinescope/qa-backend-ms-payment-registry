import { Injectable, Logger } from "@nestjs/common";
import { PaymentRegistryDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Status } from "@prisma/client";
import { RegistryResponse } from "./responses";

@Injectable()
export class RegistryService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly logger = new Logger(RegistryService.name);

  async registerPayment(dto: PaymentRegistryDto): Promise<RegistryResponse> {
    this.logger.log("------------------- Payment registering -------------------");

    this.logger.verbose("User ID: " + dto.userId);
    this.logger.verbose("Movie ID: " + dto.movieId);
    this.logger.verbose("Total: " + dto.total);
    this.logger.verbose("Amount: " + dto.amount);
    this.logger.verbose("Card checker status: " + dto.status);

    const status = await this.setPaymentToDatabase(dto);

    this.logger.verbose("Registry status: " + status);

    this.logger.log("------------------- Payment registered  -------------------");

    return {
      status,
    };
  }

  async setPaymentToDatabase(dto: PaymentRegistryDto): Promise<Status> {
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
      .catch((e) => {
        console.log(e);
        this.logger.error("Database error. Payment not registered");
        return Status.ERROR;
      });

    if (!payment) {
      return Status.ERROR;
    }

    return Status.SUCCESS;
  }
}
