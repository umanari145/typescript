import { createElementBlock } from 'vue';
import { Cities } from './repositories/cities';

window.addEventListener('load', async () => {
  const cities = new Cities();

  const res = await cities.getPrefs();
  console.log(res);
  const locationEl = document.getElementById('pref_list');
  res.data.forEach((pref: any) => {
    const labelwrap = document.createElement('div');

    console.log(pref);
    const radioEl = document.createElement('input');
    radioEl.type = 'radio';
    radioEl.id = pref.pref_code;
    radioEl.value = pref.pref_code;
    radioEl.name = 'pref';

    labelwrap.appendChild(radioEl);

    const labelEl = document.createElement('label');
    labelEl.htmlFor = pref.pref_code;
    labelEl.textContent = pref.pref_name;
    labelwrap.appendChild(labelEl);
    locationEl?.appendChild(labelwrap);
  });
});
