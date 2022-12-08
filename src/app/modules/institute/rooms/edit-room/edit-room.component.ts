import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { RoomCreateDto } from 'src/app/shared/interfaces/dtos/rooms/room-create-dto';
import { RoomSingleDto } from 'src/app/shared/interfaces/dtos/rooms/room-single-dto';
import { RoomUpdateDto } from 'src/app/shared/interfaces/dtos/rooms/room-update-dto';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  public readonly nameProperty: string = 'name';
  public readonly descriptionProperty: string = 'description';
  public readonly numberProperty: string = 'number';
  public readonly floorProperty: string = 'floor';
  public readonly membersCapacityProperty: string = 'membersCapacity';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";

  roomForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    number: ['', Validators.compose([Validators.required, Validators.min(1)])],
    floor: [undefined],
    membersCapacity: ['', Validators.compose([Validators.required, Validators.min(1)])],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _roomService: RoomsService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    const routeId = this._activatedRoute.snapshot.paramMap.get('id');

    if (routeId) {
      this.id = Number(routeId);
      this.isEdit = true;

      this.getAndSetRoomInfo();
    }

    this.changeTitle();
  }

  public save() {
    const dto = this.formToDto();

    if (this.isEdit)
      this.updateRoom(dto);
    else
      this.addRoom(dto);
  }

  get Name() { return this.roomForm.get(this.nameProperty); }
  get Description() { return this.roomForm.get(this.descriptionProperty); }
  get Number() { return this.roomForm.get(this.numberProperty); }
  get Floor() { return this.roomForm.get(this.floorProperty); }
  get MemberCapacity() { return this.roomForm.get(this.membersCapacityProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR SALON";
    } else {
      this.title = "AGREGAR NUEVO SALON";
    }
  }

  private formToDto(): RoomSingleDto {
    return {
      id: this.id,
      name: this.Name?.value,
      description: this.Description?.value,
      number: this.Number?.value,
      floor: this.Floor?.value,
      membersCapacity: this.MemberCapacity?.value,
    }
  }

  private getAndSetRoomInfo(): void {
    this._roomService.getRoom(this.id).subscribe(room => {
      this.Name?.setValue(room.name);
      this.Description?.setValue(room.description);
      this.Number?.setValue(room.number);
      this.Floor?.setValue(room.floor);
      this.MemberCapacity?.setValue(room.membersCapacity);
    },
      (error: string) => {
        this.showError(error);
      });
  }

  private addRoom(dto: RoomCreateDto): void {
    this._roomService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Salon Creado");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private updateRoom(dto: RoomUpdateDto) {
    this._roomService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Salon Actualizado");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private showSuccess(message: string) {
    this._toastrService.success(message, "Aceptar");
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }

  private goBack() {
    this._location.back();
  }
}

