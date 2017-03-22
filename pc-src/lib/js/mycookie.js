/*参数：
	name:  cookie 的名字
	val: cookie 的值
	day: 过期天数*/
function addCookie(name, val, day){
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + day);
	document.cookie =name+"=" + val +";expires=" + oDate + ";path=/";
}


function getCookie(name){
	// 得到cookie：username=老马; password=123456
	var str = document.cookie;

	// 按照 ; 分割
	var arr = str.split("; ");
	// username=老马
	// password=123456

	for (var i = 0; i < arr.length; i++){
		var arr1 = arr[i].split("=");
		
		if (arr1[0] == name){
			return arr1[1];
		}
	}

	// 如果一个都找不到，就返回 "";
	return "";
}

// 删除一个 cookie 将 cookie 的过期时间 设成-1
function removeCookie(name){
	addCookie(name, 1, -1);
}
