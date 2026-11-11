(() => {
  'use strict';
  const content = window.CV_CONTENT;
  if (!content) return;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const order = ['aiesec', 'ventures', 'gaus', 'xor', 'index', 'mind'];
  const chapters = Object.fromEntries(content.chapters.map(chapter => [chapter.id, chapter]));
  const cases = {
    index: { role: 'Global Growth Partner & Board Member', label: 'Index.dev / Talent platform', value: '20,000', caption: 'Vetted professionals in the talent network.', steps: [['Jan 2025 – Present', 'Global Growth Partner & Board Member'], ['Jan 2024 – Feb 2025', 'VP of Talent Platform'], ['Oct 2022 – Jan 2024', 'VP of Talent'], ['Jan 2022 – Oct 2022', 'Director of Sourcing']], detail: 'Four roles. One expanding mandate.' },
    mind: { role: 'Project Manager', label: 'MIND / The next talent category', value: 'Talent.<br>Agents.', caption: 'Building at the frontier of the AI workforce.', steps: [['01', 'AI talent'], ['02', 'AI agents'], ['03', 'Go-to-market & operations']], detail: 'The perspective behind the work' },
    xor: { role: 'EMEA Region Director', label: 'XOR.ai / Market creation', value: '0 <span>&rarr;</span><br>EMEA', caption: 'An entire commercial territory, built from zero.', steps: [['Start', 'No team. No pipeline.'], ['Build', 'Enterprise HR relationships'], ['Win', 'MOL Group, flagship account']], detail: 'The perspective behind the work' },
    gaus: { role: 'Co-Founder & CEO', label: 'GAUS / Funded founder experience', value: '25<span>+</span>', caption: 'Candidate-engagement signals in the matching logic.', steps: [['01', 'Funding & accelerator'], ['02', 'Product & matching algorithm'], ['03', 'EU & Baltic go-to-market']], detail: 'The founder perspective' },
    ventures: { role: 'Co-Founder · Managing Partner · Trainer', label: 'Ventures / HR & learning', value: '7<span>+</span>', caption: 'Years training leaders at AND.', steps: [['Build', 'TalentKapital, corporate learning'], ['Scale', 'Kintaly, events across 7 countries'], ['Teach', 'Leadership, sales, HR & teams']], detail: 'The perspective behind the work' },
    aiesec: { role: 'Founder, AIESEC Moldova · VP Talent, AIESEC Ukraine', label: 'AIESEC / The foundations', value: '700<span>+</span>', caption: 'People in talent systems across 16 cities.', steps: [['Start', 'AIESEC Moldova, from a blank sheet'], ['Build', 'Recruitment & learning systems'], ['Scale', 'Talent leadership in Ukraine']], detail: 'The perspective behind the work' }
  };
  let active = 'index';
  let lastOpener;
  let copyTimer;

  function icons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(placeholder => {
      const definition = window.CV_ICONS?.[placeholder.dataset.icon];
      if (!definition) return;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      Object.entries({ xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' }).forEach(([name, value]) => svg.setAttribute(name, value));
      definition.forEach(([tag, attributes]) => {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
        svg.appendChild(element);
      });
      placeholder.replaceWith(svg);
    });
  }

  function visual(id) {
    const data = cases[id];
    const isText = ['mind', 'xor'].includes(id);
    const detail = id === 'index'
      ? `<div class="network-chart" id="network-chart" data-mode="after" role="img" aria-label="The talent network after growth: 20,000 vetted professionals. Forty equal blocks each represent 500 professionals.">${Array.from({ length: 40 }, () => '<span class="is-filled" aria-hidden="true"></span>').join('')}</div><div class="network-foot"><p>2,000 &rarr; 20,000<br>10&times; growth in under two years.</p><div class="network-toggle" role="group" aria-label="Talent network before and after growth"><button data-network="before" aria-pressed="false">Before</button><button data-network="after" aria-pressed="true">After</button></div></div>`
      : `<div class="visual-stages">${data.steps.map(([label, text]) => `<div><span>${esc(label)}</span><b>${esc(text)}</b></div>`).join('')}</div>`;
    return `<div class="visual-label"><span>${esc(data.label)}</span><span>${String(order.indexOf(id) + 1).padStart(2, '0')}</span></div><div class="visual-number${isText ? ' is-text' : ''}${id === 'index' ? ' is-count' : ''}" ${id === 'index' ? 'id="network-count" aria-live="polite"' : ''}>${data.value}</div><p class="visual-caption">${esc(data.caption)}</p>${detail}`;
  }

  function select(id, animate = true) {
    if (!chapters[id]) return;
    active = id;
    const chapter = chapters[id];
    const data = cases[id];
    const panel = $('#case-panel');
    document.querySelectorAll('[data-case]').forEach(button => {
      const selected = button.dataset.case === id;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    $('.case-surface').dataset.tone = id;
    $('#case-visual').innerHTML = visual(id);
    $('#case-date').textContent = chapter.years;
    $('#case-location').textContent = chapter.place;
    $('#case-title').textContent = chapter.title;
    $('#case-role').textContent = data.role;
    $('#case-summary').textContent = chapter.sub;
    $('#case-points').innerHTML = chapter.points.map(point => `<li>${esc(point)}</li>`).join('');
    $('#case-detail').open = false;
    $('#case-detail-title').textContent = data.detail;
    $('#case-detail-body').innerHTML = id === 'index'
      ? `<ol class="role-progression">${data.steps.map(([date, role]) => `<li><span>${esc(date)}</span><b>${esc(role)}</b></li>`).join('')}</ol>`
      : `<p>${esc(chapter.signal)}</p>`;
    $('#case-signal').textContent = id === 'mind' ? 'AI talent, agents and practical workforce transformation.' : chapter.signal;
    $('#case-count').textContent = `${String(order.indexOf(id) + 1).padStart(2, '0')} / 06`;
    if (id === 'index') {
      document.querySelectorAll('[data-network]').forEach(button => button.addEventListener('click', () => changeNetwork(button.dataset.network)));
    }
    if (animate && !reducedMotion.matches) {
      panel.getAnimations().forEach(animation => animation.cancel());
      panel.animate([{ opacity: .6, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
    }
  }

  function changeNetwork(mode) {
    const after = mode === 'after';
    const count = after ? 20000 : 2000;
    $('#network-count').textContent = count.toLocaleString('en-US');
    $('#network-chart').dataset.mode = mode;
    $('#network-chart').setAttribute('aria-label', `The talent network ${after ? 'after' : 'before'} growth: ${count.toLocaleString('en-US')} vetted professionals. Each of forty equal blocks represents 500 professionals.`);
    [...$('#network-chart').children].forEach((block, index) => block.classList.toggle('is-filled', after || index < 4));
    document.querySelectorAll('[data-network]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.network === mode)));
  }

  function move(delta, focus = false) {
    const next = order[(order.indexOf(active) + delta + order.length) % order.length];
    select(next);
    if (focus) $(`#tab-${next}`).focus();
    else if (window.matchMedia('(max-width: 620px)').matches) $('#case-panel').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  }

  document.querySelectorAll('[data-case]').forEach(button => {
    button.addEventListener('click', () => select(button.dataset.case));
    button.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') {
        const id = event.key === 'Home' ? order[0] : order.at(-1);
        select(id);
        $(`#tab-${id}`).focus();
      } else move(event.key === 'ArrowRight' ? 1 : -1, true);
    });
  });
  document.querySelectorAll('[data-case-link]').forEach(link => link.addEventListener('click', () => select(link.dataset.caseLink)));
  $('#previous-case').addEventListener('click', () => move(-1));
  $('#next-case').addEventListener('click', () => move(1));

  const languages = content.cv.find(section => section.t === 'Languages');
  const education = content.cv.find(section => section.t === 'Education');
  const training = content.cv.find(section => section.t === 'Certifications & Training');
  $('#language-list').innerHTML = languages.entries.flatMap(entry => entry.bullets).map(language => `<li>${esc(language)}</li>`).join('');
  $('#learning-list').innerHTML = `<h3>Education</h3>${education.entries.map(entry => `<p>${esc(entry.head)}<span>${esc(entry.sub)} · ${esc(entry.meta)}</span></p>`).join('')}<h3>Certifications &amp; Training</h3><ul>${training.entries.flatMap(entry => entry.bullets).map(text => `<li>${esc(text)}</li>`).join('')}</ul>`;

  const dialog = $('#cv-dialog');
  document.querySelectorAll('[data-open-cv]').forEach(link => link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    lastOpener = link;
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
  }));
  $('#cv-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lastOpener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button, a[href], [tabindex="0"]')].filter(control => !control.disabled && control.getClientRects().length);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  $('#cv-print').addEventListener('click', () => window.print());
  $('#copy-email').addEventListener('click', async () => {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText('eugen.girla@gmail.com');
      $('#copy-status').textContent = 'Copied';
      $('#copy-email').innerHTML = '<i data-icon="Check"></i>';
      icons($('#copy-email'));
      copyTimer = setTimeout(() => {
        $('#copy-status').textContent = '';
        $('#copy-email').innerHTML = '<i data-icon="Copy"></i>';
        icons($('#copy-email'));
      }, 3000);
    } catch {
      $('#copy-status').textContent = 'Select the email address to copy it.';
      const range = document.createRange();
      range.selectNodeContents($('.email'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  select(active, false);
  icons();
})();
