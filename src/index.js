import Donation from './Donation';
import Event from './Event';
import Profile from './Profile';
import Quickcard from './Quickcard';
import Subscription from './Subscription';
import Supporter from './Supporter';
import groundworkFactory from './groundworkFactory';

// Default build with all services included
const Groundwork = groundworkFactory([
  Donation,
  Event,
  Profile,
  Quickcard,
  Subscription,
  Supporter
]);

module.exports = Groundwork;
