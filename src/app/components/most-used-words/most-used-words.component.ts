import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FusejsService } from 'angular-fusejs';
import Fuse  from 'fuse.js'

@Component({
  selector: 'app-most-used-words',
  templateUrl: './most-used-words.component.html',
  styleUrls: ['./most-used-words.component.scss']
})
export class MostUsedWordsComponent implements OnInit {

  constructor(private http: HttpClient) { }


  ngOnInit(): void {

  }
}
