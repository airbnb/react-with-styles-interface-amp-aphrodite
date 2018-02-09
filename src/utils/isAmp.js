// Returns whether the page is an amp page or not. 'process.env.AMP' should be replaced by
// webpack on compile-time with 'true' or 'false'
export default function isAmp() {
  return process.env.AMP;
}
