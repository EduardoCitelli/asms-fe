import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { RoomListDto } from 'src/app/shared/interfaces/dtos/rooms/room-list-dto';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.scss']
})
export class ManageRoomsComponent implements OnInit, AfterViewInit {
  public title: string = 'Salones';
  displayedColumns: string[] = [
    "id",
    "number",
    "name",
    "description",
    "option",
  ];

  dataSource: RoomListDto[] = [];
  roomsCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _roomService: RoomsService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.loadRooms(1, 5);
  }

  public ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadRoomsPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['institute/rooms/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institute/rooms/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar el salon?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteRoom(id);
      });
  }

  private deleteRoom(id: number) {
    this._roomService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.roomsCount -= 1;
        this._toastrService.success("Salon Eliminado");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadRoomsPage() {
    this.loadRooms(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadRooms(pageIndex: number, pageSize: number) {
    this._roomService.getRooms(pageIndex, pageSize).pipe(
      tap(rooms => {
        this.dataSource = rooms.items;
        this.roomsCount = rooms.totalCount;
      }),
      catchError(error => {
        console.log(error);
        this._toastrService.error("Error obteniendo salones.");
        return throwError(error);
      })
    ).subscribe();
  }
}
