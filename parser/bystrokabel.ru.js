var node_html = document.createElement('html');
var map = new Map();

var detailText = '';
var elementProperties = '';
var result = '';
var secCount = 0;
var stop = false;
 
function getUrls(){
var s='';
var arrUrls = [];   
arr = document.querySelectorAll("body > div.site > div.content > div > table > tbody > tr");    
arr.forEach( tr =>{
    //console.log(tr.childNodes[9]);
    if( tr.childNodes[9] ){
        // tr.childNodes[9].innerText;
        if(tr.childNodes[9].innerText != 'Поставщик'){
            const name = tr.childNodes[9].innerText ;
            const url =  tr.childNodes[9].children[0].href;
            //s += name + '\t' + url + '\n';
            s += url + '\n';
            arrUrls.push(url);
            //console.log(url);
        }          
    }
})
// console.log(s);
    return arrUrls;
} 
//-------------------------------------------------------------
function getMap( node ){
    var attTR = node.querySelectorAll('.company-info table tr');
    var h1    = node.querySelector("h1");
    var map = new Map();
    map.set('Наименование', h1.innerText );    
attTR.forEach((tr,i)=>{
    if(tr.children[0] && tr.children[1]){
      var name = tr.children[0].innerText.replace(/\t+/g, "").replace(/\n+/g, "").replace(' ','');
      var value = tr.children[1].innerText.replace(/\t+/g, "").replace(/\n+/g, "");  
        map.set(name,value);
        
    }
  //console.log(tr.innerText)  
})
return map;
}
//--------------------------------------------------------------
async function getHTML(url){
    return new Promise(  (resolve, reject) => {
     var xhr = new XMLHttpRequest();
     xhr.open('GET', url , false);
    // xhr.open("GET", url);
    // xhr.onload = () => resolve(xhr.responseText);
    // xhr.onerror = () => reject(xhr.statusText);
     xhr.send();
    if (xhr.status != 200) {
       alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
     var html = xhr.responseText;   
    //console.log(xhr.responseText);
     node_html.innerHTML = html; 
     map =  getMap( node_html ) ;
        resolve(map);
    //resolve(xhr.responseText.replaceAll('&quot;','"').replaceAll('\\','\\\\')) ;
   } 
    });
}
//-----------------------------------------------------------------
async function getDetailText(url){
        var map = await getHTML(url);
    
       var name = map.get("Наименование") != undefined ? map.get("Наименование") : "";
       var inn = map.get("ИНН") != undefined ? map.get("ИНН").split(' ')[0] : "";
       var mail = map.get("Почта") != undefined ? map.get("Почта") : "";
       var site = map.get("Сайт") != undefined ? map.get("Сайт") : "";
       var fio = map.get("Имя") != undefined ? map.get("Имя") : "";
       var tel = map.get("Телефон") != undefined ? map.get("Телефон").replace('+7','8')  : "";
       var mob = map.get("Моб.телефон") != undefined ? map.get("Моб.телефон").replace('+7','8') : "";
       var adress = map.get("Адрес") != undefined ? map.get("Адрес") : "";
       var rast = map.get("Расстояние") != undefined ? map.get("Расстояние") : "";
       var txt = name + '\t' + inn + '\t' +mail + '\t' + site + '\t' + fio + '\t' + tel + '\t' + mob + '\t' + adress + '\t' + rast + '\n'; 
 
    //console.log(txt);
   
    
    if(txt.indexOf('IP') == -1  )
    result += txt ;
    else return -1
    return map;
}
//------------------------------------------------------------------------------------
function getRandom(min, max) {
  return Math.round( Math.random() * (max - min) + min );
}
function delay(sek) {
  return new Promise(resolve => setTimeout(resolve, ( sek + getRandom(0, 3) ) * 1000));
}
async function delayedLog(item,sek) {
  // мы можем использовать await для Promise
  // который возвращается из delay
   await delay(sek);
   var DetailText =  await  getDetailText(item);
   secCount++;
  console.log(secCount);
 // console.log(DetailText);
    return DetailText;
}
function copyText(data) {  
            navigator.clipboard.writeText (data);
        }
async function processArray(array,sek, _num = 0) {
 stop = false;   
 detailText = '';
 result = '';
 var res = '';
 secCount = _num ;
   var num = 0;  
  for (const item of array) {
      num++;
      if ( num < _num ) continue;  
      if ( item != "" )
     var res = await delayedLog(item, sek);
      if (res == -1) break;
      if(stop) break;
  }
  console.log('Done!');
  console.log(result); 
    copyText(result);
       if(stop){
            alert("ПАРСИНГ ОСТАНОВЛЕН! \nВсего ссылок на странице - "+getUrls().length+" \nCкопировано строк в БУФЕР ОБМЕНА - " + (num -_num ) + "  \n----------\n1. Сначала кликаем здесь ОК. \n2. Если надо, то ВСТАВЛЯЕМ строки в таблицу. . \n3. Затем по новой запускаем последную команду в Console", );
            console.log('processArray(getUrls(),1,' + secCount + ')');
       }
       else if (res == -1) {
        console.log('processArray(getUrls(),1,' + secCount + ')');
           alert("НЕ ВСЕ ССЫЛКИ ОБРАБОТАНЫ! \nВсего ссылок на странице - "+getUrls().length+" \nCкопировано строк в БУФЕР ОБМЕНА - " + (num -_num ) + "  \n----------\n1. Сначала Меняем IP \n2. Потом кликаем здесь ОК. \n3. Потом ВСТАВЛЯЕМ строки в таблицу. .\n4. Парсинг продолжиться с того места где закончился", );
           processArray(getUrls(),1, secCount );
       }else{
            alert("ВСЕ ССЫЛКИ ОБРАБОТАНЫ! \nВсего ссылок на странице - "+getUrls().length+" \nCкопировано строк в БУФЕР ОБМЕНА - " + (num -_num ) + "  \n----------\n1 Сначала кликаем здесь ОК. \n2. Потом ВСТАВЛЯЕМ строки в таблицу. . \n3. Затем кликаем следующую страницу \n4. Затем по новой вставляем код в Console", );
       }
}
//-----------------------------------------------------------------
processArray(getUrls(),1,0)