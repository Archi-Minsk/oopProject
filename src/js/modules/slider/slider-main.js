import Slider from './slider';
// глабальный слайдер на первой странице
export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }
    // метод отвечает за то куда будет двигаться слайдер
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        // всплытие блока на 3 слайде
        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }

        } catch (e) {

        }


        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
            // навешиваем событие на лого, которое возвращает первый слайд
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });
        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });

    }

    render() {
        // получаем доступ к блоку, который должен всплыть
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();


        }
    }
}