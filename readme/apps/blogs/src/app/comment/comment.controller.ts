import { Controller, Delete, Get, Param, Body, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentRdo } from './rdo/create-comment.rdo';
import { ShowCommentRdo } from './rdo/show-comment.rdo';
import { UpdateCommentRdo } from './rdo/update-comment.rdo';
import { createCommentValidationScheme } from './validation-scheme/create-comment.scheme';
import { updateCommentValidationScheme } from './validation-scheme/update-comment.scheme';

@Controller('comments')
@ApiTags('Comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ){}

  @Get(':id')
  @ApiParam({
    description: 'The ID of the comment to find.',
    name: 'id',
  })
  @ApiResponse({
    type: ShowCommentRdo,
    status: HttpStatus.OK,
    description: 'The comment has been successfully founded'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The comment not found'
  })
  async getByPostId(@Param('id', ParseIntPipe) id: number) : Promise<ShowCommentRdo>{
    const foundedComment = await this.commentService.findByPostId(id)

    return fillObject(ShowCommentRdo, foundedComment);
  }

  @Post('/')
  @ApiBody({
    type: CreateCommentDto,
  })
  @ApiResponse({
    type: CreateCommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @UsePipes(new JoiValidationPipe<CreateCommentDto>(createCommentValidationScheme))
  async create(@Body() dto : CreateCommentDto) : Promise<CreateCommentRdo>{
    const createdComment = await this.commentService.create(dto);

    return fillObject(CreateCommentRdo, createdComment);
  }

  @Patch('/')
  @ApiBody({
    type: UpdateCommentDto,
  })
  @ApiResponse({
    type: UpdateCommentRdo,
    status: HttpStatus.OK,
    description: 'The comment has been successfully updated.'
  })
  @UsePipes(new JoiValidationPipe<UpdateCommentDto>(updateCommentValidationScheme))
  async update(@Body() dto : UpdateCommentDto){
    const updatedComment = await this.commentService.updateById(dto);

    return fillObject(UpdateCommentRdo, updatedComment);
  }

  @Delete(':id')
  @ApiParam({
    description: 'The id of the comment to delete.',
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comment has been successfully deleted.'
  })
  async delete(@Param('id', ParseIntPipe) id: number){
    this.commentService.deleteById(id);
  }
}
