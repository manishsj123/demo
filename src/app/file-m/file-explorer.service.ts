import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, DataNode, IDataService } from 'ngx-explorer';
import { forkJoin, Observable, of, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MyExplorerEntity extends Data {
  id: number;
  name: string;
  path: string;
  content: string;
}

let MOCK_DIRS = [
  { id: 1, name: 'Music', path: '/' },
  { id: 2, name: 'Movies', path: '/' },
  { id: 3, name: 'Books', path: '/' },
  { id: 4, name: 'Games', path: '/' },
  { id: 5, name: 'Rock', path: '/Music/' },
  { id: 6, name: 'Jazz', path: '/Music/' },
  { id: 11, name: 'Very Long Name to display overflow', path: '/' },

  { id: 7, name: 'Classical', path: '/Music/' },
  { id: 15, name: 'Aerosmith', path: '/Music/Rock/' },
  { id: 17, name: 'Led Zeppelin', path: '/Music/Rock/' },
  { id: 18, name: 'The Beatles', path: '/Music/Rock/' },
  { id : 20, name: 'Iron Man', path: '/Movies/'},
  { id : 21, name: 'Caption', path: '/Movies/', content: ''},
] as MyExplorerEntity[];

let MOCK_FILES = [
  { id: 1312, name: 'notes.pdf', path: '/', content: 'This is a note' },
  { id: 1212, name: '2.txt', path: '/', content: 'This is another file' },
  { id: 29, name: 'Back in the U.S.S.R.txt', path: '/Music/Rock/The Beatles/', content: 'This is a Beatles song' },
  { id: 30, name: 'All You Need Is Love.txt', path: '/Music/Rock/The Beatles/', content: 'This is another Beatles song' },
  { id: 31, name: 'Hey Jude.txt', path: '/Music/Rock/The Beatles/', content: 'This is yet another Beatles song' },
  { id: 32, name: 'Dream On.txt', path: '/Music/Rock/Aerosmith/', content: 'This is an Aerosmith song' },
  { id: 33, name: 'Sweet Emotion.txt', path: '/Music/Rock/Aerosmith/', content: 'This is another Aerosmith song' },
  { id: 34, name: 'Walk This Way.txt', path: '/Music/Rock/Aerosmith/', content: 'This is yet another Aerosmith song' },
  { id: 35, name: 'Stairway to Heaven.txt', path: '/Music/Rock/Led Zeppelin/', content: 'This is a Led Zeppelin song' },
  { id: 36, name: 'ges.pdf', path : '/Movies/Iron Man/' }
] as MyExplorerEntity[];



export class FileExplorerService implements IDataService<MyExplorerEntity> {

  private id = 0;
  private folderId = 1000;

  constructor(){}

  downloadFile(data: MyExplorerEntity): Observable<any> {
      const file = MOCK_FILES.find((f) => f.id === data.id);

      const myblob = new Blob([file!.content], {
          type: 'text/plain',
      });
      const objectUrl = window.URL.createObjectURL(myblob);
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

      a.href = objectUrl;
      a.download = file!.name;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
      return of(null);
  }

  uploadFiles(parent: MyExplorerEntity, files: FileList): Observable<any> {
      const results = [];

      for (let i = 0; i < files.length; i++) {
          const file = files.item(i)!;
          const obs = new Observable((observer: Subscriber<any>): void => {
              const reader = new FileReader();

              const id = ++this.id;

              reader.onload = () => {
                  const nodePath = parent ? MOCK_DIRS.find((f) => f.id === parent.id)!.path : '';
                  const newFile = { id, name: file.name, path: nodePath + '/' + file.name, content: reader.result as string };
                  MOCK_FILES.push(newFile);
                  observer.next(reader.result);
                  observer.complete();
              };
              reader.readAsText(file);
          });
          results.push(obs);
      }

      return forkJoin(results);
  }

  delete(datas: MyExplorerEntity[]): Observable<any> {
      const results = datas.map((data) => {
          const path = data.path + '/';
          MOCK_FILES = MOCK_FILES.filter((f) => !f.path.startsWith(path));
          MOCK_DIRS = MOCK_DIRS.filter((f) => !f.path.startsWith(path));
          MOCK_DIRS = MOCK_DIRS.filter((f) => f.id !== data.id);
          return of({});
      });
      return forkJoin(results);
  }

  createDir(parent: MyExplorerEntity, name: string): Observable<any> {
      const path = (parent.path ? parent.path + '/' : '') + name.replace(/[\W_]+/g, ' ');
      const id = ++this.folderId;
      const newFolder = { path, id, name, content: '' };
      MOCK_DIRS.push(newFolder);
      return of(newFolder);
  }

  getContent(data: MyExplorerEntity) {debugger
      const folderPath = data.path || '/';
      const name = data.name ? data.name + '/' : '';
      const fullPath = folderPath + name;
      const dirs = MOCK_DIRS.filter((f) => f.path === fullPath);
      const files = MOCK_FILES.filter((f) => f.path === fullPath);
      return of({ files, dirs });
  }

  rename(data: MyExplorerEntity, newName: string) {
      const node = MOCK_DIRS.find((f) => f.id === data.id);
      if (node) {
          node.name = newName;
          return of(node);
      }
      const leaf = MOCK_FILES.find((f) => f.id === data.id);
      if (leaf) {
          leaf.name = newName;
          return of(leaf);
      }
      return of({}) as Observable<any>;
  }

  getName(data: MyExplorerEntity) {
      return data.name;
  }

  openTree(data: MyExplorerEntity): Observable<Array<DataNode<MyExplorerEntity>>> {
      const fullPath = data.path + data.name + '/';
      const paths = fullPath.split('/').slice(0, -1);
      const parentPaths = [] as string[];
      while (paths.length > 0) {
          const path = paths.join('/') + '/';
          parentPaths.unshift(path);
          paths.pop();
      }

      const observables = parentPaths.map((path) => {
          const dirs = MOCK_DIRS.filter((f) => f.path === path);
          const files = MOCK_FILES.filter((f) => f.path === path);
          const nodes = dirs.concat(files);
          return of(nodes);
      });

      return forkJoin(observables).pipe(
          map((dataNodesLevels) => {
              const trees = [] as Array<DataNode<MyExplorerEntity>>;
              let parent = trees;
              parentPaths.shift(); // remove the first path, it's the root

              dataNodesLevels.forEach((dataNodes, index) => {
                  const childrenNodes = dataNodes.map((data) => ({
                      data,
                      children: [],
                      isLeaf: !!data.content,
                  }));
                  parent.push(...childrenNodes);
                  const parentPath = parentPaths[index];
                  const nextParent = childrenNodes.find((n) => parentPath === n.data.path + n.data.name + '/');
                  parent = nextParent ? nextParent.children : [];
              });
              return trees;
          })
      );
  }
  
}
