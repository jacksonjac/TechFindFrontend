import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/Interface/Users/user-interface';
import { LoginResponse } from 'src/app/Interface/LoginUser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/Interface/Users/RegisterResponse';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient,private router:Router) { }


  baseUrl = environment.baseUrl

  registerUser(UserData: any): Observable<RegisterResponse> {
    return this.http.post<any>(`${this.baseUrl}user/newUser`, UserData);
  }
  loginUser(userData: UserInterface): Observable<LoginResponse> {
    console.log('passing userlogin data', userData);
    return this.http.post<LoginResponse>(`${this.baseUrl}user/newLogin`, userData, {
      withCredentials: true // Ensure cookies are included in the request
    });
  }
  GoogleregisterUser(UserData: any): Observable<any> {

      
    return this.http.post<any>(`${this.baseUrl}user/GoogleRegister`, UserData);
  }

  VerifId(UserId:any){
    return this.http.get(`${this.baseUrl}user/verify?id=${UserId}`, {});


  }
  getAllTechbyId(DesiId:any):Observable<any>{
  
    return this.http.put(`${this.baseUrl}common/TDesi-id?id=${DesiId}`, {});
  }
  getDesignations():Observable<any>{
    console.log("passing get designation.")
    return this.http.get<any>(`${this.baseUrl}common/AllDesignation`)
  }

  getlocation():Observable<any>{
    return this.http.get<any>("https://ipinfo.io/json?token=a912bb9bdf0c18")
  }
  Techlist():Observable<any>{
    console.log("passing Techlist..")
    return this.http.get<any>(`${this.baseUrl}admin/techlist`)
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('accessToken') 
  }
  getSlots(techId:any){
    return this.http.get(`${this.baseUrl}common/AllSlots?id=${techId}`, {});
    // return this.http.get<any>(`${this.baseUrl}api/common/`)
  }
  getOneTechbyId(techId:any){
    return this.http.get(`${this.baseUrl}common/getOneTechbyId?id=${techId}`,{});
  }
  getOneUserbyId(UserId:any){
    console.log("passing get userbyid fn ",UserId)
    return this.http.get(`${this.baseUrl}common/getOneUserbyId?id=${UserId}`,{});
  }
  UserAddNewSlot(slotData:any){
    return  this.http.post<any>(`${this.baseUrl}user/addNewSlot`,slotData);
  }
  addAddress_slotbook(Data:any){
    console.log("get appoinment data address and slot and booking passing..", Data);
    return  this.http.post<any>(`${this.baseUrl}user/Add_newAdrres`,Data);

  }
  getAppoimentDataById(slotId: any) {
     console.log("passing chats gets api ..")
    return this.http.get(`${this.baseUrl}user/AppoinmentById?Id=${slotId}`, {});
}
getChatsbyIds(userid: any, techid: any) {  
  console.log("passing .. chat fun")

  return this.http.get(`${this.baseUrl}common/getChatsbyId?userid=${userid}&techid=${techid}`);
}

getAllbookingsbyId(userId:any){
  return this.http.get(`${this.baseUrl}user/BookingsById?Id=${userId}`, {});
}

getAllChatlistByid(UserId:any){
         console.log("passing getall chatlist fun",UserId)
  return this.http.get(`${this.baseUrl}common/AllChatlistByid?id=${UserId}`,{});
}
markMessagesAsSeen(userId: string, techId: string, senderType: string): Observable<any> {
  return this.http.get(`${this.baseUrl}common/getChatsSeenUpdate?userid=${userId}&techid=${techId}&senderType=${senderType}`);
}
  logoutUser(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('Userid');
    localStorage.removeItem('email'); 
    localStorage.removeItem('tech-data')
    localStorage.removeItem('slot-data')
    localStorage.removeItem('email')
    localStorage.removeItem('UserName')  
    

    
    this.router.navigate(['']);
  }
  
  uploadImage(fileName:any,techid:any){
    console.log("upload file passing funtion")
    const formData = new FormData();
    formData.append('image', fileName);
    console.log(fileName,"file name passing..")
    return this.http.post<any>(`${this.baseUrl}user/Upload?techId=${techid}`, fileName);
  }

  addComment(commentData: any): Observable<any> {
    console.log("passing add comment fundata",commentData)
    return this.http.post<any>(`${this.baseUrl}user/Add_newComment`, commentData);
  }

  getCommentsByTechid(techid:any){
    console.log("passing get comments funtion wihttech id",techid)
    return this.http.get(`${this.baseUrl}common/AllCommentlistByid?id=${techid}`,{});
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  refreshAccessToken(): Observable<string> {

    console.log('refresh token passing...')
    return this.http.get<string>(`${this.baseUrl}common/RefreshToken`);
  }

  seenEmit(data:any){

  }
 
}
