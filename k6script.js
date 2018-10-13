import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '5m',
  rps: 3000
};

export default function() {
  let randomArtist = Math.floor((Math.random() * 1000000) + 9000001);
  let res = http.get(`http://localhost:3000/artists/albums/${randomArtist}`);
  check(res, {
    'status was 200': (r) => r.status === 200,
    'transaction time OK': (r) => r.timings.duration < 600
  });
}