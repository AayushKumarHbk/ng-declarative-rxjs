import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { concatMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import * as Lodash from 'lodash';
import { BasePollingService } from '../../../services/base-polling.service';
import { Camera } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})
export class SingleModificationPollingService extends BasePollingService implements OnDestroy {

  /**
   * Function to store observable polling data
   */
  private allCamerasObs$: Observable<Camera[]>;
  private pollingSubscription?: Subscription;

  constructor() {
    super();
    this.pollCameras();
  }

  /**
   * Getter to return observable containing data polled from backend
   */
  public get allCamerasObs(): Observable<Camera[]> {
    return this.allCamerasObs$;
  }

  private pollCameras(): void {
    // store the polling observable into a global variable
    // we use `shareReplay` so that single observable multicasts value to multiple subscribers.
    // If we don't use `shareReplay`, our observable will be fired for each subscriber.
    this.allCamerasObs$ = timer(0, this.pollingInterval).pipe(
      concatMap(() => this.getDataFromBackend()),
      distinctUntilChanged(Lodash.isEqual),
      shareReplay(1) // multicasting
    );

    // observable is subscribed so that it keep polling data
    this.pollingSubscription = this.allCamerasObs$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = undefined;
    }
  }


}
