import { Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from "@readme/core";
import { CommentInterface, PostInterface } from '@readme/shared-types'
import { PrismaService } from "../../prisma/prisma.service";
import { CommentEntity } from "./comment.entity";

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, number, PostInterface>{

  constructor(private readonly prisma: PrismaService){}

  public findById(id: number): Promise<CommentInterface> {

    return this.prisma.comment.findFirst({
        where: {
          id: id,
        }
    });
  }

  public findByPostId(postId: number): Promise<CommentInterface []> {

    return this.prisma.comment.findMany({
        where: {
          postId: postId,
        }
    });
  }

  public create(item: CommentEntity): Promise<CommentInterface> {
    const entityData = item.toObject();

    return this.prisma.comment.create({
      data: {
        ...entityData,
      }
    });
  }
  public update(id: number, item: CommentEntity): Promise<CommentInterface> {
    const entityData = item.toObject();

    return this.prisma.comment.update({
      where: {
        id: id
      },
      data: {
        ...entityData,
      }
    });
  }
  public async destroy(id: number): Promise<void> {

    await this.prisma.comment.delete({
      where: {
        id: id
      }
    });
  }
}
