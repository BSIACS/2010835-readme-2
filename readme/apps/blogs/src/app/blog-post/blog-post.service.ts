import { Inject, Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { ClientProxy } from "@nestjs/microservices";
import { parseNewPostNotification } from "@readme/core";
import { CommandEvent, PostInterface, PostState } from "@readme/shared-types";
import { RABBITMQ_SERVICE } from "./blog-post.constants";
import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostRepository } from "./blog-post.repository";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostQuery } from "./query/post.query";

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async getPosts(query : PostQuery): Promise<PostInterface[]> {
    return this.blogPostRepository.find(query);
  }

  async getPostsByIncludedNameTextContent(textContent: string): Promise<PostInterface[]> {
    return this.blogPostRepository.findByIncludedNameTextContent(textContent);
  }

  async getPost(id: number): Promise<PostInterface> {
    return this.blogPostRepository.findById(id);
  }

  async createPost(dto: CreatePostDto): Promise<PostInterface>{
    const postEntity = new BlogPostEntity({...dto, creationDate: undefined, publishDate: undefined, comments: []});

    return this.blogPostRepository.create(postEntity);
  }

  async createRepost(originPostId: number, userId: string): Promise<PostInterface>{
    const foundPost = await this.blogPostRepository.findById(originPostId);

    if(!foundPost){
      throw new NotFoundException(`Can not repost. Post ${originPostId} not found`);
    }

    const postEntity = new BlogPostEntity({
      ...foundPost,
      id: undefined,
      isRepost: true,
      userId: userId,
      originUserId: foundPost.userId,
      originPostId: foundPost.id,
      publishDate: undefined,
      creationDate: undefined,
      postState: PostState.Published,
      isSent: false,
      comments: [],
    });

    return this.blogPostRepository.create(postEntity);
  }

  async updatePost(userId: number, dto: UpdatePostDto): Promise<PostInterface>{
    const postEntity = new BlogPostEntity({...dto});

    return this.blogPostRepository.update(dto.id, postEntity);
  }

  async deletePost(id: number): Promise<void> {
    this.blogPostRepository.destroy(id);
  }

  async addLikeIfUnset(postId : number, userId : string) : Promise<PostInterface>{
    const flag = await this.blogPostRepository.checkHasLikeByUserId(postId, userId);

    if(flag){
      return null;
    }

    return this.blogPostRepository.addLike(postId, userId);
  }

  async removeLikeIfSet(postId : number, userId : string) : Promise<PostInterface>{
    const flag = await this.blogPostRepository.checkHasLikeByUserId(postId, userId);

    if(!flag){
      return null;
    }

    return this.blogPostRepository.removeLike(postId, userId);
  }

  async sendNewPostsData(userId : string) : Promise<void>{
    const findedPosts = await this.blogPostRepository.findPublishedByUserId(userId);

    if(!findedPosts.length){
      throw new NotFoundException('New posts not found');
    }

    await this.blogPostRepository.setAllIsSentByUserId(userId)

    const notificationData = findedPosts.map(post => parseNewPostNotification(post));

    this.rabbitClient.emit(
      { cmd: CommandEvent.SendNewPosts },
      {
        posts: notificationData,
      }
    );
  }
}
