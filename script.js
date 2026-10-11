const body = document.getElementById('app-body');
const mainDropdown = document.getElementById('main-dropdown');
const sidebarDrawer = document.getElementById('sidebar-drawer');

// --- Navigation Engine ---
function navigateTo(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.classList.add('hidden'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }
}

// --- Menu Dropdown Controls (Click to Toggle On/Off) ---
function toggleMainDropdown() {
  mainDropdown.classList.toggle('hidden');
}

function hideMainDropdown() {
  mainDropdown.classList.add('hidden');
}

// --- Sidebar Toggle ---
function toggleSidebar() {
  sidebarDrawer.classList.toggle('hidden');
}

// --- Data Lists ---
const themesList = [
  { id: 'neon-galaxy', name: 'Neon Galaxy', color: '#c77dff' },
  { id: 'default', name: 'Modern Default', color: '#38bdf8' },
  { id: 'hawaiian-waves', name: 'Hawaiian Waves', color: '#3defac' },
  { id: 'indian-authentics', name: 'Indian Authentics', color: '#ffb703' },
  { id: 'emerald-forest', name: 'Emerald Forest', color: '#74c69d' },
  { id: 'sunset-boulevard', name: 'Sunset Boulevard', color: '#ff758f' },
  { id: 'royal-velvet', name: 'Royal Velvet', color: '#e0a96d' },
  { id: 'neon-cyber', name: 'Neon Cyber', color: '#00ffff' },
  { id: 'golden-luxe', name: 'Golden Luxe', color: '#ffd700' },
  { id: 'cherry-blossom', name: 'Cherry Blossom', color: '#ff758f' }
];

const fontsList = [
  { class: 'font-poppins', name: 'Poppins' },
  { class: 'font-montserrat', name: 'Montserrat' },
  { class: 'font-orbitron', name: 'Orbitron' },
  { class: 'font-cinzel', name: 'Cinzel' },
  { class: 'font-playfair', name: 'Playfair Display' },
  { class: 'font-dancing', name: 'Dancing Script' },
  { class: 'font-pacifico', name: 'Pacifico' },
  { class: 'font-lobster', name: 'Lobster' },
  { class: 'font-fira', name: 'Fira Code' },
  { class: 'font-roboto-mono', name: 'Roboto Mono' }
];

const backgroundsList = [
  { name: 'Nebula Galaxy', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600' },
  { name: 'Hawaiian Waves', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600' },
  { name: 'Palace Architecture', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1600' },
  { name: 'Northern Lights', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1600' },
  { name: 'Vibrant Sunset', url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1600' },
  { name: 'Misty Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600' },
  { name: 'Neon City', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600' },
  { name: 'Golden Desert', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600' },
  { name: 'Mountain Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600' },
  { name: 'Abstract Art', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600' }
];

// --- Populate Gallery Grids ---
function populateGalleries() {
  const themesGrid = document.getElementById('themes-grid');
  themesGrid.innerHTML = '';
  themesList.forEach(t => {
    const card = document.createElement('div');
    card.className = 'square-card';
    card.style.borderColor = t.color;
    card.innerHTML = `<h4 style="color:${t.color}">${t.name}</h4>`;
    card.onclick = () => applyTheme(t.id, t.name);
    themesGrid.appendChild(card);
  });

  const fontsGrid = document.getElementById('fonts-grid');
  fontsGrid.innerHTML = '';
  fontsList.forEach(f => {
    const card = document.createElement('div');
    card.className = `square-card ${f.class}`;
    card.innerHTML = `<h4>${f.name}</h4><p style="font-size:0.8rem">123 + 456</p>`;
    card.onclick = () => applyFont(f.class, f.name);
    fontsGrid.appendChild(card);
  });

  const backgroundsGrid = document.getElementById('backgrounds-grid');
  backgroundsGrid.innerHTML = '';
  backgroundsList.forEach(bg => {
    const card = document.createElement('div');
    card.className = 'square-card';
    card.style.backgroundImage = `url("${bg.url}")`;
    card.innerHTML = `<span style="background:rgba(0,0,0,0.8); padding:4px 8px; border-radius:4px; font-weight:bold">${bg.name}</span>`;
    card.onclick = () => applyBackground(bg.url);
    backgroundsGrid.appendChild(card);
  });
}

// --- Apply Styles Globally ---
function applyTheme(themeId, themeName) {
  body.className = body.className.replace(/theme-\S+/g, '');
  body.classList.add(`theme-${themeId}`);
  alert(`Theme updated to ${themeName}!`);
}

function applyFont(fontClass, fontName) {
  body.className = body.className.replace(/font-\S+/g, '');
  body.classList.add(fontClass);
  alert(`Font style updated to ${fontName}!`);
}

function applyBackground(url) {
  body.style.backgroundImage = `url("${url}")`;
  alert('Sharp HD background applied successfully!');
}

function uploadCustomBackground(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      body.style.backgroundImage = `url("${e.target.result}")`;
      alert('Custom background uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }
}

// --- Calculator Logic with Ans Memory ---
const display = document.getElementById('display');
const cursorToggleBtn = document.getElementById('cursor-toggle-btn');
let isInitialValue = true;
let isCursorVisible = false;
let lastResult = null;

function toggleCursor() {
  isCursorVisible = !isCursorVisible;
  if (isCursorVisible) {
    display.classList.add('show-cursor');
    display.removeAttribute('readonly');
    cursorToggleBtn.textContent = '| Cursor: ON';
    cursorToggleBtn.classList.add('active');
  } else {
    display.classList.remove('show-cursor');
    display.setAttribute('readonly', 'true');
    cursorToggleBtn.textContent = '| Cursor: OFF';
    cursorToggleBtn.classList.remove('active');
  }
  display.focus();
}

function appendValue(val) {
  if (lastResult !== null && ['+', '-', '*', '/'].includes(val)) {
    display.value = lastResult + val;
    lastResult = null;
    isInitialValue = false;
    display.focus();
    return;
  }

  if (isInitialValue && val !== '.') {
    display.value = val;
    isInitialValue = false;
    display.setSelectionRange(1, 1);
  } else {
    let cursorPos = display.selectionStart;
    let text = display.value;
    
    if (text === '0' && val !== '.') {
      display.value = val;
      display.setSelectionRange(1, 1);
      isInitialValue = false;
      return;
    }

    display.value = text.slice(0, cursorPos) + val + text.slice(cursorPos);
    display.setSelectionRange(cursorPos + 1, cursorPos + 1);
  }
  display.focus();
}

function clearDisplay() {
  display.value = '0';
  isInitialValue = true;
  lastResult = null;
  display.focus();
}

function deleteChar() {
  if (isInitialValue) return;
  let cursorPos = display.selectionStart;
  let val = display.value;

  if (cursorPos > 0) {
    display.value = val.slice(0, cursorPos - 1) + val.slice(cursorPos);
    display.setSelectionRange(cursorPos - 1, cursorPos - 1);
  } else {
    display.value = val.slice(0, -1);
  }

  if (display.value === '') {
    display.value = '0';
    isInitialValue = true;
  }
  display.focus();
}

function moveCursor(direction) {
  let cursorPos = display.selectionStart;
  if (direction === 'left' && cursorPos > 0) {
    display.setSelectionRange(cursorPos - 1, cursorPos - 1);
  } else if (direction === 'right' && cursorPos < display.value.length) {
    display.setSelectionRange(cursorPos + 1, cursorPos + 1);
  }
  display.focus();
}

function calculate() {
  try {
    let expression = display.value.replace(/Ans/g, lastResult !== null ? lastResult : '0');
    let evaluated = eval(expression);
    display.value = evaluated;
    lastResult = evaluated;
    isInitialValue = true;
  } catch (error) {
    display.value = 'Error';
    isInitialValue = true;
    lastResult = null;
  }
  display.focus();
}

// Initialize Galleries
populateGalleries();