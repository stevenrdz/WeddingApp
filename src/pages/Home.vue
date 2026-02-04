<template>
  <main class="min-h-screen">
    <section class="relative overflow-hidden hero-surface text-white">
      <div class="container-safe section">
        <div class="grid gap-10 lg:grid-cols-2">
          <div class="space-y-6">
            <span class="badge bg-white/10 text-white">SaaS para bodas</span>
            <div class="space-y-3">
              <div class="ornament" aria-hidden="true"></div>
              <h1 class="font-heading text-4xl font-semibold md:text-6xl">Tu boda en un solo lugar</h1>
            </div>
            <p class="text-lg text-white/80">
              Plantillas elegantes, RSVP sin friccion y datos por slug. Lista para escalar.
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink class="btn-primary" to="/w/demo">Ver demo</RouterLink>
              <a class="btn-outline" href="#paquetes">Ver paquetes</a>
            </div>
          </div>
          <div class="panel-glass">
            <h3 class="font-heading text-2xl">Incluye</h3>
            <ul class="mt-4 space-y-3 text-white/80">
              <li>Multi-tenant con slug</li>
              <li>RSVP WhatsApp o Netlify Forms</li>
              <li>SEO dinamico por boda</li>
              <li>Galeria con lightbox</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="demo" class="section bg-white/60">
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
            <h3 class="font-heading text-xl">Basico</h3>
            <p class="mt-2 text-black/70">Landing + RSVP WhatsApp</p>
            <p class="mt-4 text-2xl font-semibold">$199</p>
          </div>
          <div class="card border-primary">
            <h3 class="font-heading text-xl">Estandar</h3>
            <p class="mt-2 text-black/70">Todo Basico + galeria</p>
            <p class="mt-4 text-2xl font-semibold">$299</p>
          </div>
          <div class="card">
            <h3 class="font-heading text-xl">Premium</h3>
            <p class="mt-2 text-black/70">Netlify Forms + personalizacion</p>
            <p class="mt-4 text-2xl font-semibold">$399</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-white/60">
      <div class="container-safe">
        <div class="space-y-2">
          <p class="section-title">FAQ</p>
          <div class="ornament mx-auto"></div>
        </div>
        <div class="mt-6 grid gap-4">
          <div class="card">
            <h4 class="font-heading">Como agrego una boda?</h4>
            <p class="text-black/70">Solo agrega un JSON y el slug en el manifest.</p>
          </div>
          <div class="card">
            <h4 class="font-heading">Necesito backend?</h4>
            <p class="text-black/70">No, funciona con archivos estaticos y Netlify Forms.</p>
          </div>
          <div class="card">
            <h4 class="font-heading">Puedo migrar a CMS?</h4>
            <p class="text-black/70">Si, el adapter permite cambiar la fuente de datos.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
