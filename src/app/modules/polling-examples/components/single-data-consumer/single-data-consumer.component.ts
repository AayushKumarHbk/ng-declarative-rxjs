import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera } from '../../models/camera.model';
import { SingleModificationPollingService } from '../../services/single-data-polling.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-data-consumer',
  templateUrl: './single-data-consumer.component.html',
  styleUrls: ['./single-data-consumer.component.scss']
})
export class SingleDataConsumerComponent implements OnInit {

  /**
   * Observable to be used directly in HTML
   */
  public allCamerasObs: Observable<Camera[]>;
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

