import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  ContentComponent,  IconsComponent, ListComponent,  TreeComponent } from 'ngx-explorer';
// import { ExplorerComponent}  from '../../../../demo/ngx-explorer/src/lib/components/explorer/explorer.component';
import { ExplorerComponent} from 'ngx-explorer';
import { ExplorerService } from 'ngx-explorer';


@Component({
  selector: 'app-file-m',
  standalone: true,
  imports: [ExplorerComponent, ContentComponent, TreeComponent, ListComponent, IconsComponent],
  templateUrl: './file-m.component.html',
  styleUrls: ['./file-m.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FileMComponent {


  constructor(
    private explorerService: ExplorerService,
  ) {
    this.explorerService.openNode();
  }

  ngOnInit() { }

}
