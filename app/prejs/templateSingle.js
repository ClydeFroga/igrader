$(document).ready(function(){
	var article 		= $('.singleArticle');
	var articleHeight 	= $('.singleArticle').outerHeight();//высота статьи
	var up 				= $('#upArrow');// поиск элемента\кнопки "вверх"
	var mainHeight		= $('main').outerHeight();
	var headerHeight	= $('.dpHeader').outerHeight()+32;
	var allHeight		= headerHeight + mainHeight;
	var x = (articleHeight>3500)? (articleHeight+400):articleHeight;
	console.log("x = "+x);
	$(window).scroll(function(){
		//Start upArrow
		if(($(window).scrollTop() >= 350)){
			up.fadeIn(750);
			}
			else{
				up.fadeOut(0);
			}
		});
	up.on('click', function(e){
			var kff = allHeight*0.2;
			console.log(kff);
			e.preventDefault();
			$('html, body').animate({scrollTop:0}, kff);
	});
		//End upArrow


	});
	

