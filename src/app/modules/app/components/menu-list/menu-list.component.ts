import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { NavItem } from '../../models/nav-item';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListComponent implements AfterViewInit {

  public expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  public readonly navItems: NavItem[] = [
    {
      displayName: 'Polling Examples',
      iconName: 'recent_actors',
      route: '/polling',
      expanded: false,
      children: [
        {
          displayName: 'Single Source Multiple Subscribers',
          iconName: 'group',
          route: '/polling/single-data-multiple-consumers',
        }
      ]
    }
  ];

  constructor(public readonly router: Router) {
  }

  ngAfterViewInit(): void {
    this.expandMenuItemOnStartup();
  }

  private expandMenuItemOnStartup(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      take(1)
    ).subscribe({
      next: () => {
        for (let index = 0; index < this.navItems.length; index++) {
          const navItem = this.navItems[index];
          if (this.router.url.startsWith(navItem.route)) {
            navItem.expanded = true;
            break;
          }

        }
      }
    });
  }

  public hasChildren(navItem: NavItem): boolean {
    if (navItem.children && navItem.children.length > 0) {
      return true;
    }
    return false;
  }

}
