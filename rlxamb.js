function setUpSettings(s) {
  var settingsBox = document.createElement('div');
  settingsBox.id = 'settings';
  document.body.appendChild(settingsBox);

  Object.keys(s).forEach(k => {
    const type = getInputType(s[k]);
    if (type === null) return;

    const el = document.createElement('p');

    const l = document.createElement('label');
    l.textContent = k;
    el.appendChild(l);

    const i = document.createElement('input');
    i.setAttribute('type', type);
    if (type === 'checkbox') {
      i.checked = s[k];
    } else {
      i.setAttribute('value', s[k]);
    }
    if (type === 'number') {
      var stringVal = s[k] + '';
      var precision = -(stringVal.split(".")[1] || []).length;
      if (precision === 0) {
        var precision = (stringVal.split(/[1-9]/).reverse()[0] || []).length;
      }
      i.setAttribute('step', Math.pow(10, precision))
    }
    el.appendChild(i);
    i.addEventListener('input', valueChange);
    i.addEventListener('change', valueChange);

    function valueChange(e) {
      console.log(e);
      if (type === 'checkbox') {
        s[k] = e.target.checked;
      } else if (type === 'number') {
        s[k] = parseFloat(e.target.value);
      } else {
        s[k] = e.target.value;
      }
    }

    settingsBox.appendChild(el);
  });

  function getInputType(val) {
    // http://stackoverflow.com/a/6449623/2178159
    if (!isNaN(parseFloat(val)) && isFinite(val)) {
      return 'number';
    } else if (typeof val === 'string') {
      return 'text';
    } else if (typeof val === 'boolean') {
      return 'checkbox';
    } else {
      return null;
    }
  }
};

window.setTimeout(() => {
  if (typeof settings !== 'undefined' &&
      (typeof __meta_settings__ === 'undefined' ||
      !__meta_settings__.disabled)) {
    setUpSettings(settings);
  }
});