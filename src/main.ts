import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `registry-${Math.floor(Math.random() * 1000)}`,
        brokers: [configService.get<string>("KAFKA_BROKER") || "localhost:9092"],
      },
      consumer: {
        groupId: "registry-consumer",
      },
    },
  });

  await app.startAllMicroservices();
  console.log("Registry service is listening...");
}
bootstrap();
