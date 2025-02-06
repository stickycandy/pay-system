

// 复制
export const copy = (val) => {
  const oInput = document.createElement('input');
  oInput.value = val;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.style.display = 'none';
  document.body.removeChild(oInput);
};