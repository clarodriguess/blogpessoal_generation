import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { AuthModule } from '../auth/auth.module';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), AuthModule], 
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [],
})
export class UsuarioModule {}