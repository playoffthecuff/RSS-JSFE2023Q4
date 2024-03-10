export default function isUserStored() {
  return localStorage.getItem('firstName') && localStorage.getItem('lastName');
}
