import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-finished-goods',
  templateUrl: './finished-goods.component.html',
  styleUrls: ['./finished-goods.component.css']
})
export class FinishedGoodsComponent implements OnInit {
  private month: string = "nov 2012";
  @Input() private sales_old_forecast_units : number = 0;
  @Input() private sales_new_forecast_units : number = 7531;
  private sales_realised_units: number = 9281;
  private sales_realised_tons: number;
  private sales_forecast_realisation_units: number;
  // @Output() private change_sales_new_forecast_units: EventEmitter = new EventEmitter();
  private sales_new_forecast_tons : number;
  private item_weight: number = 560;

  constructor() {
    console.log(this.month);
  }


  ngOnInit() {
    this.setOldForecast(this.sales_new_forecast_units);
    this.convertSalesNewForecastUnitsToTons(this.sales_new_forecast_units);
    this.convertSalesRealisedUnitsToTons(this.sales_realised_units);
  }

  convertSalesNewForecastUnitsToTons(units){
    this.sales_new_forecast_tons = (this.sales_new_forecast_units * this.item_weight)/1000;
    console.log(this.sales_new_forecast_tons);
  }

  convertSalesRealisedUnitsToTons(units){
    this.sales_realised_tons = (this.sales_realised_units * this.item_weight)/1000;
    console.log(this.sales_realised_tons);
  }

  computeSalesForecastRealisationUnit(){
    this.sales_forecast_realisation_units = (this.sales_realised_units * 100)/this.sales_new_forecast_units;
  }

  setOldForecast(sales_new_forecast_units){
    this.sales_new_forecast_units = sales_new_forecast_units;
    console.log(this.sales_new_forecast_units);
    this.convertSalesNewForecastUnitsToTons(this.sales_new_forecast_units);
    this.computeSalesForecastRealisationUnit();
    // return this.sales_new_forecast_units;
  }
}
