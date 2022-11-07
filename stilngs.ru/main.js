// комментарии
var el ; 
 window.addEventListener('load', function(){ // после загрузки страницы
	 console.log("load Страница загрузилась"); 

// функции

function ShowMessage(bool){
       document.querySelector("#copy_message").style.opacity = bool-0;
       if(bool)
       setTimeout(function(data){
           ShowMessage(false);
       },700)
}

function copyText(data) {  
            navigator.clipboard.writeText (data);
        }

// Вставка сообщения
var parent = document.body;
var div = document.createElement('div'); 
div.id = 'copy_message';
div.innerText = 'Почта скопирована';
parent.prepend(div);


// вставка почту в шапку
 var pheader = document.querySelector("#header > div.header-wrapper.fix-logo.header-v28 > div > div > div > div.row > div > div > div > div.subbottom > div.right-icons.pull-right.top-block-item.logo_and_menu-row");
 
if( pheader != null){
    // var pheader = document.querySelector("div.widget-container-contacts-wrap.intec-grid-item-auto");
var div = document.createElement('div');
div.className = 'pull-right';
div.id = 'mymailheader';
div.innerHTML = `<div class="email blocks" id="mymailheader0">
					<i class="" aria-hidden="true"></i><img id="imgmail" src="/upload/img/mail.png">					<a>info@stilngs.ru</a>				</div>`;
pheader.append(div);
}


// вставка почту на конечник
// var parent = document.querySelector("div.catalog-element-purchase");
var parent  = document.querySelector('#content  div.js-prices-in-side.product-action .more_text');

if( window.location.href.indexOf('/catalog/') != -1)
  if( parent != null ){
    var div = document.createElement('div')
	// var parent = document.querySelector("div.catalog-element-purchase");
	div.className = 'catalog-element-purchase-order mail';
	div.id = 'mymail';
	div.innerHTML = `<div class="catalog-element-purchase-order-buttons mail" id="mymail1">
	<div class="intec-grid-item-2 intec-grid-item-400-1"> 
					<div class="catalog-element-property"> 
						<div class="catalog-element-property-name" id="mymailtext">Для быстрого получения цены 
	отправьте заявку на почту</div> 
						 
					</div> 
				</div>
						<div class="catalog-element-purchase-order-button intec-ui   intec-ui-size-4" id="mymail2">                        
							<div class="widget-part-item widget-email intec-grid-item-2 intec-grid-item-550-1" id="mymail3">
												
												<img id="mymail4" src="/upload/img/mail.png"><span class="widget-part-item-text" id="mymail6">
													info@kabel-kit.ru                                            </span>
											</div>
						</div>                </div>`;

    // parent.append(div);
    parent.append(div);
};

// вставка почту на мобилку на КОНЕЧКУ
// var parent = document.querySelector("div.catalog-element-purchase");
var parent  = document.querySelector("#content div.product-view.product-view--side-left  div.adaptive-block > div.js-prices-in-item > div");

if( window.location.href.indexOf('/catalog/') != -1)
  if( parent != null ){
    var div = document.createElement('div')
	// var parent = document.querySelector("div.catalog-element-purchase");
	div.className = 'mobmile';
	div.id = 'mobmile';
	div.innerHTML = `<div class="mobmile" id="mobmile2"><div class="mobmile" id="mobmile3"><div class="mobmile" id="mobmile5">Для быстрого получения цены<br>отправьте заявку на почту</div></div></div><div class="mobmile" id="mobmile4"><div class="mobmile" id="mobmile6"><img id="mobmile7" src="/upload/img/mail.png"><span class="mobmile" id="mymail6">info@kabel-kit.ru</span></div></div>`;

    // parent.append(div);
    parent.append(div);
};

// вставка почту на мобилку В ШАПКУ
// var parent = document.querySelector("div.catalog-element-purchase");
var parent  = document.querySelector("#mobileheader > div.mobileheader-v1 > div.right-icons.pull-right");
  if( parent != null ){
    var div = document.createElement('div')
	// var parent = document.querySelector("div.catalog-element-purchase");
	div.className = 'pull-right hmobmile';
	div.id = 'hmobmile0';
	div.innerHTML = `<div class="wrap_icon hmobmile"><img id="hmobmile" src="/upload/img/mail.png"></div>`;

    // parent.append(div);
    parent.append(div);
};




// Добавляем событие клик по почте на десктопе
if( document.querySelector("#mymail2") != null)
	document.querySelector("#mymail2").addEventListener('click',(e)=>{
				console.log('mail cкопирован...');

		 var rect = e.target.getBoundingClientRect();
		  var x0 = rect.left; //x position within the element.
		  var y0 = rect.top;  //y position within the element.

		  var x = e.clientX - rect.left; //x position within the element.
		  var y = e.clientY - rect.top;  //y position within the element.

		  console.log("Left? : " + x + " ; Top? : " + y + ".");
		  console.log("Left? : " + x0 + " ; Top? : " + y0 + ".");
	document.querySelector("#copy_message").style.left = x0 + 100 + 'px';
	document.querySelector("#copy_message").style.top = y0 - 70 + 'px';
			copyText( e.target.innerText.replace(' ',''));
		   ShowMessage(true);

	   el = e;
	})

// Добавляем событие клик по почте на мобилке
if( document.querySelector("#mobmile4") != null)
	document.querySelector("#mobmile4").addEventListener('click',(e)=>{
				console.log('mail cкопирован...');

		 var rect = e.target.getBoundingClientRect();
		  var x0 = rect.left; //x position within the element.
		  var y0 = rect.top;  //y position within the element.

		  var x = e.clientX - rect.left; //x position within the element.
		  var y = e.clientY - rect.top;  //y position within the element.

		  console.log("Left? : " + x + " ; Top? : " + y + ".");
		  console.log("Left? : " + x0 + " ; Top? : " + y0 + ".");
	document.querySelector("#copy_message").style.left = x0 + 20 + 'px';
	document.querySelector("#copy_message").style.top = y0 - 70 + 'px';
			copyText( e.target.innerText.replace(' ','') );
		   ShowMessage(true);

	   el = e;
	})

// Добавляем событие клик по почте на мобилке В ШАПКЕ
if( document.querySelector("#hmobmile0") != null)
	document.querySelector("#hmobmile0").addEventListener('click',(e)=>{
				console.log('mail cкопирован...');

		 var rect = e.target.getBoundingClientRect();
		  var x0 = rect.left; //x position within the element.
		  var y0 = rect.top;  //y position within the element.

		  var x = e.clientX - rect.left; //x position within the element.
		  var y = e.clientY - rect.top;  //y position within the element.

		  console.log("Left? : " + x + " ; Top? : " + y + ".");
		  console.log("Left? : " + x0 + " ; Top? : " + y0 + ".");
	document.querySelector("#copy_message").style.left = x0 - 100 + 'px';
	document.querySelector("#copy_message").style.top = y0 + 70 + 'px';
			copyText( e.target.innerText.replace(' ','') );
		   ShowMessage(true);

	   el = e;
	})






});