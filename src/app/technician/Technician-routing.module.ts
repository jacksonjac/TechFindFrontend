import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianComponent } from './technician.component';
import { TechnicianLoginComponent } from './technician-login/technician-login.component';
import { TechnicianSignupComponent } from './technician-signup/technician-signup.component';
import { TechnicianOtpComponent } from './technician-otp/technician-otp.component';
import { TechnicianHomepageComponent } from './technician-homepage/technician-homepage.component';
import { TechQuizhomeComponent } from './tech-quizhome/tech-quizhome.component';
import { TechQuizpageComponent } from './tech-quizpage/tech-quizpage.component';
import { TechAddslotComponent } from './tech-addSlot/tech-addslot/tech-addslot.component';
import { authguardGuard } from './guards/guardauth.guard';

import { TechProfileComponent } from './tech-profile/tech-profile/tech-profile.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import {notokenGuard} from './guards/notoken.guard'
import { VideocallpageComponent } from './tech-videocall/videocallpage/videocallpage.component';
import { MeetingscheduleComponent } from './meetingschedule/meetingschedule/meetingschedule.component';
import { MeetingListsComponent } from './meetingLists/meeting-lists/meeting-lists.component';
const routes: Routes = [
  {
    path: 'technician',
    component: TechnicianComponent,
    children: [
      { path: '', component: TechnicianHomepageComponent ,canActivate:[authguardGuard]},
      { path: 'login', component:TechnicianLoginComponent,canActivate:[notokenGuard]},
      { path: 'signup', component:TechnicianSignupComponent},
      {path:'otp-page',component:TechnicianOtpComponent},
      {path:'tech-home',component:TechnicianHomepageComponent,canActivate:[authguardGuard]},
      {path:'quiz-start',component:TechQuizhomeComponent},
      {path:'quiz-page',component:TechQuizpageComponent},
      {path:'slot-page',component:TechAddslotComponent,canActivate:[authguardGuard]},
      {path:'tech-Profile',component:TechProfileComponent,canActivate:[authguardGuard]},
      {path:"chatpage",component:ChatPageComponent,canActivate:[authguardGuard]},
      { path: 'room/:id', component: VideocallpageComponent },
      { path: 'schedule-meeting', component: MeetingscheduleComponent },
      { path: 'meeting-list', component: MeetingListsComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
