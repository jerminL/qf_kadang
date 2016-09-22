jQuery(function($){
	$("a:not('#cart')").click(function(e){
		e.preventDefault();
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
		$smallPic.attr("src","../img/product"+i+".jpg");
		$bigPic.children().attr("src","../img/bigProduct"+i+".jpg");
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
		var str = getCookie("arr");

		// 用于存储所有的商品信息
		var arr = [];
		if (str != ""){
			// 说明之前 cookie 中有商品的内容
			// 取出来转换成数组
			arr = eval(str);
		}
		
		var obj={};
		obj.i=$smallPic.attr("src").charAt(14);//图片下标
		obj.title=$(".lay-title").text();
		obj.price=$("#J_Price").text();
		obj.amount=$("#J_Amount").val();
		obj.pattern=$("#J_MainWrap").find(".selected").text();//款式
		
		arr.push(obj);
		
		addCookie("arr", arr.toSource(), 7);
		
		alert("添加成功");
	});
	
	//评价晒单的导航栏固定屏幕上方
	$(window).on("scroll",function(){
		if ($(window).scrollTop()>=852) {
			$("#J_TabBar").css({
				position:"fixed",
				top:0,
				zIndex:100
			})
		}
		else{
			$("#J_TabBar").css({position:"static"})
		}
	});
	//评价晒单的导航栏点击跳转
	$("#J_TabBar").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var i=$(this).index();
		switch (i){
			case 0:
				$("html,body").animate({scrollTop:852});break;
			case 1:
				$("html,body").animate({scrollTop:9285});break;
			case 2:
				$("html,body").animate({scrollTop:10174});break;
		}
	});
	
})



