import { Component, ViewEncapsulation } from '@angular/core';
import { BaseView } from '../base-view/base-view.directive';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { CommonModule, NgClass } from '@angular/common';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DragDropDirective, NgClass,CommonModule],
})
export class IconsComponent extends BaseView {

    public readonly icons = {
        node: 'nxe-folder',
        leaf: 'nxe-doc',
    };

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    public selectedItem: boolean = false;
    public fileContentUrl: SafeResourceUrl | null = null;
    public filedata:any;
    openfile(item:any){
        this.filedata = item;
        console.log(item);
        
        if (item && item.data && item.data.content) {
            this.selectedItem = true;
            const fileContent = item.data.content;
            const blob = new Blob([fileContent], { type: 'text/plain' });
            this.fileContentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
          } else {
            console.error('Missing or invalid content for item:', item);
          }
    }

    closefile(){
        this.selectedItem = false;
        this.fileContentUrl = null;
    }
}
