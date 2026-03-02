import { Controller, Get } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entities";


@Controller("/postagens") //decorador para indicar que essa classe é um controller e vai responder pelas rotas /postagens
export class PostagemController {

    //criar o construtor para injetar o serviço de postagem
    constructor(
        private readonly postagemService: PostagemService //injeção do serviço de postagem - por isso o postagemservice tem o @injectable() - para indicar que essa classe pode ser injetada em outras classes (como o controller)
    ){}

    //criar o metodo Get para listar todas as postagens - findAll() - retorna uma Promise de um array de Postagem
    @Get() //decorador para indicar que esse método vai responder a requisições GET na rota /postagens
    async findAll(): Promise<Postagem[]> {
        return await this.postagemService.findAll(); 
    }
}