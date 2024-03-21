import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PaymentRegistryDto } from "./dto";
import { RegistryService } from "./registry.service";

@Controller()
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @MessagePattern("register.payment")
  async registryPayment(@Payload() dto: PaymentRegistryDto) {
    return await this.registryService.registryPayment(dto);
  }
}
