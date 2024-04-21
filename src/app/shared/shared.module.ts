import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabComponent, TabsComponent } from "@forecast/shared/components";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TabComponent,
        TabsComponent,
    ],
    exports: [
        TabComponent,
        TabsComponent,
    ],
})
export class SharedModule {}
