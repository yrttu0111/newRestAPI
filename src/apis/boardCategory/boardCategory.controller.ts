import { Body, Controller, Post } from '@nestjs/common';
import { BoardCategoryService } from './boardCategory.service';
import { BoardCategory } from './entities/boardCategory.entity';

@Controller()
export class BoardCategoryController {
    constructor(private readonly boardCategoryService: BoardCategoryService) {}

    @Post('/boardCategory')
    async createBoardCategory(
        @Body('name') name: string, //
    ): Promise<BoardCategory> {
        const result = await this.boardCategoryService.create({ name });
        return result;
    }
}
