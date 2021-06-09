'use strict';

let workingHours = ['06:00 am', '07:00 am', '08:00 am' ,'09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function CookieStore(location, minCust, maxCust, avgCookiesPerCustomer, numOfCustomersPerHour,amountOfCookiesPerHour){
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.numOfCustomersPerHour = [];
  this.amountOfCookiesPerHour = [];
  this.totalCookiesPerDay = 0;
}

CookieStore.prototype.randomCustomersNum = function(){
  for(let i = 0; i < workingHours.length; i++){
    let random = getRandomNumber(this.minCust , this.maxCust);
    this.numOfCustomersPerHour.push(random);
  }
}

CookieStore.prototype.calculatAmountOfCookiesPerHour = function(){
  for(let i = 0; i < workingHours.length; i++){
    const amountPerHour = Math.floor(this.numOfCustomersPerHour[i] * this.avgCookiesPerCustomer);
    this.amountOfCookiesPerHour.push(amountPerHour);
    this.totalCookiesPerDay = amountPerHour + this.totalCookiesPerDay;
  }
}

function tableHeader(){
  const container = document.getElementById('table');
  const dataRow = document.createElement('tr');
  container.appendChild(dataRow);
  const dataCol = document.createElement('th');
  dataRow.appendChild(dataCol);
  dataCol.textContent = 'Location';

  for(let i = 0; i < workingHours.length; i++){
    let thEl = document.createElement('th');
    dataRow.appendChild(thEl);
    thEl.textContent = workingHours[i];
  }
  let thEl = document.createElement('th');
  dataRow.appendChild(thEl);
  thEl.textContent = 'Daily Total Cookies';
}
tableHeader();

const totalPerHour = [];
for(let i = 0; i < workingHours.length; i++){
  totalPerHour.push(0);
}

CookieStore.prototype.render = function(){
  const container = document.getElementById('table');
  const dataRow = document.createElement('tr');
  container.appendChild(dataRow);
  let tdEl = document.createElement('td');
  dataRow.appendChild(tdEl);
  tdEl.textContent = this.location;

  for(let i = 0; i < workingHours.length; i++){
    let tdEl = document.createElement('td');
    dataRow.appendChild(tdEl);
    tdEl.textContent = this.amountOfCookiesPerHour[i];
    totalPerHour[i] += this.amountOfCookiesPerHour[i];
  }

  tdEl = document.createElement('td');
  dataRow.appendChild(tdEl);
  tdEl.textContent = this.totalCookiesPerDay;
}

const seattle = new CookieStore('Seattle',23,65,6.3,[],[]);
seattle.randomCustomersNum();
seattle.calculatAmountOfCookiesPerHour();
seattle.render();

const tokyo = new CookieStore('Tokyo', 3, 24, 1.2, [], []);
tokyo.randomCustomersNum();
tokyo.calculatAmountOfCookiesPerHour();
tokyo.render();

const dubai = new CookieStore('Dubai', 11, 38, 3.7, [], []);
dubai.randomCustomersNum();
dubai.calculatAmountOfCookiesPerHour();
dubai.render();
  
const paris = new CookieStore('Paris', 20, 38, 2.3, [], []);
paris.randomCustomersNum();
paris.calculatAmountOfCookiesPerHour();
paris.render();
  
const lima = new CookieStore('Lima', 2, 16, 4.6, [], []);
lima.randomCustomersNum();
lima.calculatAmountOfCookiesPerHour();
lima.render();

function claculateTotal(){
  let dailyTotal = 0;
  for(let i = 0; i < totalPerHour.length; i++){
    dailyTotal += totalPerHour[i];
  }
  return dailyTotal;
}

function tableFooter(){
  const container = document.getElementById('table');
  const dataRow = document.createElement('tr');
  container.appendChild(dataRow);
  dataRow.setAttribute('id', 'trFooter')
  let tdEl = document.createElement('td');
  dataRow.appendChild(tdEl);
  tdEl.textContent = 'Total';

  for(let i = 0; i < totalPerHour.length; i++){
    let tdEl = document.createElement('td');
    dataRow.appendChild(tdEl);
    tdEl.textContent = totalPerHour[i];
  }

  tdEl = document.createElement('td');
  dataRow.appendChild(tdEl);
  tdEl.textContent = claculateTotal();
}
tableFooter();

let salmonForm = document.getElementById('salmonform');

salmonForm.addEventListener('submit', addNewBranch);

function addNewBranch(event){
  event.preventDefault();
  
  let location = event.target.Location.value;
  let minCustomers = Number(event.target.minCustomers.value);
  let maxCustomers = Number(event.target.maxCustomers.value);
  let avgSales = Number(event.target.avgSales.value);

  let addBranch = new CookieStore(location, minCustomers, maxCustomers,avgSales);
  addBranch.randomCustomersNum();
  addBranch.calculatAmountOfCookiesPerHour();
  addBranch.render();

  let container = document.getElementById('table');
  let lastRow  = document.getElementById('trFooter');

  container.removeChild(lastRow);
  tableFooter();
  salmonForm.reset();
}
// trying linux for the first time 

const abdallah = {
  name: 'abdallah',
  age: '23 years old',
}
// hello