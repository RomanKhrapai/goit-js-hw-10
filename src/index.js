import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from "lodash";
import fetchCountries from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const ref = {
input: document.querySelector('#search-box'),
list:document.querySelector('.country-list'),
article:document.querySelector('.country-info'),
}

ref.input.addEventListener('input',debounce(searchCantry,DEBOUNCE_DELAY));

function searchCantry(){
fetchCountries(ref.input.value)
  .then(data => {console.log(data);   
    if(data.length===1){
      watchCantry(...data)
    }else if(data.length>10){
      console.log('10======');
      Notify.info("Too many matches found. Please enter a more specific name.");
      writeList('');
      writeBoxContry('');
    }else{
      watchListCantry(data);
    }
        })
  .catch(error => {
    if(error=="Error: 404"){
      writeList('');
      writeBoxContry('');
      Notify.failure("Oops, there is no country with that name"); 
    }
            console.log(error);
        });

}
 function watchCantry(cantry){
  writeList('');
  const str =`
   <img class="cantry-flag" src="${cantry.flags.svg}" alt="flag ${cantry.name.common}" width="40" height="30">
   <span class="country-name"> ${cantry.name.official} </span>
  <ul class="country-list">
  <li class="country-item">
  Capital:&#32; <span class="country-value"> ${cantry.capital} </span>
  </li>
  <li class="country-item">
  Population:&#32; <span  class="country-value"> ${cantry.population}  </span>
  </li>
  <li class="country-item">
  Languages: &#32;&#32;&#32;&#32; <span  class="country-value"> ${Object.values(cantry.languages).join(", ") }   </span>
  </li>
  </ul>`
 writeBoxContry(str);
 }

function watchListCantry(cantrys){
  writeBoxContry('');
const htmlList = [];
for(const cantry of cantrys){
  htmlList.push(`
  <li>
  <img src="${cantry.flags.svg}" alt="flag ${cantry.name.common}" width="40" height="30">
  <span class="country-value">${cantry.name.official}</span>
  </li>
  `)
}
writeList(htmlList.join('\n')) ;
}

function writeBoxContry(value){
  
  ref.article.innerHTML = value;
}

function writeList(value){
  ref.list.innerHTML = value;
}