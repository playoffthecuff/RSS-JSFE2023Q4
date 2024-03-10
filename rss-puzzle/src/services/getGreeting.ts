export default function getGreeting() {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  let pre = '';
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 11 && hours < 18) {
    pre = 'Good day, ';
  }
  if (hours >= 18 && hours < 23) {
    pre = 'Good evening, ';
  }
  if (hours >= 23 && hours < 4) {
    pre = 'Good night, ';
  }
  if (hours >= 4 && hours < 11) {
    pre = 'Good morning, ';
  }
  return `${pre + firstName} ${lastName}!`;
}
