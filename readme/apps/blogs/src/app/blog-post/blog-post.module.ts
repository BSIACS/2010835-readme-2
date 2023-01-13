import { Module } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, JwtStrategy],
})
export class BlogPostModule {}
