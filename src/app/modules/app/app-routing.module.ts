import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingExamplesContainerComponent } from '../polling-examples/components/polling-examples-container/polling-examples-container.component';
import { SingleDataConsumerComponent } from '../polling-examples/components/single-data-consumer/single-data-consumer.component';

const routes: Routes = [
  {
    path: 'polling', component: PollingExamplesContainerComponent, children: [
      {
        path: 'single-data-multiple-consumers',
        component: SingleDataConsumerComponent
      }
    ]
  },
  { path: '', redirectTo: '/polling/single-data-multiple-consumers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
