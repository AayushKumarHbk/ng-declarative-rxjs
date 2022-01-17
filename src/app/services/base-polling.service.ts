import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Camera } from '../modules/polling-examples/models/camera.model';
import { DataSender } from '../utils/data-sender';

@Injectable()
export abstract class BasePollingService {

  private readonly dataSender = new DataSender();
  protected readonly pollingInterval: number = 3000;

  constructor() { }

  protected getDataFromBackend(): Observable<Camera[]> {
    return of(this.dataSender.getResponse());
  }
}
