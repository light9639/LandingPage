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
 * @mouseFollowerEvent : 커서가 링크 위에 올라갔을 때는 마우스 스토커가 보이지 않도록 함.
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
 * @mt : 메인비주얼 애니메이션 타임라인
 * - 로고, 네비게이션 메뉴 blur 조절
 * - 텍스트 올라오기
 */
gsap.set('.header .logo-wrap', {
    'opacity': '0',
    'transform': 'matrix(0, 0, 0, 0, 0, 0)',
})
gsap.set('.gnb .list', {
    'opacity': '0',
    'transform': 'matrix(0, 0, 0, 0, 0, 0)',
})
gsap.set('.sc-visual__typo .overflow .text', { yPercent: 100 })

const mt = gsap.timeline();
mt
    .addLabel('main1')
    .to('.header .logo-wrap', {
        opacity: 1,
        ease: Expo.easeInOut,
        delay: 0.2,
        duration: 2,
        'opacity': '1',
        'transform': 'matrix(1, 0, 0, 1, 0, 0)',
    }, 'main1')
    .to('.gnb .list', {
        opacity: 1,
        stagger: 0.2,
        delay: 0.4,
        duration: 2,
        'opacity': '1',
        'transform': 'matrix(1, 0, 0, 1, 0, 0)',
        ease: Expo.easeInOut
    }, 'main1')

    .addLabel('main2')
    .to('.sc-visual__oval-border', {
        scale: 1,
    })
    .to('.sc-visual__typo .overflow .text', {
        yPercent: 0,
        stagger: 0.2,
        delay: -1,
        duration: 2,
        ease: Expo.easeInOut,
    }, 'main2');

// 메인 비주얼 텍스트 애니메이션
Splitting();
gsap.set('.sc-visual__desc .char', { yPercent: 200 });
gsap.to('.sc-visual__desc .char', 1, {
    scrollTrigger: {
        trigger: ".sc-visual__desc .char",
    },
    yPercent: 0,
    stagger: 0.03
});

// (공통) 헤드라인 텍스트 애니메이션
textList = document.querySelectorAll('.headline');
textList.forEach(element => {
    child = element.querySelectorAll('.overflow .text');
    gsap.set(child, { yPercent: 200 });
    gsap.to(child, {
        scrollTrigger: {
            trigger: element,
            start: "0% 80%",
        },
        yPercent: 0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.2
    });
});

TextSwiper = new Swiper(".sc-textslide .swiper", {
    effect: "fade",
    speed: 500,
    navigation: {
        nextEl: ".sc-textslide .btn-next",
        prevEl: ".sc-textslide .btn-prev"
    },
})

/**
 * 포트폴리오 리스트 json 받아오기
 * @listClassName : 롤링 배너 방향을 지정하는 클래스명을 담는 변수. list1은 왼쪽, list는 오른쪽으로 흘러감.
 * @tagDataList : json에서 태그를 담아둔 배열을 저장하는 변수.
 * @htmlTagData : 배열 원소들을 각 span 태그에 담기위한 html을 담는 변수.
 */
// fetch('./assets/data/pofolData.json')
//     .then((response) => response.json())
//     .then((json) => {
//         data = json.items;
//         let html = '';
//         let listClassName = 'list1';

//         data.forEach(element => {
//             let htmlReelItem = `<li class="sc-pofol__reel-item">
//                                 <span>VIEW CASE</span><span class="sc-pofol__icon-box"><i class="circle"></i><i class="arrow"></i></span>
//                             </li>`;
//             let tagDataList = element.snippet.tag.map(element => { return element; });
//             let htmlTagData = '';

//             tagDataList.forEach(element => { htmlTagData += `<span class="tag">${element}</span>`; })

//             html += `<li class="sc-pofol__item pofol-item">
//                     <div class="sc-pofol__desc-area">
//                         <div class="sc-pofol__text-box">
//                             <h3 class="title" data-splitting>${element.snippet.title}</h3>
//                         </div>
//                         <div class="sc-pofol__link-box">
//                             <a href="${element.snippet.reviewLink}" class="link" target="_blank">
//                                 <span class="sc-pofol__oval oval"><span class="oval-text" data-text="CODE REVIEW">CODE REVIEW</span></span>
//                             </a>
//                         </div>
//                     </div>
//                     <div class="sc-pofol__img-area ${listClassName}">
//                         <div class="sc-pofol__img-box">
//                             <a href="${element.snippet.shorcutLink}" target="_blank" class="sc-pofol__img-link link"><img src="${element.snippet.img}" alt="${element.snippet.alt}"></a>
//                         </div>
//                         <div class="sc-pofol__reel-box">
//                             <a href="${element.snippet.shorcutLink}" target="_blank" class="sc-pofol__reel-link ${listClassName} link">
//                                 <ul class="sc-pofol__reel-list">
//                                     ${htmlReelItem}
//                                     ${htmlReelItem}
//                                 </ul>
//                                 <ul class="sc-pofol__reel-list">
//                                     ${htmlReelItem}
//                                     ${htmlReelItem}
//                                 </ul>
//                             </a>
//                         </div>
//                         <div class="sc-pofol__tag-box">
//                             ${htmlTagData}
//                         </div>
//                     </div>
//                 </li>`
//             listClassName === 'list1' ? listClassName = 'list2' : listClassName = 'list1';
//         });
//         document.getElementById('pofolList').innerHTML += html;
//         portfolioMotion();
//         mouseFollowerEvent();
//     })

/**
 *  @portfolioMotion : 동적으로 생성되는 요소를 선택하기 위해 함수로 만들어 호출
 *  스크롤 시, 
 *  - 포폴 이미지 애니메이션
 *  - 텍스트, 버튼 애니메이션
 */
function portfolioMotion() {
    pofolList = document.querySelectorAll('.sc-pofol__item');
    pofolList.forEach(element => {
        Splitting();

        const pofolImgArea = element.querySelector('.sc-pofol__img-area');
        const pofolImg = element.querySelector('.sc-pofol__img-area img');
        const textChar = element.querySelectorAll('.title .char');
        const linkBox = element.querySelector('.sc-pofol__link-box');

        pofolImgArea.classList.contains('list1')
            ? gsap.set(pofolImgArea, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" })
            : gsap.set(pofolImgArea, { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" });
        gsap.set(textChar, { yPercent: 100, opacity: 0 });
        gsap.set(linkBox, { yPercent: 100, opacity: 0 });

        let t1 = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "0% 80%",
                end: "100% 100%",
            },
            ease: "Expo.easeInOut"
        })
            .addLabel('a')
        t1.to(textChar, {
            opacity: 1,
            yPercent: 0,
            stagger: 0.02,
        }, 'a')
        t1.to(linkBox, {
            yPercent: 0, opacity: 1,
            duration: 1
        }, 'a')
        pofolImgArea.classList.contains('list1') ?
            t1.to(pofolImgArea, 2, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                delay: -1,
                duration: 2,
                ease: "Expo.easeInOut"
            })
            :
            t1.to(pofolImgArea, 2, {
                clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
                delay: -1,
                duration: 2,
                ease: "Expo.easeInOut"
            });

        gsap.to(pofolImg, 2, {
            scrollTrigger: {
                trigger: pofolImg.parentElement,
                scrub: 2
            },
            yPercent: -15,
        })
    });

    gsap.to('.list1 .sc-pofol__reel-list', 22, {
        xPercent: -100,
        repeat: -1,
        ease: 'none'
    })
    gsap.to('.list2 .sc-pofol__reel-list', 22, {
        xPercent: 100,
        repeat: -1,
        ease: 'none'
    })
}

/**
 * sc-about 텍스트 애니메이션
 * - 타이틀 텍스트 올라오기
 * - 문장, 태그 동시에 나타나기
 */
aboutList = document.querySelectorAll('.sc-about__item');
aboutList.forEach(element => {
    const titleText = element.querySelectorAll('.sc-about__title .text');
    const charText = element.querySelectorAll('.sc-about__desc-list .char');
    const tag = element.querySelectorAll('.sc-about__tag');

    gsap.set(titleText, { yPercent: 100 });
    gsap.set(charText, { yPercent: 200, opacity: 0 });
    gsap.set(tag, { yPercent: 100, opacity: 0 });

    const t2 = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "0% 80%",
        }
    });

    t2
        .to(titleText, { yPercent: 0 })
        .addLabel('a')
        .to(charText, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03
        }, 'a')
        .to(tag, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.4,
        }, 'a')
});
gsap.to('.sc-about__bg-box', {
    scrollTrigger: {
        trigger: '.sc-about__bg',
        scrub: 5,
    },
    xPercent: -15
})


/**
 * @ft : footer 애니메이션 타임라인
 * - 텍스트 애니메이션
 */
gsap.set('.footer__headline .text', { yPercent: 100 });
gsap.set('.footer__contact-area', { yPercent: 100, opacity: 0 });
gsap.set('.footer__policy-area .char', { yPercent: 100, opacity: 0 });

const ft = gsap.timeline({
    scrollTrigger: {
        trigger: '.footer'
    }
});

ft
    .to('.footer__headline .text', {
        yPercent: 0,
        stagger: 0.2,
        duration: 2,
        ease: Expo.easeInOut,
    })
    .addLabel('f1')
    .to('.footer__contact-area', {
        yPercent: 0,
        opacity: 1,
        delay: -0.4
    }, 'f1')
    .to('.footer__policy-area .char', {
        yPercent: 0,
        opacity: 1,
        stagger: 0.03,
        delay: -0.4
    }, 'f1');