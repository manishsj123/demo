import { Directive, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { INode, NgeExplorerConfig } from '../../shared/types';
import { CONFIG } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';

@Directive()
export class BaseView implements OnDestroy {
    protected selection = new Set<number>();
    protected items: INode[] = [];
    protected dragging = false;
    protected subs = new Subscription();
    protected shiftSelectionStartId: number | undefined;

    protected explorerService: ExplorerService = inject(ExplorerService);
    protected config: NgeExplorerConfig = inject(CONFIG);

    constructor() {
        debugger
        this.subs.add(
            this.explorerService.openedDir$.subscribe((nodes) => {
                this.items = nodes ? nodes.children : [];
            })
        );

        this.subs.add(
            this.explorerService.selection$.subscribe((nodes) => {
                this.selection.clear();
                if (nodes) {
                    this.selection = new Set(nodes.map((n) => n.id));
                }
            })
        );
    }

    select(event: MouseEvent, item: INode) {
        const shiftKeyPressed = event.shiftKey;
        const metaKeyPressed = event.metaKey || event.ctrlKey;

        if (this.config.multipleSelection && shiftKeyPressed) {
            if (this.selection.size === 0) {
                this.selection.add(item.id);
                this.shiftSelectionStartId = item.id;
            } else {
                this.selection.clear();
                const headIndex = this.items.findIndex((i) => i.id === this.shiftSelectionStartId);
                const currentIndex = this.items.findIndex((i) => i.id === item.id);

                const start = Math.min(headIndex, currentIndex);
                const end = Math.max(headIndex, currentIndex);

                for (let i = start; i <= end; i++) {
                    this.selection.add(this.items[i].id);
                }
            }
        } else {
            if (this.config.multipleSelection && metaKeyPressed) {
                if (this.selection.has(item.id)) {
                    this.selection.delete(item.id);
                } else {
                    this.selection.add(item.id);
                }
            } else {
                this.selection.clear();
                this.shiftSelectionStartId = item.id;
                this.selection.add(item.id);
            }
        }

        const nodes = this.items.filter((i) => this.selection.has(i.id));
        this.explorerService.select(nodes);
    }

    open(event: MouseEvent, item: INode) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }

    isSelected(item: INode) {
        return this.selection.has(item.id);
    }

    emptySpaceClick(): void {
        this.explorerService.select([]);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
