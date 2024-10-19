import { AfterViewInit, AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, delay, filter } from 'rxjs';
import { RoleTypeEnum } from 'src/app/shared/interfaces/enums/role-type.enum';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  data: NavItems[];
  isLoggedIn$: Observable<boolean>;
  currentUserRole: RoleTypeEnum[] = [];

  constructor(
    private _authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private observer: BreakpointObserver,
    private router: Router,
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

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          if (this.sidenav){
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav && this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
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
        RoleTypeEnum.SuperAdmin,
        RoleTypeEnum.Manager,
        RoleTypeEnum.StaffMember,
      ],
      heading: 'Institución',
      icon: 'foundation',
      link: '',
      children: [
        {
          title: 'Gestionar Datos',
          link: 'institute/manage',
          icon: 'description'
        },
        {
          title: 'Actividades',
          link: 'institute/activities',
          icon: 'sports_martial_arts'
        },
        {
          title: 'Profesores',
          link: 'institute/coaches',
          icon: 'people'
        },
        {
          title: 'Espacios',
          link: 'institute/rooms',
          icon: 'room_preferences'
        },
        {
          title: 'Clases',
          link: 'institute/classes',
          icon: 'calendar_month'
        },
        {
          title: 'Horarios',
          link: 'institute/blocks',
          icon: 'schedule'
        },
        {
          roles: [
            RoleTypeEnum.SuperAdmin,
            RoleTypeEnum.Manager,
          ],
          title: 'Staff',
          link: 'institute/staff',
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
      link: 'institute-members',
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
      heading: 'Gestion',
      icon: 'store',
      link: '',
      children: [
        {
          title: 'Membresias',
          link: 'manage/memberships',
          icon: 'card_membership',
        },
        {
          title: 'Tipos de Membresias',
          link: 'manage/membership-types',
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
      link: 'payments',
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
      link: 'plans',
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
          link: 'manage-users/users',
          icon: 'people',
        },
        {
          title: "Roles",
          link: 'manage-users/user-roles',
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
      link: 'institutes',
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
