import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entities";
import { Repository } from "typeorm";

@Injectable() 
export class TemaService {
    
    //criar o construtor
    constructor(
        @InjectRepository(Tema) 
        private temaRepository: Repository<Tema> 
    ){}

    //metodo para listar tds os temas - findAll()
    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find(); //select * from tb_temas
    }  
            
}