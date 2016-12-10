import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-finished-goods',
  templateUrl: './finished-goods.component.html',
  styleUrls: ['./finished-goods.component.css']
})
export class FinishedGoodsComponent implements OnInit {
  private month: string = "nov 2012";
  private item_weight: number = 3.1868;

  //sales variables
  @Input() private sales_old_forecast_units : number = 0;
  @Input() private sales_new_forecast_units : number = 7531;
  private sales_realised_units: number = 9281;
  private sales_realised_tons: number;
  private sales_forecast_realisation: number;
  private sales_new_forecast_tons : number;

  //production variables
  @Input() private production_old_forecast_units : number = 0;
  @Input() private production_new_forecast_units : number = 10000;
  private production_realised_units: number = 11324;
  private production_realised_tons: number;
  private production_forecast_realisation: number;
  private production_new_forecast_tons : number;

  constructor() {
    console.log(this.month);
  }


  ngOnInit() {
    this.setSalesNewForecast(this.sales_new_forecast_units);
    this.convertSalesNewForecastUnitsToTons(this.sales_new_forecast_units);
    this.convertSalesRealisedUnitsToTons(this.sales_realised_units);

    this.setProductionNewForecast(this.production_new_forecast_units)
    this.convertProductionNewForecastUnitsToTons(this.production_new_forecast_units);
    this.convertProductionRealisedUnitsToTons(this.production_realised_units);
  }

  convertProductionNewForecastUnitsToTons(units){
    this.production_new_forecast_tons = (this.production_new_forecast_units * this.item_weight)/1000;
  }

  convertSalesNewForecastUnitsToTons(units){
    this.sales_new_forecast_tons = (this.sales_new_forecast_units * this.item_weight)/1000;
  }

  convertProductionRealisedUnitsToTons(units){
    this.production_realised_tons = (this.production_realised_units * this.item_weight)/1000;
  }

  convertSalesRealisedUnitsToTons(units){
    this.sales_realised_tons = (this.sales_realised_units * this.item_weight)/1000;
  }

  computeProductionForecastRealisationPercentage(){
    this.prodcution_forecast_realisation = (this.production_realised_units * 100)/this.production_new_forecast_units;
  }

  computeSalesForecastRealisationPercentage(){
    this.sales_forecast_realisation = (this.sales_realised_units * 100)/this.sales_new_forecast_units;
  }

  setSalesNewForecast(sales_new_forecast_units){
    this.sales_new_forecast_units = sales_new_forecast_units;
    this.convertSalesNewForecastUnitsToTons(this.sales_new_forecast_units);
    this.computeSalesForecastRealisationPercentage();
    // return this.sales_new_forecast_units;
  }

  setProductionNewForecast(production_new_forecast_units){
      this.production_new_forecast_units = production_new_forecast_units;
      this.convertProductionNewForecastUnitsToTons(this.production_new_forecast_units);
      this.computeProductionForecastRealisationPercentage();
      // return this.sales_new_forecast_units;
    }
  }
}
