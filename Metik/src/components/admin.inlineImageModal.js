/**
 * Modal chọn ảnh Vanilla JS — chèn vào document.body để vượt qua Puck overlay.
 * 2 tab: Upload file và Link URL.
 * @param {HTMLImageElement} imgEl - Thẻ img DOM thật để set src trực tiếp (preview tức thì)
 * @param {function} onChanged - Callback(newUrl) khi ảnh thay đổi
 */
export function showImageModal(imgEl, onChanged) {
    const existingModal = document.querySelector('[data-inline-image-modal]');
    if (existingModal) existingModal.remove();
  
    if (!document.getElementById('_inlineImgModalKF')) {
      const kf = document.createElement('style');
      kf.id = '_inlineImgModalKF';
      kf.textContent = `
        @keyframes _iimFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes _iimSlideUp { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `;
      document.head.appendChild(kf);
    }
  
    const backdrop = document.createElement('div');
    backdrop.setAttribute('data-inline-image-modal', 'true');
    backdrop.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);backdrop-filter:blur(4px);animation:_iimFadeIn .2s ease';
  
    const modal = document.createElement('div');
    modal.style.cssText = 'background:#fff;border-radius:12px;width:480px;max-width:90vw;box-shadow:0 8px 30px rgba(0,0,0,.12),0 0 0 1px rgba(0,0,0,.06);animation:_iimSlideUp .25s cubic-bezier(.16,1,.3,1);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
  
    const tabBar = document.createElement('div');
    tabBar.style.cssText = 'display:flex;border-bottom:1px solid rgba(0,0,0,.08);padding:0 16px';
  
    let activeTab = 'upload';
    const tabs = [{ key: 'upload', label: 'Upload' }, { key: 'link', label: 'Link' }];
    const tabBtns = {};
  
    tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.textContent = tab.label;
      const setStyle = (active) => {
        btn.style.cssText = `background:none;border:none;padding:12px 16px;font-size:14px;cursor:pointer;color:${active ? '#1a1a1a' : 'rgba(0,0,0,.4)'};border-bottom:2px solid ${active ? '#1a1a1a' : 'transparent'};font-weight:${active ? '600' : '400'};transition:all .15s ease;font-family:inherit`;
      };
      setStyle(tab.key === activeTab);
      btn.addEventListener('click', () => { activeTab = tab.key; tabs.forEach(t => tabBtns[t.key].setStyle(t.key === activeTab)); updateContent(); });
      tabBtns[tab.key] = { el: btn, setStyle };
      tabBar.appendChild(btn);
    });
  
    const contentArea = document.createElement('div');
    contentArea.style.cssText = 'padding:20px 20px 24px';
  
    function updateContent() {
      contentArea.innerHTML = '';
      if (activeTab === 'upload') {
        const label = document.createElement('label');
        label.style.cssText = 'display:flex;align-items:center;justify-content:center;height:48px;border:1px solid rgba(0,0,0,.12);border-radius:8px;cursor:pointer;color:rgba(0,0,0,.7);font-size:14px;font-weight:500;background:rgba(0,0,0,.02);font-family:inherit;transition:all .15s ease';
        label.textContent = 'Upload file';
        label.addEventListener('mouseenter', () => { label.style.borderColor = 'rgba(0,0,0,.2)'; label.style.background = 'rgba(0,0,0,.04)'; });
        label.addEventListener('mouseleave', () => { label.style.borderColor = 'rgba(0,0,0,.12)'; label.style.background = 'rgba(0,0,0,.02)'; });
        const input = document.createElement('input');
        input.type = 'file'; input.accept = 'image/*'; input.style.display = 'none';
        input.addEventListener('change', (e) => {
          const file = e.target.files[0]; if (!file) return;
          const newUrl = '/assets/images/' + file.name;
          if (imgEl) imgEl.setAttribute('src', newUrl); 
          if (onChanged) onChanged(newUrl); 
          closeModal();
        });
        label.appendChild(input);
        contentArea.appendChild(label);
        const hint = document.createElement('div');
        hint.style.cssText = 'margin-top:12px;color:rgba(0,0,0,.35);font-size:12px;text-align:center';
        hint.textContent = 'Hỗ trợ: JPG, PNG, GIF, SVG, WEBP';
        contentArea.appendChild(hint);
      } else {
        const linkInput = document.createElement('input');
        linkInput.type = 'text'; linkInput.placeholder = 'Dán link ảnh vào đây...';
        linkInput.style.cssText = 'width:100%;box-sizing:border-box;padding:12px 14px;border:2px solid rgba(80,160,255,.5);border-radius:8px;background:#fff;color:#1a1a1a;font-size:14px;outline:none;transition:border-color .15s ease;font-family:inherit';
        const embedBtn = document.createElement('button');
        embedBtn.textContent = 'Embed image';
        embedBtn.style.cssText = 'display:block;width:100%;margin-top:14px;padding:12px 0;border:none;border-radius:8px;background:#2383e2;color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s ease;font-family:inherit';
        embedBtn.addEventListener('mouseenter', () => { embedBtn.style.background = '#1b6ec2'; });
        embedBtn.addEventListener('mouseleave', () => { embedBtn.style.background = '#2383e2'; });
        embedBtn.addEventListener('click', () => {
          const url = linkInput.value.trim();
          if (url) { if (imgEl) imgEl.setAttribute('src', url); if (onChanged) onChanged(url); closeModal(); }
        });
        linkInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); embedBtn.click(); } });
        contentArea.appendChild(linkInput);
        contentArea.appendChild(embedBtn);
        const hint = document.createElement('div');
        hint.style.cssText = 'margin-top:12px;color:rgba(0,0,0,.35);font-size:12px;text-align:center';
        hint.textContent = 'Hỗ trợ: URL trực tiếp, data:image base64, đường dẫn tương đối (/)';
        contentArea.appendChild(hint);
        setTimeout(() => linkInput.focus(), 50);
      }
    }
  
    function closeModal() {
      backdrop.style.animation = 'none'; backdrop.style.opacity = '0'; backdrop.style.transition = 'opacity .15s ease';
      setTimeout(() => backdrop.remove(), 160);
    }
  
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', function onEsc(e) { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', onEsc); } });
  
    modal.appendChild(tabBar); modal.appendChild(contentArea); backdrop.appendChild(modal); document.body.appendChild(backdrop);
    updateContent();
  }
