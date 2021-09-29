import { BehaviorSubject, Observable } from 'rxjs';
import {Api} from '../constants/api'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Info } from '../constants/interfaces/dishes';
import { RESPONSE_MSG } from '../constants/responseMsg';
import { ResMsg } from '../constants/interfaces/response';

@Injectable({
  providedIn: 'root',
})
  
export class InfoService {

  private modalSource = new BehaviorSubject<boolean>(false)
  activeModal = this.modalSource.asObservable()

  private infoSource = new BehaviorSubject<Info>({
    id: '',
    wifi: '',
    phone: '',
    address: ''
  })
  info = this.infoSource.asObservable()

  constructor(private http: HttpClient) {}

  fetchInfo(): Observable<Info> {
    return this.http.get<Info>(Api.info).pipe(map((data) => {
      this.infoSource.next(data)
      return data
    }))
  }

  patchInfo(data: Info): Observable<ResMsg> {
    return this.http.patch<ResMsg>(Api.info, data).pipe(map((res) => {
      res.msg  === RESPONSE_MSG.UPDATED && this.infoSource.next(data)
      return res
    }))
  }

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
  }

}