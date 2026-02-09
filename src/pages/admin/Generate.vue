
<template>
  <div class="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 class="text-lg font-semibold">Nuevo flujo de admin</h2>
        <p class="text-sm text-slate-500">Arma la estructura (navbar, hero, secciones, footer) y edita el contenido.</p>
      </div>

      <div v-if="modeLabel" class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <p class="font-medium">{{ modeLabel }}</p>
        <p v-if="modeHint" class="mt-1 text-xs text-slate-500">{{ modeHint }}</p>
      </div>

      <div class="mt-6 space-y-6">

      <details open class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="cursor-pointer text-sm font-semibold text-slate-800">Campos generales</summary>
        <div class="mt-4 space-y-4">
          <label class="block text-sm font-medium text-slate-700">
            Slug
            <input
              v-model="draft.slug"
              class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
              placeholder="ej: steven-jenniffer"
              type="text"
              @blur="ensureUniqueSlug"
            />
          </label>
          <p v-if="slugNotice" class="text-xs text-amber-600">{{ slugNotice }}</p>
          <p v-else-if="slugStatus" class="text-xs" :class="slugStatus.ok ? 'text-emerald-600' : 'text-amber-600'">
            {{ slugStatus.message }}
          </p>
          <p v-if="validationErrors.slug" class="text-xs text-red-600">{{ validationErrors.slug }}</p>
          <label class="block text-sm font-medium text-slate-700">
            Fecha
            <input v-model="draft.dateISO" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="date" />
          </label>
          <p v-if="validationErrors.dateISO" class="text-xs text-red-600">{{ validationErrors.dateISO }}</p>
          <div class="grid gap-3 md:grid-cols-2">
            <label class="block text-sm font-medium text-slate-700">
              Tipografía títulos
              <select v-model="draft.theme.fontHeading" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
                <option v-for="opt in fontOptionsHeading" :key="`fh-${opt.value}`" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
            <label class="block text-sm font-medium text-slate-700">
              Tipografía subtítulos
              <select v-model="draft.theme.fontSubheading" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
                <option v-for="opt in fontOptionsSubheading" :key="`fs-${opt.value}`" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
            <label class="block text-sm font-medium text-slate-700">
              Tipografía párrafos
              <select v-model="draft.theme.fontBody" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
                <option v-for="opt in fontOptionsBody" :key="`fb-${opt.value}`" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <label class="block text-sm text-slate-600">
              Primario
              <div class="mt-2 flex items-center gap-3">
                <input
                  v-model="draft.theme.primary"
                  class="h-10 w-14 rounded-lg border border-slate-200 bg-white p-0"
                  type="color"
                  @blur="draft.theme.primary = normalizeHexColor(draft.theme.primary)"
                />
                <input
                  v-model="draft.theme.primary"
                  class="h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm"
                  placeholder="#b4556b"
                  spellcheck="false"
                  @blur="draft.theme.primary = normalizeHexColor(draft.theme.primary)"
                />
              </div>
            </label>
            <label class="block text-sm text-slate-600">
              Secundario
              <div class="mt-2 flex items-center gap-3">
                <input
                  v-model="draft.theme.secondary"
                  class="h-10 w-14 rounded-lg border border-slate-200 bg-white p-0"
                  type="color"
                  @blur="draft.theme.secondary = normalizeHexColor(draft.theme.secondary)"
                />
                <input
                  v-model="draft.theme.secondary"
                  class="h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm"
                  placeholder="#1f2437"
                  spellcheck="false"
                  @blur="draft.theme.secondary = normalizeHexColor(draft.theme.secondary)"
                />
              </div>
            </label>
            <label class="block text-sm text-slate-600">
              Fondo
              <div class="mt-2 flex items-center gap-3">
                <input
                  v-model="draft.theme.background"
                  class="h-10 w-14 rounded-lg border border-slate-200 bg-white p-0"
                  type="color"
                  @blur="draft.theme.background = normalizeHexColor(draft.theme.background)"
                />
                <input
                  v-model="draft.theme.background"
                  class="h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm"
                  placeholder="#fbf6f1"
                  spellcheck="false"
                  @blur="draft.theme.background = normalizeHexColor(draft.theme.background)"
                />
              </div>
            </label>
            <label class="block text-sm text-slate-600">
              Texto
              <div class="mt-2 flex items-center gap-3">
                <input
                  v-model="draft.theme.text"
                  class="h-10 w-14 rounded-lg border border-slate-200 bg-white p-0"
                  type="color"
                  @blur="draft.theme.text = normalizeHexColor(draft.theme.text)"
                />
                <input
                  v-model="draft.theme.text"
                  class="h-10 w-full rounded-xl border border-slate-200 px-4 font-mono text-sm"
                  placeholder="#2a2a2a"
                  spellcheck="false"
                  @blur="draft.theme.text = normalizeHexColor(draft.theme.text)"
                />
              </div>
            </label>
          </div>
        </div>
      </details>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">Agregar bloques</h3>
        <div class="flex flex-wrap gap-3">
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addNavbar">
            + Navbar
          </button>
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addHero">
            + Hero
          </button>
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addSections">
            + Secciones
          </button>
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addFooter">
            + Footer
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-800">Plantillas rápidas</h3>
        <div class="flex flex-wrap gap-3">
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="applyPreset('clasico')">
            Clásico
          </button>
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="applyPreset('moderno')">
            Moderno
          </button>
          <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="applyPreset('minimal')">
            Minimal
          </button>
        </div>
        <p class="text-xs text-slate-500">Esto reemplaza la estructura actual (navbar, hero, secciones, footer).</p>
      </div>

      <details v-if="draft.page.navbar" open class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
          Navbar
          <button class="text-xs text-red-500" type="button" @click.stop="removeNavbar">Quitar</button>
        </summary>
        <div class="mt-4 space-y-4">
          <label class="block text-sm text-slate-600">
            Nombre de la pareja
            <input v-model="draft.coupleNames" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
          <label class="block text-sm text-slate-600">
            Icono
            <input v-model="draft.page.navbar.icon" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-semibold text-slate-700">Links</h4>
            <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addNavbarLink">
              Agregar link
            </button>
          </div>
          <div v-for="(link, index) in draft.page.navbar.links" :key="`navlink-${index}`" class="grid gap-3 md:grid-cols-3">
            <input v-model="link.label" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Texto" />
            <input
              v-model="link.target"
              class="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="#rsvp"
              list="anchor-options"
            />
            <button class="text-xs text-red-500" type="button" @click="removeNavbarLink(index)">Quitar</button>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-semibold text-slate-700">Botones</h4>
            <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addNavbarButton">
              Agregar boton
            </button>
          </div>
          <div v-for="(btn, index) in draft.page.navbar.buttons" :key="`navbtn-${index}`" class="rounded-xl border border-slate-200 p-3">
            <div class="grid gap-3 md:grid-cols-2">
              <input v-model="btn.label" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Texto" />
              <input v-model="btn.target" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="#rsvp" list="anchor-options" />
            </div>
            <div class="mt-3 grid gap-3 md:grid-cols-3">
              <label class="text-xs text-slate-500">
                Variante
                <select v-model="btn.variant" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <option value="outline">Borde</option>
                  <option value="solid">Fondo</option>
                </select>
              </label>
              <label class="text-xs text-slate-500">
                Color texto
                <input v-model="btn.textColor" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" type="color" />
              </label>
              <label class="text-xs text-slate-500">
                <span v-if="btn.variant === 'outline'">Color borde</span>
                <span v-else>Color fondo</span>
                <input
                  :value="btn.variant === 'outline' ? btn.borderColor : btn.backgroundColor"
                  class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  type="color"
                  @input="updateButtonColor(btn, $event)"
                />
              </label>
            </div>
            <button class="mt-2 text-xs text-red-500" type="button" @click="removeNavbarButton(index)">Quitar</button>
          </div>
        </div>
        </div>
      </details>

      <details v-if="draft.page.hero" open class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
          Hero
          <button class="text-xs text-red-500" type="button" @click.stop="removeHero">Quitar</button>
        </summary>
        <div class="mt-4 space-y-4">
          <label class="block text-sm text-slate-600">
            Tagline
            <input v-model="draft.hero.tagline" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
          <label class="block text-sm text-slate-600">
            Fondo
            <select v-model="draft.page.hero.backgroundMode" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
              <option value="default">Default</option>
              <option value="color">Color</option>
              <option value="image">Imagen</option>
            </select>
          </label>
          <label v-if="draft.page.hero.backgroundMode === 'color'" class="block text-sm text-slate-600">
            Color de fondo
            <input v-model="draft.page.hero.backgroundColor" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="color" />
          </label>
          <label v-if="draft.page.hero.backgroundMode === 'image'" class="block text-sm text-slate-600">
            Imagen de fondo (URL)
            <input v-model="draft.page.hero.backgroundImageUrl" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-semibold text-slate-700">Botones</h4>
              <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addHeroButton">
                Agregar boton
              </button>
            </div>
            <div v-for="(btn, index) in draft.page.hero.buttons" :key="`herobtn-${index}`" class="rounded-xl border border-slate-200 p-3">
              <div class="grid gap-3 md:grid-cols-2">
                <input v-model="btn.label" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Texto" />
                <input v-model="btn.target" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="#rsvp" list="anchor-options" />
              </div>
              <div class="mt-3 grid gap-3 md:grid-cols-3">
                <label class="text-xs text-slate-500">
                  Variante
                  <select v-model="btn.variant" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <option value="solid">Fondo</option>
                    <option value="outline">Borde</option>
                  </select>
                </label>
                <label class="text-xs text-slate-500">
                  Color texto
                  <input v-model="btn.textColor" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" type="color" />
                </label>
                <label class="text-xs text-slate-500">
                  <span v-if="btn.variant === 'outline'">Color borde</span>
                  <span v-else>Color fondo</span>
                  <input
                    :value="btn.variant === 'outline' ? btn.borderColor : btn.backgroundColor"
                    class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    type="color"
                    @input="updateButtonColor(btn, $event)"
                  />
                </label>
              </div>
              <button class="mt-2 text-xs text-red-500" type="button" @click="removeHeroButton(index)">Quitar</button>
            </div>
          </div>
        </div>
      </details>

      <details v-if="draft.page.sections.length" open class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
          Secciones
          <button class="text-xs text-red-500" type="button" @click.stop="removeSections">Quitar</button>
        </summary>
        <div class="mt-4 space-y-4">
          <div class="flex items-center gap-3">
            <select v-model="sectionToAdd" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option v-for="item in sectionCatalogOptions" :key="item.type" :value="item.type">
                {{ item.label }}
              </option>
            </select>
            <button class="rounded-lg border border-slate-200 px-3 py-2 text-xs" type="button" @click="addSection">
              Agregar
            </button>
          </div>
        <div
          v-for="(section, index) in draft.page.sections"
          :key="`${section.type}-${index}`"
          class="rounded-xl border border-slate-200 p-3"
          draggable="true"
          @dragstart="onDragStart(index)"
          @dragover.prevent
          @drop="onDrop(index)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="cursor-move text-xs text-slate-400">↕</span>
              <p class="text-xs font-semibold text-slate-700">{{ section.label }} ({{ section.type }})</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="text-xs text-slate-500" type="button" @click="moveSection(index, -1)">Subir</button>
              <button class="text-xs text-slate-500" type="button" @click="moveSection(index, 1)">Bajar</button>
              <button class="text-xs text-red-500" type="button" @click="removeSection(index)">Quitar</button>
            </div>
          </div>
          <div class="mt-3 grid gap-3 md:grid-cols-2">
            <label class="text-xs text-slate-500">
              Nombre (aparece en el menú)
              <input v-model="section.label" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </label>
            <label class="text-xs text-slate-500">
              Ancla (para links, ejemplo: `#rsvp`)
              <input
                v-model="section.anchorId"
                class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="rsvp"
                @blur="sanitizeAnchor(section)"
              />
            </label>
          </div>

          <div class="mt-4 rounded-xl border border-slate-200 bg-white p-3">
            <p class="text-xs font-semibold text-slate-700">Fondo de sección</p>
            <div class="mt-3 grid gap-3 md:grid-cols-2">
              <label class="block text-xs text-slate-500">
                Modo
                <select v-model="section.background.mode" class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" @change="ensureSectionBackground(section)">
                  <option value="default">Default</option>
                  <option value="preset">Predefinido</option>
                  <option value="color">Color</option>
                  <option value="image">Imagen (URL)</option>
                </select>
              </label>

              <label v-if="section.background?.mode === 'preset'" class="block text-xs text-slate-500">
                Estilo
                <select v-model="section.background.preset" class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                  <option value="surface">Claro (surface)</option>
                  <option value="texture">Textura</option>
                  <option value="ink">Oscuro (ink)</option>
                </select>
              </label>

              <label v-else-if="section.background?.mode === 'color'" class="block text-xs text-slate-500">
                Color
                <div class="mt-1 flex items-center gap-3">
                  <input
                    v-model="section.background.color"
                    class="h-10 w-14 rounded-lg border border-slate-200 bg-white p-0"
                    type="color"
                    @blur="section.background.color = normalizeHexColor(section.background.color || '')"
                  />
                  <input
                    v-model="section.background.color"
                    class="h-10 w-full rounded-lg border border-slate-200 px-3 font-mono text-sm"
                    placeholder="#ffffff"
                    spellcheck="false"
                    @blur="section.background.color = normalizeHexColor(section.background.color || '')"
                  />
                </div>
              </label>

              <div v-else-if="section.background?.mode === 'image'" class="space-y-2">
                <label class="block text-xs text-slate-500">
                  URL de imagen
                  <input v-model="section.background.imageUrl" class="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="https://..." />
                </label>
                <label class="flex items-center gap-2 text-xs text-slate-600">
                  <input v-model="section.background.parallax" type="checkbox" />
                  Parallax (recomendado solo en escritorio)
                </label>
              </div>
            </div>
          </div>
        </div>
        </div>
      </details>

      <details v-if="draft.page.sections.length" class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="cursor-pointer text-sm font-semibold text-slate-800">Contenido de secciones</summary>
        <div class="mt-4 space-y-6">

        <div v-if="enabledSections.has('story')" class="space-y-3">
          <h5 class="text-xs font-semibold text-slate-700">Historia</h5>
          <input v-model="draft.story.title" class="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="Titulo" />
          <textarea v-model="draft.story.message" class="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" rows="3" placeholder="Mensaje" />
        </div>

        <div v-if="enabledSections.has('locations')" class="space-y-4">
          <h5 class="text-xs font-semibold text-slate-700">Ubicaciones</h5>
          <div class="grid gap-3 md:grid-cols-2">
            <label class="block text-sm text-slate-600">
              Mostrar
              <div class="mt-2 flex flex-wrap gap-3">
                <label class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <input v-model="draft.page.locations.showCeremony" type="checkbox" />
                  Ceremonia
                </label>
                <label class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <input v-model="draft.page.locations.showReception" type="checkbox" />
                  Recepción
                </label>
              </div>
            </label>
            <label class="block text-sm text-slate-600">
              Mapa
              <select v-model="draft.page.locations.mapMode" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
                <option value="button">Botón (abre en una pestaña)</option>
                <option value="iframe">Mini mapa (iframe)</option>
              </select>
              <p class="mt-2 text-xs text-slate-500">
                Para iframe, usa un enlace de <strong>embed</strong> (por ejemplo, Google Maps “Insertar un mapa”).
              </p>
            </label>
          </div>

          <div v-if="draft.page.locations.showCeremony" class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Ceremonia</p>
            <label class="block text-sm text-slate-600">
              Nombre del lugar
              <input v-model="draft.ceremony.name" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
            </label>
            <div class="grid gap-3 md:grid-cols-2">
              <label class="block text-sm text-slate-600">
                Hora
                <input v-model="draft.ceremony.time" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="time" />
              </label>
              <label class="block text-sm text-slate-600">
                URL del mapa
                <input v-model="draft.ceremony.mapUrl" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="url" />
              </label>
            </div>
            <label class="block text-sm text-slate-600">
              Dirección
              <input v-model="draft.ceremony.address" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
            </label>
          </div>

          <div v-if="draft.page.locations.showReception" class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Recepción</p>
            <label class="block text-sm text-slate-600">
              Nombre del lugar
              <input v-model="draft.reception.name" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
            </label>
            <div class="grid gap-3 md:grid-cols-2">
              <label class="block text-sm text-slate-600">
                Hora
                <input v-model="draft.reception.time" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="time" />
              </label>
              <label class="block text-sm text-slate-600">
                URL del mapa
                <input v-model="draft.reception.mapUrl" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="url" />
              </label>
            </div>
            <label class="block text-sm text-slate-600">
              Dirección
              <input v-model="draft.reception.address" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
            </label>
          </div>
        </div>

        <div v-if="enabledSections.has('timeline')" class="space-y-3">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-semibold text-slate-700">Itinerario</h5>
            <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addSchedule">
              Agregar
            </button>
          </div>
          <div v-for="(item, index) in draft.schedule" :key="index" class="rounded-xl border border-slate-200 p-3">
            <div class="grid gap-3 md:grid-cols-3">
              <input v-model="item.time" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Hora" />
              <input v-model="item.title" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Titulo" />
              <input v-model="item.description" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Descripcion" />
            </div>
            <button v-if="draft.schedule.length > 1" class="mt-2 text-xs text-red-500" type="button" @click="removeSchedule(index)">
              Quitar
            </button>
          </div>
        </div>

        <div v-if="enabledSections.has('dressCode')" class="space-y-3">
          <h5 class="text-xs font-semibold text-slate-700">Dress code</h5>
          <input v-model="draft.dressCode.title" class="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="Titulo" />
          <textarea v-model="draft.dressCode.description" class="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" rows="3" placeholder="Descripcion" />
        </div>

        <div v-if="enabledSections.has('gifts')" class="space-y-3">
          <h5 class="text-xs font-semibold text-slate-700">Regalos</h5>
          <textarea v-model="draft.gifts.message" class="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" rows="2" placeholder="Mensaje" />

          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-slate-700">Cuentas bancarias</p>
            <button
              class="rounded-lg border border-slate-200 px-3 py-1 text-xs"
              type="button"
              :disabled="(draft.gifts.accounts?.length || 0) >= 5"
              @click="addGiftAccount"
            >
              Agregar cuenta
            </button>
          </div>
          <div v-if="draft.gifts.accounts?.length" class="grid gap-3">
            <div v-for="(acc, index) in draft.gifts.accounts" :key="`gift-acc-${index}`" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div class="flex items-center justify-between gap-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Cuenta {{ index + 1 }}</p>
                <button class="text-xs text-red-500" type="button" @click="removeGiftAccount(index)">Quitar</button>
              </div>

              <div class="mt-3 grid gap-3 md:grid-cols-2">
                <label class="block text-sm text-slate-600">
                  Banco
                  <div class="mt-2 flex items-center gap-3">
                    <img
                      v-if="acc.bank && bankLogoByKey[acc.bank]"
                      class="h-9 w-9 rounded-lg bg-white p-1 shadow-sm ring-1 ring-black/5"
                      :src="bankLogoByKey[acc.bank]"
                      :alt="`Banco ${prettyBankName(acc.bank)}`"
                      loading="lazy"
                    />
                    <select v-model="acc.bank" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
                      <option :value="undefined">Seleccionar</option>
                      <option v-for="opt in bankOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                </label>
                <label class="block text-sm text-slate-600">
                  Tipo de cuenta
                  <select v-model="acc.accountType" class="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
                    <option value="ahorros">Ahorros</option>
                    <option value="corriente">Corriente</option>
                    <option value="otro">Otro</option>
                  </select>
                </label>
                <label class="block text-sm text-slate-600">
                  Identificación
                  <input v-model="acc.identification" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="Cédula/RUC" />
                </label>
                <label class="block text-sm text-slate-600">
                  Nombres
                  <input v-model="acc.name" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="Titular" />
                </label>
              </div>
              <label class="mt-3 block text-sm text-slate-600">
                Número de cuenta
                <input v-model="acc.accountNumber" class="mt-2 h-10 w-full rounded-xl border border-slate-200 px-4 py-2 font-mono text-sm" placeholder="0000000000" />
              </label>
            </div>
          </div>
          <p v-else class="text-xs text-slate-500">Agrega entre 1 y 5 cuentas bancarias (opcional).</p>

          <label class="block text-sm text-slate-600">
            Lista de regalos (opcional)
            <input v-model="draft.gifts.giftListUrl" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="https://..." />
          </label>
        </div>

        <div v-if="enabledSections.has('rsvp')" class="space-y-3">
          <h5 class="text-xs font-semibold text-slate-700">RSVP</h5>
          <label class="flex items-center gap-2 text-sm text-slate-600">
            <input v-model="draft.rsvp.enabled" type="checkbox" />
            Habilitar RSVP
          </label>
          <label class="block text-sm text-slate-600">
            Modo
            <select v-model="draft.rsvp.mode" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm">
              <option value="whatsapp">WhatsApp</option>
              <option value="netlify">Netlify Forms</option>
            </select>
          </label>
          <div class="grid gap-3 md:grid-cols-2">
            <label class="block text-sm text-slate-600">
              Fecha limite
              <input v-model="draft.rsvp.deadlineISO" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="date" />
            </label>
            <label class="block text-sm text-slate-600">
              WhatsApp
              <input v-model="draft.rsvp.whatsappNumber" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" placeholder="521..." />
            </label>
          </div>
          <label class="block text-sm text-slate-600">
            Netlify Form (opcional)
            <input v-model="draft.rsvp.netlifyFormNameOptional" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
        </div>

        <div v-if="enabledSections.has('gallery')" class="space-y-3">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-semibold text-slate-700">Galería</h5>
            <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addGalleryItem">
              Agregar
            </button>
          </div>
          <div v-for="(img, index) in draft.gallery" :key="`gallery-${index}`" class="grid gap-3 md:grid-cols-3">
            <input v-model="img.src" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="/tenants/slug/img.jpg" />
            <input v-model="img.alt" class="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Alt" />
            <button class="text-xs text-red-500" type="button" @click="removeGalleryItem(index)">Quitar</button>
          </div>
        </div>

        <div v-if="enabledSections.has('faq')" class="space-y-3">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-semibold text-slate-700">FAQ</h5>
            <button class="rounded-lg border border-slate-200 px-3 py-1 text-xs" type="button" @click="addFaq">
              Agregar
            </button>
          </div>
          <div v-for="(item, index) in draft.faq" :key="`faq-${index}`" class="rounded-xl border border-slate-200 p-3">
            <input v-model="item.question" class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Pregunta" />
            <textarea v-model="item.answer" class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows="2" placeholder="Respuesta" />
            <button v-if="draft.faq.length > 1" class="mt-2 text-xs text-red-500" type="button" @click="removeFaq(index)">
              Quitar
            </button>
          </div>
        </div>
        </div>
      </details>

      <details v-if="draft.page.footer" class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
          Footer
          <button class="text-xs text-red-500" type="button" @click.stop="removeFooter">Quitar</button>
        </summary>
        <div class="mt-4 space-y-3">
          <label class="block text-sm text-slate-600">
            Mensaje
            <input v-model="draft.page.footer.message" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
          <label class="block text-sm text-slate-600">
            Email de contacto
            <input v-model="draft.contactEmail" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="email" />
          </label>
        </div>
      </details>

      <details class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="cursor-pointer text-sm font-semibold text-slate-800">SEO</summary>
        <div class="mt-4 space-y-3">
          <label class="block text-sm text-slate-600">
            Titulo
            <input v-model="draft.seo.title" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
          <label class="block text-sm text-slate-600">
            Descripcion
            <textarea v-model="draft.seo.description" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" rows="3" />
          </label>
          <label class="block text-sm text-slate-600">
            URL
            <input v-model="draft.seo.url" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" type="url" />
          </label>
          <label class="block text-sm text-slate-600">
            OG Image
            <input v-model="draft.seo.ogImage" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm" />
          </label>
        </div>
      </details>

      <details class="rounded-xl border border-slate-200 px-4 py-3">
        <summary class="cursor-pointer text-sm font-semibold text-slate-800">Versiones</summary>
        <div class="mt-4 space-y-2">
          <div v-if="draftVersions.length" class="space-y-2">
            <div
              v-for="version in draftVersions"
              :key="version.id"
              class="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs"
            >
              <div>
                <p class="font-semibold text-slate-700">{{ version.label }}</p>
                <p class="text-slate-500">{{ version.date }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button class="rounded-lg border border-slate-200 px-2 py-1 text-xs" type="button" @click="restoreVersion(version)">
                  Restaurar
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-slate-500">Guarda un borrador para crear versiones.</p>
        </div>
      </details>

      <div class="flex flex-wrap items-center gap-3">
        <button class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="saveDraft">
          Guardar borrador
        </button>
        <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="button" @click="downloadJson">
          Descargar JSON
        </button>
        <button
          v-if="canWriteToProject"
          class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          type="button"
          @click="saveToProject"
        >
          Guardar en proyecto
        </button>
        <button class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" type="button" @click="saveToTenants">
          Crear en tenants
        </button>
        <button
          class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          type="button"
          :disabled="!draftShareUrl"
          @click="copyLink"
        >
          {{ copyStatus }}
        </button>
        <span v-if="toastMessage" class="text-xs text-emerald-600">{{ toastMessage }}</span>
      </div>
      <div v-if="validationErrors.list.length" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
        <p class="font-semibold">Faltan datos:</p>
        <p v-for="(msg, index) in validationErrors.list" :key="`val-${index}`">{{ msg }}</p>
      </div>
      <div v-if="draftShareUrl" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        Link de borrador:
        <span class="break-all font-medium text-slate-800">{{ draftShareUrl }}</span>
      </div>
      <div v-else class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
        Configura <strong>VITE_ADMIN_PREVIEW_KEY</strong> en el .env para habilitar links de borrador compartibles.
      </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 class="text-lg font-semibold">Preview en vivo</h2>
          <p class="text-sm text-slate-500">Se actualiza con cada cambio.</p>
        </div>
        <a
          class="rounded-lg border border-slate-200 px-3 py-1 text-xs"
          :class="draftShareUrl ? 'text-slate-800' : 'pointer-events-none text-slate-300'"
          :href="draftShareUrl || '#'"
          target="_blank"
          rel="noopener"
        >
          Ver preview
        </a>
      </div>
      <div ref="previewRef" class="max-h-[80vh] overflow-y-auto">
        <WeddingPreview :tenant="tenantForPreview" :slug="draft.slug" />
      </div>
    </section>
  </div>

  <datalist id="anchor-options">
    <option v-for="item in anchorOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
  </datalist>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import WeddingPreview from "../../components/WeddingPreview.vue";
import type { BankAccount, BankKey, PageSection, SectionType, TenantConfig } from "../../types/tenant";
import { resolveSectionDefaults, sectionCatalog } from "../../utils/sectionCatalog";
import manifest from "../../tenants/tenants.manifest.json";
import { LocalJsonAdapter } from "../../tenants/LocalJsonAdapter";
import { useRoute, useRouter } from "vue-router";

type DraftConfig = TenantConfig & { slug: string };

const fontOptionsHeading = [
  { label: "Boska (Actual)", value: "Boska" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond" },
  { label: "EB Garamond", value: "EB Garamond" },
  { label: "Cinzel", value: "Cinzel" },
  { label: "Prata", value: "Prata" },
  { label: "Great Vibes (Script)", value: "Great Vibes" }
];

const fontOptionsSubheading = [
  { label: "Cormorant Garamond (Actual)", value: "Cormorant Garamond" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "EB Garamond", value: "EB Garamond" },
  { label: "Cinzel", value: "Cinzel" },
  { label: "Prata", value: "Prata" },
  { label: "Boska", value: "Boska" },
  { label: "Great Vibes (Script)", value: "Great Vibes" }
];

const fontOptionsBody = [
  { label: "Inter (Actual)", value: "Inter" },
  { label: "Source Sans 3", value: "Source Sans 3" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond" },
  { label: "EB Garamond", value: "EB Garamond" }
];

const bankOptions: Array<{ label: string; value: BankKey }> = [
  { label: "Banco Pichincha", value: "pichincha" },
  { label: "Banco Guayaquil", value: "guayaquil" },
  { label: "Banco del Pacífico", value: "pacifico" },
  { label: "Produbanco", value: "produbanco" },
  { label: "Banco Internacional", value: "internacional" },
  { label: "JEP", value: "jep" },
  { label: "Banco Solidario", value: "solidario" }
];

const bankLogoByKey: Record<BankKey, string> = {
  pichincha: "/banks/pichincha.svg",
  guayaquil: "/banks/guayaquil.svg",
  pacifico: "/banks/pacifico.png",
  produbanco: "/banks/produbanco.png",
  internacional: "/banks/internacional.png",
  jep: "/banks/jep.svg",
  solidario: "/banks/solidario.svg"
};

function prettyBankName(key: BankKey) {
  const match = bankOptions.find((opt) => opt.value === key);
  return match?.label.replace(/^Banco\s+/, "") ?? key;
}

function normalizeHexColor(input: string) {
  const raw = (input ?? "").trim();
  const withHash = raw.startsWith("#") ? raw : `#${raw}`;
  const hex = withHash.toLowerCase();
  // Accept #rgb or #rrggbb only
  if (/^#[0-9a-f]{3}$/.test(hex) || /^#[0-9a-f]{6}$/.test(hex)) return hex;
  return "#000000";
}

const previewRef = ref<HTMLElement | null>(null);
const route = useRoute();
const router = useRouter();
const adapter = new LocalJsonAdapter();
const draftShareUrl = ref("");
const copyStatus = ref("Copiar link");
const toastMessage = ref("");
const slugNotice = ref("");
const dragIndex = ref<number | null>(null);
const loadedTenantSlug = ref<string>("");
const loadedDraftId = ref<string>("");
const canWriteToProject = ref(false);
const draftVersions = ref<Array<{ id: string; slug: string; date: string; label: string; data: TenantConfig }>>([]);
const validationErrors = reactive<{ slug: string; dateISO: string; list: string[] }>({
  slug: "",
  dateISO: "",
  list: []
});
const sectionToAdd = ref<SectionType>("countdown");

const DEFAULT_THEME: TenantConfig["theme"] = {
  primary: "#7b4f62",
  secondary: "#1f2437",
  background: "#fbf6f1",
  text: "#2a2a2a",
  fontHeading: "Boska",
  fontSubheading: "Cormorant Garamond",
  fontBody: "Inter"
};

const draft = reactive<DraftConfig>({
  slug: "nueva-boda",
  coupleNames: "Nombre & Nombre",
  dateISO: "2026-09-12",
  hero: {
    tagline: "Nuestro sí, para siempre",
    ctaPrimaryText: "RSVP",
    ctaSecondaryText: "Ubicaciones",
    ctaPrimaryTarget: "#rsvp",
    ctaSecondaryTarget: "#ubicaciones"
  },
  ceremony: {
    name: "Capilla San Miguel",
    time: "17:00",
    address: "Av. Central 450, CDMX",
    mapUrl: "https://maps.google.com"
  },
  reception: {
    name: "Hacienda Los Laureles",
    time: "19:00",
    address: "Camino Antiguo 95, CDMX",
    mapUrl: "https://maps.google.com"
  },
  schedule: [
    { time: "17:00", title: "Ceremonia", description: "Capilla" },
    { time: "19:00", title: "Recepción", description: "Brindis y cena" }
  ],
  dressCode: {
    title: "Formal",
    description: "Tonos sobrios y elegantes."
  },
  gifts: {
    message: "Gracias por acompañarnos en este día.",
    giftListUrl: "",
    accounts: [
      { bank: "pichincha", identification: "0000000000", name: "Nombre Apellido", accountNumber: "0000000000", accountType: "ahorros" }
    ]
  },
  rsvp: {
    mode: "whatsapp",
    enabled: true,
    deadlineISO: "2026-08-20",
    whatsappNumber: "5215512341111",
    netlifyFormNameOptional: ""
  },
  gallery: [],
  theme: {
    ...DEFAULT_THEME
  },
  seo: {
    title: "Nombre & Nombre | Boda",
    description: "Acompáñanos en nuestro gran día.",
    url: "https://tuboda.com/w/nueva-boda",
    ogImage: "/og-default.svg"
  },
  story: {
    title: "Nuestra historia",
    message: "Un encuentro casual que terminó en un sí para siempre."
  },
  faq: [
    {
      question: "¿Cómo confirmo asistencia?",
      answer: "Entra a la sección RSVP y completa el formulario o escríbenos por WhatsApp."
    }
  ],
  contactEmail: "contacto@tuboda.com",
  page: {
    navbar: undefined,
    hero: undefined,
    sections: [],
    footer: undefined,
    locations: { showCeremony: true, showReception: true, mapMode: "button" }
  }
});

async function loadFromQuery() {
  const q = route.query;
  const draftId = typeof q.draftId === "string" ? q.draftId : "";
  const tenantSlug = typeof q.tenant === "string" ? q.tenant : "";

  if (draftId) {
    loadedDraftId.value = draftId;
    loadedTenantSlug.value = "";
    const raw = localStorage.getItem("weddingapp_drafts");
    const current = raw ? (JSON.parse(raw) as Array<{ id: string; data: TenantConfig; slug?: string }>) : [];
    const found = current.find((d) => d.id === draftId);
    if (!found) {
      toastMessage.value = "No se encontró el borrador.";
      return;
    }
    applyDraft(found.data, found.slug);
    toastMessage.value = "Borrador cargado.";
    return;
  }

  if (tenantSlug) {
    loadedTenantSlug.value = tenantSlug;
    loadedDraftId.value = "";
    const tenant = await adapter.getTenant(tenantSlug);
    if (!tenant) {
      toastMessage.value = "No se encontró el sitio en tenants.";
      return;
    }
    applyDraft(tenant, tenantSlug);
    toastMessage.value = "Sitio cargado desde tenants.";
    return;
  }

  loadedTenantSlug.value = "";
  loadedDraftId.value = "";
}

const modeLabel = computed(() => {
  if (loadedTenantSlug.value) return `Editando sitio: ${loadedTenantSlug.value}`;
  if (loadedDraftId.value) return `Editando borrador: ${loadedDraftId.value}`;
  return "";
});

const modeHint = computed(() => {
  if (loadedTenantSlug.value) return `Se guardará como src/tenants/data/${draft.slug}.json y se actualizará el manifest.`;
  if (loadedDraftId.value) return "Este borrador vive en este navegador (localStorage). Puedes guardarlo como sitio.";
  return "";
});

async function checkWriter() {
  if (!import.meta.env.DEV) {
    canWriteToProject.value = false;
    return;
  }
  try {
    const res = await fetch("/__admin/tenants/ping");
    const json = (await res.json()) as { ok?: boolean };
    canWriteToProject.value = Boolean(res.ok && json?.ok);
  } catch {
    canWriteToProject.value = false;
  }
}

async function saveToProject() {
  if (!validateDraft()) return;
  if (!canWriteToProject.value) {
    toastMessage.value = "No se puede guardar en el proyecto (dev server no disponible).";
    return;
  }

  const nextSlug = draft.slug.trim();
  const prevSlug = loadedTenantSlug.value.trim();
  const isRename = Boolean(prevSlug && prevSlug !== nextSlug);

  if (isRename) {
    const ok = window.confirm(`Vas a renombrar el sitio de "${prevSlug}" a "${nextSlug}". ¿Continuar?`);
    if (!ok) return;
  }

  const { slug, ...tenant } = draft;
  try {
    const res = await fetch("/__admin/tenants/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        slug: nextSlug,
        prevSlug: prevSlug || undefined,
        deletePrev: isRename,
        tenant
      })
    });
    const json = (await res.json()) as { ok?: boolean; error?: string; slug?: string };
    if (!res.ok || !json?.ok) {
      toastMessage.value = json?.error || "No se pudo guardar.";
      return;
    }

    loadedTenantSlug.value = nextSlug;
    loadedDraftId.value = "";
    toastMessage.value = `Guardado en src/tenants/data/${nextSlug}.json`;
    await router.replace({ name: "admin-generate", query: { tenant: nextSlug } });
  } catch {
    toastMessage.value = "Error al guardar en el proyecto.";
  }
}

const tenantForPreview = computed<TenantConfig>(() => {
  const { slug, ...tenant } = draft;
  return tenant as TenantConfig;
});

const sectionCatalogOptions = computed(() => sectionCatalog);
const enabledSections = computed(() => new Set(draft.page.sections.map((section) => section.type)));

const anchorOptions = computed(() => {
  const options: Array<{ label: string; value: string }> = [];
  if (draft.page.hero) options.push({ label: "Hero", value: "#hero" });
  for (const section of draft.page.sections) {
    options.push({ label: section.label, value: `#${section.anchorId}` });
  }
  if (draft.page.footer) {
    options.push({ label: "Footer", value: `#${draft.page.footer.anchorId || "footer"}` });
  }
  return options;
});

const slugStatus = computed(() => {
  const value = draft.slug.trim();
  if (!value) return null;
  const taken = existingSlugs.value.has(value);
  return {
    ok: !taken,
    message: taken ? "Slug ya existe. Se ajustara al salir." : "Slug disponible."
  };
});

const existingSlugs = computed(() => {
  const fromManifest = Array.isArray(manifest) ? manifest : [];
  const raw = localStorage.getItem("weddingapp_drafts");
  const drafts = raw ? (JSON.parse(raw) as Array<{ id: string; data: TenantConfig; slug?: string }>) : [];
  const fromDrafts = drafts
    .map((item) => item.slug || item.id.split("-").slice(0, -1).join("-"))
    .filter(Boolean);
  return new Set<string>([...fromManifest, ...fromDrafts]);
});

function applyThemeToElement(el: HTMLElement | null, theme: TenantConfig["theme"]) {
  if (!el) return;
  el.style.setProperty("--color-primary", theme.primary);
  el.style.setProperty("--color-secondary", theme.secondary);
  el.style.setProperty("--color-accent", theme.primary);
  el.style.setProperty("--color-surface", theme.background);
  el.style.setProperty("--color-text", theme.text);
  el.style.setProperty("--font-heading", theme.fontHeading);
  if (theme.fontSubheading) {
    el.style.setProperty("--font-subheading", theme.fontSubheading);
  }
  el.style.setProperty("--font-body", theme.fontBody);
}

function ensureUniqueSlug() {
  const base = draft.slug.trim();
  if (!base) return;
  const taken = existingSlugs.value;
  if (!taken.has(base)) {
    slugNotice.value = "";
    return;
  }
  let counter = 2;
  let candidate = `${base}-${counter}`;
  while (taken.has(candidate)) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }
  draft.slug = candidate;
  slugNotice.value = `El slug ya existia. Se ajusto a: ${candidate}`;
}

function onDragStart(index: number) {
  dragIndex.value = index;
}

function onDrop(index: number) {
  if (dragIndex.value === null || dragIndex.value === index) return;
  const list = draft.page.sections;
  const [moved] = list.splice(dragIndex.value, 1);
  list.splice(index, 0, moved);
  dragIndex.value = null;
}

function moveSection(index: number, delta: number) {
  const nextIndex = index + delta;
  if (nextIndex < 0 || nextIndex >= draft.page.sections.length) return;
  const list = draft.page.sections;
  const [moved] = list.splice(index, 1);
  list.splice(nextIndex, 0, moved);
}

function validateDraft() {
  validationErrors.slug = "";
  validationErrors.dateISO = "";
  validationErrors.list = [];

  if (!draft.slug.trim()) {
    validationErrors.slug = "El slug es obligatorio.";
    validationErrors.list.push("Define un slug unico.");
  }

  if (!draft.dateISO) {
    validationErrors.dateISO = "La fecha es obligatoria.";
    validationErrors.list.push("Selecciona la fecha del evento.");
  }

  if (draft.page.navbar) {
    const badLink = draft.page.navbar.links?.some((link) => !link.label.trim() || !link.target.trim());
    if (badLink) validationErrors.list.push("Completa texto y referencia en los links del navbar.");
    const badButton = draft.page.navbar.buttons?.some((btn) => !btn.label.trim() || !btn.target.trim());
    if (badButton) validationErrors.list.push("Completa texto y referencia en los botones del navbar.");
  }

  if (draft.page.hero) {
    const badHeroButton = draft.page.hero.buttons?.some((btn) => !btn.label.trim() || !btn.target.trim());
    if (badHeroButton) validationErrors.list.push("Completa texto y referencia en los botones del hero.");
  }

  return validationErrors.list.length === 0;
}

watch(
  () => draft.theme,
  (theme) => applyThemeToElement(previewRef.value, theme),
  { deep: true, immediate: true }
);

watch(
  () => [draft.slug, draft.dateISO],
  () => {
    if (validationErrors.list.length) validateDraft();
    if (slugNotice.value) slugNotice.value = "";
    loadVersions();
  },
  { immediate: true }
);

watch(
  () => [
    draft.page.navbar?.links,
    draft.page.navbar?.buttons,
    draft.page.hero?.buttons
  ],
  () => {
    if (validationErrors.list.length) validateDraft();
  },
  { deep: true }
);

onMounted(() => {
  loadFromQuery();
  checkWriter();
});

watch(
  () => `${String(route.query.draftId || "")}|${String(route.query.tenant || "")}`,
  () => {
    loadFromQuery();
  }
);

function loadVersions() {
  const raw = localStorage.getItem("weddingapp_draft_versions");
  const all = raw ? (JSON.parse(raw) as Array<{ id: string; slug: string; createdAt: string; data: TenantConfig }>) : [];
  const current = draft.slug.trim();
  const filtered = current ? all.filter((item) => item.slug === current) : [];
  draftVersions.value = filtered
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((item, index) => ({
      id: item.id,
      slug: item.slug,
      data: item.data,
      date: new Date(item.createdAt).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" }),
      label: `Version ${filtered.length - index}`
    }));
}

function restoreVersion(version: { slug: string; data: TenantConfig }) {
  applyDraft(version.data, version.slug);
}

function applyDraft(data: TenantConfig, slug?: string) {
  const fallbackPage = { navbar: undefined, hero: undefined, sections: [], footer: undefined, locations: { showCeremony: true, showReception: true, mapMode: "button" } };
  const nextTheme = { ...DEFAULT_THEME, ...(data.theme ?? {}) };
  // Some existing tenants don't have fontSubheading; keep the select stable.
  if (!nextTheme.fontSubheading) nextTheme.fontSubheading = nextTheme.fontHeading;
  const normalized = {
    ...data,
    theme: nextTheme,
    page: {
      ...fallbackPage,
      ...(data.page ?? {}),
      sections: (data.page?.sections ?? fallbackPage.sections).map((s) => {
        const base = resolveSectionDefaults(s.type);
        return {
          ...base,
          ...s,
          background: {
            ...(base.background ?? { mode: "default" }),
            ...(s.background ?? {})
          }
        };
      }),
      locations: {
        ...fallbackPage.locations,
        ...(data.page?.locations ?? {})
      }
    }
  };
  Object.assign(draft, normalized);
  if (slug) draft.slug = slug;
}


function addNavbar() {
  if (!draft.page.navbar) {
    draft.page.navbar = {
      icon: "♥",
      links: [
        { label: "Inicio", target: "#hero" },
        { label: "Ubicaciones", target: "#ubicaciones" }
      ],
      buttons: [{ label: "RSVP", target: "#rsvp", variant: "outline" }]
    };
  }
}

function removeNavbar() {
  draft.page.navbar = undefined;
}

function addNavbarLink() {
  if (!draft.page.navbar) return;
  const target = anchorOptions.value[0]?.value || "#hero";
  draft.page.navbar.links.push({ label: "Sección", target });
}

function removeNavbarLink(index: number) {
  draft.page.navbar?.links.splice(index, 1);
}

function addNavbarButton() {
  if (!draft.page.navbar) return;
  const target = anchorOptions.value[0]?.value || "#hero";
  draft.page.navbar.buttons.push({ label: "Boton", target, variant: "outline" });
}

function removeNavbarButton(index: number) {
  draft.page.navbar?.buttons.splice(index, 1);
}

function applyPreset(name: "clasico" | "moderno" | "minimal") {
  if (name === "clasico") {
    draft.page = {
      navbar: {
        icon: "♥",
        links: [
          { label: "Inicio", target: "#hero" },
          { label: "Ubicaciones", target: "#ubicaciones" },
          { label: "Itinerario", target: "#itinerario" }
        ],
        buttons: [{ label: "RSVP", target: "#rsvp", variant: "outline" }]
      },
      hero: {
        backgroundMode: "default",
        buttons: [
          { label: "RSVP", target: "#rsvp", variant: "solid" },
          { label: "Ubicaciones", target: "#ubicaciones", variant: "outline" }
        ]
      },
      sections: [
        resolveSectionDefaults("countdown"),
        resolveSectionDefaults("locations"),
        resolveSectionDefaults("timeline"),
        resolveSectionDefaults("rsvp"),
        resolveSectionDefaults("gallery")
      ],
      footer: { message: "Gracias por acompañarnos", anchorId: "footer" }
    };
  }

  if (name === "moderno") {
    draft.page = {
      navbar: {
        icon: "✦",
        links: [
          { label: "Inicio", target: "#hero" },
          { label: "Historia", target: "#historia" },
          { label: "RSVP", target: "#rsvp" }
        ],
        buttons: [{ label: "Confirmar", target: "#rsvp", variant: "solid" }]
      },
      hero: {
        backgroundMode: "color",
        backgroundColor: "#1f2437",
        buttons: [{ label: "Confirmar", target: "#rsvp", variant: "solid" }]
      },
      sections: [
        resolveSectionDefaults("story"),
        resolveSectionDefaults("locations"),
        resolveSectionDefaults("rsvp"),
        resolveSectionDefaults("faq")
      ],
      footer: { message: "Nos vemos pronto", anchorId: "footer" }
    };
  }

  if (name === "minimal") {
    draft.page = {
      navbar: {
        icon: "•",
        links: [{ label: "Inicio", target: "#hero" }],
        buttons: []
      },
      hero: {
        backgroundMode: "image",
        backgroundImageUrl: "/tenants/demo/hero.jpg",
        buttons: []
      },
      sections: [
        resolveSectionDefaults("locations"),
        resolveSectionDefaults("rsvp")
      ],
      footer: { message: "Gracias por acompañarnos", anchorId: "footer" }
    };
  }
}

function updateButtonColor(
  btn: { variant: "outline" | "solid"; borderColor?: string; backgroundColor?: string },
  event: Event
) {
  const value = (event.target as HTMLInputElement).value;
  if (btn.variant === "outline") {
    btn.borderColor = value;
  } else {
    btn.backgroundColor = value;
  }
}

function addHero() {
  if (!draft.page.hero) {
    draft.page.hero = {
      backgroundMode: "default",
      buttons: [
        { label: draft.hero.ctaPrimaryText, target: draft.hero.ctaPrimaryTarget || "#rsvp", variant: "solid" },
        { label: draft.hero.ctaSecondaryText, target: draft.hero.ctaSecondaryTarget || "#ubicaciones", variant: "outline" }
      ]
    };
  }
}

function removeHero() {
  draft.page.hero = undefined;
}

function addHeroButton() {
  if (!draft.page.hero) return;
  const target = anchorOptions.value[0]?.value || "#hero";
  draft.page.hero.buttons.push({ label: "Boton", target, variant: "solid" });
}

function removeHeroButton(index: number) {
  draft.page.hero?.buttons.splice(index, 1);
}

function addSections() {
  if (!draft.page.sections.length) {
    draft.page.sections.push(resolveSectionDefaults(sectionToAdd.value));
  }
}

function removeSections() {
  draft.page.sections = [];
}

function addSection() {
  if (!draft.page.sections) draft.page.sections = [];
  const next = resolveSectionDefaults(sectionToAdd.value);
  draft.page.sections.push(next);
}

function removeSection(index: number) {
  draft.page.sections.splice(index, 1);
}

function sanitizeAnchor(section: PageSection) {
  section.anchorId = section.anchorId.replace(/^#/, "").trim() || "seccion";
}

function ensureSectionBackground(section: PageSection) {
  if (!section.background) section.background = { mode: "default" };
  if (!section.background.mode) section.background.mode = "default";
  if (section.background.mode === "preset" && !section.background.preset) section.background.preset = "surface";
  if (section.background.mode === "color" && !section.background.color) section.background.color = "#ffffff";
  if (section.background.mode === "image" && section.background.parallax === undefined) section.background.parallax = false;
}

function addFooter() {
  if (!draft.page.footer) {
    draft.page.footer = { message: "Gracias por acompañarnos", anchorId: "footer" };
  }
}

function removeFooter() {
  draft.page.footer = undefined;
}

function addGiftAccount() {
  if (!draft.gifts.accounts) draft.gifts.accounts = [];
  const next: BankAccount = {
    bank: undefined,
    identification: "",
    name: "",
    accountNumber: "",
    accountType: "ahorros"
  };
  if (draft.gifts.accounts.length >= 5) return;
  draft.gifts.accounts.push(next);
}

function removeGiftAccount(index: number) {
  draft.gifts.accounts?.splice(index, 1);
}

function addSchedule() {
  draft.schedule.push({ time: "", title: "", description: "" });
}

function removeSchedule(index: number) {
  draft.schedule.splice(index, 1);
}

function addGalleryItem() {
  draft.gallery.push({ src: "", alt: "" });
}

function removeGalleryItem(index: number) {
  draft.gallery.splice(index, 1);
}

function addFaq() {
  draft.faq?.push({ question: "", answer: "" });
}

function removeFaq(index: number) {
  draft.faq?.splice(index, 1);
}

function downloadJson() {
  if (!validateDraft()) return;
  const { slug, ...tenant } = draft;
  const json = JSON.stringify(tenant, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug || "tenant"}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function saveToTenants() {
  if (!validateDraft()) return;
  const { slug, ...tenant } = draft;
  const json = JSON.stringify(tenant, null, 2);
  const suggestedName = `${slug || "tenant"}.json`;
  const picker = (window as Window & { showSaveFilePicker?: (options: unknown) => Promise<FileSystemFileHandle> })
    .showSaveFilePicker;

  try {
    if (picker) {
      const handle = await picker({
        suggestedName,
        types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(json);
      await writable.close();
      toastMessage.value = `Guardado. Mueve el archivo a src/tenants/data/${suggestedName}`;
      return;
    }
  } catch {
    // ignore cancel
  }

  downloadJson();
  toastMessage.value = `Descargado. Mueve el archivo a src/tenants/data/${suggestedName}`;
}

function encodeDraft(payload: { data: TenantConfig }) {
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)));
}

function saveDraft() {
  if (!validateDraft()) return;
  const { slug, ...tenant } = draft;
  const draftId = slug ? `${slug}-${Date.now()}` : `borrador-${Date.now()}`;
  const raw = localStorage.getItem("weddingapp_drafts");
  const current = raw ? (JSON.parse(raw) as Array<{ id: string; data: TenantConfig; slug?: string }>) : [];
  current.unshift({ id: draftId, slug, data: tenant as TenantConfig });
  localStorage.setItem("weddingapp_drafts", JSON.stringify(current.slice(0, 20)));
  const versionsRaw = localStorage.getItem("weddingapp_draft_versions");
  const versions = versionsRaw
    ? (JSON.parse(versionsRaw) as Array<{ id: string; slug: string; createdAt: string; data: TenantConfig }>)
    : [];
  versions.unshift({ id: draftId, slug, createdAt: new Date().toISOString(), data: tenant as TenantConfig });
  localStorage.setItem("weddingapp_draft_versions", JSON.stringify(versions.slice(0, 50)));
  loadVersions();
  const key = String(import.meta.env.VITE_ADMIN_PREVIEW_KEY || "");
  const encoded = encodeDraft({ data: tenant as TenantConfig });
  draftShareUrl.value = key ? `${window.location.origin}/preview/${draftId}?key=${key}&data=${encoded}` : "";
  copyStatus.value = "Copiar link";
}

async function copyLink() {
  if (!draftShareUrl.value) return;
  try {
    await navigator.clipboard.writeText(draftShareUrl.value);
    copyStatus.value = "Copiado";
    toastMessage.value = "Link copiado al portapapeles";
  } catch {
    copyStatus.value = "Error al copiar";
    toastMessage.value = "No se pudo copiar";
  }
  setTimeout(() => {
    copyStatus.value = "Copiar link";
    toastMessage.value = "";
  }, 1500);
}
</script>

