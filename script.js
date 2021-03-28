"use strict";

function domRemoveCont(event) {
  let id = event.target.parentNode.id;
  let storage = localStorage.getItem('contacts');
  let retrievedObject = storage == null ? [] : JSON.parse(storage);
  let temp = [];

  for (const key in retrievedObject) {
    let stevilka = retrievedObject[key].stevilka;

    if(stevilka == id)
      continue;
    
    temp.push(retrievedObject[key]);
  }
  //console.log(temp);

  localStorage.setItem('contacts', JSON.stringify(temp));

  showAll();
  //console.log(event.target.parentNode.id);
}

function domEditCont(event) {
  let id = event.target.parentNode.id;
  let storage = localStorage.getItem('contacts');
  let retrievedObject = storage == null ? [] : JSON.parse(storage);
  let temp = [];

  for (const key in retrievedObject) {
    let ime = retrievedObject[key].ime;
    let priimek = retrievedObject[key].priimek;
    let stevilka = retrievedObject[key].stevilka;

    if(stevilka == id){
      document.getElementById("ime").value = ime;
      document.getElementById("priimek").value = priimek;
      document.getElementById("stevilka").value = stevilka;
      continue;
    }
    
    temp.push(retrievedObject[key]);
  }
  localStorage.setItem('contacts', JSON.stringify(temp));

  showAll();
  document.getElementById("ime").focus();
}

function dodajOsebo(event) {
  let ime = document.getElementById("ime").value;
  let priimek = document.getElementById("priimek").value;
  let stevilka = document.getElementById("stevilka").value;
  
  if(ime.length < 1 || !checkIme(event)){
    document.getElementById("ime").style.backgroundColor = "red";
    return;
  }
  if(priimek.length < 1 || !checkPriimek(event)){
    document.getElementById("priimek").style.backgroundColor = "red";
    return;
  }
  if(stevilka.length != 9 || !checkStevilka(event)){
    document.getElementById("stevilka").style.backgroundColor = "red";
    return;
  }
  document.getElementById("ime").value = "";
  document.getElementById("priimek").value = "";
  document.getElementById("stevilka").value = "";
  ime = ime.charAt(0).toUpperCase() + ime.slice(1).toLowerCase();
  priimek = priimek.charAt(0).toUpperCase() + priimek.slice(1).toLowerCase();

  let storage = localStorage.getItem('contacts');
  let retrievedObject = storage == null ? [] : JSON.parse(storage);

  var testObject = { 'ime': ime, 'priimek': priimek, 'stevilka': stevilka };
  retrievedObject.push(testObject);
  //console.log(retrievedObject);
  retrievedObject.sort(compare);
  //console.log(retrievedObject);

  localStorage.setItem('contacts', JSON.stringify(retrievedObject));

  showAll();
}

function compare(a, b) {
  if ( a.ime < b.ime ){
    return -1;
  }
  if ( a.ime > b.ime ){
    return 1;
  }
  if ( a.priimek > b.priimek ){
    return -1;
  }
  if ( a.priimek > b.priimek ){
    return 1;
  }
  return 0;
}

function checkIme(event) {
  let ime = document.getElementById("ime").value;
  for (let i = 0; i < ime.length; i++) {
    if(!isLetter(ime.charAt(i))){
      document.getElementById("ime").style.backgroundColor = "red";
      return false;
    }else{
      document.getElementById("ime").style.backgroundColor = "";
    }
  }
  return true;
}

function checkPriimek(event) {
  let priimek = document.getElementById("priimek").value;
  for (let i = 0; i < priimek.length; i++) {
    if(!isLetter(priimek.charAt(i))){
      document.getElementById("priimek").style.backgroundColor = "red";
      return false;
    }else{
      document.getElementById("priimek").style.backgroundColor = "";
    }
  }
  return true;
}

function checkStevilka(event) {
  let stevilka = document.getElementById("stevilka").value;
  for (let i = 0; i < stevilka.length; i++) {
    if(!isNumber(stevilka.charAt(i))){
      document.getElementById("stevilka").style.backgroundColor = "red";
      return false;
    }else{
      document.getElementById("stevilka").style.backgroundColor = "";
    }
  }
  return true;
}

function isLetter(chr) {
  return chr.length === 1 && chr.match(/[a-zA-Z ščžŠČŽ]/i);
}

function isNumber(chr) {
  return chr.length === 1 && chr.match(/[0-9]/i);
}

function domShowCont(event) {
  let len = event.target.children.length;
  if(len > 1)
    domHideCont(event);
  else
    document.getElementById(event.target.id).innerHTML += "<img src=\"trash.png\" onclick=\"domRemoveCont(event)\" style=\"float: right;\"/><img src=\"pen.png\" onclick=\"domEditCont(event)\" style=\"float: right;margin-right: 10px;\"/><br><p style=\"text-align: center;\">"+event.target.id+"</p>";
}

function domHideCont(event) {
  let name = event.srcElement.firstElementChild.nextSibling.data;
  //console.log("hide"+name);
  //console.log(name);
  document.getElementById(event.target.id).innerHTML = "<img src=\"user.png\"/> " + name;
}

function showAll() {
  let storage = localStorage.getItem('contacts');
  let retrievedObject = storage == null ? [] : JSON.parse(storage);
  //console.log(retrievedObject);

  const container = document.getElementById("container");
  container.innerHTML = "";
  let prej = "";
  for (const key in retrievedObject) {
    let ime = retrievedObject[key].ime;
    let priimek = retrievedObject[key].priimek;
    let stevilka = retrievedObject[key].stevilka;

    const div = document.createElement("div");

    if(prej != ime.charAt(0)){
      const divLetter = document.createElement("div");
      prej = ime.charAt(0);
      divLetter.setAttribute("class", "letter");
      divLetter.innerHTML = prej;
      container.append(divLetter);
    }
    div.setAttribute("class", "cont");
    div.setAttribute("id", stevilka);
    div.innerHTML = "<img src=\"user.png\"/> " + ime + " " + priimek;
    div.onclick = domShowCont;

    container.append(div);
  }
}

function isciOsebo(event) {
  const isci = document.getElementById("isci").value;
  if(isci.length < 1){
    showAll();
    return;
  }

  let storage = localStorage.getItem('contacts');
  let retrievedObject = storage == null ? [] : JSON.parse(storage);
  let temp = [];

  for (const key in retrievedObject) {
    let ime = retrievedObject[key].ime;
    let priimek = retrievedObject[key].priimek;
    let stevilka = retrievedObject[key].stevilka;
    let all = ime.toLowerCase() + " " + priimek.toLowerCase() + " " +  stevilka;

    //console.log(all,isci);
    if(all.indexOf(isci) !== -1)
      temp.push(retrievedObject[key]);
    
  }
  //console.log(temp);

  localStorage.setItem('contacts', JSON.stringify(temp));
  showAll();
  
  localStorage.setItem('contacts', JSON.stringify(retrievedObject));
  //console.log(event.target.parentNode.id);
}



document.addEventListener("DOMContentLoaded", () => {
  showAll();

  //document.getElementById("addButton").onclick = addParticipant;
  document.getElementById("ime").oninput = checkIme;
  document.getElementById("priimek").oninput = checkPriimek;
  document.getElementById("stevilka").oninput = checkStevilka;
  document.getElementById("dodaj").onclick = dodajOsebo;
  document.getElementById("isci").oninput = isciOsebo;
  //document.getElementById("Aaron").onclick = domShowCont;
  let el = document.querySelectorAll(".cont");
    for(let i = 0; i < el.length; i++) {
        el[i].onclick = domShowCont;
        //console.log(el[i].children.length);
    }
  
})

// The jQuery way of doing it
//$(document).ready(() => {
  
//});
