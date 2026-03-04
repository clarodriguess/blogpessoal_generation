import { Module } from "@nestjs/common";


@Module({
    imports: [], //chamar a entidade Tema
    controllers: [], //classe que vai responder as requisições (rotas)
    providers: [],//classe q vai prover os serviços (métodos) para o controller
    exports: [] 
})
export class TemaModule {}