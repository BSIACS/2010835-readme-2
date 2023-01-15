import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CommandEvent, PostInterface } from "@readme/shared-types";
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

  async getPost(id: number): Promise<PostInterface> {
    return this.blogPostRepository.findById(id);
  }

  async createPost(dto: CreatePostDto): Promise<PostInterface>{
    const postEntity = new BlogPostEntity({...dto, creationDate: undefined, publishDate: undefined, comments: []});

    return this.blogPostRepository.create(postEntity);
  }

  async updatePost(userId: number, dto: UpdatePostDto): Promise<PostInterface>{
    const postEntity = new BlogPostEntity({...dto});

    return this.blogPostRepository.update(dto.id, postEntity);
  }

  async deletePost(id: number): Promise<void> {
    this.blogPostRepository.destroy(id);
  }

  async sendNewPostsData() : Promise<void>{
    this.rabbitClient.emit(
      { cmd: CommandEvent.SendNewPosts },
      {
        userId: '421342',
        postIds: ['test', 'data', '42']
      }
    );
  }
}
