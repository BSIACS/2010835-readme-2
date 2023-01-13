import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { COMMENT_NOT_FOUND } from "./comment.constants";
import { CommentEntity } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly repository: CommentRepository,
  ) {}

  async findByPostId(postId : number){
    const foundedComments = await this.repository.findByPostId(postId);

    if(!foundedComments || foundedComments.length === 0){
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    return foundedComments;
  }

  async create(dto : CreateCommentDto){
    const commentEntity = new CommentEntity(dto)
    return this.repository.create(commentEntity);
   }

  async updateById(dto : UpdateCommentDto){
    const commentEntity = new CommentEntity(dto);

    return  this.repository.update(dto.id, commentEntity);
  }

  async deleteById(id : number) : Promise<void>{
    this.repository.destroy(id);
  }
}
