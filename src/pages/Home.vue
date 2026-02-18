<template>
  <main class="min-h-screen">
    <header
      :class="[
        'fixed left-0 right-0 top-0 z-40 transition-colors duration-300',
        isScrolled ? 'border-b border-black/5 bg-white/90 backdrop-blur' : 'border-b border-transparent bg-transparent'
      ]"
    >
      <div class="container-safe flex items-center justify-between py-4">
        <div class="flex items-center gap-3">
          <RouterLink :class="['font-heading text-lg tracking-widest', isScrolled ? 'text-black' : 'text-white']" to="/">
            Provenza
          </RouterLink>
        </div>
        <nav :class="['hidden gap-6 text-sm md:flex', isScrolled ? 'text-black/80' : 'text-white/90']">
          <a href="#hero">{{ t.navHome }}</a>
          <a href="#demo">{{ t.navDemo }}</a>
          <a href="#paquetes">{{ t.navPackages }}</a>
          <a href="#faq">{{ t.navFaq }}</a>
        </nav>
        <div class="hidden items-center gap-3 md:flex">
          <div class="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-2 py-1 text-xs font-semibold text-black/70">
            <button
              class="rounded-full px-2 py-1"
              :class="locale === 'es' ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5'"
              type="button"
              @click="setLocale('es')"
            >
              ES
            </button>
            <button
              class="rounded-full px-2 py-1"
              :class="locale === 'en' ? 'bg-black text-white' : 'text-black/70 hover:bg-black/5'"
              type="button"
              @click="setLocale('en')"
            >
              EN
            </button>
          </div>
          <a class="btn-primary text-sm" :href="whatsAppLink" target="_blank" rel="noreferrer">
            {{ t.ctaWhatsapp }}
          </a>
        </div>
        <button
          :class="[
            'inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden',
            isScrolled ? 'border-black/10 text-black/70 hover:bg-black/5' : 'border-white/30 text-white hover:bg-white/10'
          ]"
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Abrir menú"
        >
          <svg v-if="!isMobileMenuOpen" aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 stroke-current" fill="none" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 stroke-current" fill="none" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>
      <div v-if="isMobileMenuOpen" class="border-t border-black/5 bg-white/95 md:hidden">
        <nav class="container-safe flex flex-col gap-3 py-4 text-sm text-black/80">
          <a href="#hero" @click="isMobileMenuOpen = false">{{ t.navHome }}</a>
          <a href="#demo" @click="isMobileMenuOpen = false">{{ t.navDemo }}</a>
          <a href="#paquetes" @click="isMobileMenuOpen = false">{{ t.navPackages }}</a>
          <a href="#faq" @click="isMobileMenuOpen = false">{{ t.navFaq }}</a>
          <div class="flex items-center gap-2">
            <button
              class="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold"
              :class="locale === 'es' ? 'bg-black text-white' : 'bg-white text-black/70'"
              type="button"
              @click="setLocale('es')"
            >
              ES
            </button>
            <button
              class="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold"
              :class="locale === 'en' ? 'bg-black text-white' : 'bg-white text-black/70'"
              type="button"
              @click="setLocale('en')"
            >
              EN
            </button>
          </div>
          <a class="btn-primary text-sm" :href="whatsAppLink" target="_blank" rel="noreferrer" @click="isMobileMenuOpen = false">
            {{ t.ctaWhatsapp }}
          </a>
        </nav>
      </div>
    </header>

    <section
      id="hero"
      class="relative min-h-screen overflow-hidden hero-surface bg-cover bg-center bg-scroll text-white"
      :style="heroBackgroundStyle"
      ref="heroRef"
    >
      <div class="pointer-events-none absolute inset-0 bg-black/25"></div>
      <div v-if="heroAttribution" class="pointer-events-none absolute inset-x-0 bottom-4">
        <div class="container-safe flex justify-end">
          <p class="pointer-events-auto rounded-full bg-black/40 px-4 py-2 text-xs text-white/90 backdrop-blur">
            Foto por
            <a class="underline" :href="heroAttribution.authorUrl" target="_blank" rel="noreferrer">
              {{ heroAttribution.authorName }}
            </a>
            en
            <a class="underline" :href="heroAttribution.unsplashUrl" target="_blank" rel="noreferrer">
              Unsplash
            </a>
          </p>
        </div>
      </div>
      <div class="relative z-10 container-safe flex min-h-screen flex-col items-center justify-center gap-8 pb-16 pt-24 text-center">
        <div class="space-y-5">
          <div class="ornament mx-auto" aria-hidden="true"></div>
          <h1 class="font-heading text-4xl font-semibold md:text-6xl">
            {{ t.heroTitle }}
          </h1>
          <p class="mx-auto max-w-2xl text-base text-white/85 md:text-lg">
            {{ t.heroSubtitle }}
          </p>
        </div>
        <button
          type="button"
          class="mt-2 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/80"
          @click="scrollToDemo"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-6 w-6 text-white/80">
            <path
              d="M12 5v14m0 0l-5-5m5 5l5-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Explora
        </button>
      </div>
    </section>

    <section id="demo" ref="demoRef" class="section bg-white/60">
      <div class="container-safe grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p class="section-title text-left">DEMO</p>
          <div class="ornament"></div>
          <h2 class="mt-4 font-heading text-3xl">{{ t.demoTitle }}</h2>
          <p class="mt-3 text-black/70">
            {{ t.demoSubtitle }}
          </p>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-black/70 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">{{ t.demoCard1Title }}</p>
              <p class="mt-2">{{ t.demoCard1Body }}</p>
            </div>
            <div class="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-black/70 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">{{ t.demoCard2Title }}</p>
              <p class="mt-2">{{ t.demoCard2Body }}</p>
            </div>
            <div class="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-black/70 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">{{ t.demoCard3Title }}</p>
              <p class="mt-2">{{ t.demoCard3Body }}</p>
            </div>
            <div class="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-black/70 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">{{ t.demoCard4Title }}</p>
              <p class="mt-2">{{ t.demoCard4Body }}</p>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <RouterLink class="btn-primary" to="/w/demo">{{ t.demoCtaPrimary }}</RouterLink>
            <a class="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-black/70" :href="whatsAppLink" target="_blank" rel="noreferrer">{{ t.ctaWhatsapp }}</a>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg">
            <div class="relative h-52 bg-slate-900">
              <img class="h-full w-full object-cover opacity-90" src="/hero-fallback.jpg" alt="Preview demo" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
              <div class="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black/70">
                {{ t.demoPreviewLabel }}
              </div>
            </div>
            <div class="space-y-4 px-5 py-4 text-sm text-black/70">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">{{ t.demoIncludesTitle }}</p>
                <ul class="mt-2 space-y-2">
                  <li>{{ t.demoIncludes1 }}</li>
                  <li>{{ t.demoIncludes2 }}</li>
                  <li>{{ t.demoIncludes3 }}</li>
                </ul>
              </div>
              <RouterLink class="inline-flex items-center gap-2 text-sm font-semibold text-black underline" to="/w/demo">
                {{ t.demoCtaSecondary }}
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="paquetes" class="section">
      <div class="container-safe">
        <div class="space-y-2">
          <p class="section-title">{{ t.packagesTitle }}</p>
          <div class="ornament mx-auto"></div>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <div class="card">
            <h3 class="font-heading text-xl">{{ t.packBasicTitle }}</h3>
            <p class="mt-2 text-black/70">{{ t.packBasicSubtitle }}</p>
            <ul class="mt-5 space-y-2 text-sm text-black/70">
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packBasicItem1 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packBasicItem2 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packBasicItem3 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packBasicItem4 }}</span>
              </li>
            </ul>
          </div>

          <div class="card border-primary">
            <div class="flex items-center justify-between gap-3">
              <h3 class="font-heading text-xl">{{ t.packStandardTitle }}</h3>
              <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{{ t.packStandardBadge }}</span>
            </div>
            <p class="mt-2 text-black/70">{{ t.packStandardSubtitle }}</p>
            <ul class="mt-5 space-y-2 text-sm text-black/70">
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packStandardItem1 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packStandardItem2 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packStandardItem3 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packStandardItem4 }}</span>
              </li>
            </ul>
          </div>

          <div class="card">
            <h3 class="font-heading text-xl">{{ t.packPremiumTitle }}</h3>
            <p class="mt-2 text-black/70">{{ t.packPremiumSubtitle }}</p>
            <ul class="mt-5 space-y-2 text-sm text-black/70">
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packPremiumItem1 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packPremiumItem2 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packPremiumItem3 }}</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>{{ t.packPremiumItem4 }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="section bg-white/60">
      <div class="container-safe">
        <div class="space-y-2">
          <p class="section-title">{{ t.faqTitle }}</p>
          <div class="ornament mx-auto"></div>
        </div>
        <div class="mt-6 grid gap-4">
          <details class="card scroll-mt-28 group" @toggle="handleFaqToggle">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span class="font-heading text-xl md:text-2xl">{{ t.faqQ1 }}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <p class="mt-3 text-base text-black/70 md:text-lg">
              {{ t.faqA1 }}
            </p>
          </details>

          <details class="card scroll-mt-28 group" @toggle="handleFaqToggle">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span class="font-heading text-xl md:text-2xl">{{ t.faqQ2 }}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <p class="mt-3 text-base text-black/70 md:text-lg">
              {{ t.faqA2 }}
            </p>
          </details>

          <details class="card scroll-mt-28 group" @toggle="handleFaqToggle">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span class="font-heading text-xl md:text-2xl">{{ t.faqQ3 }}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <p class="mt-3 text-base text-black/70 md:text-lg">
              {{ t.faqA3 }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <footer class="border-t border-white/10 bg-[#2b241f] py-8 text-white/80">
      <div class="container-safe flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <div>{{ t.footerByline }}</div>
        <div class="flex flex-wrap items-center gap-4">
          <RouterLink class="underline" to="/Términos">{{ t.footerTerms }}</RouterLink>
          <RouterLink class="underline" to="/privacidad">{{ t.footerPrivacy }}</RouterLink>
          <a class="inline-flex items-center" href="#" aria-label="Facebook">
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
              <path
                d="M13.5 9.5V7.9c0-.8.5-1 1.2-1H16V4h-2.3C11.8 4 11 5.1 11 6.8v2.7H9v3h2v7h3.2v-7h2.4l.4-3h-2.8Z"
              />
            </svg>
          </a>
          <a class="inline-flex items-center" href="#" aria-label="Instagram">
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
              <path
                d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
              />
            </svg>
          </a>
          <a class="inline-flex items-center" href="#" aria-label="TikTok">
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
              <path
                d="M16 4c.4 1.7 1.7 3 3.4 3.4V10c-1.4 0-2.7-.4-3.4-1.2v6.4a5 5 0 1 1-5-5c.3 0 .6 0 .9.1v2.8a2.2 2.2 0 1 0 2.2 2.2V4h2.9Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

type UnsplashPhoto = {
  urls: { regular: string };
  links: { download_location: string; html: string };
  user: { name: string; links: { html: string } };
};

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined;
const fallbackHeroUrl = "/hero-fallback.jpg";
const heroPhotoUrl = ref<string>(fallbackHeroUrl);
const heroAttribution = ref<{ authorName: string; authorUrl: string; unsplashUrl: string } | null>(null);
const downloadTracked = ref(false);
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const heroRef = ref<HTMLElement | null>(null);
const demoRef = ref<HTMLElement | null>(null);
const heroCacheKey = "weddingapp:hero-photo";
const heroCacheTtlMs = 7 * 24 * 60 * 60 * 1000;
const localeKey = "weddingapp:locale";
const locale = ref<"es" | "en">("es");

const messages = {
  es: {
    navHome: "Inicio",
    navDemo: "Demo",
    navPackages: "Paquetes",
    navFaq: "FAQ",
    ctaWhatsapp: "Escríbenos por WhatsApp",
    heroTitle: "Tu boda, tan única como ustedes",
    heroSubtitle: "Comparte cada detalle con tus invitados y crea un recuerdo hermoso desde el primer día.",
    heroCta: "Explora",
    demoTitle: "Una demo pensada para tu boda",
    demoSubtitle: "Un sitio para compartir con tus invitados y guiarlos con cariño en cada momento.",
    demoCard1Title: "Todo en un solo link",
    demoCard1Body: "Fecha, horarios y ubicaciones claras para todos.",
    demoCard2Title: "RSVP por WhatsApp",
    demoCard2Body: "Tus invitados confirman con un solo mensaje.",
    demoCard3Title: "Diseño romántico",
    demoCard3Body: "Se ve hermoso en móvil y en escritorio.",
    demoCard4Title: "Comparte con amor",
    demoCard4Body: "Envía el link y todos lo tienen a mano.",
    demoCtaPrimary: "Ver demo",
    demoCtaSecondary: "Explorar demo",
    demoPreviewLabel: "Vista previa",
    demoIncludesTitle: "Incluye",
    demoIncludes1: "Portada con mensaje de la pareja",
    demoIncludes2: "Mapa con botón a Google Maps",
    demoIncludes3: "RSVP por WhatsApp + galería",
    packagesTitle: "PAQUETES",
    packBasicTitle: "Básico",
    packBasicSubtitle: "Lo esencial para compartir tu boda con estilo.",
    packBasicItem1: "Portada con mensaje y llamada a la acción",
    packBasicItem2: "Fecha y cuenta regresiva",
    packBasicItem3: "Ubicaciones con botón para ver el mapa",
    packBasicItem4: "RSVP por WhatsApp",
    packStandardTitle: "Estándar",
    packStandardBadge: "Más elegido",
    packStandardSubtitle: "Más secciones para una experiencia completa.",
    packStandardItem1: "Todo lo del Básico",
    packStandardItem2: "Itinerario del evento",
    packStandardItem3: "Dress code y recomendaciones",
    packStandardItem4: "Galería, regalos y FAQ",
    packPremiumTitle: "Premium",
    packPremiumSubtitle: "Una experiencia inolvidable, antes y durante la boda.",
    packPremiumItem1: "Todo lo del Estándar",
    packPremiumItem2: "Galería colaborativa en vivo",
    packPremiumItem3: "QR para que invitados suban fotos en segundos",
    packPremiumItem4: "Panel privado para administrar la galería",
    faqTitle: "FAQ",
    faqQ1: "¿Cómo contrato mi página?",
    faqA1: "Escríbenos por WhatsApp y coordinamos la información de tu boda.",
    faqQ2: "¿Qué información necesito enviar?",
    faqA2: "Nombres, fecha, lugares, horarios, fotos y el mensaje que quieras compartir con tus invitados.",
    faqQ3: "¿Cómo se realiza el pago?",
    faqA3: "Aceptamos transferencia bancaria. Te enviamos los datos al confirmar el servicio.",
    footerByline: "Hecho con cariño en Ecuador",
    footerTerms: "Términos y condiciones",
    footerPrivacy: "Políticas de privacidad",
    waMessage: "Hola, quiero mi sitio de boda."
  },
  en: {
    navHome: "Home",
    navDemo: "Demo",
    navPackages: "Packages",
    navFaq: "FAQ",
    ctaWhatsapp: "Chat on WhatsApp",
    heroTitle: "Your wedding, as unique as your love",
    heroSubtitle: "Share every detail with your guests and keep a beautiful memory from day one.",
    heroCta: "Explore",
    demoTitle: "A demo made for your wedding",
    demoSubtitle: "A site designed to enchant and guide your guests through every moment.",
    demoCard1Title: "All in one link",
    demoCard1Body: "Dates, times, and locations in one place.",
    demoCard2Title: "Instant RSVP",
    demoCard2Body: "Confirm attendance on WhatsApp in seconds.",
    demoCard3Title: "Elegant design",
    demoCard3Body: "Looks beautiful on mobile and desktop.",
    demoCard4Title: "Easy to share",
    demoCard4Body: "Send the link and everyone has it.",
    demoCtaPrimary: "View demo",
    demoCtaSecondary: "Explore demo",
    demoPreviewLabel: "Preview",
    demoIncludesTitle: "Includes",
    demoIncludes1: "Cover with your story",
    demoIncludes2: "Map button to Google Maps",
    demoIncludes3: "WhatsApp RSVP + gallery",
    packagesTitle: "PACKAGES",
    packBasicTitle: "Basic",
    packBasicSubtitle: "The essentials to share your wedding with style.",
    packBasicItem1: "Cover with your message and CTA",
    packBasicItem2: "Date and countdown",
    packBasicItem3: "Locations with map button",
    packBasicItem4: "WhatsApp RSVP",
    packStandardTitle: "Standard",
    packStandardBadge: "Most chosen",
    packStandardSubtitle: "More sections for a complete experience.",
    packStandardItem1: "Everything in Basic",
    packStandardItem2: "Event timeline",
    packStandardItem3: "Dress code and tips",
    packStandardItem4: "Gallery, gifts, and FAQ",
    packPremiumTitle: "Premium",
    packPremiumSubtitle: "An unforgettable experience, before and during the wedding.",
    packPremiumItem1: "Everything in Standard",
    packPremiumItem2: "Live collaborative gallery",
    packPremiumItem3: "QR for guests to upload photos",
    packPremiumItem4: "Private gallery admin panel",
    faqTitle: "FAQ",
    faqQ1: "How do I get my website?",
    faqA1: "Chat with us on WhatsApp and we will coordinate your wedding details.",
    faqQ2: "What information do I need to send?",
    faqA2: "Names, date, locations, schedule, photos, and your message to guests.",
    faqQ3: "How do I pay?",
    faqA3: "We accept bank transfer. We will send the details after confirmation.",
    footerByline: "Made with love in Ecuador",
    footerTerms: "Terms and conditions",
    footerPrivacy: "Privacy policy",
    waMessage: "Hi, I want my wedding website."
  }
} as const;

const t = computed(() => messages[locale.value]);
const whatsAppNumber = "593991306795";
const whatsAppLink = computed(() => `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(t.value.waMessage)}`);

function setLocale(value: "es" | "en") {
  locale.value = value;
  try {
    localStorage.setItem(localeKey, value);
  } catch {
    // ignore storage errors
  }
}

const heroBackgroundStyle = computed(() => {
  if (!heroPhotoUrl.value) return undefined;
  return { backgroundImage: `url('${heroPhotoUrl.value}')`, backgroundPosition: "center center" };
});

async function trackDownload(downloadUrl: string) {
  if (!accessKey || downloadTracked.value) return;
  downloadTracked.value = true;
  try {
    await fetch(downloadUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1"
      }
    });
  } catch {
    // ignore download tracking errors
  }
}

type HeroCache = {
  photoUrl: string;
  attribution: { authorName: string; authorUrl: string; unsplashUrl: string };
  fetchedAt: number;
};

function readHeroCache(): HeroCache | null {
  try {
    const raw = localStorage.getItem(heroCacheKey);
    if (!raw) return null;
    const data = JSON.parse(raw) as HeroCache;
    if (!data?.photoUrl || !data?.attribution?.authorName || !data?.fetchedAt) return null;
    if (Date.now() - data.fetchedAt > heroCacheTtlMs) return null;
    return data;
  } catch {
    return null;
  }
}

function writeHeroCache(cache: HeroCache) {
  try {
    localStorage.setItem(heroCacheKey, JSON.stringify(cache));
  } catch {
    // ignore storage errors
  }
}

async function loadHeroPhoto() {
  if (!accessKey) return;
  const cached = readHeroCache();
  if (cached) {
    heroPhotoUrl.value = cached.photoUrl;
    heroAttribution.value = cached.attribution;
    return;
  }
  try {
    const res = await fetch(
      "https://api.unsplash.com/photos/random?query=wedding&orientation=landscape&content_filter=high",
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          "Accept-Version": "v1"
        }
      }
    );
    if (!res.ok) return;
    const photo = (await res.json()) as UnsplashPhoto;
    const attribution = {
      authorName: photo.user.name,
      authorUrl: `${photo.user.links.html}?utm_source=weddingapp&utm_medium=referral`,
      unsplashUrl: `${photo.links.html}?utm_source=weddingapp&utm_medium=referral`
    };
    heroPhotoUrl.value = photo.urls.regular;
    heroAttribution.value = attribution;
    writeHeroCache({
      photoUrl: photo.urls.regular,
      attribution,
      fetchedAt: Date.now()
    });
    await trackDownload(photo.links.download_location);
  } catch {
    // ignore fetch errors
  }
}

onMounted(() => {
  heroPhotoUrl.value = fallbackHeroUrl;
  loadHeroPhoto();
});

onMounted(() => {
  try {
    const saved = localStorage.getItem(localeKey);
    if (saved === "es" || saved === "en") locale.value = saved;
  } catch {
    // ignore storage errors
  }
});

function scrollToDemo() {
  demoRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleFaqToggle(event: Event) {
  const target = event.currentTarget as HTMLDetailsElement | null;
  if (target?.open) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10;
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>














