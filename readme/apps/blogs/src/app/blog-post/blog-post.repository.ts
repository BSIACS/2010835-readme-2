import { BadRequestException, Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from "@readme/core";
import { BlogPostEntity } from "./blog-post.entity";
import { PostInterface } from '@readme/shared-types'
import { PrismaService } from "../../prisma/prisma.service";
import { PostQuery } from "./query/post.query";

@Injectable()
export class BlogPostRepository implements CRUDRepositoryInterface<BlogPostEntity, number, PostInterface>{

  constructor(private readonly prisma: PrismaService){

  }

  public async find({limit, userId, postType, postTag, sortBy, sortDirection, page} : PostQuery): Promise<PostInterface[]> {

    return this.prisma.post.findMany({
      where: {
        userId: userId,
        postType: postType,
        tags: postTag ? {hasSome: [postTag]} : undefined,
      },
      take: limit,
      include: {
        comments: true
      },
      orderBy: [
        {
          creationDate: sortBy === 'creationDate' ? sortDirection : undefined,
          likeCount: sortBy === 'likeCount' ? sortDirection : undefined,
          commentCount: sortBy === 'commentCount' ? sortDirection : undefined
        },
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findByIncludedNameTextContent(textContent : string): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: {
        name: {
          contains: textContent,
          mode: 'insensitive'
        }
      },
      take: 20,
    })
  }

  public async findPublishedByUserId(userId : string): Promise<PostInterface[]> {

    return this.prisma.post.findMany({
      where: {
        userId: userId,
        postState: 'published',
        isSent: false,
      }
    });
  }

  public async setAllIsSentByUserId(userId : string) : Promise<number> {

    try {
      const updatedPosts = await this.prisma.post.updateMany({
        where: {
          userId,
          postState: 'published',
          isSent: false,
        },
        data: {
          isSent: true,
        }
      });

      return updatedPosts.count;
    } catch(e) {
      throw new BadRequestException();
    }
  }

  public async findById(id: number): Promise<PostInterface | null> {
    return this.prisma.post.findFirst({
      where: {
        id
      },
      include: {
        comments: true
      }
    });
  }
  public async create(item: BlogPostEntity): Promise<PostInterface> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
      },

      include: {
        comments: true,
      }
    });
  }
  public update(id: number, item: BlogPostEntity): Promise<PostInterface> {
    const entityData = item.toObject();

    return this.prisma.post.update({
      where: { id },
      data: {
        ...entityData,
        comments: {
          connect: []
        },
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      }
    });
  }

}
