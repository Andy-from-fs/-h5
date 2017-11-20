//elements in each page 各页元素集合 动画队列
var books = [
  {
    name: "cover",
    content: [$("#cover>.next"), $("#cover>.technology")]
  },
  {
    name: "p1",
    content: [$("#p1>.title"), $("#p1>.map"), $("#p1>.bottom"), $("#p1>.next")]
  },
  {
    name: "p2",
    content: [
      $("#p2>.title"),
      $("#p2>.word"),
      $("#p2>.section1"),
      $("#p2>.section2"),
      $("#p2>.section3"),
      $("#p2>.section4"),
      $("#p2>.next")
    ]
  },
  {
    name: "p3",
    content: [
      $("#p3>.title"),
      $("#p3>.section1"),
      $("#p3>.section2"),
      $("#p3>.section3"),
      $("#p3>.section4"),
      $("#p3>.next")
    ]
  },
  {
    name: "p4",
    content: [
      $("#p4>.title"),
      $("#p4>.section1"),
      $("#p4>.section2"),
      $("#p4>.section3"),
      $("#p4>.next")
    ]
  },
  {
    name: "p5",
    content: [
      $("#p5>.title"),
      $("#p5>.section1"),
      $("#p5>.section2"),
      $("#p5>.section3"),
      $("#p5>.section4"),
      $("#p5>.next")
    ]
  },
  {
    name: "p6",
    content: [
      $("#p6>.title"),
      $("#p6>.section1"),
      $("#p6>.section2"),
      $("#p6>.section3"),
      $("#p6>.section4"),
      $("#p6>.section5"),
      $("#p6>.section6"),
      $("#p6>.next")
    ]
  },
  {
    name: "p7",
    content: [
      $("#p7>.title"),
      $("#p7>.postcard"),
      $("#p7>.sec-btn"),
      $("#p7>.technology")
    ]
  }
];

//预加载完成再执行
function completedJs() {
  $("#book").css("visibility", "initial");
  $(".page").each(function() {
    $(this).width(window.innerWidth);
  });
  $("#book").turn({
    // Width
    width: window.innerWidth,
    // Height
    height: window.innerHeight,
    display: "single",
    acceleration: true,
    gradients: true,
    elevation: 50,
    duration: 500,
    turnCorners: "bl,br",
    when: {
      turning: function(event, page, view) {
        // console.log(event, page, view);
        // fixScroll(page);
      },
      turned: function(e, page) {
        // p1Play();
        turnedPage(page, function() {
          if (page !== 2) {
            checkShowLazy(page);
          }
          if (page === 2) {
            _.delay(function() {
              checkShowLazy(page);
            }, 2400);
          }

          if ([2, 3, 4, 5, 6, 7].indexOf(page) !== -1) {
            fixScroll(page);
          }
        });
        // console.log(e);
        // console.log(page);
        // console.log('Current view: ', $(this).turn('view'));
      }
    }
  });

  var fixScroll = function(page) {
    function fix(page) {
      var img = $(".turn-page-wrapper[page=" + page + "] .page-bg");
      if ($(img).innerHeight() > window.innerHeight) {
        $('.turn-page-wrapper[page="' + page + '"] .turn-page').css({
          "overflow-x": "hidden",
          "overflow-y": "scroll"
        });
      }
    }
    fix(page);
  };

  //p2 gif播放
  function checkShowLazy(page) {
    if (page === 2) {
      $(".lazyload").attr("src", $(".lazyload").attr("data-src"));
    } else {
      $(".lazyload").attr("src", "");
    }
  }

  //根据name查找books数组里面的元素集合
  function findElements(pageName) {
    for (var i = 0; i < books.length; i++) {
      if (books[i].name === pageName) {
        return books[i].content;
      }
    }
  }

  function translatePageName(page) {
    if (page === 1) {
      return "cover";
    } else {
      return "p" + (page - 1);
    }
  }

  //页面进场动画播放
  function pagePlay(page) {
    var times = 0;
    page = translatePageName(page);
    var elements = findElements(page);
    var prevEle;
    console.log(elements);
    _.each(
      elements,
      function(val) {
        _.delay(function() {
          val.show();
        }, times);
        times += 800;
      },
      times
    );
  }

  //页面关闭
  function pageClose(page) {
    page = translatePageName(page);
    var elements = findElements(page);
    // console.log(elements);
    _.each(elements, function(val) {
      val.css("display", "none");
    });
  }

  var pageNum;
  //翻页触发方法
  function turnedPage(page, callback, args) {
    pagePlay(page);
    for (var i = 1; i <= books.length; i++) {
      if (i !== page) {
        pageClose(i);
      }
    }
    if (callback) {
      if (args) {
        callback.apply(this, args);
      } else {
        callback.call(this);
      }
    }
  }

  //再看一次
  $("body").on("touchstart", "a.btn-again", function() {
    $("#book").turn("page", 1);
  });

  //详细介绍页
  function showIntro(index) {
    $(".mask .pic img").attr(
      "src",
      _.find(intros, function(val) {
        return parseInt(val.index) === index;
      }).img
    );
    $(".mask .word .intro").each(function(i, ele) {
      if ($(ele).hasClass("intro" + index)) {
        $(ele).show();
      } else {
        $(ele).hide();
      }
    });
  }

  //进入详细介绍页
  var btnArgs = [
    "a.btn-kuiguang",
    "a.btn-sanhu",
    "a.btn-dake",
    "a.btn-sifeng",
    "a.btn-shiyanyan",
    "a.btn-jiulongyan",
    "a.btn-yungu"
  ];
  _.each(btnArgs, function(val, i) {
    $("body").on("touchstart", val, function() {
      showIntro(i + 1);
      $(".mask").show();
    });
  });

  // 介绍页中的返回
  $("body").on("touchstart", ".mask a.details-back", function() {
    $(".mask").addClass("fadeOut");
    _.delay(function() {
      $(".mask")
        .hide()
        .removeClass("fadeOut");
    }, 800);
  });

  //结束loading
  // var percent = 99;
  // setInterval(function() {
  //   percent++;
  //   $("#loading .percent").text(percent + "%");
  //   if (percent === 100) {
  $("#loading").fadeOut();
  //   }
  // }, 500);
}

// //屏蔽ios下上下弹性
// $(window).on('touchmove.elasticity', function (e) {
//   e.preventDefault();
// });

/*音乐*/
var audio = $("#music");
var isPlaying = false;
function playAudio() {
  audio[0].play();
  isPlaying = true;
}

function pauseAudio() {
  audio[0].pause();
  isPlaying = false;
}

$(function() {
  document.addEventListener(
    "WeixinJSBridgeReady",
    function() {
      WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
        network = e.err_msg.split(":")[1]; //结果在这里
        playAudio();
      });
    },
    false
  );
});

$("body").on("touchstart", "a.music", function() {
  if (isPlaying == true) {
    pauseAudio();
    $(this).addClass("music_close");
  } else {
    playAudio();
    $(this).removeClass("music_close");
  }
});
