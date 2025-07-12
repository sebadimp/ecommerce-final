// src/firebaseConfig.js (o src/utils/firebase.js)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAkKnXT5cogBJIWFcJqXOTjkPHi82e7tGU",
    authDomain: "ecommerce-final-1529.firebaseapp.com",
    projectId: "ecommerce-final-1529",
    storageBucket: "ecommerce-final-1529.firebasestorage.app",
    messagingSenderId: "149430972137",
    appId: "1:149430972137:web:c64e0ee8307fd91e08ca78",
    measurementId: "G-KDZWL9MNJ9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de autenticación
export const auth = getAuth(app);


// Puedes exportar la app si la necesitas en otro lugar
export default app;