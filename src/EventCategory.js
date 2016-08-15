import { only, urlJoin } from './utils';
import { NAMESPACE, ENDPOINT_EVENT, ENDPOINT_CATEGORY } from './Event';
import eventCategorySchema from './schema/eventCategory';

/**
 * An EventCategory is a sub-object of an Event. It describes a block of time within
 * an Event.
 *
 * @example
 * const gw = new Groundwork({...});
 *
 * // List all categories, while passing in an optional config
 * gw.events.listCategories({ page: 2, perPage: 10 })
 *   .then((response) => console.log(response))
 *   .catch((err) => console.error(err));
 *
 * gw.events.fetchCategory(<event id>, <category id>)
 *   .then((response) => console.log(response))
 *   .catch((err) => console.error(err));
 *
 * // Create a new category with required properties
 * const categoryProps = {
 *   description: 'Reserved for our most active supporters',
 *   quantityTotal: 10,
 *   timeEnd: '2016-09-26T15:00:00',
 *   timeStart: '2016-09-26T13:00:00',
 *   title: 'VIP'
 * };
 *
 * gw.events.createCategory(<event id>, categoryProps)
 *   .then((response) => console.log(response))
 *   .catch((err) => console.error(err));
 *
 * gw.events.updateCategory(<event id>, <category id>, { description: 'new description' })
 *   .then((response) => console.log(response))
 *   .catch((err) => console.error(err));
 *
 * gw.events.replaceCategory(<event id>, <category id>, {...})
 *   .then((response) => console.log(response))
 *   .catch((err) => console.error(err));
 *
 * gw.events.delCategory(<event id>, <category id>)
 *   .then((response) => console.log(response))
 *   .catch((err) => console.error(err));
 */
export default class EventCategory {
  /**
   * List all Categories on an Event
   *
   * @param {String} eventId - id of event
   * @param {Object} [opts] - options object
   * @param {Number} [opts.page] -
   *   an Integer indicating which page of results should be returned
   * @param {Number} [opts.perPage] -
   *   an Integer indicating how many results should be returned per request
   * @param {String} [opts.startsBefore] -
   *   an ISO-8601 formatted String given in local time without a timezone designator.
   *   Only events occuring before the given timestamp will be returned.
   * @param {String} [opts.startsAfter] -
   *   an ISO-8601 formatted String given in local time without a timezone designator.
   *   Only events occuring after the given timestamp will be returned.
   * @return {Promise}
   */
  listCategories(eventId, opts = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const _opts = only(['page', 'perPage', 'startsBefore', 'startsAfter'], opts);
    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY);

    return this.http.get(url, { params: _opts });
  }

  /**
   * Get a specific Category, by id
   *
   * @param  {String} eventId - id of event
   * @param  {String} categoryId - id of category
   * @return {Promise}
   */
  fetchCategory(eventId, categoryId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId);
    return this.http.get(url);
  }

  /**
   * Create a Category on an Event
   *
   * @param  {String} eventId - id of event
   * @param  {Object} [category] - category object
   * @return {Promise}
   */
  createCategory(eventId, category = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [categoryv, categoryp] = this.validatePayload(category, eventCategorySchema);
    if (!categoryv) { return categoryp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY);

    return this.http.post(url, category);
  }

  /**
   * Update an existing Category, by id
   *
   * Only the fields that are passed will be updated.
   *
   * @param  {String} eventId - id of event
   * @param  {String} categoryId - id of category
   * @param  {Object} [category] - category object
   * @return {Profile}
   */
  updateCategory(eventId, categoryId, category = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId);

    return this.http.patch(url, category);
  }

  /**
   * Replace an existing Category, by id
   *
   * All fields are updated. If an optional field is not provided, it will be
   * overwritted as blank.
   *
   * @param  {String} eventId - id of event
   * @param  {String} categoryId - id of category
   * @param  {Object} [category] - category object
   * @return {Promise}
   */
  replaceCategory(eventId, categoryId, category = {}) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const [categoryv, categoryp] = this.validatePayload(category, eventCategorySchema);
    if (!categoryv) { return categoryp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId);

    return this.http.put(url, category);
  }

  /**
   * Delete a specific Category, by id
   *
   * If there are Tickets associated with that Category, the request will fail.
   *
   * @param  {String} eventId - id of event
   * @param  {String} categoryId - id of category
   * @return {Promise}
   */
  delCategory(eventId, categoryId) {
    const [ev, ep] = this.validateId(eventId, 'eventId');
    if (!ev) { return ep; }

    const [cv, cp] = this.validateId(categoryId, 'categoryId');
    if (!cv) { return cp; }

    const url = urlJoin(NAMESPACE, ENDPOINT_EVENT, eventId,
                                   ENDPOINT_CATEGORY, categoryId);
    return this.http.delete(url);
  }
}
