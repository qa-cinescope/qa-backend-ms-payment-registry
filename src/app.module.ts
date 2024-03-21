import { Module } from "@nestjs/common";
import { RegistryController } from "./registry/registry.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PrismaModule } from "./prisma/prisma.module";
import { RegistryService } from "./registry/registry.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RegistryController],
  providers: [RegistryService],
})
export class AppModule {}
