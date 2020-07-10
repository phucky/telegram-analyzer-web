import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TegramDataHandlerService {
  
  data = {};
  constructor(private http: HttpClient) {
  }
  
  loadDataSets(id) {
    this.data[id] = {
      messages: from(this.http.get("/assets/data/" + id + "/" + id + "-data.json")),
      fuseWordSearch: from(this.http.get("/assets/data/" + id + "/" + id + "-fuseWordSearchData.json")),
      //TODO: Add more stats
    };
  }

  getDataById(id) {
    return this.data[id];
  }

  getData() {
    return this.data;
  }

  getMessagesById(id) {
    return this.getDataById(id).messages;
  }

  getFuseWordSearchById(id) {
    return this.getDataById(id).fuseWordSearch;
  }
}
