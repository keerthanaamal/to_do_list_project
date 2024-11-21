import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatCurrency, formatDate, formatNumber } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `
    <p>{{"Add Task"|translate}}</p>
    <p>{{"View Tasks"|translate}}</p>
    <p>{{"View Completed Tasks"|translate}}</p>
    <p>{{"View Incomplete Tasks"|translate}}</p>
    <p>Amount: {{ formattedAmount }}</p>
    <p>Currency: {{ formattedCurrency }}</p>
    <p>Date: {{ formattedDate }}</p>
    <button (click)="changeLanguage('en')">English</button>
    <button (click)="changeLanguage('ml')">Malayalam</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sampleapp';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  amount = 1234.56;
  currenyCode = 'USD';
  date = new Date();

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  formattedAmount = formatNumber(this.amount, 'fr-SY', '1.2-3');
  formattedDate = formatDate(this.date, 'fullDate', 'fr-SY');
  formattedCurrency = formatCurrency(this.amount,'fr-SY', 'EUR', 'symbol', '1.2-3');

}
