<script setup>
import { ref } from 'vue'
const fileInput = ref(null);
const preview = ref(null);
const message = ref('');
const loading = ref(false);
const error = ref('');
// se ejecuta cuando el usuario selecciona un archivo
function onFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  preview.value = URL.createObjectURL(file);
  message.value = '';
  error.value = '';
}
// elimina la foto seleccionada antes de subirla
function removePhoto() {
  if (preview.value) {
    URL.revokeObjectURL(preview.value);
  }
  preview.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  message.value = '';
  error.value = '';
}
//se ejecuta cuando el usuario hace clic en el botón de subir
async function uploadPhoto() {
  const file = fileInput.value.files[0];
  if (!file) {
    message.value = 'Por favor selecciona una foto';
    return;
  }
  //crear un FormData para enviar el archivo
  const formData = new FormData();
  formData.append('foto', file);
  loading.value = true;
  error.value = '';
  message.value = '';
 //hacemos fetch a la API para subir la foto
  try {
    const apiUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${apiUrl}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    message.value = data.message ?? JSON.stringify(data);
  } catch (err) {
    error.value = 'Error al subir la foto';
  } finally {
    loading.value = false;
  }
}
</script>



<template>
  <div class="container">
    <h1>Subir Foto</h1>
    <label class="drop-area" :class="{ 'has-preview': preview }">
      <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" />
      <div v-if="preview" class="preview">
        <img :src="preview" alt="Preview" />
        <button
          type="button"
          class="remove-btn"
          @click.stop.prevent="removePhoto"
          title="Eliminar foto"
        >
          ✕
        </button>
      </div>
      <div v-else class="placeholder">
        Haz clic o arrastra una foto aquí
      </div>
    </label>
  <button class="upload-btn" :disabled="loading" @click="uploadPhoto">
    <span v-if="loading">Subiendo...</span>
    <span v-else>Subir Foto</span>
  </button>
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 420px;
  margin: 3rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
}

.drop-area {
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cbd5e0;
  border-radius: 0.75rem;
  cursor: pointer;
  overflow: hidden;
  background: #f7fafc;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
}

.drop-area:hover {
  border-color: #667eea;
  background: #edf2f7;
}

.drop-area.has-preview {
  border-style: solid;
  border-color: #667eea;
  background: #fff;
}

.drop-area input[type="file"] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;
  z-index: 2;
}

.remove-btn:hover {
  background: #e53e3e;
  transform: scale(1.08);
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #718096;
  font-size: 0.95rem;
  text-align: center;
  padding: 1rem;
}

.upload-btn {
  padding: 0.75rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.upload-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  color: #276749;
  background: #c6f6d5;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}

.error {
  color: #9b2c2c;
  background: #fed7d7;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}
</style>
