/**
 * PipedriveAPIV1Lib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */

'use strict';

const _request = require('../Http/Client/RequestClient');
const _configuration = require('../configuration');
const _apiHelper = require('../APIHelper');
const _baseController = require('./BaseController');
const _oAuthManager = require('../OAuthManager');

class TeamsController {
    /**
     * Returns data about teams within the company
     *
     * @param  {array}  input    Array with all options for search
     * @param {OrderByEnum} input['orderBy'] (optional) Field name to sort returned teams by
     * @param {NumberBooleanEnum} input['skipUsers'] (optional) When enabled, the teams will not
     * include IDs of member users
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getAllTeams(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        const _pathUrl = '/teams';
        let _queryBuilder = `${_baseUri}${_pathUrl}`;

        // process query parameters
        _queryBuilder = _apiHelper.appendUrlWithQueryParameters(_queryBuilder, {
            order_by: (input.orderBy !== null) ? input.orderBy : 'id',
            skip_users: (input.skipUsers !== null) ? input.skipUsers : null,
        });

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.getAllTeamsAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.getAllTeamsAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static getAllTeamsAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            headers: _headers,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'Teams');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Adds a new team to the company and returns the created object
     *
     * @param  {array}  input    Array with all options for search
     * @param {string} input['name'] The Team name
     * @param {int} input['managerId'] The Team manager ID
     * @param {string} input['description'] (optional) The Team description
     * @param {array} input['users'] (optional) IDs of the Users that belong to the Team
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static addANewTeam(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        const _pathUrl = '/teams';
        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.addANewTeamAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.addANewTeamAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static addANewTeamAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // prepare form data
        const _form = {
            name: input.name,
            manager_id: input.managerId,
            description: input.description,
            users: input.users,
        };

        // remove null values
        _apiHelper.cleanObject(_form);

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            form: _form,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    let response = '';
                    if (_context.response.body) {
                        response = JSON.parse(_context.response.body);
                    }
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'Teams');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else if (_response.statusCode === 403) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Forbidden response';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Forbidden response',
                            errorCode: 403,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Returns data about a specific team
     *
     * @param  {array}  input    Array with all options for search
     * @param {double} input['id'] ID of the team
     * @param {NumberBooleanEnum} input['skipUsers'] (optional) When enabled, the teams will not
     * include IDs of member users
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getASingleTeam(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        let _pathUrl = '/teams/{id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            id: input.id,
        });

        let _queryBuilder = `${_baseUri}${_pathUrl}`;

        // process query parameters
        _queryBuilder = _apiHelper.appendUrlWithQueryParameters(_queryBuilder, {
            skip_users: (input.skipUsers !== null) ? input.skipUsers : null,
        });

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.getASingleTeamAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.getASingleTeamAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static getASingleTeamAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            headers: _headers,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    let response = '';
                    if (_context.response.body) {
                        response = JSON.parse(_context.response.body);
                    }
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'Teams');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else if (_response.statusCode === 404) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Team with specified ID does not exist or is inaccessible';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Team with specified ID does not exist or is inaccessible',
                            errorCode: 404,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Updates an existing team and returns the updated object
     *
     * @param  {array}  input    Array with all options for search
     * @param {double} input['id'] ID of the team
     * @param {string} input['contentType'] (optional) TODO: type description here
     * @param {object} input['body'] (optional) TODO: type description here
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static updateATeam(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        let _pathUrl = '/teams/{id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            id: input.id,
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.updateATeamAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.updateATeamAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static updateATeamAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'Content-Type': input.contentType,
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'PUT',
            headers: _headers,
            body: _apiHelper.jsonSerialize(input.body),
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    let response = '';
                    if (_context.response.body) {
                        response = JSON.parse(_context.response.body);
                    }
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'Teams');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else if (_response.statusCode === 403) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Forbidden response';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Forbidden response',
                            errorCode: 403,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else if (_response.statusCode === 404) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Team with specified ID does not exist or is inaccessible';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Team with specified ID does not exist or is inaccessible',
                            errorCode: 404,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Returns list of all user IDs within a team
     *
     * @param {double} id ID of the team
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getAllUsersInATeam(id, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        let _pathUrl = '/teams/{id}/users';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            id,
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.getAllUsersInATeamAction(_queryUrl, _callback);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.getAllUsersInATeamAction(_queryUrl, _callback),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static getAllUsersInATeamAction(_queryUrl, _callback) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            headers: _headers,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    let response = '';
                    if (_context.response.body) {
                        response = JSON.parse(_context.response.body);
                    }
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserIDs');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else if (_response.statusCode === 404) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Team with specified ID does not exist or is inaccessible';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Team with specified ID does not exist or is inaccessible',
                            errorCode: 404,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Adds users to an existing team
     *
     * @param  {array}  input    Array with all options for search
     * @param {double} input['id'] ID of the team
     * @param {array} input['users'] List of User IDs
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static addUsersToATeam(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        let _pathUrl = '/teams/{id}/users';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            id: input.id,
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.addUsersToATeamAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.addUsersToATeamAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static addUsersToATeamAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // prepare form data
        const _form = {
            users: input.users,
        };

        // remove null values
        _apiHelper.cleanObject(_form);

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            form: _form,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    let response = '';
                    if (_context.response.body) {
                        response = JSON.parse(_context.response.body);
                    }
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserIDs');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else if (_response.statusCode === 403) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Forbidden response';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Forbidden response',
                            errorCode: 403,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else if (_response.statusCode === 404) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Team with specified ID does not exist or is inaccessible';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Team with specified ID does not exist or is inaccessible',
                            errorCode: 404,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Deletes users from an existing team
     *
     * @param  {array}  input    Array with all options for search
     * @param {double} input['id'] ID of the team
     * @param {array} input['users'] List of User IDs
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static deleteUsersFromATeam(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        let _pathUrl = '/teams/{id}/users';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            id: input.id,
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.deleteUsersFromATeamAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.deleteUsersFromATeamAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static deleteUsersFromATeamAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // prepare form data
        const _form = {
            users: input.users,
        };

        // remove null values
        _apiHelper.cleanObject(_form);

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'DELETE',
            headers: _headers,
            form: _form,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    let response = '';
                    if (_context.response.body) {
                        response = JSON.parse(_context.response.body);
                    }
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserIDs');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else if (_response.statusCode === 403) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Forbidden response';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Forbidden response',
                            errorCode: 403,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else if (_response.statusCode === 404) {
                        const mappedObject = _baseController.getObjectMapper()
                            .mapObject(response, 'FailResponseException');
                        mappedObject.reason = 'Team with specified ID does not exist or is inaccessible';
                        mappedObject.context = _context;
                        const _err = { errorMessage: 'Team with specified ID does not exist or is inaccessible',
                            errorCode: 404,
                            errorResponse: mappedObject };
                        _callback(_err, null, _context);
                        _reject(_err);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
    /**
     * Returns data about all teams which have specified user as a member
     *
     * @param  {array}  input    Array with all options for search
     * @param {double} input['id'] ID of the user
     * @param {OrderByEnum} input['orderBy'] (optional) Field name to sort returned teams by
     * @param {NumberBooleanEnum} input['skipUsers'] (optional) When enabled, the teams will not
     * include IDs of member users
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getAllTeamsOfAUser(input, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.getBaseUri();

        let _pathUrl = '/teams/user/{id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            id: input.id,
        });

        let _queryBuilder = `${_baseUri}${_pathUrl}`;

        // process query parameters
        _queryBuilder = _apiHelper.appendUrlWithQueryParameters(_queryBuilder, {
            order_by: (input.orderBy !== null) ? input.orderBy : 'id',
            skip_users: (input.skipUsers !== null) ? input.skipUsers : null,
        });

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        if (_oAuthManager.isTokenSet()) {
            return TeamsController.getAllTeamsOfAUserAction(_queryUrl, _callback, input);
        }
        return _oAuthManager.authorize().then(
            () => TeamsController.getAllTeamsOfAUserAction(_queryUrl, _callback, input),
            (err) => {
                _callback(err, null, null);
                return Promise.reject(err);
            });
    }
    static getAllTeamsOfAUserAction(_queryUrl, _callback, input) {
        const oauthTokenPromise = _oAuthManager.checkTokenExpiry();
        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'Pipedrive-SDK-Node-10.0.1',
        };

        oauthTokenPromise.then(() => {
            _headers.Authorization = `Bearer ${_configuration.oAuthToken.accessToken}`;
        });
        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            headers: _headers,
        };

        // build the response processing.
        return oauthTokenPromise
        .then(() =>
            new Promise((_fulfill, _reject) => {
                _request(_options, (_error, _response, _context) => {
                    let errorResponse;
                    if (_error) {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                            errorResponse.response,
                            errorResponse.context);
                        _reject(errorResponse.error);
                    } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                        let parsed = JSON.parse(_response.body);
                        parsed = _baseController.getObjectMapper().mapObject(parsed, 'Teams');
                        _callback(null, parsed, _context);
                        _fulfill(parsed);
                    } else {
                        errorResponse = _baseController.validateResponse(_context);
                        _callback(errorResponse.error,
                        errorResponse.response,
                        errorResponse.context);
                        _reject(errorResponse.error);
                    }
                });
            }))
        .catch((err) => {
            _callback(err, null, null);
            return Promise.reject(err);
        });
    }
}
module.exports = TeamsController;