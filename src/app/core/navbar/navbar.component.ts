import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  data: NavItems[];
  isLoggedIn$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.isLoggedIn$ = this._authService.logged;
    this.data = this.adminItems;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  adminItems: NavItems[] = [
    {
      heading: 'Panel de usuario',
      icon: 'api',
      link: '',
      children: [
        {
          title: 'Gestion de Usuario',
          link: 'user/manage-user',
          icon: 'account_circle',
        },
        {
          title: 'Cambiar Contraseña',
          link: 'user/manage-pass',
          icon: 'vpn_key',
        },
      ],
    },
    {
      heading: 'Institución',
      icon: 'foundation',
      link: '',
      children: [
        {
          title: 'Gestionar Datos',
          link: '',
          icon: 'description'
        },
        {
          title: 'Actividades',
          link: '',
          icon: 'sports_martial_arts'
        },
        {
          title: 'Profesores',
          link: '',
          icon: 'people'
        },
        {
          title: 'Espacios',
          link: 'institute/rooms',
          icon: 'room_preferences'
        },
        {
          title: 'Staff',
          link: '',
          icon: 'people'
        },
      ]
    },
    {
      heading: 'Gestionar Miembros',
      icon: 'people',
      link: '',
      children: []
    },
    {
      heading: 'Gestionar Membresias',
      icon: 'store',
      link: '',
      children: [
        {
          title: 'Membresias',
          link: '',
          icon: 'card_membership',
        },
        {
          title: 'Tipos de Membresias',
          link: '',
          icon: 'list',
        }
      ]
    },
    {
      heading: 'Pagos',
      icon: 'payments',
      link: '',
      children: []
    },
    {
      heading: 'Planes',
      icon: 'shopping_bag',
      link: '',
      children: []
    },
    {
      heading: 'Gestion de usuarios',
      icon: 'people',
      link: '',
      children: [
        {
          title: "Usuarios",
          link: '',
          icon: 'people',
        },
        {
          title: "Roles",
          link: '',
          icon: 'manage_accounts',
        },
      ]
    },
    {
      heading: 'Salir',
      icon: 'exit_to_app',
      link: 'login',
      children: []
    }
  ]
}

interface NavItems {
  heading: string;
  icon: string;
  link: string;
  children: NavChild[];
}

interface NavChild {
  title: string;
  link: string;
  icon: string;
}
