import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<Book[]> {
    const cacheKey = 'all_books';

    try {
      const cached = await this.cacheManager.get<Book[]>(cacheKey);
      if (cached) {
        console.log('📦 Returned from Redis cache');
        return cached;
      }
    } catch (err) {
      console.warn('⚠️ Redis error. Fallback to DB.', err);
    }

    const books = await this.bookRepository.find();
    try {
      await this.cacheManager.set(cacheKey, books, 60); // 60s TTL
    } catch (err) {
      console.warn('⚠️ Failed to set Redis cache.', err);
    }

    return books;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(dto);
    const savedBook = await this.bookRepository.save(newBook);

    try {
      await this.cacheManager.del('all_books'); // clear cache after insert
    } catch (err) {
      console.warn('⚠️ Redis error while clearing cache.', err);
    }

    return savedBook;
  }
}
