// ============================================================
//  INSTRUCCIONES PARA CONFIGURAR FIREBASE (5 minutos, gratis)
// ============================================================
//
//  1. Ve a https://console.firebase.google.com/
//  2. Crea proyecto → nombre: "jet-estaciones" → continuar
//  3. Desactiva Google Analytics (no es necesario) → crear proyecto
//  4. En el panel: Agrega app web  </>  → nombre: "JET PWA" → registrar
//  5. Copia los valores de firebaseConfig y pégalos abajo
//
//  6. En el panel lateral: Authentication → Iniciar sesión
//     → Habilita "Correo/contraseña"
//
//  7. En el panel lateral: Firestore Database → Crear base de datos
//     → Modo producción → Ubicación: us-central → Crear
//
//  8. Firestore → Reglas → pega esto y publica:
//
//  rules_version = '2';
//  service cloud.firestore {
//    match /databases/{database}/documents {
//      match /{document=**} {
//        allow read, write: if request.auth != null;
//      }
//    }
//  }
//
// ============================================================

const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROYECTO.firebaseapp.com",
  projectId:         "TU_PROYECTO_ID",
  storageBucket:     "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID"
};
