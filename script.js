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