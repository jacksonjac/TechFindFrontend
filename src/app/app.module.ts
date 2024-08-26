import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {ToastModule} from 'primeng/toast';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';

import { RippleModule } from 'primeng/ripple';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DialogModule } from 'primeng/dialog';


import { AppRoutingModule } from './app-routing.module'; // Make sure this path is correct
import { AdminRoutingModule } from './admin/admin-routing.module'; // Make sure this path is correct
import { ClientRoutingModule } from './client/client-routing.module'; // Make sure this path is correct

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ClientComponent } from './client/client.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientLoginComponent } from './client/client-login/client-login.component';
import { ClientSignupComponent } from './client/client-signup/client-signup.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { TechnicianComponent } from './technician/technician.component';
import { TechnicianLoginComponent } from './technician/technician-login/technician-login.component';
import { TechnicianHomepageComponent } from './technician/technician-homepage/technician-homepage.component';
import { TechnicianSignupComponent } from './technician/technician-signup/technician-signup.component';
import { TechnicianRoutingModule } from './technician/Technician-routing.module';
import { UserlistComponent } from './admin/userlist/userlist.component';
import { TechnicianlistComponent } from './admin/technicianlist/technicianlist.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ClientTechlistComponent } from './client/client-techlist/client-techlist.component';
import { ClientOtpComponent } from './client/client-otp/client-otp.component';
import { ModalComponent } from './client/modal/modal.component';
import { AuthInterceptor } from './client/interceptor/auth.interceptor';
import { TechnicianOtpComponent } from './technician/technician-otp/technician-otp.component';
import { TechHomepageComponent } from './technician/tech-homepage/tech-homepage.component';
import { TechQuizhomeComponent } from './technician/tech-quizhome/tech-quizhome.component';
import { TechQuizpageComponent } from './technician/tech-quizpage/tech-quizpage.component';
import { TechTestComponent } from './admin/tech-test/tech-test.component';
import { TechQuestionsComponent } from './admin/tech-questions/tech-questions.component';
import { AddQuestionmodalComponent } from './admin/modals/add-questionmodal/add-questionmodal.component';
import { AdminManageDesiComponent } from './admin/admin-manage-desi/admin-manage-desi.component';
import { AddDesignationComponent } from './admin/modals/add-designation/add-designation.component';
import { SearchPipe } from './pipes/search.pipe';
import { LocationsearchPipe } from './pipes/locationpipe/locationsearch.pipe';
import { EditQuestionComponent } from './admin/modals/edit-question/edit-question.component';
import { ClientTechProfileComponent } from './client/client-techProfile/client-tech-profile/client-tech-profile.component';
import { TechAddslotComponent } from './technician/tech-addSlot/tech-addslot/tech-addslot.component';
import {DateBookComponent} from './client/modal/dateBook/date-book/date-book.component'
import { ChartModule } from 'primeng/chart';
import { RatingModule } from 'primeng/rating';
// import { socketConfig } from './Servies/socket.config';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ClientPaymentComponent } from './client/client-payment/client-payment/client-payment.component';
import { ClientPaymentsucessComponent } from './client/client-Sucess/client-paymentsucess/client-paymentsucess.component';
import { ClientbookingsComponent } from './client/client-bookigs/clientbookings/clientbookings.component';
import { ClientprofilepageComponent } from './client/client-profilePage/clientprofilepage/clientprofilepage.component';
import { TechProfileComponent } from './technician/tech-profile/tech-profile/tech-profile.component';
import {  ClientChatpageComponent } from "./client/client-chatpage/client-chatpage.component";
import { ChatPageComponent } from './technician/chat-page/chat-page.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientAllchatsComponent } from './client/client-allchats/client-allchats.component';
import { RoomidmodalComponent } from './client/modal/roomidmodal/roomidmodal.component';
import { ClientVideocallroomComponent } from './client/client-videocallroom/client-videocallroom/client-videocallroom.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateroomComponent } from './technician/modal/createRoom/createroom/createroom.component';
import { VideocallpageComponent } from './technician/tech-videocall/videocallpage/videocallpage.component';
import { TechNotificationsComponent } from './technician/modal/tech-notificationpage/tech-notifications/tech-notifications.component';
import { TimepipePipe } from './pipes/timeformat/timepipe.pipe';
import { MeetingscheduleComponent } from './technician/meetingschedule/meetingschedule/meetingschedule.component';
import { MeetingListsComponent } from './technician/meetingLists/meeting-lists/meeting-lists.component';
import { NotificationsComponent } from './client/modal/notificationpage/notifications/notifications.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    ClientComponent,
    ClientHomeComponent,
    ClientLoginComponent,
    ClientSignupComponent,
    AdminLoginComponent,
    TechnicianComponent,
    TechnicianLoginComponent,
    TechnicianHomepageComponent,
    TechnicianSignupComponent,
    UserlistComponent,
    TechnicianlistComponent,
    ClientTechlistComponent,
    ClientOtpComponent,
    ModalComponent,
    TechnicianOtpComponent,
    TechHomepageComponent,
    TechQuizhomeComponent,
    TechQuizpageComponent,
    ClientAllchatsComponent,
    ClientbookingsComponent,
    TechTestComponent,
    TechQuestionsComponent,
    AddQuestionmodalComponent,
    AdminManageDesiComponent,
    AddDesignationComponent,
    SearchPipe,
    LocationsearchPipe,
    EditQuestionComponent,
    ClientTechProfileComponent,
    TechAddslotComponent,
    DateBookComponent,
    DateBookComponent,
    ClientPaymentComponent,
    ClientPaymentsucessComponent,
    ClientbookingsComponent,
    ClientprofilepageComponent,
    TechProfileComponent,
    ClientChatpageComponent,
    ChatPageComponent,
    ClientAllchatsComponent,
    RoomidmodalComponent,
    ClientVideocallroomComponent,
    CreateroomComponent,
    VideocallpageComponent,
    TechNotificationsComponent,
    TimepipePipe,
    MeetingscheduleComponent,
    MeetingListsComponent,
    NotificationsComponent
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClientRoutingModule,
    AdminRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatCardModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TechnicianRoutingModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CalendarModule,
    ListboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ChartModule,
    RatingModule,
    DialogModule
    
    
   
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
