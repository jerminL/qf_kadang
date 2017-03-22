jQuery(function($) {
	$.ajaxSetup({
		/*type:"get",
		async:true,*/
		url: "../data/list.json",
		dataType: "json",

		/*
		  res:
		  {
			"img":"../img/qixi1.jpg",
			"price":"179.00",
			"amount":"13",
			"title":"情侣秀恩爱手链"
		}*/

		success: function(res) {
			//			console.log(res)
			$.each(res, function(idx, item) {
				var $Li = $("<li>").appendTo(".qixi-list");
				var $a = $("<a/>").attr("title", item.title).appendTo($Li);
				$("<img/>").attr({
					src: item.img,
					alt: item.title
				}).appendTo($a);

				var $div = $("<div/>").addClass("hideBox").appendTo($Li);
				var $p1 = $("<p/>").addClass("toLike").appendTo($div);
				$("<a/>").html("<i/>加入收藏").appendTo($p1);
				var $p2 = $("<p/>").addClass("toLook").appendTo($div);
				$("<a/>").html("去看看").appendTo($p2);

				var $div2 = $("<div/>").addClass("mbox").appendTo($Li);
				var $span = $("<span/>").addClass("price").html("<em>￥</em>" + item.price).appendTo($div2);
				$("<div/>").html(item.amount + "人购买").appendTo($span);
				var $p3 = $("<p/>").addClass("text").appendTo($div2);
				$("<a/>").html(item.title).appendTo($p3);
			});
		}
	});

	$.ajax();
	//	滚动条滚动到页面高度的二分之一时,加载新数据
	$(window).on("scroll", function() {
		if ($(window).scrollTop() >= $("body").height() / 2) {
			$.ajax();
			//数据足够多了就不要再请求了
			if ($("body").height() >= 8000) {
				$(window).off("scroll");
			}
		}
	});

	/*移入商品,显示加入收藏*/
	$(".qixi-list").on("mouseenter", "li", function() {
			$(this).find(".hideBox").stop().animate({
				opacity: 0.7
			}, 200);
		})
		.on("mouseleave", "li", function() {
			$(this).find(".hideBox").stop().animate({
				opacity: 0
			}, 200);
		});
});