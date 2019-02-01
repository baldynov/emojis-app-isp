import { Component, OnInit } from '@angular/core';
import { EmojisService } from '../emojis.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private service: EmojisService) { }

  data = [];
  showTooltip: string = '';
  top:string = '';
  left:string = '';

  ngOnInit() {
    this.service.visibleItems.subscribe(res => {
      this.data = res;
    });
  }

  handlerTooltip(event, value) {
    this.top = (event.y - 150) + 'px';
    this.left = (event.x - 150) + 'px';
    this.showTooltip = value;
  }

}
