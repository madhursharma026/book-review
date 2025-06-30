import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findByBook(bookId: number): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      where: { book: { id: bookId } },
      relations: ['book'],
    });

    return reviews;
  }

  async create(bookId: number, dto: CreateReviewDto): Promise<Review> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    const review = this.reviewRepository.create({
      content: dto.content,
      book,
    });

    return this.reviewRepository.save(review);
  }
}
