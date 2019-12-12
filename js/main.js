$(function(){
	var w;
	var h;
	var t=0;
	var n=0;
	var pos=0;
	var flag=false;

	/* 탭 메뉴 */
	$(".tab").click(function(e){
		e.preventDefault();

		$("#responsive").toggleClass("active");
		$("#header .dim").toggleClass("active");
		$("body").toggleClass("static");
		$(".wrapper").toggleClass("active");
		$("#header .tab").toggleClass("active");
	});
	$(".dim").click(function(){
		$("#responsive").removeClass("active");
		$("#header .dim").removeClass("active");
		$("body").removeClass("static");
		$(".wrapper").removeClass("active");
		$("#header .tab").removeClass("active");
	});
	$(window).resize(function(){
		w=$(window).width();

		if(w > 720) {
			$("#responsive").removeClass("active");
			$("#header .dim").removeClass("active");
			$("body").removeClass("static");
			$(".wrapper").removeClass("active");
			$("#header .tab").removeClass("active");
		}
	});

	/* 리사이즈 이벤트 */
	$(window).resize(function(){
		h=$(window).height();
		t=-1*n*h;
		$(".wrapper > *").css({top:t});
	});

	/* 스크롤 이벤트 */
	setTimeout(function(){
		$("html").animate({scrollTop:0}, 800, function(){
			flag=true;
			$(window).trigger("scroll");
		});
	}, 10);

	$(window).scroll(function(){
		if(flag == false) return;

		t=$(window).scrollTop();

		// 고정메뉴
		if(n != 0) {
			$("#fixed_nav").addClass("show");
		} else {
			$("#fixed_nav").removeClass("show");
		}

		// 메뉴 스크롤 하이라이트
		if(t < $("#service").offset().top - 200) {
			n=0;
		} else if(t < $("#portfolio").offset().top - 200) {
			n=1;
		} else if(t < $("#why").offset().top - 200) {
			n=2;
		} else if(t < $("#team").offset().top - 200) {
			n=3;
		} else if(t < $("#contact").offset().top - 200) {
			n=4;
		} else {
			n=5;
		}

		// 컨텐츠 효과
		if(t < $("#portfolio").offset().top - 200) {
			$("#service").addClass("active");
		} else if(t < $("#why").offset().top - 200) {
			$("#portfolio").addClass("active");
		} else if(t < $("#team").offset().top - 200) {
			$("#why").addClass("active");
		} else if(t < $("#contact").offset().top - 200) {
			$("#team").addClass("active");
		}

		$("#fixed_nav li a").removeClass("active");
		$("#fixed_nav li").eq(n).find("a").addClass("active");
	});

	/* 클릭 이벤트 */
	$("#GNB a, #fixed_nav a, #responsive a").click(function(e){
		if($("html").is(":animated")) return;

		e.preventDefault();
		n=$(this).parent("li").index();
		pos=$(".wrapper > *").eq(n).offset().top;

		$("html").animate({scrollTop:pos}, 800, function(){
			if(n != 0) {
				$("#fixed_nav").addClass("show");
			} else {
				$("#fixed_nav").removeClass("show");
			}
			$(".wrapper > *").removeClass("active");
			$(".wrapper > *").eq(n).addClass("active");
		});
	});

	$(window).trigger("resize");
	$(window).trigger("scroll");
});
