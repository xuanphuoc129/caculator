import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  numbers: Array<number> = [];
  inputText: string = "0";
  result: string = "";
  results: Array<string> = [];
  constructor(public navCtrl: NavController) {
    for (let i = 1; i < 10; i++) {
      this.numbers.push(i);
    }
  }

  addNumber(item) {
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
    if (this.inputText.length == 1) {
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

  caculated() {
    this.caculate();
    this.results.push(this.inputText + "=" + this.result);
    this.inputText = this.result;
    this.result = "";
  }
}
