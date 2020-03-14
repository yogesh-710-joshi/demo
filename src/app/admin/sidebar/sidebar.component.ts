import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import {DataService} from './../../data.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userInfo : any = {};
  activated : string = "dashboard";
  @Input() childMessage: string = "no message" ;
  message :string;


 // @Output() public menuItem = new EventEmitter<any>();

  constructor(private router : Router, private data:DataService) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
   }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.data.currentMessage.subscribe(message => {
      this.message = message;
    })
  //  this.menuItem = "dashboard";
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }


  itemSelect(event)
  {
    this.activated = event.currentTarget.id;
    this.data.changeMessage(this.activated);
  }

}
