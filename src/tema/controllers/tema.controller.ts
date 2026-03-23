import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller ('/temas')
@ApiBearerAuth()
export class TemaController {

    //contrutor para injetar o serviço de tema
    constructor(
        private readonly temaService: TemaService
    ){}

    //Get - listar todos os temas - findAll() - retorna uma Promise de um array de temas
        @Get() //decorador para indicar que esse método vai responder a requisições GET na rota /temas
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Tema[]> {
            return this.temaService.findAll(); 
        }

    //Get - busca um tema por id
    @Get('/:id') //decorador para indicar que esse método vai responder a requisições GET na rota /temas : indica que o id é uma variavel de caminho
    @HttpCode(HttpStatus.OK) //decorador para indicar que esse método vai responder com o status 200 OK como padrao de resposta
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> { //o valor q vem no GET() chega como string, entao o ParseIntPipe converte para number
        return this.temaService.findById(id); 
    }

    //Get - busca um tema por descricao
    @Get('/descricao/:descricao') //decorador para indicar que esse método vai responder a requisições GET na rota /temas : indica que a descricao é uma variavel de caminho
    @HttpCode(HttpStatus.OK) //decorador para indicar que esse método vai responder com o status 200 OK como padrao de resposta
    findAllByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> { 
        return this.temaService.findAllByDescricao(descricao); 
    }

    //Post - criar um novo tema - create() - recebe um objeto do tipo Tema e retorna o objeto salvo
    @Post()
    @HttpCode(HttpStatus.CREATED) // create é o status de resposta para quando um recurso é criado com sucesso - 201
    create(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema); 
    }

    //@put - atualizar um tema - update() - recebe um objeto do tipo Tema e retorna o objeto atualizado
    @Put()
    @HttpCode(HttpStatus.OK) 
    update(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema); 
    }

    //@delete - deletar um tema - delete() - recebe o id do tema para deletar
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //204 é o status de resposta para quando um recurso é deletado com sucesso - no content indica que a resposta nao tem conteudo, ou seja, nao retorna nada
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id); 
    }  

}