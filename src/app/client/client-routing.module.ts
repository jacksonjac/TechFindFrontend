import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent} from './client.component'
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientTechlistComponent } from './client-techlist/client-techlist.component';
import { ClientOtpComponent } from './client-otp/client-otp.component';
import { authguardGuard } from './guards/authguard.guard';
import { notokenauthGuard } from './guards/notokenauth.guard';
import { ClientTechProfileComponent } from './client-techProfile/client-tech-profile/client-tech-profile.component';
import { DateBookComponent } from './modal/dateBook/date-book/date-book.component';
import { ClientPaymentComponent } from './client-payment/client-payment/client-payment.component';
import { ClientPaymentsucessComponent } from './client-Sucess/client-paymentsucess/client-paymentsucess.component';
import { ClientbookingsComponent } from './client-bookigs/clientbookings/clientbookings.component';
import { ClientprofilepageComponent } from './client-profilePage/clientprofilepage/clientprofilepage.component';
import { ClientChatpageComponent } from './client-chatpage/client-chatpage.component';
import { ClientAllchatsComponent } from './client-allchats/client-allchats.component';
import { ClientVideocallroomComponent } from './client-videocallroom/client-videocallroom/client-videocallroom.component';



const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    { path: '', component: ClientHomeComponent, canActivate: [notokenauthGuard], data: { animation: 'HomePage' } },
    { path: 'login', component: ClientLoginComponent, canActivate: [notokenauthGuard], data: { animation: 'LoginPage' } },
    { path: 'signup', component: ClientSignupComponent, data: { animation: 'SignupPage' } },
    { path: 'techlist', component: ClientTechlistComponent, canActivate: [authguardGuard], data: { animation: 'TechlistPage' } },
    { path: 'otppage', component: ClientOtpComponent, data: { animation: 'OtpPage' } },
    { path: 'TechDetatils/:id', component: ClientTechProfileComponent, canActivate: [authguardGuard], data: { animation: 'TechDetailsPage' } },
    { path: 'AppoimentTech', component: DateBookComponent, canActivate: [authguardGuard], data: { animation: 'AppointmentPage' } },
    { path: 'paymentmethod', component: ClientPaymentComponent, canActivate: [authguardGuard], data: { animation: 'PaymentMethodPage' } },
    { path: 'payment-success', component: ClientPaymentsucessComponent, canActivate: [authguardGuard], data: { animation: 'PaymentSuccessPage' } },
    { path: 'userBookings', component: ClientbookingsComponent, canActivate: [authguardGuard], data: { animation: 'UserBookingsPage' } },
    { path: 'userProfile', component: ClientprofilepageComponent, canActivate: [authguardGuard], data: { animation: 'UserProfilePage' } },
    { path: 'chatpage/:id', component: ClientChatpageComponent, canActivate: [authguardGuard], data: { animation: 'ChatPage' } },
    { path: 'allchats', component: ClientAllchatsComponent, canActivate: [authguardGuard], data: { animation: 'AllChatsPage' } },
    { path: 'room/:id', component: ClientVideocallroomComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top' 

  })],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
