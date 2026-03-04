import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entities";


@Controller ('/temas')
export class TemaController {

    //contrutor para injetar o serviço de tema
    constructor(
        private readonly temaService: TemaService
    ){}

    //criar o metodo Get para listar todos os temas - findAll() - retorna uma Promise de um array de temas
        @Get() //decorador para indicar que esse método vai responder a requisições GET na rota /temas
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Tema[]> {
            return this.temaService.findAll(); 
        }

    

}