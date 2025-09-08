import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAinS1IwwgyOD6TEcip-eeZtdV26klFBSo",
    authDomain: "launch-7439e.firebaseapp.com",
    databaseURL: "https://launch-7439e-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "launch-7439e",
    storageBucket: "launch-7439e.appspot.com",
    messagingSenderId: "671432454143",
    appId: "1:671432454143:web:fcaef37ae3f70556e5c1ca",
    measurementId: "G-TQVP7ZJ510"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Products
export const products = [
    { id: 1, name: "Flower Pot", price: 100 },
    { id: 2, name: "Sparklers", price: 50 },
    { id: 3, name: "Rocket", price: 150 },
    { id: 4, name: "Chakki", price: 120 },
    { id: 5, name: "Atom Bomb", price: 80 }
];

// Cart
export let cart = [];

// Add to cart
export function addToCart(prod){
    cart.push({ name: prod.name, price: prod.price });
    updateMiniCart();
    alert(prod.name + " added to cart");
}

// Update mini cart
export function updateMiniCart(){
    const mini = document.getElementById("miniCart");
    if(!mini) return;
    if(cart.length === 0){
        mini.textContent = "No items yet";
        const cartItems = document.getElementById("cartItems");
        if(cartItems) cartItems.innerHTML = "No items";
        const cartTotal = document.getElementById("cartTotal");
        if(cartTotal) cartTotal.textContent = "₹0";
        return;
    }
    const lines = cart.map((c,i)=> `${i+1}. ${c.name} (₹${c.price})`).join("<br>");
    mini.innerHTML = lines;
    const cartItems = document.getElementById("cartItems");
    if(cartItems) cartItems.innerHTML = lines;
    const cartTotal = document.getElementById("cartTotal");
    if(cartTotal) cartTotal.textContent = `₹${cart.reduce((s,c)=>s+c.price,0)}`;
}

// Clear cart
export function clearCart(){
    cart = [];
    updateMiniCart();
}
