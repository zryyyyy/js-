$(function () {
    new banner(".box")
})
function banner(select) {
    this.imgNum = $(select).find('img').length;//有多少张图片
    this.imgWidth = $(select).find("img").width();//一张图片宽度
    this.allimgWidth = this.imgNum*this.imgWidth;//所有图片宽度
    this.index = 0;
    this.Num = "";
    this.init();
}
banner.prototype = {
    constructor:banner,
    init(){
        this.selectimg(this.index);
        this.click();//点击按钮改变下标更换图片
        this.autoplay();//自动播放
        this.stop();//鼠标划入停止轮播，划出自动轮播
    },
    selectimg(){
        //console.log($(".box").find("img"))
        $(".box").find("img").css("opacity","0");//设置图片初始透明度
        
        $(".box").animate({ "margin-left":  -this.imgWidth * this.index + "px" }, 600);//改变外框的margin-left值，实现图片轮播
        $(".box").find("img").animate({"opacity":1},600)//图片透明度的改变
    },
    click(){
        $(".but .prev").click(function () {
            this.index -= 1;
            if (this.index < 0) {
                this.index = this.imgNum - 1;
            }
            this.selectimg(this.index);
        }.bind(this));

        //点击next按钮  
        $(".but .next").click(function () {
            this.index += 1;
            if (this.index > 3) {
                this.index = 0;
            }
            this.selectimg(this.index);
        }.bind(this));  
    },
    autoplay(){
        //定时器实现图片自动轮播
        p = setInterval(function () {
            this.index++;
            if (this.index >= this.imgNum) {
                this.index = 0;
            }
            this.selectimg(this.index);
        }.bind(this), 3000);

    },
   
    stop(){
         //鼠标放上去暂停轮播  
         $(".prev").hover(function(){
             clearInterval(p);  //划入清除定时器，停止轮播
         })
        $(".next").hover(function () {
            clearInterval(p);//划入清除定时器，停止轮播
        })
        $('.banner').hover(function(){  
            clearInterval(p);  //划入清除定时器，停止轮播
        },function () {  
            this.selectimg(); 
        }.bind(this)); 
        $(".banner").mouseleave(function(){
            this.autoplay();//划出开启定时器，自动轮播
        }.bind(this))
    }
}