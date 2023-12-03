import { Injectable } from '@angular/core';
import * as mocked from './nba-mock.data.json';
import { delay, of } from 'rxjs';
import { NBAPlayerInfo } from './nba.types';

@Injectable({
  providedIn: 'root',
})
export class NBAService {
  public getNBAPlayersWithStatsAndSuch() {
    return of<NBAPlayerInfo[]>(mocked).pipe(delay(1000));
  }
}
