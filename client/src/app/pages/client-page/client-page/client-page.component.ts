import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Contact {
  constructor(
    public id: number,
    public phone: string,
    public adres: string,
  ) { }
}

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {

  contacts: Contact[] | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // this.getContact()
  }

  // getContact() {
  //   this.httpClient
  //     .get<any>('http://localhost:5000/restoran/contact')
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.contacts = response;
  //     });
  // }
}

