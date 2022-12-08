import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleTypeEnum } from 'src/app/shared/interfaces/enums/role-type-enum';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  data: NavItems[];
  isLoggedIn$: Observable<boolean>;
  currentUserRole: RoleTypeEnum[] = [];

  constructor(
    private _authService: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.isLoggedIn$ = this._authService.logged;
    this.data = this.adminItems;
  }

  public ngOnInit(): void {
    this.currentUserRole = this._authService.getUserRoles();
  }

  public canShow(roles : RoleTypeEnum[]) : boolean{
    if (this.currentUserRole.length <= 0)
      return false;

    return this.currentUserRole.some(r => roles.includes(r))
  }

  public ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
    this.isLoggedIn$.subscribe(logged => {
      if (logged)
        this.currentUserRole = this._authService.getUserRoles();
    })
  }

  adminItems: NavItems[] = [
    {
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
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
      roles: [
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
      ],
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
          link: 'institute/activities',
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
          roles: [
            RoleTypeEnum.Manager,
          ],
          title: 'Staff',
          link: '',
          icon: 'people'
        },
      ]
    },
    {
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
      heading: 'Gestionar Miembros',
      icon: 'people',
      link: '',
      children: []
    },
    {
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
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
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
      heading: 'Pagos',
      icon: 'payments',
      link: '',
      children: []
    },
    {
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
      heading: 'Planes',
      icon: 'shopping_bag',
      link: '',
      children: []
    },
    {
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
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
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
      heading: 'Gestionar Instituciones',
      icon: 'foundation',
      link: '',
      children: []
    },
    {
      roles: [
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
        RoleTypeEnum.Coach,
        RoleTypeEnum.Member,
      ],
      heading: 'Salir',
      icon: 'exit_to_app',
      link: 'login',
      children: []
    }
  ]
}

interface NavItems {
  roles: RoleTypeEnum[],
  heading: string;
  icon: string;
  link: string;
  children: NavChild[];
}

interface NavChild {
  roles?: RoleTypeEnum[];
  title: string;
  link: string;
  icon: string;
}
