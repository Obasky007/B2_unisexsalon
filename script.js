(function () {
    // ── Nav scroll effect ──
    var nav = document.getElementById('nav');
    var lastScroll = 0;

    function handleNavScroll() {
        var scrollY = window.scrollY;
        if (scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ── Floating WhatsApp button ──
    var whatsappFloat = document.getElementById('whatsappFloat');
    var hero = document.getElementById('hero');

    function handleFloatVisibility() {
        if (!hero) return;
        var heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom < -100) {
            whatsappFloat.classList.add('visible');
        } else {
            whatsappFloat.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleFloatVisibility, { passive: true });

    // ── Reveal on scroll ──
    var reveals = document.querySelectorAll('.reveal, .reveal-scale');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
        observer.observe(el);
    });

    // ── Instagram Carousel ──
    var carousel = document.querySelector('.instagram-previews');
    var items = document.querySelectorAll('.instagram-preview-item');
    var prevBtn = document.querySelector('.carousel-prev');
    var nextBtn = document.querySelector('.carousel-next');
    var currentIndex = 0;
    var autoSlideInterval;

    function isMobileView() {
        return window.innerWidth < 768;
    }

    function getMaxIndex() {
        return isMobileView() ? items.length - 2 : 0;
    }

    function showSlide(index) {
        if (isMobileView() && carousel) {
            var offset = index * 50;
            carousel.style.transform = `translateX(-${offset}%)`;
        }
        currentIndex = index;
    }

    function nextSlide() {
        if (isMobileView()) {
            var maxIdx = getMaxIndex();
            currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
            showSlide(currentIndex);
        }
    }

    function prevSlide() {
        if (isMobileView()) {
            var maxIdx = getMaxIndex();
            currentIndex = currentIndex <= 0 ? maxIdx : currentIndex - 1;
            showSlide(currentIndex);
        }
    }

    function startAutoSlide() {
        if (isMobileView()) {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (carousel && items.length > 0) {
        // Initialize first slide
        showSlide(0);

        // Event listeners for buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        // Start auto slide
        startAutoSlide();
    }

    // ── Gallery hover play and lazy load ──
    var galleryVideos = document.querySelectorAll('.gallery-item video');

    // Lazy load videos
    var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var video = entry.target;
                var src = video.getAttribute('data-src');
                if (src && !video.src) {
                    video.querySelector('source').src = src;
                    video.load();
                }
                videoObserver.unobserve(video);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    galleryVideos.forEach(function (video) {
        videoObserver.observe(video);

        // Hover play/pause
        var item = video.parentElement;
        item.addEventListener('mouseenter', function () {
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
                video.play().catch(function () {
                    // Handle play promise rejection (e.g., user interaction required)
                });
            }
        });
        item.addEventListener('mouseleave', function () {
            video.pause();
        });
    });
})();