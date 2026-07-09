# FACTS-H Website — Mobile-Friendliness Fixes

Drop these 5 files into your existing `~/FACTSH/src` tree at the same paths
(they overwrite the current versions), then `npm run build` and deploy as usual.

I tested the site at 375px and 320px viewports (iPhone SE / small Android)
across every page — Home, Vision, News, Projects, Internship, Publications,
People, Gallery, Contact — and confirmed **zero horizontal overflow**
anywhere after these changes. Most of the site was already responsive from
earlier work (Card, CategoryCarousel, OrbitVision, DoorShell, Hero3D all
already handle mobile well with proper resize listeners and breakpoints).

## What changed

**1. `src/Content/slide.js` — real bug fix (not just mobile)**
The News page was crashing entirely (blank/broken on *all* screen sizes,
not just mobile) because it referenced `slider_img8.JPG` but the actual
file on disk is `slider_img8.jpg`. Fixed the casing. This is the same bug
from the earlier redesign session that apparently didn't make it into this
copy of the repo — worth double-checking your deployed version has this fix.

**2. `src/components/Navbar/navbar.css`**
The old CSS had a stray unscoped rule (`.nav-items{ display:flex!important }`)
that fought with the mobile dropdown menu. Replaced it with a properly
scoped rule, and made the mobile menu links full-width rows with real
padding so they're easier to tap and the menu scrolls if it's taller than
the screen.

**3. `src/components/ImageSlider/imageSlider.css`**
The legacy slide/arrow classes (unused by the current Bootstrap carousel,
but kept in case it's reused) had fixed 32px arrow offsets and 45px arrows
that would crowd a small screen. Added a `max-width: 600px` breakpoint to
shrink them. Also widened the Bootstrap carousel's prev/next tap targets
from 6% to 14% of width on small screens — 6% of a 375px screen is a
~22px-wide tap zone, too thin for a thumb.

**4. `src/components/NewsScroll/newsscroll.css`**
Reduced the parchment scroll's side padding on screens under 480px so body
text isn't squeezed into a narrow column.

**5. `src/Pages/Contacts/Contact.js`**
Added a `title` attribute to the map iframe — accessibility fix (was
throwing an ESLint warning that fails strict/CI builds).

## Verified via headless browser
- No element inside the page content overflows its container at 375px or
  320px on any route.
- Mobile nav menu opens as a clean full-width list with proper tap targets.
- Hero3D and OrbitVision (Three.js) already resize correctly via
  `ResizeObserver` — no changes needed there.
