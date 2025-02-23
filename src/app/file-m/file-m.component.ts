import { Component } from '@angular/core';
import { ExplorerComponent } from 'ngx-explorer';
import { ExplorerService } from 'ngx-explorer'; 


@Component({
  selector: 'app-file-m',
  standalone: true,
  imports: [ExplorerComponent],
  templateUrl: './file-m.component.html',
  styleUrl: './file-m.component.css',
})
export class FileMComponent {
// config:any;

files: File[] = [];  // Array to hold selected files

constructor(private explorerService: ExplorerService) {}

ngOnInit(): void {
  // Initialize any necessary configurations for the explorer here
}

// This method will be called when a user selects files or directories
onFileSelected(event: any): void {
  const selectedFiles = event.target.files;
  this.files = Array.from(selectedFiles);  // Convert FileList to an array

  // Now, you can interact with the ExplorerService to update the explorer state
  // For example, you could create a virtual directory structure and load files into the explorer.
  this.loadFilesIntoExplorer(this.files);
}

// This method loads the selected files into the explorer (example logic)
loadFilesIntoExplorer(files: File[]): void {
  // You can manipulate the explorer state based on the files selected.
  // For instance, you could create a root node and populate it with the selected files.
  
  const rootNode = { name: 'root', files: files };  // Example: a basic directory structure with selected files.
  this.explorerService.openTree(rootNode);  // Assuming openTree works with this structure (adjust as needed)
}
  
}
