import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { ReviewsService } from './reviews.service'; // ✅ Import the service

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {} // ✅ Inject service

  @Get('/books/:id/reviews')
  getReviews(@Param('id') id: number) {
    return this.reviewsService.findByBook(id);
  }

  @Post('/books/:id/reviews')
  create(@Param('id') id: number, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(id, dto);
  }
}
