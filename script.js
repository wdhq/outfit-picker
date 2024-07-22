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
    const fitnessChecked = document.getElementById('fitness-checkbox').checked;
    let slider1Value = parseInt(document.getElementById('slider1').value);

    if (fitnessChecked) {
        if (slider1Value === 0 || slider1Value === 1) {
            slider1Value = Math.max(1, slider1Value);
            document.getElementById('slider1').value = slider1Value;
        }
    }

    sliderValues.slider1 = slider1Value;
    sliderValues.slider2 = parseInt(document.getElementById('slider2').value);

    document.getElementById('slider1-value').textContent = sliderValues.slider1;
    document.getElementById('slider2-value').textContent = sliderValues.slider2;

    updateImages();
}

function updateImages() {
    const fitnessChecked = document.getElementById('fitness-checkbox').checked;
    const images = document.querySelectorAll('.object-image');

    images.forEach(image => {
        const sliders = image.getAttribute('data-sliders').split(';');
        const hideValues = fitnessChecked ? image.getAttribute('data-checkbox-hide-values').split(';') : image.getAttribute('data-hide-values').split(';');

        const shouldHide = sliders.some((sliderId, index) => {
            return hideValues[index]?.split(',').includes(sliderValues[sliderId].toString());
        });

        if (shouldHide) {
            image.classList.add('fading-out');
            setTimeout(() => {
                image.classList.add('hidden');
                image.classList.remove('fading-out');
            }, 0);  // Bro keep this value to 0 no matter what
        } else {
            image.classList.remove('hidden');
            image.classList.add('fading-in');
            setTimeout(() => image.classList.remove('fading-in'), 500);  // Matches the CSS transition duration
        }
    });
}

function startSlideshow(slideshowClass, images, delay = 5000) {
    const elements = document.querySelectorAll(`.${slideshowClass}`);
    elements.forEach(element => {
        let currentImageIndex = 0;
        function changeSlideshowImage() {
            if (!element.classList.contains('hidden')) {
                element.style.opacity = 0;
                setTimeout(() => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    element.src = images[currentImageIndex];
                    element.style.opacity = 1;
                }, 500);
            }
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

function checkFitnessCheckbox() {
    const fitnessChecked = document.getElementById('fitness-checkbox').checked;
    const slider1 = document.getElementById('slider1');
    const slider1Value = parseInt(slider1.value);
    const idleLabel = document.querySelector('.slider-wrapper .slider-labels span:nth-child(1)');
    const moderateLabel = document.querySelector('.slider-wrapper .slider-labels span:nth-child(2)');

    if (fitnessChecked) {
        // Fix the slider1 to value 2
        if (slider1Value !== 2) {
            slider1.value = 2;
            sliderValues.slider1 = 2;
            document.getElementById('slider1-value').textContent = 2;
        }
        
        slider1.disabled = true;

        // Apply opacity change to labels
        idleLabel.classList.add('checkbox-checked-idle');
        moderateLabel.classList.add('checkbox-checked-moderate');
    } else {
        slider1.disabled = false;

        // Remove opacity change from labels
        idleLabel.classList.remove('checkbox-checked-idle');
        moderateLabel.classList.remove('checkbox-checked-moderate');
    }

    updateSliderValues();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('slider1').addEventListener('input', debounce(updateSliderValues, 300));
    document.getElementById('slider2').addEventListener('input', debounce(updateSliderValues, 300));
    document.getElementById('fitness-checkbox').addEventListener('change', checkFitnessCheckbox);

    updateSliderValues();
    startSlideshow('slideshow2', slideshowImages.slideshow2);
    setTimeout(() => startSlideshow('slideshow1', slideshowImages.slideshow1), 2500);
});