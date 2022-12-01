import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  data: any;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.isLoggedIn$ = this._authService.logged;
  }

  public ngOnInit(): void {
    this.data = this.adminItems;
  }

  public ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  adminItems = [
    {
      heading: 'Panel',
      icon: 'api',
      link: '',
      children: [
        {
          title: 'Gestion de Usuario',
          link: 'editar-admin',
          icon: 'account_circle',
        },
        {
          title: 'Cambiar Contraseña',
          link: 'pass-management',
          icon: 'vpn_key',
        },
      ],
    },
    {
      heading: 'Banners',
      icon: 'filter',
      link: '',
      children: [
        {
          title: 'Banners',
          link: 'banners-management',
          icon: 'image'
        },
        {
          title: 'Slider de Inicio',
          link: 'start-slider',
          icon: 'filter'
        },

      ]
    },
    {
      heading: 'Administrar ciudades',
      icon: 'place',
      link: 'city-management',
      children: []
    },
    {
      heading: 'Páginas de la aplicación',
      icon: 'content_copy',
      link: 'app-pages-management',
      children: []
    },
    {
      heading: 'Comercios',
      icon: 'store',
      link: '',
      children: [
        {
          title: 'Administrar comercios',
          link: 'adm-comercio',
          icon: 'storefront',
        },
        {
          title: 'Administrar tipos de comercio',
          link: 'shop-type-management',
          icon: 'list',
        }
      ]
    },
    {
      heading: 'Administrar descuentos',
      icon: 'local_offer',
      link: 'discount-management',
      children: []
    },
    {
      heading: 'Miembros del personal',
      icon: 'people',
      link: 'personal',
      children: []
    },
    {
      heading: 'Administrar pedidos',
      icon: 'shopping_cart',
      link: '',
      children: [
        {
          title: "Pedidos Activos",
          link: 'active-orders',
          icon: 'double_arrow',
        },
        {
          title: "Pedidos Rechazados",
          link: 'cancelled-orders',
          icon: 'do_disturb',
        },
        // {
        //   title: "Pedidos Asignados a Cadete",
        //   link: 'assigned-orders',
        //   icon: 'done_all',
        // },
        {
          title: "Pedidos En Viaje",
          link: 'completed-orders',
          icon: 'double_arrow',
        },
      ]
    },
    {
      heading: 'Enviar notificación',
      icon: 'send',
      link: 'notifications',
      children: []
    },
    {
      heading: 'Liquidaciones',
      icon: 'stacked_line_chart',
      link: '',
      children: [
        {
          title: 'Cadetes',
          link: 'liquidaciones-cadetes',
          icon: 'sports_motorsports'
        },
        {
          title: 'Empresas',
          link: 'liquidaciones-empresas',
          icon: 'work'
        },
        {
          title: 'Recibos cadetes',
          link: 'recibos-cadetes',
          icon: 'sports_motorsports'
        },
      ]
    },
    {
      heading: 'Reportes',
      icon: 'stacked_line_chart',
      link: '',
      children: [
        {
          title: 'Reportes de Ventas',
          link: 'sales-report',
          icon: 'list',
        },
        // {
        //   title: 'Reportes de Cadetes',
        //   link: 'delivery-report',
        //   icon: 'list',
        // },
        {
          title: 'Consultar liquidaciones',
          link: 'consulta-liquidaciones',
          icon: 'analytics'
        },
        {
          title: 'Consultar recibos',
          link: 'consulta-recibos-cadetes',
          icon: 'receipt'
        },
      ]
    },
    {
      heading: 'Herramientas adicionales',
      icon: 'addchart',
      link: 'admin-home',
      children: []
    },
    {
      heading: 'Usuarios de app',
      icon: 'groups',
      link: 'app-users',
      children: []
    },
    {
      heading: 'Salir',
      icon: 'exit_to_app',
      link: 'login-admin',
      children: []
    }
  ]
}
