import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations: [
        NopagefoundComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        FooterComponent,
        HeaderComponent
    ],
    exports: [
        NopagefoundComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        FooterComponent,
        HeaderComponent
    ]
})

export class SharedModule { }