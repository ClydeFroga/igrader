		 var searchIcon = document.querySelector('#srchIcn'),
		 	 formWrapper= document.querySelector('.formWrapper'),
		 	 closeForm  = document.querySelector('.closeForm');
		 	 searchIcon.onclick = function (){
		 	 	formWrapper.style.display="flex";
		 	 	formWrapper.querySelector('.searchform__text').focus();
		 	 };
		 	 closeForm.onclick = function(){
		 	 	formWrapper.style.display="none";
		 	 };
		 



