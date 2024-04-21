import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { ITab } from "../../models/tab";

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements ITab {
    private cdr = inject(ChangeDetectorRef);
    
    @Input() id: string = '';
    @Input() title: string = '';
    @Input() active: boolean = false;
    @Output() onClose = new EventEmitter<void>();

    close() {
        this.onClose.emit();
    }
    
    checkForUpdates(): void {
        this.cdr.detectChanges();
    }
}
