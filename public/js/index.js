$(function(){
        //轮播
    let timer = null;
    let i = 0;
    let sum = $('#lunbo a').length;


    //开启轮播

    function startLunBo(){

        let bgColor = $('#lunbo>a').eq(i).attr('data-color');

        $('#lunbo>a').eq(i).fadeIn().siblings().fadeOut(function (){
            $('#player').css('backgroundColor',bgColor);
        });


        //sanjiao
        $('#item>a').eq(i).addClass('z-Set text-white').removeClass('text-white-50')
            .siblings().addClass('text-white-50').removeClass('text-white z-Set')
    }
    $('#lunbo>a').on('mouseenter',function (){
        clearInterval(timer);
    });
    $('#lunbo>a').on('mouseout',function (){

        LunBo();
    })

    //自动播放
    function LunBo(){
        clearInterval(timer);
        timer = setInterval(function (){

            i++;
            if (i == sum){
                i = 0;
            }

            startLunBo();
        },3000)
    }
    LunBo();
    //设置颜色
    let InitColor = $('#lunbo>a').eq(0).attr('data-color');

    $('#player').css('backgroundColor',InitColor);
    $('#item>a').eq(0).addClass('z-Set text-white').removeClass('text-white-50');

    //鼠标进入离开

    let htimer = null;
    $('#item>a').on('mouseover',function (){

        $(this).addClass('text-danger');

        htimer = setTimeout(()=>{
            clearInterval(timer);
            i = $(this).index();
            startLunBo();
        },200);
    })
    $('#item>a').on('mouseout',function (){
        $(this).removeClass('text-danger');
        clearTimeout(htimer);
        LunBo();
    })

    //电池
    function Dc(obj){
       this.timer = null;


        //充电
        this.chongDian = (bgcolor) => {

            obj.prev('.dtit').css('backgroundColor',bgcolor)
            obj.css('borderColor',bgcolor);
            for (let i = 0; i < 19; i++){

                $(`<div class="dian" style="background: ${bgcolor}"></div>`).appendTo(obj);

            }
            this.h = 127;
            this.num = 0;
            this.timer = setInterval(()=>{

                if (this.num % 5 == 0){
                    if (this.h > 0){
                        obj.css('paddingTop', this.h + 'px')
                    }else this.h = 127;

                    this.h -= 6;
                }


                this.num++;
                if (this.num>=100){
                    this.num=100;
                }
                //显示颜色
                if (this.num < 20){
                    obj.children('.day').html(`充电量:${this.num}%`).css('color','red');
                }else if (this.num < 50){
                    obj.children('.day').html(`充电量:${this.num}%`).css('color','blue');

                }else if (this.num < 100){
                    obj.children('.day').html(`充电量:${this.num}%`).css('color','black');

                }else {
                    obj.children('.day').html(`充电量完毕！`).css('color','green');
                }

            },100)

        }
        //用户操作
        this.userEvent =  function (bgcolor) {
            obj.on('click', () => {
                clearInterval(this.timer);
                this.chongDian(bgcolor);
            })
                obj.on('mouseenter',function () {

                    $(this).css('borderColor','blue');
                    $(this).children('.dian').css('backgroundColor','blue');
                    $(this).prev('.dtit').css('backgroundColor','blue');
                })
                obj.on('mouseleave', function () {
                    $(this).css('borderColor',bgcolor);
                    $(this).children('.dian').css('backgroundColor',bgcolor);
                    $(this).prev('.dtit').css('backgroundColor',bgcolor);

                })
        }
    }

    let dc1 = new Dc($('#add'));
    dc1.chongDian('#ff00ff');
    dc1.userEvent('#ff00ff');

    let dc2 = new Dc($('#add2'));
    dc2.chongDian('yellow');
    dc2.userEvent('yellow');

    let dc3 = new Dc($('#add3'));
    dc3.chongDian('pink');
    dc3.userEvent('pink');

    let dc4 = new Dc($('#add4'));
    dc4.chongDian('red');
    dc4.userEvent('red');

    let dc5 = new Dc($('#add5'));
    dc5.chongDian('#cccccc');
    dc5.userEvent('#cccccc');

    let dc6 = new Dc($('#add6'));
    dc6.chongDian('black');
    dc6.userEvent('black');



})
