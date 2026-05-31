// هنا سيتم كتابة أكواد الـ JavaScript 
// سيتم تنفيذ هذا الملف داخل صفحة app.turath.io

console.log("Turath Redesign Extension Loaded");

let toolsMenuToggleButton = null;
let lastClickedButton = null;

// التقاط الزر الذي يتم النقر عليه لتحديد الزر الذي يفتح القائمة السفلية
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) {
    lastClickedButton = btn;
  }
}, true);

const observer = new MutationObserver((mutations) => {
  if (!document.body) return;
  
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList.contains('tools-menu') || node.querySelector('.tools-menu')) {
            if (lastClickedButton) {
              toolsMenuToggleButton = lastClickedButton;
            }
          }
        }
      });
    }
  });
});

// إضافة خاصية إغلاق القائمة السفلية (.tools-menu) بطريقة ذكية لا تتعارض مع حالة Svelte
document.addEventListener('click', (e) => {
  const toolsMenu = document.querySelector('.tools-menu');
  
  if (toolsMenu && !toolsMenu.contains(e.target)) {
    // إذا كان المستخدم يضغط على الزر الأصلي الذي فتحها أو أي زر آخر، دعه يتصرف بشكل طبيعي
    if (e.target.closest('button')) {
      return;
    }

    // بدلاً من إخفاء القائمة بالقوة، نقوم برمجياً بالنقر على الزر الأصلي الذي فتحها ليغلقها بشكل طبيعي وتتزامن الأيقونات!
    if (toolsMenuToggleButton) {
      toolsMenuToggleButton.click();
    } else {
      toolsMenu.style.setProperty('display', 'none', 'important');
    }
  }
}, true);

function init() {
  observer.observe(document.body, { childList: true, subtree: true });
}

// لأن الإضافة تعمل في مرحلة document_start قد لا يكون body موجوداً بعد
if (document.body) {
  init();
} else {
  window.addEventListener('DOMContentLoaded', init);
}
