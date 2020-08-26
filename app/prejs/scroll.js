$(document).ready(function() {
	let x = false,
		rndNm = Math.floor(Math.random()*3),
		sidebarHeight = 0,
		articleHeight = 0,
		fxd = document.querySelectorAll('.foxyAdv'),
		y = 0;

	function mw(){	
		x = true;
		sidebarHeight = $('.sidebar-right').outerHeight(true);
		y = sidebarHeight + 200;
		articleHeight = $('.singleArticle').outerHeight(true);
		if(articleHeight>sidebarHeight){
			$('.sidebar-right').css('height',articleHeight);
		};
	};
	setTimeout(mw, 5000);
	$(window).scroll(function(){
		if(x){
			c = $(document).scrollTop();
			if(c > y){
				fxd[rndNm].style.position="sticky";
				fxd[rndNm].style.top = "80px";
			}else{
				fxd[rndNm].style.position="";
				fxd[rndNm].style.top = "";
			}
		}
	});
});