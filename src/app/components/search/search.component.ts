import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FusejsService } from 'angular-fusejs';
import Fuse from 'fuse.js'
import { TegramDataHandlerService } from '../../services/telegramDataHandler/tegram-data-handler.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  fuse;
  elements;
  results = [];

  listOfIds = ['@Adrenocrime' , '@AugenAufAA', '@davebrych_public', '@unzensiert', '@timmkellner', '@stefanraven', '@GWisnewski', '@SchrangTV', '@KlemensKilicTelegram', '@Q_Faktor_Germany', '@nachrichtenportal', '@kenjebsen', '@ATTILAHILDMANN', '@Xavier_Naidoo', '@QAnons_Channel_Germany'];
  loadedIds = [];
  dataTemp = [];

  constructor(private http: HttpClient, private telegramData: TegramDataHandlerService) { }

  ngOnInit(): void {

  }

  onSearch(searchText) {
    this.results = this.fuse.search(searchText);
  }


  onFreakSelect(freak) {
    this.telegramData.loadDataSets(freak);
    this.telegramData.getFuseWordSearchById(freak)
      .subscribe((data: any[]) => {
        
        data.forEach(d => d.id = freak);
        
        this.dataTemp = this.dataTemp.concat(data);

        this.fuse = new Fuse(this.dataTemp, {
          includeScore: true,
          includeMatches: true,
          minMatchCharLength: 4,
          ignoreLocation: true,
          shouldSort: false,
          findAllMatches: true,
          useExtendedSearch: true,
          keys: ["chunk"]
        });

        //this.listOfIds.splice(this.listOfIds.findIndex(id => id === freak), 1);

      });
  }

}
