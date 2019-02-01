import { Component, OnInit } from '@angular/core';
import { EmojisService } from '../emojis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private service: EmojisService, private router: Router) { }

  ngOnInit() {
    this.service.changePage(this.router.url);
  }
}
