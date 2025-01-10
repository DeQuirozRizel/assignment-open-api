import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class NewsService {
  private readonly apiKey: string = '219569dce91c4714aaef113d4e9df6e5';
  private readonly baseUrl: string = 'https://newsapi.org/v2';

  constructor(private readonly httpService: HttpService) {}

  async getTopHeadlines(country: string = 'us'): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpService.get(`${this.baseUrl}/top-headlines`, {
        params: {
          country,
          apiKey: this.apiKey,
        },
      }).toPromise();
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch top headlines', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchNews(query: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpService.get(`${this.baseUrl}/everything`, {
        params: {
          q: query,
          apiKey: this.apiKey,
        },
      }).toPromise();
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to search news', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
