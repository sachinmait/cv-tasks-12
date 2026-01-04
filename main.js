// CV Visualizer Logic

function switchTab(tabId) {
    // 1. Deactivate all buttons & tabs
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // 2. Activate clicked
    const btnBox = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.textContent.toLowerCase().includes(tabId));
    // Simpler: Just rely on onclick context if we passed 'this', but we passed ID string.
    // Let's match by index or just find the one that called it.
    // Actually, let's just use the index mapping or event target if possible.
    // Easier: Select by order since ID matches content broadly? No.
    // Let's just find the button where onclick has the string.
    const btns = document.querySelectorAll('.tab-btn');
    if (tabId === 'detect') btns[0].classList.add('active');
    if (tabId === 'classify') btns[1].classList.add('active');
    if (tabId === 'segment') btns[2].classList.add('active');
    if (tabId === 'face') btns[3].classList.add('active');
    if (tabId === 'action') btns[4].classList.add('active');

    // 3. Activate Pane
    document.getElementById('tab-' + tabId).classList.add('active');
}


function toggleOverlay(type) {
    if (type === 'detect') {
        const el = document.getElementById('overlay-detect');
        el.classList.toggle('active');
    } else if (type === 'seg') {
        const el = document.getElementById('overlay-seg');
        el.classList.toggle('active');
        el.classList.toggle('seg-active'); // Adds the gradient
    }
}

function classifyImage() {
    const card = document.getElementById('class-result');
    // Simple visual effect: opacity 1, scale normal
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
}

function startFaceScan() {
    const overlay = document.getElementById('overlay-face');
    const msg = document.getElementById('face-msg');
    const boxLabel = overlay.querySelector('.face-box span');

    overlay.classList.add('active');
    msg.style.display = 'none';
    boxLabel.textContent = 'SCANNING...';
    boxLabel.parentElement.style.borderColor = '#000';

    // Simulate API delay
    setTimeout(() => {
        boxLabel.textContent = 'VERIFIED';
        boxLabel.style.background = '#99E885'; // Green
        boxLabel.parentElement.style.borderColor = '#99E885';
        msg.style.display = 'block';
    }, 2000);
}

function analyzeAction() {
    const label = document.getElementById('action-label');
    const stickman = document.querySelector('.stickman');

    label.innerHTML = "Status: <b>Analyzing...</b>";
    label.style.background = '#FFCF56'; // Yellow

    setTimeout(() => {
        label.innerHTML = "Action Detected: <b style='color:red'>RUNNING</b>";
        label.style.background = '#fff';
        // Speed up animation
        stickman.style.animationDuration = '0.2s';
    }, 1500);
}
