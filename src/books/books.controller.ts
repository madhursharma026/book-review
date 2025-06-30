import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { BooksService } from './books.service'; // ✅ Import the service

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {} // ✅ Inject the service

  @Get()
  getAll() {
    return this.booksService.findAll();
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }
}
