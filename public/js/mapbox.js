/* eslint-disable */
export const displayMap = (locations) => {
  const isTouchDevice =
    window.matchMedia('(max-width: 50em)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  // Create map
  const map = L.map('map', {
    scrollWheelZoom: false,
    dragging: !isTouchDevice,
    touchZoom: !isTouchDevice,
    doubleClickZoom: !isTouchDevice,
    boxZoom: !isTouchDevice,
    keyboard: !isTouchDevice,
    tap: false,
    zoomControl: !isTouchDevice,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const bounds = L.latLngBounds();

  locations.forEach((loc) => {
    // Add marker
    const marker = L.marker([loc.coordinates[1], loc.coordinates[0]], {
      icon: L.divIcon({
        className: 'marker',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      }),
    }).addTo(map);

    // Add popup and open automatically
    marker
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        closeOnClick: false,
      })
      .openPopup();

    bounds.extend([loc.coordinates[1], loc.coordinates[0]]);
  });

  map.fitBounds(bounds, {
    padding: [150, 150],
  });
};
