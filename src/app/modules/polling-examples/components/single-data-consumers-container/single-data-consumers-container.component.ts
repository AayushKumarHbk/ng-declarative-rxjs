import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-single-data-consumers-container',
  templateUrl: './single-data-consumers-container.component.html',
  styleUrls: ['./single-data-consumers-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingleDataConsumersContainerComponent implements OnInit {

  public readonly serviceTsImpl = `
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
    // we use 'shareReplay' so that single observable multicasts value to multiple subscribers.
    // If we don't use 'shareReplay', our observable will be fired for each subscriber.
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
  `;

  public readonly rxjsOperators: Array<KeyValue<string, string[]>> = [
    {
      key: `timer`,
      value: [
        'To continuously emit a value peridically so that our request can be triggered automatically at a specific interval',
        'timer normally emits an integer value. We can replace this value with the response from backend'
      ]
    },
    {
      key: `concatMap`,
      value: [
        'To replace the current observable with a new obswervable and wait for it to complete',
        'In our case, we replace the values emitted by timer with the request observable. Since we are using concatMap, it will fire the request and wait for the it to complete. In case, network is slow or backend takes time to respond, timer will fire another value but that will be ignored since concatMap won\'t be triggered again until the first request completes'
      ]
    },
    {
      key: `distinctUntilChanged`,
      value: [
        'Compares data from previous response with current one. If same, it won\'t let current value to pass so that our workflow isn\'t executed until we receive different data from backend.'
      ]
    },
    {
      key: `shareReplay`,
      value: [
        'This operator is the key to declarative paradigm in polling workflows.',
        'It will multicast a value to multiple subscribers. Means that without it, observable will be executed for each subscriber separately. With shareReplay, only one instance of this observable will share value to multiple consumers'
      ]
    }
  ];

  public readonly componentTsImplCode = `
export class SingleDataConsumerComponent implements OnInit {

  /**
   * Observable to be used directly in HTML
   */
  public allCamerasObs: Observable&lt;Camera[]>;
  /**
   * Flag containing true if observable has an error and false, if it doesn't
   */
  public hasError = false;

  constructor(private readonly pollingService: SingleModificationPollingService) { }

  ngOnInit(): void {
    this.getAllCameras();
  }

  /**
   * Function to get data from service.
   */
  private getAllCameras(): void {
    // get data from service without subscribing
    this.allCamerasObs = this.pollingService.allCamerasObs.pipe(
      // tap operator from rxjs to check for error
      tap({
        next: () => this.hasError = false,
        error: () => this.hasError = true
      })
    );
  }

}
  `;

  public readonly htmlImplCode = `
  &lt;!-- explanations is given after this code block -->
  &lt;ng-container *ngIf="allCamerasObs | async as allCameras; else loadingOrError">
    &lt;ng-container *ngIf="allCameras && allCameras.length > 0; else noDataMsg">
        &lt;ng-container *ngFor="let camera of allCameras">
            &lt;p>{{camera.name}}&lt;/p>
        &lt;/ng-container>
    &lt;/ng-container>
&lt;/ng-container>

&lt;ng-template #noDataMsg>
    &lt;div class="message-box">
        No cameras to display
    &lt;/div>
&lt;/ng-template>

&lt;ng-template #loadingOrError>
    &lt;div
        class="message-box"
        *ngIf="hasError; else loading"
    >
        An error ocurred while fetching data from backend
    &lt;/div>
&lt;/ng-template>
&lt;ng-template #loading>
    &lt;div class="message-box">
        Loading...
    &lt;/div>
&lt;/ng-template>
  `;

  public readonly htmlCodeNotes: Array<KeyValue<string, string[]>> = [
    {
      key: `&lt;ng-container *ngIf="allCamerasObs | async as allCameras; else loadingOrError">`,
      value: [
        'The observable `allCamerasObs` is passed to the async pipe. Using the keyword `as` we can create an alias and get the data from inside the observable. ngIf will remain false until we receive a positive value. This means that until our first request is successfully complete or if we receive an HTTP error, the `else` condition will be true.',
        'This approach allows us to handle the loading and error messages in the ng- template rendered by else condition.'
      ]
    },
    {
      key: `&lt;ng-container *ngIf="allCameras &amp;&amp; allCameras.length > 0; else noDataMsg">`,
      value: [
        'Since we have received a positive response, we can use the alias and check for presence of data. If no data is present, we can display a `no data message`.'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
