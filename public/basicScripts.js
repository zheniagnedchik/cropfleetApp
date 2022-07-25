if ('serviceWorker' in navigator) {
  console.log('serviceWorker is supported!');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceworker.js')
      .then((reg) => console.log('Success: ', reg.scope))
      .catch((err) => console.log('Failure: ', err));
  });
}
if (window.indexedDB) {
  console.log('IDB is supported!');
} else {
  console.log('IDB isn supported!');
}
