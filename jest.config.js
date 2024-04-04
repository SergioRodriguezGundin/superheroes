module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  //transform: {
  //  "^.+\\.(ts|js|html)$": "jest-preset-angular",
  //  "^.+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  //},
  moduleNameMapper: {
    "^d3/(.*)$": "<rootDir>/node_modules/d3/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!d3|d3-array|d3-axis|d3-scale|d3-shape|d3-time-format|d3-time|d3-collection|d3-interpolate|d3-path|d3-polygon|d3-quadtree|d3-random|d3-geo|d3-geo-projection|d3-geo-path|d3-hierarchy|d3-force|d3-dispatch|d3-request|d3-transition|d3-timer|d3-ease|d3-color|d3-contour|d3-delaunay|d3-format|d3-path-parser|d3-geo-projection|d3-geo-voronoi|d3-quadtree|d3-timer|d3-scale-chromatic|d3-time-format|d3-time|d3-collection|d3-interpolate|d3-path|d3-polygon|d3-random|d3-geo|d3-geo-projection|d3-geo-path|d3-hierarchy|d3-force|d3-dispatch|d3-request|d3-transition|d3-ease|d3-color|d3-contour|d3-delaunay|d3-format|d3-path-parser|d3-geo-projection|d3-geo-voronoi|d3-quadtree|d3-timer|d3-scale-chromatic|d3-time-format|d3-time|d3-collection|d3-interpolate|d3-path|d3-polygon|d3-random|d3-geo|d3-geo-projection|d3-geo-path|d3-hierarchy|d3-force|d3-dispatch|d3-request|d3-transition|d3-ease|d3-color|d3-contour|d3-delaunay|d3-format|d3-path-parser)/",
  ],
};
