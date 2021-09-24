import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Info } from '../constants/interface';
import {Api} from '../constants/api'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  patchInfo(data: Info): Observable<any> {
    return this.http.patch<any>(Api.info, data).pipe(map((res) => {
      if ( res.msg  == 'Successfully updated.') {
        this.infoSource.next(data)
      } else {
       console.log(res.msg)
      }
      return res
    }))
  }

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
  }

}