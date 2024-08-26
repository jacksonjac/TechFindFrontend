import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
interface Slot {
  id: string;
  date: string;
  time: string;
  techId: string;
  booked: boolean;
  createdAt: string;
  __v: number;
}
@Injectable({
  providedIn: 'root'
})
export class TechAuthService {

  constructor(private http:HttpClient,private router:Router) { }

  baseUrl = environment.baseUrl

  registerTechnician(UserData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}technician/newTech`, UserData);
  }
  loginTechnician(userData: any): Observable<any> {
    console.log("loginTechnician api passing...")
    return this.http.post<any>(`${this.baseUrl}technician/newTechlogin`, userData);
  }
  GoogleregisterTechinician(UserData: any): Observable<any> {

       console.log("google request passing...")
    return this.http.post<any>(`${this.baseUrl}technician/GoogleRegister`, UserData);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('techtoken') 
  }
  VerifId(TechId:any){
    return this.http.put(`${this.baseUrl}technician/verify?id=${TechId}`, {});
  }
  getAllQuestions():Observable<any>{
    console.log("passing Questin List..")
    return this.http.get<any>(`${this.baseUrl}common/AllQuestions`)
  }
  Techlist():Observable<any>{
    console.log("passing Techlist..")
    return this.http.get<any>(`${this.baseUrl}admin/techlist`)
  }
  getChatsbyIds(userid: any, techid: any) {  
    console.log("passing .. chat fun")
  
    return this.http.get(`${this.baseUrl}common/getChatsbyId?userid=${userid}&techid=${techid}`);
  
  }
  getAllChatlistByid(TechId:any){

    console.log("passing getall chatlist fun",TechId)
return this.http.get(`${this.baseUrl}common/AllChatlistByTechid?id=${TechId}`,{});
}
getOneUserbyId(UserId:any){
  console.log("passing get userbyid fn ",UserId)
  return this.http.get(`${this.baseUrl}common/getOneUserbyId?id=${UserId}`,{});
}
markMessagesAsSeen(userId: string, techId: string, senderType: string): Observable<any> {
  return this.http.get(`${this.baseUrl}common/getChatsSeenUpdate?userid=${userId}&techid=${techId}&senderType=${senderType}`);
}

  logoutUser(): void {
    localStorage.removeItem('techtoken');
      localStorage.removeItem('techid');
      localStorage.removeItem('techemail')
      localStorage.removeItem('TechData')
      localStorage.removeItem('techtoken')       
      localStorage.removeItem('techName')  
  
      
    this.router.navigate(['/technician/login']);
  }
  sendRoomIdToEmail(roomId: string, email: string): Observable<any> {
    const emailData = { roomId, email };
        console.log("sendToommto temil passsing...",roomId,email)
    return this.http.post<any>(`${this.baseUrl}common/sentRoomidToEmail`, emailData);
  }
  checkTechStatusByid(id:any){
    console.log("check pasing id ")
    return this.http.get(`${this.baseUrl}technician/GetTechDatabyId?id=${id}`, {});

  }
  getAllQuestionsbyId(DesiId:any):Observable<any>{
    console.log("passing QuestinbyId technician List..")
    return this.http.put(`${this.baseUrl}common/QDesi-id?id=${DesiId}`, {});
  }

  getDesignations():Observable<any>{
    console.log("passing get designation.")
    return this.http.get<any>(`${this.baseUrl}common/AllDesignation`)
  }

  AddNewSlot(slotdata:any){
    console.log("this is add slotdata passing",slotdata)
    return this.http.post<any>(`${this.baseUrl}technician/newSlot`,slotdata);

  }
  getSlots(techId:any){

    return this.http.get<any>(`${this.baseUrl}common/AllSlots?id=${techId}`, {})
     
    
    // return this.http.get<any>(`${this.baseUrl}api/common/`)
  }
  getNotificationsByTechId(techId: string): Observable<any> {

      console.log("getnotificaqtion passing",techId)
    return this.http.get<any>(`${this.baseUrl}common/AllNoficationbyid?id=${techId}`);
  }


  CanselSlot(slotid:any){
    return this.http.put<any>(`${this.baseUrl}technician/canselSlot?id=${slotid}`, {})

  }
  getOneTechbyId(techId:any){
    return this.http.get(`${this.baseUrl}common/getOneTechbyId?id=${techId}`,{});
  }
  uploadImage(fileName: any, techId: any) {
    const formData = new FormData();
    formData.append('image', fileName);
   
    return this.http.post<any>(`${this.baseUrl}technician/UploadImage?techId=${techId}`, fileName);
  }

  getTechnicianDashboardData(technicianId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}technician/DashboardData?id=${technicianId}`,{})
  }
  deleteNotification(notificationid:any){
    console.log("passing delete notiid",notificationid)
    return this.http.put<any>(`${this.baseUrl}common/RemoveNoti_byid?id=${notificationid}`,{});

  }

  clearNotificationsByTechId(techid:any){
    console.log("passing deleteall techid",techid)
    return this.http.put<any>(`${this.baseUrl}common/AllNoficationbyid?id=${techid}`,{});
    
  }

  scheduleMeeting(meetingData: any): Observable<any> {

    console.log("lksldkfjlksdf passing.")
    return this.http.post<any>(`${this.baseUrl}technician/SchedulenewMeeting`, meetingData);
  }

  getMeetings(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}technician/MeetingList`)
  }

  Userlist():Observable<any>{
    console.log("passing uselist..")
    return this.http.get<any>(`${this.baseUrl}admin/userlist`)
  }
  
}
