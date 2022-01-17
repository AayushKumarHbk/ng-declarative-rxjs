import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public readonly navItems: NavItem[] = [
    {
      displayName: 'Polling Examples',
      iconName: 'recent_actors',
      route: 'examples',
      children: [
        {
          displayName: 'Single Source Multiple Subscriers',
          iconName: 'group',
          route: 'examples/ssms'
        }
      ]
    }
  ];
}
