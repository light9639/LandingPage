/**
 * 사이트 부드럽게하기
 */
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/**
 * 컨텐츠가 있는 링크 클릭시 커서 이미지 변경
 */
$('.linkCont').hover(function () {
    $('.cursor').addClass('on')
}, function () {
    $('.cursor').removeClass('on')
})

/**
 * 컨텐츠가 없는 링크 클릭시 커서 크기
 */
$('.mouseHoverDown').hover(function () {
    $('.cursor').addClass('scale')
}, function () {
    $('.cursor').removeClass('scale')
})

/**
 * 마우스 따라다니게
 */
function mouseFollower(e) {
    gsap.to('.cursor', 0.75, {
        css: {
            left: e.clientX,
            top: e.clientY
        }
    })
}
document.addEventListener('mousemove', mouseFollower);

/**
 * 커서가 링크 위에 올라갔을 때는 마우스 스토커가 보이지 않도록 함.
 */
function mouseFollowerEvent() {
    const linkList = document.querySelectorAll('.link');
    const pointer = document.querySelector('.cursor .pointer');

    linkList.forEach(element => {
        element.addEventListener('mouseenter', () => {
            pointer.classList.remove('pointer');
        })
        element.addEventListener('mouseleave', () => {
            pointer.classList.add('pointer');
        })
    })
}

/**
 * header 메뉴 클릭하면 각자의 위치로 이동시키기
 */
let ItemList = document.querySelectorAll('.gnb .item a');
ItemList.forEach(el => {
    let item = el.innerText.toLowerCase();

    el.addEventListener('click', (e) => {
        e.preventDefault();
        const element = document.querySelector(`.sc-${item}`);
        element.scrollIntoView({ behavior: 'smooth' });
    })
})

/**
 * header 애니메이션 타임라인
 */
gsap.set('.header .logo-wrap', { 'filter': 'blur(' + 100 + 'px)' })
gsap.set('.header .gnb.main .list', { 'filter': 'blur(' + 100 + 'px)' })
gsap.set('.header .gnb.sub .list', { 'filter': 'blur(' + 100 + 'px)' })
gsap.set('.header .group-time', { 'filter': 'blur(' + 100 + 'px)' })

const mt = gsap.timeline();
mt
    .addLabel('main1')
    .to('.header .logo-wrap', {
        'filter': 'blur(' + 0 + 'px)',
        delay: 0.2,
        duration: 2,
    }, 'main1')
    .to('.header .gnb .list', {
        'filter': 'blur(' + 0 + 'px)',
        duration: 2,
        stagger: 0.2
    }, 'main1')
    .to('.header .group-time', {
        'filter': 'blur(' + 0 + 'px)',
        delay: 0.8,
        duration: 2,
    }, 'main1')

/**
 * 실시간 한국 시간 가져오기
 */
const koreaTarget = document.querySelector(".header .koTime");
function koreaTime() {
    const koreaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    koreaTarget.innerText = koreaTime;
}
koreaTime();
setInterval(koreaTime, 1000);

/**
 * 실시간 미국 시간 가져오기
 */
const YorkTarget = document.querySelector(".header .nyTime");
function NewYorkTime() {
    const YorkTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    YorkTarget.innerText = YorkTime;
}
NewYorkTime();
setInterval(NewYorkTime, 1000);

/**
 * 맨위와 맨 아래에 도착했을 때 header 메뉴 사라짐
 */
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var innerHeight = $(window).innerHeight();
    var scrollHeight = $('body').prop('scrollHeight');
    if (scrollTop == 0 || scrollTop + innerHeight + 10 >= scrollHeight) {
        $('.header .gnb').addClass('on')
    } else {
        $('.header .gnb').removeClass('on')
    }
})

/**
 * sc-visual 이미지 나오게 하기
 */
gsap.set('.sc-visual .img-wrap', {
    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
});
gsap.set('.sc-visual .img-wrap picture', {
    transform: 'translateY(30vh)'
});
gsap.set('.sc-visual .img-wrap img', {
    transform: 'scale(1.4)',
    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
});

const visual = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-visual',
    }
});

visual
    .addLabel('visual') // 이걸 쓰면 동시에 실행됨
    .to('.sc-visual .img-wrap', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
    }, 'visual')
    .to('.sc-visual .img-wrap picture', {
        transform: 'matrix(1, 0, 0, 1, 0, 0)',
        duration: 0.5,
        delay: 0.5,
    }, 'visual')
    .to('.sc-visual .img-wrap img', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transform: 'matrix(1.002, 0, 0, 1.002, 0, 0)',
        duration: 0.5,
        delay: 0.5,
    }, 'visual');

/**
 * 각 섹션의 title-area 부분에 gsap 적용
 */
textList = document.querySelectorAll('.title-area');
textList.forEach(element => {
    child = element.querySelectorAll('.title-area .title');
    gsap.set(child, { yPercent: 100 });
    gsap.to(child, {
        scrollTrigger: {
            trigger: element,
            start: "0% 80%",
        },
        yPercent: 0,
        duration: 2,
        opacity: 1,
        stagger: 0.2
    });

    desc = element.querySelectorAll('.title-area .desc');
    gsap.set(desc, { yPercent: 50, opacity: 0 });
    gsap.to(desc, {
        scrollTrigger: {
            trigger: element,
            start: "0% 80%",
        },
        duration: 2,
        delay: 0.5,
        yPercent: 0,
        opacity: 1,
        stagger: 0.2
    });
});

/**
 * listItem에 접근하면 투명도와 이미지 크기를 변화시키기
 */
let itemList = document.querySelectorAll('.listItem');
let linkList = document.querySelectorAll('.listItem .linkCont');
let infoList = document.querySelectorAll('.listItem .info');

itemList.forEach((el, i) => {
    gitList = el.querySelector('.git-link');
    if (gitList) {
        gsap.set(gitList, { opacity: 0 })
        gsap.to(gitList, {
            scrollTrigger: {
                trigger: linkList[i],
                start: "50% 100%",
                end: "100% 0%"
            },
            opacity: 1,
            delay: 0.5,
            duration: 1.5
        });
    }

    imgList = el.querySelectorAll('img, video')
    gsap.set(imgList, { filter: 'brightness(0.25)', })
    gsap.to(imgList, {
        scrollTrigger: {
            trigger: linkList[i],
            start: "75% 100%",
            end: "100% 0%"
        },
        filter: 'brightness(1)',
        delay: 0.5,
        duration: 1.5
    });
})

infoList.forEach((el, i) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: linkList[i],
            start: "100% 100%",
            end: "100% 0%",
            stagger: 0.2,
        },
        opacity: 1,
    });
})

linkList.forEach((element, i) => {
    gsap.set(element, {
        opacity: 0,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    });
    gsap.to(element, {
        scrollTrigger: {
            trigger: linkList[i],
            start: "50% 100%",
            end: "100% 0%",
        },
        opacity: 1,
        duration: 0.75,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    })

    picList = element.querySelectorAll('picture');
    gsap.set(picList, {
        transform: 'translateY(30vh)'
    });
    gsap.to(picList, {
        scrollTrigger: {
            trigger: linkList[i],
            start: "50% 100%",
            end: "100% 0%"
        },
        duration: 0.75,
        delay: 0.2,
        transform: 'matrix(1, 0, 0, 1, 0, 0)',
    })

    imgList = element.querySelectorAll('img, video');
    gsap.set(imgList, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        transform: 'scale(1)'
    });
    gsap.to(imgList, {
        scrollTrigger: {
            trigger: linkList[i],
            start: "50% 100%",
            end: "100% 0%"
        },
        duration: 0.75,
        delay: 0.2,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transform: 'matrix(1.002, 0, 0, 1.002, 0, 0)'
    });
})

gsap.set('.sc-introduce .text-big h3', { yPercent: 100, opacity: 0 });
gsap.set('.sc-introduce .text-scroll a', { yPercent: 100, opacity: 0 });

const intro = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-introduce'
    }
});

intro
    .to('.sc-introduce .text-big h3', {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
    })
    .to('.sc-introduce .text-scroll a', {
        yPercent: 0,
        opacity: 1,
    })

/**
 * sc-marquee 보이면 이동하도록
 */
let marqueeList = document.querySelectorAll('.sc-marquee [data-parallax-x]')

marqueeList.forEach(element => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: '.sc-marquee',
            start: "0% 100%",
            end: "100% 0%",
            scrub: 0, // 스크롤 되돌아오면 거꾸로 실행
        },
        xPercent: element.dataset.parallaxX,
        ease: 'none'
    });
})

/**
 * 숫자 증가 함수
 */
let number = document.querySelectorAll('.insights-list .inview')
let startCount = { var: 0 };

number.forEach((element, i) => {
    gsap.to(startCount, {
        var: element.innerText,
        duration: 5,
        ease: "none",
        onUpdate: changeNumber,
        scrollTrigger: {
            trigger: ".insights-list .inview",
        },
    })
    function changeNumber() {
        number[i].innerHTML = (startCount.var).toFixed();
    }
    if (i == 3) {
        number[i].innerHTML = (startCount.var).toFixed();
        setTimeout(() => {
            number[i].innerHTML = '<span>∞</span>'
        }, 5500)
        setTimeout(() => {
            number[i].firstChild.classList.add('opacity')
        }, 5600)
    } else {
        number[i].innerHTML = (startCount.var).toFixed();
    }

})

/**
 * footer 텍스트 호버하면 색 채우기
 */
$('.footer .mail .linkFoot').hover(function () {
    if ($(this).hasClass('on') == true) {
        $(this).removeClass('on').siblings().addClass('on');
    } else {
        return
    }
})

/**
 * footer 애니메이션 타임라인
 */
gsap.set('.mail .linkFoot-wrap .linkFoot', { yPercent: 100, opacity: 0 });
gsap.set('.credits-area', { yPercent: 100, opacity: 0 });
gsap.set('.social-footer-area', { yPercent: 100, opacity: 0 });

const ft = gsap.timeline({
    scrollTrigger: {
        trigger: '.footer'
    }
});

ft
    .to('.mail .linkFoot-wrap .linkFoot', {
        yPercent: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 2,
    })
    .addLabel('f1')
    .to('.credits-area', {
        yPercent: 0,
        opacity: 1,
    }, 'f1')
    .to('.social-footer-area', {
        yPercent: 0,
        opacity: 1,
    }, 'f1');

gsap.to('.state', {
    scrollTrigger: {
        trigger: '.wrapper',
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
    },
    ease: "none", // 일정하게
    "--width": "100%"
})