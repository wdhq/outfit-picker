const sliderValues = {
    slider1: 1,
    slider2: 1
};

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function updateSliderValues() {
    sliderValues.slider1 = document.getElementById('slider1').value;
    sliderValues.slider2 = document.getElementById('slider2').value;

    document.getElementById('slider1-value').textContent = sliderValues.slider1;
    document.getElementById('slider2-value').textContent = sliderValues.slider2;

    updateImages();
}

function updateImages() {
    const images = document.querySelectorAll('.object-image');

    images.forEach(image => {
        const sliders = image.getAttribute('data-sliders').split(';');
        const hideValues = image.getAttribute('data-hide-values').split(';');

        const shouldHide = sliders.some((sliderId, index) => {
            return hideValues[index]?.split(',').includes(sliderValues[sliderId]);
        });

        if (shouldHide) {
            image.classList.add('fading-out');
            setTimeout(() => image.classList.add('hidden'), 500);
        } else {
            image.classList.remove('hidden', 'fading-out');
            image.classList.add('fading-in');
            setTimeout(() => image.classList.remove('fading-in'), 500);
        }
    });
}

function startSlideshow(slideshowClass, images, delay = 5000) {
    const elements = document.querySelectorAll(`.${slideshowClass}`);
    elements.forEach(element => {
        let currentImageIndex = 0;
        function changeSlideshowImage() {
            element.style.opacity = 0;
            setTimeout(() => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                element.src = images[currentImageIndex];
                element.style.opacity = 1;
            }, 500);
        }
        setInterval(changeSlideshowImage, delay);
    });
}

const slideshowImages = {
    slideshow1: [
        './Images/Tops_Responsibili_Tee_1.jpg',
        './Images/Tops_Responsibili_Tee_2.jpg',
        './Images/Tops_Responsibili_Tee_3.jpg',
        './Images/Tops_Responsibili_Tee_4.jpg',
        './Images/Tops_Responsibili_Tee_5.jpg'
    ],
    slideshow2: [
        './Images/Bottoms_Everyday_Pants.jpg',
        './Images/Bottoms_Venga_Rock_1.jpg',
        './Images/Bottoms_Venga_Rock_2.jpg'
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('slider1').addEventListener('input', debounce(updateSliderValues, 300));
    document.getElementById('slider2').addEventListener('input', debounce(updateSliderValues, 300));

    updateSliderValues(); // Initialize images based on default slider values
    startSlideshow('slideshow2', slideshowImages.slideshow2);
    setTimeout(() => startSlideshow('slideshow1', slideshowImages.slideshow1), 3000);
});
