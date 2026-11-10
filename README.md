# Inception Technology Website

A modern, responsive, high-converting landing page for Inception Technology software house.

---

## 📁 File Structure

```text
abd/
├── index.html          # Main HTML structure with all sections & modals
├── favicon.svg         # Modern branded SVG tab icon
├── server.js           # Lightweight local Node.js HTTP server
├── README.md           # Documentation & instructions
│
├── css/
│   └── style.css       # Clean White/Gray theme, #A068FD gradients, responsive layout & animations
│
├── js/
│   └── script.js       # Sliders, particles, filters, accordion, modals, toast & WhatsApp integration
│
└── images/
    └── slider-web.svg  # High-res vector illustration for hero slider
```

---

## 🚀 Key Features

1. **Header & Navigation**:
   - Glassmorphism sticky header with dynamic scroll shadow.
   - Mobile responsive burger menu.
   - Interactive scroll-spy highlighting active sections.

2. **Hero Section**:
   - **Left**: Multi-slide showcase slider with auto-rotation, navigation controls, and floating frosted glass chips (`Web & Mobile`, `AI Solutions`, `24/7 Support`).
   - **Right**: Dark tech gradient (`#181B43` to `#0A1331`) with interactive floating canvas particles, bold typography, glowing gradient text, and live count-up stats.

3. **Technologies We Work With (Interactive Marquee Slider)**:
   - Placed directly beneath the Hero section.
   - Continuous smooth infinite slider featuring `Node.js`, `WordPress`, `Flutter`, `Python AI`, `Laravel`, `Figma`, `AWS`, `React`, `Next.js`, `PostgreSQL`, `Docker`.
   - Hover-to-pause functionality for seamless interaction.
   - **Click-to-Activate Color Change**: Clicking any technology turns its color, SVG icon, and glowing border into brand `#A068FD`!

4. **Services Grid**:
   - 7 custom services + 1 highlighted custom CTA card (`#A068FD` gradient).
   - "🔥 Most Popular" badge on Web Development & "⚡ Trending" badge on AI Solutions.
   - Crisp 3-point feature checklist with green checkmark SVG icons on every service card.
   - Tech stack tags for each service (`React`, `Next.js`, `Flutter`, `Figma`, etc.).
   - "Learn More" links that pre-select that service inside the Quote Modal.

5. **Connected Hexagons Flow (CodeEnter-Inspired Solutions Showcase)**:
   - Heading: `Delivering Intelligent & Tailored Digital Solutions` with `— WHY CHOOSE INCEPTION TECHNOLOGY —`.
   - 4 connected steps: `01 Agentic AI Systems`, `02 Custom Software`, `03 Seamless Integration`, `04 Scalable & Secure`.
   - Connected with animated curved dashed wave lines (`flow-connector`).
   - **Interactive #A068FD Hover**: Hovering over any card turns the watermark number, hexagon badge, and title to `#A068FD`, while the SVG icon rotates and turns pure white `#FFFFFF` with glowing shadow!

6. **Why Choose Us Section**:
   - Vibrant `#A068FD` animated gradient background (`animation: whyGradMove`).
   - Floating glowing orbs and subtle grid pattern.
   - Interactive frosted glass cards that invert to solid white on hover.

7. **Our 4-Step Development Process**:
   - Step 1: Discovery & Strategy (`⏱️ Days 1 - 3`)
   - Step 2: UI/UX Prototyping (`⏱️ Days 4 - 8`)
   - Step 3: Agile Development (`⏱️ Weeks 2 - 4`)
   - Step 4: Testing & Deployment (`⏱️ Final Testing & Launch`)

8. **Filterable Portfolio**:
   - Category filter tabs (`All`, `Web`, `Mobile Apps`, `UI/UX`, `AI`).
   - Realistic mockups (SaaS dashboard, Mobile food app, Real estate portal, Banking fintech card, ERP analytics, AI chat bot).
   - Outcome & Result Metric Pills (`📈 +240% Sales Growth`, `🛵 50K+ Active Users`, etc.).
   - Quick View preview modal for each project.

9. **Client Reviews & Testimonials**:
   - 5-second auto-play slider with previous/next controls and dots.
   - "✓ Verified Client" badges for all reviewers.
   - High-contrast rating badge (`★ 4.9/5`).
   - Branded **Trusted Logos Strip** with `#A068FD` to `#7A6CFA` gradient and glowing white logos.

10. **High-Tech Inset Footer (CodeEnter-Inspired Architecture)**:
   - **Curved Inset Architecture**: 50px rounded top container floating cleanly on top of a pure white background wrap, matching modern tech enterprise standards.
   - **Corner Ambient Orb**: Soft glowing circular orb nestled in the top-left corner with crisp 34px tech grid mesh lines.
   - **High-Tech Radar & Sonar Geometry**: Concentric sonar pulsing rings (`footerSonarPulse`), rotating dashed middle ring, floating bullseye target, and orbital dots & rings.
   - **Quick Contact Cards Bar**: 3 frosted glass cards for instant Phone call, Email dispatch, and Working Hours.
   - **Brand Dot Accent**: Pulsing emerald green live status dot on the brand logo.
   - **Live Status Ribbon**: Pulsing green availability dot + real-time Pakistan (PKT) clock auto-updating every second + 4.9/5 global rating.
   - **Trust & Security Badges**: 256-Bit SSL, 99.9% Cloud Uptime, NDA Protected, 100% Satisfaction, Agile Scrum Certified.
   - **Bottom Navigation Bar**: Complete footer directory links with animated hover transitions.

11. **Lead Generation & Contact**:
   - Interactive **Get a Free Quote** modal popup.
   - **Direct WhatsApp Submit Button**: Automatically pre-fills form details into a WhatsApp message.
   - **Floating WhatsApp Button**: Pulsating chat trigger on bottom-left.
   - Top Scroll Progress Bar (`#scrollProgress`).
   - Back to Top floating button with SVG circular scroll progress ring.

---

## 🛠️ How to Customize Your Content

### 1. Hero Slider Images
To use your own images in the left-side slider, open `index.html` around line 70 and replace or add an `<img>` tag inside any `.hslide`:
```html
<div class="hslide active">
  <img src="images/your-photo.jpg" class="hslide-img" alt="Slide description">
</div>
```

### 2. Contact Information & WhatsApp Number
In `index.html`:
- **WhatsApp links**: Replace `923000000000` with your actual WhatsApp phone number (in international format without `+` or spaces, e.g. `923123456789`).
- **Phone Number**: Search for `+92 300 0000000` and update with your office line.
- **Email Address**: Search for `info@inceptiontechnology.com` and replace with your corporate email.
- **Office Location**: Search for `Islamabad / Lahore, Pakistan` and update with your address.

---

## 🌐 Running Locally
The site runs on a built-in lightweight Node server:
```bash
node server.js
```
Open **http://localhost:3000** in your browser. Or double-click `index.html` to open directly.

---

## 🚀 Free Deployment Guide

### Option A: Netlify (Easiest)
1. Go to [netlify.com](https://www.netlify.com/) and log in.
2. Drag and drop the `abd` folder into the Netlify Drop area.
3. Your website will be live in 5 seconds with a free SSL certificate!

### Option B: Vercel
1. Install Vercel CLI or upload to GitHub.
2. In terminal: `npx vercel`
3. Follow the 2-step prompt to get a live URL.

### Option C: GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
