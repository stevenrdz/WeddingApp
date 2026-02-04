<template>
  <form class="card grid gap-4" :name="formName" method="POST" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" :value="formName" />
    <input type="hidden" name="bot-field" />
    <div>
      <label class="text-sm uppercase tracking-widest text-black/50">Nombre</label>
      <input class="input-field mt-2" name="name" required />
    </div>
    <div>
      <label class="text-sm uppercase tracking-widest text-black/50">Telefono</label>
      <input class="input-field mt-2" name="phone" required />
    </div>
    <div>
      <label class="text-sm uppercase tracking-widest text-black/50">Email (opcional)</label>
      <input class="input-field mt-2" name="email" type="email" />
    </div>
    <div>
      <label class="text-sm uppercase tracking-widest text-black/50">Numero de asistentes</label>
      <input class="input-field mt-2" name="attendeesCount" type="number" min="1" required />
    </div>
    <div>
      <label class="text-sm uppercase tracking-widest text-black/50">Asistire</label>
      <select class="input-field mt-2" name="attendance" required>
        <option value="si">Si</option>
        <option value="no">No</option>
      </select>
    </div>
    <div>
      <label class="text-sm uppercase tracking-widest text-black/50">Mensaje</label>
      <textarea class="input-area mt-2" name="message" rows="3"></textarea>
    </div>
    <button class="btn-primary" type="submit">Enviar RSVP</button>
  </form>
</template>

<script setup lang="ts">
defineProps<{ formName: string }>();
</script>