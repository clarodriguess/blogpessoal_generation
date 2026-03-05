import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

//decorador para indicar que é uma entidade 
@Entity({name: 'tb_postagens'}) //equivalente a um CREATE TABLE tb_postagens

export class Postagem { //atributos da classe:

    @PrimaryGeneratedColumn() //equivalente a um AUTO INCREMENT
    id: number;

    @Transform(({ value } : TransformFnParams) => value?.trim()) //decorador para remover espaços em branco no início e no fim - para o isnotempy nao entrar vazio (pq ele aceita espaco em branco)
    @IsNotEmpty() //validação para não aceitar campos vazios
    @Length(5, 100, {message: 'O título deve ter no mínimo 5 e no máximo 100 caracteres'}) //validação para o campo ter no mínimo 5 caracteres e no máximo 100 caracteres
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Length(10, 1000, {message: 'O texto deve ter no mínimo 10 e no máximo 1000 caracteres'})
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() //a data vai entrar automaticamente quando for criado ou atualizado
    data: Date;

    //criando a relação entre postagem e tema - muitos para um - uma postagem tem um tema, mas um tema pode ter muitas postagens
        @ManyToOne( () => Tema, (tema) => tema.postagem, {
        onDelete: 'CASCADE' //quando um tema for deletado, as postagens relacionadas a ele também serão deletadas
    })  
    tema:Tema; //representa a chave estrangeira da tabela postagem, que vai referenciar a tabela tema
}
