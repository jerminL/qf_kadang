jQuery(function($) {
	var str = getCookie("arr");
	var arr = JSON.parse(str);

	$.each(arr, function(idx, val) {
		//创建tr
		var $tr = $("<tr/>").addClass("lay-goods-item").appendTo($("tbody"));
		//复选框
		var $checkbox = $("<td/>").html($("<input/>").addClass("check").attr({
			type: "checkbox"
		}));

		//图片
		var $imgTd = $("<td/>");
		var $img = $("<img/>").attr({
			src: "../img/smallProduct" + arr[idx].i + ".jpg",
			alt: arr[idx].title
		});
		$("<a/>").html($img).appendTo($imgTd);

		//商品信息
		var $msgTd = $("<td/>").addClass("w190");
		var $dl = $("<dl/>").addClass("mod-goods-info").appendTo($msgTd);
		var $dt = $("<dt/>").addClass("vm-tit").appendTo($dl);
		$("<a/>").html(arr[idx].title).appendTo($dt);
		$("<dd/>").addClass("vm-spec").html("款式：" + arr[idx].pattern).appendTo($dl);

		//单价
		var $priceTd = $("<td/>");
		var $oidPrice = $("<p/>").addClass("vm-original").html(arr[idx].price);
		var $price = $("<p/>").addClass("vm-cutprice").html(arr[idx].price);
		$("<div/>").addClass("mod-price-discount").append($oidPrice, $price).appendTo($priceTd);

		//数量
		var $amountTd = $("<td/>").addClass("mod-quantity");
		var $minusA = $("<a/>").attr("title", "减少").addClass("minus").html("-");
		var $input = $("<input/>").addClass("quantity").attr({
			type: "text",
			value: arr[idx].amount
		});
		var $plusA = $("<a/>").attr("title", "增加").addClass("plus").html("+");
		$("<div/>").addClass("vm-control").append($minusA, $input, $plusA).appendTo($amountTd);

		//总价
		var total = (arr[idx].price * arr[idx].amount).toFixed(2);
		var $totalTd = $("<td/>").addClass("mod-price").html(total);

		//删除
		var $delTd = $("<td/>").addClass("more_actions");
		$("<a/>").addClass("del").html("删除").appendTo($delTd);

		$tr.append($checkbox, $imgTd, $msgTd, $priceTd, $amountTd, $totalTd, $delTd);
	});

	/*点击删除，移除商品*/
	$(".del").on("click", function() {
		var i = $(this).parents("tr").index() - 1;
		$(this).parents("tr").remove();

		//取出原来的cookie
		var oldstr = getCookie("arr");
		var oldarr = JSON.parse(oldstr);

		//把删除的行的cookie去掉
		var newarr = [];
		$.each(oldarr, function(idx, val) {
			if (idx == i) {
				return true;
			}
			newarr.push(val);
		});
		removeCookie("arr");

		addCookie("arr", JSON.stringify(newarr), 7);
	});

	var money = 0;
	//减少数量
	$(".mod-quantity").on("click", ".minus", function() {
			var $siblTd = $(this).parents("td").siblings();
			var oldval = $(this).next().val(); //原来的数量
			var $danjia = $siblTd.find(".vm-cutprice").text(); //单价

			if (oldval <= 1) {
				$(this).off("click");
			} else {
				$(this).next().val(--oldval);
				//单行商品总价
				var total = parseFloat($danjia * oldval);
				$(this).parents("td").siblings(".mod-price").html(total);

				if ($siblTd.find(".check").prop("checked")) {
					//付款总价
					var change = parseFloat($danjia);
					money -= parseFloat(change);
					$("#J_TotalPrice").text("￥" + money);
				}
			}
		})
		//增加数量
		.on("click", ".plus", function() {
			var $siblTd = $(this).parents("td").siblings();
			var oldval = $(this).prev().val(); //原来的数量
			var $danjia = $siblTd.find(".vm-cutprice").text(); //单价

			$(this).prev().val(++oldval);

			//单行商品总价
			var total = parseFloat($danjia * oldval);
			$(this).parents("td").siblings(".mod-price").html(total);

			if ($siblTd.find(".check").prop("checked")) {
				//付款总价
				var change = parseFloat($danjia);
				money += parseFloat(change);
				$("#J_TotalPrice").text("￥" + money);
			}
		});

	/*点击复选框，付款总价变化*/
	var $checkAll = $("#J_CheckAll"); //全选按钮
	var $check = $(".check"); //所有子复选框

	/*全选和反选*/
	//全选
	$checkAll.on("click", function() {
		$check.prop("checked", $(this).prop("checked"));
		//价钱变化
		if (!$checkAll.prop("checked")) {
			money = 0;
			$("#J_TotalPrice").text("￥" + money);
		} else {
			money = 0;
			$(".mod-price").each(function(idx, item) {
				money += parseFloat($(item).text())
			});
			$("#J_TotalPrice").text("￥" + money);
		}
	});
	//反选
	$check.each(function(idx, item) {
		$(this).on("click", function() {
				var flag = true;
				$check.each(function(idx, item) {
					if (!($(this).prop("checked"))) {
						flag = false;
						return false;
					}
				});
				if (flag) {
					$checkAll.prop("checked", true);
				} else {
					$checkAll.prop("checked", false);
				}

				//价钱变化
				//选中则累加
				if ($(this).prop("checked")) {
					var change = $(this).parent().siblings(".mod-price").html();
					money += parseFloat(change);
				}
				//没选中则减去该金额
				else {
					var change = $(this).parent().siblings(".mod-price").html();
					money -= parseFloat(change);
				}
				$("#J_TotalPrice").text("￥" + money);
			})
			.trigger("click"); //手动触发，默认全选
	});

});