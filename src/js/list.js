jQuery(function($){
	
	$.ajaxSetup({
		/*type:"get",
		async:true,*/
		url:"../data/list.json",
		dataType:"json",
		
		/*
		  res:
		  {
			"img":"../img/qixi1.jpg",
			"price":"179.00",
			"amount":"13",
			"title":"情侣秀恩爱手链"
		}*/
		
		success:function(res){
//			console.log(res)
			$.each(res, function(idx,item) {
				var $Li=$("<li>").appendTo(".qixi-list");
				var $a=$("<a/>").attr("title",item.title).appendTo($Li);
				$("<img/>").attr({
					src:item.img,
					alt:item.title
				}).appendTo($a);
				
				var $span=$("<span/>").addClass("price").html("<em>￥</em>"+item.price).appendTo($Li);
				$("<div/>").html(item.amount+"人购买").appendTo($span);
				
				var $p=$("<p/>").addClass("text").appendTo($Li);
				$("<a/>").html(item.title).appendTo($p);
			});
		}
	});
	
	$.ajax();
	
	$(window).on("scroll",function(){
		if ($(window).scrollTop()>=$("body").height()/1.5){
			$.ajax();
			
			//数据足够多了就不要再请求了
			if($("body").height()>=8000){
				$(window).off("scroll");
			}
		}
	})
	
	
})
