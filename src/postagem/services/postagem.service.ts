import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entities";

//repository é a camada de acesso a dados, onde ficam os métodos para acessar o banco de dados (find, save, delete, etc)
@Injectable() //injectable é para indicar que essa classe pode ser injetada em outras classes (como o controller)
export class PostagemService {

    //criar o construtor
    constructor(
        @InjectRepository(Postagem) 
        private postagemRepository: Repository<Postagem> 
    ){} 

    //metodo para listar todas as postagens - findAll() - retorna uma Promise de um array de Postagem
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find(); //select * from tb_postagens
    }

    
}