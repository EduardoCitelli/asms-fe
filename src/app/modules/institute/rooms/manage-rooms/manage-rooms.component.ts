import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { RoomListDto } from 'src/app/shared/interfaces/dtos/rooms/room-list-dto';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.css']
})
export class ManageRoomsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
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
  ) {
  }

  public ngOnInit(): void {
    this.loadRooms(1, 2);
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
    this._roomService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.roomsCount -= 1;
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
      catchError(err => {
        console.log(err);
        alert("Error loding rooms.");
        return throwError(err);
      })
    ).subscribe();
  }
}
