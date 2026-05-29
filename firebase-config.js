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
  apiKey:            "AIzaSyAhx3ZJA5QoMEdUHhOq3JhYsw-AThrjDnE",
  authDomain:        "jet-estaciones.firebaseapp.com",
  projectId:         "jet-estaciones",
  storageBucket:     "jet-estaciones.firebasestorage.app",
  messagingSenderId: "510750186700",
  appId:             "1:510750186700:web:c59f489b2a9ebe5ebd3669"
};
