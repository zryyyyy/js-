define(["jquery"],function(){
    $(function() {
        new shopcar("http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=1&trace=0&limit=10&endId=0&pid=106888&_=1526528205879", ".list");
        })
        function shopcar(url,select){
            this.url = url;
            this.wrap = $(select);
           
            if(!this.wrap)return 0;
            this.init();
        }
        shopcar.prototype = {
            constructor,shopcar,
              init() {
                this.loading()   //加载数据
                .then(function(res) {//保证loading之后render();
                    this.data = res.data.list
                    console.log(this.data)//成功接收数据
                    this.render();//
                }.bind(this))
                  
                },
                loading() {
                    var opt = { 
                        url: this.url, 
                        dataType: "jsonp",//json跨域
                        statusCode: { 404: function() {//失败结果
                          alert("page not found");
                        } }
                     };
                    return $.ajax(opt);
                },
                render(){//加载页面
                    
                    var html = "";
                    $.each(this.data,function(index,item){
                   
                        console.log(item.userId)
                        html += `<li>
                                    <img src="${item.image}" alt="">
                                     <h3>￥${item.price}<span>${item.itemLikes}</span></h3>
                                    <p>${item.title.substring(0, 12)}...</p>
                                    <div data-id="${item.userId}">加入购物车</div>
                                </li>`; 
                              //substring截取过长字符；
                    }.bind(this))
                   
                    this.wrap.html(html) //向页面中插入数据
                }
            }
                        
})