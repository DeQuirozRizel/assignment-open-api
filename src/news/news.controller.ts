import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('headlines')
  async getTopHeadlines(@Query('country') country: string) {
    return this.newsService.getTopHeadlines(country || 'us');
  }

  @Get('search')
  async searchNews(@Query('query') query: string) {
    if (!query) {
      throw new Error('Query parameter is required');
    }
    return this.newsService.searchNews(query);
  }
}
