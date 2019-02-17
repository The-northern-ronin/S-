//单元名称   单元ID  完成度  项目数量   能力点数量
var MiddleSvgData = [
					{"textName":"系统认知","id":"rect1","completeness":"100","projectNumber":"15","powerNumber":"20"},
					{"textName":"系统认知","id":"rect2","completeness":"100","projectNumber":"15","powerNumber":"20"},
					{"textName":"系统认知","id":"rect3","completeness":"100","projectNumber":"15","powerNumber":"20"},
					{"textName":"系统认知","id":"rect4","completeness":"45","projectNumber":"15","powerNumber":"20"},
					{"textName":"系统认知","id":"rect5","completeness":"0","projectNumber":"15","powerNumber":"20"}
]
// 单元名称   单元ID   完成度   是否具有子级    子级数据
var bottomSvgRectData = [
					{"name":"Start","id":"start","completeness":"","hasChild":"0","children":""},
					{"name":"飞行常识","id":"rect01","completeness":"100","hasChild":"0","children":""},
					{"name":"飞行常识","id":"rect02","completeness":"100","hasChild":"0","children":""},
					{"name":"飞行常识","id":"rect03","completeness":"0","hasChild":"1",
					"children":[
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect02","completeness":"0","hasChild":"0","children":""},
						]	
					},
					{"name":"飞行常识","id":"rect04","completeness":"0","hasChild":"0",
					"children":[
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect02","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							
						]
					},
					{"name":"飞行常识","id":"rect05","completeness":"0","hasChild":"1",
						"children":[
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect02","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect03","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect03","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect02","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect03","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect03","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect02","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect03","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect03","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							
							
						]
					},
					{"name":"飞行常识","id":"rect06","completeness":"0","hasChild":"1",
						"children":[
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
//							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							
						]
					},
					{"name":"飞行常识","id":"rect07","completeness":"0","hasChild":"1",
					"children":[
						{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
						{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
					]
					},
					{"name":"飞行常识","id":"rect08","completeness":"0","hasChild":"1",
					"children":[
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							{"name":"飞行常识","id":"childRect01","completeness":"0","hasChild":"0","children":""},
							
						]
					},
					{"name":"飞行常识","id":"rect09","completeness":"0","hasChild":"0","children":""},
					{"name":"飞行常识","id":"rect10","completeness":"0","hasChild":"0","children":""},
					{"name":"Finish","id":"finish","completeness":"0","hasChild":"0","children":""},
					
]
//当前时间获取
function p(s) {
    return s < 10 ? '0' + s: s;
}
var myDate = new Date();
//获取当前年
var year=myDate.getFullYear();
//获取当前月
var month=myDate.getMonth()+1;
//获取当前日
var date=myDate.getDate(); 
var now=year+'-'+p(month)+"-"+p(date);
$("#time").html(now);
$(".right_bottom_detail_time").html(now);
//中间svg绘制方法
function drawMiddleSvg(MiddleSvgData){
	var w = $(".left_middle").width(),
    h = 200,
    fullAngle = 2 * Math.PI;
    //计算圆心初始位置
	var dataNumber = MiddleSvgData.length,
	startX = (w/dataNumber)/2,
	startY = ((h*2)/3)/2;
	for (var i = 0; i < MiddleSvgData.length; i++) {
		//计算坐标
		var x = i * (w/dataNumber) + startX;
		var y = startY;
		MiddleSvgData[i].x = x;
		MiddleSvgData[i].y = y;
		//判断颜色
		if(MiddleSvgData[i].completeness == "100"){
			MiddleSvgData[i].color = "#AFFB29";
		}else if(MiddleSvgData[i].completeness == "0"){
			MiddleSvgData[i].color = "#BFBFBF";
		}else{
			MiddleSvgData[i].color = "#70F8EC";
		}
	}
//画圆弧
var svg=d3.select("#left_middle_svg")
		.attr("width",w)
		.attr("height",h);
var outRadius = 50;
var innerRadius = 48;
var outRadiusTwo = 45;
var innerRadiusTwo = 44;
var outRadiusThree = 45;
var innerRadiusThree = 38;
//三个圆环分别画
var arcOne=d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(outRadius)
		.startAngle(0)
		.endAngle(fullAngle);
var arcTwo=d3.svg.arc()
		.innerRadius(innerRadiusTwo)
		.outerRadius(outRadiusTwo)
		.startAngle(0)
		.endAngle(-0.9 * fullAngle);
var arcThree=d3.svg.arc()
		.innerRadius(innerRadiusThree)
		.outerRadius(outRadiusThree)
		.startAngle(0)
		.endAngle(function(d){
			if(d.completeness == "100" || d.completeness == "0"){
				return fullAngle;
			}else{
				return -(parseInt(d.completeness)/100) * fullAngle;
			}
		});

var arcs=svg.selectAll("g.arc") //生成和dataset对应的g ,class是arc,数据集有多少个，类有多少个
		.data(MiddleSvgData)
		.enter()
		.append("g")
		.attr("class","arc")
		.attr("id",function(d){
			return d.id;
		})
		.on("click",middleSvgClick)
		.attr("transform",function(d){
			return "translate("+ d.x +","+ d.y +")";
		}); //圆心位置
	arcs.append("path")
		.attr("fill",function(d){
			return d.color;
		})
		.attr("d",arcOne);
	arcs.append("path")
		.attr("fill",function(d){
			return d.color;
		})
		.attr("d",arcTwo)
	arcs.append("path")
		.attr("fill",function(d){
			return d.color;
		})
		.attr("d",arcThree)
//添加文字
		var dataText = arcs.append('text')
			  .text(function(d){
			  	return d.completeness + "%";
			  })
			  .attr('text-anchor','middle')
			  .attr('dominant-baseline','middle')
			  .attr('font-size','20px')
			  .attr("fill","#fff");
//添加箭头
var defs = svg.append("defs");
var arrowMarker = defs.append("marker")
						.attr("id","arrow")
						.attr("markerUnits","strokeWidth")
					    .attr("markerWidth","12")
                        .attr("markerHeight","12")
                        .attr("viewBox","0 0 12 12") 
                        .attr("refX","6")
                        .attr("refY","6")
                        .attr("orient","auto")
                        .attr("fill","#01D1FF")
var arrowMarkered = defs.append("marker")
						.attr("id","arrowed")
						.attr("markerUnits","strokeWidth")
					    .attr("markerWidth","12")
                        .attr("markerHeight","12")
                        .attr("viewBox","0 0 12 12") 
                        .attr("refX","6")
                        .attr("refY","6")
                        .attr("orient","auto")
                        .attr("fill","#C0BFBD")
var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";				
arrowMarker.append("path").attr("d",arrow_path);
arrowMarkered.append("path").attr("d",arrow_path);
//计算线段
var pathData = [];
	for (var i = 0; i < MiddleSvgData.length; i++) {
		if(i + 1 <  MiddleSvgData.length){
			var intervalLength = (MiddleSvgData[i+1].x - MiddleSvgData[i].x - 90)/4;
			var pathStartX = MiddleSvgData[i].x + intervalLength + 45;
			var pathStartY = MiddleSvgData[i].y;
			var pathEndX = MiddleSvgData[i+1].x - intervalLength - 45;
			var pathEndY = MiddleSvgData[i].y;
			var pathColor;
			var pathStyle;
			if(MiddleSvgData[i+1].completeness == "0"){
				pathColor = "#C0BFBD";
				pathStyle = 1;
			}else{
				pathColor = "#01D1FF";
				pathStyle = 0;
			}
			var path = {"d": "M" + pathStartX + " " + pathStartY + "L" + pathEndX + " " + pathEndY,"color":pathColor,"pathStyle":pathStyle};
			pathData.push(path);
		}
	}
	//画圆环之间的线段
	var pathG = svg.append("g").attr("class","pathG");
	var path = pathG.selectAll(".path").data(pathData)
					.enter()
					.append("path")
					.attr("stroke",function(d){
						return d.color;
					})
					.attr('fill', 'none')
					.attr("class","path")
					.attr("d",function(d){
						return d.d;
					})
					.attr("marker-end",function(d){
						if (d.pathStyle == "1") {
							return "url(#arrowed)";
						} else{
							return "url(#arrow)";
						}
					})
					.attr("stroke-width",function(d){
						return 2;
					})
}
drawMiddleSvg(MiddleSvgData);

//底部svg绘制方法
function drawBottomSvg(bottomSvgRectData){
	var w = $(".left_bottom").width();
	var h = $(window).height() - $("#left_top").height() - 200;
	var svgBox = d3.select("#left_bottom_svg").attr("width",w).attr("height",h);
	Slayout(bottomSvgRectData);
	var rectData = bottomSvgRectData;
	//拖拽事件
	var zoom = d3.behavior.zoom()
	            .scaleExtent([0.3, 2])  
	            .on("zoom", zoomed);
	function zoomed() {
	    d3.select(".outG").attr("transform",   
	        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}	
	//画块
	var svgBox = d3.select("#left_bottom_svg").call(zoom);
	var outG = svgBox.append("g").attr("class","outG");
	var rectG = outG.selectAll(".rectG")
				.data(rectData)
				.enter()
				.append("g")
				.attr("class","rectG")
				.attr("id",function(d){
					return d.id;
				})
				.attr("hasChild",function(d){
					return d.hasChild;
				})
				.each(function(d){
					if(d.hasChild == "0"){
						d3.select(this)
							.append("rect")
							.attr("class","rect")
							.attr("fill","#5BC3FF")
							.attr("x",function(d){
								return d.x;
							})
							.attr("y",function(d){
								return d.y;
							})
							.attr("width",function(d){
								return d.w;
							})
							.attr("height",function(d){
								return d.h;
							})
					}
					if(d.hasChild == "1"){
						var rectChildG = d3.select(this);
						rectChildG.selectAll(".childRect")
								  .data(d.children)
								  .enter()
								  .append("rect")
								  .attr("class","childRect")
								  .attr("fill","#5BC3FF")
								  .attr("x",function(d){
									return d.x;
									})
								  .attr("y",function(d){
									return d.y;
									})
								  .attr("id",function(d){
								  	return d.id;
								  })
								  .attr("width",function(d){
									return d.w;
								  })
								  .attr("height",function(d){
									return d.h;
								  })
					}
				})
				
//画线
countRectData(bottomSvgRectData);
countPathData(pathDataMsg);
	var PathG = outG.append("g").attr("class","PathG");
	var Path = PathG.selectAll(".Path")
					.data(PathData)
					.enter()
					.append("path")
					.attr("class","Path")
					.attr("d",function(d){
						return d.d;
					})
					.attr("stroke",function(d){
						return d.color;
					})
					.attr("fill","none")
					.attr("stroke-dasharray",function(d){
						if(d.style == "0"){
							return "none";
						}else{
							return "5,5";
						}
					})
	
}
drawBottomSvg(bottomSvgRectData);
//中间部分点击事件
function middleSvgClick(){
	alert($(this).attr("id"));
}
