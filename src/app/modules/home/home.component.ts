import { Component } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { tap } from 'rxjs';
import { InstituteClassBlockService } from 'src/app/core/services/institute-class-block.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es-us';
import typpy from 'tippy.js'
import { InstituteClassBlockCalendarDto } from 'src/app/shared/interfaces/dtos/institute-class-blocks/institute-class-block-calendar-dto';
import { MatDialog } from '@angular/material/dialog';
import { ManageClassBlockModalComponent } from 'src/app/shared/modules/manage-class-block-modal/manage-class-block-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  calendarOptions: CalendarOptions;
  roomCombos: ComboDto<number>[] = [];
  selectedRoom: number = 0;
  timeLong: number = 14;
  blocks: InstituteClassBlockCalendarDto[] = [];

  from: Date = new Date();
  to: Date = new Date(new Date().setDate(this.from.getDate() + this.timeLong + 1));

  constructor(
    private _instituteClassBlockService: InstituteClassBlockService,
    private _roomService: RoomsService,
    private _dialog: MatDialog,
  ) {
    this.calendarOptions = {
      locale: esLocale,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      height: '80vh',
      expandRows: true,
      headerToolbar: {
        start: 'prev next',
        center: 'title',
        end: 'today',
      },
      validRange: (nowDate) => {
        return {
          start: new Date().setDate(nowDate.getDate()),
          end: new Date().setDate(nowDate.getDate() + this.timeLong),
        }
      },
      eventClick: (arg) => this.handleEventClick(arg),
      eventDidMount: (info) => {
        typpy(info.el, {
          content: info.event.title,
        });
      },
      initialView: 'timeGridWeek',
      eventColor: 'green',
      weekends: true,
      hiddenDays: [0],
      allDaySlot: false,
      slotMinTime: '06:00',
      events: [],
    };

    this._roomService.getCombo()
      .pipe(
        tap(combos => {
          this.roomCombos = combos;
          this.selectedRoom = combos[0].id;

          this.setData();
        })
      ).subscribe();
  }

  onChangeCombo() {
    this.setData();
  }

  private setData(): void {
    this._instituteClassBlockService.getCalendar(this.selectedRoom, this.from, this.to)
      .pipe(
        tap(response => {
          this.blocks = response;
          this.calendarOptions.events = response.map(value => {
            return {
              id: value.id.toString(),
              title: value.description,
              start: value.startDateTime,
              end: value.finishDateTime,
              interactive: true,
              url: '#',
            }
          })
        })
      ).subscribe();
  }

  private handleEventClick(clickInfo: EventClickArg) {
    const block = this.blocks.find(x => x.id.toString() == clickInfo.event.id);

    this._dialog.open(ManageClassBlockModalComponent, {
      data: block,
      width: '40rem'
    }).afterClosed()
    .subscribe(confirmed => {
      if (confirmed) {
        this.setData();
      }
    });

    clickInfo.jsEvent.preventDefault();
  }
}
