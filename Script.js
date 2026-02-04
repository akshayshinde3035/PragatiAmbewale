// Pragati Foods - Gallery & small helpers



// Footer year helper (optional)

(function() {

  var yearEl = document.getElementById('year');

  if (yearEl) {

    yearEl.textContent = new Date().getFullYear();

  }

})();



// Ensure a visible "Gallery" link appears in the header pills

document.addEventListener('DOMContentLoaded', function() {

  try {

    // Mobile menu toggle: show pills only when tapped

    var toggle = document.querySelector('.mobile-nav-toggle');

    var header = document.querySelector('.site-header');

    if (toggle && header) {

      toggle.addEventListener('click', function(){

        var expanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');

        document.body.classList.toggle('mobile-menu-open', !expanded);

      });



      // Reset menu state on resize: only hide pills on small screens

      function syncMenuToViewport(){

        if (window.innerWidth <= 768) {

          // Ensure closed on load/refresh unless user opens it

          toggle.setAttribute('aria-expanded', 'false');

          document.body.classList.remove('mobile-menu-open');

        } else {

          // Desktop: always show pills; remove any mobile-open state

          toggle.setAttribute('aria-expanded', 'false');

          document.body.classList.remove('mobile-menu-open');

        }

      }

      // Run at start and on resize

      syncMenuToViewport();

      window.addEventListener('resize', syncMenuToViewport);

    }

    var pills = document.querySelector('.hero-links.header-pills');

    if (pills) {

      // If a Gallery link isn't present, add it

      var galleryLink = pills.querySelector('a[href="#gallery"]');

      if (!galleryLink) {

        var a = document.createElement('a');

        a.href = '#gallery';

        a.className = 'pill';

        a.textContent = 'Gallery';

        // Place it before Contact if possible, else append

        var contactLink = pills.querySelector('a[href="#contact"]');

        if (contactLink && contactLink.parentNode === pills) {

          pills.insertBefore(a, contactLink);

        } else {

          pills.appendChild(a);

        }

      }

    }



    // Note: Do not auto-inject a Gallery button into the hero-cta.

    // The header pill provides navigation to the gallery, and the hero should stay clean.

  } catch (e) {

    // Silently ignore to avoid breaking page if DOM structure changes

    console && console.warn && console.warn('Gallery link injection skipped:', e);

  }



  // Fallback: ensure gallery stage has a visible height if CSS failed

  try {

    var stage = document.querySelector('.gallery-stage');

    if (stage) {

      var h = stage.offsetHeight;

      if (!h || h < 50) {

        stage.style.height = '540px';

        stage.style.background = '#000';

        stage.style.border = '1px solid #222';

      }

    }

  } catch (e) {

    console && console.warn && console.warn('Stage fallback skipped:', e);

  }



  // Fallback: build gallery DOM if #gallery exists but stage is missing

  try {

    var gallerySection = document.querySelector('section#gallery.content-section.alt-bg');

    if (gallerySection) {

      var container = gallerySection.querySelector('.container') || gallerySection;

      var carousel = container.querySelector('.gallery-carousel');

      var stageEl = container.querySelector('.gallery-stage');

      var thumbsEl = container.querySelector('.gallery-thumbs');

      if (!carousel) {

        carousel = document.createElement('div');

        carousel.className = 'gallery-carousel';

        container.appendChild(carousel);

      }

      if (!stageEl) {

        // add arrows, stage, and image

        var prev = document.createElement('button');

        prev.className = 'gallery-btn prev';

        prev.setAttribute('aria-label', 'Previous image');

        prev.innerHTML = '&#10094;';

        var stageDiv = document.createElement('div');

        stageDiv.className = 'gallery-stage';

        var img = document.createElement('img');

        img.id = 'gallery-image';

        img.src = 'herocover.png';

        img.alt = 'Gallery image';

        stageDiv.appendChild(img);

        var next = document.createElement('button');

        next.className = 'gallery-btn next';

        next.setAttribute('aria-label', 'Next image');

        next.innerHTML = '&#10095;';

        carousel.appendChild(prev);

        carousel.appendChild(stageDiv);

        carousel.appendChild(next);

      }

      if (!thumbsEl) {

        thumbsEl = document.createElement('div');

        thumbsEl.className = 'gallery-thumbs';

        container.appendChild(thumbsEl);

        var files = ['madhuramras.jpeg','FrozenSitafal.webp','anjir.webp','Frozen green peas.jpeg','Frozen Seet Corn.jpeg','Frozen Mix veg.jpeg','cover.png','aamras.jpeg'];

        files.forEach(function(src, idx){

          var t = document.createElement('img');

          t.className = 'thumb';

          t.src = src;

          t.alt = 'Preview ' + (idx + 1);

          t.style.width = '90px';

          t.style.height = '60px';

          thumbsEl.appendChild(t);

        });

      }

    }

  } catch (e) {

    console && console.warn && console.warn('Gallery build fallback skipped:', e);

  }

});



