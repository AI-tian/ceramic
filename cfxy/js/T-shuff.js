function Slideshow(obj) {

    var _this = this;

    //初始数据/默认值
    this.index = 0;
    this.el = ".slideshow-container-main";
    this.loop = true;
    this.pageSwitch = true;
    this.timer;
    this.time = 1000;
    this.timeSwitch = true;
    this.nextClick = function(){};
    this.prevClick = function(){};

    //自定义值替换值
    if (obj) {
        this.index = obj.index;
        //判断是否传入类名
        if (obj.el) {
            this.el = obj.el;
        }
        //判断是否传入循环值
        if (obj.loop) {
            this.loop = this.loop;
        }
        //判断是否传入允许Tab点击值
        if (obj.pageSwitch) {
            this.pageSwitch = this.pageSwitch;
        } else {
            this.pageSwitch = obj.pageSwitch;
        }
        if (obj.time) {
            if (obj.time == 0) {
                timeSwitch = false;
            } else {
                timeSwitch = true;
                this.time = obj.time;
            }
        }

        obj.nextClick ? this.nextClick = obj.nextClick : "";
        obj.prevClick ? this.prevClick = obj.prevClick : "";
    }


    //获取元素
    this.slideshowBox = document.querySelector(this.el);

    this.slideshowitem = this.slideshowBox.querySelectorAll(".slideshow-item");
    this.slideshowBtn = this.slideshowBox.querySelectorAll(".slideshow-btn");
    this.pageItem = this.slideshowBox.querySelectorAll(".slideshow-page-item");


    /******控制******/
    this.control = function () {
        //点击左边按钮
        this.slideshowBtn[0].addEventListener("click", () => {
            this.goLeft()
        });
        //点击右边按钮
        this.slideshowBtn[1].addEventListener("click", () => {
            this.goright()
        });

        //tab事件
        for (let i = 0; i < this.pageItem.length; i++) {
            this.pageItem[i].addEventListener("click", () => {
                this.pageChange(i);
            })
        }

        //清楚定时器事件
        for (let i = 0; i < this.slideshowBtn.length; i++) {
            this.slideshowBtn[i].addEventListener("mouseenter", () => {
                this.clearTime()
            })
            this.slideshowBtn[i].addEventListener("mouseleave", () => {
                this.slideshowInterval()
            })
        }

        for (let i = 0; i < this.pageItem.length; i++) {
            this.pageItem[i].addEventListener("mouseenter", () => {
                this.clearTime()
            })
            this.pageItem[i].addEventListener("mouseleave", () => {
                this.slideshowInterval()
            })
        }
    }

    /****数据处理****/
    this.dataChange = function () {
        this.goLeft = function () {
            this.index--;
            if (this.index < 0) {
                //判断是否循环
                if (this.loop) {
                    this.index = this.slideshowitem.length - 1;
                } else {
                    this.index = 0;
                }
            }
            this.changeSider(this.index);
            this.pageSiderChange(this.index);

            this.prevClick();
            
        }
        this.goright = function () {
            this.index++;
            //判断是否循环
            if (this.index > this.slideshowitem.length - 1) {
                if (this.loop) {
                    this.index = 0;
                } else {
                    this.index = this.slideshowitem.length - 1;
                }
            }
            this.changeSider(this.index);
            this.pageSiderChange(this.index);

            this.nextClick();


        }
        this.pageChange = function (i) {
            this.index = i;
            //判断tab是否允许点击
            if (this.pageSwitch) {
                this.changeSider(this.index)
                this.pageSiderChange(this.index)
            }
        }

        //定时器事件
        this.slideshowInterval = function () {
            if (timeSwitch) {
                this.timer = setInterval(() => {
                    this.goright()
                }, this.time)
            }
        }
        //清楚定时器事件
        this.clearSiderInterval = function () {
            this.clearTime = function () {
                clearInterval(this.timer)
            }
        }
    }
    /****视图处理****/
    this.viewChange = function () {
        //图片切换
        this.changeSider = function (index) {
            for (let i = 0; i < this.slideshowitem.length; i++) {
                this.slideshowitem[i].classList.remove("slideshow-item-selected");
            }
            this.slideshowitem[index].classList.add("slideshow-item-selected");
        }
        //tab切换
        this.pageSiderChange = function (index) {
            for (let i = 0; i < this.pageItem.length; i++) {
                this.pageItem[i].classList.remove("slideshow-page-item-active");
            }
            this.pageItem[index].classList.add("slideshow-page-item-active")
        }
        //定时器
        this.slideshowInterval()
        this.clearSiderInterval()

    }

    //初始化功能
    this.init = function () {
        this.control();
        this.dataChange();
        this.viewChange();
    }

    //执行
    this.init()
}



