/* ==========================================================================
   WARM WEAVE HILL - INTERACTIVE SOCKS & KNITWEAR CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Controller
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const headerBtn = item.querySelector('.faq-header');
        headerBtn?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const body = otherItem.querySelector('.faq-body');
                if (body) body.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.faq-body');
                if (body) body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstBody = faqItems[0].querySelector('.faq-body');
        if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }

    // 2. Interactive Warmth & Cushioning Selector
    const fiberBtns = document.querySelectorAll('[data-selector-fiber]');
    const cushionBtns = document.querySelectorAll('[data-selector-cushion]');
    const heightBtns = document.querySelectorAll('[data-selector-height]');
    const summaryFiber = document.getElementById('summary-fiber');
    const summaryCushion = document.getElementById('summary-cushion');
    const summaryHeight = document.getElementById('summary-height');
    const summaryRating = document.getElementById('summary-rating');
    const previewImg = document.getElementById('selector-preview-image');

    const ratings = {
        'Ultra-Plush Heavy Cushion': 'TOG 3.4 (Extreme Sub-Zero Thermal)',
        'Medium Terry Loop Cushion': 'TOG 2.1 (Alpine Trail & All-Day Wear)',
        'Zero-Bulk Featherweight': 'TOG 1.2 (Breathable Everyday Dress)'
    };

    let currentSelection = {
        fiber: '18.5µm Australian Merino Wool',
        cushion: 'Ultra-Plush Heavy Cushion',
        height: 'Classic Boot Crew Height'
    };

    function updateRating() {
        const rate = ratings[currentSelection.cushion] || 'TOG 2.5 (Optimal Winter Thermal)';
        if (summaryRating) summaryRating.textContent = rate;
    }

    fiberBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fiberBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSelection.fiber = btn.dataset.selectorFiber;
            if (summaryFiber) summaryFiber.textContent = currentSelection.fiber;
            
            if (btn.dataset.imgSrc && previewImg) {
                previewImg.style.opacity = '0.3';
                setTimeout(() => {
                    previewImg.src = btn.dataset.imgSrc;
                    previewImg.style.opacity = '1';
                }, 200);
            }
        });
    });

    cushionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cushionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSelection.cushion = btn.dataset.selectorCushion;
            if (summaryCushion) summaryCushion.textContent = currentSelection.cushion;
            updateRating();
        });
    });

    heightBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            heightBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSelection.height = btn.dataset.selectorHeight;
            if (summaryHeight) summaryHeight.textContent = currentSelection.height;
        });
    });

    // 3. Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const orig = btn.innerHTML;
                btn.innerHTML = 'Knitting Dispatch...';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = 'Warmth Dispatch Confirmed!';
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = orig;
                        btn.disabled = false;
                    }, 4000);
                }, 800);
            }
        });
    });
});
