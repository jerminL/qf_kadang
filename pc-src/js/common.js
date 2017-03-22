jQuery(function($) {
	//	$("a").click(function(e){
	//		e.preventDefault();
	//	});

	/*顶部导航栏的下拉菜单*/
	var $introMenu = $("#header .intro-menu");
	var $menuSel = $("#header .intro-menu .select");

	$introMenu.on("mouseenter", ">li", function() {
		var i = $(this).index();
		selectShow(i);
	}).on("mouseleave", ">li", function() {
		var i = $(this).index();
		selectHide(i);
	});
	//下拉菜单显示
	function selectShow(i) {
		$menuSel.eq(i).slideDown(100).mouseenter(function() {
			$(this).css("display", "block");
		});
	}
	//下拉菜单隐藏
	function selectHide(i) {
		$menuSel.eq(i).css("display", "none").mouseleave(function() {
			$(this).css("display", "none");
		});
	}

	/*头部导航菜单下划线 弹性运动*/
	var $navList = $("#header .nav");
	var $navHover = $("#header .nav-list li.navHover");
	$navList.on("mouseenter", "li", function() {
			$navHover.stop().animate({
				opacity: 1,
				width: $(this).children("a").width(),
				left: $(this).offset().left - 290
			}, 200);
		})
		.on("mouseleave", "li", function() {
			$navHover.css({
				left: $(this).offset().left - 290
			});
		})
		.on("mouseleave", function() {
			$navHover.stop().animate({
				opacity: 0,
				width: 0,
				left: 0
			});
		});

	/*送礼攻略*/
	$(".gonglue h2").on("mouseenter", function() {
		$(".giftClassify").slideDown().on("mouseenter", function() {
			$(this).show();
		}).on("mouseleave", function() {
			$(this).hide();
		});
	}).on("mouseleave", function() {
		$(".giftClassify").hide();
	});

	/*送礼导航*/
	$("#toshowlink").click(function(e) {
		e.preventDefault();
		$("#ftlinklist").toggle();
	});

	/*回到顶部*/
	$(window).scroll(function() {
		var currentTop = ($(window).scrollTop()) + ($(window).innerHeight() / 2);

		if (currentTop > $(window).innerHeight()) {
			$("#gotop").show();
		} else {
			$("#gotop").hide();
		}
	});
	//鼠标移入时移除箭头，创建span
	$("#gotop").on("mouseenter", function() {
			$(this).find("i").remove();
			$("<span/>").html("回到<br/>顶部").addClass("span-gotop").css({
				display: "block",
				color: "#fff",
				backgroundColor: "#999",
				height: 38
			}).appendTo($(this).find("a"));
		})
		//鼠标移出，移除span，创建箭头
		.on("mouseleave", function() {
			$(this).find("span").remove();
			$("<i/>").addClass("icon gotop").appendTo($(this).find("a"));
		})
		//点击 回到顶部
		.on("click", function() {
			$("html,body").animate({
				scrollTop: 0
			});
		});

	/*微信二维码*/
	$("#weixin").on("mouseenter", function() {
		$("#wxApp").fadeIn();
	}).on("mouseleave", function() {
		$("#wxApp").fadeOut();
	});
});