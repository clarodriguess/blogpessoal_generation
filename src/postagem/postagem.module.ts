import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], //chamar a entidade Postagem
    controllers: [PostagemController], //classe que vai responder as requisições (rotas) 
    providers: [PostagemService],//classe q vai prover os serviços (métodos) para o controller
    exports: []
})
export class PostagemModule {}