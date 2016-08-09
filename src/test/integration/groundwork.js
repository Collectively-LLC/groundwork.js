import Groundwork from 'lib/index';

const API_KEY = 'pub-lantern.groundworkjs-launchpad--RQW_fyEo.1sxOAZxl1bX1aIweVg1IuBlC1_NqGkzkrUVnrIiRa7kM__XERxEAxSF6WzUVVhnleRmyrZsA.vvWg'; /* eslint max-len: 0 */
const API_URL = 'https://api.dev.thegroundwork.com';

const gw = new Groundwork({
  apiKey: API_KEY,
  apiUrl: API_URL
});

export default gw;
