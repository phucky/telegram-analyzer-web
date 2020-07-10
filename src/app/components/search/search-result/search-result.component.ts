import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TegramDataHandlerService } from '../../../services/telegramDataHandler/tegram-data-handler.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  resultIds;
  messages;

  @Input()
  set results(val: any) {
    this.resultCopy = JSON.parse(JSON.stringify(val));
    this.resultCopy = this.resultCopy.filter(d => d.score > 0.75);
    this.resultCopy.forEach(result => result.item.timestamp = new Date(result.item.timestamp));
    this.resultCopy = this.resultCopy.sort((a, b) => a.item.timestamp.getTime() - b.item.timestamp.getTime());
    this.dayMappedResults = {};
    this.resultIds = [];

    this.resultCopy.forEach(result => {
      const item = result.item;
      const dateTime = new Date(item.timestamp);
      const timestring = this.formatDate(dateTime);

      if (this.dayMappedResults[timestring]) {
        this.dayMappedResults[timestring].push(item);
      } else {
        this.dayMappedResults[timestring] = [item]
      }

      if (this.resultIds.indexOf(item.id) === -1) {
        this.resultIds.push(item.id);
      }

    });

    let lastDate;
    const barChartsLabels = [];
    Object.keys(this.dayMappedResults).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).forEach(date => {
      const newDate = new Date(date);
      if (!lastDate) {
        lastDate = newDate;
      }

      while (lastDate.getTime() + 86400000 < newDate.getTime()) {
        lastDate.setTime(lastDate.getTime() + 86400000);
        barChartsLabels.push(this.formatDate(lastDate));
      }

      lastDate.setTime(lastDate.getTime() + 86400000);
      barChartsLabels.push(this.formatDate(lastDate));

      lastDate = newDate;

    });

    const groupedByIds = {};
    this.resultIds.forEach(id => {
      groupedByIds[id] = [];
    });

    barChartsLabels.forEach(dayKey => {
      const dayData = this.dayMappedResults[dayKey]
      const groupedByIdsPerDay = {};

      if (dayData) {
        dayData.forEach(item => {
          if (groupedByIdsPerDay[item.id]) {
            groupedByIdsPerDay[item.id].push(item);
          } else {
            groupedByIdsPerDay[item.id] = [item];
          }
        });

      }

      this.resultIds.forEach(id => {
        if (groupedByIdsPerDay[id]) {
          groupedByIds[id].push(groupedByIdsPerDay[id].length);
        } else {
          groupedByIds[id].push(0);
        }
      });
    });

    this.barChartData = Object.keys(groupedByIds).map(id => {
      return {
        data: groupedByIds[id],
        label: id
      };
    });

    this.barChartLabels = barChartsLabels;


    // //iterate over ids for subscribing to messages data
    // Object.keys(this.telegramData.getData()).forEach(id => {
    //   this.telegramData.getData()[id].messages.subscribe(messageData => this.messageData[id] = messageData.data);
    // });
  }

  messageData = {};
  resultCopy;

  dayMappedResults;
  idMessageCount;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];

  constructor(public telegramData: TegramDataHandlerService) { }



  ngOnInit(): void {

  }

  getMessage(result) {
    return result.item.original || 'sorry, but no message found';
  }

  formatDate(m) {
    return m.getUTCFullYear() + "/" +
      ((m.getUTCMonth() + 1)) + "/" +
      (m.getUTCDate());
  }
}
