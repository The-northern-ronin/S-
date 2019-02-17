
function Slayout(bottomSvgRectData){
	var rectW,rectH;
	//计算rect块的宽高
	for (var i = 0; i < bottomSvgRectData.length; i++) {
		if(bottomSvgRectData[i].id == "start" || bottomSvgRectData[i].id == "finish"){
			rectW = 80;
			rectH = 80;
			bottomSvgRectData[i].w = rectW;
			bottomSvgRectData[i].h = rectH;
		}else{
			if(bottomSvgRectData[i].hasChild == "0"){
				rectW = 120;
				rectH = 30;
				bottomSvgRectData[i].w = rectW;
				bottomSvgRectData[i].h = rectH;
			}
			if(bottomSvgRectData[i].hasChild == "1"){
				rectW = 120;
				rectH = 30;
				bottomSvgRectData[i].w = rectW;
				bottomSvgRectData[i].h = rectH;
				var childrenData = bottomSvgRectData[i].children;
				for (var j = 0; j < childrenData.length; j++) {
					rectW = 120;
					rectH = 30;
					childrenData[j].w = rectW;
					childrenData[j].h = rectH;
				}
			}
		}
	}
	//计算rect所在g的高度
	var rectG_Height;//rect所在g的高度
	var Vspace = 50;
	for (var i = 0; i < bottomSvgRectData.length; i++) {
		if(bottomSvgRectData[i].hasChild == '0'){
			rectG_Height = bottomSvgRectData[i].h;
			bottomSvgRectData[i].Gh = rectG_Height;
			bottomSvgRectData[i].childrenNumber = 0;
		}
		if(bottomSvgRectData[i].hasChild == '1'){
			var childrenData = bottomSvgRectData[i].children;
			var childrenNumber = childrenData.length;
			rectG_Height = childrenNumber*bottomSvgRectData[i].h + (childrenNumber - 1)*Vspace;
			bottomSvgRectData[i].Gh = rectG_Height;
			bottomSvgRectData[i].childrenNumber = childrenNumber;
		}
	}
	//计算rect的行数
	for (var i = 0; i < bottomSvgRectData.length; i++) {
		var lineNumber = Math.floor(i/4);
		bottomSvgRectData[i].lineNumber = lineNumber;
	}
	var sameLineData = [];//按照行数把数据分组
	for(var i = 0,len = bottomSvgRectData.length;i<len;i+=4){
	   sameLineData.push(bottomSvgRectData.slice(i,i+4));
	}
	//计算rect的Y坐标
	var centerX,centerY;
	var rect_Gh_Data = [];
	var max_GH;
	for (var i = 0; i < sameLineData.length; i++) {
		var sameLine = sameLineData[i];
		rect_Gh_Data = [];
		for (var j = 0; j < sameLine.length; j++) {
			var rect_GH = sameLine[j].Gh;
			rect_Gh_Data.push(rect_GH);
		}
		//取每一行中g高度的最大值
		Array.prototype.max = function(){ 
			return Math.max.apply({},this) 
		}
		max_GH = rect_Gh_Data.max();
		sameLineData[i].maxGH = max_GH;
	}
	//按照最大值来计算每一行的centerY坐标值
	for (var i = 0; i < sameLineData.length; i++) {
		if(i == 0){
			centerY = Vspace + sameLineData[i].maxGH/2;
			sameLineData[i].centerY = centerY;
		}else{
			centerY = sameLineData[i-1].centerY + sameLineData[i-1].maxGH/2 + Vspace + sameLineData[i].maxGH/2;
			sameLineData[i].centerY = centerY;
		}
	}
	for (var i = 0; i < sameLineData.length; i++) {
		for (var j = 0; j < bottomSvgRectData.length; j++) {
			if(bottomSvgRectData[j].lineNumber == i){
				bottomSvgRectData[j].centerY = sameLineData[i].centerY;
			}
		}
	}
	//通过centerY值来计算每个单元的y坐标
	for (var i = 0; i < bottomSvgRectData.length; i++) {
		if(bottomSvgRectData[i].hasChild == "0"){
			bottomSvgRectData[i].y = bottomSvgRectData[i].centerY - bottomSvgRectData[i].Gh/2;
		}else{
			var childrenData = bottomSvgRectData[i].children;
			var firstY = bottomSvgRectData[i].centerY - bottomSvgRectData[i].Gh/2;
			for (var j = 0; j < childrenData.length; j++) {
				childrenData[j].y = firstY + j*Vspace + j*childrenData[0].h;
			}
		}
	}
	//计算rect的X坐标
	var Tspace = 50;
	//计算每个单元的左右间距
	for (var i = 0; i < bottomSvgRectData.length; i++) {
		if(bottomSvgRectData[i].hasChild == "0"){
			var leftSpace = 100;
			var rightSpace = 100;
			bottomSvgRectData[i].leftSpace = leftSpace;
			bottomSvgRectData[i].rightSpace = rightSpace;
		}
		if(bottomSvgRectData[i].hasChild == "1"){
			var childrenNumber = bottomSvgRectData[i].children.length;
			if(childrenNumber <= 3){
				var leftSpace = 100;
				var rightSpace = 100;
				bottomSvgRectData[i].leftSpace = leftSpace;
				bottomSvgRectData[i].rightSpace = rightSpace;
			}else{
				var leftSpace = (childrenNumber/2)*60 + ((childrenNumber/2)-1)*(Vspace + 10);
				var rightSpace = leftSpace;
				bottomSvgRectData[i].leftSpace = leftSpace;
				bottomSvgRectData[i].rightSpace = rightSpace;
			}
		}
	}
	//计算每一行的总长度
	var lineLengthData = [];
	for (var i = 0; i < sameLineData.length; i++) {
		sameLineData[i].lineNumber = i;
		if(i%2 != 0){
			var men1 = sameLineData[i].reverse();
			sameLineData[i] = men1;
		}
		var sameLine = sameLineData[i];
		sameLineData[i].rectNumber = sameLine.length;
		for (var j = 0; j < sameLine.length; j++) {
			if(j == 0){
				sameLine[j].firstX = sameLine[j].leftSpace;
			}else{
				sameLine[j].firstX = sameLine[j-1].firstX + sameLine[j-1].w + sameLine[j-1].rightSpace + sameLine[j].leftSpace;
			}
			var lineLength = sameLine[sameLine.length-1].firstX +  sameLine[sameLine.length-1].w + sameLine[sameLine.length-1].rightSpace - sameLine[0].firstX - sameLine[0].leftSpace;
			sameLineData[i].lineLength = lineLength;
		}
		lineLengthData.push(sameLineData[i].lineLength);
	}
	//获取这几行中的最大长度
	var maxLineLength;
	Array.prototype.max = function(){ 
			return Math.max.apply({},this) 
		}
		maxLineLength = lineLengthData.max();
	//通过最大长度计算出每一行块与块之间应该增加的距离
	for (var i = 0; i < sameLineData.length; i++) {
		sameLineData[i].Tspace = (maxLineLength - sameLineData[i].lineLength)/(sameLineData[i].rectNumber-1);
	}
	for (var i = 0; i < sameLineData.length; i++) {
		var sameLine = sameLineData[i];
		for (var j = 0; j < sameLine.length; j++) {
			if(j == 0){
				sameLine[j].x = sameLine[j].firstX;
			}else{
				sameLine[j].x = sameLine[j-1].x + sameLine[j-1].w + sameLineData[i].Tspace +  sameLine[j-1].rightSpace + sameLine[j].leftSpace;
			}
		}
	}
	
	//计算出每一个单元的x坐标
	for (var i = 0; i < sameLineData.length; i++) {
		var sameLine = sameLineData[i];
		for (var j = 0; j < sameLine.length; j++) {
			for (var k = 0; k < bottomSvgRectData.length; k++) {
				if(bottomSvgRectData[k].id == sameLine[j].id){
					bottomSvgRectData[k].x = sameLine[j].x;
				}
			}
		}
	}
	//写入到bottomSvgRectData数组中
	for (var i = 0; i < bottomSvgRectData.length; i++) {
		if(bottomSvgRectData[i].hasChild == "1"){
			var childrenData = bottomSvgRectData[i].children;
			for (var j = 0; j < childrenData.length; j++) {
				childrenData[j].x = bottomSvgRectData[i].x;
			}
		}
	}
}