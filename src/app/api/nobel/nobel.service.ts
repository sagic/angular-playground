import { Injectable } from '@angular/core';
import * as mocked from './nobel-mock.data.json';
import { delay, of } from 'rxjs';
import { NobelPrizeInfo } from './nobel.types';

@Injectable({
  providedIn: 'root',
})
export class NobelService {
  public getSomeFictionalNobelPrizeWinners() {
    return of<NobelPrizeInfo[]>(mocked).pipe(delay(1000));
  }
}
