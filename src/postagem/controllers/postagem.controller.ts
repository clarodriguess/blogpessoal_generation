import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('/postagens') //decorador para indicar que essa classe é um controller e vai responder pelas rotas /postagens
export class PostagemController {

    //criar o construtor para injetar o serviço de postagem
    constructor(
        private readonly postagemService: PostagemService //injeção do serviço de postagem - por isso o postagemservice tem o @injectable() - para indicar que essa classe pode ser injetada em outras classes (como o controller)
    ){}

    //criar o metodo Get para listar todas as postagens - findAll() - retorna uma Promise de um array de Postagem
    @Get() //decorador para indicar que esse método vai responder a requisições GET na rota /postagens
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll(); 
    }

    //busca por id
    @Get('/:id') //decorador para indicar que esse método vai responder a requisições GET na rota /postagens : indica que o id é uma variavel de caminho
    @HttpCode(HttpStatus.OK) //decorador para indicar que esse método vai responder com o status 200 OK como padrao de resposta
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> { //o valor q vem no GET() chega como string, entao o ParseIntPipe converte para number
        return this.postagemService.findById(id); 
    }

    //busca por titulo
    @Get('/titulo/:titulo') //-> /: indica que o titulo é uma variavel de caminho --- /titulo/ é como uma etiqueta do tipo de busca que estamos fazendo, para diferenciar de outras buscas por atributo que possam existir
    @HttpCode(HttpStatus.OK) 
    findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> { 
        return this.postagemService.findAllByTitulo(titulo); 
    }

    //criar uma nova postagem - save() - recebe um objeto do tipo Postagem e retorna o objeto salvo
    
    //@Post() - recebe o objeto do tipo Postagem, usamos o decorador 
    //@Body() - indica que o objeto do tipo Postagem vai chegar no corpo da requisição - entao o cliente vai enviar um JSON com os dados da postagem no corpo da requisição
    //verbo diferente pode manter o msm caminho - nesse caso /postagens
    @Post()
    @HttpCode(HttpStatus.CREATED) // create é o status de resposta para quando um recurso é criado com sucesso - 201
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem); 
    }

    // atualizar uma postagem - update() 
    // recebe um objeto do tipo Postagem e retorna o objeto atualizado
    @Put()
    @HttpCode(HttpStatus.OK) 
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem); 
    }

    //metodo para deletar uma postagem - delete() 
    //para deletar, o verbo é DELETE e o caminho tem que receber o id da postagem para saber qual postagem deletar - entao usamos /:id
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //204 é o status de resposta para quando um recurso é deletado com sucesso - no content indica que a resposta nao tem conteudo, ou seja, nao retorna nada
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id); 
    }
}