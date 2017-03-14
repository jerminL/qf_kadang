jQuery(function($) {
	/*左边"全部礼物"的二级菜单*/
	var $navGift = $("#main .nav-gift dl");
	//显示隐藏二级菜单div
	$navGift.on("mouseenter", function() {
			$(this).find(".gift-dd").show();

		}).on("mouseleave", function() {
			$(this).find(".gift-dd").hide();
		})
		//鼠标移入时创建箭头，并高亮
		.on("mouseenter", "dt a", function() {
			var $self = $(this);

			$self.addClass("aa").siblings("a").removeClass("aa");
			$("<i/>").addClass("gift-arrow").appendTo($self);
			$self.parent().next("dd").show()
			$self.parent().next().children("div").css("display", "inline").mouseenter(function() {
				$(this).css("display", "inline");
				$self.addClass("aa").siblings("a").removeClass("aa");
			});
			//鼠标移出时移除箭头，取消高亮
		}).on("mouseleave", "dt a", function() {
			$(this).removeClass("aa");
			$(this).children("i").remove();
			$(this).parent().next().children("div").css("display", "none")
		});

	/*头部导航菜单下划线 弹性运动*/
	var $navList = $("#header .nav");
	var $navHover = $("#header .nav-list li.navHover");
	$navList.on("mouseenter", "li", function() {
			$navHover.stop().animate({
				opacity: 1,
				width: $(this).children("a").width(),
				left: $(this).offset().left - 154
			}, 200);
		})
		.on("mouseleave", "li", function() {
			$navHover.css({
				left: $(this).offset().left - 154
			});
		})
		.on("mouseleave", function() {
			$navHover.stop().animate({
				opacity: 0,
				width: 0,
				left: 0
			});
		});

	/*轮播图*/
	var $pic = $("#main .banner .pic li");
	var $bannerNav = $("#main .banner .nav");
	var $prev = $("#main .prev");
	var $next = $("#main .next");
	//创建导航li
	$pic.each(function(idx, ele) {
		$("<li/>").appendTo($bannerNav);
	});
	//初始化
	$pic.eq(0).css("z-index", 2).siblings("li").css("opacity", 0);
	$bannerNav.children("li").eq(0).addClass("active");

	var i = 0;
	var timer = setInterval(move, 4000);
	//鼠标移入移出
	$("#main .banner").on("mouseenter", function() {
			clearInterval(timer);
			$prev.show().animate({
				left: 10
			});
			$next.show().animate({
				right: 10
			});
		})
		.on("mouseleave", function() {
			timer = setInterval(move, 4000);
			$prev.css("left", 50).hide();
			$next.css("right", 50).hide();
		});
	//点击圆点，跳转到对应页
	$bannerNav.on("click", "li", function() {
		clearInterval(timer);
		i = $(this).index() - 1;
		move();
	});
	//图片轮播
	function move() {
		i++;
		//显示当前页，隐藏其他页
		$pic.eq(i).css("z-index", 2).animate({
			opacity: 1
		}, 600).siblings("li").css("z-index", 1).animate({
			opacity: 0
		}, 600);
		//导航轮播
		$bannerNav.children("li").eq(i).addClass("active").siblings().removeClass("active");
		if (i >= $pic.length - 1) {
			i = -1;
		}
	}
	//前一页
	$prev.click(function() {
		clearInterval(timer);
		if (i <= -($pic.length - 1)) {
			i = -1;
		} else {
			i -= 2;
		}
		move();
		timer = setInterval(move, 2000);
	});
	//后一页
	$next.click(function() {
		clearInterval(timer);
		move();
		timer = setInterval(move, 2000);
	});

	/*楼层导航栏*/
	//每个楼层的高度，130是每个楼层标题的outerHeight
	var f1 = $("#floor1").offset().top - 130;
	var f2 = $("#floor2").offset().top - 130;
	var f3 = $("#floor3").offset().top - 130;
	var f4 = $("#floor4").offset().top - 130;
	var f5 = $("#floor5").offset().top - 130;
	var $floorNav = $("#floor-nav");
	var top = $floorNav.offset().top + 20;
	//导航栏固定屏幕上方
	$(window).scroll(function() {
		var currentTop = ($(window).scrollTop()) + ($(window).innerHeight() / 2);
		if (currentTop >= top + ($(window).innerHeight() / 2) && currentTop <= 6990 + ($(window).innerHeight() / 2)) {
			$floorNav.css({
				position: "fixed",
				top: -20,
				zIndex: 10,
				boxShadow: " 0 1px 1px rgba(0,0,0,0.4)"
			});
		} else {
			$floorNav.css({
				position: "static",
				top: 0,
				zIndex: 10
			})
		}
		//导航栏对应楼层高亮
		if (currentTop >= f1 && currentTop < f2) {
			$floorNav.find("li").eq(0).addClass("current").siblings("li").removeClass("current");
		} else if (currentTop >= f2 && currentTop < f3) {
			$floorNav.find("li").eq(1).addClass("current").siblings("li").removeClass("current");
		} else if (currentTop >= f3 && currentTop < f4) {
			$floorNav.find("li").eq(2).addClass("current").siblings("li").removeClass("current");
		} else if (currentTop >= f4 && currentTop < f5) {
			$floorNav.find("li").eq(3).addClass("current").siblings("li").removeClass("current");
		} else if (currentTop >= f5 && currentTop <= 6990 + ($(window).innerHeight() / 2)) {
			$floorNav.find("li").eq(4).addClass("current").siblings("li").removeClass("current");
		}
	});
	//导航栏点击跳转到对应楼层
	$floorNav.on("click", "li", function() {
		var i = $(this).index();
		switch (i) {
			case 0:
				$("html,body").animate({
					scrollTop: f1
				});
				break;
			case 1:
				$("html,body").animate({
					scrollTop: f2
				});
				break;
			case 2:
				$("html,body").animate({
					scrollTop: f3
				});
				break;
			case 3:
				$("html,body").animate({
					scrollTop: f4
				});
				break;
			case 4:
				$("html,body").animate({
					scrollTop: f5
				});
				break;
		}
		$(this).addClass("current").siblings("li").removeClass("current");
	});

	/*登录、注册页面*/
	$("#login").on("click", function() {
		$("#loginWrap").show();
		$(".loginPop").show();
		$("#loginPage").stop().animate({
			right: 0
		});
	});
	$("#sign").on("click", function() {
		$("#signWrap").show();
		$(".loginPop").show();
		$("#signPage").stop().animate({
			right: 0
		});
	});
	//关闭按钮
	$("#loginPage,#signPage").on("click", ".loginClose", function() {
			$(".loginPop").hide();
			$("#loginPage").stop().animate({
				right: -1150
			}, function() {
				$("#loginWrap").hide();
			});
			$("#signPage").stop().animate({
				right: -1150
			}, function() {
				$("#signWrap").hide();
			});
		})
		//验证码更换
		.on("click", ".code", function() {
			var str = "";
			for (var i = 0; i < 4; i++) {
				var code = parseInt(Math.random() * 10);
				str += code;
			}
			$(this).html(str);
		});
	//用户名
	$(".username").get(1).oninput = function() {
			var str = $(this).val();
			var reg = /^\w{2,}@(\w+)\.(\w{2,})$/;
			if (!(reg.test(str))) {
				$(this).closest("p").next().html("邮箱格式不正确，请重新输入");
			} else {
				$(this).closest("p").next().empty();
			}
		}
		//密码
	$(".pwd").get(0).oninput = function() {
		var str = $(this).val();
		var reg = /^\w{6,20}$/;
		if (!(reg.test(str))) {
			$(this).closest("p").next().html("请输入6-20位密码");
		} else {
			$(this).closest("p").next().empty();
		}
	}
	$(".pwd").get(1).oninput = function() {
			var str = $(this).val();
			var reg = /^\w{6,20}$/;
			if (!(reg.test(str))) {
				$(this).closest("p").next().html("请输入6-20位密码");
			} else {
				$(this).closest("p").next().empty();
			}
		}
		//验证码验证
	$(".codeText").on("change", function() {
		var str = Number($(this).val());
		var code = Number($(".code").html());

		if (str && str != code) {
			$(this).siblings("p").html("验证码错误");
		} else {
			$(this).siblings("p").empty();
		}
	});
	//提交按钮
	$(".submit").on("click", function(e) {
		e.preventDefault();
		var un = $(this).parent().siblings("dl").find(".username").val();
		var pw = $(this).parent().siblings("dl").find(".pwd").val();
		var cd = $(this).parent().siblings("dl").find(".codeText").val();
		//输入框不能为空
		if ((un != "") && (pw != "") && (cd != "")) {
			//没有错误提示
			if ($(".loginFrom dl dd p").text() == "") {
				alert("验证成功！");
				$(this).submit();
				//页面隐藏
				$(".loginPop").hide();
				$("#loginPage").stop().animate({
					right: -1150
				}, function() {
					$("#loginWrap").hide();
				});
				$("#signPage").stop().animate({
					right: -1150
				}, function() {
					$("#signWrap").hide();
				});
			}
		}
		//把用户名添加到页面上
		$("#un").html(un);
		$("#login").css("display", "none");
		$("#sign").css("display", "none");
	});

	//登录，注册的切换
	$(".loginA").on("click", function(e) {
		e.preventDefault();
		$("#loginWrap").show();
		$("#loginPage").css({
			right: 0
		});
		$("#signWrap").hide();
	});
	$(".signA").on("click", function(e) {
		e.preventDefault();
		$("#signWrap").show();
		$("#signPage").css({
			right: 0
		});
		$("#loginWrap").hide();
	});
});