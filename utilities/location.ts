export function removeHash() {
  console.log('here');
  history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search,
  );
}
