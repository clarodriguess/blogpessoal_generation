import { Module } from "@nestjs/common";
import { Tema } from "./entities/tema.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaService } from "./services/tema.service";
import { TemaController } from "./controllers/tema.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Tema])], //chamar a entidade Tema
    controllers: [TemaController], //classe que vai responder as requisições (rotas)
    providers: [TemaService],//classe q vai prover os serviços (métodos) para o controller
    exports: [TemaService] 
})
export class TemaModule {}