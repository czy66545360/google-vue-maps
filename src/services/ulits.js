module.exports.G_position_reset = (position) => {
  if (!position) {
    throw `position:${position}`;
    return
  }
  if (Array.isArray(position)) {
    return new window.google.maps.LatLng({lng: position[0], lat: position[1]})
  } else {
    return position
  }
};
