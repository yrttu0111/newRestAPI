import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardCategoryResolver } from './boardCategory.resolver';
import { BoardCategoryService } from './boardCategory.service';
import { BoardCategory } from './entities/boardCategory.entity';
import { BoardCategoryController } from './boardCategory.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BoardCategory])],
    controllers: [BoardCategoryController],
    providers: [BoardCategoryResolver, BoardCategoryService],
})
export class BoardCategoryModule {}
