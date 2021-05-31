import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileRoutingModule} from '@modules/profile/profile.routing';
import {SharedModule} from '@shared/shared.module';
import { ProfileComponent } from './page/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



@NgModule({
  declarations: [ProfileComponent, UserProfileComponent],
  imports: [
    CommonModule, ProfileRoutingModule, SharedModule
  ]
})
export class ProfileModule { }
