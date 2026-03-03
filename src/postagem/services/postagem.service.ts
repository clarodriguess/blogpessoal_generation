import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
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
    
    //metodo para listar uma postagem por id - findOne() - retorna um objeto
    async findById(id: number): Promise<Postagem> {
        //Guardar a resposta numa const para saber se achou o resultado ou nao
        const postagem = await this.postagemRepository.findOne({
            where: { id }
    }) //select * from tb_postagens where id = ?
      if (!postagem) 
        throw new HttpException(`Postagem com id ${id} não encontrada`, HttpStatus.NOT_FOUND); //lançar um erro caso a postagem não seja encontrada
      return postagem;  //se nao tiver erro, retorna a postagem encontrada
    }

    //metodo de busca por atributo especifico - findAllByTitulo() - retorna um array de Postagem
    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) //select * from tb_postagens where titulo like '%titulo%'
            }
        })
    }

    //metodo para criar uma nova postagem - save() - recebe um objeto do tipo Postagem e retorna o objeto salvo
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem); //insert into tb_postagens (titulo, texto) values (?, ?)
    }

    //metodo para atualizar uma postagem - update() - recebe um objeto do tipo Postagem e retorna o objeto atualizado
    async update(postagem: Postagem): Promise<Postagem> {
        //update tb_postagens set titulo = ?, texto = ?, data = current_timestamp() where id = ?
        //preciso saber se o id da postagem existe para atualizar, entao chamo o findById() - se nao encontrar, ele lança um erro
        if(!postagem.id || postagem.id <= 0) 
            throw new HttpException("ID da postagem inválido", HttpStatus.BAD_REQUEST);
        
        await this.findById(postagem.id);
        return this.postagemRepository.save(postagem); //save() - se o id existir, ele atualiza, se nao existir, ele cria
    }

    //metodo para deletar uma postagem - delete() - recebe o id da postagem
    async delete(id: number): Promise<DeleteResult> {         
        await this.findById(id);        //chamar o findById() para verificar se a postagem existe, se nao existir, ele lança um erro
        
        //delete from tb_postagens where id = ?
        return this.postagemRepository.delete(id);   //se existir, ele deleta a postagem e retorna o resultado da operação
    }
}