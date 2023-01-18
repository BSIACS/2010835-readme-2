import { BadRequestException, Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from "@readme/core";
import { BlogPostEntity } from "./blog-post.entity";
import { PostInterface, PostState } from '@readme/shared-types'
import { PrismaService } from "../../prisma/prisma.service";
import { PostQuery } from "./query/post.query";
import { SortByEnum } from "./query/sort-by.enum";

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
          creationDate: sortBy === SortByEnum.CreationDate ? sortDirection : undefined,
          likeCount: sortBy === SortByEnum.LikeCount ? sortDirection : undefined,
          commentCount: sortBy === SortByEnum.CommentCount ? sortDirection : undefined
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
        postState: PostState.Published,
        isSent: false,
      }
    });
  }

  public async setAllIsSentByUserId(userId : string) : Promise<number> {

    try {
      const updatedPosts = await this.prisma.post.updateMany({
        where: {
          userId,
          postState: PostState.Published,
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

  async checkHasLikeByUserId(postId : number, userId : string) : Promise<boolean>{
    const foundPost = await this.prisma.post.findMany({
      where: {
        id: postId,
        likeUsers: {
          hasSome: [userId]
        },
      }
    })

    if(foundPost.length <= 0){
      return false;
    }

    return true;
  }

  async addLike(postId : number, userId){
    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeUsers: {
          push: userId
        },
        likeCount: {
          increment: 1
        }
      }
    })
  }

  async removeLike(postId : number, userId : string){
    const {likeUsers} = await this.prisma.post.findFirst({
      where: {
        id: postId,
        likeUsers: {
          hasSome: [userId]
        },
      },
      select: {likeUsers: true}
    })

    const newLikeUser = likeUsers.filter((id) => id !== userId)

    const result = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeUsers: {
          set: [...newLikeUser]

        },
        likeCount: {
          decrement: 1
        }
      }
    })

    return result;
  }
}
