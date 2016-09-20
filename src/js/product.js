jQuery(function($){
	
	
	
	/*头部导航菜单下划线 弹性运动【需完善】*/
	var $navList=$("#header .nav");
	$navList.on("mouseenter","li",function(){
		$("#header .nav-list li.navHover").stop().animate({
			opacity:1,
			width:$(this).children("a").width(),
			left:$(this).offset().left-290
		});
	}).on("mouseleave","li",function(){
		$("#header .nav-list li.navHover").css({
			opacity:0,
			width:0,
			left:0
		});
	});
	
	$(".gonglue h2").on("mouseenter",function(){
		$(".giftClassify").slideDown().on("mouseenter",function(){
			$(this).show();
		}).on("mouseleave",function(){
			$(this).hide();
		});
	}).on("mouseleave",function(){
		$(".giftClassify").hide();
	});
	
	/*省市点击事件*/
	$(".mailAddr").on("click","dl",function(){
		var $self=$(this);
		//显示对应dd
		$(this).children("dd").toggle().on("click",">span a",function(){
			$(this).addClass("selected").parent().siblings("span").children("a").removeClass("selected");//高亮
			$self.find("em").html($(this).html());//选择内容显示
		});
		$(this).siblings("dl").children("dd").hide();
	})
	//关闭按钮
	.on("click",".addrPop-close",function(){
		$(this).closest("dd").slideUp();
	});
	
	/*颜色选择*/
	$("#J_MainWrap").on("click","li",function(){
		$(this).children().toggle();
		$(this).toggleClass("selected");
	})
	
	
	
	

	
	
	
	

})
