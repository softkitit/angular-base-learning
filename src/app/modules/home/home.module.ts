import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [SharedModule, HomeRoutingModule],
  exports: [],
  providers: [],
  entryComponents: []
})
export class HomeModule {}
