import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//decorador para indicar que é uma entidade 
@Entity({name: 'tb_postagens'}) //equivalente a um CREATE TABLE tb_postagens

export class Postagem { //atributos da classe:

    @PrimaryGeneratedColumn() //equivalente a um AUTO INCREMENT
    id: number;

    @Transform(({ value } : TransformFnParams) => value?.trim()) //decorador para remover espaços em branco no início e no fim - para o isnotempy nao entrar vazio (pq ele aceita espaco em branco)
    @IsNotEmpty() //validação para não aceitar campos vazios
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;

    @Transform(({ value } : TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() //a data vai entrar automaticamente quando for criado ou atualizado
    data: Date;
}
