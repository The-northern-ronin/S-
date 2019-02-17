var pathDataMsg = [];
var PathData = [];
var pathColor;
var sn;
function countRectData(bottomSvgRectData){
	var sameLineData = [];//按照行数把数据分组
	for(var i = 0,len = bottomSvgRectData.length;i<len;i+=4){
	   sameLineData.push(bottomSvgRectData.slice(i,i+4));
	}
	//对数组重新排序
	for (var i = 0; i < sameLineData.length; i++) {
		if(i%2 != 0){
			var men1 = sameLineData[i].reverse();
			sameLineData[i] = men1;
		}
	}
	console.log(sameLineData);
	for (var i = 0; i < sameLineData.length; i++) {
		var sameLine = sameLineData[i];
		for (var j = 0; j < sameLine.length; j++) {
			pathDataMsg.push(sameLine[j]);
		}
	}
	console.log(pathDataMsg);
}
//计算线路数据方法
function countPathData(pathDataMsg){
	//计算每个g的左右中心点
	for (var i = 0; i < pathDataMsg.length; i++) {
		if(pathDataMsg[i].hasChild == "0"){
			pathDataMsg[i].leftCenterX = pathDataMsg[i].x;
			pathDataMsg[i].leftCenterY = pathDataMsg[i].y + pathDataMsg[i].h/2;
			pathDataMsg[i].rightCenterX = pathDataMsg[i].x + pathDataMsg[i].w;
			pathDataMsg[i].rightCenterY = pathDataMsg[i].y + pathDataMsg[i].h/2;
		}else{
			var childrenData = pathDataMsg[i].children;
			pathDataMsg[i].leftCenterX = pathDataMsg[i].x;
			pathDataMsg[i].leftCenterY = pathDataMsg[i].centerY;
			pathDataMsg[i].rightCenterX = pathDataMsg[i].x + pathDataMsg[i].w;
			pathDataMsg[i].rightCenterY = pathDataMsg[i].centerY;
			for (var j = 0; j < childrenData.length; j++) {
				childrenData[j].leftCenterX = childrenData[j].x;
				childrenData[j].leftCenterY = childrenData[j].y + childrenData[j].h/2;
				childrenData[j].rightCenterX = childrenData[j].x + childrenData[j].w;
				childrenData[j].rightCenterY = childrenData[j].y + childrenData[j].h/2;
			}
		}
	}
	//计算每个块之间的左右间距
	for (var i = 0; i < pathDataMsg.length; i++) {
		if(pathDataMsg[i].hasChild == "0"){
			pathDataMsg[i].leftMargin = 0;
			pathDataMsg[i].rightMargin = 0;
		}else{
			pathDataMsg[i].leftMargin = pathDataMsg[i].Gh/2;
			pathDataMsg[i].rightMargin = pathDataMsg[i].Gh/2;
		}
	}
	//块与块之间的横向连线
	for (var i = 0; i < pathDataMsg.length - 1; i++) {
		if(pathDataMsg[i].lineNumber == pathDataMsg[i+1].lineNumber){
			var centerX1 = pathDataMsg[i].rightCenterX + pathDataMsg[i].rightMargin;
			var centerY1 = pathDataMsg[i].rightCenterY;
			var centerX2 = pathDataMsg[i+1].leftCenterX - pathDataMsg[i+1].leftMargin;
			var centerY2 = pathDataMsg[i+1].leftCenterY;
			var topX1 = pathDataMsg[i].rightCenterX + pathDataMsg[i].rightMargin;
			var topY1 = pathDataMsg[i].rightCenterY - 10;
			var topX2 = pathDataMsg[i+1].leftCenterX - pathDataMsg[i+1].leftMargin;
			var topY2 = pathDataMsg[i+1].leftCenterY - 10;
			var bottomX1 = pathDataMsg[i].rightCenterX + pathDataMsg[i].rightMargin;
			var bottomY1 = pathDataMsg[i].rightCenterY + 10;
			var bottomX2 = pathDataMsg[i+1].leftCenterX - pathDataMsg[i+1].leftMargin;
			var bottomY2 = pathDataMsg[i+1].leftCenterY + 10;
			if(pathDataMsg[i+1].completeness == "0"){
				pathColor = "#BFBFBF";
			}else{
				pathColor = "#5BC3FF";
			}
			var centerPath = {"d":"M" + centerX1 + " " + centerY1 + "L" + centerX2 + " " + centerY2,"color":pathColor,"style":"1"};
			var topPath = {"d":"M" + topX1 + " " + topY1 + "L" + topX2 + " " + topY2,"color":pathColor,"style":"0"};
			var bottomPath = {"d":"M" + bottomX1 + " " + bottomY1 + "L" + bottomX2 + " " + bottomY2,"color":pathColor,"style":"0"};
			PathData.push(centerPath);
			PathData.push(topPath);
			PathData.push(bottomPath);
		}
	}
	//带有子级的连线，子级的曲线
	for (var i = 0; i < pathDataMsg.length; i++) {
		if(pathDataMsg[i].hasChild == "1"){
			var childrenData = pathDataMsg[i].children;
			for (var j = 0; j < childrenData.length; j++) {
				if(childrenData[j].leftCenterY < pathDataMsg[i].centerY){
					var leftCenterX1 = childrenData[j].x;
					var leftCenterY1 = childrenData[j].y + childrenData[j].h/2;
					var leftCenterX2 = childrenData[j].x - (pathDataMsg[i].centerY - leftCenterY1)-5;
					var leftCenterY2 = pathDataMsg[i].centerY - 10;
					var leftTopX1 = leftCenterX1;
					var leftTopY1 = leftCenterY1 - 10;
					var leftTopX2 = leftCenterX2 - 10;
					var leftTopY2 = leftCenterY2;
					var leftBottomX1 = leftCenterX1;
					var leftBottomY1 = leftCenterY1 + 10;
					var leftBottomX2 = leftCenterX2 + 10;
					var leftBottomY2 = leftCenterY2;
					childrenData[j].leftTopX2 = leftTopX2;
					childrenData[j].leftTopY2 = leftTopY2;
					childrenData[j].leftBottomX2 = leftBottomX2;
					childrenData[j].leftBottomY2 = leftBottomY2;
					
					var rightCenterX1 = childrenData[j].x + childrenData[j].w;
					var rightCenterY1 = childrenData[j].y + childrenData[j].h/2;
					var rightCenterX2 = childrenData[j].x + childrenData[j].w + (pathDataMsg[i].centerY - rightCenterY1) + 5;
					var rightCenterY2 = pathDataMsg[i].centerY - 10;
					var rightTopX1 = rightCenterX1;
					var rightTopY1 = rightCenterY1 - 10;
					var rightTopX2 = rightCenterX2 + 10;
					var rightTopY2 = rightCenterY2;
					var rightBottomX1 = rightCenterX1;
					var rightBottomY1 = rightCenterY1 + 10;
					var rightBottomX2 = rightCenterX2 - 10;
					var rightBottomY2 = rightCenterY2;
					childrenData[j].rightTopX2 = rightTopX2;
					childrenData[j].rightTopY2 = rightTopY2;
					childrenData[j].rightBottomX2 = rightBottomX2;
					childrenData[j].rightBottomY2 = rightBottomY2;
					
					
					var leftTopPath = {"d":"M" + " " + leftTopX1 + "," + leftTopY1 + " " + "A" + " " + Math.abs(leftTopX2 - leftTopX1) + "," + Math.abs(leftTopY2 - leftTopY1) + " " + "0" + " " + "0" + " " + "0" + " " + leftTopX2 + "," + leftTopY2,"color":pathColor,"style":"0"};
					var leftCenterPath = {"d":"M" + " " + leftCenterX1 + "," + leftCenterY1 + " " + "A" + " " + Math.abs(leftCenterX2 - leftCenterX1) + "," + Math.abs(leftCenterY2 - leftCenterY1) + " " + "0" + " " + "0" + " " + "0" + " " + leftCenterX2 + "," + leftCenterY2,"color":pathColor,"style":"1"};
					var leftBottomPath = {"d":"M" + " " + leftBottomX1 + "," + leftBottomY1 + " " + "A" + " " + Math.abs(leftBottomX2 - leftBottomX1) + "," + Math.abs(leftBottomY2 - leftBottomY1) + " " + "0" + " " + "0" + " " + "0" + " " + leftBottomX2 + "," + leftBottomY2,"color":pathColor,"style":"0"};
					
					var rightTopPath = {"d":"M" + " " + rightTopX1 + "," + rightTopY1 + " " + "A" + " " + Math.abs(rightTopX2 - rightTopX1) + "," + Math.abs(rightTopY2 - rightTopY1) + " " + "0" + " " + "0" + " " + "1" + " " + rightTopX2 + "," + rightTopY2,"color":pathColor,"style":"0"};
					var rightCenterPath = {"d":"M" + " " + rightCenterX1 + "," + rightCenterY1 + " " + "A" + " " + Math.abs(rightCenterX2 - rightCenterX1) + "," + Math.abs(rightCenterY2 - rightCenterY1) + " " + "0" + " " + "0" + " " + "1" + " " + rightCenterX2 + "," + rightCenterY2,"color":pathColor,"style":"1"};
					var rightBottomPath = {"d":"M" + " " + rightBottomX1 + "," + rightBottomY1 + " " + "A" + " " + Math.abs(rightBottomX2 - rightBottomX1) + "," + Math.abs(rightBottomY2- rightBottomY1) + " " + "0" + " " + "0" + " " + "1" + " " + rightBottomX2 + "," + rightBottomY2,"color":pathColor,"style":"0"};
					
					PathData.push(leftTopPath);
					PathData.push(leftCenterPath);
					PathData.push(leftBottomPath);
					PathData.push(rightTopPath);
					PathData.push(rightCenterPath);
					PathData.push(rightBottomPath);
				}
				if(childrenData[j].leftCenterY > pathDataMsg[i].centerY){
					var leftCenterX1 = childrenData[j].x;
					var leftCenterY1 = childrenData[j].y + childrenData[j].h/2;
					var leftCenterX2 = childrenData[j].x - (leftCenterY1 - pathDataMsg[i].centerY)-5;
					var leftCenterY2 = pathDataMsg[i].centerY + 10;
					var leftTopX1 = leftCenterX1;
					var leftTopY1 = leftCenterY1 - 10;
					var leftTopX2 = leftCenterX2 + 10;
					var leftTopY2 = leftCenterY2;
					var leftBottomX1 = leftCenterX1;
					var leftBottomY1 = leftCenterY1 + 10;
					var leftBottomX2 = leftCenterX2 - 10;
					var leftBottomY2 = leftCenterY2;
					childrenData[j].leftTopX2 = leftTopX2;
					childrenData[j].leftTopY2 = leftTopY2;
					childrenData[j].leftBottomX2 = leftBottomX2;
					childrenData[j].leftBottomY2 = leftBottomY2;
					
					
					var rightCenterX1 = childrenData[j].x + childrenData[j].w;
					var rightCenterY1 = childrenData[j].y + childrenData[j].h/2;
					var rightCenterX2 = childrenData[j].x + childrenData[j].w + (rightCenterY1 - pathDataMsg[i].centerY) + 5;
					var rightCenterY2 = pathDataMsg[i].centerY + 10;
					var rightTopX1 = rightCenterX1;
					var rightTopY1 = rightCenterY1 - 10;
					var rightTopX2 = rightCenterX2 - 10;
					var rightTopY2 = rightCenterY2;
					var rightBottomX1 = rightCenterX1;
					var rightBottomY1 = rightCenterY1 + 10;
					var rightBottomX2 = rightCenterX2 + 10;
					var rightBottomY2 = rightCenterY2;
					childrenData[j].rightTopX2 = rightTopX2;
					childrenData[j].rightTopY2 = rightTopY2;
					childrenData[j].rightBottomX2 = rightBottomX2;
					childrenData[j].rightBottomY2 = rightBottomY2;
					
					
					var leftTopPath = {"d":"M" + " " + leftTopX1 + "," + leftTopY1 + " " + "A" + " " + Math.abs(leftTopX2 - leftTopX1) + "," + Math.abs(leftTopY2 - leftTopY1) + " " + "0" + " " + "0" + " " + "1" + " " + leftTopX2 + "," + leftTopY2,"color":pathColor,"style":"0"};
					var leftCenterPath = {"d":"M" + " " + leftCenterX1 + "," + leftCenterY1 + " " + "A" + " " + Math.abs(leftCenterX2 - leftCenterX1) + "," + Math.abs(leftCenterY2 - leftCenterY1) + " " + "0" + " " + "0" + " " + "1" + " " + leftCenterX2 + "," + leftCenterY2,"color":pathColor,"style":"1"};
					var leftBottomPath = {"d":"M" + " " + leftBottomX1 + "," + leftBottomY1 + " " + "A" + " " + Math.abs(leftBottomX2 - leftBottomX1) + "," + Math.abs(leftBottomY2 - leftBottomY1) + " " + "0" + " " + "0" + " " + "1" + " " + leftBottomX2 + "," + leftBottomY2,"color":pathColor,"style":"0"};
					
					var rightTopPath = {"d":"M" + " " + rightTopX1 + "," + rightTopY1 + " " + "A" + " " + Math.abs(rightTopX2 - rightTopX1) + "," + Math.abs(rightTopY2 - rightTopY1) + " " + "0" + " " + "0" + " " + "0" + " " + rightTopX2 + "," + rightTopY2,"color":pathColor,"style":"0"};
					var rightCenterPath = {"d":"M" + " " + rightCenterX1 + "," + rightCenterY1 + " " + "A" + " " + Math.abs(rightCenterX2 - rightCenterX1) + "," + Math.abs(rightCenterY2 - rightCenterY1) + " " + "0" + " " + "0" + " " + "0" + " " + rightCenterX2 + "," + rightCenterY2,"color":pathColor,"style":"1"};
					var rightBottomPath = {"d":"M" + " " + rightBottomX1 + "," + rightBottomY1 + " " + "A" + " " + Math.abs(rightBottomX2 - rightBottomX1) + "," + Math.abs(rightBottomY2- rightBottomY1) + " " + "0" + " " + "0" + " " + "0" + " " + rightBottomX2 + "," + rightBottomY2,"color":pathColor,"style":"0"};
					
					PathData.push(leftTopPath);
					PathData.push(leftCenterPath);
					PathData.push(leftBottomPath);
					PathData.push(rightTopPath);
					PathData.push(rightCenterPath);
					PathData.push(rightBottomPath);
				}
				if(childrenData[j].leftCenterY == pathDataMsg[i].centerY){
					var leftTopX1 = childrenData[j].x;
					var leftTopY1 = childrenData[j].y + 5;
					var leftTopX2 = childrenData[j-1].leftBottomX2;
					var leftTopY2 = childrenData[j-1].leftBottomY2;
					var leftCenterX1 = leftTopX1;
					var leftCenterY1 = leftTopY1 + 10;
					var leftCenterX2 = leftTopX2;
					var leftCenterY2 = leftTopY2 + 10;
					var leftBottomX1 = leftCenterX1;
					var leftBottomY1 = leftCenterY1 + 10;
					var leftBottomX2 = leftCenterX2;
					var leftBottomY2 = leftCenterY2 + 10;
					childrenData[j].leftTopX2 = leftTopX2;
					childrenData[j].leftTopY2 = leftTopY2;
					childrenData[j].leftBottomX2 = leftBottomX2;
					childrenData[j].leftBottomY2 = leftBottomY2;
					
					var rightTopX1 = childrenData[j].x + childrenData[j].w;
					var rightTopY1 = childrenData[j].y + 5;
					var rightTopX2 = childrenData[j-1].rightBottomX2;
					var rightTopY2 = childrenData[j-1].rightBottomY2;
					var rightCenterX1 = rightTopX1;
					var rightCenterY1 = rightTopY1 + 10;
					var rightCenterX2 = rightTopX2;
					var rightCenterY2 = rightTopY2 + 10;
					var rightBottomX1 = rightCenterX1;
					var rightBottomY1 = rightCenterY1 + 10;
					var rightBottomX2 = rightCenterX2;
					var rightBottomY2 = rightCenterY2 + 10;
					childrenData[j].rightTopX2 = rightTopX2;
					childrenData[j].rightTopY2 = rightTopY2;
					childrenData[j].rightBottomX2 = rightBottomX2;
					childrenData[j].rightBottomY2 = rightBottomY2;
					
					var leftTopPath = {"d":"M" + leftTopX1 + " " + leftTopY1 + "L" + leftTopX2 + " " + leftTopY2,"color":pathColor,"style":"0"};
					var leftCenterPath = {"d":"M" + leftCenterX1 + " " + leftCenterY1 + "L" + leftCenterX2 + " " + leftCenterY2,"color":pathColor,"style":"1"};
					var leftBottomPath = {"d":"M" + leftBottomX1 + " " + leftBottomY1 + "L" + leftBottomX2 + " " + leftBottomY2,"color":pathColor,"style":"0"};
					
					var rightTopPath = {"d":"M" + rightTopX1 + " " + rightTopY1 + "L" + rightTopX2 + " " + rightTopY2,"color":pathColor,"style":"0"};
					var rightCenterPath = {"d":"M" + rightCenterX1 + " " + rightCenterY1 + "L" + rightCenterX2 + " " + rightCenterY2,"color":pathColor,"style":"1"};
					var rightBottomPath = {"d":"M" + rightBottomX1 + " " + rightBottomY1 + "L" + rightBottomX2 + " " + rightBottomY2,"color":pathColor,"style":"0"};
					
					PathData.push(leftTopPath);
					PathData.push(leftCenterPath);
					PathData.push(leftBottomPath);
					PathData.push(rightTopPath);
					PathData.push(rightCenterPath);
					PathData.push(rightBottomPath);
				}
			}
		}
	}
	//子级曲线之间的横向短连接线
	for (var i = 0; i < pathDataMsg.length; i++) {
		if(pathDataMsg[i].hasChild == "1"){
			var childrenData = pathDataMsg[i].children;
			for (var j = 1; j < childrenData.length; j++) {
				if(childrenData[j].leftCenterY < pathDataMsg[i].centerY){
					var leftTopX1 = childrenData[j-1].leftBottomX2;
					var leftTopY1 = childrenData[j-1].leftBottomY2;
					var leftTopX2 = childrenData[j].leftTopX2;
					var leftTopY2 = childrenData[j].leftTopY2;
					var leftCenterX1 = leftTopX1;
					var leftCenterY1 = leftTopY1 + 10;
					var leftCenterX2 = leftTopX2;
					var leftCenterY2 = leftTopY2 + 10;
					var leftBottomX1 = leftCenterX1;
					var leftBottomY1 = leftCenterY1 + 10;
					var leftBottomX2 = leftCenterX2;
					var leftBottomY2 = leftCenterY2 + 10;
					
					var rightTopX1 = childrenData[j-1].rightBottomX2;
					var rightTopY1 = childrenData[j-1].rightBottomY2;
					var rightTopX2 = childrenData[j].rightTopX2;
					var rightTopY2 = childrenData[j].rightTopY2;
					var rightCenterX1 = rightTopX1;
					var rightCenterY1 = rightTopY1 + 10;
					var rightCenterX2 = rightTopX2;
					var rightCenterY2 = rightTopY2 + 10;
					var rightBottomX1 = rightCenterX1;
					var rightBottomY1 = rightCenterY1 + 10;
					var rightBottomX2 = rightCenterX2;
					var rightBottomY2 = rightCenterY2 + 10;
					
					var leftTopPath = {"d":"M" + leftTopX1 + " " + leftTopY1 + "L" + leftTopX2 + " " + leftTopY2,"color":pathColor,"style":"0"};
					var leftCenterPath = {"d":"M" + leftCenterX1 + " " + leftCenterY1 + "L" + leftCenterX2 + " " + leftCenterY2,"color":pathColor,"style":"1"};
					var leftBottomPath = {"d":"M" + leftBottomX1 + " " + leftBottomY1 + "L" + leftBottomX2 + " " + leftBottomY2,"color":pathColor,"style":"0"};
					
					var rightTopPath = {"d":"M" + rightTopX1 + " " + rightTopY1 + "L" + rightTopX2 + " " + rightTopY2,"color":pathColor,"style":"0"};
					var rightCenterPath = {"d":"M" + rightCenterX1 + " " + rightCenterY1 + "L" + rightCenterX2 + " " + rightCenterY2,"color":pathColor,"style":"1"};
					var rightBottomPath = {"d":"M" + rightBottomX1 + " " + rightBottomY1 + "L" + rightBottomX2 + " " + rightBottomY2,"color":pathColor,"style":"0"};
					
					PathData.push(leftTopPath);
					PathData.push(leftCenterPath);
					PathData.push(leftBottomPath);
					PathData.push(rightTopPath);
					PathData.push(rightCenterPath);
					PathData.push(rightBottomPath);
				}
				if(childrenData[j-1].leftCenterY < pathDataMsg[i].centerY && childrenData[j].leftCenterY > pathDataMsg[i].centerY){
					var leftTopX1 = childrenData[j-1].leftBottomX2;
					var leftTopY1 = childrenData[j-1].leftBottomY2;
					var leftTopX2 = childrenData[j].leftTopX2;
					var leftTopY2 = childrenData[j].leftTopY2;
					
					var rightTopX1 = childrenData[j-1].rightBottomX2;
					var rightTopY1 = childrenData[j-1].rightBottomY2;
					var rightTopX2 = childrenData[j].rightTopX2;
					var rightTopY2 = childrenData[j].rightTopY2;
					
					var leftTopPath = {"d":"M" + leftTopX1 + " " + leftTopY1 + "L" + leftTopX2 + " " + leftTopY2,"color":pathColor,"style":"0"};
					
					var rightTopPath = {"d":"M" + rightTopX1 + " " + rightTopY1 + "L" + rightTopX2 + " " + rightTopY2,"color":pathColor,"style":"0"};
					
					PathData.push(leftTopPath);
					PathData.push(rightTopPath);
				}
			}
		}
	}
	//每一行与每一行行之间连线
	console.log(bottomSvgRectData);
	for (var i = 0; i < bottomSvgRectData.length-1; i++) {
		//偶数行和奇数行之间的连线
		if(bottomSvgRectData[i].lineNumber != bottomSvgRectData[i+1].lineNumber && bottomSvgRectData[i+1].lineNumber%2 != 0){
			//拐点处单元都无子级的情况
			if(bottomSvgRectData[i].hasChild == "0" && bottomSvgRectData[i+1].hasChild == "0"){
				var topX1 = bottomSvgRectData[i].x + bottomSvgRectData[i].w;
				var topY1 = bottomSvgRectData[i].y + 5;
				var topX2 = bottomSvgRectData[i+1].x + bottomSvgRectData[i+1].w;
				var topY2 = bottomSvgRectData[i+1].y + 25;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
			}
			//拐点处偶数行单元有自己奇数行单元无子级情况
			if(bottomSvgRectData[i].hasChild == "1" && bottomSvgRectData[i+1].hasChild == "0"){
				var childrenData = bottomSvgRectData[i].children;
				
				var topX1 = childrenData[0].rightBottomX2 + 20;
				var topY1 = childrenData[0].rightBottomY2;
				var topX2 = bottomSvgRectData[i+1].x + bottomSvgRectData[i+1].w;
				var topY2 = bottomSvgRectData[i+1].y + 25;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
				
			}
			//拐点处奇数行单元有自己偶数行单元无子级情况
			if(bottomSvgRectData[i].hasChild == "0" && bottomSvgRectData[i+1].hasChild == "1"){
				var childrenData = bottomSvgRectData[i+1].children;
				
				var topX1 = bottomSvgRectData[i].x + bottomSvgRectData[i].w;
				var topY1 = bottomSvgRectData[i].y + 5;
				var topX2 = childrenData[0].rightBottomX2 + 20;
				var topY2 = childrenData[0].rightBottomY2 + 20;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
				
			}
			//拐点处偶数行和奇数行都有子级情况
			if(bottomSvgRectData[i].hasChild == "1" && bottomSvgRectData[i+1].hasChild == "1"){
				var childrenData1 = bottomSvgRectData[i].children;
				var childrenData2 = bottomSvgRectData[i+1].children;
				
				var topX1 = childrenData1[0].rightBottomX2 + 20;
				var topY1 = childrenData1[0].rightBottomY2;
				var topX2 = childrenData2[0].rightBottomX2 + 20;
				var topY2 = childrenData2[0].rightBottomY2 + 20;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "1" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
			}
		}
		//奇数行和偶数行之间的连线
		if(bottomSvgRectData[i].lineNumber != bottomSvgRectData[i+1].lineNumber && bottomSvgRectData[i+1].lineNumber%2 == 0){
			if(bottomSvgRectData[i].hasChild == "0" && bottomSvgRectData[i+1].hasChild == "0"){
				var topX1 = bottomSvgRectData[i].x;
				var topY1 = bottomSvgRectData[i].y + 5;
				var topX2 = bottomSvgRectData[i+1].x;
				var topY2 = bottomSvgRectData[i+1].y + 25;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
			}
			if(bottomSvgRectData[i].hasChild == "1" && bottomSvgRectData[i+1].hasChild == "0"){
				var childrenData = bottomSvgRectData[i].children;
				
				var topX1 = childrenData[0].leftBottomX2 - 20;
				var topY1 = childrenData[0].leftBottomY2;
				var topX2 = bottomSvgRectData[i+1].x;
				var topY2 = bottomSvgRectData[i+1].y + 25;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
				
			}
			if(bottomSvgRectData[i].hasChild == "0" && bottomSvgRectData[i+1].hasChild == "1"){
				var childrenData = bottomSvgRectData[i+1].children;
				
				var topX1 = bottomSvgRectData[i].x;
				var topY1 = bottomSvgRectData[i].y + 5;
				var topX2 = childrenData[0].leftBottomX2 - 20;
				var topY2 = childrenData[0].leftBottomY2 + 20;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
				
			}
			if(bottomSvgRectData[i].hasChild == "1" && bottomSvgRectData[i+1].hasChild == "1"){
				var childrenData1 = bottomSvgRectData[i].children;
				var childrenData2 = bottomSvgRectData[i+1].children;
				
				var topX1 = childrenData1[0].leftBottomX2 - 20;
				var topY1 = childrenData1[0].leftBottomY2;
				var topX2 = childrenData2[0].leftBottomX2 - 20;
				var topY2 = childrenData2[0].leftBottomY2 + 20;
				
				var centerX1 = topX1;
				var centerY1 = topY1 + 10;
				var centerX2 = topX2;
				var centerY2 = topY2 - 10;
				
				var bottomX1 = centerX1;
				var bottomY1 = centerY1 + 10;
				var bottomX2 = centerX2;
				var bottomY2 = centerY2 - 10;
				
				var topPath = {"d":"M" + " " + topX1 + "," + topY1 + " " + "A" + " " + Math.abs(topY2 - topY1)/2 + "," + Math.abs(topY2 - topY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + topX2 + "," + topY2,"color":pathColor,"style":"0"};
				var centerPath = {"d":"M" + " " + centerX1 + "," + centerY1 + " " + "A" + " " + Math.abs(centerY2 - centerY1)/2 + "," + Math.abs(centerY2 - centerY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + centerX2 + "," + centerY2,"color":pathColor,"style":"1"};
				var bottomPath = {"d":"M" + " " + bottomX1 + "," + bottomY1 + " " + "A" + " " + Math.abs(bottomY2 - bottomY1)/2 + "," + Math.abs(bottomY2 - bottomY1)/2 + " " + "0" + " " + "0" + " " + "0" + " " + bottomX2 + "," + bottomY2,"color":pathColor,"style":"0"};
				
				PathData.push(topPath);
				PathData.push(centerPath);
				PathData.push(bottomPath);
			}
		}
	}
	
}
