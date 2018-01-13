import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  numbers: Array<number> = [];
  inputText: string = "0";
  result: string = "";
  results: Array<string> = [];
  constructor(
    public platform: Platform,public splashScreen: SplashScreen,
    public navCtrl: NavController) {
    for (let i = 1; i < 10; i++) {
      this.numbers.push(i);
    }
  }

  ionViewDidLoad(){
    this.platform.ready().then(()=>{
      this.splashScreen.hide();
    })
  }

  addNumber(item) {
    if(this.newCaculate){
      this.newCaculate = false;
      this.clear();
    }
    if (this.inputText == "0") {
      this.inputText = item;
      return;
    } else {
      this.inputText += item + "";
    }
    if (this.inputText.includes("*") || this.inputText.includes("+") || this.inputText.includes("-") || this.inputText.includes("/")) {
      this.caculate();
    }
  }

  delete() {
    if (this.inputText == "0") return;
    if (this.inputText.length == 1 || this.newCaculate) {
      this.clear();
      return;
    }
    this.inputText = this.inputText.slice(0, this.inputText.length - 1);
    this.caculate();
  }

  addOperator(operator) {
    if (this.inputText.endsWith("*") || this.inputText.endsWith("/") || this.inputText.endsWith("+") || this.inputText.endsWith("-")) {
      this.delete();
      this.addOperator(operator);
    } else {
      this.inputText += operator + "";
    }

  }

  caculate() {
    if (this.inputText.endsWith("*") || this.inputText.endsWith("/") || this.inputText.endsWith("+") || this.inputText.endsWith("-")) {
      return;
    }
    this.result = eval(this.inputText) + "";
  }

  clear() {
    this.inputText = "0";
    this.result = "";
  }

  clearResults() {
    this.results = [];
    this.clear();
  }
  newCaculate : boolean = false;
  caculated() {
    this.caculate();
    this.results.push(this.inputText + "=" + this.result);
    this.inputText = this.result;
    this.result = "";
    this.newCaculate = true;
  }
}
