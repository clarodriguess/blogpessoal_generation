import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: 'tb_temas'}) //CREATE TABLE tb_temas

export class Tema{
    
    @PrimaryGeneratedColumn() //AUTO INCREMENT
    id: number;
    
    @Transform(({ value } : TransformFnParams) => value?.trim()) //decorador para remover espaços em branco no início e no fim - para o isnotempy nao entrar vazio (pq ele aceita espaco em branco)
    @IsNotEmpty() //validação para não aceitar campos vazios
    @Length(5, 100, {message: 'A descrição do tema deve ter no mínimo 5 e no máximo 100 caracteres'}) //validação para o tamanho do campo 
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    descricao: string;

    //criando a relação entre tema e postagem - um tema tem muitas postagens, mas uma postagem tem um tema - eager: true para carregar as postagens junto com o tema
    @OneToMany( () => Postagem, (postagem) => postagem.tema, {

    })
    postagem: Postagem[]; //array de retorno

}