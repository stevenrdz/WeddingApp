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
          <a href="#hero">Inicio</a>
          <a href="#demo">Demo</a>
          <a href="#paquetes">Paquetes</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div class="hidden items-center gap-3 md:flex">
          <RouterLink class="btn-primary text-sm" to="/admin/login">Iniciar sesión</RouterLink>
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
          <a href="#hero" @click="isMobileMenuOpen = false">Inicio</a>
          <a href="#demo" @click="isMobileMenuOpen = false">Demo</a>
          <a href="#paquetes" @click="isMobileMenuOpen = false">Paquetes</a>
          <a href="#faq" @click="isMobileMenuOpen = false">FAQ</a>
          <RouterLink class="btn-primary text-sm" to="/admin/login" @click="isMobileMenuOpen = false">Iniciar sesión</RouterLink>
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
            Tu boda, elegante y organizada
          </h1>
          <p class="mx-auto max-w-2xl text-base text-white/85 md:text-lg">
            Comparte los detalles con tus invitados, confirma asistencia y crea una experiencia hermosa desde el primer día.
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
      <div class="container-safe grid gap-8 md:grid-cols-2">
        <div>
          <p class="section-title text-left">DEMO</p>
          <div class="ornament"></div>
          <h2 class="mt-4 font-heading text-3xl">Demo funcional</h2>
          <p class="mt-3 text-black/70">Prueba la experiencia completa con datos reales.</p>
        </div>
        <div class="flex items-center justify-start md:justify-end">
          <RouterLink class="btn-primary" to="/w/demo">Ir a /w/demo</RouterLink>
        </div>
      </div>
    </section>

    <section id="paquetes" class="section">
      <div class="container-safe">
        <div class="space-y-2">
          <p class="section-title">PAQUETES</p>
          <div class="ornament mx-auto"></div>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <div class="card">
            <h3 class="font-heading text-xl">Básico</h3>
            <p class="mt-2 text-black/70">Lo esencial para compartir tu boda con estilo.</p>
            <ul class="mt-5 space-y-2 text-sm text-black/70">
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Portada con mensaje y llamada a la acción</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Fecha y cuenta regresiva</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Ubicaciones con botón para ver el mapa</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>RSVP por WhatsApp</span>
              </li>
            </ul>
          </div>

          <div class="card border-primary">
            <div class="flex items-center justify-between gap-3">
              <h3 class="font-heading text-xl">Estándar</h3>
              <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Más elegido</span>
            </div>
            <p class="mt-2 text-black/70">Más secciones para una experiencia completa.</p>
            <ul class="mt-5 space-y-2 text-sm text-black/70">
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Todo lo del Básico</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Itinerario del evento</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Dress code y recomendaciones</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Galería, regalos y FAQ</span>
              </li>
            </ul>
          </div>

          <div class="card">
            <h3 class="font-heading text-xl">Premium</h3>
            <p class="mt-2 text-black/70">Una experiencia inolvidable, antes y durante la boda.</p>
            <ul class="mt-5 space-y-2 text-sm text-black/70">
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Todo lo del Estándar</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Galería colaborativa en vivo</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>QR para que invitados suban fotos en segundos</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-0.5 text-emerald-600">✓</span>
                <span>Panel privado para administrar la galería</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="section bg-white/60">
      <div class="container-safe">
        <div class="space-y-2">
          <p class="section-title">FAQ</p>
          <div class="ornament mx-auto"></div>
        </div>
        <div class="mt-6 grid gap-4">
          <details class="card scroll-mt-28 group" @toggle="handleFaqToggle">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span class="font-heading text-xl md:text-2xl">¿Cómo contrato mi página?</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <p class="mt-3 text-base text-black/70 md:text-lg">
              Escríbenos por WhatsApp o correo; elegimos el plan ideal y coordinamos la información de tu boda.
            </p>
          </details>

          <details class="card scroll-mt-28 group" @toggle="handleFaqToggle">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span class="font-heading text-xl md:text-2xl">¿Qué información necesito enviar?</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <p class="mt-3 text-base text-black/70 md:text-lg">
              Nombres, fecha, lugares, horarios, fotos y el mensaje que quieras compartir con tus invitados.
            </p>
          </details>

          <details class="card scroll-mt-28 group" @toggle="handleFaqToggle">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span class="font-heading text-xl md:text-2xl">¿Cómo se realiza el pago?</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <p class="mt-3 text-base text-black/70 md:text-lg">
              Aceptamos transferencia bancaria por Banco Pichincha o Produbanco. Te enviamos los datos al confirmar el servicio.
            </p>
          </details>
        </div>
      </div>
    </section>

    <footer class="border-t border-white/10 bg-[#2b241f] py-8 text-white/80">
      <div class="container-safe flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <div>Desarrollado por Steven Rodríguez, 2026</div>
        <div class="flex flex-wrap items-center gap-4">
          <RouterLink class="underline" to="/terminos">Términos y condiciones</RouterLink>
          <RouterLink class="underline" to="/privacidad">Políticas de privacidad</RouterLink>
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
