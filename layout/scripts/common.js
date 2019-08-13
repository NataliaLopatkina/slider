console.log("Hello! I\"m Slider 😊.")

if (document.querySelectorAll(".controls__arrow--prev").length > 0) {
    var currentSlide = 1;

    showSlides(currentSlide);

    dotActive(currentSlide);

    var minusSlide = document.querySelector(".controls__arrow--prev");
    var plusSlide = document.querySelector(".controls__arrow--next");

    minusSlide.addEventListener("click", function () {
        currentSlide = currentSlide - 1;
        showSlides(currentSlide);
        dotActive(currentSlide);
    })

    plusSlide.addEventListener("click", function () {
        currentSlide = currentSlide + 1;
        showSlides(currentSlide);
        dotActive(currentSlide);
    })

    function showSlides(nextSlide) {
        var slides = document.querySelectorAll(".slides__item");

        if (slides) {
            if (nextSlide > slides.length) { // Зациклить слайдер
                currentSlide = 1
            }

            if (nextSlide < 1) {
                currentSlide = slides.length
            }

            for (var i = 0; i < slides.length; i++) {
                //Скрываем все слайды 
                slides[i].classList.remove("active");
            }

            // Показываем текущий слайд из массива
            slides[currentSlide - 1].classList.add("active");
        }
    }

    function dotActive(nextSlide) {
        var dots = document.querySelectorAll(".dots__item");

        if (dots) {
            if (nextSlide > dots.length) {
                currentSlide = 1
            }

            if (nextSlide < 1) {
                currentSlide = dots.length
            }

            for (var i = 0; i < dots.length; i++) {
                dots[i].classList.remove("dots__item--active");
            }

            dots[currentSlide - 1].classList.add("dots__item--active");
        }
    }

    var dots = document.querySelectorAll(".dots__item");

    dots.forEach(function (el) {
        el.addEventListener("click", function (e) {

            currentTarget = +event.target.dataset.button;

            currentSlide = currentTarget + 1;

            showSlides(currentSlide);
            dotActive(currentSlide);
        })
    });
}

//Slider. Second

if (document.querySelectorAll(".slider-looped__item").length > 0) {
    var slideWidth = 700;
    var sliderList = document.querySelector(".slider-looped__list");
    var slides = document.querySelectorAll(".slider-looped__item");
    var buttonPrev = document.querySelector(".slider-looped__arrow--prev");
    var buttonNext = document.querySelector(".slider-looped__arrow--next");
    var dotsList = document.querySelector(".slider-looped__dots-list");
    var dots = document.querySelectorAll(".slider-looped__dots-item");
    var slideIndex = 0;
    var dotIndex = 0;

    sliderList.style.width = slideWidth*slides.length + "px";

    buttonPrev.onclick = scrollToPrev;
    buttonNext.onclick = scrollToNext;

    // Активная кнопка

    function setActiveDot() {
        dots.forEach(function(item) {
            item.classList.remove("active");
        })

        var activeDot = document.querySelector(`.slider-looped__dots-item[data-button="${dotIndex}"]`);
            activeDot.classList.add("active");
    }

    // Перелистывание слайдов влево

    function scrollToPrev() {
        slideIndex--; 
        dotIndex--;

        if (slideIndex < 0) {

            var children = sliderList.children;
            // var dotsChildren = dotsList.children;

            sliderList.style.transition = null;
            sliderList.style.left = -(slideIndex + 2) * slideWidth + "px";
            sliderList.insertBefore(children[slides.length - 1], children[0]);
            // dotsList.appendChild(dotsChildren[0]);

            slideIndex++;
        }

        if (dotIndex < 0) {
            dotIndex = slides.length - 1;
        }

        console.log(dotIndex);

        // Перелистывание слайдов

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                sliderList.style.transition = "left 1s ease";
                sliderList.style.left = -(slideWidth * slideIndex) + "px";
            })
        });

        setActiveDot();
    }

    // Перелистывание слайдов вправо

    function scrollToNext() {
        slideIndex++;
        dotIndex++;

        if (slideIndex > slides.length - 1) {

            var children = sliderList.children;
            // var dotsChildren = dotsList.children;

            sliderList.style.transition = null;
            sliderList.style.left = -(slideIndex - 2) * slideWidth + "px"; // Начальное значение
            sliderList.appendChild(children[0]);
            // dotsList.insertBefore(dotsChildren[slides.length - 1], dotsChildren[0]);
            slideIndex--;
        }

        if (dotIndex > slides.length - 1) {
            dotIndex = 0;
        }

        console.log(dotIndex);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                sliderList.style.transition = "left 1s ease";
                sliderList.style.left = -(slideWidth * slideIndex) + "px";
            })
        });

        setActiveDot();
    }

    // Переключение слайдов при нажатии на кнопки

    dots.forEach(function (element) {
        element.addEventListener("click", function (event) {
            var currentDot = +event.target.dataset.button;

            slideIndex = dotIndex = currentDot;

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    sliderList.style.transition = 'left 0.6s ease-in-out';
                    sliderList.style.left = -(slideWidth * slideIndex) + 'px';
                })
            });
            
            setActiveDot();
        })
    })
}

// Slider. Cats

if (document.querySelectorAll(".cats__item").length > 0) {
    var slideWidth = 700;
    var sliderList = document.querySelector(".cats__list");
    var slides = document.querySelectorAll(".cats__item");
    var buttonPrev = document.querySelector(".cats__control-arrow--prev");
    var buttonNext = document.querySelector(".cats__control-arrow--next");
    var dotsList = document.querySelector(".cats__dots-list");
    var dots = document.querySelectorAll(".cats__dots-item");
    var slideIndex = 1;
    var children = sliderList.children;

    sliderList.style.width = slides.length*100 + "%";

    buttonPrev.onclick = scrollToPrev;
    buttonNext.onclick = scrollToNext;

    // Активная кнопка

    function setActiveDot() {
        dots.forEach(function (item) {
            item.classList.remove("active"); // Убираем класс у всех кнопок
        })
        var activeDot = document.querySelector(`.cats__dots-item[data-dots="${slideIndex - 1}"]`); // Выбираем активную кнопку по дата-атрибуту
        activeDot.classList.add("active"); // Добавляем класс активной кнопке
    }

    // Перелистывание слайдов влево

    function scrollToPrev() {
        console.log(slideIndex);
        sliderList.style.transition = "left 1s ease"; // Анимация смены слайда
        

        if (slideIndex == 1) {
            var cloneElement = children[slides.length - 1].cloneNode(true); //Дублированный элемент
            sliderList.removeAttribute("style");
            sliderList.style.width = slides.length + "%";
            sliderList.insertBefore(cloneElement, children[0]) // Добавляем дублированный элемент в начало массива
            sliderList.style.width = (slides.length + 1) * 100 + "%"; // Пересчитываем ширину контейнера со слайдера с учетом дублированного
            sliderList.style.left = -100 + "%"; // Определяем положение слайдера с учетом дублированного

            setTimeout(function() {
                sliderList.style.transition = "left 1s ease";
                sliderList.style.left = 0 + "%";
            }, 10);

            setTimeout(function () {
                slideIndex = slides.length// Переходим в конец слайдера
                sliderList.removeAttribute("style"); // Убираем анимацию
                sliderList.style.left = -(slides.length)*100 + "%"; // Переходим в крайнее положение слайдера
                sliderList.style.width = (slides.length + 1)*100 + "%";
                sliderList.removeChild(cloneElement); // Удаляем дублированный элемент
                sliderList.style.width = slides.length * 100 + "%"; // Возвращаем начальное значение ширины
                sliderList.style.left = -(slides.length - 1)*100 + "%"; // Переходим в крайнее положение слайдера
                setActiveDot();
                console.log(slideIndex);
            }, 1000);
        }

        else {
            slideIndex--; // Уменьшаем позицию слайдера
            sliderList.style.left = -((slideIndex - 1) * 100) + "%";
            setTimeout(function () {
                setActiveDot();
            }, 1000)

            console.log(slideIndex);
        }
    }

    // Перелистывание слайдов вправо

    function scrollToNext() {
        slideIndex++; // Увеличиваем позицию слайдера
        sliderList.style.transition = "left 1s ease"; // Анимация смены слайдера
        
        if (slideIndex > slides.length) {
            var cloneElement = children[0].cloneNode(true); // Дублированный элемент
            sliderList.appendChild(cloneElement); // Добавляем дублированный элемент в конец массива слайдов
            sliderList.style.width = (slides.length + 1) * 100 + "%"; // Пересчитываем ширину контейнера со слайдера с учетом дублированного
            sliderList.style.left = -slides.length*100 + "%"; // Определяем положение слайдера с учетом добавленного дубликата
            
            setTimeout(function() {
                sliderList.style.transition = "left 1s ease"; // Добавляем анимацию перехода
                sliderList.removeAttribute("style"); // Убираем анимацию
                slideIndex = 1; // Переходим в начало слайдера
                sliderList.style.left = 0 + "%"; // Обнуляем положение слайдера
                sliderList.removeChild(cloneElement); // Удаляем дублированный элемент
                sliderList.style.width = slides.length * 100 + "%"; // Возвращаем начальное значение ширины
                setActiveDot();
            }, 1000);
        }
        
        else {
            sliderList.style.left = -(slideIndex - 1) * 100 + "%";
            setTimeout(function() {
                setActiveDot();
            }, 1000)
        }
    }

    // Переключение слайдов при нажатии на кнопки

    dots.forEach(function (element) {
        element.addEventListener("click", function (event) {
            var currentDot = +event.target.dataset.dots;

            slideIndex = currentDot;

            sliderList.style.transition = "left 1s ease";
            sliderList.style.left = -slideIndex*100 + "%";

            dots.forEach(function (item) {
                item.classList.remove("active"); // Убираем класс у всех кнопок
            })
            
            var activeDot = document.querySelector(`.cats__dots-item[data-dots="${slideIndex}"]`); // Выбираем активную кнопку по дата-атрибуту
            activeDot.classList.add("active"); // Добавляем класс активной кнопке
        })
    })
}

// Dublicate slider

if (document.querySelectorAll(".dublicate-slider__item").length > 0) {

    var animation = false;
    var sliderWidth = 500;
    var sliderList = document.querySelector(".dublicate-slider__list");
    var sliderItem = document.querySelectorAll(".dublicate-slider__item");
    var slidePrev = document.querySelector(".dublicate-slider__arrow--prev");
    var slideNext = document.querySelector(".dublicate-slider__arrow--next");
    var dotsList = document.querySelector(".dublicate-slider__dots-list");
    var dotsItem = document.querySelectorAll(".dublicate-slider__dots-item");
    var slideIndex = 0;
    var children = sliderList.children;
    var cloneElementFirst = children[0].cloneNode(true); // Первый дублированный элемент
    var cloneElementLast = children[sliderItem.length - 1].cloneNode(true); // Последний дублированный элемент

    slidePrev.onclick = scrollToPrev;
    slideNext.onclick = scrollToNext;
    sliderList.style.width = sliderItem.length * 100 + "%"; // Ширина контейнера
    sliderList.insertBefore(cloneElementLast, children[0]); // Добавляем дубликат последнего слайда в начало слайдера
    sliderList.appendChild(cloneElementFirst); // Добавляем дубликат первого слайда в конец слайдера
    sliderList.style.width = (sliderItem.length + 2) * 100 + "%"; // Пересчитываем ширину с учетом добавленных дубликтов
    var translatePosition = -(100 / (sliderItem.length + 2)) + "%";
    sliderList.style.transform = "translateX(" + translatePosition + ")";

    // Активная кнопка

    function setActiveDot() {
        dotsItem.forEach(function (item) {
            item.classList.remove("active"); // Убираем класс у всех кнопок
        })
        var activeDot = document.querySelector(`.dublicate-slider__dots-item[data-button="${slideIndex}"]`); // Выбираем активную кнопку по дата-атрибуту
        activeDot.classList.add("active"); // Добавляем класс активной кнопке
    }

    // Перелистывание слайдов вправо

    var text = sliderItem.length;
    var jfnf = slideIndex + 1;

    document.getElementById('parent').innerHTML = text + "/" + jfnf;

    function scrollToNext() {
        if (animation) {
            return;
        }

        animation = true;

        slideIndex++;// Увеличиваем позицию слайдера
        sliderList.classList.add("transition"); // Анимация смены слайдера

        if (slideIndex > sliderItem.length - 1) {
            setTimeout(function () {
                sliderList.classList.remove("transition"); // Обнуляем анимацию
                sliderList.style.width = (sliderItem.length + 2) * 100 + "%"; // Восстанавливаем ширину
                slideIndex = 0; // Обнуляем положение слайдера
                sliderList.style.transform = "translateX(" + translatePosition + ")"; // Возвращаемся в начало слайдера
                setActiveDot(); // Активная точка
                animation = false;
            }, 1000)

            var text = sliderItem.length;
            var jfnf = slideIndex;

            document.getElementById('parent').innerHTML = text + "/" + jfnf;
        }

        var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
        sliderList.style.transform = "translateX(" + translateScroll + ")"; // Перелистывание слайдов вправо, не доходя до границы
        setTimeout(function () {
            setActiveDot(); // Активная точка
            animation = false;
        }, 1000)

        var text = sliderItem.length;
        var jfnf = slideIndex + 1;

        document.getElementById('parent').innerHTML = text + "/" + jfnf;
    }

    function scrollToPrev() {
        if (animation) {
            return;
        }

        animation = true;

        slideIndex--; // Уменьшаем позицию слайдера
        sliderList.classList.add("transition"); // Добавляем анимацию перехода

        if (slideIndex < 0) {
            setTimeout(function () {
                sliderList.classList.remove("transition"); // Обнуляем анимацию
                sliderList.style.width = (sliderItem.length + 2) * 100 + "%"; // Восстанавливаем ширину
                slideIndex = sliderItem.length - 1; // Меняем индекс слайдера
                var translatePositionLast = -sliderItem.length * (100 / (sliderItem.length + 2)) + "%";
                sliderList.style.transform = "translateX(" + translatePositionLast + ")"; // Меняем положение слайдера в конец
                setActiveDot(); // Активная точка
                animation = false;
            }, 1000)

            var text = sliderItem.length;
            var jfnf = sliderItem.length;

            document.getElementById('parent').innerHTML = text + "/" + jfnf;
        }

        var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
        sliderList.style.transform = "translateX(" + translateScroll + ")"; // Перелистывание сладов влево, не доходя до границы
        setTimeout(function () {
            setActiveDot(); // Активная точка
            animation = false;
        }, 1000)

        var text = sliderItem.length;
        var jfnf = slideIndex + 1;

        document.getElementById('parent').innerHTML = text + "/" + jfnf;
    }

    // Перелистывание слайдов по точкам

    dotsItem.forEach(function (element) {
        element.addEventListener("click", function (event) {
            var currentDot = +event.target.dataset.button; // Определение активной точки

            slideIndex = currentDot;

            sliderList.classList.add("transform"); // Добавление анимации перехода
            var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
            sliderList.style.transform = "translateX(" + translateScroll + ")"; // Перелистывание слайдов

            setActiveDot();
        })
    })

}
