import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //chamar a entidade Postagem e importar o TemaModule para poder usar o TemaService
    controllers: [PostagemController], //classe que vai responder as requisições (rotas) 
    providers: [PostagemService],//classe q vai prover os serviços (métodos) para o controller
    exports: []
})
export class PostagemModule {}  