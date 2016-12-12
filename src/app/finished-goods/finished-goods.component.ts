import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-finished-goods',
  templateUrl: './finished-goods.component.html',
  styleUrls: ['./finished-goods.component.css']
})
export class FinishedGoodsComponent implements OnInit {
  fgp_months : Array<any> = ["Nov 2012","Dec 2012","Jan 2013","Feb 2013",
                              "Mar 2013","Apr 2013","May 2013","Jun 2013","Jul 2013","Aug 2013","Sep 2013","Oct 2013"];
  @Input() private units = 0;
  @Input() private salesOldForecastUnits: Array<any> = [0,0,7688,7906,8156,8406,8656,8906,9188,9469,9750,10031];
  @Input() private salesNewForecastUnits: Array<any> = [7531,7656,8906,8906,8906,9063,9063,9188,9357,9688,9750,10031];
  private salesNewForecastTons: Array<any> = [];
  private salesRealisedUnits: Array<any> = [9281,9974,11081,8219];
  private salesRealisedToTons: Array<any> = [];
  private salesForecastRealisation: Array<any> = [];
  salesNewForecastTon: number = 0;


  @Input() private productionOldForecastUnits: Array<any> = [0,0,7700,8000,8400,8600,8800,9100,9300,9700,10000,10200];
  @Input() private productionNewForecastUnits: Array<any> = [10000,7600,0,14000,10000,9000,9100,9400,9700,10000,10200];

  fgp: Array<any> = undefined;
  private data: Object;
  private month: string = "nov 2012";
  private item_weight: number = 3.1868;
  private previous_inventory_forecast_units: number = 596;
  private inventory_actual_units = 3065;

  //sales variables
  @Input() private sales_old_forecast_units : number = 0;
  @Input() private sales_new_forecast_units : number = 7531;
  private sales_realised_units: number = 9281;
  private sales_realised_tons: any;
  private sales_forecast_realisation: any;
  private sales_new_forecast_tons : number;

  //production variables
  @Input() private production_old_forecast_units : number = 0;
  @Input() private production_new_forecast_units : number = 10000;
  private production_realised_units: number = 11324;
  private production_realised_tons: number;
  private production_forecast_realisation: any;
  private production_new_forecast_tons : any;

  //Inventory variables
  private inventory_forecast_units : number;
  private inventory_new_forecast_tons : any;
  private inventory_monthly_supply: any;

  constructor(private http: Http) {

  }


  ngOnInit() {
    //array compute methods
    this.computeSalesNewForecastUnitsToTons();
    this.computeRealisedForecastUnitsToTons();
    this.computeSalesForecastRealisation()
    this.setComputedSalesNewForecast(this.salesNewForecastUnits);



    this.setSalesNewForecast(this.sales_new_forecast_units);
    this.convertSalesNewForecastUnitsToTons();
    this.convertSalesRealisedUnitsToTons(this.sales_realised_units);

    this.setProductionNewForecast(this.production_new_forecast_units);
    this.convertProductionNewForecastUnitsToTons();
    this.convertProductionRealisedUnitsToTons(this.production_realised_units);

    this.convertInventoryForecastToTons();
    this.computeMonthlySupply();
  }

  convertProductionNewForecastUnitsToTons(){
    this.production_new_forecast_tons = Math.round((this.production_new_forecast_units * this.item_weight)/1000);
  }

  convertSalesNewForecastUnitsToTons(){
    this.sales_new_forecast_tons = Math.round((this.sales_new_forecast_units * this.item_weight)/1000);
  }

  convertProductionRealisedUnitsToTons(units){
    this.production_realised_tons = Math.round((this.production_realised_units * this.item_weight)/1000);
  }

  convertSalesRealisedUnitsToTons(units){
    this.sales_realised_tons = Math.round((this.sales_realised_units * this.item_weight)/1000);
  }

  computeProductionForecastRealisationPercentage(){
    this.production_forecast_realisation = Math.round((this.production_realised_units * 100)/this.production_new_forecast_units);
  }

  computeSalesForecastRealisationPercentage(){
    this.sales_forecast_realisation = Math.round((this.sales_realised_units * 100)/this.sales_new_forecast_units);
  }

  setSalesNewForecast(sales_new_forecast_units){
    this.sales_new_forecast_units = sales_new_forecast_units;
    this.convertSalesNewForecastUnitsToTons();
    this.computeSalesForecastRealisationPercentage();
    this.computeMonthlySupply();
    this.computeInventoryForecast();
    // return this.sales_new_forecast_units;
  }

  setProductionNewForecast(production_new_forecast_units){
    this.production_new_forecast_units = production_new_forecast_units;
    this.convertProductionNewForecastUnitsToTons();
    this.computeProductionForecastRealisationPercentage();
    this.computeInventoryForecast();
      // return this.sales_new_forecast_units;
  }

  computeInventoryForecast(){
    this.inventory_forecast_units = (this.previous_inventory_forecast_units) + (this.production_new_forecast_units - this.sales_new_forecast_units);
    // this.computeMonthlySupply();
  }

  convertInventoryForecastToTons(){
    this.inventory_new_forecast_tons = ((this.inventory_actual_units * this.item_weight)/1000).toFixed(0);
  }

  computeMonthlySupply(){
    this.inventory_monthly_supply = (this.inventory_forecast_units / this.sales_new_forecast_units).toFixed(2);
  }

  listData(data){
    this.fgp = data.Finished_Goods_Plan;
    console.log("data dey here:" , this.fgp);
    console.log(this.fgp[2].month);
  }

  //compute arrays
  computeSalesNewForecastUnitsToTons(){
    let length = 12;
    for(var i=0; i<length; i++ ){
      this.salesNewForecastTons[i] = Math.round((this.salesNewForecastUnits[i] * this.item_weight)/1000);
      // console.log("computed sales," ,this.salesNewForecastTons[i]);
    }
  }

  computeRealisedForecastUnitsToTons(){
    let length = 12;
    for(var i=0; i<length; i++ ){
      this.salesRealisedToTons[i] = Math.round((this.salesRealisedUnits[i] * this.item_weight)/1000 || 0);
      // console.log("computed sales," ,this.salesRealisedToTons[i]);
    }
  }

  computeSalesForecastRealisation(){
    let length = 12;
    for(var i=0; i<length; i++ ){
      this.salesForecastRealisation[i] = Math.round((this.salesRealisedUnits[i] * 100)/this.salesNewForecastUnits[i] || 0);
      // console.log("computed forecast realisation," ,this.salesForecastRealisation[i]);
    }
  }

  setComputedSalesNewForecast(salesNewForecastUnits){
    for(var i=0; i<length; i++ ){
      this.salesNewForecastUnits[i] =salesNewForecastUnits;
      this.salesNewForecastTon = Math.round((this.salesNewForecastUnits[i] * this.item_weight)/1000);
      console.log("setter sales forecast", this.salesNewForecastTon);
    }
  }

}
