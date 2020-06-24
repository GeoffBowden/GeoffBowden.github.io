

function loadjscssfile(filename, onLoadHandler){
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.onload = onLoadHandler;
	fileref.setAttribute("src", filename);
	if (typeof fileref!="undefined"){
		let hed = document.getElementsByTagName("head")[0]
		hed.appendChild(fileref);
	};
};

