import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { ILike, Repository, DeleteResult } from "typeorm";

@Injectable() 
export class TemaService {
    
    // construtor
    constructor(
        @InjectRepository(Tema) 
        private temaRepository: Repository<Tema> 
    ){}

    //metodo para listar tds os temas - findAll()
    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
                relations: {
                    postagem: true
                }
            }); //select * from tb_temas
    }  

    //metodo para listar um tema por id - findById() -
    //o retorno do FindById é um obj e nao uma array, por isso necessario criar uma constante para guardar a resposta e verificar se existe ou nao o tema
    async findById(id: number): Promise<Tema> {
       const tema = await this.temaRepository.findOne({
            where: { id },
            relations: {
                postagem: true
            }
        })         //select * from tb_temas where id = ? 
        if (!tema) 
            throw new HttpException(`Tema com id ${id} não encontrado`, HttpStatus.NOT_FOUND); //lançar um erro caso o tema nao seja encontrado
        return tema; //se nao tiver erro, retorna o tema encontrado
    }

    //metodo para buscar por descricao - findAllByDescricao() - retorna um array de Tema
    async findAllByDescricao(descricao: string): Promise<Tema[]> {
        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) //select * from tb_temas where descricao like '%descricao%'
            },
            relations: {
                postagem: true
            }
        })
    }
    // metodo para criar um novo tema - save() - recebe um objeto do tipo Tema e retorna o objeto salvo
    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema); //insert into tb_temas (descricao) values (?)
    }

    //metodo para atualizar um tema - update() - recebe um objeto do tipo Tema e retorna o objeto atualizado
    async update(tema: Tema): Promise<Tema> {
        //update tb_temas set descricao = ? where id = ?
        //preciso saber se o id do tema existe para atualizar, entao chamo o findById() - se nao encontrar, ele lança um erro
        if(!tema.id || tema.id <= 0) 
            throw new HttpException("ID do tema inválido", HttpStatus.BAD_REQUEST);
        
        await this.findById(tema.id);
        return this.temaRepository.save(tema);
    }

    //metodo para deletar um tema - delete() - recebe o id do tema
    async delete(id: number): Promise<DeleteResult> {         
        await this.findById(id);        //chamar o findById() para verificar se o tema existe, se nao existir, ele lança um erro
        return this.temaRepository.delete(id); //delete from tb_temas where id = ?
    }
}