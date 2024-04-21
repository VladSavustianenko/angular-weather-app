import { AfterContentChecked, Component, ContentChildren, QueryList } from "@angular/core";
import { TabComponent } from "../tab/tab.component";
import { ITab } from "../../models/tab";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styles: [`
      .tab-titles { list-style: none; margin: 0; padding: 0; }
      .tab-titles li { display: inline-block; padding: 10px; border: 1px solid #ccc; cursor: pointer; }
      .tab-titles li.active { background-color: #ddd; }
      .tab-titles li .close { margin-left: 10px; }
    `]
})
export class TabsComponent implements AfterContentChecked {
    @ContentChildren(TabComponent) tabs!: QueryList<ITab>;

    ngAfterContentChecked(): void {
        const activeTabs = this.tabs.filter(tab => tab.active);
        if (activeTabs.length === 0 && this.tabs.first) {
          this.select(this.tabs.first);
        }
    }

    select(tab: ITab) {
        this.tabs.forEach(t => t.active = false);
        tab.active = true;

        this.tabs.forEach(t => t.checkForUpdates());
    }

    close(clickedTab: ITab, event: MouseEvent) {
      event.stopPropagation();

      const updatedTabs = this.tabs.filter(tab => tab.id !== clickedTab.id);
      this.tabs.reset(updatedTabs);

      clickedTab.close();

      if (this.tabs.length && this.tabs.first) {
        this.select(this.tabs.first);
      }
    }
}
