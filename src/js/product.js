jQuery(function($){
	$("a").click(function(e){
		e.preventDefault();
	});
	
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
		$(this).siblings().children().hide();
		$(this).toggleClass("selected").siblings("li").removeClass("selected");
	});
	
	/*数量选择*/
	var oldVal=$("#J_Amount").val();
	$(".sel-count .vm-control").on("click",".plus",function(){
		$("#J_Amount").val(++oldVal);
	})
	.on("click",".minus",function(){
		if (oldVal<=1) {
			oldVal=2;
		}
		$("#J_Amount").val(--oldVal);
	});
	
	/*小图点击切换*/
	var $smallPic=$("#smallPic");
	var $bigPic=$("#bigPic");
	
	$("#J_PhotoList").on("click","a",function(){
		//选中高亮
		$(this).addClass("zoomThumbActive").parent().siblings().children("a").removeClass("zoomThumbActive");
		
		var i=$(this).parent().index()+1;
		$smallPic.attr("src","img/product"+i+".jpg");
		$bigPic.children().attr("src","img/bigProduct"+i+".jpg");
	})
	
	/*放大镜*/
	$("#zoomPad").on("mouseenter",function(){
		$bigPic.show();
	})
	.on("mouseleave",function(){
		$bigPic.hide();
	})
	.on("mousemove",function(e){
		// 获取鼠标在div中的位置
		var pos = {
			x:e.pageX - $smallPic.offset().left,
			y:e.pageY - $smallPic.offset().top
		};
		
		$bigPic.css({
			left:-pos.x,
			top:-pos.y
		});
	});
	
	/*Ta可能喜欢,按钮*/
	var $li=$(".J_move_pic").children("li");
	var i=0;
	$(".pageBtn").on("click",".pageNext",function(){
		i++;
		if (i>=$li.length-1) {
			i=0;
		}
		liShow(i);
	})
	.on("click",".pagePre",function(){
		i--;
		if(i==-1){
			i=$li.length-1;
		}
		liShow(i);
	})
	
	function liShow(i){
		$li.eq(i).animate({opacity:1},600).siblings("li").animate({opacity:0},600);
	}


	/*加入购物车*/
	$("#BtnCart").on("click",function(){
		//图片下标
		var i=$smallPic.attr("src").charAt(11);
		addCookie("imgIndex", i, 7);
		
		var title=$(".lay-title").text();
		addCookie("title", title, 7);
		
		var price=$("#J_Price").text();
		addCookie("price", price, 7);
		
		var amount=$("#J_Amount").val();
		addCookie("amount", amount, 7);
		
		var pattern=$("#J_MainWrap")



	})

	
	
	
	

})



