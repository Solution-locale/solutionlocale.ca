(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/frontend"], {

/***/ "./node_modules/algoliasearch/node_modules/debug/src/browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/debug/src/browser.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function (process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

        exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/algoliasearch/node_modules/debug/src/debug.js");
        exports.log = log;
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.storage = 'undefined' != typeof chrome
          && 'undefined' != typeof chrome.storage
          ? chrome.storage.local
          : localstorage();

        /**
         * Colors.
         */

        exports.colors = [
          'lightseagreen',
          'forestgreen',
          'goldenrod',
          'dodgerblue',
          'darkorchid',
          'crimson'
        ];

        /**
         * Currently only WebKit-based Web Inspectors, Firefox >= v31,
         * and the Firebug extension (any Firefox version) are known
         * to support "%c" CSS customizations.
         *
         * TODO: add a `localStorage` variable to explicitly enable/disable colors
         */

        function useColors() {
          // NB: In an Electron preload script, document will be defined but not fully
          // initialized. Since we know we're in Chrome, we'll just detect this case
          // explicitly
          if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
            return true;
          }

          // is webkit? http://stackoverflow.com/a/16459606/376773
          // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
          return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
            // is firebug? http://stackoverflow.com/a/398120/376773
            (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
            // is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
            // double check webkit in userAgent just in case we are in a worker
            (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
        }

        /**
         * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
         */

        exports.formatters.j = function (v) {
          try {
            return JSON.stringify(v);
          } catch (err) {
            return '[UnexpectedJSONParseError]: ' + err.message;
          }
        };


        /**
         * Colorize log arguments if enabled.
         *
         * @api public
         */

        function formatArgs(args) {
          var useColors = this.useColors;

          args[0] = (useColors ? '%c' : '')
            + this.namespace
            + (useColors ? ' %c' : ' ')
            + args[0]
            + (useColors ? '%c ' : ' ')
            + '+' + exports.humanize(this.diff);

          if (!useColors) return;

          var c = 'color: ' + this.color;
          args.splice(1, 0, c, 'color: inherit')

          // the final "%c" is somewhat tricky, because there could be other
          // arguments passed either before or after the %c, so we need to
          // figure out the correct index to insert the CSS into
          var index = 0;
          var lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, function (match) {
            if ('%%' === match) return;
            index++;
            if ('%c' === match) {
              // we only are interested in the *last* %c
              // (the user may have provided their own)
              lastC = index;
            }
          });

          args.splice(lastC, 0, c);
        }

        /**
         * Invokes `console.log()` when available.
         * No-op when `console.log` is not a "function".
         *
         * @api public
         */

        function log() {
          // this hackery is required for IE8/9, where
          // the `console.log` function doesn't have 'apply'
          return 'object' === typeof console
            && console.log
            && Function.prototype.apply.call(console.log, console, arguments);
        }

        /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */

        function save(namespaces) {
          try {
            if (null == namespaces) {
              exports.storage.removeItem('debug');
            } else {
              exports.storage.debug = namespaces;
            }
          } catch (e) { }
        }

        /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */

        function load() {
          var r;
          try {
            r = exports.storage.debug;
          } catch (e) { }

          // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
          if (!r && typeof process !== 'undefined' && 'env' in process) {
            r = process.env.DEBUG;
          }

          return r;
        }

        /**
         * Enable namespaces listed in `localStorage.debug` initially.
         */

        exports.enable(load());

        /**
         * Localstorage attempts to return the localstorage.
         *
         * This is necessary because safari throws
         * when a user disables cookies/localstorage
         * and you attempt to access it.
         *
         * @return {LocalStorage}
         * @api private
         */

        function localstorage() {
          try {
            return window.localStorage;
          } catch (e) { }
        }

        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js")))

      /***/
}),

/***/ "./node_modules/algoliasearch/node_modules/debug/src/debug.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/debug/src/debug.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {


      /**
       * This is the common logic for both the Node.js and web browser
       * implementations of `debug()`.
       *
       * Expose `debug()` as the module.
       */

      exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
      exports.coerce = coerce;
      exports.disable = disable;
      exports.enable = enable;
      exports.enabled = enabled;
      exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

      /**
       * The currently active debug mode names, and names to skip.
       */

      exports.names = [];
      exports.skips = [];

      /**
       * Map of special "%n" handling functions, for the debug "format" argument.
       *
       * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
       */

      exports.formatters = {};

      /**
       * Previous log timestamp.
       */

      var prevTime;

      /**
       * Select a color.
       * @param {String} namespace
       * @return {Number}
       * @api private
       */

      function selectColor(namespace) {
        var hash = 0, i;

        for (i in namespace) {
          hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
        }

        return exports.colors[Math.abs(hash) % exports.colors.length];
      }

      /**
       * Create a debugger with the given `namespace`.
       *
       * @param {String} namespace
       * @return {Function}
       * @api public
       */

      function createDebug(namespace) {

        function debug() {
          // disabled?
          if (!debug.enabled) return;

          var self = debug;

          // set `diff` timestamp
          var curr = +new Date();
          var ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;

          // turn the `arguments` into a proper Array
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }

          args[0] = exports.coerce(args[0]);

          if ('string' !== typeof args[0]) {
            // anything else let's inspect with %O
            args.unshift('%O');
          }

          // apply any `formatters` transformations
          var index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
            // if we encounter an escaped % then don't increase the array index
            if (match === '%%') return match;
            index++;
            var formatter = exports.formatters[format];
            if ('function' === typeof formatter) {
              var val = args[index];
              match = formatter.call(self, val);

              // now we need to remove `args[index]` since it's inlined in the `format`
              args.splice(index, 1);
              index--;
            }
            return match;
          });

          // apply env-specific formatting (colors, etc.)
          exports.formatArgs.call(self, args);

          var logFn = debug.log || exports.log || console.log.bind(console);
          logFn.apply(self, args);
        }

        debug.namespace = namespace;
        debug.enabled = exports.enabled(namespace);
        debug.useColors = exports.useColors();
        debug.color = selectColor(namespace);

        // env-specific initialization logic for debug instances
        if ('function' === typeof exports.init) {
          exports.init(debug);
        }

        return debug;
      }

      /**
       * Enables a debug mode by namespaces. This can include modes
       * separated by a colon and wildcards.
       *
       * @param {String} namespaces
       * @api public
       */

      function enable(namespaces) {
        exports.save(namespaces);

        exports.names = [];
        exports.skips = [];

        var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        var len = split.length;

        for (var i = 0; i < len; i++) {
          if (!split[i]) continue; // ignore empty strings
          namespaces = split[i].replace(/\*/g, '.*?');
          if (namespaces[0] === '-') {
            exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
          } else {
            exports.names.push(new RegExp('^' + namespaces + '$'));
          }
        }
      }

      /**
       * Disable debug output.
       *
       * @api public
       */

      function disable() {
        exports.enable('');
      }

      /**
       * Returns true if the given mode name is enabled, false otherwise.
       *
       * @param {String} name
       * @return {Boolean}
       * @api public
       */

      function enabled(name) {
        var i, len;
        for (i = 0, len = exports.skips.length; i < len; i++) {
          if (exports.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = exports.names.length; i < len; i++) {
          if (exports.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }

      /**
       * Coerce `val`.
       *
       * @param {Mixed} val
       * @return {Mixed}
       * @api private
       */

      function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
      }


      /***/
}),

/***/ "./node_modules/algoliasearch/node_modules/isarray/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/isarray/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      var toString = {}.toString;

      module.exports = Array.isArray || function (arr) {
        return toString.call(arr) == '[object Array]';
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/AlgoliaSearchCore.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function (process) {
      module.exports = AlgoliaSearchCore;

        var errors = __webpack_require__(/*! ./errors */ "./node_modules/algoliasearch/src/errors.js");
        var exitPromise = __webpack_require__(/*! ./exitPromise.js */ "./node_modules/algoliasearch/src/exitPromise.js");
        var IndexCore = __webpack_require__(/*! ./IndexCore.js */ "./node_modules/algoliasearch/src/IndexCore.js");
        var store = __webpack_require__(/*! ./store.js */ "./node_modules/algoliasearch/src/store.js");

        // We will always put the API KEY in the JSON body in case of too long API KEY,
        // to avoid query string being too long and failing in various conditions (our server limit, browser limit,
        // proxies limit)
        var MAX_API_KEY_LENGTH = 500;
        var RESET_APP_DATA_TIMER =
          process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
          60 * 2 * 1000; // after 2 minutes reset to first host

        /*
         * Algolia Search library initialization
         * https://www.algolia.com/
         *
         * @param {string} applicationID - Your applicationID, found in your dashboard
         * @param {string} apiKey - Your API key, found in your dashboard
         * @param {Object} [opts]
         * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
         * another request will be issued after this timeout
         * @param {string} [opts.protocol='https:'] - The protocol used to query Algolia Search API.
         *                                        Set to 'http:' to force using http.
         * @param {Object|Array} [opts.hosts={
         *           read: [this.applicationID + '-dsn.algolia.net'].concat([
         *             this.applicationID + '-1.algolianet.com',
         *             this.applicationID + '-2.algolianet.com',
         *             this.applicationID + '-3.algolianet.com']
         *           ]),
         *           write: [this.applicationID + '.algolia.net'].concat([
         *             this.applicationID + '-1.algolianet.com',
         *             this.applicationID + '-2.algolianet.com',
         *             this.applicationID + '-3.algolianet.com']
         *           ]) - The hosts to use for Algolia Search API.
         *           If you provide them, you will less benefit from our HA implementation
         */
        function AlgoliaSearchCore(applicationID, apiKey, opts) {
          var debug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch');

          var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
          var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
          var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

          var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

          if (opts._allowEmptyCredentials !== true && !applicationID) {
            throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
          }

          if (opts._allowEmptyCredentials !== true && !apiKey) {
            throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
          }

          this.applicationID = applicationID;
          this.apiKey = apiKey;

          this.hosts = {
            read: [],
            write: []
          };

          opts = opts || {};

          this._timeouts = opts.timeouts || {
            connect: 1 * 1000, // 500ms connect is GPRS latency
            read: 2 * 1000,
            write: 30 * 1000
          };

          // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
          if (opts.timeout) {
            this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
          }

          var protocol = opts.protocol || 'https:';
          // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
          // we also accept `http` and `https`. It's a common error.
          if (!/:$/.test(protocol)) {
            protocol = protocol + ':';
          }

          if (protocol !== 'http:' && protocol !== 'https:') {
            throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
          }

          this._checkAppIdData();

          if (!opts.hosts) {
            var defaultHosts = map(this._shuffleResult, function (hostNumber) {
              return applicationID + '-' + hostNumber + '.algolianet.com';
            });

            // no hosts given, compute defaults
            var mainSuffix = (opts.dsn === false ? '' : '-dsn') + '.algolia.net';
            this.hosts.read = [this.applicationID + mainSuffix].concat(defaultHosts);
            this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
          } else if (isArray(opts.hosts)) {
            // when passing custom hosts, we need to have a different host index if the number
            // of write/read hosts are different.
            this.hosts.read = clone(opts.hosts);
            this.hosts.write = clone(opts.hosts);
          } else {
            this.hosts.read = clone(opts.hosts.read);
            this.hosts.write = clone(opts.hosts.write);
          }

          // add protocol and lowercase hosts
          this.hosts.read = map(this.hosts.read, prepareHost(protocol));
          this.hosts.write = map(this.hosts.write, prepareHost(protocol));

          this.extraHeaders = {};

          // In some situations you might want to warm the cache
          this.cache = opts._cache || {};

          this._ua = opts._ua;
          this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
          this._useRequestCache = this._useCache && opts._useRequestCache;
          this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

          this._setTimeout = opts._setTimeout;

          debug('init done, %j', this);
        }

        /*
         * Get the index object initialized
         *
         * @param indexName the name of index
         * @param callback the result callback with one argument (the Index instance)
         */
        AlgoliaSearchCore.prototype.initIndex = function (indexName) {
          return new IndexCore(this, indexName);
        };

        /**
        * Add an extra field to the HTTP request
        *
        * @param name the header field name
        * @param value the header field value
        */
        AlgoliaSearchCore.prototype.setExtraHeader = function (name, value) {
          this.extraHeaders[name.toLowerCase()] = value;
        };

        /**
        * Get the value of an extra HTTP header
        *
        * @param name the header field name
        */
        AlgoliaSearchCore.prototype.getExtraHeader = function (name) {
          return this.extraHeaders[name.toLowerCase()];
        };

        /**
        * Remove an extra field from the HTTP request
        *
        * @param name the header field name
        */
        AlgoliaSearchCore.prototype.unsetExtraHeader = function (name) {
          delete this.extraHeaders[name.toLowerCase()];
        };

        /**
        * Augment sent x-algolia-agent with more data, each agent part
        * is automatically separated from the others by a semicolon;
        *
        * @param algoliaAgent the agent to add
        */
        AlgoliaSearchCore.prototype.addAlgoliaAgent = function (algoliaAgent) {
          var algoliaAgentWithDelimiter = '; ' + algoliaAgent;

          if (this._ua.indexOf(algoliaAgentWithDelimiter) === -1) {
            this._ua += algoliaAgentWithDelimiter;
          }
        };

        /*
         * Wrapper that try all hosts to maximize the quality of service
         */
        AlgoliaSearchCore.prototype._jsonRequest = function (initialOpts) {
          this._checkAppIdData();

          var requestDebug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch:' + initialOpts.url);


          var body;
          var cacheID;
          var additionalUA = initialOpts.additionalUA || '';
          var cache = initialOpts.cache;
          var client = this;
          var tries = 0;
          var usingFallback = false;
          var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
          var headers;

          if (
            this.apiKey.length > MAX_API_KEY_LENGTH &&
            initialOpts.body !== undefined &&
            (initialOpts.body.params !== undefined || // index.search()
              initialOpts.body.requests !== undefined) // client.search()
          ) {
            initialOpts.body.apiKey = this.apiKey;
            headers = this._computeRequestHeaders({
              additionalUA: additionalUA,
              withApiKey: false,
              headers: initialOpts.headers
            });
          } else {
            headers = this._computeRequestHeaders({
              additionalUA: additionalUA,
              headers: initialOpts.headers
            });
          }

          if (initialOpts.body !== undefined) {
            body = safeJSONStringify(initialOpts.body);
          }

          requestDebug('request start');
          var debugData = [];


          function doRequest(requester, reqOpts) {
            client._checkAppIdData();

            var startTime = new Date();

            if (client._useCache && !client._useRequestCache) {
              cacheID = initialOpts.url;
            }

            // as we sometime use POST requests to pass parameters (like query='aa'),
            // the cacheID must also include the body to be different between calls
            if (client._useCache && !client._useRequestCache && body) {
              cacheID += '_body_' + reqOpts.body;
            }

            // handle cache existence
            if (isCacheValidWithCurrentID(!client._useRequestCache, cache, cacheID)) {
              requestDebug('serving response from cache');

              var responseText = cache[cacheID];

              // Cache response must match the type of the original one
              return client._promise.resolve({
                body: JSON.parse(responseText),
                responseText: responseText
              });
            }

            // if we reached max tries
            if (tries >= client.hosts[initialOpts.hostType].length) {
              if (!hasFallback || usingFallback) {
                requestDebug('could not get any response');
                // then stop
                return client._promise.reject(new errors.AlgoliaSearchError(
                  'Cannot connect to the AlgoliaSearch API.' +
                  ' Send an email to support@algolia.com to report and resolve the issue.' +
                  ' Application id was: ' + client.applicationID, { debugData: debugData }
                ));
              }

              requestDebug('switching to fallback');

              // let's try the fallback starting from here
              tries = 0;

              // method, url and body are fallback dependent
              reqOpts.method = initialOpts.fallback.method;
              reqOpts.url = initialOpts.fallback.url;
              reqOpts.jsonBody = initialOpts.fallback.body;
              if (reqOpts.jsonBody) {
                reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
              }
              // re-compute headers, they could be omitting the API KEY
              headers = client._computeRequestHeaders({
                additionalUA: additionalUA,
                headers: initialOpts.headers
              });

              reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
              client._setHostIndexByType(0, initialOpts.hostType);
              usingFallback = true; // the current request is now using fallback
              return doRequest(client._request.fallback, reqOpts);
            }

            var currentHost = client._getHostByType(initialOpts.hostType);

            var url = currentHost + reqOpts.url;
            var options = {
              body: reqOpts.body,
              jsonBody: reqOpts.jsonBody,
              method: reqOpts.method,
              headers: headers,
              timeouts: reqOpts.timeouts,
              debug: requestDebug,
              forceAuthHeaders: reqOpts.forceAuthHeaders
            };

            requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
              options.method, url, options.headers, options.timeouts);

            if (requester === client._request.fallback) {
              requestDebug('using fallback');
            }

            // `requester` is any of this._request or this._request.fallback
            // thus it needs to be called using the client as context
            return requester.call(client, url, options).then(success, tryFallback);

            function success(httpResponse) {
              // compute the status of the response,
              //
              // When in browser mode, using XDR or JSONP, we have no statusCode available
              // So we rely on our API response `status` property.
              // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
              // So we check if there's a `message` along `status` and it means it's an error
              //
              // That's the only case where we have a response.status that's not the http statusCode
              var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

                // this is important to check the request statusCode AFTER the body eventual
                // statusCode because some implementations (jQuery XDomainRequest transport) may
                // send statusCode 200 while we had an error
                httpResponse.statusCode ||

                // When in browser mode, using XDR or JSONP
                // we default to success when no error (no response.status && response.message)
                // If there was a JSON.parse() error then body is null and it fails
                httpResponse && httpResponse.body && 200;

              requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
                httpResponse.statusCode, status, httpResponse.headers);

              var httpResponseOk = Math.floor(status / 100) === 2;

              var endTime = new Date();
              debugData.push({
                currentHost: currentHost,
                headers: removeCredentials(headers),
                content: body || null,
                contentLength: body !== undefined ? body.length : null,
                method: reqOpts.method,
                timeouts: reqOpts.timeouts,
                url: reqOpts.url,
                startTime: startTime,
                endTime: endTime,
                duration: endTime - startTime,
                statusCode: status
              });

              if (httpResponseOk) {
                if (client._useCache && !client._useRequestCache && cache) {
                  cache[cacheID] = httpResponse.responseText;
                }

                return {
                  responseText: httpResponse.responseText,
                  body: httpResponse.body
                };
              }

              var shouldRetry = Math.floor(status / 100) !== 4;

              if (shouldRetry) {
                tries += 1;
                return retryRequest();
              }

              requestDebug('unrecoverable error');

              // no success and no retry => fail
              var unrecoverableError = new errors.AlgoliaSearchError(
                httpResponse.body && httpResponse.body.message, { debugData: debugData, statusCode: status }
              );

              return client._promise.reject(unrecoverableError);
            }

            function tryFallback(err) {
              // error cases:
              //  While not in fallback mode:
              //    - CORS not supported
              //    - network error
              //  While in fallback mode:
              //    - timeout
              //    - network error
              //    - badly formatted JSONP (script loaded, did not call our callback)
              //  In both cases:
              //    - uncaught exception occurs (TypeError)
              requestDebug('error: %s, stack: %s', err.message, err.stack);

              var endTime = new Date();
              debugData.push({
                currentHost: currentHost,
                headers: removeCredentials(headers),
                content: body || null,
                contentLength: body !== undefined ? body.length : null,
                method: reqOpts.method,
                timeouts: reqOpts.timeouts,
                url: reqOpts.url,
                startTime: startTime,
                endTime: endTime,
                duration: endTime - startTime
              });

              if (!(err instanceof errors.AlgoliaSearchError)) {
                err = new errors.Unknown(err && err.message, err);
              }

              tries += 1;

              // stop the request implementation when:
              if (
                // we did not generate this error,
                // it comes from a throw in some other piece of code
                err instanceof errors.Unknown ||

                // server sent unparsable JSON
                err instanceof errors.UnparsableJSON ||

                // max tries and already using fallback or no fallback
                tries >= client.hosts[initialOpts.hostType].length &&
                (usingFallback || !hasFallback)) {
                // stop request implementation for this command
                err.debugData = debugData;
                return client._promise.reject(err);
              }

              // When a timeout occurred, retry by raising timeout
              if (err instanceof errors.RequestTimeout) {
                return retryRequestWithHigherTimeout();
              }

              return retryRequest();
            }

            function retryRequest() {
              requestDebug('retrying request');
              client._incrementHostIndex(initialOpts.hostType);
              return doRequest(requester, reqOpts);
            }

            function retryRequestWithHigherTimeout() {
              requestDebug('retrying request with higher timeout');
              client._incrementHostIndex(initialOpts.hostType);
              client._incrementTimeoutMultipler();
              reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
              return doRequest(requester, reqOpts);
            }
          }

          function isCacheValidWithCurrentID(
            useRequestCache,
            currentCache,
            currentCacheID
          ) {
            return (
              client._useCache &&
              useRequestCache &&
              currentCache &&
              currentCache[currentCacheID] !== undefined
            );
          }


          function interopCallbackReturn(request, callback) {
            if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
              request.catch(function () {
                // Release the cache on error
                delete cache[cacheID];
              });
            }

            if (typeof initialOpts.callback === 'function') {
              // either we have a callback
              request.then(function okCb(content) {
                exitPromise(function () {
                  initialOpts.callback(null, callback(content));
                }, client._setTimeout || setTimeout);
              }, function nookCb(err) {
                exitPromise(function () {
                  initialOpts.callback(err);
                }, client._setTimeout || setTimeout);
              });
            } else {
              // either we are using promises
              return request.then(callback);
            }
          }

          if (client._useCache && client._useRequestCache) {
            cacheID = initialOpts.url;
          }

          // as we sometime use POST requests to pass parameters (like query='aa'),
          // the cacheID must also include the body to be different between calls
          if (client._useCache && client._useRequestCache && body) {
            cacheID += '_body_' + body;
          }

          if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
            requestDebug('serving request from cache');

            var maybePromiseForCache = cache[cacheID];

            // In case the cache is warmup with value that is not a promise
            var promiseForCache = typeof maybePromiseForCache.then !== 'function'
              ? client._promise.resolve({ responseText: maybePromiseForCache })
              : maybePromiseForCache;

            return interopCallbackReturn(promiseForCache, function (content) {
              // In case of the cache request, return the original value
              return JSON.parse(content.responseText);
            });
          }

          var request = doRequest(
            client._request, {
            url: initialOpts.url,
            method: initialOpts.method,
            body: body,
            jsonBody: initialOpts.body,
            timeouts: client._getTimeoutsForRequest(initialOpts.hostType),
            forceAuthHeaders: initialOpts.forceAuthHeaders
          }
          );

          if (client._useCache && client._useRequestCache && cache) {
            cache[cacheID] = request;
          }

          return interopCallbackReturn(request, function (content) {
            // In case of the first request, return the JSON value
            return content.body;
          });
        };

        /*
        * Transform search param object in query string
        * @param {object} args arguments to add to the current query string
        * @param {string} params current query string
        * @return {string} the final query string
        */
        AlgoliaSearchCore.prototype._getSearchParams = function (args, params) {
          if (args === undefined || args === null) {
            return params;
          }
          for (var key in args) {
            if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
              params += params === '' ? '' : '&';
              params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
            }
          }
          return params;
        };

        /**
         * Compute the headers for a request
         *
         * @param [string] options.additionalUA semi-colon separated string with other user agents to add
         * @param [boolean=true] options.withApiKey Send the api key as a header
         * @param [Object] options.headers Extra headers to send
         */
        AlgoliaSearchCore.prototype._computeRequestHeaders = function (options) {
          var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

          var ua = options.additionalUA ?
            this._ua + '; ' + options.additionalUA :
            this._ua;

          var requestHeaders = {
            'x-algolia-agent': ua,
            'x-algolia-application-id': this.applicationID
          };

          // browser will inline headers in the url, node.js will use http headers
          // but in some situations, the API KEY will be too long (big secured API keys)
          // so if the request is a POST and the KEY is very long, we will be asked to not put
          // it into headers but in the JSON body
          if (options.withApiKey !== false) {
            requestHeaders['x-algolia-api-key'] = this.apiKey;
          }

          if (this.userToken) {
            requestHeaders['x-algolia-usertoken'] = this.userToken;
          }

          if (this.securityTags) {
            requestHeaders['x-algolia-tagfilters'] = this.securityTags;
          }

          forEach(this.extraHeaders, function addToRequestHeaders(value, key) {
            requestHeaders[key] = value;
          });

          if (options.headers) {
            forEach(options.headers, function addToRequestHeaders(value, key) {
              requestHeaders[key] = value;
            });
          }

          return requestHeaders;
        };

        /**
         * Search through multiple indices at the same time
         * @param  {Object[]}   queries  An array of queries you want to run.
         * @param {string} queries[].indexName The index name you want to target
         * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
         * @param {Object} queries[].params Any search param like hitsPerPage, ..
         * @param  {Function} callback Callback to be called
         * @return {Promise|undefined} Returns a promise if no callback given
         */
        AlgoliaSearchCore.prototype.search = function (queries, opts, callback) {
          var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
          var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

          var usage = 'Usage: client.search(arrayOfQueries[, callback])';

          if (!isArray(queries)) {
            throw new Error(usage);
          }

          if (typeof opts === 'function') {
            callback = opts;
            opts = {};
          } else if (opts === undefined) {
            opts = {};
          }

          var client = this;

          var postObj = {
            requests: map(queries, function prepareRequest(query) {
              var params = '';

              // allow query.query
              // so we are mimicing the index.search(query, params) method
              // {indexName:, query:, params:}
              if (query.query !== undefined) {
                params += 'query=' + encodeURIComponent(query.query);
              }

              return {
                indexName: query.indexName,
                params: client._getSearchParams(query.params, params)
              };
            })
          };

          var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
            return requestId + '=' +
              encodeURIComponent(
                '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
                request.params
              );
          }).join('&');

          var url = '/1/indexes/*/queries';

          if (opts.strategy !== undefined) {
            postObj.strategy = opts.strategy;
          }

          return this._jsonRequest({
            cache: this.cache,
            method: 'POST',
            url: url,
            body: postObj,
            hostType: 'read',
            fallback: {
              method: 'GET',
              url: '/1/indexes/*',
              body: {
                params: JSONPParams
              }
            },
            callback: callback
          });
        };

        /**
        * Search for facet values
        * https://www.algolia.com/doc/rest-api/search#search-for-facet-values
        * This is the top-level API for SFFV.
        *
        * @param {object[]} queries An array of queries to run.
        * @param {string} queries[].indexName Index name, name of the index to search.
        * @param {object} queries[].params Query parameters.
        * @param {string} queries[].params.facetName Facet name, name of the attribute to search for values in.
        * Must be declared as a facet
        * @param {string} queries[].params.facetQuery Query for the facet search
        * @param {string} [queries[].params.*] Any search parameter of Algolia,
        * see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
        * Pagination is not supported. The page and hitsPerPage parameters will be ignored.
        */
        AlgoliaSearchCore.prototype.searchForFacetValues = function (queries) {
          var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
          var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

          var usage = 'Usage: client.searchForFacetValues([{indexName, params: {facetName, facetQuery, ...params}}, ...queries])'; // eslint-disable-line max-len

          if (!isArray(queries)) {
            throw new Error(usage);
          }

          var client = this;

          return client._promise.all(map(queries, function performQuery(query) {
            if (
              !query ||
              query.indexName === undefined ||
              query.params.facetName === undefined ||
              query.params.facetQuery === undefined
            ) {
              throw new Error(usage);
            }

            var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
            var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");

            var indexName = query.indexName;
            var params = query.params;

            var facetName = params.facetName;
            var filteredParams = omit(clone(params), function (keyName) {
              return keyName === 'facetName';
            });
            var searchParameters = client._getSearchParams(filteredParams, '');

            return client._jsonRequest({
              cache: client.cache,
              method: 'POST',
              url:
                '/1/indexes/' +
                encodeURIComponent(indexName) +
                '/facets/' +
                encodeURIComponent(facetName) +
                '/query',
              hostType: 'read',
              body: { params: searchParameters }
            });
          }));
        };

        /**
         * Set the extra security tagFilters header
         * @param {string|array} tags The list of tags defining the current security filters
         */
        AlgoliaSearchCore.prototype.setSecurityTags = function (tags) {
          if (Object.prototype.toString.call(tags) === '[object Array]') {
            var strTags = [];
            for (var i = 0; i < tags.length; ++i) {
              if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
                var oredTags = [];
                for (var j = 0; j < tags[i].length; ++j) {
                  oredTags.push(tags[i][j]);
                }
                strTags.push('(' + oredTags.join(',') + ')');
              } else {
                strTags.push(tags[i]);
              }
            }
            tags = strTags.join(',');
          }

          this.securityTags = tags;
        };

        /**
         * Set the extra user token header
         * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
         */
        AlgoliaSearchCore.prototype.setUserToken = function (userToken) {
          this.userToken = userToken;
        };

        /**
         * Clear all queries in client's cache
         * @return undefined
         */
        AlgoliaSearchCore.prototype.clearCache = function () {
          this.cache = {};
        };

        /**
        * Set the number of milliseconds a request can take before automatically being terminated.
        * @deprecated
        * @param {Number} milliseconds
        */
        AlgoliaSearchCore.prototype.setRequestTimeout = function (milliseconds) {
          if (milliseconds) {
            this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
          }
        };

        /**
        * Set the three different (connect, read, write) timeouts to be used when requesting
        * @param {Object} timeouts
        */
        AlgoliaSearchCore.prototype.setTimeouts = function (timeouts) {
          this._timeouts = timeouts;
        };

        /**
        * Get the three different (connect, read, write) timeouts to be used when requesting
        * @param {Object} timeouts
        */
        AlgoliaSearchCore.prototype.getTimeouts = function () {
          return this._timeouts;
        };

        AlgoliaSearchCore.prototype._getAppIdData = function () {
          var data = store.get(this.applicationID);
          if (data !== null) this._cacheAppIdData(data);
          return data;
        };

        AlgoliaSearchCore.prototype._setAppIdData = function (data) {
          data.lastChange = (new Date()).getTime();
          this._cacheAppIdData(data);
          return store.set(this.applicationID, data);
        };

        AlgoliaSearchCore.prototype._checkAppIdData = function () {
          var data = this._getAppIdData();
          var now = (new Date()).getTime();
          if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
            return this._resetInitialAppIdData(data);
          }

          return data;
        };

        AlgoliaSearchCore.prototype._resetInitialAppIdData = function (data) {
          var newData = data || {};
          newData.hostIndexes = { read: 0, write: 0 };
          newData.timeoutMultiplier = 1;
          newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
          return this._setAppIdData(newData);
        };

        AlgoliaSearchCore.prototype._cacheAppIdData = function (data) {
          this._hostIndexes = data.hostIndexes;
          this._timeoutMultiplier = data.timeoutMultiplier;
          this._shuffleResult = data.shuffleResult;
        };

        AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function (newData) {
          var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
          var currentData = this._getAppIdData();
          foreach(newData, function (value, key) {
            currentData[key] = value;
          });

          return this._setAppIdData(currentData);
        };

        AlgoliaSearchCore.prototype._getHostByType = function (hostType) {
          return this.hosts[hostType][this._getHostIndexByType(hostType)];
        };

        AlgoliaSearchCore.prototype._getTimeoutMultiplier = function () {
          return this._timeoutMultiplier;
        };

        AlgoliaSearchCore.prototype._getHostIndexByType = function (hostType) {
          return this._hostIndexes[hostType];
        };

        AlgoliaSearchCore.prototype._setHostIndexByType = function (hostIndex, hostType) {
          var clone = __webpack_require__(/*! ./clone */ "./node_modules/algoliasearch/src/clone.js");
          var newHostIndexes = clone(this._hostIndexes);
          newHostIndexes[hostType] = hostIndex;
          this._partialAppIdDataUpdate({ hostIndexes: newHostIndexes });
          return hostIndex;
        };

        AlgoliaSearchCore.prototype._incrementHostIndex = function (hostType) {
          return this._setHostIndexByType(
            (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
          );
        };

        AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function () {
          var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
          return this._partialAppIdDataUpdate({ timeoutMultiplier: timeoutMultiplier });
        };

        AlgoliaSearchCore.prototype._getTimeoutsForRequest = function (hostType) {
          return {
            connect: this._timeouts.connect * this._timeoutMultiplier,
            complete: this._timeouts[hostType] * this._timeoutMultiplier
          };
        };

        function prepareHost(protocol) {
          return function prepare(host) {
            return protocol + '//' + host.toLowerCase();
          };
        }

        // Prototype.js < 1.7, a widely used library, defines a weird
        // Array.prototype.toJSON function that will fail to stringify our content
        // appropriately
        // refs:
        //   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
        //   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
        //   - http://stackoverflow.com/a/3148441/147079
        function safeJSONStringify(obj) {
          /* eslint no-extend-native:0 */

          if (Array.prototype.toJSON === undefined) {
            return JSON.stringify(obj);
          }

          var toJSON = Array.prototype.toJSON;
          delete Array.prototype.toJSON;
          var out = JSON.stringify(obj);
          Array.prototype.toJSON = toJSON;

          return out;
        }

        function shuffle(array) {
          var currentIndex = array.length;
          var temporaryValue;
          var randomIndex;

          // While there remain elements to shuffle...
          while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

        function removeCredentials(headers) {
          var newHeaders = {};

          for (var headerName in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
              var value;

              if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
                value = '**hidden for security purposes**';
              } else {
                value = headers[headerName];
              }

              newHeaders[headerName] = value;
            }
          }

          return newHeaders;
        }

        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

      /***/
}),

/***/ "./node_modules/algoliasearch/src/IndexCore.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/IndexCore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");
      var deprecate = __webpack_require__(/*! ./deprecate.js */ "./node_modules/algoliasearch/src/deprecate.js");
      var deprecatedMessage = __webpack_require__(/*! ./deprecatedMessage.js */ "./node_modules/algoliasearch/src/deprecatedMessage.js");

      module.exports = IndexCore;

      /*
      * Index class constructor.
      * You should not use this method directly but use initIndex() function
      */
      function IndexCore(algoliasearch, indexName) {
        this.indexName = indexName;
        this.as = algoliasearch;
        this.typeAheadArgs = null;
        this.typeAheadValueOption = null;

        // make sure every index instance has it's own cache
        this.cache = {};
      }

      /*
      * Clear all queries in cache
      */
      IndexCore.prototype.clearCache = function () {
        this.cache = {};
      };

      /*
      * Search inside the index using XMLHttpRequest request (Using a POST query to
      * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
      *
      * @param {string} [query] the full text query
      * @param {object} [args] (optional) if set, contains an object with query parameters:
      * - page: (integer) Pagination parameter used to select the page to retrieve.
      *                   Page is zero-based and defaults to 0. Thus,
      *                   to retrieve the 10th page you need to set page=9
      * - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
      * - attributesToRetrieve: a string that contains the list of object attributes
      * you want to retrieve (let you minimize the answer size).
      *   Attributes are separated with a comma (for example "name,address").
      *   You can also use an array (for example ["name","address"]).
      *   By default, all attributes are retrieved. You can also use '*' to retrieve all
      *   values when an attributesToRetrieve setting is specified for your index.
      * - attributesToHighlight: a string that contains the list of attributes you
      *   want to highlight according to the query.
      *   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
      *   If an attribute has no match for the query, the raw value is returned.
      *   By default all indexed text attributes are highlighted.
      *   You can use `*` if you want to highlight all textual attributes.
      *   Numerical attributes are not highlighted.
      *   A matchLevel is returned for each highlighted attribute and can contain:
      *      - full: if all the query terms were found in the attribute,
      *      - partial: if only some of the query terms were found,
      *      - none: if none of the query terms were found.
      * - attributesToSnippet: a string that contains the list of attributes to snippet alongside
      * the number of words to return (syntax is `attributeName:nbWords`).
      *    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
      *    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
      *    By default no snippet is computed.
      * - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
      * Defaults to 3.
      * - minWordSizefor2Typos: the minimum number of characters in a query word
      * to accept two typos in this word. Defaults to 7.
      * - getRankingInfo: if set to 1, the result hits will contain ranking
      * information in _rankingInfo attribute.
      * - aroundLatLng: search for entries around a given
      * latitude/longitude (specified as two floats separated by a comma).
      *   For example aroundLatLng=47.316669,5.016670).
      *   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
      *   and the precision for ranking with aroundPrecision
      *   (for example if you set aroundPrecision=100, two objects that are distant of
      *   less than 100m will be considered as identical for "geo" ranking parameter).
      *   At indexing, you should specify geoloc of an object with the _geoloc attribute
      *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
      * - insideBoundingBox: search entries inside a given area defined by the two extreme points
      * of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
      *   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
      *   At indexing, you should specify geoloc of an object with the _geoloc attribute
      *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
      * - numericFilters: a string that contains the list of numeric filters you want to
      * apply separated by a comma.
      *   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
      *   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
      *   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
      *   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
      * - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
      *   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
      *   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
      *   means tag1 AND (tag2 OR tag3).
      *   At indexing, tags should be added in the _tags** attribute
      *   of objects (for example {"_tags":["tag1","tag2"]}).
      * - facetFilters: filter the query by a list of facets.
      *   Facets are separated by commas and each facet is encoded as `attributeName:value`.
      *   For example: `facetFilters=category:Book,author:John%20Doe`.
      *   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
      * - facets: List of object attributes that you want to use for faceting.
      *   Comma separated list: `"category,author"` or array `['category','author']`
      *   Only attributes that have been added in **attributesForFaceting** index setting
      *   can be used in this parameter.
      *   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
      * - queryType: select how the query words are interpreted, it can be one of the following value:
      *    - prefixAll: all query words are interpreted as prefixes,
      *    - prefixLast: only the last word is interpreted as a prefix (default behavior),
      *    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
      * - optionalWords: a string that contains the list of words that should
      * be considered as optional when found in the query.
      *   Comma separated and array are accepted.
      * - distinct: If set to 1, enable the distinct feature (disabled by default)
      * if the attributeForDistinct index setting is set.
      *   This feature is similar to the SQL "distinct" keyword: when enabled
      *   in a query with the distinct=1 parameter,
      *   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
      *   For example, if the chosen attribute is show_name and several hits have
      *   the same value for show_name, then only the best
      *   one is kept and others are removed.
      * - restrictSearchableAttributes: List of attributes you want to use for
      * textual search (must be a subset of the attributesToIndex index setting)
      * either comma separated or as an array
      * @param {function} [callback] the result callback called with two arguments:
      *  error: null or Error('message'). If false, the content contains the error.
      *  content: the server answer that contains the list of results.
      */
      IndexCore.prototype.search = buildSearchMethod('query');

      /*
      * -- BETA --
      * Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
      * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
      *
      * @param {string} [query] the similar query
      * @param {object} [args] (optional) if set, contains an object with query parameters.
      *   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
      *   are the two most useful to restrict the similar results and get more relevant content
      */
      IndexCore.prototype.similarSearch = deprecate(
        buildSearchMethod('similarQuery'),
        deprecatedMessage(
          'index.similarSearch(query[, callback])',
          'index.search({ similarQuery: query }[, callback])'
        )
      );

      /*
      * Browse index content. The response content will have a `cursor` property that you can use
      * to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
      *
      * @param {string} query - The full text query
      * @param {Object} [queryParameters] - Any search query parameter
      * @param {Function} [callback] - The result callback called with two arguments
      *   error: null or Error('message')
      *   content: the server answer with the browse result
      * @return {Promise|undefined} Returns a promise if no callback given
      * @example
      * index.browse('cool songs', {
      *   tagFilters: 'public,comments',
      *   hitsPerPage: 500
      * }, callback);
      * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
      */
      IndexCore.prototype.browse = function (query, queryParameters, callback) {
        var merge = __webpack_require__(/*! ./merge.js */ "./node_modules/algoliasearch/src/merge.js");

        var indexObj = this;

        var page;
        var hitsPerPage;

        // we check variadic calls that are not the one defined
        // .browse()/.browse(fn)
        // => page = 0
        if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
          page = 0;
          callback = arguments[0];
          query = undefined;
        } else if (typeof arguments[0] === 'number') {
          // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
          page = arguments[0];
          if (typeof arguments[1] === 'number') {
            hitsPerPage = arguments[1];
          } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
            hitsPerPage = undefined;
          }
          query = undefined;
          queryParameters = undefined;
        } else if (typeof arguments[0] === 'object') {
          // .browse(queryParameters)/.browse(queryParameters, cb)
          if (typeof arguments[1] === 'function') {
            callback = arguments[1];
          }
          queryParameters = arguments[0];
          query = undefined;
        } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
          // .browse(query, cb)
          callback = arguments[1];
          queryParameters = undefined;
        }

        // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

        // get search query parameters combining various possible calls
        // to .browse();
        queryParameters = merge({}, queryParameters || {}, {
          page: page,
          hitsPerPage: hitsPerPage,
          query: query
        });

        var params = this.as._getSearchParams(queryParameters, '');

        return this.as._jsonRequest({
          method: 'POST',
          url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
          body: { params: params },
          hostType: 'read',
          callback: callback
        });
      };

      /*
      * Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
      *
      * @param {string} query - The full text query
      * @param {Object} [queryParameters] - Any search query parameter
      * @param {Function} [callback] - The result callback called with two arguments
      *   error: null or Error('message')
      *   content: the server answer with the browse result
      * @return {Promise|undefined} Returns a promise if no callback given
      * @example
      * index.browseFrom('14lkfsakl32', callback);
      * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
      */
      IndexCore.prototype.browseFrom = function (cursor, callback) {
        return this.as._jsonRequest({
          method: 'POST',
          url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
          body: { cursor: cursor },
          hostType: 'read',
          callback: callback
        });
      };

      /*
      * Search for facet values
      * https://www.algolia.com/doc/rest-api/search#search-for-facet-values
      *
      * @param {string} params.facetName Facet name, name of the attribute to search for values in.
      * Must be declared as a facet
      * @param {string} params.facetQuery Query for the facet search
      * @param {string} [params.*] Any search parameter of Algolia,
      * see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
      * Pagination is not supported. The page and hitsPerPage parameters will be ignored.
      * @param callback (optional)
      */
      IndexCore.prototype.searchForFacetValues = function (params, callback) {
        var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
        var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");
        var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

        if (params.facetName === undefined || params.facetQuery === undefined) {
          throw new Error(usage);
        }

        var facetName = params.facetName;
        var filteredParams = omit(clone(params), function (keyName) {
          return keyName === 'facetName';
        });
        var searchParameters = this.as._getSearchParams(filteredParams, '');

        return this.as._jsonRequest({
          method: 'POST',
          url: '/1/indexes/' +
            encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
          hostType: 'read',
          body: { params: searchParameters },
          callback: callback
        });
      };

      IndexCore.prototype.searchFacet = deprecate(function (params, callback) {
        return this.searchForFacetValues(params, callback);
      }, deprecatedMessage(
        'index.searchFacet(params[, callback])',
        'index.searchForFacetValues(params[, callback])'
      ));

      IndexCore.prototype._search = function (params, url, callback, additionalUA) {
        return this.as._jsonRequest({
          cache: this.cache,
          method: 'POST',
          url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
          body: { params: params },
          hostType: 'read',
          fallback: {
            method: 'GET',
            url: '/1/indexes/' + encodeURIComponent(this.indexName),
            body: { params: params }
          },
          callback: callback,
          additionalUA: additionalUA
        });
      };

      /*
      * Get an object from this index
      *
      * @param objectID the unique identifier of the object to retrieve
      * @param attrs (optional) if set, contains the array of attribute names to retrieve
      * @param callback (optional) the result callback called with two arguments
      *  error: null or Error('message')
      *  content: the object to retrieve or the error message if a failure occurred
      */
      IndexCore.prototype.getObject = function (objectID, attrs, callback) {
        var indexObj = this;

        if (arguments.length === 1 || typeof attrs === 'function') {
          callback = attrs;
          attrs = undefined;
        }

        var params = '';
        if (attrs !== undefined) {
          params = '?attributes=';
          for (var i = 0; i < attrs.length; ++i) {
            if (i !== 0) {
              params += ',';
            }
            params += attrs[i];
          }
        }

        return this.as._jsonRequest({
          method: 'GET',
          url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
          hostType: 'read',
          callback: callback
        });
      };

      /*
      * Get several objects from this index
      *
      * @param objectIDs the array of unique identifier of objects to retrieve
      */
      IndexCore.prototype.getObjects = function (objectIDs, attributesToRetrieve, callback) {
        var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
        var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

        var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

        if (!isArray(objectIDs)) {
          throw new Error(usage);
        }

        var indexObj = this;

        if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
          callback = attributesToRetrieve;
          attributesToRetrieve = undefined;
        }

        var body = {
          requests: map(objectIDs, function prepareRequest(objectID) {
            var request = {
              indexName: indexObj.indexName,
              objectID: objectID
            };

            if (attributesToRetrieve) {
              request.attributesToRetrieve = attributesToRetrieve.join(',');
            }

            return request;
          })
        };

        return this.as._jsonRequest({
          method: 'POST',
          url: '/1/indexes/*/objects',
          hostType: 'read',
          body: body,
          callback: callback
        });
      };

      IndexCore.prototype.as = null;
      IndexCore.prototype.indexName = null;
      IndexCore.prototype.typeAheadArgs = null;
      IndexCore.prototype.typeAheadValueOption = null;


      /***/
}),

/***/ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js":
/*!****************************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var AlgoliaSearchCore = __webpack_require__(/*! ../../AlgoliaSearchCore.js */ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js");
      var createAlgoliasearch = __webpack_require__(/*! ../createAlgoliasearch.js */ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js");

      module.exports = createAlgoliasearch(AlgoliaSearchCore, 'Browser (lite)');


      /***/
}),

/***/ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/createAlgoliasearch.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var global = __webpack_require__(/*! global */ "./node_modules/global/window.js");
      var Promise = global.Promise || __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").Promise;

      // This is the standalone browser build entry point
      // Browser implementation of the Algolia Search JavaScript client,
      // using XMLHttpRequest, XDomainRequest and JSONP as fallback
      module.exports = function createAlgoliasearch(AlgoliaSearch, uaSuffix) {
        var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
        var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");
        var inlineHeaders = __webpack_require__(/*! ./inline-headers */ "./node_modules/algoliasearch/src/browser/inline-headers.js");
        var jsonpRequest = __webpack_require__(/*! ./jsonp-request */ "./node_modules/algoliasearch/src/browser/jsonp-request.js");
        var places = __webpack_require__(/*! ../places.js */ "./node_modules/algoliasearch/src/places.js");
        uaSuffix = uaSuffix || '';

        if (false) { }

        function algoliasearch(applicationID, apiKey, opts) {
          var cloneDeep = __webpack_require__(/*! ../clone.js */ "./node_modules/algoliasearch/src/clone.js");

          opts = cloneDeep(opts || {});

          opts._ua = opts._ua || algoliasearch.ua;

          return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
        }

        algoliasearch.version = __webpack_require__(/*! ../version.js */ "./node_modules/algoliasearch/src/version.js");

        algoliasearch.ua =
          'Algolia for JavaScript (' + algoliasearch.version + '); ' + uaSuffix;

        algoliasearch.initPlaces = places(algoliasearch);

        // we expose into window no matter how we are used, this will allow
        // us to easily debug any website running algolia
        global.__algolia = {
          debug: __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js"),
          algoliasearch: algoliasearch
        };

        var support = {
          hasXMLHttpRequest: 'XMLHttpRequest' in global,
          hasXDomainRequest: 'XDomainRequest' in global
        };

        if (support.hasXMLHttpRequest) {
          support.cors = 'withCredentials' in new XMLHttpRequest();
        }

        function AlgoliaSearchBrowser() {
          // call AlgoliaSearch constructor
          AlgoliaSearch.apply(this, arguments);
        }

        inherits(AlgoliaSearchBrowser, AlgoliaSearch);

        AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
          return new Promise(function wrapRequest(resolve, reject) {
            // no cors or XDomainRequest, no request
            if (!support.cors && !support.hasXDomainRequest) {
              // very old browser, not supported
              reject(new errors.Network('CORS not supported'));
              return;
            }

            url = inlineHeaders(url, opts.headers);

            var body = opts.body;
            var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
            var reqTimeout;
            var timedOut;
            var connected = false;

            reqTimeout = setTimeout(onTimeout, opts.timeouts.connect);
            // we set an empty onprogress listener
            // so that XDomainRequest on IE9 is not aborted
            // refs:
            //  - https://github.com/algolia/algoliasearch-client-js/issues/76
            //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
            req.onprogress = onProgress;
            if ('onreadystatechange' in req) req.onreadystatechange = onReadyStateChange;
            req.onload = onLoad;
            req.onerror = onError;

            // do not rely on default XHR async flag, as some analytics code like hotjar
            // breaks it and set it to false by default
            if (req instanceof XMLHttpRequest) {
              req.open(opts.method, url, true);

              // The Analytics API never accepts Auth headers as query string
              // this option exists specifically for them.
              if (opts.forceAuthHeaders) {
                req.setRequestHeader(
                  'x-algolia-application-id',
                  opts.headers['x-algolia-application-id']
                );
                req.setRequestHeader(
                  'x-algolia-api-key',
                  opts.headers['x-algolia-api-key']
                );
              }
            } else {
              req.open(opts.method, url);
            }

            // headers are meant to be sent after open
            if (support.cors) {
              if (body) {
                if (opts.method === 'POST') {
                  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
                  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                } else {
                  req.setRequestHeader('content-type', 'application/json');
                }
              }
              req.setRequestHeader('accept', 'application/json');
            }

            if (body) {
              req.send(body);
            } else {
              req.send();
            }

            // event object not received in IE8, at least
            // but we do not use it, still important to note
            function onLoad(/* event */) {
              // When browser does not supports req.timeout, we can
              // have both a load and timeout event, since handled by a dumb setTimeout
              if (timedOut) {
                return;
              }

              clearTimeout(reqTimeout);

              var out;

              try {
                out = {
                  body: JSON.parse(req.responseText),
                  responseText: req.responseText,
                  statusCode: req.status,
                  // XDomainRequest does not have any response headers
                  headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
                };
              } catch (e) {
                out = new errors.UnparsableJSON({
                  more: req.responseText
                });
              }

              if (out instanceof errors.UnparsableJSON) {
                reject(out);
              } else {
                resolve(out);
              }
            }

            function onError(event) {
              if (timedOut) {
                return;
              }

              clearTimeout(reqTimeout);

              // error event is trigerred both with XDR/XHR on:
              //   - DNS error
              //   - unallowed cross domain request
              reject(
                new errors.Network({
                  more: event
                })
              );
            }

            function onTimeout() {
              timedOut = true;
              req.abort();

              reject(new errors.RequestTimeout());
            }

            function onConnect() {
              connected = true;
              clearTimeout(reqTimeout);
              reqTimeout = setTimeout(onTimeout, opts.timeouts.complete);
            }

            function onProgress() {
              if (!connected) onConnect();
            }

            function onReadyStateChange() {
              if (!connected && req.readyState > 1) onConnect();
            }
          });
        };

        AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
          url = inlineHeaders(url, opts.headers);

          return new Promise(function wrapJsonpRequest(resolve, reject) {
            jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
              if (err) {
                reject(err);
                return;
              }

              resolve(content);
            });
          });
        };

        AlgoliaSearchBrowser.prototype._promise = {
          reject: function rejectPromise(val) {
            return Promise.reject(val);
          },
          resolve: function resolvePromise(val) {
            return Promise.resolve(val);
          },
          delay: function delayPromise(ms) {
            return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
              setTimeout(resolve, ms);
            });
          },
          all: function all(promises) {
            return Promise.all(promises);
          }
        };

        return algoliasearch;
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/browser/inline-headers.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/inline-headers.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = inlineHeaders;

      var encode = __webpack_require__(/*! querystring-es3/encode */ "./node_modules/querystring-es3/encode.js");

      function inlineHeaders(url, headers) {
        if (/\?/.test(url)) {
          url += '&';
        } else {
          url += '?';
        }

        return url + encode(headers);
      }


      /***/
}),

/***/ "./node_modules/algoliasearch/src/browser/jsonp-request.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/jsonp-request.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = jsonpRequest;

      var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");

      var JSONPCounter = 0;

      function jsonpRequest(url, opts, cb) {
        if (opts.method !== 'GET') {
          cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
          return;
        }

        opts.debug('JSONP: start');

        var cbCalled = false;
        var timedOut = false;

        JSONPCounter += 1;
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var cbName = 'algoliaJSONP_' + JSONPCounter;
        var done = false;

        window[cbName] = function (data) {
          removeGlobals();

          if (timedOut) {
            opts.debug('JSONP: Late answer, ignoring');
            return;
          }

          cbCalled = true;

          clean();

          cb(null, {
            body: data,
            responseText: JSON.stringify(data)/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
          });
        };

        // add callback by hand
        url += '&callback=' + cbName;

        // add body params manually
        if (opts.jsonBody && opts.jsonBody.params) {
          url += '&' + opts.jsonBody.params;
        }

        var ontimeout = setTimeout(timeout, opts.timeouts.complete);

        // script onreadystatechange needed only for
        // <= IE8
        // https://github.com/angular/angular.js/issues/4523
        script.onreadystatechange = readystatechange;
        script.onload = success;
        script.onerror = error;

        script.async = true;
        script.defer = true;
        script.src = url;
        head.appendChild(script);

        function success() {
          opts.debug('JSONP: success');

          if (done || timedOut) {
            return;
          }

          done = true;

          // script loaded but did not call the fn => script loading error
          if (!cbCalled) {
            opts.debug('JSONP: Fail. Script loaded but did not call the callback');
            clean();
            cb(new errors.JSONPScriptFail());
          }
        }

        function readystatechange() {
          if (this.readyState === 'loaded' || this.readyState === 'complete') {
            success();
          }
        }

        function clean() {
          clearTimeout(ontimeout);
          script.onload = null;
          script.onreadystatechange = null;
          script.onerror = null;
          head.removeChild(script);
        }

        function removeGlobals() {
          try {
            delete window[cbName];
            delete window[cbName + '_loaded'];
          } catch (e) {
            window[cbName] = window[cbName + '_loaded'] = undefined;
          }
        }

        function timeout() {
          opts.debug('JSONP: Script timeout');
          timedOut = true;
          clean();
          cb(new errors.RequestTimeout());
        }

        function error() {
          opts.debug('JSONP: Script error');

          if (done || timedOut) {
            return;
          }

          clean();
          cb(new errors.JSONPScriptError());
        }
      }


      /***/
}),

/***/ "./node_modules/algoliasearch/src/buildSearchMethod.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/buildSearchMethod.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      module.exports = buildSearchMethod;

      var errors = __webpack_require__(/*! ./errors.js */ "./node_modules/algoliasearch/src/errors.js");

      /**
       * Creates a search method to be used in clients
       * @param {string} queryParam the name of the attribute used for the query
       * @param {string} url the url
       * @return {function} the search method
       */
      function buildSearchMethod(queryParam, url) {
        /**
         * The search method. Prepares the data and send the query to Algolia.
         * @param {string} query the string used for query search
         * @param {object} args additional parameters to send with the search
         * @param {function} [callback] the callback to be called with the client gets the answer
         * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
         */
        return function search(query, args, callback) {
          // warn V2 users on how to search
          if (typeof query === 'function' && typeof args === 'object' ||
            typeof callback === 'object') {
            // .search(query, params, cb)
            // .search(cb, params)
            throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
          }

          // Normalizing the function signature
          if (arguments.length === 0 || typeof query === 'function') {
            // Usage : .search(), .search(cb)
            callback = query;
            query = '';
          } else if (arguments.length === 1 || typeof args === 'function') {
            // Usage : .search(query/args), .search(query, cb)
            callback = args;
            args = undefined;
          }
          // At this point we have 3 arguments with values

          // Usage : .search(args) // careful: typeof null === 'object'
          if (typeof query === 'object' && query !== null) {
            args = query;
            query = undefined;
          } else if (query === undefined || query === null) { // .search(undefined/null)
            query = '';
          }

          var params = '';

          if (query !== undefined) {
            params += queryParam + '=' + encodeURIComponent(query);
          }

          var additionalUA;
          if (args !== undefined) {
            if (args.additionalUA) {
              additionalUA = args.additionalUA;
              delete args.additionalUA;
            }
            // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
            params = this.as._getSearchParams(args, params);
          }


          return this._search(params, url, callback, additionalUA);
        };
      }


      /***/
}),

/***/ "./node_modules/algoliasearch/src/clone.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/clone.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/deprecate.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = function deprecate(fn, message) {
        var warned = false;

        function deprecated() {
          if (!warned) {
            /* eslint no-console:0 */
            console.warn(message);
            warned = true;
          }

          return fn.apply(this, arguments);
        }

        return deprecated;
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/deprecatedMessage.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecatedMessage.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = function deprecatedMessage(previousUsage, newUsage) {
        var githubAnchorLink = previousUsage.toLowerCase()
          .replace(/[\.\(\)]/g, '');

        return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
          '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' + githubAnchorLink;
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/errors.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      // This file hosts our error definitions
      // We use custom error "types" so that we can act on them when we need it
      // e.g.: if error instanceof errors.UnparsableJSON then..

      var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

      function AlgoliaSearchError(message, extraProperties) {
        var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

        var error = this;

        // try to get a stacktrace
        if (typeof Error.captureStackTrace === 'function') {
          Error.captureStackTrace(this, this.constructor);
        } else {
          error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
        }

        this.name = 'AlgoliaSearchError';
        this.message = message || 'Unknown error';

        if (extraProperties) {
          forEach(extraProperties, function addToErrorObject(value, key) {
            error[key] = value;
          });
        }
      }

      inherits(AlgoliaSearchError, Error);

      function createCustomError(name, message) {
        function AlgoliaSearchCustomError() {
          var args = Array.prototype.slice.call(arguments, 0);

          // custom message not set, use default
          if (typeof args[0] !== 'string') {
            args.unshift(message);
          }

          AlgoliaSearchError.apply(this, args);
          this.name = 'AlgoliaSearch' + name + 'Error';
        }

        inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

        return AlgoliaSearchCustomError;
      }

      // late exports to let various fn defs and inherits take place
      module.exports = {
        AlgoliaSearchError: AlgoliaSearchError,
        UnparsableJSON: createCustomError(
          'UnparsableJSON',
          'Could not parse the incoming response as JSON, see err.more for details'
        ),
        RequestTimeout: createCustomError(
          'RequestTimeout',
          'Request timed out before getting a response'
        ),
        Network: createCustomError(
          'Network',
          'Network issue, see err.more for details'
        ),
        JSONPScriptFail: createCustomError(
          'JSONPScriptFail',
          '<script> was loaded but did not call our provided callback'
        ),
        ValidUntilNotFound: createCustomError(
          'ValidUntilNotFound',
          'The SecuredAPIKey does not have a validUntil parameter.'
        ),
        JSONPScriptError: createCustomError(
          'JSONPScriptError',
          '<script> unable to load due to an `error` event on it'
        ),
        ObjectNotFound: createCustomError(
          'ObjectNotFound',
          'Object not found'
        ),
        Unknown: createCustomError(
          'Unknown',
          'Unknown error occured'
        )
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/exitPromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/algoliasearch/src/exitPromise.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      // Parse cloud does not supports setTimeout
      // We do not store a setTimeout reference in the client everytime
      // We only fallback to a fake setTimeout when not available
      // setTimeout cannot be override globally sadly
      module.exports = function exitPromise(fn, _setTimeout) {
        _setTimeout(fn, 0);
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/map.js":
/*!***********************************************!*\
  !*** ./node_modules/algoliasearch/src/map.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

      module.exports = function map(arr, fn) {
        var newArr = [];
        foreach(arr, function (item, itemIndex) {
          newArr.push(fn(item, itemIndex, arr));
        });
        return newArr;
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/merge.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/merge.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

      module.exports = function merge(destination/* , sources */) {
        var sources = Array.prototype.slice.call(arguments);

        foreach(sources, function (source) {
          for (var keyName in source) {
            if (source.hasOwnProperty(keyName)) {
              if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
                destination[keyName] = merge({}, destination[keyName], source[keyName]);
              } else if (source[keyName] !== undefined) {
                destination[keyName] = source[keyName];
              }
            }
          }
        });

        return destination;
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/omit.js":
/*!************************************************!*\
  !*** ./node_modules/algoliasearch/src/omit.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      module.exports = function omit(obj, test) {
        var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
        var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

        var filtered = {};

        foreach(keys(obj), function doFilter(keyName) {
          if (test(keyName) !== true) {
            filtered[keyName] = obj[keyName];
          }
        });

        return filtered;
      };


      /***/
}),

/***/ "./node_modules/algoliasearch/src/places.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/places.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      module.exports = createPlacesClient;

      var qs3 = __webpack_require__(/*! querystring-es3 */ "./node_modules/querystring-es3/index.js");
      var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");

      function createPlacesClient(algoliasearch) {
        return function places(appID, apiKey, opts) {
          var cloneDeep = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");

          opts = opts && cloneDeep(opts) || {};
          opts.hosts = opts.hosts || [
            'places-dsn.algolia.net',
            'places-1.algolianet.com',
            'places-2.algolianet.com',
            'places-3.algolianet.com'
          ];

          // allow initPlaces() no arguments => community rate limited
          if (arguments.length === 0 || typeof appID === 'object' || appID === undefined) {
            appID = '';
            apiKey = '';
            opts._allowEmptyCredentials = true;
          }

          var client = algoliasearch(appID, apiKey, opts);
          var index = client.initIndex('places');
          index.search = buildSearchMethod('query', '/1/places/query');
          index.reverse = function (options, callback) {
            var encoded = qs3.encode(options);

            return this.as._jsonRequest({
              method: 'GET',
              url: '/1/places/reverse?' + encoded,
              hostType: 'read',
              callback: callback
            });
          };

          index.getObject = function (objectID, callback) {
            return this.as._jsonRequest({
              method: 'GET',
              url: '/1/places/' + encodeURIComponent(objectID),
              hostType: 'read',
              callback: callback
            });
          };
          return index;
        };
      }


      /***/
}),

/***/ "./node_modules/algoliasearch/src/store.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/store.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function (global) {
        var debug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch:src/hostIndexState.js');
        var localStorageNamespace = 'algoliasearch-client-js';

        var store;
        var moduleStore = {
          state: {},
          set: function (key, data) {
            this.state[key] = data;
            return this.state[key];
          },
          get: function (key) {
            return this.state[key] || null;
          }
        };

        var localStorageStore = {
          set: function (key, data) {
            moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

            try {
              var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
              namespace[key] = data;
              global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
              return namespace[key];
            } catch (e) {
              return localStorageFailure(key, e);
            }
          },
          get: function (key) {
            try {
              return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
            } catch (e) {
              return localStorageFailure(key, e);
            }
          }
        };

        function localStorageFailure(key, e) {
          debug('localStorage failed with', e);
          cleanup();
          store = moduleStore;
          return store.get(key);
        }

        store = supportsLocalStorage() ? localStorageStore : moduleStore;

        module.exports = {
          get: getOrSet,
          set: getOrSet,
          supportsLocalStorage: supportsLocalStorage
        };

        function getOrSet(key, data) {
          if (arguments.length === 1) {
            return store.get(key);
          }

          return store.set(key, data);
        }

        function supportsLocalStorage() {
          try {
            if ('localStorage' in global &&
              global.localStorage !== null) {
              if (!global.localStorage[localStorageNamespace]) {
                // actual creation of the namespace
                global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
              }
              return true;
            }

            return false;
          } catch (_) {
            return false;
          }
        }

        // In case of any error on localStorage, we clean our own namespace, this should handle
        // quota errors when a lot of keys + data are used
        function cleanup() {
          try {
            global.localStorage.removeItem(localStorageNamespace);
          } catch (_) {
            // nothing to do
          }
        }

        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/
}),

/***/ "./node_modules/algoliasearch/src/version.js":
/*!***************************************************!*\
  !*** ./node_modules/algoliasearch/src/version.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = '3.35.1';


      /***/
}),

/***/ "./node_modules/autocomplete.js/index.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = __webpack_require__(/*! ./src/standalone/ */ "./node_modules/autocomplete.js/src/standalone/index.js");


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/css.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/css.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");

      var css = {
        wrapper: {
          position: 'relative',
          display: 'inline-block'
        },
        hint: {
          position: 'absolute',
          top: '0',
          left: '0',
          borderColor: 'transparent',
          boxShadow: 'none',
          // #741: fix hint opacity issue on iOS
          opacity: '1'
        },
        input: {
          position: 'relative',
          verticalAlign: 'top',
          backgroundColor: 'transparent'
        },
        inputWithNoHint: {
          position: 'relative',
          verticalAlign: 'top'
        },
        dropdown: {
          position: 'absolute',
          top: '100%',
          left: '0',
          zIndex: '100',
          display: 'none'
        },
        suggestions: {
          display: 'block'
        },
        suggestion: {
          whiteSpace: 'nowrap',
          cursor: 'pointer'
        },
        suggestionChild: {
          whiteSpace: 'normal'
        },
        ltr: {
          left: '0',
          right: 'auto'
        },
        rtl: {
          left: 'auto',
          right: '0'
        },
        defaultClasses: {
          root: 'algolia-autocomplete',
          prefix: 'aa',
          noPrefix: false,
          dropdownMenu: 'dropdown-menu',
          input: 'input',
          hint: 'hint',
          suggestions: 'suggestions',
          suggestion: 'suggestion',
          cursor: 'cursor',
          dataset: 'dataset',
          empty: 'empty'
        },
        // will be merged with the default ones if appendTo is used
        appendTo: {
          wrapper: {
            position: 'absolute',
            zIndex: '100',
            display: 'none'
          },
          input: {},
          inputWithNoHint: {},
          dropdown: {
            display: 'block'
          }
        }
      };

      // ie specific styling
      if (_.isMsie()) {
        // ie6-8 (and 9?) doesn't fire hover and click events for elements with
        // transparent backgrounds, for a workaround, use 1x1 transparent gif
        _.mixin(css.input, {
          backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
        });
      }

      // ie7 and under specific styling
      if (_.isMsie() && _.isMsie() <= 7) {
        // if someone can tell me why this is necessary to align
        // the hint with the query in ie7, i'll send you $5 - @JakeHarding
        _.mixin(css.input, { marginTop: '-1px' });
      }

      module.exports = css;


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dataset.js":
/*!******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dataset.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var datasetKey = 'aaDataset';
      var valueKey = 'aaValue';
      var datumKey = 'aaDatum';

      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
      var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
      var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");
      var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

      // constructor
      // -----------

      function Dataset(o) {
        o = o || {};
        o.templates = o.templates || {};

        if (!o.source) {
          _.error('missing source');
        }

        if (o.name && !isValidName(o.name)) {
          _.error('invalid dataset name: ' + o.name);
        }

        // tracks the last query the dataset was updated for
        this.query = null;
        this._isEmpty = true;

        this.highlight = !!o.highlight;
        this.name = typeof o.name === 'undefined' || o.name === null ? _.getUniqueId() : o.name;

        this.source = o.source;
        this.displayFn = getDisplayFn(o.display || o.displayKey);

        this.debounce = o.debounce;

        this.cache = o.cache !== false;

        this.templates = getTemplates(o.templates, this.displayFn);

        this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
        this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
        this.cssClasses.prefix =
          o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

        var clazz = _.className(this.cssClasses.prefix, this.cssClasses.dataset);
        this.$el = o.$menu && o.$menu.find(clazz + '-' + this.name).length > 0 ?
          DOM.element(o.$menu.find(clazz + '-' + this.name)[0]) :
          DOM.element(
            html.dataset.replace('%CLASS%', this.name)
              .replace('%PREFIX%', this.cssClasses.prefix)
              .replace('%DATASET%', this.cssClasses.dataset)
          );

        this.$menu = o.$menu;
        this.clearCachedSuggestions();
      }

      // static methods
      // --------------

      Dataset.extractDatasetName = function extractDatasetName(el) {
        return DOM.element(el).data(datasetKey);
      };

      Dataset.extractValue = function extractValue(el) {
        return DOM.element(el).data(valueKey);
      };

      Dataset.extractDatum = function extractDatum(el) {
        var datum = DOM.element(el).data(datumKey);
        if (typeof datum === 'string') {
          // Zepto has an automatic deserialization of the
          // JSON encoded data attribute
          datum = JSON.parse(datum);
        }
        return datum;
      };

      // instance methods
      // ----------------

      _.mixin(Dataset.prototype, EventEmitter, {

        // ### private

        _render: function render(query, suggestions) {
          if (!this.$el) {
            return;
          }
          var that = this;

          var hasSuggestions;
          var renderArgs = [].slice.call(arguments, 2);
          this.$el.empty();

          hasSuggestions = suggestions && suggestions.length;
          this._isEmpty = !hasSuggestions;

          if (!hasSuggestions && this.templates.empty) {
            this.$el
              .html(getEmptyHtml.apply(this, renderArgs))
              .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
              .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
          } else if (hasSuggestions) {
            this.$el
              .html(getSuggestionsHtml.apply(this, renderArgs))
              .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
              .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
          } else if (suggestions && !Array.isArray(suggestions)) {
            throw new TypeError('suggestions must be an array');
          }

          if (this.$menu) {
            this.$menu.addClass(
              this.cssClasses.prefix + (hasSuggestions ? 'with' : 'without') + '-' + this.name
            ).removeClass(
              this.cssClasses.prefix + (hasSuggestions ? 'without' : 'with') + '-' + this.name
            );
          }

          this.trigger('rendered', query);

          function getEmptyHtml() {
            var args = [].slice.call(arguments, 0);
            args = [{ query: query, isEmpty: true }].concat(args);
            return that.templates.empty.apply(this, args);
          }

          function getSuggestionsHtml() {
            var args = [].slice.call(arguments, 0);
            var $suggestions;
            var nodes;
            var self = this;

            var suggestionsHtml = html.suggestions.
              replace('%PREFIX%', this.cssClasses.prefix).
              replace('%SUGGESTIONS%', this.cssClasses.suggestions);
            $suggestions = DOM
              .element(suggestionsHtml)
              .css(this.css.suggestions);

            // jQuery#append doesn't support arrays as the first argument
            // until version 1.8, see http://bugs.jquery.com/ticket/11231
            nodes = _.map(suggestions, getSuggestionNode);
            $suggestions.append.apply($suggestions, nodes);

            return $suggestions;

            function getSuggestionNode(suggestion) {
              var $el;

              var suggestionHtml = html.suggestion.
                replace('%PREFIX%', self.cssClasses.prefix).
                replace('%SUGGESTION%', self.cssClasses.suggestion);
              $el = DOM.element(suggestionHtml)
                .attr({
                  role: 'option',
                  id: ['option', Math.floor(Math.random() * 100000000)].join('-')
                })
                .append(that.templates.suggestion.apply(this, [suggestion].concat(args)));

              $el.data(datasetKey, that.name);
              $el.data(valueKey, that.displayFn(suggestion) || undefined); // this led to undefined return value
              $el.data(datumKey, JSON.stringify(suggestion));
              $el.children().each(function () { DOM.element(this).css(self.css.suggestionChild); });

              return $el;
            }
          }

          function getHeaderHtml() {
            var args = [].slice.call(arguments, 0);
            args = [{ query: query, isEmpty: !hasSuggestions }].concat(args);
            return that.templates.header.apply(this, args);
          }

          function getFooterHtml() {
            var args = [].slice.call(arguments, 0);
            args = [{ query: query, isEmpty: !hasSuggestions }].concat(args);
            return that.templates.footer.apply(this, args);
          }
        },

        // ### public

        getRoot: function getRoot() {
          return this.$el;
        },

        update: function update(query) {
          function handleSuggestions(suggestions) {
            // if the update has been canceled or if the query has changed
            // do not render the suggestions as they've become outdated
            if (!this.canceled && query === this.query) {
              // concat all the other arguments that could have been passed
              // to the render function, and forward them to _render
              var extraArgs = [].slice.call(arguments, 1);
              this.cacheSuggestions(query, suggestions, extraArgs);
              this._render.apply(this, [query, suggestions].concat(extraArgs));
            }
          }

          this.query = query;
          this.canceled = false;

          if (this.shouldFetchFromCache(query)) {
            handleSuggestions.apply(this, [this.cachedSuggestions].concat(this.cachedRenderExtraArgs));
          } else {
            var that = this;
            var execSource = function () {
              // When the call is debounced the condition avoid to do a useless
              // request with the last character when the input has been cleared
              if (!that.canceled) {
                that.source(query, handleSuggestions.bind(that));
              }
            };

            if (this.debounce) {
              var later = function () {
                that.debounceTimeout = null;
                execSource();
              };
              clearTimeout(this.debounceTimeout);
              this.debounceTimeout = setTimeout(later, this.debounce);
            } else {
              execSource();
            }
          }
        },

        cacheSuggestions: function cacheSuggestions(query, suggestions, extraArgs) {
          this.cachedQuery = query;
          this.cachedSuggestions = suggestions;
          this.cachedRenderExtraArgs = extraArgs;
        },

        shouldFetchFromCache: function shouldFetchFromCache(query) {
          return this.cache &&
            this.cachedQuery === query &&
            this.cachedSuggestions &&
            this.cachedSuggestions.length;
        },

        clearCachedSuggestions: function clearCachedSuggestions() {
          delete this.cachedQuery;
          delete this.cachedSuggestions;
          delete this.cachedRenderExtraArgs;
        },

        cancel: function cancel() {
          this.canceled = true;
        },

        clear: function clear() {
          if (this.$el) {
            this.cancel();
            this.$el.empty();
            this.trigger('rendered', '');
          }
        },

        isEmpty: function isEmpty() {
          return this._isEmpty;
        },

        destroy: function destroy() {
          this.clearCachedSuggestions();
          this.$el = null;
        }
      });

      // helper functions
      // ----------------

      function getDisplayFn(display) {
        display = display || 'value';

        return _.isFunction(display) ? display : displayFn;

        function displayFn(obj) {
          return obj[display];
        }
      }

      function getTemplates(templates, displayFn) {
        return {
          empty: templates.empty && _.templatify(templates.empty),
          header: templates.header && _.templatify(templates.header),
          footer: templates.footer && _.templatify(templates.footer),
          suggestion: templates.suggestion || suggestionTemplate
        };

        function suggestionTemplate(context) {
          return '<p>' + displayFn(context) + '</p>';
        }
      }

      function isValidName(str) {
        // dashes, underscores, letters, and numbers
        return (/^[_a-zA-Z0-9-]+$/).test(str);
      }

      module.exports = Dataset;


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js":
/*!*******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dropdown.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
      var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");
      var Dataset = __webpack_require__(/*! ./dataset.js */ "./node_modules/autocomplete.js/src/autocomplete/dataset.js");
      var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

      // constructor
      // -----------

      function Dropdown(o) {
        var that = this;
        var onSuggestionClick;
        var onSuggestionMouseEnter;
        var onSuggestionMouseLeave;

        o = o || {};

        if (!o.menu) {
          _.error('menu is required');
        }

        if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
          _.error('1 or more datasets required');
        }
        if (!o.datasets) {
          _.error('datasets is required');
        }

        this.isOpen = false;
        this.isEmpty = true;
        this.minLength = o.minLength || 0;
        this.templates = {};
        this.appendTo = o.appendTo || false;
        this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
        this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
        this.cssClasses.prefix =
          o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

        // bound functions
        onSuggestionClick = _.bind(this._onSuggestionClick, this);
        onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
        onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);

        var cssClass = _.className(this.cssClasses.prefix, this.cssClasses.suggestion);
        this.$menu = DOM.element(o.menu)
          .on('mouseenter.aa', cssClass, onSuggestionMouseEnter)
          .on('mouseleave.aa', cssClass, onSuggestionMouseLeave)
          .on('click.aa', cssClass, onSuggestionClick);

        this.$container = o.appendTo ? o.wrapper : this.$menu;

        if (o.templates && o.templates.header) {
          this.templates.header = _.templatify(o.templates.header);
          this.$menu.prepend(this.templates.header());
        }

        if (o.templates && o.templates.empty) {
          this.templates.empty = _.templatify(o.templates.empty);
          this.$empty = DOM.element('<div class="' +
            _.className(this.cssClasses.prefix, this.cssClasses.empty, true) + '">' +
            '</div>');
          this.$menu.append(this.$empty);
          this.$empty.hide();
        }

        this.datasets = _.map(o.datasets, function (oDataset) {
          return initializeDataset(that.$menu, oDataset, o.cssClasses);
        });
        _.each(this.datasets, function (dataset) {
          var root = dataset.getRoot();
          if (root && root.parent().length === 0) {
            that.$menu.append(root);
          }
          dataset.onSync('rendered', that._onRendered, that);
        });

        if (o.templates && o.templates.footer) {
          this.templates.footer = _.templatify(o.templates.footer);
          this.$menu.append(this.templates.footer());
        }

        var self = this;
        DOM.element(window).resize(function () {
          self._redraw();
        });
      }

      // instance methods
      // ----------------

      _.mixin(Dropdown.prototype, EventEmitter, {

        // ### private

        _onSuggestionClick: function onSuggestionClick($e) {
          this.trigger('suggestionClicked', DOM.element($e.currentTarget));
        },

        _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
          var elt = DOM.element($e.currentTarget);
          if (elt.hasClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))) {
            // we're already on the cursor
            // => we're probably entering it again after leaving it for a nested div
            return;
          }
          this._removeCursor();

          // Fixes iOS double tap behaviour, by modifying the DOM right before the
          // native href clicks happens, iOS will requires another tap to follow
          // a suggestion that has an <a href> element inside
          // https://www.google.com/search?q=ios+double+tap+bug+href
          var suggestion = this;
          setTimeout(function () {
            // this exact line, when inside the main loop, will trigger a double tap bug
            // on iOS devices
            suggestion._setCursor(elt, false);
          }, 0);
        },

        _onSuggestionMouseLeave: function onSuggestionMouseLeave($e) {
          // $e.relatedTarget is the `EventTarget` the pointing device entered to
          if ($e.relatedTarget) {
            var elt = DOM.element($e.relatedTarget);
            if (elt.closest('.' + _.className(this.cssClasses.prefix, this.cssClasses.cursor, true)).length > 0) {
              // our father is a cursor
              // => it means we're just leaving the suggestion for a nested div
              return;
            }
          }
          this._removeCursor();
          this.trigger('cursorRemoved');
        },

        _onRendered: function onRendered(e, query) {
          this.isEmpty = _.every(this.datasets, isDatasetEmpty);

          if (this.isEmpty) {
            if (query.length >= this.minLength) {
              this.trigger('empty');
            }

            if (this.$empty) {
              if (query.length < this.minLength) {
                this._hide();
              } else {
                var html = this.templates.empty({
                  query: this.datasets[0] && this.datasets[0].query
                });
                this.$empty.html(html);
                this.$empty.show();
                this._show();
              }
            } else if (_.any(this.datasets, hasEmptyTemplate)) {
              if (query.length < this.minLength) {
                this._hide();
              } else {
                this._show();
              }
            } else {
              this._hide();
            }
          } else if (this.isOpen) {
            if (this.$empty) {
              this.$empty.empty();
              this.$empty.hide();
            }

            if (query.length >= this.minLength) {
              this._show();
            } else {
              this._hide();
            }
          }

          this.trigger('datasetRendered');

          function isDatasetEmpty(dataset) {
            return dataset.isEmpty();
          }

          function hasEmptyTemplate(dataset) {
            return dataset.templates && dataset.templates.empty;
          }
        },

        _hide: function () {
          this.$container.hide();
        },

        _show: function () {
          // can't use jQuery#show because $menu is a span element we want
          // display: block; not dislay: inline;
          this.$container.css('display', 'block');

          this._redraw();

          this.trigger('shown');
        },

        _redraw: function redraw() {
          if (!this.isOpen || !this.appendTo) return;

          this.trigger('redrawn');
        },

        _getSuggestions: function getSuggestions() {
          return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.suggestion));
        },

        _getCursor: function getCursor() {
          return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
        },

        _setCursor: function setCursor($el, updateInput) {
          $el.first()
            .addClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
            .attr('aria-selected', 'true');
          this.trigger('cursorMoved', updateInput);
        },

        _removeCursor: function removeCursor() {
          this._getCursor()
            .removeClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
            .removeAttr('aria-selected');
        },

        _moveCursor: function moveCursor(increment) {
          var $suggestions;
          var $oldCursor;
          var newCursorIndex;
          var $newCursor;

          if (!this.isOpen) {
            return;
          }

          $oldCursor = this._getCursor();
          $suggestions = this._getSuggestions();

          this._removeCursor();

          // shifting before and after modulo to deal with -1 index
          newCursorIndex = $suggestions.index($oldCursor) + increment;
          newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;

          if (newCursorIndex === -1) {
            this.trigger('cursorRemoved');

            return;
          } else if (newCursorIndex < -1) {
            newCursorIndex = $suggestions.length - 1;
          }

          this._setCursor($newCursor = $suggestions.eq(newCursorIndex), true);

          // in the case of scrollable overflow
          // make sure the cursor is visible in the menu
          this._ensureVisible($newCursor);
        },

        _ensureVisible: function ensureVisible($el) {
          var elTop;
          var elBottom;
          var menuScrollTop;
          var menuHeight;

          elTop = $el.position().top;
          elBottom = elTop + $el.height() +
            parseInt($el.css('margin-top'), 10) +
            parseInt($el.css('margin-bottom'), 10);
          menuScrollTop = this.$menu.scrollTop();
          menuHeight = this.$menu.height() +
            parseInt(this.$menu.css('padding-top'), 10) +
            parseInt(this.$menu.css('padding-bottom'), 10);

          if (elTop < 0) {
            this.$menu.scrollTop(menuScrollTop + elTop);
          } else if (menuHeight < elBottom) {
            this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
          }
        },

        // ### public

        close: function close() {
          if (this.isOpen) {
            this.isOpen = false;

            this._removeCursor();
            this._hide();

            this.trigger('closed');
          }
        },

        open: function open() {
          if (!this.isOpen) {
            this.isOpen = true;

            if (!this.isEmpty) {
              this._show();
            }

            this.trigger('opened');
          }
        },

        setLanguageDirection: function setLanguageDirection(dir) {
          this.$menu.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
        },

        moveCursorUp: function moveCursorUp() {
          this._moveCursor(-1);
        },

        moveCursorDown: function moveCursorDown() {
          this._moveCursor(+1);
        },

        getDatumForSuggestion: function getDatumForSuggestion($el) {
          var datum = null;

          if ($el.length) {
            datum = {
              raw: Dataset.extractDatum($el),
              value: Dataset.extractValue($el),
              datasetName: Dataset.extractDatasetName($el)
            };
          }

          return datum;
        },

        getCurrentCursor: function getCurrentCursor() {
          return this._getCursor().first();
        },

        getDatumForCursor: function getDatumForCursor() {
          return this.getDatumForSuggestion(this._getCursor().first());
        },

        getDatumForTopSuggestion: function getDatumForTopSuggestion() {
          return this.getDatumForSuggestion(this._getSuggestions().first());
        },

        cursorTopSuggestion: function cursorTopSuggestion() {
          this._setCursor(this._getSuggestions().first(), false);
        },

        update: function update(query) {
          _.each(this.datasets, updateDataset);

          function updateDataset(dataset) {
            dataset.update(query);
          }
        },

        empty: function empty() {
          _.each(this.datasets, clearDataset);
          this.isEmpty = true;

          function clearDataset(dataset) {
            dataset.clear();
          }
        },

        isVisible: function isVisible() {
          return this.isOpen && !this.isEmpty;
        },

        destroy: function destroy() {
          this.$menu.off('.aa');

          this.$menu = null;

          _.each(this.datasets, destroyDataset);

          function destroyDataset(dataset) {
            dataset.destroy();
          }
        }
      });

      // helper functions
      // ----------------
      Dropdown.Dataset = Dataset;

      function initializeDataset($menu, oDataset, cssClasses) {
        return new Dropdown.Dataset(_.mixin({ $menu: $menu, cssClasses: cssClasses }, oDataset));
      }

      module.exports = Dropdown;


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_bus.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var namespace = 'autocomplete:';

      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

      // constructor
      // -----------

      function EventBus(o) {
        if (!o || !o.el) {
          _.error('EventBus initialized without el');
        }

        this.$el = DOM.element(o.el);
      }

      // instance methods
      // ----------------

      _.mixin(EventBus.prototype, {

        // ### public

        trigger: function (type, suggestion, dataset, context) {
          var event = _.Event(namespace + type);
          this.$el.trigger(event, [suggestion, dataset, context]);
          return event;
        }
      });

      module.exports = EventBus;


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js":
/*!************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_emitter.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var immediate = __webpack_require__(/*! immediate */ "./node_modules/immediate/lib/index.js");
      var splitter = /\s+/;

      module.exports = {
        onSync: onSync,
        onAsync: onAsync,
        off: off,
        trigger: trigger
      };

      function on(method, types, cb, context) {
        var type;

        if (!cb) {
          return this;
        }

        types = types.split(splitter);
        cb = context ? bindContext(cb, context) : cb;

        this._callbacks = this._callbacks || {};

        while (type = types.shift()) {
          this._callbacks[type] = this._callbacks[type] || { sync: [], async: [] };
          this._callbacks[type][method].push(cb);
        }

        return this;
      }

      function onAsync(types, cb, context) {
        return on.call(this, 'async', types, cb, context);
      }

      function onSync(types, cb, context) {
        return on.call(this, 'sync', types, cb, context);
      }

      function off(types) {
        var type;

        if (!this._callbacks) {
          return this;
        }

        types = types.split(splitter);

        while (type = types.shift()) {
          delete this._callbacks[type];
        }

        return this;
      }

      function trigger(types) {
        var type;
        var callbacks;
        var args;
        var syncFlush;
        var asyncFlush;

        if (!this._callbacks) {
          return this;
        }

        types = types.split(splitter);
        args = [].slice.call(arguments, 1);

        while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
          syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
          asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

          if (syncFlush()) {
            immediate(asyncFlush);
          }
        }

        return this;
      }

      function getFlush(callbacks, context, args) {
        return flush;

        function flush() {
          var cancelled;

          for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
            // only cancel if the callback explicitly returns false
            cancelled = callbacks[i].apply(context, args) === false;
          }

          return !cancelled;
        }
      }

      function bindContext(fn, context) {
        return fn.bind ?
          fn.bind(context) :
          function () { fn.apply(context, [].slice.call(arguments, 0)); };
      }


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/html.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/html.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = {
        wrapper: '<span class="%ROOT%"></span>',
        dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
        dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
        suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
        suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>'
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/input.js":
/*!****************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/input.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var specialKeyCodeMap;

      specialKeyCodeMap = {
        9: 'tab',
        27: 'esc',
        37: 'left',
        39: 'right',
        13: 'enter',
        38: 'up',
        40: 'down'
      };

      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
      var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

      // constructor
      // -----------

      function Input(o) {
        var that = this;
        var onBlur;
        var onFocus;
        var onKeydown;
        var onInput;

        o = o || {};

        if (!o.input) {
          _.error('input is missing');
        }

        // bound functions
        onBlur = _.bind(this._onBlur, this);
        onFocus = _.bind(this._onFocus, this);
        onKeydown = _.bind(this._onKeydown, this);
        onInput = _.bind(this._onInput, this);

        this.$hint = DOM.element(o.hint);
        this.$input = DOM.element(o.input)
          .on('blur.aa', onBlur)
          .on('focus.aa', onFocus)
          .on('keydown.aa', onKeydown);

        // if no hint, noop all the hint related functions
        if (this.$hint.length === 0) {
          this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
        }

        // ie7 and ie8 don't support the input event
        // ie9 doesn't fire the input event when characters are removed
        // not sure if ie10 is compatible
        if (!_.isMsie()) {
          this.$input.on('input.aa', onInput);
        } else {
          this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function ($e) {
            // if a special key triggered this, ignore it
            if (specialKeyCodeMap[$e.which || $e.keyCode]) {
              return;
            }

            // give the browser a chance to update the value of the input
            // before checking to see if the query changed
            _.defer(_.bind(that._onInput, that, $e));
          });
        }

        // the query defaults to whatever the value of the input is
        // on initialization, it'll most likely be an empty string
        this.query = this.$input.val();

        // helps with calculating the width of the input's value
        this.$overflowHelper = buildOverflowHelper(this.$input);
      }

      // static methods
      // --------------

      Input.normalizeQuery = function (str) {
        // strips leading whitespace and condenses all whitespace
        return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
      };

      // instance methods
      // ----------------

      _.mixin(Input.prototype, EventEmitter, {

        // ### private

        _onBlur: function onBlur() {
          this.resetInputValue();
          this.$input.removeAttr('aria-activedescendant');
          this.trigger('blurred');
        },

        _onFocus: function onFocus() {
          this.trigger('focused');
        },

        _onKeydown: function onKeydown($e) {
          // which is normalized and consistent (but not for ie)
          var keyName = specialKeyCodeMap[$e.which || $e.keyCode];

          this._managePreventDefault(keyName, $e);
          if (keyName && this._shouldTrigger(keyName, $e)) {
            this.trigger(keyName + 'Keyed', $e);
          }
        },

        _onInput: function onInput() {
          this._checkInputValue();
        },

        _managePreventDefault: function managePreventDefault(keyName, $e) {
          var preventDefault;
          var hintValue;
          var inputValue;

          switch (keyName) {
            case 'tab':
              hintValue = this.getHint();
              inputValue = this.getInputValue();

              preventDefault = hintValue &&
                hintValue !== inputValue &&
                !withModifier($e);
              break;

            case 'up':
            case 'down':
              preventDefault = !withModifier($e);
              break;

            default:
              preventDefault = false;
          }

          if (preventDefault) {
            $e.preventDefault();
          }
        },

        _shouldTrigger: function shouldTrigger(keyName, $e) {
          var trigger;

          switch (keyName) {
            case 'tab':
              trigger = !withModifier($e);
              break;

            default:
              trigger = true;
          }

          return trigger;
        },

        _checkInputValue: function checkInputValue() {
          var inputValue;
          var areEquivalent;
          var hasDifferentWhitespace;

          inputValue = this.getInputValue();
          areEquivalent = areQueriesEquivalent(inputValue, this.query);
          hasDifferentWhitespace = areEquivalent && this.query ?
            this.query.length !== inputValue.length : false;

          this.query = inputValue;

          if (!areEquivalent) {
            this.trigger('queryChanged', this.query);
          } else if (hasDifferentWhitespace) {
            this.trigger('whitespaceChanged', this.query);
          }
        },

        // ### public

        focus: function focus() {
          this.$input.focus();
        },

        blur: function blur() {
          this.$input.blur();
        },

        getQuery: function getQuery() {
          return this.query;
        },

        setQuery: function setQuery(query) {
          this.query = query;
        },

        getInputValue: function getInputValue() {
          return this.$input.val();
        },

        setInputValue: function setInputValue(value, silent) {
          if (typeof value === 'undefined') {
            value = this.query;
          }
          this.$input.val(value);

          // silent prevents any additional events from being triggered
          if (silent) {
            this.clearHint();
          } else {
            this._checkInputValue();
          }
        },

        expand: function expand() {
          this.$input.attr('aria-expanded', 'true');
        },

        collapse: function collapse() {
          this.$input.attr('aria-expanded', 'false');
        },

        setActiveDescendant: function setActiveDescendant(activedescendantId) {
          this.$input.attr('aria-activedescendant', activedescendantId);
        },

        removeActiveDescendant: function removeActiveDescendant() {
          this.$input.removeAttr('aria-activedescendant');
        },

        resetInputValue: function resetInputValue() {
          this.setInputValue(this.query, true);
        },

        getHint: function getHint() {
          return this.$hint.val();
        },

        setHint: function setHint(value) {
          this.$hint.val(value);
        },

        clearHint: function clearHint() {
          this.setHint('');
        },

        clearHintIfInvalid: function clearHintIfInvalid() {
          var val;
          var hint;
          var valIsPrefixOfHint;
          var isValid;

          val = this.getInputValue();
          hint = this.getHint();
          valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
          isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();

          if (!isValid) {
            this.clearHint();
          }
        },

        getLanguageDirection: function getLanguageDirection() {
          return (this.$input.css('direction') || 'ltr').toLowerCase();
        },

        hasOverflow: function hasOverflow() {
          // 2 is arbitrary, just picking a small number to handle edge cases
          var constraint = this.$input.width() - 2;

          this.$overflowHelper.text(this.getInputValue());

          return this.$overflowHelper.width() >= constraint;
        },

        isCursorAtEnd: function () {
          var valueLength;
          var selectionStart;
          var range;

          valueLength = this.$input.val().length;
          selectionStart = this.$input[0].selectionStart;

          if (_.isNumber(selectionStart)) {
            return selectionStart === valueLength;
          } else if (document.selection) {
            // NOTE: this won't work unless the input has focus, the good news
            // is this code should only get called when the input has focus
            range = document.selection.createRange();
            range.moveStart('character', -valueLength);

            return valueLength === range.text.length;
          }

          return true;
        },

        destroy: function destroy() {
          this.$hint.off('.aa');
          this.$input.off('.aa');

          this.$hint = this.$input = this.$overflowHelper = null;
        }
      });

      // helper functions
      // ----------------

      function buildOverflowHelper($input) {
        return DOM.element('<pre aria-hidden="true"></pre>')
          .css({
            // position helper off-screen
            position: 'absolute',
            visibility: 'hidden',
            // avoid line breaks and whitespace collapsing
            whiteSpace: 'pre',
            // use same font css as input to calculate accurate width
            fontFamily: $input.css('font-family'),
            fontSize: $input.css('font-size'),
            fontStyle: $input.css('font-style'),
            fontVariant: $input.css('font-variant'),
            fontWeight: $input.css('font-weight'),
            wordSpacing: $input.css('word-spacing'),
            letterSpacing: $input.css('letter-spacing'),
            textIndent: $input.css('text-indent'),
            textRendering: $input.css('text-rendering'),
            textTransform: $input.css('text-transform')
          })
          .insertAfter($input);
      }

      function areQueriesEquivalent(a, b) {
        return Input.normalizeQuery(a) === Input.normalizeQuery(b);
      }

      function withModifier($e) {
        return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
      }

      module.exports = Input;


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/typeahead.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var attrsKey = 'aaAttrs';

      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
      var EventBus = __webpack_require__(/*! ./event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");
      var Input = __webpack_require__(/*! ./input.js */ "./node_modules/autocomplete.js/src/autocomplete/input.js");
      var Dropdown = __webpack_require__(/*! ./dropdown.js */ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js");
      var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
      var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

      // constructor
      // -----------

      // THOUGHT: what if datasets could dynamically be added/removed?
      function Typeahead(o) {
        var $menu;
        var $hint;

        o = o || {};

        if (!o.input) {
          _.error('missing input');
        }

        this.isActivated = false;
        this.debug = !!o.debug;
        this.autoselect = !!o.autoselect;
        this.autoselectOnBlur = !!o.autoselectOnBlur;
        this.openOnFocus = !!o.openOnFocus;
        this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
        this.autoWidth = (o.autoWidth === undefined) ? true : !!o.autoWidth;
        this.clearOnSelected = !!o.clearOnSelected;
        this.tabAutocomplete = (o.tabAutocomplete === undefined) ? true : !!o.tabAutocomplete;

        o.hint = !!o.hint;

        if (o.hint && o.appendTo) {
          throw new Error('[autocomplete.js] hint and appendTo options can\'t be used at the same time');
        }

        this.css = o.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
        this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
        this.cssClasses.prefix =
          o.cssClasses.formattedPrefix = _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);
        this.listboxId = o.listboxId = [this.cssClasses.root, 'listbox', _.getUniqueId()].join('-');

        var domElts = buildDom(o);

        this.$node = domElts.wrapper;
        var $input = this.$input = domElts.input;
        $menu = domElts.menu;
        $hint = domElts.hint;

        if (o.dropdownMenuContainer) {
          DOM.element(o.dropdownMenuContainer)
            .css('position', 'relative') // ensure the container has a relative position
            .append($menu.css('top', '0')); // override the top: 100%
        }

        // #705: if there's scrollable overflow, ie doesn't support
        // blur cancellations when the scrollbar is clicked
        //
        // #351: preventDefault won't cancel blurs in ie <= 8
        $input.on('blur.aa', function ($e) {
          var active = document.activeElement;
          if (_.isMsie() && ($menu[0] === active || $menu[0].contains(active))) {
            $e.preventDefault();
            // stop immediate in order to prevent Input#_onBlur from
            // getting exectued
            $e.stopImmediatePropagation();
            _.defer(function () { $input.focus(); });
          }
        });

        // #351: prevents input blur due to clicks within dropdown menu
        $menu.on('mousedown.aa', function ($e) { $e.preventDefault(); });

        this.eventBus = o.eventBus || new EventBus({ el: $input });

        this.dropdown = new Typeahead.Dropdown({
          appendTo: o.appendTo,
          wrapper: this.$node,
          menu: $menu,
          datasets: o.datasets,
          templates: o.templates,
          cssClasses: o.cssClasses,
          minLength: this.minLength
        })
          .onSync('suggestionClicked', this._onSuggestionClicked, this)
          .onSync('cursorMoved', this._onCursorMoved, this)
          .onSync('cursorRemoved', this._onCursorRemoved, this)
          .onSync('opened', this._onOpened, this)
          .onSync('closed', this._onClosed, this)
          .onSync('shown', this._onShown, this)
          .onSync('empty', this._onEmpty, this)
          .onSync('redrawn', this._onRedrawn, this)
          .onAsync('datasetRendered', this._onDatasetRendered, this);

        this.input = new Typeahead.Input({ input: $input, hint: $hint })
          .onSync('focused', this._onFocused, this)
          .onSync('blurred', this._onBlurred, this)
          .onSync('enterKeyed', this._onEnterKeyed, this)
          .onSync('tabKeyed', this._onTabKeyed, this)
          .onSync('escKeyed', this._onEscKeyed, this)
          .onSync('upKeyed', this._onUpKeyed, this)
          .onSync('downKeyed', this._onDownKeyed, this)
          .onSync('leftKeyed', this._onLeftKeyed, this)
          .onSync('rightKeyed', this._onRightKeyed, this)
          .onSync('queryChanged', this._onQueryChanged, this)
          .onSync('whitespaceChanged', this._onWhitespaceChanged, this);

        this._bindKeyboardShortcuts(o);

        this._setLanguageDirection();
      }

      // instance methods
      // ----------------

      _.mixin(Typeahead.prototype, {
        // ### private

        _bindKeyboardShortcuts: function (options) {
          if (!options.keyboardShortcuts) {
            return;
          }
          var $input = this.$input;
          var keyboardShortcuts = [];
          _.each(options.keyboardShortcuts, function (key) {
            if (typeof key === 'string') {
              key = key.toUpperCase().charCodeAt(0);
            }
            keyboardShortcuts.push(key);
          });
          DOM.element(document).keydown(function (event) {
            var elt = (event.target || event.srcElement);
            var tagName = elt.tagName;
            if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
              // already in an input
              return;
            }

            var which = event.which || event.keyCode;
            if (keyboardShortcuts.indexOf(which) === -1) {
              // not the right shortcut
              return;
            }

            $input.focus();
            event.stopPropagation();
            event.preventDefault();
          });
        },

        _onSuggestionClicked: function onSuggestionClicked(type, $el) {
          var datum;
          var context = { selectionMethod: 'click' };

          if (datum = this.dropdown.getDatumForSuggestion($el)) {
            this._select(datum, context);
          }
        },

        _onCursorMoved: function onCursorMoved(event, updateInput) {
          var datum = this.dropdown.getDatumForCursor();
          var currentCursorId = this.dropdown.getCurrentCursor().attr('id');
          this.input.setActiveDescendant(currentCursorId);

          if (datum) {
            if (updateInput) {
              this.input.setInputValue(datum.value, true);
            }

            this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
          }
        },

        _onCursorRemoved: function onCursorRemoved() {
          this.input.resetInputValue();
          this._updateHint();
          this.eventBus.trigger('cursorremoved');
        },

        _onDatasetRendered: function onDatasetRendered() {
          this._updateHint();

          this.eventBus.trigger('updated');
        },

        _onOpened: function onOpened() {
          this._updateHint();
          this.input.expand();

          this.eventBus.trigger('opened');
        },

        _onEmpty: function onEmpty() {
          this.eventBus.trigger('empty');
        },

        _onRedrawn: function onRedrawn() {
          this.$node.css('top', 0 + 'px');
          this.$node.css('left', 0 + 'px');

          var inputRect = this.$input[0].getBoundingClientRect();

          if (this.autoWidth) {
            this.$node.css('width', inputRect.width + 'px');
          }

          var wrapperRect = this.$node[0].getBoundingClientRect();

          var top = inputRect.bottom - wrapperRect.top;
          this.$node.css('top', top + 'px');
          var left = inputRect.left - wrapperRect.left;
          this.$node.css('left', left + 'px');

          this.eventBus.trigger('redrawn');
        },

        _onShown: function onShown() {
          this.eventBus.trigger('shown');
          if (this.autoselect) {
            this.dropdown.cursorTopSuggestion();
          }
        },

        _onClosed: function onClosed() {
          this.input.clearHint();
          this.input.removeActiveDescendant();
          this.input.collapse();

          this.eventBus.trigger('closed');
        },

        _onFocused: function onFocused() {
          this.isActivated = true;

          if (this.openOnFocus) {
            var query = this.input.getQuery();
            if (query.length >= this.minLength) {
              this.dropdown.update(query);
            } else {
              this.dropdown.empty();
            }

            this.dropdown.open();
          }
        },

        _onBlurred: function onBlurred() {
          var cursorDatum;
          var topSuggestionDatum;

          cursorDatum = this.dropdown.getDatumForCursor();
          topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
          var context = { selectionMethod: 'blur' };

          if (!this.debug) {
            if (this.autoselectOnBlur && cursorDatum) {
              this._select(cursorDatum, context);
            } else if (this.autoselectOnBlur && topSuggestionDatum) {
              this._select(topSuggestionDatum, context);
            } else {
              this.isActivated = false;
              this.dropdown.empty();
              this.dropdown.close();
            }
          }
        },

        _onEnterKeyed: function onEnterKeyed(type, $e) {
          var cursorDatum;
          var topSuggestionDatum;

          cursorDatum = this.dropdown.getDatumForCursor();
          topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
          var context = { selectionMethod: 'enterKey' };

          if (cursorDatum) {
            this._select(cursorDatum, context);
            $e.preventDefault();
          } else if (this.autoselect && topSuggestionDatum) {
            this._select(topSuggestionDatum, context);
            $e.preventDefault();
          }
        },

        _onTabKeyed: function onTabKeyed(type, $e) {
          if (!this.tabAutocomplete) {
            // Closing the dropdown enables further tabbing
            this.dropdown.close();
            return;
          }

          var datum;
          var context = { selectionMethod: 'tabKey' };

          if (datum = this.dropdown.getDatumForCursor()) {
            this._select(datum, context);
            $e.preventDefault();
          } else {
            this._autocomplete(true);
          }
        },

        _onEscKeyed: function onEscKeyed() {
          this.dropdown.close();
          this.input.resetInputValue();
        },

        _onUpKeyed: function onUpKeyed() {
          var query = this.input.getQuery();

          if (this.dropdown.isEmpty && query.length >= this.minLength) {
            this.dropdown.update(query);
          } else {
            this.dropdown.moveCursorUp();
          }

          this.dropdown.open();
        },

        _onDownKeyed: function onDownKeyed() {
          var query = this.input.getQuery();

          if (this.dropdown.isEmpty && query.length >= this.minLength) {
            this.dropdown.update(query);
          } else {
            this.dropdown.moveCursorDown();
          }

          this.dropdown.open();
        },

        _onLeftKeyed: function onLeftKeyed() {
          if (this.dir === 'rtl') {
            this._autocomplete();
          }
        },

        _onRightKeyed: function onRightKeyed() {
          if (this.dir === 'ltr') {
            this._autocomplete();
          }
        },

        _onQueryChanged: function onQueryChanged(e, query) {
          this.input.clearHintIfInvalid();

          if (query.length >= this.minLength) {
            this.dropdown.update(query);
          } else {
            this.dropdown.empty();
          }

          this.dropdown.open();
          this._setLanguageDirection();
        },

        _onWhitespaceChanged: function onWhitespaceChanged() {
          this._updateHint();
          this.dropdown.open();
        },

        _setLanguageDirection: function setLanguageDirection() {
          var dir = this.input.getLanguageDirection();

          if (this.dir !== dir) {
            this.dir = dir;
            this.$node.css('direction', dir);
            this.dropdown.setLanguageDirection(dir);
          }
        },

        _updateHint: function updateHint() {
          var datum;
          var val;
          var query;
          var escapedQuery;
          var frontMatchRegEx;
          var match;

          datum = this.dropdown.getDatumForTopSuggestion();

          if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
            val = this.input.getInputValue();
            query = Input.normalizeQuery(val);
            escapedQuery = _.escapeRegExChars(query);

            // match input value, then capture trailing text
            frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
            match = frontMatchRegEx.exec(datum.value);

            // clear hint if there's no trailing text
            if (match) {
              this.input.setHint(val + match[1]);
            } else {
              this.input.clearHint();
            }
          } else {
            this.input.clearHint();
          }
        },

        _autocomplete: function autocomplete(laxCursor) {
          var hint;
          var query;
          var isCursorAtEnd;
          var datum;

          hint = this.input.getHint();
          query = this.input.getQuery();
          isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();

          if (hint && query !== hint && isCursorAtEnd) {
            datum = this.dropdown.getDatumForTopSuggestion();
            if (datum) {
              this.input.setInputValue(datum.value);
            }

            this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
          }
        },

        _select: function select(datum, context) {
          if (typeof datum.value !== 'undefined') {
            this.input.setQuery(datum.value);
          }
          if (this.clearOnSelected) {
            this.setVal('');
          } else {
            this.input.setInputValue(datum.value, true);
          }

          this._setLanguageDirection();

          var event = this.eventBus.trigger('selected', datum.raw, datum.datasetName, context);
          if (event.isDefaultPrevented() === false) {
            this.dropdown.close();

            // #118: allow click event to bubble up to the body before removing
            // the suggestions otherwise we break event delegation
            _.defer(_.bind(this.dropdown.empty, this.dropdown));
          }
        },

        // ### public

        open: function open() {
          // if the menu is not activated yet, we need to update
          // the underlying dropdown menu to trigger the search
          // otherwise we're not gonna see anything
          if (!this.isActivated) {
            var query = this.input.getInputValue();
            if (query.length >= this.minLength) {
              this.dropdown.update(query);
            } else {
              this.dropdown.empty();
            }
          }
          this.dropdown.open();
        },

        close: function close() {
          this.dropdown.close();
        },

        setVal: function setVal(val) {
          // expect val to be a string, so be safe, and coerce
          val = _.toStr(val);

          if (this.isActivated) {
            this.input.setInputValue(val);
          } else {
            this.input.setQuery(val);
            this.input.setInputValue(val, true);
          }

          this._setLanguageDirection();
        },

        getVal: function getVal() {
          return this.input.getQuery();
        },

        destroy: function destroy() {
          this.input.destroy();
          this.dropdown.destroy();

          destroyDomStructure(this.$node, this.cssClasses);

          this.$node = null;
        },

        getWrapper: function getWrapper() {
          return this.dropdown.$container[0];
        }
      });

      function buildDom(options) {
        var $input;
        var $wrapper;
        var $dropdown;
        var $hint;

        $input = DOM.element(options.input);
        $wrapper = DOM
          .element(html.wrapper.replace('%ROOT%', options.cssClasses.root))
          .css(options.css.wrapper);

        // override the display property with the table-cell value
        // if the parent element is a table and the original input was a block
        //  -> https://github.com/algolia/autocomplete.js/issues/16
        if (!options.appendTo && $input.css('display') === 'block' && $input.parent().css('display') === 'table') {
          $wrapper.css('display', 'table-cell');
        }
        var dropdownHtml = html.dropdown.
          replace('%PREFIX%', options.cssClasses.prefix).
          replace('%DROPDOWN_MENU%', options.cssClasses.dropdownMenu);
        $dropdown = DOM.element(dropdownHtml)
          .css(options.css.dropdown)
          .attr({
            role: 'listbox',
            id: options.listboxId
          });
        if (options.templates && options.templates.dropdownMenu) {
          $dropdown.html(_.templatify(options.templates.dropdownMenu)());
        }
        $hint = $input.clone().css(options.css.hint).css(getBackgroundStyles($input));

        $hint
          .val('')
          .addClass(_.className(options.cssClasses.prefix, options.cssClasses.hint, true))
          .removeAttr('id name placeholder required')
          .prop('readonly', true)
          .attr({
            'aria-hidden': 'true',
            autocomplete: 'off',
            spellcheck: 'false',
            tabindex: -1
          });
        if ($hint.removeData) {
          $hint.removeData();
        }

        // store the original values of the attrs that get modified
        // so modifications can be reverted on destroy
        $input.data(attrsKey, {
          'aria-autocomplete': $input.attr('aria-autocomplete'),
          'aria-expanded': $input.attr('aria-expanded'),
          'aria-owns': $input.attr('aria-owns'),
          autocomplete: $input.attr('autocomplete'),
          dir: $input.attr('dir'),
          role: $input.attr('role'),
          spellcheck: $input.attr('spellcheck'),
          style: $input.attr('style'),
          type: $input.attr('type')
        });

        $input
          .addClass(_.className(options.cssClasses.prefix, options.cssClasses.input, true))
          .attr({
            autocomplete: 'off',
            spellcheck: false,

            // Accessibility features
            // Give the field a presentation of a "select".
            // Combobox is the combined presentation of a single line textfield
            // with a listbox popup.
            // https://www.w3.org/WAI/PF/aria/roles#combobox
            role: 'combobox',
            // Let the screen reader know the field has an autocomplete
            // feature to it.
            'aria-autocomplete': (options.datasets &&
              options.datasets[0] && options.datasets[0].displayKey ? 'both' : 'list'),
            // Indicates whether the dropdown it controls is currently expanded or collapsed
            'aria-expanded': 'false',
            'aria-label': options.ariaLabel,
            // Explicitly point to the listbox,
            // which is a list of suggestions (aka options)
            'aria-owns': options.listboxId
          })
          .css(options.hint ? options.css.input : options.css.inputWithNoHint);

        // ie7 does not like it when dir is set to auto
        try {
          if (!$input.attr('dir')) {
            $input.attr('dir', 'auto');
          }
        } catch (e) {
          // ignore
        }

        $wrapper = options.appendTo
          ? $wrapper.appendTo(DOM.element(options.appendTo).eq(0)).eq(0)
          : $input.wrap($wrapper).parent();

        $wrapper
          .prepend(options.hint ? $hint : null)
          .append($dropdown);

        return {
          wrapper: $wrapper,
          input: $input,
          hint: $hint,
          menu: $dropdown
        };
      }

      function getBackgroundStyles($el) {
        return {
          backgroundAttachment: $el.css('background-attachment'),
          backgroundClip: $el.css('background-clip'),
          backgroundColor: $el.css('background-color'),
          backgroundImage: $el.css('background-image'),
          backgroundOrigin: $el.css('background-origin'),
          backgroundPosition: $el.css('background-position'),
          backgroundRepeat: $el.css('background-repeat'),
          backgroundSize: $el.css('background-size')
        };
      }

      function destroyDomStructure($node, cssClasses) {
        var $input = $node.find(_.className(cssClasses.prefix, cssClasses.input));

        // need to remove attrs that weren't previously defined and
        // revert attrs that originally had a value
        _.each($input.data(attrsKey), function (val, key) {
          if (val === undefined) {
            $input.removeAttr(key);
          } else {
            $input.attr(key, val);
          }
        });

        $input
          .detach()
          .removeClass(_.className(cssClasses.prefix, cssClasses.input, true))
          .insertAfter($node);
        if ($input.removeData) {
          $input.removeData(attrsKey);
        }

        $node.remove();
      }

      Typeahead.Dropdown = Dropdown;
      Typeahead.Input = Input;
      Typeahead.sources = __webpack_require__(/*! ../sources/index.js */ "./node_modules/autocomplete.js/src/sources/index.js");

      module.exports = Typeahead;


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/common/dom.js":
/*!********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/dom.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = {
        element: null
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js":
/*!******************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = function parseAlgoliaClientVersion(agent) {
        var parsed =
          // User agent for algoliasearch >= 3.33.0
          agent.match(/Algolia for JavaScript \((\d+\.)(\d+\.)(\d+)\)/) ||
          // User agent for algoliasearch < 3.33.0
          agent.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);

        if (parsed) {
          return [parsed[1], parsed[2], parsed[3]];
        }

        return undefined;
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/common/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var DOM = __webpack_require__(/*! ./dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

      function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }

      module.exports = {
        // those methods are implemented differently
        // depending on which build it is, using
        // $... or angular... or Zepto... or require(...)
        isArray: null,
        isFunction: null,
        isObject: null,
        bind: null,
        each: null,
        map: null,
        mixin: null,

        isMsie: function (agentString) {
          if (agentString === undefined) { agentString = navigator.userAgent; }
          // from https://github.com/ded/bowser/blob/master/bowser.js
          if ((/(msie|trident)/i).test(agentString)) {
            var match = agentString.match(/(msie |rv:)(\d+(.\d+)?)/i);
            if (match) { return match[2]; }
          }
          return false;
        },

        // http://stackoverflow.com/a/6969486
        escapeRegExChars: function (str) {
          return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        },

        isNumber: function (obj) { return typeof obj === 'number'; },

        toStr: function toStr(s) {
          return s === undefined || s === null ? '' : s + '';
        },

        cloneDeep: function cloneDeep(obj) {
          var clone = this.mixin({}, obj);
          var self = this;
          this.each(clone, function (value, key) {
            if (value) {
              if (self.isArray(value)) {
                clone[key] = [].concat(value);
              } else if (self.isObject(value)) {
                clone[key] = self.cloneDeep(value);
              }
            }
          });
          return clone;
        },

        error: function (msg) {
          throw new Error(msg);
        },

        every: function (obj, test) {
          var result = true;
          if (!obj) {
            return result;
          }
          this.each(obj, function (val, key) {
            if (result) {
              result = test.call(null, val, key, obj) && result;
            }
          });
          return !!result;
        },

        any: function (obj, test) {
          var found = false;
          if (!obj) {
            return found;
          }
          this.each(obj, function (val, key) {
            if (test.call(null, val, key, obj)) {
              found = true;
              return false;
            }
          });
          return found;
        },

        getUniqueId: (function () {
          var counter = 0;
          return function () { return counter++; };
        })(),

        templatify: function templatify(obj) {
          if (this.isFunction(obj)) {
            return obj;
          }
          var $template = DOM.element(obj);
          if ($template.prop('tagName') === 'SCRIPT') {
            return function template() { return $template.text(); };
          }
          return function template() { return String(obj); };
        },

        defer: function (fn) { setTimeout(fn, 0); },

        noop: function () { },

        formatPrefix: function (prefix, noPrefix) {
          return noPrefix ? '' : prefix + '-';
        },

        className: function (prefix, clazz, skipDot) {
          return (skipDot ? '' : '.') + prefix + clazz;
        },

        escapeHighlightedString: function (str, highlightPreTag, highlightPostTag) {
          highlightPreTag = highlightPreTag || '<em>';
          var pre = document.createElement('div');
          pre.appendChild(document.createTextNode(highlightPreTag));

          highlightPostTag = highlightPostTag || '</em>';
          var post = document.createElement('div');
          post.appendChild(document.createTextNode(highlightPostTag));

          var div = document.createElement('div');
          div.appendChild(document.createTextNode(str));
          return div.innerHTML
            .replace(RegExp(escapeRegExp(pre.innerHTML), 'g'), highlightPreTag)
            .replace(RegExp(escapeRegExp(post.innerHTML), 'g'), highlightPostTag);
        }
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/sources/hits.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/hits.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
      var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

      module.exports = function search(index, params) {
        var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
        if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
          params = params || {};
          params.additionalUA = 'autocomplete.js ' + version;
        }
        return sourceFn;

        function sourceFn(query, cb) {
          index.search(query, params, function (error, content) {
            if (error) {
              _.error(error.message);
              return;
            }
            cb(content.hits, content);
          });
        }
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/sources/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      module.exports = {
        hits: __webpack_require__(/*! ./hits.js */ "./node_modules/autocomplete.js/src/sources/hits.js"),
        popularIn: __webpack_require__(/*! ./popularIn.js */ "./node_modules/autocomplete.js/src/sources/popularIn.js")
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/sources/popularIn.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/popularIn.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
      var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

      module.exports = function popularIn(index, params, details, options) {
        var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
        if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
          params = params || {};
          params.additionalUA = 'autocomplete.js ' + version;
        }
        if (!details.source) {
          return _.error("Missing 'source' key");
        }
        var source = _.isFunction(details.source) ? details.source : function (hit) { return hit[details.source]; };

        if (!details.index) {
          return _.error("Missing 'index' key");
        }
        var detailsIndex = details.index;

        options = options || {};

        return sourceFn;

        function sourceFn(query, cb) {
          index.search(query, params, function (error, content) {
            if (error) {
              _.error(error.message);
              return;
            }

            if (content.hits.length > 0) {
              var first = content.hits[0];

              var detailsParams = _.mixin({ hitsPerPage: 0 }, details);
              delete detailsParams.source; // not a query parameter
              delete detailsParams.index; // not a query parameter

              var detailsAlgoliaVersion = parseAlgoliaClientVersion(detailsIndex.as._ua);
              if (detailsAlgoliaVersion && detailsAlgoliaVersion[0] >= 3 && detailsAlgoliaVersion[1] > 20) {
                params.additionalUA = 'autocomplete.js ' + version;
              }

              detailsIndex.search(source(first), detailsParams, function (error2, content2) {
                if (error2) {
                  _.error(error2.message);
                  return;
                }

                var suggestions = [];

                // add the 'all department' entry before others
                if (options.includeAll) {
                  var label = options.allTitle || 'All departments';
                  suggestions.push(_.mixin({
                    facet: { value: label, count: content2.nbHits }
                  }, _.cloneDeep(first)));
                }

                // enrich the first hit iterating over the facets
                _.each(content2.facets, function (values, facet) {
                  _.each(values, function (count, value) {
                    suggestions.push(_.mixin({
                      facet: { facet: facet, value: value, count: count }
                    }, _.cloneDeep(first)));
                  });
                });

                // append all other hits
                for (var i = 1; i < content.hits.length; ++i) {
                  suggestions.push(content.hits[i]);
                }

                cb(suggestions, content);
              });

              return;
            }

            cb([]);
          });
        }
      };


      /***/
}),

/***/ "./node_modules/autocomplete.js/src/standalone/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/standalone/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      // this will inject Zepto in window, unfortunately no easy commonJS zepto build
      var zepto = __webpack_require__(/*! ../../zepto.js */ "./node_modules/autocomplete.js/zepto.js");

      // setup DOM element
      var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
      DOM.element = zepto;

      // setup utils functions
      var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
      _.isArray = zepto.isArray;
      _.isFunction = zepto.isFunction;
      _.isObject = zepto.isPlainObject;
      _.bind = zepto.proxy;
      _.each = function (collection, cb) {
        // stupid argument order for jQuery.each
        zepto.each(collection, reverseArgs);
        function reverseArgs(index, value) {
          return cb(value, index);
        }
      };
      _.map = zepto.map;
      _.mixin = zepto.extend;
      _.Event = zepto.Event;

      var typeaheadKey = 'aaAutocomplete';
      var Typeahead = __webpack_require__(/*! ../autocomplete/typeahead.js */ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js");
      var EventBus = __webpack_require__(/*! ../autocomplete/event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");

      function autocomplete(selector, options, datasets, typeaheadObject) {
        datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 2);

        var inputs = zepto(selector).each(function (i, input) {
          var $input = zepto(input);
          var eventBus = new EventBus({ el: $input });
          var typeahead = typeaheadObject || new Typeahead({
            input: $input,
            eventBus: eventBus,
            dropdownMenuContainer: options.dropdownMenuContainer,
            hint: options.hint === undefined ? true : !!options.hint,
            minLength: options.minLength,
            autoselect: options.autoselect,
            autoselectOnBlur: options.autoselectOnBlur,
            tabAutocomplete: options.tabAutocomplete,
            openOnFocus: options.openOnFocus,
            templates: options.templates,
            debug: options.debug,
            clearOnSelected: options.clearOnSelected,
            cssClasses: options.cssClasses,
            datasets: datasets,
            keyboardShortcuts: options.keyboardShortcuts,
            appendTo: options.appendTo,
            autoWidth: options.autoWidth,
            ariaLabel: options.ariaLabel || input.getAttribute('aria-label')
          });
          $input.data(typeaheadKey, typeahead);
        });

        // expose all methods in the `autocomplete` attribute
        inputs.autocomplete = {};
        _.each(['open', 'close', 'getVal', 'setVal', 'destroy', 'getWrapper'], function (method) {
          inputs.autocomplete[method] = function () {
            var methodArguments = arguments;
            var result;
            inputs.each(function (j, input) {
              var typeahead = zepto(input).data(typeaheadKey);
              result = typeahead[method].apply(typeahead, methodArguments);
            });
            return result;
          };
        });

        return inputs;
      }

      autocomplete.sources = Typeahead.sources;
      autocomplete.escapeHighlightedString = _.escapeHighlightedString;

      var wasAutocompleteSet = 'autocomplete' in window;
      var oldAutocomplete = window.autocomplete;
      autocomplete.noConflict = function noConflict() {
        if (wasAutocompleteSet) {
          window.autocomplete = oldAutocomplete;
        } else {
          delete window.autocomplete;
        }
        return autocomplete;
      };

      module.exports = autocomplete;


      /***/
}),

/***/ "./node_modules/autocomplete.js/version.js":
/*!*************************************************!*\
  !*** ./node_modules/autocomplete.js/version.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "0.37.1";


      /***/
}),

/***/ "./node_modules/autocomplete.js/zepto.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/zepto.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      /* istanbul ignore next */
      /* Zepto v1.2.0 - zepto event assets data - zeptojs.com/license */
      (function (global, factory) {
        module.exports = factory(global);
      }(/* this ##### UPDATED: here we want to use window/global instead of this which is the current file context ##### */ window, function (window) {
        var Zepto = (function () {
          var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
            document = window.document,
            elementDisplay = {}, classCache = {},
            cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
            fragmentRE = /^\s*<(\w+|!)[^>]*>/,
            singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            rootNodeRE = /^(?:body|html)$/i,
            capitalRE = /([A-Z])/g,

            // special attributes that should be get/set via method calls
            methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

            adjacencyOperators = ['after', 'prepend', 'before', 'append'],
            table = document.createElement('table'),
            tableRow = document.createElement('tr'),
            containers = {
              'tr': document.createElement('tbody'),
              'tbody': table, 'thead': table, 'tfoot': table,
              'td': tableRow, 'th': tableRow,
              '*': document.createElement('div')
            },
            readyRE = /complete|loaded|interactive/,
            simpleSelectorRE = /^[\w-]*$/,
            class2type = {},
            toString = class2type.toString,
            zepto = {},
            camelize, uniq,
            tempParent = document.createElement('div'),
            propMap = {
              'tabindex': 'tabIndex',
              'readonly': 'readOnly',
              'for': 'htmlFor',
              'class': 'className',
              'maxlength': 'maxLength',
              'cellspacing': 'cellSpacing',
              'cellpadding': 'cellPadding',
              'rowspan': 'rowSpan',
              'colspan': 'colSpan',
              'usemap': 'useMap',
              'frameborder': 'frameBorder',
              'contenteditable': 'contentEditable'
            },
            isArray = Array.isArray ||
              function (object) { return object instanceof Array }

          zepto.matches = function (element, selector) {
            if (!selector || !element || element.nodeType !== 1) return false
            var matchesSelector = element.matches || element.webkitMatchesSelector ||
              element.mozMatchesSelector || element.oMatchesSelector ||
              element.matchesSelector
            if (matchesSelector) return matchesSelector.call(element, selector)
            // fall back to performing a selector:
            var match, parent = element.parentNode, temp = !parent
            if (temp) (parent = tempParent).appendChild(element)
            match = ~zepto.qsa(parent, selector).indexOf(element)
            temp && tempParent.removeChild(element)
            return match
          }

          function type(obj) {
            return obj == null ? String(obj) :
              class2type[toString.call(obj)] || "object"
          }

          function isFunction(value) { return type(value) == "function" }
          function isWindow(obj) { return obj != null && obj == obj.window }
          function isDocument(obj) { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
          function isObject(obj) { return type(obj) == "object" }
          function isPlainObject(obj) {
            return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
          }

          function likeArray(obj) {
            var length = !!obj && 'length' in obj && obj.length,
              type = $.type(obj)

            return 'function' != type && !isWindow(obj) && (
              'array' == type || length === 0 ||
              (typeof length == 'number' && length > 0 && (length - 1) in obj)
            )
          }

          function compact(array) { return filter.call(array, function (item) { return item != null }) }
          function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
          camelize = function (str) { return str.replace(/-+(.)?/g, function (match, chr) { return chr ? chr.toUpperCase() : '' }) }
          function dasherize(str) {
            return str.replace(/::/g, '/')
              .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
              .replace(/([a-z\d])([A-Z])/g, '$1_$2')
              .replace(/_/g, '-')
              .toLowerCase()
          }
          uniq = function (array) { return filter.call(array, function (item, idx) { return array.indexOf(item) == idx }) }

          function classRE(name) {
            return name in classCache ?
              classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
          }

          function maybeAddPx(name, value) {
            return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
          }

          function defaultDisplay(nodeName) {
            var element, display
            if (!elementDisplay[nodeName]) {
              element = document.createElement(nodeName)
              document.body.appendChild(element)
              display = getComputedStyle(element, '').getPropertyValue("display")
              element.parentNode.removeChild(element)
              display == "none" && (display = "block")
              elementDisplay[nodeName] = display
            }
            return elementDisplay[nodeName]
          }

          function children(element) {
            return 'children' in element ?
              slice.call(element.children) :
              $.map(element.childNodes, function (node) { if (node.nodeType == 1) return node })
          }

          function Z(dom, selector) {
            var i, len = dom ? dom.length : 0
            for (i = 0; i < len; i++) this[i] = dom[i]
            this.length = len
            this.selector = selector || ''
          }

          // `$.zepto.fragment` takes a html string and an optional tag name
          // to generate DOM nodes from the given html string.
          // The generated DOM nodes are returned as an array.
          // This function can be overridden in plugins for example to make
          // it compatible with browsers that don't support the DOM fully.
          zepto.fragment = function (html, name, properties) {
            var dom, nodes, container

            // A special case optimization for a single tag
            if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

            if (!dom) {
              if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
              if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
              if (!(name in containers)) name = '*'

              container = containers[name]
              container.innerHTML = '' + html
              dom = $.each(slice.call(container.childNodes), function () {
                container.removeChild(this)
              })
            }

            if (isPlainObject(properties)) {
              nodes = $(dom)
              $.each(properties, function (key, value) {
                if (methodAttributes.indexOf(key) > -1) nodes[key](value)
                else nodes.attr(key, value)
              })
            }

            return dom
          }

          // `$.zepto.Z` swaps out the prototype of the given `dom` array
          // of nodes with `$.fn` and thus supplying all the Zepto functions
          // to the array. This method can be overridden in plugins.
          zepto.Z = function (dom, selector) {
            return new Z(dom, selector)
          }

          // `$.zepto.isZ` should return `true` if the given object is a Zepto
          // collection. This method can be overridden in plugins.
          zepto.isZ = function (object) {
            return object instanceof zepto.Z
          }

          // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
          // takes a CSS selector and an optional context (and handles various
          // special cases).
          // This method can be overridden in plugins.
          zepto.init = function (selector, context) {
            var dom
            // If nothing given, return an empty Zepto collection
            if (!selector) return zepto.Z()
            // Optimize for string selectors
            else if (typeof selector == 'string') {
              selector = selector.trim()
              // If it's a html fragment, create nodes from it
              // Note: In both Chrome 21 and Firefox 15, DOM error 12
              // is thrown if the fragment doesn't begin with <
              if (selector[0] == '<' && fragmentRE.test(selector))
                dom = zepto.fragment(selector, RegExp.$1, context), selector = null
              // If there's a context, create a collection on that context first, and select
              // nodes from there
              else if (context !== undefined) return $(context).find(selector)
              // If it's a CSS selector, use it to select nodes.
              else dom = zepto.qsa(document, selector)
            }
            // If a function is given, call it when the DOM is ready
            else if (isFunction(selector)) return $(document).ready(selector)
            // If a Zepto collection is given, just return it
            else if (zepto.isZ(selector)) return selector
            else {
              // normalize array if an array of nodes is given
              if (isArray(selector)) dom = compact(selector)
              // Wrap DOM nodes.
              else if (isObject(selector))
                dom = [selector], selector = null
              // If it's a html fragment, create nodes from it
              else if (fragmentRE.test(selector))
                dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
              // If there's a context, create a collection on that context first, and select
              // nodes from there
              else if (context !== undefined) return $(context).find(selector)
              // And last but no least, if it's a CSS selector, use it to select nodes.
              else dom = zepto.qsa(document, selector)
            }
            // create a new Zepto collection from the nodes found
            return zepto.Z(dom, selector)
          }

          // `$` will be the base `Zepto` object. When calling this
          // function just call `$.zepto.init, which makes the implementation
          // details of selecting nodes and creating Zepto collections
          // patchable in plugins.
          $ = function (selector, context) {
            return zepto.init(selector, context)
          }

          function extend(target, source, deep) {
            for (key in source)
              if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                  target[key] = {}
                if (isArray(source[key]) && !isArray(target[key]))
                  target[key] = []
                extend(target[key], source[key], deep)
              }
              else if (source[key] !== undefined) target[key] = source[key]
          }

          // Copy all but undefined properties from one or more
          // objects to the `target` object.
          $.extend = function (target) {
            var deep, args = slice.call(arguments, 1)
            if (typeof target == 'boolean') {
              deep = target
              target = args.shift()
            }
            args.forEach(function (arg) { extend(target, arg, deep) })
            return target
          }

          // `$.zepto.qsa` is Zepto's CSS selector implementation which
          // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
          // This method can be overridden in plugins.
          zepto.qsa = function (element, selector) {
            var found,
              maybeID = selector[0] == '#',
              maybeClass = !maybeID && selector[0] == '.',
              nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
              isSimple = simpleSelectorRE.test(nameOnly)
            return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
              ((found = element.getElementById(nameOnly)) ? [found] : []) :
              (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
                slice.call(
                  isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
                    maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
                      element.getElementsByTagName(selector) : // Or a tag
                    element.querySelectorAll(selector) // Or it's not simple, and we need to query all
                )
          }

          function filtered(nodes, selector) {
            return selector == null ? $(nodes) : $(nodes).filter(selector)
          }

          $.contains = document.documentElement.contains ?
            function (parent, node) {
              return parent !== node && parent.contains(node)
            } :
            function (parent, node) {
              while (node && (node = node.parentNode))
                if (node === parent) return true
              return false
            }

          function funcArg(context, arg, idx, payload) {
            return isFunction(arg) ? arg.call(context, idx, payload) : arg
          }

          function setAttribute(node, name, value) {
            value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
          }

          // access className property while respecting SVGAnimatedString
          function className(node, value) {
            var klass = node.className || '',
              svg = klass && klass.baseVal !== undefined

            if (value === undefined) return svg ? klass.baseVal : klass
            svg ? (klass.baseVal = value) : (node.className = value)
          }

          // "true"  => true
          // "false" => false
          // "null"  => null
          // "42"    => 42
          // "42.5"  => 42.5
          // "08"    => "08"
          // JSON    => parse if valid
          // String  => self
          function deserializeValue(value) {
            try {
              return value ?
                value == "true" ||
                (value == "false" ? false :
                  value == "null" ? null :
                    +value + "" == value ? +value :
                      /^[\[\{]/.test(value) ? $.parseJSON(value) :
                        value)
                : value
            } catch (e) {
              return value
            }
          }

          $.type = type
          $.isFunction = isFunction
          $.isWindow = isWindow
          $.isArray = isArray
          $.isPlainObject = isPlainObject

          $.isEmptyObject = function (obj) {
            var name
            for (name in obj) return false
            return true
          }

          $.isNumeric = function (val) {
            var num = Number(val), type = typeof val
            return val != null && type != 'boolean' &&
              (type != 'string' || val.length) &&
              !isNaN(num) && isFinite(num) || false
          }

          $.inArray = function (elem, array, i) {
            return emptyArray.indexOf.call(array, elem, i)
          }

          $.camelCase = camelize
          $.trim = function (str) {
            return str == null ? "" : String.prototype.trim.call(str)
          }

          // plugin compatibility
          $.uuid = 0
          $.support = {}
          $.expr = {}
          $.noop = function () { }

          $.map = function (elements, callback) {
            var value, values = [], i, key
            if (likeArray(elements))
              for (i = 0; i < elements.length; i++) {
                value = callback(elements[i], i)
                if (value != null) values.push(value)
              }
            else
              for (key in elements) {
                value = callback(elements[key], key)
                if (value != null) values.push(value)
              }
            return flatten(values)
          }

          $.each = function (elements, callback) {
            var i, key
            if (likeArray(elements)) {
              for (i = 0; i < elements.length; i++)
                if (callback.call(elements[i], i, elements[i]) === false) return elements
            } else {
              for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false) return elements
            }

            return elements
          }

          $.grep = function (elements, callback) {
            return filter.call(elements, callback)
          }

          if (window.JSON) $.parseJSON = JSON.parse

          // Populate the class2type map
          $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
          })

          // Define methods that will be available on all
          // Zepto collections
          $.fn = {
            constructor: zepto.Z,
            length: 0,

            // Because a collection acts like an array
            // copy over these useful array functions.
            forEach: emptyArray.forEach,
            reduce: emptyArray.reduce,
            push: emptyArray.push,
            sort: emptyArray.sort,
            splice: emptyArray.splice,
            indexOf: emptyArray.indexOf,
            concat: function () {
              var i, value, args = []
              for (i = 0; i < arguments.length; i++) {
                value = arguments[i]
                args[i] = zepto.isZ(value) ? value.toArray() : value
              }
              return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
            },

            // `map` and `slice` in the jQuery API work differently
            // from their array counterparts
            map: function (fn) {
              return $($.map(this, function (el, i) { return fn.call(el, i, el) }))
            },
            slice: function () {
              return $(slice.apply(this, arguments))
            },

            ready: function (callback) {
              // need to check if document.body exists for IE as that browser reports
              // document ready when it hasn't yet created the body element
              if (readyRE.test(document.readyState) && document.body) callback($)
              else document.addEventListener('DOMContentLoaded', function () { callback($) }, false)
              return this
            },
            get: function (idx) {
              return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
            },
            toArray: function () { return this.get() },
            size: function () {
              return this.length
            },
            remove: function () {
              return this.each(function () {
                if (this.parentNode != null)
                  this.parentNode.removeChild(this)
              })
            },
            each: function (callback) {
              emptyArray.every.call(this, function (el, idx) {
                return callback.call(el, idx, el) !== false
              })
              return this
            },
            filter: function (selector) {
              if (isFunction(selector)) return this.not(this.not(selector))
              return $(filter.call(this, function (element) {
                return zepto.matches(element, selector)
              }))
            },
            add: function (selector, context) {
              return $(uniq(this.concat($(selector, context))))
            },
            is: function (selector) {
              return this.length > 0 && zepto.matches(this[0], selector)
            },
            not: function (selector) {
              var nodes = []
              if (isFunction(selector) && selector.call !== undefined)
                this.each(function (idx) {
                  if (!selector.call(this, idx)) nodes.push(this)
                })
              else {
                var excludes = typeof selector == 'string' ? this.filter(selector) :
                  (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
                this.forEach(function (el) {
                  if (excludes.indexOf(el) < 0) nodes.push(el)
                })
              }
              return $(nodes)
            },
            has: function (selector) {
              return this.filter(function () {
                return isObject(selector) ?
                  $.contains(this, selector) :
                  $(this).find(selector).size()
              })
            },
            eq: function (idx) {
              return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
            },
            first: function () {
              var el = this[0]
              return el && !isObject(el) ? el : $(el)
            },
            last: function () {
              var el = this[this.length - 1]
              return el && !isObject(el) ? el : $(el)
            },
            find: function (selector) {
              var result, $this = this
              if (!selector) result = $()
              else if (typeof selector == 'object')
                result = $(selector).filter(function () {
                  var node = this
                  return emptyArray.some.call($this, function (parent) {
                    return $.contains(parent, node)
                  })
                })
              else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
              else result = this.map(function () { return zepto.qsa(this, selector) })
              return result
            },
            closest: function (selector, context) {
              var nodes = [], collection = typeof selector == 'object' && $(selector)
              this.each(function (_, node) {
                while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
                  node = node !== context && !isDocument(node) && node.parentNode
                if (node && nodes.indexOf(node) < 0) nodes.push(node)
              })
              return $(nodes)
            },
            parents: function (selector) {
              var ancestors = [], nodes = this
              while (nodes.length > 0)
                nodes = $.map(nodes, function (node) {
                  if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
                    ancestors.push(node)
                    return node
                  }
                })
              return filtered(ancestors, selector)
            },
            parent: function (selector) {
              return filtered(uniq(this.pluck('parentNode')), selector)
            },
            children: function (selector) {
              return filtered(this.map(function () { return children(this) }), selector)
            },
            contents: function () {
              return this.map(function () { return this.contentDocument || slice.call(this.childNodes) })
            },
            siblings: function (selector) {
              return filtered(this.map(function (i, el) {
                return filter.call(children(el.parentNode), function (child) { return child !== el })
              }), selector)
            },
            empty: function () {
              return this.each(function () { this.innerHTML = '' })
            },
            // `pluck` is borrowed from Prototype.js
            pluck: function (property) {
              return $.map(this, function (el) { return el[property] })
            },
            show: function () {
              return this.each(function () {
                this.style.display == "none" && (this.style.display = '')
                if (getComputedStyle(this, '').getPropertyValue("display") == "none")
                  this.style.display = defaultDisplay(this.nodeName)
              })
            },
            replaceWith: function (newContent) {
              return this.before(newContent).remove()
            },
            wrap: function (structure) {
              var func = isFunction(structure)
              if (this[0] && !func)
                var dom = $(structure).get(0),
                  clone = dom.parentNode || this.length > 1

              return this.each(function (index) {
                $(this).wrapAll(
                  func ? structure.call(this, index) :
                    clone ? dom.cloneNode(true) : dom
                )
              })
            },
            wrapAll: function (structure) {
              if (this[0]) {
                $(this[0]).before(structure = $(structure))
                var children
                // drill down to the inmost element
                while ((children = structure.children()).length) structure = children.first()
                $(structure).append(this)
              }
              return this
            },
            wrapInner: function (structure) {
              var func = isFunction(structure)
              return this.each(function (index) {
                var self = $(this), contents = self.contents(),
                  dom = func ? structure.call(this, index) : structure
                contents.length ? contents.wrapAll(dom) : self.append(dom)
              })
            },
            unwrap: function () {
              this.parent().each(function () {
                $(this).replaceWith($(this).children())
              })
              return this
            },
            clone: function () {
              return this.map(function () { return this.cloneNode(true) })
            },
            hide: function () {
              return this.css("display", "none")
            },
            toggle: function (setting) {
              return this.each(function () {
                var el = $(this)
                  ; (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
              })
            },
            prev: function (selector) { return $(this.pluck('previousElementSibling')).filter(selector || '*') },
            next: function (selector) { return $(this.pluck('nextElementSibling')).filter(selector || '*') },
            html: function (html) {
              return 0 in arguments ?
                this.each(function (idx) {
                  var originHtml = this.innerHTML
                  $(this).empty().append(funcArg(this, html, idx, originHtml))
                }) :
                (0 in this ? this[0].innerHTML : null)
            },
            text: function (text) {
              return 0 in arguments ?
                this.each(function (idx) {
                  var newText = funcArg(this, text, idx, this.textContent)
                  this.textContent = newText == null ? '' : '' + newText
                }) :
                (0 in this ? this.pluck('textContent').join("") : null)
            },
            attr: function (name, value) {
              var result
              return (typeof name == 'string' && !(1 in arguments)) ?
                (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
                this.each(function (idx) {
                  if (this.nodeType !== 1) return
                  if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
                  else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
                })
            },
            removeAttr: function (name) {
              return this.each(function () {
              this.nodeType === 1 && name.split(' ').forEach(function (attribute) {
                setAttribute(this, attribute)
              }, this)
              })
            },
            prop: function (name, value) {
              name = propMap[name] || name
              return (1 in arguments) ?
                this.each(function (idx) {
                  this[name] = funcArg(this, value, idx, this[name])
                }) :
                (this[0] && this[0][name])
            },
            removeProp: function (name) {
              name = propMap[name] || name
              return this.each(function () { delete this[name] })
            },
            data: function (name, value) {
              var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

              var data = (1 in arguments) ?
                this.attr(attrName, value) :
                this.attr(attrName)

              return data !== null ? deserializeValue(data) : undefined
            },
            val: function (value) {
              if (0 in arguments) {
                if (value == null) value = ""
                return this.each(function (idx) {
                  this.value = funcArg(this, value, idx, this.value)
                })
              } else {
                return this[0] && (this[0].multiple ?
                  $(this[0]).find('option').filter(function () { return this.selected }).pluck('value') :
                  this[0].value)
              }
            },
            offset: function (coordinates) {
              if (coordinates) return this.each(function (index) {
                var $this = $(this),
                  coords = funcArg(this, coordinates, index, $this.offset()),
                  parentOffset = $this.offsetParent().offset(),
                  props = {
                    top: coords.top - parentOffset.top,
                    left: coords.left - parentOffset.left
                  }

                if ($this.css('position') == 'static') props['position'] = 'relative'
                $this.css(props)
              })
              if (!this.length) return null
              if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
                return { top: 0, left: 0 }
              var obj = this[0].getBoundingClientRect()
              return {
                left: obj.left + window.pageXOffset,
                top: obj.top + window.pageYOffset,
                width: Math.round(obj.width),
                height: Math.round(obj.height)
              }
            },
            css: function (property, value) {
              if (arguments.length < 2) {
                var element = this[0]
                if (typeof property == 'string') {
                  if (!element) return
                  return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
                } else if (isArray(property)) {
                  if (!element) return
                  var props = {}
                  var computedStyle = getComputedStyle(element, '')
                  $.each(property, function (_, prop) {
                    props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
                  })
                  return props
                }
              }

              var css = ''
              if (type(property) == 'string') {
                if (!value && value !== 0)
                  this.each(function () { this.style.removeProperty(dasherize(property)) })
                else
                  css = dasherize(property) + ":" + maybeAddPx(property, value)
              } else {
                for (key in property)
                  if (!property[key] && property[key] !== 0)
                    this.each(function () { this.style.removeProperty(dasherize(key)) })
                  else
                    css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
              }

              return this.each(function () { this.style.cssText += ';' + css })
            },
            index: function (element) {
              return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function (name) {
              if (!name) return false
              return emptyArray.some.call(this, function (el) {
                return this.test(className(el))
              }, classRE(name))
            },
            addClass: function (name) {
              if (!name) return this
              return this.each(function (idx) {
                if (!('className' in this)) return
                classList = []
                var cls = className(this), newName = funcArg(this, name, idx, cls)
                newName.split(/\s+/g).forEach(function (klass) {
                  if (!$(this).hasClass(klass)) classList.push(klass)
                }, this)
                classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
              })
            },
            removeClass: function (name) {
              return this.each(function (idx) {
                if (!('className' in this)) return
                if (name === undefined) return className(this, '')
                classList = className(this)
                funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
                  classList = classList.replace(classRE(klass), " ")
                })
                className(this, classList.trim())
              })
            },
            toggleClass: function (name, when) {
              if (!name) return this
              return this.each(function (idx) {
                var $this = $(this), names = funcArg(this, name, idx, className(this))
                names.split(/\s+/g).forEach(function (klass) {
                  (when === undefined ? !$this.hasClass(klass) : when) ?
                    $this.addClass(klass) : $this.removeClass(klass)
                })
              })
            },
            scrollTop: function (value) {
              if (!this.length) return
              var hasScrollTop = 'scrollTop' in this[0]
              if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
              return this.each(hasScrollTop ?
                function () { this.scrollTop = value } :
                function () { this.scrollTo(this.scrollX, value) })
            },
            scrollLeft: function (value) {
              if (!this.length) return
              var hasScrollLeft = 'scrollLeft' in this[0]
              if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
              return this.each(hasScrollLeft ?
                function () { this.scrollLeft = value } :
                function () { this.scrollTo(value, this.scrollY) })
            },
            position: function () {
              if (!this.length) return

              var elem = this[0],
                // Get *real* offsetParent
                offsetParent = this.offsetParent(),
                // Get correct offsets
                offset = this.offset(),
                parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

              // Subtract element margins
              // note: when an element has margin: auto the offsetLeft and marginLeft
              // are the same in Safari causing offset.left to incorrectly be 0
              offset.top -= parseFloat($(elem).css('margin-top')) || 0
              offset.left -= parseFloat($(elem).css('margin-left')) || 0

              // Add offsetParent borders
              parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0
              parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0

              // Subtract the two offsets
              return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
              }
            },
            offsetParent: function () {
              return this.map(function () {
                var parent = this.offsetParent || document.body
                while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
                  parent = parent.offsetParent
                return parent
              })
            }
          }

          // for now
          $.fn.detach = $.fn.remove

            // Generate the `width` and `height` functions
            ;['width', 'height'].forEach(function (dimension) {
              var dimensionProperty =
                dimension.replace(/./, function (m) { return m[0].toUpperCase() })

              $.fn[dimension] = function (value) {
                var offset, el = this[0]
                if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
                  isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
                    (offset = this.offset()) && offset[dimension]
                else return this.each(function (idx) {
                  el = $(this)
                  el.css(dimension, funcArg(this, value, idx, el[dimension]()))
                })
              }
            })

          function traverseNode(node, fun) {
            fun(node)
            for (var i = 0, len = node.childNodes.length; i < len; i++)
              traverseNode(node.childNodes[i], fun)
          }

          // Generate the `after`, `prepend`, `before`, `append`,
          // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
          adjacencyOperators.forEach(function (operator, operatorIndex) {
            var inside = operatorIndex % 2 //=> prepend, append

            $.fn[operator] = function () {
              // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
              var argType, nodes = $.map(arguments, function (arg) {
                var arr = []
                argType = type(arg)
                if (argType == "array") {
                  arg.forEach(function (el) {
                    if (el.nodeType !== undefined) return arr.push(el)
                    else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                    arr = arr.concat(zepto.fragment(el))
                  })
                  return arr
                }
                return argType == "object" || arg == null ?
                  arg : zepto.fragment(arg)
              }),
                parent, copyByClone = this.length > 1
              if (nodes.length < 1) return this

              return this.each(function (_, target) {
                parent = inside ? target : target.parentNode

                // convert all methods to a "before" operation
                target = operatorIndex == 0 ? target.nextSibling :
                  operatorIndex == 1 ? target.firstChild :
                    operatorIndex == 2 ? target :
                      null

                var parentInDocument = $.contains(document.documentElement, parent)

                nodes.forEach(function (node) {
                  if (copyByClone) node = node.cloneNode(true)
                  else if (!parent) return $(node).remove()

                  parent.insertBefore(node, target)
                  if (parentInDocument) traverseNode(node, function (el) {
                    if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
                      (!el.type || el.type === 'text/javascript') && !el.src) {
                      var target = el.ownerDocument ? el.ownerDocument.defaultView : window
                      target['eval'].call(target, el.innerHTML)
                    }
                  })
                })
              })
            }

            // after    => insertAfter
            // prepend  => prependTo
            // before   => insertBefore
            // append   => appendTo
            $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
              $(html)[operator](this)
              return this
            }
          })

          zepto.Z.prototype = Z.prototype = $.fn

          // Export internal API functions in the `$.zepto` namespace
          zepto.uniq = uniq
          zepto.deserializeValue = deserializeValue
          $.zepto = zepto

          return $
        })()

          ; (function ($) {
            var _zid = 1, undefined,
              slice = Array.prototype.slice,
              isFunction = $.isFunction,
              isString = function (obj) { return typeof obj == 'string' },
              handlers = {},
              specialEvents = {},
              focusinSupported = 'onfocusin' in window,
              focus = { focus: 'focusin', blur: 'focusout' },
              hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

            specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

            function zid(element) {
              return element._zid || (element._zid = _zid++)
            }
            function findHandlers(element, event, fn, selector) {
              event = parse(event)
              if (event.ns) var matcher = matcherFor(event.ns)
              return (handlers[zid(element)] || []).filter(function (handler) {
                return handler
                  && (!event.e || handler.e == event.e)
                  && (!event.ns || matcher.test(handler.ns))
                  && (!fn || zid(handler.fn) === zid(fn))
                  && (!selector || handler.sel == selector)
              })
            }
            function parse(event) {
              var parts = ('' + event).split('.')
              return { e: parts[0], ns: parts.slice(1).sort().join(' ') }
            }
            function matcherFor(ns) {
              return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
            }

            function eventCapture(handler, captureSetting) {
              return handler.del &&
                (!focusinSupported && (handler.e in focus)) ||
                !!captureSetting
            }

            function realEvent(type) {
              return hover[type] || (focusinSupported && focus[type]) || type
            }

            function add(element, events, fn, data, selector, delegator, capture) {
              var id = zid(element), set = (handlers[id] || (handlers[id] = []))
              events.split(/\s/).forEach(function (event) {
                if (event == 'ready') return $(document).ready(fn)
                var handler = parse(event)
                handler.fn = fn
                handler.sel = selector
                // emulate mouseenter, mouseleave
                if (handler.e in hover) fn = function (e) {
                  var related = e.relatedTarget
                  if (!related || (related !== this && !$.contains(this, related)))
                    return handler.fn.apply(this, arguments)
                }
                handler.del = delegator
                var callback = delegator || fn
                handler.proxy = function (e) {
                  e = compatible(e)
                  if (e.isImmediatePropagationStopped()) return
                  try {
                    var dataPropDescriptor = Object.getOwnPropertyDescriptor(e, 'data')
                    if (!dataPropDescriptor || dataPropDescriptor.writable)
                      e.data = data
                  } catch (e) { } // when using strict mode dataPropDescriptor will be undefined when e is InputEvent (even though data property exists). So we surround with try/catch
                  var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
                  if (result === false) e.preventDefault(), e.stopPropagation()
                  return result
                }
                handler.i = set.length
                set.push(handler)
                if ('addEventListener' in element)
                  element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
              })
            }
            function remove(element, events, fn, selector, capture) {
              var id = zid(element)
                ; (events || '').split(/\s/).forEach(function (event) {
                  findHandlers(element, event, fn, selector).forEach(function (handler) {
                    delete handlers[id][handler.i]
                    if ('removeEventListener' in element)
                      element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
                  })
                })
            }

            $.event = { add: add, remove: remove }

            $.proxy = function (fn, context) {
              var args = (2 in arguments) && slice.call(arguments, 2)
              if (isFunction(fn)) {
                var proxyFn = function () { return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
                proxyFn._zid = zid(fn)
                return proxyFn
              } else if (isString(context)) {
                if (args) {
                  args.unshift(fn[context], fn)
                  return $.proxy.apply(null, args)
                } else {
                  return $.proxy(fn[context], fn)
                }
              } else {
                throw new TypeError("expected function")
              }
            }

            $.fn.bind = function (event, data, callback) {
              return this.on(event, data, callback)
            }
            $.fn.unbind = function (event, callback) {
              return this.off(event, callback)
            }
            $.fn.one = function (event, selector, data, callback) {
              return this.on(event, selector, data, callback, 1)
            }

            var returnTrue = function () { return true },
              returnFalse = function () { return false },
              ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
              eventMethods = {
                preventDefault: 'isDefaultPrevented',
                stopImmediatePropagation: 'isImmediatePropagationStopped',
                stopPropagation: 'isPropagationStopped'
              }

            function compatible(event, source) {
              if (source || !event.isDefaultPrevented) {
                source || (source = event)

                $.each(eventMethods, function (name, predicate) {
                  var sourceMethod = source[name]
                  event[name] = function () {
                    this[predicate] = returnTrue
                    return sourceMethod && sourceMethod.apply(source, arguments)
                  }
                  event[predicate] = returnFalse
                })

                try {
                  event.timeStamp || (event.timeStamp = Date.now())
                } catch (ignored) { }

                if (source.defaultPrevented !== undefined ? source.defaultPrevented :
                  'returnValue' in source ? source.returnValue === false :
                    source.getPreventDefault && source.getPreventDefault())
                  event.isDefaultPrevented = returnTrue
              }
              return event
            }

            function createProxy(event) {
              var key, proxy = { originalEvent: event }
              for (key in event)
                if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

              return compatible(proxy, event)
            }

            $.fn.delegate = function (selector, event, callback) {
              return this.on(event, selector, callback)
            }
            $.fn.undelegate = function (selector, event, callback) {
              return this.off(event, selector, callback)
            }

            $.fn.live = function (event, callback) {
              $(document.body).delegate(this.selector, event, callback)
              return this
            }
            $.fn.die = function (event, callback) {
              $(document.body).undelegate(this.selector, event, callback)
              return this
            }

            $.fn.on = function (event, selector, data, callback, one) {
              var autoRemove, delegator, $this = this
              if (event && !isString(event)) {
                $.each(event, function (type, fn) {
                  $this.on(type, selector, data, fn, one)
                })
                return $this
              }

              if (!isString(selector) && !isFunction(callback) && callback !== false)
                callback = data, data = selector, selector = undefined
              if (callback === undefined || data === false)
                callback = data, data = undefined

              if (callback === false) callback = returnFalse

              return $this.each(function (_, element) {
                if (one) autoRemove = function (e) {
                  remove(element, e.type, callback)
                  return callback.apply(this, arguments)
                }

                if (selector) delegator = function (e) {
                  var evt, match = $(e.target).closest(selector, element).get(0)
                  if (match && match !== element) {
                    evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element })
                    return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
                  }
                }

                add(element, event, callback, data, selector, delegator || autoRemove)
              })
            }
            $.fn.off = function (event, selector, callback) {
              var $this = this
              if (event && !isString(event)) {
                $.each(event, function (type, fn) {
                  $this.off(type, selector, fn)
                })
                return $this
              }

              if (!isString(selector) && !isFunction(callback) && callback !== false)
                callback = selector, selector = undefined

              if (callback === false) callback = returnFalse

              return $this.each(function () {
                remove(this, event, callback, selector)
              })
            }

            $.fn.trigger = function (event, args) {
              event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
              event._args = args
              return this.each(function () {
                // handle focus(), blur() by calling them directly
                if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
                // items in the collection might not be DOM elements
                else if ('dispatchEvent' in this) this.dispatchEvent(event)
                else $(this).triggerHandler(event, args)
              })
            }

            // triggers event handlers on current element just as if an event occurred,
            // doesn't trigger an actual event, doesn't bubble
            $.fn.triggerHandler = function (event, args) {
              var e, result
              this.each(function (i, element) {
                e = createProxy(isString(event) ? $.Event(event) : event)
                e._args = args
                e.target = element
                $.each(findHandlers(element, event.type || event), function (i, handler) {
                  result = handler.proxy(e)
                  if (e.isImmediatePropagationStopped()) return false
                })
              })
              return result
            }

              // shortcut methods for `.bind(event, fn)` for each event type
              ; ('focusin focusout focus blur load resize scroll unload click dblclick ' +
                'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
                'change select keydown keypress keyup error').split(' ').forEach(function (event) {
                  $.fn[event] = function (callback) {
                    return (0 in arguments) ?
                      this.bind(event, callback) :
                      this.trigger(event)
                  }
                })

            $.Event = function (type, props) {
              if (!isString(type)) props = type, type = props.type
              var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
              if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
              event.initEvent(type, bubbles, true)
              return compatible(event)
            }

          })(Zepto)

          ; (function ($) {
            var cache = [], timeout

            $.fn.remove = function () {
              return this.each(function () {
                if (this.parentNode) {
                  if (this.tagName === 'IMG') {
                    cache.push(this)
                    this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
                    if (timeout) clearTimeout(timeout)
                    timeout = setTimeout(function () { cache = [] }, 60000)
                  }
                  this.parentNode.removeChild(this)
                }
              })
            }
          })(Zepto)

          ; (function ($) {
            var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
              exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

            // Get value from node:
            // 1. first try key as given,
            // 2. then try camelized key,
            // 3. fall back to reading "data-*" attribute.
            function getData(node, name) {
              var id = node[exp], store = id && data[id]
              if (name === undefined) return store || setData(node)
              else {
                if (store) {
                  if (name in store) return store[name]
                  var camelName = camelize(name)
                  if (camelName in store) return store[camelName]
                }
                return dataAttr.call($(node), name)
              }
            }

            // Store value under camelized key on node
            function setData(node, name, value) {
              var id = node[exp] || (node[exp] = ++$.uuid),
                store = data[id] || (data[id] = attributeData(node))
              if (name !== undefined) store[camelize(name)] = value
              return store
            }

            // Read all "data-*" attributes from a node
            function attributeData(node) {
              var store = {}
              $.each(node.attributes || emptyArray, function (i, attr) {
                if (attr.name.indexOf('data-') == 0)
                  store[camelize(attr.name.replace('data-', ''))] =
                    $.zepto.deserializeValue(attr.value)
              })
              return store
            }

            $.fn.data = function (name, value) {
              return value === undefined ?
                // set multiple values via object
                $.isPlainObject(name) ?
                  this.each(function (i, node) {
                    $.each(name, function (key, value) { setData(node, key, value) })
                  }) :
                  // get value from first element
                  (0 in this ? getData(this[0], name) : undefined) :
                // set value on all elements
                this.each(function () { setData(this, name, value) })
            }

            $.data = function (elem, name, value) {
              return $(elem).data(name, value)
            }

            $.hasData = function (elem) {
              var id = elem[exp], store = id && data[id]
              return store ? !$.isEmptyObject(store) : false
            }

            $.fn.removeData = function (names) {
              if (typeof names == 'string') names = names.split(/\s+/)
              return this.each(function () {
                var id = this[exp], store = id && data[id]
                if (store) $.each(names || store, function (key) {
                  delete store[names ? camelize(this) : key]
                })
              })
            }

              // Generate extended `remove` and `empty` functions
              ;['remove', 'empty'].forEach(function (methodName) {
                var origFn = $.fn[methodName]
                $.fn[methodName] = function () {
                  var elements = this.find('*')
                  if (methodName === 'remove') elements = elements.add(this)
                  elements.removeData()
                  return origFn.call(this)
                }
              })
          })(Zepto)
        return Zepto
      }))


      /***/
}),

/***/ "./node_modules/bootstrap/dist/js/bootstrap.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      /*!
        * Bootstrap v4.4.1 (https://getbootstrap.com/)
        * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
        * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
        */
      (function (global, factory) {
        true ? factory(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")) :
          undefined;
      }(this, (function (exports, $, Popper) {
        'use strict';

        $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
        Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread2(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          subClass.__proto__ = superClass;
        }

        /**
         * --------------------------------------------------------------------------
         * Bootstrap (v4.4.1): util.js
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * --------------------------------------------------------------------------
         */
        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */

        var TRANSITION_END = 'transitionend';
        var MAX_UID = 1000000;
        var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

        function toType(obj) {
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        }

        function getSpecialTransitionEndEvent() {
          return {
            bindType: TRANSITION_END,
            delegateType: TRANSITION_END,
            handle: function handle(event) {
              if ($(event.target).is(this)) {
                return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
              }

              return undefined; // eslint-disable-line no-undefined
            }
          };
        }

        function transitionEndEmulator(duration) {
          var _this = this;

          var called = false;
          $(this).one(Util.TRANSITION_END, function () {
            called = true;
          });
          setTimeout(function () {
            if (!called) {
              Util.triggerTransitionEnd(_this);
            }
          }, duration);
          return this;
        }

        function setTransitionEndSupport() {
          $.fn.emulateTransitionEnd = transitionEndEmulator;
          $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
        }
        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */


        var Util = {
          TRANSITION_END: 'bsTransitionEnd',
          getUID: function getUID(prefix) {
            do {
              // eslint-disable-next-line no-bitwise
              prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
            } while (document.getElementById(prefix));

            return prefix;
          },
          getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');

            if (!selector || selector === '#') {
              var hrefAttr = element.getAttribute('href');
              selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
            }

            try {
              return document.querySelector(selector) ? selector : null;
            } catch (err) {
              return null;
            }
          },
          getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
            if (!element) {
              return 0;
            } // Get transition-duration of the element


            var transitionDuration = $(element).css('transition-duration');
            var transitionDelay = $(element).css('transition-delay');
            var floatTransitionDuration = parseFloat(transitionDuration);
            var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

            if (!floatTransitionDuration && !floatTransitionDelay) {
              return 0;
            } // If multiple durations are defined, take the first


            transitionDuration = transitionDuration.split(',')[0];
            transitionDelay = transitionDelay.split(',')[0];
            return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
          },
          reflow: function reflow(element) {
            return element.offsetHeight;
          },
          triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(TRANSITION_END);
          },
          // TODO: Remove in v5
          supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(TRANSITION_END);
          },
          isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
          },
          typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
              if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                var expectedTypes = configTypes[property];
                var value = config[property];
                var valueType = value && Util.isElement(value) ? 'element' : toType(value);

                if (!new RegExp(expectedTypes).test(valueType)) {
                  throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                }
              }
            }
          },
          findShadowRoot: function findShadowRoot(element) {
            if (!document.documentElement.attachShadow) {
              return null;
            } // Can find the shadow root otherwise it'll return the document


            if (typeof element.getRootNode === 'function') {
              var root = element.getRootNode();
              return root instanceof ShadowRoot ? root : null;
            }

            if (element instanceof ShadowRoot) {
              return element;
            } // when we don't find a shadow root


            if (!element.parentNode) {
              return null;
            }

            return Util.findShadowRoot(element.parentNode);
          },
          jQueryDetection: function jQueryDetection() {
            if (typeof $ === 'undefined') {
              throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
            }

            var version = $.fn.jquery.split(' ')[0].split('.');
            var minMajor = 1;
            var ltMajor = 2;
            var minMinor = 9;
            var minPatch = 1;
            var maxMajor = 4;

            if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
              throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
            }
          }
        };
        Util.jQueryDetection();
        setTransitionEndSupport();

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'alert';
        var VERSION = '4.4.1';
        var DATA_KEY = 'bs.alert';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var Selector = {
          DISMISS: '[data-dismiss="alert"]'
        };
        var Event = {
          CLOSE: "close" + EVENT_KEY,
          CLOSED: "closed" + EVENT_KEY,
          CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
          ALERT: 'alert',
          FADE: 'fade',
          SHOW: 'show'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Alert =
          /*#__PURE__*/
          function () {
            function Alert(element) {
              this._element = element;
            } // Getters


            var _proto = Alert.prototype;

            // Public
            _proto.close = function close(element) {
              var rootElement = this._element;

              if (element) {
                rootElement = this._getRootElement(element);
              }

              var customEvent = this._triggerCloseEvent(rootElement);

              if (customEvent.isDefaultPrevented()) {
                return;
              }

              this._removeElement(rootElement);
            };

            _proto.dispose = function dispose() {
              $.removeData(this._element, DATA_KEY);
              this._element = null;
            } // Private
              ;

            _proto._getRootElement = function _getRootElement(element) {
              var selector = Util.getSelectorFromElement(element);
              var parent = false;

              if (selector) {
                parent = document.querySelector(selector);
              }

              if (!parent) {
                parent = $(element).closest("." + ClassName.ALERT)[0];
              }

              return parent;
            };

            _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
              var closeEvent = $.Event(Event.CLOSE);
              $(element).trigger(closeEvent);
              return closeEvent;
            };

            _proto._removeElement = function _removeElement(element) {
              var _this = this;

              $(element).removeClass(ClassName.SHOW);

              if (!$(element).hasClass(ClassName.FADE)) {
                this._destroyElement(element);

                return;
              }

              var transitionDuration = Util.getTransitionDurationFromElement(element);
              $(element).one(Util.TRANSITION_END, function (event) {
                return _this._destroyElement(element, event);
              }).emulateTransitionEnd(transitionDuration);
            };

            _proto._destroyElement = function _destroyElement(element) {
              $(element).detach().trigger(Event.CLOSED).remove();
            } // Static
              ;

            Alert._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var $element = $(this);
                var data = $element.data(DATA_KEY);

                if (!data) {
                  data = new Alert(this);
                  $element.data(DATA_KEY, data);
                }

                if (config === 'close') {
                  data[config](this);
                }
              });
            };

            Alert._handleDismiss = function _handleDismiss(alertInstance) {
              return function (event) {
                if (event) {
                  event.preventDefault();
                }

                alertInstance.close(this);
              };
            };

            _createClass(Alert, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION;
              }
            }]);

            return Alert;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Alert._jQueryInterface;
        $.fn[NAME].Constructor = Alert;

        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Alert._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$1 = 'button';
        var VERSION$1 = '4.4.1';
        var DATA_KEY$1 = 'bs.button';
        var EVENT_KEY$1 = "." + DATA_KEY$1;
        var DATA_API_KEY$1 = '.data-api';
        var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
        var ClassName$1 = {
          ACTIVE: 'active',
          BUTTON: 'btn',
          FOCUS: 'focus'
        };
        var Selector$1 = {
          DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
          DATA_TOGGLES: '[data-toggle="buttons"]',
          DATA_TOGGLE: '[data-toggle="button"]',
          DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"] .btn',
          INPUT: 'input:not([type="hidden"])',
          ACTIVE: '.active',
          BUTTON: '.btn'
        };
        var Event$1 = {
          CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
          FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1),
          LOAD_DATA_API: "load" + EVENT_KEY$1 + DATA_API_KEY$1
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Button =
          /*#__PURE__*/
          function () {
            function Button(element) {
              this._element = element;
            } // Getters


            var _proto = Button.prototype;

            // Public
            _proto.toggle = function toggle() {
              var triggerChangeEvent = true;
              var addAriaPressed = true;
              var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLES)[0];

              if (rootElement) {
                var input = this._element.querySelector(Selector$1.INPUT);

                if (input) {
                  if (input.type === 'radio') {
                    if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                      triggerChangeEvent = false;
                    } else {
                      var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

                      if (activeElement) {
                        $(activeElement).removeClass(ClassName$1.ACTIVE);
                      }
                    }
                  } else if (input.type === 'checkbox') {
                    if (this._element.tagName === 'LABEL' && input.checked === this._element.classList.contains(ClassName$1.ACTIVE)) {
                      triggerChangeEvent = false;
                    }
                  } else {
                    // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
                    triggerChangeEvent = false;
                  }

                  if (triggerChangeEvent) {
                    input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
                    $(input).trigger('change');
                  }

                  input.focus();
                  addAriaPressed = false;
                }
              }

              if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
                if (addAriaPressed) {
                  this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
                }

                if (triggerChangeEvent) {
                  $(this._element).toggleClass(ClassName$1.ACTIVE);
                }
              }
            };

            _proto.dispose = function dispose() {
              $.removeData(this._element, DATA_KEY$1);
              this._element = null;
            } // Static
              ;

            Button._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$1);

                if (!data) {
                  data = new Button(this);
                  $(this).data(DATA_KEY$1, data);
                }

                if (config === 'toggle') {
                  data[config]();
                }
              });
            };

            _createClass(Button, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$1;
              }
            }]);

            return Button;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
          var button = event.target;

          if (!$(button).hasClass(ClassName$1.BUTTON)) {
            button = $(button).closest(Selector$1.BUTTON)[0];
          }

          if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
            event.preventDefault(); // work around Firefox bug #1540995
          } else {
            var inputBtn = button.querySelector(Selector$1.INPUT);

            if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
              event.preventDefault(); // work around Firefox bug #1540995

              return;
            }

            Button._jQueryInterface.call($(button), 'toggle');
          }
        }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
          var button = $(event.target).closest(Selector$1.BUTTON)[0];
          $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
        });
        $(window).on(Event$1.LOAD_DATA_API, function () {
          // ensure correct active class is set to match the controls' actual values/states
          // find all checkboxes/readio buttons inside data-toggle groups
          var buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLES_BUTTONS));

          for (var i = 0, len = buttons.length; i < len; i++) {
            var button = buttons[i];
            var input = button.querySelector(Selector$1.INPUT);

            if (input.checked || input.hasAttribute('checked')) {
              button.classList.add(ClassName$1.ACTIVE);
            } else {
              button.classList.remove(ClassName$1.ACTIVE);
            }
          } // find all button toggles


          buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLE));

          for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
            var _button = buttons[_i];

            if (_button.getAttribute('aria-pressed') === 'true') {
              _button.classList.add(ClassName$1.ACTIVE);
            } else {
              _button.classList.remove(ClassName$1.ACTIVE);
            }
          }
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$1] = Button._jQueryInterface;
        $.fn[NAME$1].Constructor = Button;

        $.fn[NAME$1].noConflict = function () {
          $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
          return Button._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$2 = 'carousel';
        var VERSION$2 = '4.4.1';
        var DATA_KEY$2 = 'bs.carousel';
        var EVENT_KEY$2 = "." + DATA_KEY$2;
        var DATA_API_KEY$2 = '.data-api';
        var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
        var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

        var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

        var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

        var SWIPE_THRESHOLD = 40;
        var Default = {
          interval: 5000,
          keyboard: true,
          slide: false,
          pause: 'hover',
          wrap: true,
          touch: true
        };
        var DefaultType = {
          interval: '(number|boolean)',
          keyboard: 'boolean',
          slide: '(boolean|string)',
          pause: '(string|boolean)',
          wrap: 'boolean',
          touch: 'boolean'
        };
        var Direction = {
          NEXT: 'next',
          PREV: 'prev',
          LEFT: 'left',
          RIGHT: 'right'
        };
        var Event$2 = {
          SLIDE: "slide" + EVENT_KEY$2,
          SLID: "slid" + EVENT_KEY$2,
          KEYDOWN: "keydown" + EVENT_KEY$2,
          MOUSEENTER: "mouseenter" + EVENT_KEY$2,
          MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
          TOUCHSTART: "touchstart" + EVENT_KEY$2,
          TOUCHMOVE: "touchmove" + EVENT_KEY$2,
          TOUCHEND: "touchend" + EVENT_KEY$2,
          POINTERDOWN: "pointerdown" + EVENT_KEY$2,
          POINTERUP: "pointerup" + EVENT_KEY$2,
          DRAG_START: "dragstart" + EVENT_KEY$2,
          LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
          CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
        };
        var ClassName$2 = {
          CAROUSEL: 'carousel',
          ACTIVE: 'active',
          SLIDE: 'slide',
          RIGHT: 'carousel-item-right',
          LEFT: 'carousel-item-left',
          NEXT: 'carousel-item-next',
          PREV: 'carousel-item-prev',
          ITEM: 'carousel-item',
          POINTER_EVENT: 'pointer-event'
        };
        var Selector$2 = {
          ACTIVE: '.active',
          ACTIVE_ITEM: '.active.carousel-item',
          ITEM: '.carousel-item',
          ITEM_IMG: '.carousel-item img',
          NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
          INDICATORS: '.carousel-indicators',
          DATA_SLIDE: '[data-slide], [data-slide-to]',
          DATA_RIDE: '[data-ride="carousel"]'
        };
        var PointerType = {
          TOUCH: 'touch',
          PEN: 'pen'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Carousel =
          /*#__PURE__*/
          function () {
            function Carousel(element, config) {
              this._items = null;
              this._interval = null;
              this._activeElement = null;
              this._isPaused = false;
              this._isSliding = false;
              this.touchTimeout = null;
              this.touchStartX = 0;
              this.touchDeltaX = 0;
              this._config = this._getConfig(config);
              this._element = element;
              this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
              this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
              this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

              this._addEventListeners();
            } // Getters


            var _proto = Carousel.prototype;

            // Public
            _proto.next = function next() {
              if (!this._isSliding) {
                this._slide(Direction.NEXT);
              }
            };

            _proto.nextWhenVisible = function nextWhenVisible() {
              // Don't call next when the page isn't visible
              // or the carousel or its parent isn't visible
              if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
                this.next();
              }
            };

            _proto.prev = function prev() {
              if (!this._isSliding) {
                this._slide(Direction.PREV);
              }
            };

            _proto.pause = function pause(event) {
              if (!event) {
                this._isPaused = true;
              }

              if (this._element.querySelector(Selector$2.NEXT_PREV)) {
                Util.triggerTransitionEnd(this._element);
                this.cycle(true);
              }

              clearInterval(this._interval);
              this._interval = null;
            };

            _proto.cycle = function cycle(event) {
              if (!event) {
                this._isPaused = false;
              }

              if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
              }

              if (this._config.interval && !this._isPaused) {
                this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
              }
            };

            _proto.to = function to(index) {
              var _this = this;

              this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

              var activeIndex = this._getItemIndex(this._activeElement);

              if (index > this._items.length - 1 || index < 0) {
                return;
              }

              if (this._isSliding) {
                $(this._element).one(Event$2.SLID, function () {
                  return _this.to(index);
                });
                return;
              }

              if (activeIndex === index) {
                this.pause();
                this.cycle();
                return;
              }

              var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

              this._slide(direction, this._items[index]);
            };

            _proto.dispose = function dispose() {
              $(this._element).off(EVENT_KEY$2);
              $.removeData(this._element, DATA_KEY$2);
              this._items = null;
              this._config = null;
              this._element = null;
              this._interval = null;
              this._isPaused = null;
              this._isSliding = null;
              this._activeElement = null;
              this._indicatorsElement = null;
            } // Private
              ;

            _proto._getConfig = function _getConfig(config) {
              config = _objectSpread2({}, Default, {}, config);
              Util.typeCheckConfig(NAME$2, config, DefaultType);
              return config;
            };

            _proto._handleSwipe = function _handleSwipe() {
              var absDeltax = Math.abs(this.touchDeltaX);

              if (absDeltax <= SWIPE_THRESHOLD) {
                return;
              }

              var direction = absDeltax / this.touchDeltaX;
              this.touchDeltaX = 0; // swipe left

              if (direction > 0) {
                this.prev();
              } // swipe right


              if (direction < 0) {
                this.next();
              }
            };

            _proto._addEventListeners = function _addEventListeners() {
              var _this2 = this;

              if (this._config.keyboard) {
                $(this._element).on(Event$2.KEYDOWN, function (event) {
                  return _this2._keydown(event);
                });
              }

              if (this._config.pause === 'hover') {
                $(this._element).on(Event$2.MOUSEENTER, function (event) {
                  return _this2.pause(event);
                }).on(Event$2.MOUSELEAVE, function (event) {
                  return _this2.cycle(event);
                });
              }

              if (this._config.touch) {
                this._addTouchEventListeners();
              }
            };

            _proto._addTouchEventListeners = function _addTouchEventListeners() {
              var _this3 = this;

              if (!this._touchSupported) {
                return;
              }

              var start = function start(event) {
                if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                  _this3.touchStartX = event.originalEvent.clientX;
                } else if (!_this3._pointerEvent) {
                  _this3.touchStartX = event.originalEvent.touches[0].clientX;
                }
              };

              var move = function move(event) {
                // ensure swiping with one touch and not pinching
                if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
                  _this3.touchDeltaX = 0;
                } else {
                  _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
                }
              };

              var end = function end(event) {
                if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                  _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
                }

                _this3._handleSwipe();

                if (_this3._config.pause === 'hover') {
                  // If it's a touch-enabled device, mouseenter/leave are fired as
                  // part of the mouse compatibility events on first tap - the carousel
                  // would stop cycling until user tapped out of it;
                  // here, we listen for touchend, explicitly pause the carousel
                  // (as if it's the second time we tap on it, mouseenter compat event
                  // is NOT fired) and after a timeout (to allow for mouse compatibility
                  // events to fire) we explicitly restart cycling
                  _this3.pause();

                  if (_this3.touchTimeout) {
                    clearTimeout(_this3.touchTimeout);
                  }

                  _this3.touchTimeout = setTimeout(function (event) {
                    return _this3.cycle(event);
                  }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
                }
              };

              $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
                return e.preventDefault();
              });

              if (this._pointerEvent) {
                $(this._element).on(Event$2.POINTERDOWN, function (event) {
                  return start(event);
                });
                $(this._element).on(Event$2.POINTERUP, function (event) {
                  return end(event);
                });

                this._element.classList.add(ClassName$2.POINTER_EVENT);
              } else {
                $(this._element).on(Event$2.TOUCHSTART, function (event) {
                  return start(event);
                });
                $(this._element).on(Event$2.TOUCHMOVE, function (event) {
                  return move(event);
                });
                $(this._element).on(Event$2.TOUCHEND, function (event) {
                  return end(event);
                });
              }
            };

            _proto._keydown = function _keydown(event) {
              if (/input|textarea/i.test(event.target.tagName)) {
                return;
              }

              switch (event.which) {
                case ARROW_LEFT_KEYCODE:
                  event.preventDefault();
                  this.prev();
                  break;

                case ARROW_RIGHT_KEYCODE:
                  event.preventDefault();
                  this.next();
                  break;
              }
            };

            _proto._getItemIndex = function _getItemIndex(element) {
              this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
              return this._items.indexOf(element);
            };

            _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
              var isNextDirection = direction === Direction.NEXT;
              var isPrevDirection = direction === Direction.PREV;

              var activeIndex = this._getItemIndex(activeElement);

              var lastItemIndex = this._items.length - 1;
              var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

              if (isGoingToWrap && !this._config.wrap) {
                return activeElement;
              }

              var delta = direction === Direction.PREV ? -1 : 1;
              var itemIndex = (activeIndex + delta) % this._items.length;
              return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
            };

            _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
              var targetIndex = this._getItemIndex(relatedTarget);

              var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

              var slideEvent = $.Event(Event$2.SLIDE, {
                relatedTarget: relatedTarget,
                direction: eventDirectionName,
                from: fromIndex,
                to: targetIndex
              });
              $(this._element).trigger(slideEvent);
              return slideEvent;
            };

            _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
              if (this._indicatorsElement) {
                var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
                $(indicators).removeClass(ClassName$2.ACTIVE);

                var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                if (nextIndicator) {
                  $(nextIndicator).addClass(ClassName$2.ACTIVE);
                }
              }
            };

            _proto._slide = function _slide(direction, element) {
              var _this4 = this;

              var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

              var activeElementIndex = this._getItemIndex(activeElement);

              var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

              var nextElementIndex = this._getItemIndex(nextElement);

              var isCycling = Boolean(this._interval);
              var directionalClassName;
              var orderClassName;
              var eventDirectionName;

              if (direction === Direction.NEXT) {
                directionalClassName = ClassName$2.LEFT;
                orderClassName = ClassName$2.NEXT;
                eventDirectionName = Direction.LEFT;
              } else {
                directionalClassName = ClassName$2.RIGHT;
                orderClassName = ClassName$2.PREV;
                eventDirectionName = Direction.RIGHT;
              }

              if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
                this._isSliding = false;
                return;
              }

              var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

              if (slideEvent.isDefaultPrevented()) {
                return;
              }

              if (!activeElement || !nextElement) {
                // Some weirdness is happening, so we bail
                return;
              }

              this._isSliding = true;

              if (isCycling) {
                this.pause();
              }

              this._setActiveIndicatorElement(nextElement);

              var slidEvent = $.Event(Event$2.SLID, {
                relatedTarget: nextElement,
                direction: eventDirectionName,
                from: activeElementIndex,
                to: nextElementIndex
              });

              if ($(this._element).hasClass(ClassName$2.SLIDE)) {
                $(nextElement).addClass(orderClassName);
                Util.reflow(nextElement);
                $(activeElement).addClass(directionalClassName);
                $(nextElement).addClass(directionalClassName);
                var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

                if (nextElementInterval) {
                  this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                  this._config.interval = nextElementInterval;
                } else {
                  this._config.interval = this._config.defaultInterval || this._config.interval;
                }

                var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
                $(activeElement).one(Util.TRANSITION_END, function () {
                  $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
                  $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
                  _this4._isSliding = false;
                  setTimeout(function () {
                    return $(_this4._element).trigger(slidEvent);
                  }, 0);
                }).emulateTransitionEnd(transitionDuration);
              } else {
                $(activeElement).removeClass(ClassName$2.ACTIVE);
                $(nextElement).addClass(ClassName$2.ACTIVE);
                this._isSliding = false;
                $(this._element).trigger(slidEvent);
              }

              if (isCycling) {
                this.cycle();
              }
            } // Static
              ;

            Carousel._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$2);

                var _config = _objectSpread2({}, Default, {}, $(this).data());

                if (typeof config === 'object') {
                  _config = _objectSpread2({}, _config, {}, config);
                }

                var action = typeof config === 'string' ? config : _config.slide;

                if (!data) {
                  data = new Carousel(this, _config);
                  $(this).data(DATA_KEY$2, data);
                }

                if (typeof config === 'number') {
                  data.to(config);
                } else if (typeof action === 'string') {
                  if (typeof data[action] === 'undefined') {
                    throw new TypeError("No method named \"" + action + "\"");
                  }

                  data[action]();
                } else if (_config.interval && _config.ride) {
                  data.pause();
                  data.cycle();
                }
              });
            };

            Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
              var selector = Util.getSelectorFromElement(this);

              if (!selector) {
                return;
              }

              var target = $(selector)[0];

              if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
                return;
              }

              var config = _objectSpread2({}, $(target).data(), {}, $(this).data());

              var slideIndex = this.getAttribute('data-slide-to');

              if (slideIndex) {
                config.interval = false;
              }

              Carousel._jQueryInterface.call($(target), config);

              if (slideIndex) {
                $(target).data(DATA_KEY$2).to(slideIndex);
              }

              event.preventDefault();
            };

            _createClass(Carousel, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$2;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default;
              }
            }]);

            return Carousel;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
        $(window).on(Event$2.LOAD_DATA_API, function () {
          var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

          for (var i = 0, len = carousels.length; i < len; i++) {
            var $carousel = $(carousels[i]);

            Carousel._jQueryInterface.call($carousel, $carousel.data());
          }
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$2] = Carousel._jQueryInterface;
        $.fn[NAME$2].Constructor = Carousel;

        $.fn[NAME$2].noConflict = function () {
          $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
          return Carousel._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$3 = 'collapse';
        var VERSION$3 = '4.4.1';
        var DATA_KEY$3 = 'bs.collapse';
        var EVENT_KEY$3 = "." + DATA_KEY$3;
        var DATA_API_KEY$3 = '.data-api';
        var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
        var Default$1 = {
          toggle: true,
          parent: ''
        };
        var DefaultType$1 = {
          toggle: 'boolean',
          parent: '(string|element)'
        };
        var Event$3 = {
          SHOW: "show" + EVENT_KEY$3,
          SHOWN: "shown" + EVENT_KEY$3,
          HIDE: "hide" + EVENT_KEY$3,
          HIDDEN: "hidden" + EVENT_KEY$3,
          CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
        };
        var ClassName$3 = {
          SHOW: 'show',
          COLLAPSE: 'collapse',
          COLLAPSING: 'collapsing',
          COLLAPSED: 'collapsed'
        };
        var Dimension = {
          WIDTH: 'width',
          HEIGHT: 'height'
        };
        var Selector$3 = {
          ACTIVES: '.show, .collapsing',
          DATA_TOGGLE: '[data-toggle="collapse"]'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Collapse =
          /*#__PURE__*/
          function () {
            function Collapse(element, config) {
              this._isTransitioning = false;
              this._element = element;
              this._config = this._getConfig(config);
              this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
              var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

              for (var i = 0, len = toggleList.length; i < len; i++) {
                var elem = toggleList[i];
                var selector = Util.getSelectorFromElement(elem);
                var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
                  return foundElem === element;
                });

                if (selector !== null && filterElement.length > 0) {
                  this._selector = selector;

                  this._triggerArray.push(elem);
                }
              }

              this._parent = this._config.parent ? this._getParent() : null;

              if (!this._config.parent) {
                this._addAriaAndCollapsedClass(this._element, this._triggerArray);
              }

              if (this._config.toggle) {
                this.toggle();
              }
            } // Getters


            var _proto = Collapse.prototype;

            // Public
            _proto.toggle = function toggle() {
              if ($(this._element).hasClass(ClassName$3.SHOW)) {
                this.hide();
              } else {
                this.show();
              }
            };

            _proto.show = function show() {
              var _this = this;

              if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
                return;
              }

              var actives;
              var activesData;

              if (this._parent) {
                actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
                  if (typeof _this._config.parent === 'string') {
                    return elem.getAttribute('data-parent') === _this._config.parent;
                  }

                  return elem.classList.contains(ClassName$3.COLLAPSE);
                });

                if (actives.length === 0) {
                  actives = null;
                }
              }

              if (actives) {
                activesData = $(actives).not(this._selector).data(DATA_KEY$3);

                if (activesData && activesData._isTransitioning) {
                  return;
                }
              }

              var startEvent = $.Event(Event$3.SHOW);
              $(this._element).trigger(startEvent);

              if (startEvent.isDefaultPrevented()) {
                return;
              }

              if (actives) {
                Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

                if (!activesData) {
                  $(actives).data(DATA_KEY$3, null);
                }
              }

              var dimension = this._getDimension();

              $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
              this._element.style[dimension] = 0;

              if (this._triggerArray.length) {
                $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
              }

              this.setTransitioning(true);

              var complete = function complete() {
                $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
                _this._element.style[dimension] = '';

                _this.setTransitioning(false);

                $(_this._element).trigger(Event$3.SHOWN);
              };

              var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
              var scrollSize = "scroll" + capitalizedDimension;
              var transitionDuration = Util.getTransitionDurationFromElement(this._element);
              $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
              this._element.style[dimension] = this._element[scrollSize] + "px";
            };

            _proto.hide = function hide() {
              var _this2 = this;

              if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
                return;
              }

              var startEvent = $.Event(Event$3.HIDE);
              $(this._element).trigger(startEvent);

              if (startEvent.isDefaultPrevented()) {
                return;
              }

              var dimension = this._getDimension();

              this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
              Util.reflow(this._element);
              $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
              var triggerArrayLength = this._triggerArray.length;

              if (triggerArrayLength > 0) {
                for (var i = 0; i < triggerArrayLength; i++) {
                  var trigger = this._triggerArray[i];
                  var selector = Util.getSelectorFromElement(trigger);

                  if (selector !== null) {
                    var $elem = $([].slice.call(document.querySelectorAll(selector)));

                    if (!$elem.hasClass(ClassName$3.SHOW)) {
                      $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
                    }
                  }
                }
              }

              this.setTransitioning(true);

              var complete = function complete() {
                _this2.setTransitioning(false);

                $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
              };

              this._element.style[dimension] = '';
              var transitionDuration = Util.getTransitionDurationFromElement(this._element);
              $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            };

            _proto.setTransitioning = function setTransitioning(isTransitioning) {
              this._isTransitioning = isTransitioning;
            };

            _proto.dispose = function dispose() {
              $.removeData(this._element, DATA_KEY$3);
              this._config = null;
              this._parent = null;
              this._element = null;
              this._triggerArray = null;
              this._isTransitioning = null;
            } // Private
              ;

            _proto._getConfig = function _getConfig(config) {
              config = _objectSpread2({}, Default$1, {}, config);
              config.toggle = Boolean(config.toggle); // Coerce string values

              Util.typeCheckConfig(NAME$3, config, DefaultType$1);
              return config;
            };

            _proto._getDimension = function _getDimension() {
              var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
              return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
            };

            _proto._getParent = function _getParent() {
              var _this3 = this;

              var parent;

              if (Util.isElement(this._config.parent)) {
                parent = this._config.parent; // It's a jQuery object

                if (typeof this._config.parent.jquery !== 'undefined') {
                  parent = this._config.parent[0];
                }
              } else {
                parent = document.querySelector(this._config.parent);
              }

              var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
              var children = [].slice.call(parent.querySelectorAll(selector));
              $(children).each(function (i, element) {
                _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
              });
              return parent;
            };

            _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
              var isOpen = $(element).hasClass(ClassName$3.SHOW);

              if (triggerArray.length) {
                $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
              }
            } // Static
              ;

            Collapse._getTargetFromElement = function _getTargetFromElement(element) {
              var selector = Util.getSelectorFromElement(element);
              return selector ? document.querySelector(selector) : null;
            };

            Collapse._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY$3);

                var _config = _objectSpread2({}, Default$1, {}, $this.data(), {}, typeof config === 'object' && config ? config : {});

                if (!data && _config.toggle && /show|hide/.test(config)) {
                  _config.toggle = false;
                }

                if (!data) {
                  data = new Collapse(this, _config);
                  $this.data(DATA_KEY$3, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config]();
                }
              });
            };

            _createClass(Collapse, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$3;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$1;
              }
            }]);

            return Collapse;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
          // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
          if (event.currentTarget.tagName === 'A') {
            event.preventDefault();
          }

          var $trigger = $(this);
          var selector = Util.getSelectorFromElement(this);
          var selectors = [].slice.call(document.querySelectorAll(selector));
          $(selectors).each(function () {
            var $target = $(this);
            var data = $target.data(DATA_KEY$3);
            var config = data ? 'toggle' : $trigger.data();

            Collapse._jQueryInterface.call($target, config);
          });
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$3] = Collapse._jQueryInterface;
        $.fn[NAME$3].Constructor = Collapse;

        $.fn[NAME$3].noConflict = function () {
          $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
          return Collapse._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$4 = 'dropdown';
        var VERSION$4 = '4.4.1';
        var DATA_KEY$4 = 'bs.dropdown';
        var EVENT_KEY$4 = "." + DATA_KEY$4;
        var DATA_API_KEY$4 = '.data-api';
        var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

        var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

        var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

        var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

        var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

        var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

        var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
        var Event$4 = {
          HIDE: "hide" + EVENT_KEY$4,
          HIDDEN: "hidden" + EVENT_KEY$4,
          SHOW: "show" + EVENT_KEY$4,
          SHOWN: "shown" + EVENT_KEY$4,
          CLICK: "click" + EVENT_KEY$4,
          CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
          KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
          KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
        };
        var ClassName$4 = {
          DISABLED: 'disabled',
          SHOW: 'show',
          DROPUP: 'dropup',
          DROPRIGHT: 'dropright',
          DROPLEFT: 'dropleft',
          MENURIGHT: 'dropdown-menu-right',
          MENULEFT: 'dropdown-menu-left',
          POSITION_STATIC: 'position-static'
        };
        var Selector$4 = {
          DATA_TOGGLE: '[data-toggle="dropdown"]',
          FORM_CHILD: '.dropdown form',
          MENU: '.dropdown-menu',
          NAVBAR_NAV: '.navbar-nav',
          VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
        };
        var AttachmentMap = {
          TOP: 'top-start',
          TOPEND: 'top-end',
          BOTTOM: 'bottom-start',
          BOTTOMEND: 'bottom-end',
          RIGHT: 'right-start',
          RIGHTEND: 'right-end',
          LEFT: 'left-start',
          LEFTEND: 'left-end'
        };
        var Default$2 = {
          offset: 0,
          flip: true,
          boundary: 'scrollParent',
          reference: 'toggle',
          display: 'dynamic',
          popperConfig: null
        };
        var DefaultType$2 = {
          offset: '(number|string|function)',
          flip: 'boolean',
          boundary: '(string|element)',
          reference: '(string|element)',
          display: 'string',
          popperConfig: '(null|object)'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Dropdown =
          /*#__PURE__*/
          function () {
            function Dropdown(element, config) {
              this._element = element;
              this._popper = null;
              this._config = this._getConfig(config);
              this._menu = this._getMenuElement();
              this._inNavbar = this._detectNavbar();

              this._addEventListeners();
            } // Getters


            var _proto = Dropdown.prototype;

            // Public
            _proto.toggle = function toggle() {
              if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
                return;
              }

              var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

              Dropdown._clearMenus();

              if (isActive) {
                return;
              }

              this.show(true);
            };

            _proto.show = function show(usePopper) {
              if (usePopper === void 0) {
                usePopper = false;
              }

              if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
                return;
              }

              var relatedTarget = {
                relatedTarget: this._element
              };
              var showEvent = $.Event(Event$4.SHOW, relatedTarget);

              var parent = Dropdown._getParentFromElement(this._element);

              $(parent).trigger(showEvent);

              if (showEvent.isDefaultPrevented()) {
                return;
              } // Disable totally Popper.js for Dropdown in Navbar


              if (!this._inNavbar && usePopper) {
                /**
                 * Check for Popper dependency
                 * Popper - https://popper.js.org
                 */
                if (typeof Popper === 'undefined') {
                  throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
                }

                var referenceElement = this._element;

                if (this._config.reference === 'parent') {
                  referenceElement = parent;
                } else if (Util.isElement(this._config.reference)) {
                  referenceElement = this._config.reference; // Check if it's jQuery element

                  if (typeof this._config.reference.jquery !== 'undefined') {
                    referenceElement = this._config.reference[0];
                  }
                } // If boundary is not `scrollParent`, then set position to `static`
                // to allow the menu to "escape" the scroll parent's boundaries
                // https://github.com/twbs/bootstrap/issues/24251


                if (this._config.boundary !== 'scrollParent') {
                  $(parent).addClass(ClassName$4.POSITION_STATIC);
                }

                this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
              } // If this is a touch-enabled device we add extra
              // empty mouseover listeners to the body's immediate children;
              // only needed because of broken event delegation on iOS
              // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


              if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
                $(document.body).children().on('mouseover', null, $.noop);
              }

              this._element.focus();

              this._element.setAttribute('aria-expanded', true);

              $(this._menu).toggleClass(ClassName$4.SHOW);
              $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
            };

            _proto.hide = function hide() {
              if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
                return;
              }

              var relatedTarget = {
                relatedTarget: this._element
              };
              var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

              var parent = Dropdown._getParentFromElement(this._element);

              $(parent).trigger(hideEvent);

              if (hideEvent.isDefaultPrevented()) {
                return;
              }

              if (this._popper) {
                this._popper.destroy();
              }

              $(this._menu).toggleClass(ClassName$4.SHOW);
              $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
            };

            _proto.dispose = function dispose() {
              $.removeData(this._element, DATA_KEY$4);
              $(this._element).off(EVENT_KEY$4);
              this._element = null;
              this._menu = null;

              if (this._popper !== null) {
                this._popper.destroy();

                this._popper = null;
              }
            };

            _proto.update = function update() {
              this._inNavbar = this._detectNavbar();

              if (this._popper !== null) {
                this._popper.scheduleUpdate();
              }
            } // Private
              ;

            _proto._addEventListeners = function _addEventListeners() {
              var _this = this;

              $(this._element).on(Event$4.CLICK, function (event) {
                event.preventDefault();
                event.stopPropagation();

                _this.toggle();
              });
            };

            _proto._getConfig = function _getConfig(config) {
              config = _objectSpread2({}, this.constructor.Default, {}, $(this._element).data(), {}, config);
              Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
              return config;
            };

            _proto._getMenuElement = function _getMenuElement() {
              if (!this._menu) {
                var parent = Dropdown._getParentFromElement(this._element);

                if (parent) {
                  this._menu = parent.querySelector(Selector$4.MENU);
                }
              }

              return this._menu;
            };

            _proto._getPlacement = function _getPlacement() {
              var $parentDropdown = $(this._element.parentNode);
              var placement = AttachmentMap.BOTTOM; // Handle dropup

              if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
                placement = AttachmentMap.TOP;

                if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
                  placement = AttachmentMap.TOPEND;
                }
              } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
                placement = AttachmentMap.RIGHT;
              } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
                placement = AttachmentMap.LEFT;
              } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
                placement = AttachmentMap.BOTTOMEND;
              }

              return placement;
            };

            _proto._detectNavbar = function _detectNavbar() {
              return $(this._element).closest('.navbar').length > 0;
            };

            _proto._getOffset = function _getOffset() {
              var _this2 = this;

              var offset = {};

              if (typeof this._config.offset === 'function') {
                offset.fn = function (data) {
                  data.offsets = _objectSpread2({}, data.offsets, {}, _this2._config.offset(data.offsets, _this2._element) || {});
                  return data;
                };
              } else {
                offset.offset = this._config.offset;
              }

              return offset;
            };

            _proto._getPopperConfig = function _getPopperConfig() {
              var popperConfig = {
                placement: this._getPlacement(),
                modifiers: {
                  offset: this._getOffset(),
                  flip: {
                    enabled: this._config.flip
                  },
                  preventOverflow: {
                    boundariesElement: this._config.boundary
                  }
                }
              }; // Disable Popper.js if we have a static display

              if (this._config.display === 'static') {
                popperConfig.modifiers.applyStyle = {
                  enabled: false
                };
              }

              return _objectSpread2({}, popperConfig, {}, this._config.popperConfig);
            } // Static
              ;

            Dropdown._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$4);

                var _config = typeof config === 'object' ? config : null;

                if (!data) {
                  data = new Dropdown(this, _config);
                  $(this).data(DATA_KEY$4, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config]();
                }
              });
            };

            Dropdown._clearMenus = function _clearMenus(event) {
              if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
                return;
              }

              var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

              for (var i = 0, len = toggles.length; i < len; i++) {
                var parent = Dropdown._getParentFromElement(toggles[i]);

                var context = $(toggles[i]).data(DATA_KEY$4);
                var relatedTarget = {
                  relatedTarget: toggles[i]
                };

                if (event && event.type === 'click') {
                  relatedTarget.clickEvent = event;
                }

                if (!context) {
                  continue;
                }

                var dropdownMenu = context._menu;

                if (!$(parent).hasClass(ClassName$4.SHOW)) {
                  continue;
                }

                if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                  continue;
                }

                var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
                $(parent).trigger(hideEvent);

                if (hideEvent.isDefaultPrevented()) {
                  continue;
                } // If this is a touch-enabled device we remove the extra
                // empty mouseover listeners we added for iOS support


                if ('ontouchstart' in document.documentElement) {
                  $(document.body).children().off('mouseover', null, $.noop);
                }

                toggles[i].setAttribute('aria-expanded', 'false');

                if (context._popper) {
                  context._popper.destroy();
                }

                $(dropdownMenu).removeClass(ClassName$4.SHOW);
                $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
              }
            };

            Dropdown._getParentFromElement = function _getParentFromElement(element) {
              var parent;
              var selector = Util.getSelectorFromElement(element);

              if (selector) {
                parent = document.querySelector(selector);
              }

              return parent || element.parentNode;
            } // eslint-disable-next-line complexity
              ;

            Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
              // If not input/textarea:
              //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
              // If input/textarea:
              //  - If space key => not a dropdown command
              //  - If key is other than escape
              //    - If key is not up or down => not a dropdown command
              //    - If trigger inside the menu => not a dropdown command
              if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
                return;
              }

              event.preventDefault();
              event.stopPropagation();

              if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
                return;
              }

              var parent = Dropdown._getParentFromElement(this);

              var isActive = $(parent).hasClass(ClassName$4.SHOW);

              if (!isActive && event.which === ESCAPE_KEYCODE) {
                return;
              }

              if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
                if (event.which === ESCAPE_KEYCODE) {
                  var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
                  $(toggle).trigger('focus');
                }

                $(this).trigger('click');
                return;
              }

              var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS)).filter(function (item) {
                return $(item).is(':visible');
              });

              if (items.length === 0) {
                return;
              }

              var index = items.indexOf(event.target);

              if (event.which === ARROW_UP_KEYCODE && index > 0) {
                // Up
                index--;
              }

              if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                // Down
                index++;
              }

              if (index < 0) {
                index = 0;
              }

              items[index].focus();
            };

            _createClass(Dropdown, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$4;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$2;
              }
            }, {
              key: "DefaultType",
              get: function get() {
                return DefaultType$2;
              }
            }]);

            return Dropdown;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
          event.preventDefault();
          event.stopPropagation();

          Dropdown._jQueryInterface.call($(this), 'toggle');
        }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
          e.stopPropagation();
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$4] = Dropdown._jQueryInterface;
        $.fn[NAME$4].Constructor = Dropdown;

        $.fn[NAME$4].noConflict = function () {
          $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
          return Dropdown._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$5 = 'modal';
        var VERSION$5 = '4.4.1';
        var DATA_KEY$5 = 'bs.modal';
        var EVENT_KEY$5 = "." + DATA_KEY$5;
        var DATA_API_KEY$5 = '.data-api';
        var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
        var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

        var Default$3 = {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: true
        };
        var DefaultType$3 = {
          backdrop: '(boolean|string)',
          keyboard: 'boolean',
          focus: 'boolean',
          show: 'boolean'
        };
        var Event$5 = {
          HIDE: "hide" + EVENT_KEY$5,
          HIDE_PREVENTED: "hidePrevented" + EVENT_KEY$5,
          HIDDEN: "hidden" + EVENT_KEY$5,
          SHOW: "show" + EVENT_KEY$5,
          SHOWN: "shown" + EVENT_KEY$5,
          FOCUSIN: "focusin" + EVENT_KEY$5,
          RESIZE: "resize" + EVENT_KEY$5,
          CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
          KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
          MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
          MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
          CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
        };
        var ClassName$5 = {
          SCROLLABLE: 'modal-dialog-scrollable',
          SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
          BACKDROP: 'modal-backdrop',
          OPEN: 'modal-open',
          FADE: 'fade',
          SHOW: 'show',
          STATIC: 'modal-static'
        };
        var Selector$5 = {
          DIALOG: '.modal-dialog',
          MODAL_BODY: '.modal-body',
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
          STICKY_CONTENT: '.sticky-top'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Modal =
          /*#__PURE__*/
          function () {
            function Modal(element, config) {
              this._config = this._getConfig(config);
              this._element = element;
              this._dialog = element.querySelector(Selector$5.DIALOG);
              this._backdrop = null;
              this._isShown = false;
              this._isBodyOverflowing = false;
              this._ignoreBackdropClick = false;
              this._isTransitioning = false;
              this._scrollbarWidth = 0;
            } // Getters


            var _proto = Modal.prototype;

            // Public
            _proto.toggle = function toggle(relatedTarget) {
              return this._isShown ? this.hide() : this.show(relatedTarget);
            };

            _proto.show = function show(relatedTarget) {
              var _this = this;

              if (this._isShown || this._isTransitioning) {
                return;
              }

              if ($(this._element).hasClass(ClassName$5.FADE)) {
                this._isTransitioning = true;
              }

              var showEvent = $.Event(Event$5.SHOW, {
                relatedTarget: relatedTarget
              });
              $(this._element).trigger(showEvent);

              if (this._isShown || showEvent.isDefaultPrevented()) {
                return;
              }

              this._isShown = true;

              this._checkScrollbar();

              this._setScrollbar();

              this._adjustDialog();

              this._setEscapeEvent();

              this._setResizeEvent();

              $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
                return _this.hide(event);
              });
              $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
                $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
                  if ($(event.target).is(_this._element)) {
                    _this._ignoreBackdropClick = true;
                  }
                });
              });

              this._showBackdrop(function () {
                return _this._showElement(relatedTarget);
              });
            };

            _proto.hide = function hide(event) {
              var _this2 = this;

              if (event) {
                event.preventDefault();
              }

              if (!this._isShown || this._isTransitioning) {
                return;
              }

              var hideEvent = $.Event(Event$5.HIDE);
              $(this._element).trigger(hideEvent);

              if (!this._isShown || hideEvent.isDefaultPrevented()) {
                return;
              }

              this._isShown = false;
              var transition = $(this._element).hasClass(ClassName$5.FADE);

              if (transition) {
                this._isTransitioning = true;
              }

              this._setEscapeEvent();

              this._setResizeEvent();

              $(document).off(Event$5.FOCUSIN);
              $(this._element).removeClass(ClassName$5.SHOW);
              $(this._element).off(Event$5.CLICK_DISMISS);
              $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

              if (transition) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, function (event) {
                  return _this2._hideModal(event);
                }).emulateTransitionEnd(transitionDuration);
              } else {
                this._hideModal();
              }
            };

            _proto.dispose = function dispose() {
              [window, this._element, this._dialog].forEach(function (htmlElement) {
                return $(htmlElement).off(EVENT_KEY$5);
              });
              /**
               * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
               * Do not move `document` in `htmlElements` array
               * It will remove `Event.CLICK_DATA_API` event that should remain
               */

              $(document).off(Event$5.FOCUSIN);
              $.removeData(this._element, DATA_KEY$5);
              this._config = null;
              this._element = null;
              this._dialog = null;
              this._backdrop = null;
              this._isShown = null;
              this._isBodyOverflowing = null;
              this._ignoreBackdropClick = null;
              this._isTransitioning = null;
              this._scrollbarWidth = null;
            };

            _proto.handleUpdate = function handleUpdate() {
              this._adjustDialog();
            } // Private
              ;

            _proto._getConfig = function _getConfig(config) {
              config = _objectSpread2({}, Default$3, {}, config);
              Util.typeCheckConfig(NAME$5, config, DefaultType$3);
              return config;
            };

            _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
              var _this3 = this;

              if (this._config.backdrop === 'static') {
                var hideEventPrevented = $.Event(Event$5.HIDE_PREVENTED);
                $(this._element).trigger(hideEventPrevented);

                if (hideEventPrevented.defaultPrevented) {
                  return;
                }

                this._element.classList.add(ClassName$5.STATIC);

                var modalTransitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, function () {
                  _this3._element.classList.remove(ClassName$5.STATIC);
                }).emulateTransitionEnd(modalTransitionDuration);

                this._element.focus();
              } else {
                this.hide();
              }
            };

            _proto._showElement = function _showElement(relatedTarget) {
              var _this4 = this;

              var transition = $(this._element).hasClass(ClassName$5.FADE);
              var modalBody = this._dialog ? this._dialog.querySelector(Selector$5.MODAL_BODY) : null;

              if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                // Don't move modal's DOM position
                document.body.appendChild(this._element);
              }

              this._element.style.display = 'block';

              this._element.removeAttribute('aria-hidden');

              this._element.setAttribute('aria-modal', true);

              if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE) && modalBody) {
                modalBody.scrollTop = 0;
              } else {
                this._element.scrollTop = 0;
              }

              if (transition) {
                Util.reflow(this._element);
              }

              $(this._element).addClass(ClassName$5.SHOW);

              if (this._config.focus) {
                this._enforceFocus();
              }

              var shownEvent = $.Event(Event$5.SHOWN, {
                relatedTarget: relatedTarget
              });

              var transitionComplete = function transitionComplete() {
                if (_this4._config.focus) {
                  _this4._element.focus();
                }

                _this4._isTransitioning = false;
                $(_this4._element).trigger(shownEvent);
              };

              if (transition) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
                $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
              } else {
                transitionComplete();
              }
            };

            _proto._enforceFocus = function _enforceFocus() {
              var _this5 = this;

              $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
                .on(Event$5.FOCUSIN, function (event) {
                  if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
                    _this5._element.focus();
                  }
                });
            };

            _proto._setEscapeEvent = function _setEscapeEvent() {
              var _this6 = this;

              if (this._isShown && this._config.keyboard) {
                $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
                  if (event.which === ESCAPE_KEYCODE$1) {
                    _this6._triggerBackdropTransition();
                  }
                });
              } else if (!this._isShown) {
                $(this._element).off(Event$5.KEYDOWN_DISMISS);
              }
            };

            _proto._setResizeEvent = function _setResizeEvent() {
              var _this7 = this;

              if (this._isShown) {
                $(window).on(Event$5.RESIZE, function (event) {
                  return _this7.handleUpdate(event);
                });
              } else {
                $(window).off(Event$5.RESIZE);
              }
            };

            _proto._hideModal = function _hideModal() {
              var _this8 = this;

              this._element.style.display = 'none';

              this._element.setAttribute('aria-hidden', true);

              this._element.removeAttribute('aria-modal');

              this._isTransitioning = false;

              this._showBackdrop(function () {
                $(document.body).removeClass(ClassName$5.OPEN);

                _this8._resetAdjustments();

                _this8._resetScrollbar();

                $(_this8._element).trigger(Event$5.HIDDEN);
              });
            };

            _proto._removeBackdrop = function _removeBackdrop() {
              if (this._backdrop) {
                $(this._backdrop).remove();
                this._backdrop = null;
              }
            };

            _proto._showBackdrop = function _showBackdrop(callback) {
              var _this9 = this;

              var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

              if (this._isShown && this._config.backdrop) {
                this._backdrop = document.createElement('div');
                this._backdrop.className = ClassName$5.BACKDROP;

                if (animate) {
                  this._backdrop.classList.add(animate);
                }

                $(this._backdrop).appendTo(document.body);
                $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
                  if (_this9._ignoreBackdropClick) {
                    _this9._ignoreBackdropClick = false;
                    return;
                  }

                  if (event.target !== event.currentTarget) {
                    return;
                  }

                  _this9._triggerBackdropTransition();
                });

                if (animate) {
                  Util.reflow(this._backdrop);
                }

                $(this._backdrop).addClass(ClassName$5.SHOW);

                if (!callback) {
                  return;
                }

                if (!animate) {
                  callback();
                  return;
                }

                var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
                $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
              } else if (!this._isShown && this._backdrop) {
                $(this._backdrop).removeClass(ClassName$5.SHOW);

                var callbackRemove = function callbackRemove() {
                  _this9._removeBackdrop();

                  if (callback) {
                    callback();
                  }
                };

                if ($(this._element).hasClass(ClassName$5.FADE)) {
                  var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

                  $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
                } else {
                  callbackRemove();
                }
              } else if (callback) {
                callback();
              }
            } // ----------------------------------------------------------------------
              // the following methods are used to handle overflowing modals
              // todo (fat): these should probably be refactored out of modal.js
              // ----------------------------------------------------------------------
              ;

            _proto._adjustDialog = function _adjustDialog() {
              var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

              if (!this._isBodyOverflowing && isModalOverflowing) {
                this._element.style.paddingLeft = this._scrollbarWidth + "px";
              }

              if (this._isBodyOverflowing && !isModalOverflowing) {
                this._element.style.paddingRight = this._scrollbarWidth + "px";
              }
            };

            _proto._resetAdjustments = function _resetAdjustments() {
              this._element.style.paddingLeft = '';
              this._element.style.paddingRight = '';
            };

            _proto._checkScrollbar = function _checkScrollbar() {
              var rect = document.body.getBoundingClientRect();
              this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
              this._scrollbarWidth = this._getScrollbarWidth();
            };

            _proto._setScrollbar = function _setScrollbar() {
              var _this10 = this;

              if (this._isBodyOverflowing) {
                // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
                var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
                var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

                $(fixedContent).each(function (index, element) {
                  var actualPadding = element.style.paddingRight;
                  var calculatedPadding = $(element).css('padding-right');
                  $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
                }); // Adjust sticky content margin

                $(stickyContent).each(function (index, element) {
                  var actualMargin = element.style.marginRight;
                  var calculatedMargin = $(element).css('margin-right');
                  $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
                }); // Adjust body padding

                var actualPadding = document.body.style.paddingRight;
                var calculatedPadding = $(document.body).css('padding-right');
                $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
              }

              $(document.body).addClass(ClassName$5.OPEN);
            };

            _proto._resetScrollbar = function _resetScrollbar() {
              // Restore fixed content padding
              var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
              $(fixedContent).each(function (index, element) {
                var padding = $(element).data('padding-right');
                $(element).removeData('padding-right');
                element.style.paddingRight = padding ? padding : '';
              }); // Restore sticky content

              var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
              $(elements).each(function (index, element) {
                var margin = $(element).data('margin-right');

                if (typeof margin !== 'undefined') {
                  $(element).css('margin-right', margin).removeData('margin-right');
                }
              }); // Restore body padding

              var padding = $(document.body).data('padding-right');
              $(document.body).removeData('padding-right');
              document.body.style.paddingRight = padding ? padding : '';
            };

            _proto._getScrollbarWidth = function _getScrollbarWidth() {
              // thx d.walsh
              var scrollDiv = document.createElement('div');
              scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
              document.body.appendChild(scrollDiv);
              var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
              document.body.removeChild(scrollDiv);
              return scrollbarWidth;
            } // Static
              ;

            Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$5);

                var _config = _objectSpread2({}, Default$3, {}, $(this).data(), {}, typeof config === 'object' && config ? config : {});

                if (!data) {
                  data = new Modal(this, _config);
                  $(this).data(DATA_KEY$5, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config](relatedTarget);
                } else if (_config.show) {
                  data.show(relatedTarget);
                }
              });
            };

            _createClass(Modal, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$5;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$3;
              }
            }]);

            return Modal;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
          var _this11 = this;

          var target;
          var selector = Util.getSelectorFromElement(this);

          if (selector) {
            target = document.querySelector(selector);
          }

          var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread2({}, $(target).data(), {}, $(this).data());

          if (this.tagName === 'A' || this.tagName === 'AREA') {
            event.preventDefault();
          }

          var $target = $(target).one(Event$5.SHOW, function (showEvent) {
            if (showEvent.isDefaultPrevented()) {
              // Only register focus restorer if modal will actually get shown
              return;
            }

            $target.one(Event$5.HIDDEN, function () {
              if ($(_this11).is(':visible')) {
                _this11.focus();
              }
            });
          });

          Modal._jQueryInterface.call($(target), config, this);
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$5] = Modal._jQueryInterface;
        $.fn[NAME$5].Constructor = Modal;

        $.fn[NAME$5].noConflict = function () {
          $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
          return Modal._jQueryInterface;
        };

        /**
         * --------------------------------------------------------------------------
         * Bootstrap (v4.4.1): tools/sanitizer.js
         * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
         * --------------------------------------------------------------------------
         */
        var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
        var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
        var DefaultWhitelist = {
          // Global attributes allowed on any supplied element below.
          '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
          a: ['target', 'href', 'title', 'rel'],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          div: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ['src', 'alt', 'title', 'width', 'height'],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: []
        };
        /**
         * A pattern that recognizes a commonly useful subset of URLs that are safe.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */

        var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
        /**
         * A pattern that matches safe data URLs. Only matches image, video and audio types.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */

        var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

        function allowedAttribute(attr, allowedAttributeList) {
          var attrName = attr.nodeName.toLowerCase();

          if (allowedAttributeList.indexOf(attrName) !== -1) {
            if (uriAttrs.indexOf(attrName) !== -1) {
              return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
            }

            return true;
          }

          var regExp = allowedAttributeList.filter(function (attrRegex) {
            return attrRegex instanceof RegExp;
          }); // Check if a regular expression validates the attribute.

          for (var i = 0, l = regExp.length; i < l; i++) {
            if (attrName.match(regExp[i])) {
              return true;
            }
          }

          return false;
        }

        function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
          if (unsafeHtml.length === 0) {
            return unsafeHtml;
          }

          if (sanitizeFn && typeof sanitizeFn === 'function') {
            return sanitizeFn(unsafeHtml);
          }

          var domParser = new window.DOMParser();
          var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
          var whitelistKeys = Object.keys(whiteList);
          var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

          var _loop = function _loop(i, len) {
            var el = elements[i];
            var elName = el.nodeName.toLowerCase();

            if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
              el.parentNode.removeChild(el);
              return "continue";
            }

            var attributeList = [].slice.call(el.attributes);
            var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
            attributeList.forEach(function (attr) {
              if (!allowedAttribute(attr, whitelistedAttributes)) {
                el.removeAttribute(attr.nodeName);
              }
            });
          };

          for (var i = 0, len = elements.length; i < len; i++) {
            var _ret = _loop(i);

            if (_ret === "continue") continue;
          }

          return createdDocument.body.innerHTML;
        }

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$6 = 'tooltip';
        var VERSION$6 = '4.4.1';
        var DATA_KEY$6 = 'bs.tooltip';
        var EVENT_KEY$6 = "." + DATA_KEY$6;
        var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
        var CLASS_PREFIX = 'bs-tooltip';
        var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
        var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
        var DefaultType$4 = {
          animation: 'boolean',
          template: 'string',
          title: '(string|element|function)',
          trigger: 'string',
          delay: '(number|object)',
          html: 'boolean',
          selector: '(string|boolean)',
          placement: '(string|function)',
          offset: '(number|string|function)',
          container: '(string|element|boolean)',
          fallbackPlacement: '(string|array)',
          boundary: '(string|element)',
          sanitize: 'boolean',
          sanitizeFn: '(null|function)',
          whiteList: 'object',
          popperConfig: '(null|object)'
        };
        var AttachmentMap$1 = {
          AUTO: 'auto',
          TOP: 'top',
          RIGHT: 'right',
          BOTTOM: 'bottom',
          LEFT: 'left'
        };
        var Default$4 = {
          animation: true,
          template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
          trigger: 'hover focus',
          title: '',
          delay: 0,
          html: false,
          selector: false,
          placement: 'top',
          offset: 0,
          container: false,
          fallbackPlacement: 'flip',
          boundary: 'scrollParent',
          sanitize: true,
          sanitizeFn: null,
          whiteList: DefaultWhitelist,
          popperConfig: null
        };
        var HoverState = {
          SHOW: 'show',
          OUT: 'out'
        };
        var Event$6 = {
          HIDE: "hide" + EVENT_KEY$6,
          HIDDEN: "hidden" + EVENT_KEY$6,
          SHOW: "show" + EVENT_KEY$6,
          SHOWN: "shown" + EVENT_KEY$6,
          INSERTED: "inserted" + EVENT_KEY$6,
          CLICK: "click" + EVENT_KEY$6,
          FOCUSIN: "focusin" + EVENT_KEY$6,
          FOCUSOUT: "focusout" + EVENT_KEY$6,
          MOUSEENTER: "mouseenter" + EVENT_KEY$6,
          MOUSELEAVE: "mouseleave" + EVENT_KEY$6
        };
        var ClassName$6 = {
          FADE: 'fade',
          SHOW: 'show'
        };
        var Selector$6 = {
          TOOLTIP: '.tooltip',
          TOOLTIP_INNER: '.tooltip-inner',
          ARROW: '.arrow'
        };
        var Trigger = {
          HOVER: 'hover',
          FOCUS: 'focus',
          CLICK: 'click',
          MANUAL: 'manual'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tooltip =
          /*#__PURE__*/
          function () {
            function Tooltip(element, config) {
              if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
              } // private


              this._isEnabled = true;
              this._timeout = 0;
              this._hoverState = '';
              this._activeTrigger = {};
              this._popper = null; // Protected

              this.element = element;
              this.config = this._getConfig(config);
              this.tip = null;

              this._setListeners();
            } // Getters


            var _proto = Tooltip.prototype;

            // Public
            _proto.enable = function enable() {
              this._isEnabled = true;
            };

            _proto.disable = function disable() {
              this._isEnabled = false;
            };

            _proto.toggleEnabled = function toggleEnabled() {
              this._isEnabled = !this._isEnabled;
            };

            _proto.toggle = function toggle(event) {
              if (!this._isEnabled) {
                return;
              }

              if (event) {
                var dataKey = this.constructor.DATA_KEY;
                var context = $(event.currentTarget).data(dataKey);

                if (!context) {
                  context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                  $(event.currentTarget).data(dataKey, context);
                }

                context._activeTrigger.click = !context._activeTrigger.click;

                if (context._isWithActiveTrigger()) {
                  context._enter(null, context);
                } else {
                  context._leave(null, context);
                }
              } else {
                if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
                  this._leave(null, this);

                  return;
                }

                this._enter(null, this);
              }
            };

            _proto.dispose = function dispose() {
              clearTimeout(this._timeout);
              $.removeData(this.element, this.constructor.DATA_KEY);
              $(this.element).off(this.constructor.EVENT_KEY);
              $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

              if (this.tip) {
                $(this.tip).remove();
              }

              this._isEnabled = null;
              this._timeout = null;
              this._hoverState = null;
              this._activeTrigger = null;

              if (this._popper) {
                this._popper.destroy();
              }

              this._popper = null;
              this.element = null;
              this.config = null;
              this.tip = null;
            };

            _proto.show = function show() {
              var _this = this;

              if ($(this.element).css('display') === 'none') {
                throw new Error('Please use show on visible elements');
              }

              var showEvent = $.Event(this.constructor.Event.SHOW);

              if (this.isWithContent() && this._isEnabled) {
                $(this.element).trigger(showEvent);
                var shadowRoot = Util.findShadowRoot(this.element);
                var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

                if (showEvent.isDefaultPrevented() || !isInTheDom) {
                  return;
                }

                var tip = this.getTipElement();
                var tipId = Util.getUID(this.constructor.NAME);
                tip.setAttribute('id', tipId);
                this.element.setAttribute('aria-describedby', tipId);
                this.setContent();

                if (this.config.animation) {
                  $(tip).addClass(ClassName$6.FADE);
                }

                var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                var attachment = this._getAttachment(placement);

                this.addAttachmentClass(attachment);

                var container = this._getContainer();

                $(tip).data(this.constructor.DATA_KEY, this);

                if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                  $(tip).appendTo(container);
                }

                $(this.element).trigger(this.constructor.Event.INSERTED);
                this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
                $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
                // empty mouseover listeners to the body's immediate children;
                // only needed because of broken event delegation on iOS
                // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

                if ('ontouchstart' in document.documentElement) {
                  $(document.body).children().on('mouseover', null, $.noop);
                }

                var complete = function complete() {
                  if (_this.config.animation) {
                    _this._fixTransition();
                  }

                  var prevHoverState = _this._hoverState;
                  _this._hoverState = null;
                  $(_this.element).trigger(_this.constructor.Event.SHOWN);

                  if (prevHoverState === HoverState.OUT) {
                    _this._leave(null, _this);
                  }
                };

                if ($(this.tip).hasClass(ClassName$6.FADE)) {
                  var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
                  $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                  complete();
                }
              }
            };

            _proto.hide = function hide(callback) {
              var _this2 = this;

              var tip = this.getTipElement();
              var hideEvent = $.Event(this.constructor.Event.HIDE);

              var complete = function complete() {
                if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
                  tip.parentNode.removeChild(tip);
                }

                _this2._cleanTipClass();

                _this2.element.removeAttribute('aria-describedby');

                $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

                if (_this2._popper !== null) {
                  _this2._popper.destroy();
                }

                if (callback) {
                  callback();
                }
              };

              $(this.element).trigger(hideEvent);

              if (hideEvent.isDefaultPrevented()) {
                return;
              }

              $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
              // empty mouseover listeners we added for iOS support

              if ('ontouchstart' in document.documentElement) {
                $(document.body).children().off('mouseover', null, $.noop);
              }

              this._activeTrigger[Trigger.CLICK] = false;
              this._activeTrigger[Trigger.FOCUS] = false;
              this._activeTrigger[Trigger.HOVER] = false;

              if ($(this.tip).hasClass(ClassName$6.FADE)) {
                var transitionDuration = Util.getTransitionDurationFromElement(tip);
                $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
              } else {
                complete();
              }

              this._hoverState = '';
            };

            _proto.update = function update() {
              if (this._popper !== null) {
                this._popper.scheduleUpdate();
              }
            } // Protected
              ;

            _proto.isWithContent = function isWithContent() {
              return Boolean(this.getTitle());
            };

            _proto.addAttachmentClass = function addAttachmentClass(attachment) {
              $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
            };

            _proto.getTipElement = function getTipElement() {
              this.tip = this.tip || $(this.config.template)[0];
              return this.tip;
            };

            _proto.setContent = function setContent() {
              var tip = this.getTipElement();
              this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
              $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
            };

            _proto.setElementContent = function setElementContent($element, content) {
              if (typeof content === 'object' && (content.nodeType || content.jquery)) {
                // Content is a DOM node or a jQuery
                if (this.config.html) {
                  if (!$(content).parent().is($element)) {
                    $element.empty().append(content);
                  }
                } else {
                  $element.text($(content).text());
                }

                return;
              }

              if (this.config.html) {
                if (this.config.sanitize) {
                  content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
                }

                $element.html(content);
              } else {
                $element.text(content);
              }
            };

            _proto.getTitle = function getTitle() {
              var title = this.element.getAttribute('data-original-title');

              if (!title) {
                title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
              }

              return title;
            } // Private
              ;

            _proto._getPopperConfig = function _getPopperConfig(attachment) {
              var _this3 = this;

              var defaultBsConfig = {
                placement: attachment,
                modifiers: {
                  offset: this._getOffset(),
                  flip: {
                    behavior: this.config.fallbackPlacement
                  },
                  arrow: {
                    element: Selector$6.ARROW
                  },
                  preventOverflow: {
                    boundariesElement: this.config.boundary
                  }
                },
                onCreate: function onCreate(data) {
                  if (data.originalPlacement !== data.placement) {
                    _this3._handlePopperPlacementChange(data);
                  }
                },
                onUpdate: function onUpdate(data) {
                  return _this3._handlePopperPlacementChange(data);
                }
              };
              return _objectSpread2({}, defaultBsConfig, {}, this.config.popperConfig);
            };

            _proto._getOffset = function _getOffset() {
              var _this4 = this;

              var offset = {};

              if (typeof this.config.offset === 'function') {
                offset.fn = function (data) {
                  data.offsets = _objectSpread2({}, data.offsets, {}, _this4.config.offset(data.offsets, _this4.element) || {});
                  return data;
                };
              } else {
                offset.offset = this.config.offset;
              }

              return offset;
            };

            _proto._getContainer = function _getContainer() {
              if (this.config.container === false) {
                return document.body;
              }

              if (Util.isElement(this.config.container)) {
                return $(this.config.container);
              }

              return $(document).find(this.config.container);
            };

            _proto._getAttachment = function _getAttachment(placement) {
              return AttachmentMap$1[placement.toUpperCase()];
            };

            _proto._setListeners = function _setListeners() {
              var _this5 = this;

              var triggers = this.config.trigger.split(' ');
              triggers.forEach(function (trigger) {
                if (trigger === 'click') {
                  $(_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
                    return _this5.toggle(event);
                  });
                } else if (trigger !== Trigger.MANUAL) {
                  var eventIn = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
                  var eventOut = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
                  $(_this5.element).on(eventIn, _this5.config.selector, function (event) {
                    return _this5._enter(event);
                  }).on(eventOut, _this5.config.selector, function (event) {
                    return _this5._leave(event);
                  });
                }
              });

              this._hideModalHandler = function () {
                if (_this5.element) {
                  _this5.hide();
                }
              };

              $(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

              if (this.config.selector) {
                this.config = _objectSpread2({}, this.config, {
                  trigger: 'manual',
                  selector: ''
                });
              } else {
                this._fixTitle();
              }
            };

            _proto._fixTitle = function _fixTitle() {
              var titleType = typeof this.element.getAttribute('data-original-title');

              if (this.element.getAttribute('title') || titleType !== 'string') {
                this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                this.element.setAttribute('title', '');
              }
            };

            _proto._enter = function _enter(event, context) {
              var dataKey = this.constructor.DATA_KEY;
              context = context || $(event.currentTarget).data(dataKey);

              if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
              }

              if (event) {
                context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
              }

              if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
                context._hoverState = HoverState.SHOW;
                return;
              }

              clearTimeout(context._timeout);
              context._hoverState = HoverState.SHOW;

              if (!context.config.delay || !context.config.delay.show) {
                context.show();
                return;
              }

              context._timeout = setTimeout(function () {
                if (context._hoverState === HoverState.SHOW) {
                  context.show();
                }
              }, context.config.delay.show);
            };

            _proto._leave = function _leave(event, context) {
              var dataKey = this.constructor.DATA_KEY;
              context = context || $(event.currentTarget).data(dataKey);

              if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
              }

              if (event) {
                context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
              }

              if (context._isWithActiveTrigger()) {
                return;
              }

              clearTimeout(context._timeout);
              context._hoverState = HoverState.OUT;

              if (!context.config.delay || !context.config.delay.hide) {
                context.hide();
                return;
              }

              context._timeout = setTimeout(function () {
                if (context._hoverState === HoverState.OUT) {
                  context.hide();
                }
              }, context.config.delay.hide);
            };

            _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
              for (var trigger in this._activeTrigger) {
                if (this._activeTrigger[trigger]) {
                  return true;
                }
              }

              return false;
            };

            _proto._getConfig = function _getConfig(config) {
              var dataAttributes = $(this.element).data();
              Object.keys(dataAttributes).forEach(function (dataAttr) {
                if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
                  delete dataAttributes[dataAttr];
                }
              });
              config = _objectSpread2({}, this.constructor.Default, {}, dataAttributes, {}, typeof config === 'object' && config ? config : {});

              if (typeof config.delay === 'number') {
                config.delay = {
                  show: config.delay,
                  hide: config.delay
                };
              }

              if (typeof config.title === 'number') {
                config.title = config.title.toString();
              }

              if (typeof config.content === 'number') {
                config.content = config.content.toString();
              }

              Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

              if (config.sanitize) {
                config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
              }

              return config;
            };

            _proto._getDelegateConfig = function _getDelegateConfig() {
              var config = {};

              if (this.config) {
                for (var key in this.config) {
                  if (this.constructor.Default[key] !== this.config[key]) {
                    config[key] = this.config[key];
                  }
                }
              }

              return config;
            };

            _proto._cleanTipClass = function _cleanTipClass() {
              var $tip = $(this.getTipElement());
              var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

              if (tabClass !== null && tabClass.length) {
                $tip.removeClass(tabClass.join(''));
              }
            };

            _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
              var popperInstance = popperData.instance;
              this.tip = popperInstance.popper;

              this._cleanTipClass();

              this.addAttachmentClass(this._getAttachment(popperData.placement));
            };

            _proto._fixTransition = function _fixTransition() {
              var tip = this.getTipElement();
              var initConfigAnimation = this.config.animation;

              if (tip.getAttribute('x-placement') !== null) {
                return;
              }

              $(tip).removeClass(ClassName$6.FADE);
              this.config.animation = false;
              this.hide();
              this.show();
              this.config.animation = initConfigAnimation;
            } // Static
              ;

            Tooltip._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$6);

                var _config = typeof config === 'object' && config;

                if (!data && /dispose|hide/.test(config)) {
                  return;
                }

                if (!data) {
                  data = new Tooltip(this, _config);
                  $(this).data(DATA_KEY$6, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config]();
                }
              });
            };

            _createClass(Tooltip, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$6;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$4;
              }
            }, {
              key: "NAME",
              get: function get() {
                return NAME$6;
              }
            }, {
              key: "DATA_KEY",
              get: function get() {
                return DATA_KEY$6;
              }
            }, {
              key: "Event",
              get: function get() {
                return Event$6;
              }
            }, {
              key: "EVENT_KEY",
              get: function get() {
                return EVENT_KEY$6;
              }
            }, {
              key: "DefaultType",
              get: function get() {
                return DefaultType$4;
              }
            }]);

            return Tooltip;
          }();
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */


        $.fn[NAME$6] = Tooltip._jQueryInterface;
        $.fn[NAME$6].Constructor = Tooltip;

        $.fn[NAME$6].noConflict = function () {
          $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
          return Tooltip._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$7 = 'popover';
        var VERSION$7 = '4.4.1';
        var DATA_KEY$7 = 'bs.popover';
        var EVENT_KEY$7 = "." + DATA_KEY$7;
        var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
        var CLASS_PREFIX$1 = 'bs-popover';
        var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

        var Default$5 = _objectSpread2({}, Tooltip.Default, {
          placement: 'right',
          trigger: 'click',
          content: '',
          template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
        });

        var DefaultType$5 = _objectSpread2({}, Tooltip.DefaultType, {
          content: '(string|element|function)'
        });

        var ClassName$7 = {
          FADE: 'fade',
          SHOW: 'show'
        };
        var Selector$7 = {
          TITLE: '.popover-header',
          CONTENT: '.popover-body'
        };
        var Event$7 = {
          HIDE: "hide" + EVENT_KEY$7,
          HIDDEN: "hidden" + EVENT_KEY$7,
          SHOW: "show" + EVENT_KEY$7,
          SHOWN: "shown" + EVENT_KEY$7,
          INSERTED: "inserted" + EVENT_KEY$7,
          CLICK: "click" + EVENT_KEY$7,
          FOCUSIN: "focusin" + EVENT_KEY$7,
          FOCUSOUT: "focusout" + EVENT_KEY$7,
          MOUSEENTER: "mouseenter" + EVENT_KEY$7,
          MOUSELEAVE: "mouseleave" + EVENT_KEY$7
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Popover =
          /*#__PURE__*/
          function (_Tooltip) {
            _inheritsLoose(Popover, _Tooltip);

            function Popover() {
              return _Tooltip.apply(this, arguments) || this;
            }

            var _proto = Popover.prototype;

            // Overrides
            _proto.isWithContent = function isWithContent() {
              return this.getTitle() || this._getContent();
            };

            _proto.addAttachmentClass = function addAttachmentClass(attachment) {
              $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
            };

            _proto.getTipElement = function getTipElement() {
              this.tip = this.tip || $(this.config.template)[0];
              return this.tip;
            };

            _proto.setContent = function setContent() {
              var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

              this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

              var content = this._getContent();

              if (typeof content === 'function') {
                content = content.call(this.element);
              }

              this.setElementContent($tip.find(Selector$7.CONTENT), content);
              $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
            } // Private
              ;

            _proto._getContent = function _getContent() {
              return this.element.getAttribute('data-content') || this.config.content;
            };

            _proto._cleanTipClass = function _cleanTipClass() {
              var $tip = $(this.getTipElement());
              var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

              if (tabClass !== null && tabClass.length > 0) {
                $tip.removeClass(tabClass.join(''));
              }
            } // Static
              ;

            Popover._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$7);

                var _config = typeof config === 'object' ? config : null;

                if (!data && /dispose|hide/.test(config)) {
                  return;
                }

                if (!data) {
                  data = new Popover(this, _config);
                  $(this).data(DATA_KEY$7, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config]();
                }
              });
            };

            _createClass(Popover, null, [{
              key: "VERSION",
              // Getters
              get: function get() {
                return VERSION$7;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$5;
              }
            }, {
              key: "NAME",
              get: function get() {
                return NAME$7;
              }
            }, {
              key: "DATA_KEY",
              get: function get() {
                return DATA_KEY$7;
              }
            }, {
              key: "Event",
              get: function get() {
                return Event$7;
              }
            }, {
              key: "EVENT_KEY",
              get: function get() {
                return EVENT_KEY$7;
              }
            }, {
              key: "DefaultType",
              get: function get() {
                return DefaultType$5;
              }
            }]);

            return Popover;
          }(Tooltip);
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */


        $.fn[NAME$7] = Popover._jQueryInterface;
        $.fn[NAME$7].Constructor = Popover;

        $.fn[NAME$7].noConflict = function () {
          $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
          return Popover._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$8 = 'scrollspy';
        var VERSION$8 = '4.4.1';
        var DATA_KEY$8 = 'bs.scrollspy';
        var EVENT_KEY$8 = "." + DATA_KEY$8;
        var DATA_API_KEY$6 = '.data-api';
        var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
        var Default$6 = {
          offset: 10,
          method: 'auto',
          target: ''
        };
        var DefaultType$6 = {
          offset: 'number',
          method: 'string',
          target: '(string|element)'
        };
        var Event$8 = {
          ACTIVATE: "activate" + EVENT_KEY$8,
          SCROLL: "scroll" + EVENT_KEY$8,
          LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
        };
        var ClassName$8 = {
          DROPDOWN_ITEM: 'dropdown-item',
          DROPDOWN_MENU: 'dropdown-menu',
          ACTIVE: 'active'
        };
        var Selector$8 = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: '.active',
          NAV_LIST_GROUP: '.nav, .list-group',
          NAV_LINKS: '.nav-link',
          NAV_ITEMS: '.nav-item',
          LIST_ITEMS: '.list-group-item',
          DROPDOWN: '.dropdown',
          DROPDOWN_ITEMS: '.dropdown-item',
          DROPDOWN_TOGGLE: '.dropdown-toggle'
        };
        var OffsetMethod = {
          OFFSET: 'offset',
          POSITION: 'position'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var ScrollSpy =
          /*#__PURE__*/
          function () {
            function ScrollSpy(element, config) {
              var _this = this;

              this._element = element;
              this._scrollElement = element.tagName === 'BODY' ? window : element;
              this._config = this._getConfig(config);
              this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
              this._offsets = [];
              this._targets = [];
              this._activeTarget = null;
              this._scrollHeight = 0;
              $(this._scrollElement).on(Event$8.SCROLL, function (event) {
                return _this._process(event);
              });
              this.refresh();

              this._process();
            } // Getters


            var _proto = ScrollSpy.prototype;

            // Public
            _proto.refresh = function refresh() {
              var _this2 = this;

              var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
              var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
              var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
              this._offsets = [];
              this._targets = [];
              this._scrollHeight = this._getScrollHeight();
              var targets = [].slice.call(document.querySelectorAll(this._selector));
              targets.map(function (element) {
                var target;
                var targetSelector = Util.getSelectorFromElement(element);

                if (targetSelector) {
                  target = document.querySelector(targetSelector);
                }

                if (target) {
                  var targetBCR = target.getBoundingClientRect();

                  if (targetBCR.width || targetBCR.height) {
                    // TODO (fat): remove sketch reliance on jQuery position/offset
                    return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                  }
                }

                return null;
              }).filter(function (item) {
                return item;
              }).sort(function (a, b) {
                return a[0] - b[0];
              }).forEach(function (item) {
                _this2._offsets.push(item[0]);

                _this2._targets.push(item[1]);
              });
            };

            _proto.dispose = function dispose() {
              $.removeData(this._element, DATA_KEY$8);
              $(this._scrollElement).off(EVENT_KEY$8);
              this._element = null;
              this._scrollElement = null;
              this._config = null;
              this._selector = null;
              this._offsets = null;
              this._targets = null;
              this._activeTarget = null;
              this._scrollHeight = null;
            } // Private
              ;

            _proto._getConfig = function _getConfig(config) {
              config = _objectSpread2({}, Default$6, {}, typeof config === 'object' && config ? config : {});

              if (typeof config.target !== 'string') {
                var id = $(config.target).attr('id');

                if (!id) {
                  id = Util.getUID(NAME$8);
                  $(config.target).attr('id', id);
                }

                config.target = "#" + id;
              }

              Util.typeCheckConfig(NAME$8, config, DefaultType$6);
              return config;
            };

            _proto._getScrollTop = function _getScrollTop() {
              return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
            };

            _proto._getScrollHeight = function _getScrollHeight() {
              return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            };

            _proto._getOffsetHeight = function _getOffsetHeight() {
              return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
            };

            _proto._process = function _process() {
              var scrollTop = this._getScrollTop() + this._config.offset;

              var scrollHeight = this._getScrollHeight();

              var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

              if (this._scrollHeight !== scrollHeight) {
                this.refresh();
              }

              if (scrollTop >= maxScroll) {
                var target = this._targets[this._targets.length - 1];

                if (this._activeTarget !== target) {
                  this._activate(target);
                }

                return;
              }

              if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                this._activeTarget = null;

                this._clear();

                return;
              }

              var offsetLength = this._offsets.length;

              for (var i = offsetLength; i--;) {
                var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

                if (isActiveTarget) {
                  this._activate(this._targets[i]);
                }
              }
            };

            _proto._activate = function _activate(target) {
              this._activeTarget = target;

              this._clear();

              var queries = this._selector.split(',').map(function (selector) {
                return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
              });

              var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

              if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
                $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
                $link.addClass(ClassName$8.ACTIVE);
              } else {
                // Set triggered link as active
                $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
                // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

                $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

                $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
              }

              $(this._scrollElement).trigger(Event$8.ACTIVATE, {
                relatedTarget: target
              });
            };

            _proto._clear = function _clear() {
              [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
                return node.classList.contains(ClassName$8.ACTIVE);
              }).forEach(function (node) {
                return node.classList.remove(ClassName$8.ACTIVE);
              });
            } // Static
              ;

            ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY$8);

                var _config = typeof config === 'object' && config;

                if (!data) {
                  data = new ScrollSpy(this, _config);
                  $(this).data(DATA_KEY$8, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config]();
                }
              });
            };

            _createClass(ScrollSpy, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$8;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$6;
              }
            }]);

            return ScrollSpy;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(window).on(Event$8.LOAD_DATA_API, function () {
          var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
          var scrollSpysLength = scrollSpys.length;

          for (var i = scrollSpysLength; i--;) {
            var $spy = $(scrollSpys[i]);

            ScrollSpy._jQueryInterface.call($spy, $spy.data());
          }
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$8] = ScrollSpy._jQueryInterface;
        $.fn[NAME$8].Constructor = ScrollSpy;

        $.fn[NAME$8].noConflict = function () {
          $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
          return ScrollSpy._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$9 = 'tab';
        var VERSION$9 = '4.4.1';
        var DATA_KEY$9 = 'bs.tab';
        var EVENT_KEY$9 = "." + DATA_KEY$9;
        var DATA_API_KEY$7 = '.data-api';
        var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
        var Event$9 = {
          HIDE: "hide" + EVENT_KEY$9,
          HIDDEN: "hidden" + EVENT_KEY$9,
          SHOW: "show" + EVENT_KEY$9,
          SHOWN: "shown" + EVENT_KEY$9,
          CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
        };
        var ClassName$9 = {
          DROPDOWN_MENU: 'dropdown-menu',
          ACTIVE: 'active',
          DISABLED: 'disabled',
          FADE: 'fade',
          SHOW: 'show'
        };
        var Selector$9 = {
          DROPDOWN: '.dropdown',
          NAV_LIST_GROUP: '.nav, .list-group',
          ACTIVE: '.active',
          ACTIVE_UL: '> li > .active',
          DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
          DROPDOWN_TOGGLE: '.dropdown-toggle',
          DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tab =
          /*#__PURE__*/
          function () {
            function Tab(element) {
              this._element = element;
            } // Getters


            var _proto = Tab.prototype;

            // Public
            _proto.show = function show() {
              var _this = this;

              if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
                return;
              }

              var target;
              var previous;
              var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
              var selector = Util.getSelectorFromElement(this._element);

              if (listElement) {
                var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
                previous = $.makeArray($(listElement).find(itemSelector));
                previous = previous[previous.length - 1];
              }

              var hideEvent = $.Event(Event$9.HIDE, {
                relatedTarget: this._element
              });
              var showEvent = $.Event(Event$9.SHOW, {
                relatedTarget: previous
              });

              if (previous) {
                $(previous).trigger(hideEvent);
              }

              $(this._element).trigger(showEvent);

              if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                return;
              }

              if (selector) {
                target = document.querySelector(selector);
              }

              this._activate(this._element, listElement);

              var complete = function complete() {
                var hiddenEvent = $.Event(Event$9.HIDDEN, {
                  relatedTarget: _this._element
                });
                var shownEvent = $.Event(Event$9.SHOWN, {
                  relatedTarget: previous
                });
                $(previous).trigger(hiddenEvent);
                $(_this._element).trigger(shownEvent);
              };

              if (target) {
                this._activate(target, target.parentNode, complete);
              } else {
                complete();
              }
            };

            _proto.dispose = function dispose() {
              $.removeData(this._element, DATA_KEY$9);
              this._element = null;
            } // Private
              ;

            _proto._activate = function _activate(element, container, callback) {
              var _this2 = this;

              var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
              var active = activeElements[0];
              var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

              var complete = function complete() {
                return _this2._transitionComplete(element, active, callback);
              };

              if (active && isTransitioning) {
                var transitionDuration = Util.getTransitionDurationFromElement(active);
                $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
              } else {
                complete();
              }
            };

            _proto._transitionComplete = function _transitionComplete(element, active, callback) {
              if (active) {
                $(active).removeClass(ClassName$9.ACTIVE);
                var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

                if (dropdownChild) {
                  $(dropdownChild).removeClass(ClassName$9.ACTIVE);
                }

                if (active.getAttribute('role') === 'tab') {
                  active.setAttribute('aria-selected', false);
                }
              }

              $(element).addClass(ClassName$9.ACTIVE);

              if (element.getAttribute('role') === 'tab') {
                element.setAttribute('aria-selected', true);
              }

              Util.reflow(element);

              if (element.classList.contains(ClassName$9.FADE)) {
                element.classList.add(ClassName$9.SHOW);
              }

              if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
                var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

                if (dropdownElement) {
                  var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
                  $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
                }

                element.setAttribute('aria-expanded', true);
              }

              if (callback) {
                callback();
              }
            } // Static
              ;

            Tab._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY$9);

                if (!data) {
                  data = new Tab(this);
                  $this.data(DATA_KEY$9, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config]();
                }
              });
            };

            _createClass(Tab, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$9;
              }
            }]);

            return Tab;
          }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
          event.preventDefault();

          Tab._jQueryInterface.call($(this), 'show');
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME$9] = Tab._jQueryInterface;
        $.fn[NAME$9].Constructor = Tab;

        $.fn[NAME$9].noConflict = function () {
          $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
          return Tab._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME$a = 'toast';
        var VERSION$a = '4.4.1';
        var DATA_KEY$a = 'bs.toast';
        var EVENT_KEY$a = "." + DATA_KEY$a;
        var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
        var Event$a = {
          CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
          HIDE: "hide" + EVENT_KEY$a,
          HIDDEN: "hidden" + EVENT_KEY$a,
          SHOW: "show" + EVENT_KEY$a,
          SHOWN: "shown" + EVENT_KEY$a
        };
        var ClassName$a = {
          FADE: 'fade',
          HIDE: 'hide',
          SHOW: 'show',
          SHOWING: 'showing'
        };
        var DefaultType$7 = {
          animation: 'boolean',
          autohide: 'boolean',
          delay: 'number'
        };
        var Default$7 = {
          animation: true,
          autohide: true,
          delay: 500
        };
        var Selector$a = {
          DATA_DISMISS: '[data-dismiss="toast"]'
        };
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Toast =
          /*#__PURE__*/
          function () {
            function Toast(element, config) {
              this._element = element;
              this._config = this._getConfig(config);
              this._timeout = null;

              this._setListeners();
            } // Getters


            var _proto = Toast.prototype;

            // Public
            _proto.show = function show() {
              var _this = this;

              var showEvent = $.Event(Event$a.SHOW);
              $(this._element).trigger(showEvent);

              if (showEvent.isDefaultPrevented()) {
                return;
              }

              if (this._config.animation) {
                this._element.classList.add(ClassName$a.FADE);
              }

              var complete = function complete() {
                _this._element.classList.remove(ClassName$a.SHOWING);

                _this._element.classList.add(ClassName$a.SHOW);

                $(_this._element).trigger(Event$a.SHOWN);

                if (_this._config.autohide) {
                  _this._timeout = setTimeout(function () {
                    _this.hide();
                  }, _this._config.delay);
                }
              };

              this._element.classList.remove(ClassName$a.HIDE);

              Util.reflow(this._element);

              this._element.classList.add(ClassName$a.SHOWING);

              if (this._config.animation) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
              } else {
                complete();
              }
            };

            _proto.hide = function hide() {
              if (!this._element.classList.contains(ClassName$a.SHOW)) {
                return;
              }

              var hideEvent = $.Event(Event$a.HIDE);
              $(this._element).trigger(hideEvent);

              if (hideEvent.isDefaultPrevented()) {
                return;
              }

              this._close();
            };

            _proto.dispose = function dispose() {
              clearTimeout(this._timeout);
              this._timeout = null;

              if (this._element.classList.contains(ClassName$a.SHOW)) {
                this._element.classList.remove(ClassName$a.SHOW);
              }

              $(this._element).off(Event$a.CLICK_DISMISS);
              $.removeData(this._element, DATA_KEY$a);
              this._element = null;
              this._config = null;
            } // Private
              ;

            _proto._getConfig = function _getConfig(config) {
              config = _objectSpread2({}, Default$7, {}, $(this._element).data(), {}, typeof config === 'object' && config ? config : {});
              Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
              return config;
            };

            _proto._setListeners = function _setListeners() {
              var _this2 = this;

              $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
                return _this2.hide();
              });
            };

            _proto._close = function _close() {
              var _this3 = this;

              var complete = function complete() {
                _this3._element.classList.add(ClassName$a.HIDE);

                $(_this3._element).trigger(Event$a.HIDDEN);
              };

              this._element.classList.remove(ClassName$a.SHOW);

              if (this._config.animation) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
              } else {
                complete();
              }
            } // Static
              ;

            Toast._jQueryInterface = function _jQueryInterface(config) {
              return this.each(function () {
                var $element = $(this);
                var data = $element.data(DATA_KEY$a);

                var _config = typeof config === 'object' && config;

                if (!data) {
                  data = new Toast(this, _config);
                  $element.data(DATA_KEY$a, data);
                }

                if (typeof config === 'string') {
                  if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                  }

                  data[config](this);
                }
              });
            };

            _createClass(Toast, null, [{
              key: "VERSION",
              get: function get() {
                return VERSION$a;
              }
            }, {
              key: "DefaultType",
              get: function get() {
                return DefaultType$7;
              }
            }, {
              key: "Default",
              get: function get() {
                return Default$7;
              }
            }]);

            return Toast;
          }();
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */


        $.fn[NAME$a] = Toast._jQueryInterface;
        $.fn[NAME$a].Constructor = Toast;

        $.fn[NAME$a].noConflict = function () {
          $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
          return Toast._jQueryInterface;
        };

        exports.Alert = Alert;
        exports.Button = Button;
        exports.Carousel = Carousel;
        exports.Collapse = Collapse;
        exports.Dropdown = Dropdown;
        exports.Modal = Modal;
        exports.Popover = Popover;
        exports.Scrollspy = ScrollSpy;
        exports.Tab = Tab;
        exports.Toast = Toast;
        exports.Tooltip = Tooltip;
        exports.Util = Util;

        Object.defineProperty(exports, '__esModule', { value: true });

      })));
      //# sourceMappingURL=bootstrap.js.map


      /***/
}),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function (process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

        (function (global, factory) {
          true ? module.exports = factory() :
            undefined;
        }(this, (function () {
          'use strict';

          function objectOrFunction(x) {
            var type = typeof x;
            return x !== null && (type === 'object' || type === 'function');
          }

          function isFunction(x) {
            return typeof x === 'function';
          }



          var _isArray = void 0;
          if (Array.isArray) {
            _isArray = Array.isArray;
          } else {
            _isArray = function (x) {
              return Object.prototype.toString.call(x) === '[object Array]';
            };
          }

          var isArray = _isArray;

          var len = 0;
          var vertxNext = void 0;
          var customSchedulerFn = void 0;

          var asap = function asap(callback, arg) {
            queue[len] = callback;
            queue[len + 1] = arg;
            len += 2;
            if (len === 2) {
              // If len is 2, that means that we need to schedule an async flush.
              // If additional callbacks are queued before the queue is flushed, they
              // will be processed by this flush that we are scheduling.
              if (customSchedulerFn) {
                customSchedulerFn(flush);
              } else {
                scheduleFlush();
              }
            }
          };

          function setScheduler(scheduleFn) {
            customSchedulerFn = scheduleFn;
          }

          function setAsap(asapFn) {
            asap = asapFn;
          }

          var browserWindow = typeof window !== 'undefined' ? window : undefined;
          var browserGlobal = browserWindow || {};
          var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
          var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

          // test for web worker but not in IE10
          var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

          // node
          function useNextTick() {
            // node version 0.10.x displays a deprecation warning when nextTick is used recursively
            // see https://github.com/cujojs/when/issues/410 for details
            return function () {
              return process.nextTick(flush);
            };
          }

          // vertx
          function useVertxTimer() {
            if (typeof vertxNext !== 'undefined') {
              return function () {
                vertxNext(flush);
              };
            }

            return useSetTimeout();
          }

          function useMutationObserver() {
            var iterations = 0;
            var observer = new BrowserMutationObserver(flush);
            var node = document.createTextNode('');
            observer.observe(node, { characterData: true });

            return function () {
              node.data = iterations = ++iterations % 2;
            };
          }

          // web worker
          function useMessageChannel() {
            var channel = new MessageChannel();
            channel.port1.onmessage = flush;
            return function () {
              return channel.port2.postMessage(0);
            };
          }

          function useSetTimeout() {
            // Store setTimeout reference so es6-promise will be unaffected by
            // other code modifying setTimeout (like sinon.useFakeTimers())
            var globalSetTimeout = setTimeout;
            return function () {
              return globalSetTimeout(flush, 1);
            };
          }

          var queue = new Array(1000);
          function flush() {
            for (var i = 0; i < len; i += 2) {
              var callback = queue[i];
              var arg = queue[i + 1];

              callback(arg);

              queue[i] = undefined;
              queue[i + 1] = undefined;
            }

            len = 0;
          }

          function attemptVertx() {
            try {
              var vertx = Function('return this')().require('vertx');
              vertxNext = vertx.runOnLoop || vertx.runOnContext;
              return useVertxTimer();
            } catch (e) {
              return useSetTimeout();
            }
          }

          var scheduleFlush = void 0;
          // Decide what async method to use to triggering processing of queued callbacks:
          if (isNode) {
            scheduleFlush = useNextTick();
          } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
          } else if (isWorker) {
            scheduleFlush = useMessageChannel();
          } else if (browserWindow === undefined && "function" === 'function') {
            scheduleFlush = attemptVertx();
          } else {
            scheduleFlush = useSetTimeout();
          }

          function then(onFulfillment, onRejection) {
            var parent = this;

            var child = new this.constructor(noop);

            if (child[PROMISE_ID] === undefined) {
              makePromise(child);
            }

            var _state = parent._state;


            if (_state) {
              var callback = arguments[_state - 1];
              asap(function () {
                return invokeCallback(_state, child, callback, parent._result);
              });
            } else {
              subscribe(parent, child, onFulfillment, onRejection);
            }

            return child;
          }

          /**
            `Promise.resolve` returns a promise that will become resolved with the
            passed `value`. It is shorthand for the following:
          
            ```javascript
            let promise = new Promise(function(resolve, reject){
              resolve(1);
            });
          
            promise.then(function(value){
              // value === 1
            });
            ```
          
            Instead of writing the above, your code now simply becomes the following:
          
            ```javascript
            let promise = Promise.resolve(1);
          
            promise.then(function(value){
              // value === 1
            });
            ```
          
            @method resolve
            @static
            @param {Any} value value that the returned promise will be resolved with
            Useful for tooling.
            @return {Promise} a promise that will become fulfilled with the given
            `value`
          */
          function resolve$1(object) {
            /*jshint validthis:true */
            var Constructor = this;

            if (object && typeof object === 'object' && object.constructor === Constructor) {
              return object;
            }

            var promise = new Constructor(noop);
            resolve(promise, object);
            return promise;
          }

          var PROMISE_ID = Math.random().toString(36).substring(2);

          function noop() { }

          var PENDING = void 0;
          var FULFILLED = 1;
          var REJECTED = 2;

          function selfFulfillment() {
            return new TypeError("You cannot resolve a promise with itself");
          }

          function cannotReturnOwn() {
            return new TypeError('A promises callback cannot return that same promise.');
          }

          function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
            try {
              then$$1.call(value, fulfillmentHandler, rejectionHandler);
            } catch (e) {
              return e;
            }
          }

          function handleForeignThenable(promise, thenable, then$$1) {
            asap(function (promise) {
              var sealed = false;
              var error = tryThen(then$$1, thenable, function (value) {
                if (sealed) {
                  return;
                }
                sealed = true;
                if (thenable !== value) {
                  resolve(promise, value);
                } else {
                  fulfill(promise, value);
                }
              }, function (reason) {
                if (sealed) {
                  return;
                }
                sealed = true;

                reject(promise, reason);
              }, 'Settle: ' + (promise._label || ' unknown promise'));

              if (!sealed && error) {
                sealed = true;
                reject(promise, error);
              }
            }, promise);
          }

          function handleOwnThenable(promise, thenable) {
            if (thenable._state === FULFILLED) {
              fulfill(promise, thenable._result);
            } else if (thenable._state === REJECTED) {
              reject(promise, thenable._result);
            } else {
              subscribe(thenable, undefined, function (value) {
                return resolve(promise, value);
              }, function (reason) {
                return reject(promise, reason);
              });
            }
          }

          function handleMaybeThenable(promise, maybeThenable, then$$1) {
            if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
              handleOwnThenable(promise, maybeThenable);
            } else {
              if (then$$1 === undefined) {
                fulfill(promise, maybeThenable);
              } else if (isFunction(then$$1)) {
                handleForeignThenable(promise, maybeThenable, then$$1);
              } else {
                fulfill(promise, maybeThenable);
              }
            }
          }

          function resolve(promise, value) {
            if (promise === value) {
              reject(promise, selfFulfillment());
            } else if (objectOrFunction(value)) {
              var then$$1 = void 0;
              try {
                then$$1 = value.then;
              } catch (error) {
                reject(promise, error);
                return;
              }
              handleMaybeThenable(promise, value, then$$1);
            } else {
              fulfill(promise, value);
            }
          }

          function publishRejection(promise) {
            if (promise._onerror) {
              promise._onerror(promise._result);
            }

            publish(promise);
          }

          function fulfill(promise, value) {
            if (promise._state !== PENDING) {
              return;
            }

            promise._result = value;
            promise._state = FULFILLED;

            if (promise._subscribers.length !== 0) {
              asap(publish, promise);
            }
          }

          function reject(promise, reason) {
            if (promise._state !== PENDING) {
              return;
            }
            promise._state = REJECTED;
            promise._result = reason;

            asap(publishRejection, promise);
          }

          function subscribe(parent, child, onFulfillment, onRejection) {
            var _subscribers = parent._subscribers;
            var length = _subscribers.length;


            parent._onerror = null;

            _subscribers[length] = child;
            _subscribers[length + FULFILLED] = onFulfillment;
            _subscribers[length + REJECTED] = onRejection;

            if (length === 0 && parent._state) {
              asap(publish, parent);
            }
          }

          function publish(promise) {
            var subscribers = promise._subscribers;
            var settled = promise._state;

            if (subscribers.length === 0) {
              return;
            }

            var child = void 0,
              callback = void 0,
              detail = promise._result;

            for (var i = 0; i < subscribers.length; i += 3) {
              child = subscribers[i];
              callback = subscribers[i + settled];

              if (child) {
                invokeCallback(settled, child, callback, detail);
              } else {
                callback(detail);
              }
            }

            promise._subscribers.length = 0;
          }

          function invokeCallback(settled, promise, callback, detail) {
            var hasCallback = isFunction(callback),
              value = void 0,
              error = void 0,
              succeeded = true;

            if (hasCallback) {
              try {
                value = callback(detail);
              } catch (e) {
                succeeded = false;
                error = e;
              }

              if (promise === value) {
                reject(promise, cannotReturnOwn());
                return;
              }
            } else {
              value = detail;
            }

            if (promise._state !== PENDING) {
              // noop
            } else if (hasCallback && succeeded) {
              resolve(promise, value);
            } else if (succeeded === false) {
              reject(promise, error);
            } else if (settled === FULFILLED) {
              fulfill(promise, value);
            } else if (settled === REJECTED) {
              reject(promise, value);
            }
          }

          function initializePromise(promise, resolver) {
            try {
              resolver(function resolvePromise(value) {
                resolve(promise, value);
              }, function rejectPromise(reason) {
                reject(promise, reason);
              });
            } catch (e) {
              reject(promise, e);
            }
          }

          var id = 0;
          function nextId() {
            return id++;
          }

          function makePromise(promise) {
            promise[PROMISE_ID] = id++;
            promise._state = undefined;
            promise._result = undefined;
            promise._subscribers = [];
          }

          function validationError() {
            return new Error('Array Methods must be provided an Array');
          }

          var Enumerator = function () {
            function Enumerator(Constructor, input) {
              this._instanceConstructor = Constructor;
              this.promise = new Constructor(noop);

              if (!this.promise[PROMISE_ID]) {
                makePromise(this.promise);
              }

              if (isArray(input)) {
                this.length = input.length;
                this._remaining = input.length;

                this._result = new Array(this.length);

                if (this.length === 0) {
                  fulfill(this.promise, this._result);
                } else {
                  this.length = this.length || 0;
                  this._enumerate(input);
                  if (this._remaining === 0) {
                    fulfill(this.promise, this._result);
                  }
                }
              } else {
                reject(this.promise, validationError());
              }
            }

            Enumerator.prototype._enumerate = function _enumerate(input) {
              for (var i = 0; this._state === PENDING && i < input.length; i++) {
                this._eachEntry(input[i], i);
              }
            };

            Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
              var c = this._instanceConstructor;
              var resolve$$1 = c.resolve;


              if (resolve$$1 === resolve$1) {
                var _then = void 0;
                var error = void 0;
                var didError = false;
                try {
                  _then = entry.then;
                } catch (e) {
                  didError = true;
                  error = e;
                }

                if (_then === then && entry._state !== PENDING) {
                  this._settledAt(entry._state, i, entry._result);
                } else if (typeof _then !== 'function') {
                  this._remaining--;
                  this._result[i] = entry;
                } else if (c === Promise$1) {
                  var promise = new c(noop);
                  if (didError) {
                    reject(promise, error);
                  } else {
                    handleMaybeThenable(promise, entry, _then);
                  }
                  this._willSettleAt(promise, i);
                } else {
                  this._willSettleAt(new c(function (resolve$$1) {
                    return resolve$$1(entry);
                  }), i);
                }
              } else {
                this._willSettleAt(resolve$$1(entry), i);
              }
            };

            Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
              var promise = this.promise;


              if (promise._state === PENDING) {
                this._remaining--;

                if (state === REJECTED) {
                  reject(promise, value);
                } else {
                  this._result[i] = value;
                }
              }

              if (this._remaining === 0) {
                fulfill(promise, this._result);
              }
            };

            Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
              var enumerator = this;

              subscribe(promise, undefined, function (value) {
                return enumerator._settledAt(FULFILLED, i, value);
              }, function (reason) {
                return enumerator._settledAt(REJECTED, i, reason);
              });
            };

            return Enumerator;
          }();

          /**
            `Promise.all` accepts an array of promises, and returns a new promise which
            is fulfilled with an array of fulfillment values for the passed promises, or
            rejected with the reason of the first passed promise to be rejected. It casts all
            elements of the passed iterable to promises as it runs this algorithm.
          
            Example:
          
            ```javascript
            let promise1 = resolve(1);
            let promise2 = resolve(2);
            let promise3 = resolve(3);
            let promises = [ promise1, promise2, promise3 ];
          
            Promise.all(promises).then(function(array){
              // The array here would be [ 1, 2, 3 ];
            });
            ```
          
            If any of the `promises` given to `all` are rejected, the first promise
            that is rejected will be given as an argument to the returned promises's
            rejection handler. For example:
          
            Example:
          
            ```javascript
            let promise1 = resolve(1);
            let promise2 = reject(new Error("2"));
            let promise3 = reject(new Error("3"));
            let promises = [ promise1, promise2, promise3 ];
          
            Promise.all(promises).then(function(array){
              // Code here never runs because there are rejected promises!
            }, function(error) {
              // error.message === "2"
            });
            ```
          
            @method all
            @static
            @param {Array} entries array of promises
            @param {String} label optional string for labeling the promise.
            Useful for tooling.
            @return {Promise} promise that is fulfilled when all `promises` have been
            fulfilled, or rejected if any of them become rejected.
            @static
          */
          function all(entries) {
            return new Enumerator(this, entries).promise;
          }

          /**
            `Promise.race` returns a new promise which is settled in the same way as the
            first passed promise to settle.
          
            Example:
          
            ```javascript
            let promise1 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 1');
              }, 200);
            });
          
            let promise2 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 2');
              }, 100);
            });
          
            Promise.race([promise1, promise2]).then(function(result){
              // result === 'promise 2' because it was resolved before promise1
              // was resolved.
            });
            ```
          
            `Promise.race` is deterministic in that only the state of the first
            settled promise matters. For example, even if other promises given to the
            `promises` array argument are resolved, but the first settled promise has
            become rejected before the other promises became fulfilled, the returned
            promise will become rejected:
          
            ```javascript
            let promise1 = new Promise(function(resolve, reject){
              setTimeout(function(){
                resolve('promise 1');
              }, 200);
            });
          
            let promise2 = new Promise(function(resolve, reject){
              setTimeout(function(){
                reject(new Error('promise 2'));
              }, 100);
            });
          
            Promise.race([promise1, promise2]).then(function(result){
              // Code here never runs
            }, function(reason){
              // reason.message === 'promise 2' because promise 2 became rejected before
              // promise 1 became fulfilled
            });
            ```
          
            An example real-world use case is implementing timeouts:
          
            ```javascript
            Promise.race([ajax('foo.json'), timeout(5000)])
            ```
          
            @method race
            @static
            @param {Array} promises array of promises to observe
            Useful for tooling.
            @return {Promise} a promise which settles in the same way as the first passed
            promise to settle.
          */
          function race(entries) {
            /*jshint validthis:true */
            var Constructor = this;

            if (!isArray(entries)) {
              return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
              });
            } else {
              return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                  Constructor.resolve(entries[i]).then(resolve, reject);
                }
              });
            }
          }

          /**
            `Promise.reject` returns a promise rejected with the passed `reason`.
            It is shorthand for the following:
          
            ```javascript
            let promise = new Promise(function(resolve, reject){
              reject(new Error('WHOOPS'));
            });
          
            promise.then(function(value){
              // Code here doesn't run because the promise is rejected!
            }, function(reason){
              // reason.message === 'WHOOPS'
            });
            ```
          
            Instead of writing the above, your code now simply becomes the following:
          
            ```javascript
            let promise = Promise.reject(new Error('WHOOPS'));
          
            promise.then(function(value){
              // Code here doesn't run because the promise is rejected!
            }, function(reason){
              // reason.message === 'WHOOPS'
            });
            ```
          
            @method reject
            @static
            @param {Any} reason value that the returned promise will be rejected with.
            Useful for tooling.
            @return {Promise} a promise rejected with the given `reason`.
          */
          function reject$1(reason) {
            /*jshint validthis:true */
            var Constructor = this;
            var promise = new Constructor(noop);
            reject(promise, reason);
            return promise;
          }

          function needsResolver() {
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
          }

          function needsNew() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          }

          /**
            Promise objects represent the eventual result of an asynchronous operation. The
            primary way of interacting with a promise is through its `then` method, which
            registers callbacks to receive either a promise's eventual value or the reason
            why the promise cannot be fulfilled.
          
            Terminology
            -----------
          
            - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
            - `thenable` is an object or function that defines a `then` method.
            - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
            - `exception` is a value that is thrown using the throw statement.
            - `reason` is a value that indicates why a promise was rejected.
            - `settled` the final resting state of a promise, fulfilled or rejected.
          
            A promise can be in one of three states: pending, fulfilled, or rejected.
          
            Promises that are fulfilled have a fulfillment value and are in the fulfilled
            state.  Promises that are rejected have a rejection reason and are in the
            rejected state.  A fulfillment value is never a thenable.
          
            Promises can also be said to *resolve* a value.  If this value is also a
            promise, then the original promise's settled state will match the value's
            settled state.  So a promise that *resolves* a promise that rejects will
            itself reject, and a promise that *resolves* a promise that fulfills will
            itself fulfill.
          
          
            Basic Usage:
            ------------
          
            ```js
            let promise = new Promise(function(resolve, reject) {
              // on success
              resolve(value);
          
              // on failure
              reject(reason);
            });
          
            promise.then(function(value) {
              // on fulfillment
            }, function(reason) {
              // on rejection
            });
            ```
          
            Advanced Usage:
            ---------------
          
            Promises shine when abstracting away asynchronous interactions such as
            `XMLHttpRequest`s.
          
            ```js
            function getJSON(url) {
              return new Promise(function(resolve, reject){
                let xhr = new XMLHttpRequest();
          
                xhr.open('GET', url);
                xhr.onreadystatechange = handler;
                xhr.responseType = 'json';
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send();
          
                function handler() {
                  if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                      resolve(this.response);
                    } else {
                      reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
                    }
                  }
                };
              });
            }
          
            getJSON('/posts.json').then(function(json) {
              // on fulfillment
            }, function(reason) {
              // on rejection
            });
            ```
          
            Unlike callbacks, promises are great composable primitives.
          
            ```js
            Promise.all([
              getJSON('/posts'),
              getJSON('/comments')
            ]).then(function(values){
              values[0] // => postsJSON
              values[1] // => commentsJSON
          
              return values;
            });
            ```
          
            @class Promise
            @param {Function} resolver
            Useful for tooling.
            @constructor
          */

          var Promise$1 = function () {
            function Promise(resolver) {
              this[PROMISE_ID] = nextId();
              this._result = this._state = undefined;
              this._subscribers = [];

              if (noop !== resolver) {
                typeof resolver !== 'function' && needsResolver();
                this instanceof Promise ? initializePromise(this, resolver) : needsNew();
              }
            }

            /**
            The primary way of interacting with a promise is through its `then` method,
            which registers callbacks to receive either a promise's eventual value or the
            reason why the promise cannot be fulfilled.
             ```js
            findUser().then(function(user){
              // user is available
            }, function(reason){
              // user is unavailable, and you are given the reason why
            });
            ```
             Chaining
            --------
             The return value of `then` is itself a promise.  This second, 'downstream'
            promise is resolved with the return value of the first promise's fulfillment
            or rejection handler, or rejected if the handler throws an exception.
             ```js
            findUser().then(function (user) {
              return user.name;
            }, function (reason) {
              return 'default name';
            }).then(function (userName) {
              // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
              // will be `'default name'`
            });
             findUser().then(function (user) {
              throw new Error('Found user, but still unhappy');
            }, function (reason) {
              throw new Error('`findUser` rejected and we're unhappy');
            }).then(function (value) {
              // never reached
            }, function (reason) {
              // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
              // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
            });
            ```
            If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
             ```js
            findUser().then(function (user) {
              throw new PedagogicalException('Upstream error');
            }).then(function (value) {
              // never reached
            }).then(function (value) {
              // never reached
            }, function (reason) {
              // The `PedgagocialException` is propagated all the way down to here
            });
            ```
             Assimilation
            ------------
             Sometimes the value you want to propagate to a downstream promise can only be
            retrieved asynchronously. This can be achieved by returning a promise in the
            fulfillment or rejection handler. The downstream promise will then be pending
            until the returned promise is settled. This is called *assimilation*.
             ```js
            findUser().then(function (user) {
              return findCommentsByAuthor(user);
            }).then(function (comments) {
              // The user's comments are now available
            });
            ```
             If the assimliated promise rejects, then the downstream promise will also reject.
             ```js
            findUser().then(function (user) {
              return findCommentsByAuthor(user);
            }).then(function (comments) {
              // If `findCommentsByAuthor` fulfills, we'll have the value here
            }, function (reason) {
              // If `findCommentsByAuthor` rejects, we'll have the reason here
            });
            ```
             Simple Example
            --------------
             Synchronous Example
             ```javascript
            let result;
             try {
              result = findResult();
              // success
            } catch(reason) {
              // failure
            }
            ```
             Errback Example
             ```js
            findResult(function(result, err){
              if (err) {
                // failure
              } else {
                // success
              }
            });
            ```
             Promise Example;
             ```javascript
            findResult().then(function(result){
              // success
            }, function(reason){
              // failure
            });
            ```
             Advanced Example
            --------------
             Synchronous Example
             ```javascript
            let author, books;
             try {
              author = findAuthor();
              books  = findBooksByAuthor(author);
              // success
            } catch(reason) {
              // failure
            }
            ```
             Errback Example
             ```js
             function foundBooks(books) {
             }
             function failure(reason) {
             }
             findAuthor(function(author, err){
              if (err) {
                failure(err);
                // failure
              } else {
                try {
                  findBoooksByAuthor(author, function(books, err) {
                    if (err) {
                      failure(err);
                    } else {
                      try {
                        foundBooks(books);
                      } catch(reason) {
                        failure(reason);
                      }
                    }
                  });
                } catch(error) {
                  failure(err);
                }
                // success
              }
            });
            ```
             Promise Example;
             ```javascript
            findAuthor().
              then(findBooksByAuthor).
              then(function(books){
                // found books
            }).catch(function(reason){
              // something went wrong
            });
            ```
             @method then
            @param {Function} onFulfilled
            @param {Function} onRejected
            Useful for tooling.
            @return {Promise}
            */

            /**
            `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
            as the catch block of a try/catch statement.
            ```js
            function findAuthor(){
            throw new Error('couldn't find that author');
            }
            // synchronous
            try {
            findAuthor();
            } catch(reason) {
            // something went wrong
            }
            // async with promises
            findAuthor().catch(function(reason){
            // something went wrong
            });
            ```
            @method catch
            @param {Function} onRejection
            Useful for tooling.
            @return {Promise}
            */


            Promise.prototype.catch = function _catch(onRejection) {
              return this.then(null, onRejection);
            };

            /**
              `finally` will be invoked regardless of the promise's fate just as native
              try/catch/finally behaves
            
              Synchronous example:
            
              ```js
              findAuthor() {
                if (Math.random() > 0.5) {
                  throw new Error();
                }
                return new Author();
              }
            
              try {
                return findAuthor(); // succeed or fail
              } catch(error) {
                return findOtherAuther();
              } finally {
                // always runs
                // doesn't affect the return value
              }
              ```
            
              Asynchronous example:
            
              ```js
              findAuthor().catch(function(reason){
                return findOtherAuther();
              }).finally(function(){
                // author was either found, or not
              });
              ```
            
              @method finally
              @param {Function} callback
              @return {Promise}
            */


            Promise.prototype.finally = function _finally(callback) {
              var promise = this;
              var constructor = promise.constructor;

              if (isFunction(callback)) {
                return promise.then(function (value) {
                  return constructor.resolve(callback()).then(function () {
                    return value;
                  });
                }, function (reason) {
                  return constructor.resolve(callback()).then(function () {
                    throw reason;
                  });
                });
              }

              return promise.then(callback, callback);
            };

            return Promise;
          }();

          Promise$1.prototype.then = then;
          Promise$1.all = all;
          Promise$1.race = race;
          Promise$1.resolve = resolve$1;
          Promise$1.reject = reject$1;
          Promise$1._setScheduler = setScheduler;
          Promise$1._setAsap = setAsap;
          Promise$1._asap = asap;

          /*global self*/
          function polyfill() {
            var local = void 0;

            if (typeof global !== 'undefined') {
              local = global;
            } else if (typeof self !== 'undefined') {
              local = self;
            } else {
              try {
                local = Function('return this')();
              } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
              }
            }

            var P = local.Promise;

            if (P) {
              var promiseToString = null;
              try {
                promiseToString = Object.prototype.toString.call(P.resolve());
              } catch (e) {
                // silently ignored
              }

              if (promiseToString === '[object Promise]' && !P.cast) {
                return;
              }
            }

            local.Promise = Promise$1;
          }

          // Strange compat..
          Promise$1.polyfill = polyfill;
          Promise$1.Promise = Promise$1;

          return Promise$1;

        })));



        //# sourceMappingURL=es6-promise.map

        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/
}),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.



      var R = typeof Reflect === 'object' ? Reflect : null
      var ReflectApply = R && typeof R.apply === 'function'
        ? R.apply
        : function ReflectApply(target, receiver, args) {
          return Function.prototype.apply.call(target, receiver, args);
        }

      var ReflectOwnKeys
      if (R && typeof R.ownKeys === 'function') {
        ReflectOwnKeys = R.ownKeys
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys(target) {
          return Object.getOwnPropertyNames(target)
            .concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys(target) {
          return Object.getOwnPropertyNames(target);
        };
      }

      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }

      var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
        return value !== value;
      }

      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;

      // Backwards-compat with node 0.10.x
      EventEmitter.EventEmitter = EventEmitter;

      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = undefined;

      // By default EventEmitters will print a warning if more than 10 listeners are
      // added to it. This is a useful default which helps finding memory leaks.
      var defaultMaxListeners = 10;

      function checkListener(listener) {
        if (typeof listener !== 'function') {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }

      Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function () {
          return defaultMaxListeners;
        },
        set: function (arg) {
          if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
          }
          defaultMaxListeners = arg;
        }
      });

      EventEmitter.init = function () {

        if (this._events === undefined ||
          this._events === Object.getPrototypeOf(this)._events) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        }

        this._maxListeners = this._maxListeners || undefined;
      };

      // Obviously not all Emitters should be limited to 10. This function allows
      // that to be increased. Set to zero for unlimited.
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
        }
        this._maxListeners = n;
        return this;
      };

      function _getMaxListeners(that) {
        if (that._maxListeners === undefined)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }

      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };

      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = (type === 'error');

        var events = this._events;
        if (events !== undefined)
          doError = (doError && events.error === undefined);
        else if (!doError)
          return false;

        // If there is no 'error' event listener then throw.
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
          }
          // At least give some kind of context to the user
          var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
          err.context = er;
          throw err; // Unhandled 'error' event
        }

        var handler = events[type];

        if (handler === undefined)
          return false;

        if (typeof handler === 'function') {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }

        return true;
      };

      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;

        checkListener(listener);

        events = target._events;
        if (events === undefined) {
          events = target._events = Object.create(null);
          target._eventsCount = 0;
        } else {
          // To avoid recursion in the case that type === "newListener"! Before
          // adding it to the listeners, first emit "newListener".
          if (events.newListener !== undefined) {
            target.emit('newListener', type,
              listener.listener ? listener.listener : listener);

            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
          }
          existing = events[type];
        }

        if (existing === undefined) {
          // Optimize the case of one listener. Don't need the extra array object.
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
              prepend ? [listener, existing] : [existing, listener];
            // If we've already got an array, just append.
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }

          // Check for listener leak
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' +
              existing.length + ' ' + String(type) + ' listeners ' +
              'added. Use emitter.setMaxListeners() to ' +
              'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }

        return target;
      }

      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener;

      EventEmitter.prototype.prependListener =
        function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };

      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }

      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }

      EventEmitter.prototype.once = function once(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };

      EventEmitter.prototype.prependOnceListener =
        function prependOnceListener(type, listener) {
          checkListener(listener);
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };

      // Emits a 'removeListener' event if and only if the listener was removed.
      EventEmitter.prototype.removeListener =
        function removeListener(type, listener) {
          var list, events, position, i, originalListener;

          checkListener(listener);

          events = this._events;
          if (events === undefined)
            return this;

          list = events[type];
          if (list === undefined)
            return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0)
              return this;

            if (position === 0)
              list.shift();
            else {
              spliceOne(list, position);
            }

            if (list.length === 1)
              events[type] = list[0];

            if (events.removeListener !== undefined)
              this.emit('removeListener', type, originalListener || listener);
          }

          return this;
        };

      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

      EventEmitter.prototype.removeAllListeners =
        function removeAllListeners(type) {
          var listeners, events, i;

          events = this._events;
          if (events === undefined)
            return this;

          // not listening for removeListener, no need to emit
          if (events.removeListener === undefined) {
            if (arguments.length === 0) {
              this._events = Object.create(null);
              this._eventsCount = 0;
            } else if (events[type] !== undefined) {
              if (--this._eventsCount === 0)
                this._events = Object.create(null);
              else
                delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

      function _listeners(target, type, unwrap) {
        var events = target._events;

        if (events === undefined)
          return [];

        var evlistener = events[type];
        if (evlistener === undefined)
          return [];

        if (typeof evlistener === 'function')
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];

        return unwrap ?
          unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }

      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };

      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };

      EventEmitter.listenerCount = function (emitter, type) {
        if (typeof emitter.listenerCount === 'function') {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };

      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;

        if (events !== undefined) {
          var evlistener = events[type];

          if (typeof evlistener === 'function') {
            return 1;
          } else if (evlistener !== undefined) {
            return evlistener.length;
          }
        }

        return 0;
      }

      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };

      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }

      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }

      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }


      /***/
}),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function (module, exports) {


      var hasOwn = Object.prototype.hasOwnProperty;
      var toString = Object.prototype.toString;

      module.exports = function forEach(obj, fn, ctx) {
        if (toString.call(fn) !== '[object Function]') {
          throw new TypeError('iterator must be a function');
        }
        var l = obj.length;
        if (l === +l) {
          for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
          }
        } else {
          for (var k in obj) {
            if (hasOwn.call(obj, k)) {
              fn.call(ctx, obj[k], k, obj);
            }
          }
        }
      };



      /***/
}),

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function (global) {
        var win;

        if (typeof window !== "undefined") {
          win = window;
        } else if (typeof global !== "undefined") {
          win = global;
        } else if (typeof self !== "undefined") {
          win = self;
        } else {
          win = {};
        }

        module.exports = win;

        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/
}),

/***/ "./node_modules/immediate/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/immediate/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      var types = [
        __webpack_require__(/*! ./nextTick */ "./node_modules/immediate/lib/nextTick.js"),
        __webpack_require__(/*! ./mutation.js */ "./node_modules/immediate/lib/mutation.js"),
        __webpack_require__(/*! ./messageChannel */ "./node_modules/immediate/lib/messageChannel.js"),
        __webpack_require__(/*! ./stateChange */ "./node_modules/immediate/lib/stateChange.js"),
        __webpack_require__(/*! ./timeout */ "./node_modules/immediate/lib/timeout.js")
      ];
      var draining;
      var currentQueue;
      var queueIndex = -1;
      var queue = [];
      var scheduled = false;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          nextTick();
        }
      }

      //named nextTick for less confusing stack traces
      function nextTick() {
        if (draining) {
          return;
        }
        scheduled = false;
        draining = true;
        var len = queue.length;
        var timeout = setTimeout(cleanUpNextTick);
        while (len) {
          currentQueue = queue;
          queue = [];
          while (currentQueue && ++queueIndex < len) {
            currentQueue[queueIndex].run();
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        queueIndex = -1;
        draining = false;
        clearTimeout(timeout);
      }
      var scheduleDrain;
      var i = -1;
      var len = types.length;
      while (++i < len) {
        if (types[i] && types[i].test && types[i].test()) {
          scheduleDrain = types[i].install(nextTick);
          break;
        }
      }
      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        var fun = this.fun;
        var array = this.array;
        switch (array.length) {
          case 0:
            return fun();
          case 1:
            return fun(array[0]);
          case 2:
            return fun(array[0], array[1]);
          case 3:
            return fun(array[0], array[1], array[2]);
          default:
            return fun.apply(null, array);
        }

      };
      module.exports = immediate;
      function immediate(task) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(task, args));
        if (!scheduled && !draining) {
          scheduled = true;
          scheduleDrain();
        }
      }


      /***/
}),

/***/ "./node_modules/immediate/lib/messageChannel.js":
/*!******************************************************!*\
  !*** ./node_modules/immediate/lib/messageChannel.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
/* WEBPACK VAR INJECTION */(function (global) {

        exports.test = function () {
          if (global.setImmediate) {
            // we can only get here in IE10
            // which doesn't handel postMessage well
            return false;
          }
          return typeof global.MessageChannel !== 'undefined';
        };

        exports.install = function (func) {
          var channel = new global.MessageChannel();
          channel.port1.onmessage = func;
          return function () {
            channel.port2.postMessage(0);
          };
        };
        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/
}),

/***/ "./node_modules/immediate/lib/mutation.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/mutation.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
/* WEBPACK VAR INJECTION */(function (global) {
        //based off rsvp https://github.com/tildeio/rsvp.js
        //license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
        //https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

        var Mutation = global.MutationObserver || global.WebKitMutationObserver;

        exports.test = function () {
          return Mutation;
        };

        exports.install = function (handle) {
          var called = 0;
          var observer = new Mutation(handle);
          var element = global.document.createTextNode('');
          observer.observe(element, {
            characterData: true
          });
          return function () {
            element.data = (called = ++called % 2);
          };
        };
        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/
}),

/***/ "./node_modules/immediate/lib/nextTick.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/nextTick.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
/* WEBPACK VAR INJECTION */(function (process) {
        exports.test = function () {
          // Don't get fooled by e.g. browserify environments.
          return (typeof process !== 'undefined') && !process.browser;
        };

        exports.install = function (func) {
          return function () {
            process.nextTick(func);
          };
        };

        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

      /***/
}),

/***/ "./node_modules/immediate/lib/stateChange.js":
/*!***************************************************!*\
  !*** ./node_modules/immediate/lib/stateChange.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
/* WEBPACK VAR INJECTION */(function (global) {

        exports.test = function () {
          return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
        };

        exports.install = function (handle) {
          return function () {

            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var scriptEl = global.document.createElement('script');
            scriptEl.onreadystatechange = function () {
              handle();

              scriptEl.onreadystatechange = null;
              scriptEl.parentNode.removeChild(scriptEl);
              scriptEl = null;
            };
            global.document.documentElement.appendChild(scriptEl);

            return handle;
          };
        };
        /* WEBPACK VAR INJECTION */
}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

      /***/
}),

/***/ "./node_modules/immediate/lib/timeout.js":
/*!***********************************************!*\
  !*** ./node_modules/immediate/lib/timeout.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      exports.test = function () {
        return true;
      };

      exports.install = function (t) {
        return function () {
          setTimeout(t, 0);
        };
      };

      /***/
}),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            })
          }
        };
      } else {
        // old school shim for old browsers
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor
            var TempCtor = function () { }
            TempCtor.prototype = superCtor.prototype
            ctor.prototype = new TempCtor()
            ctor.prototype.constructor = ctor
          }
        }
      }


      /***/
}),

/***/ "./node_modules/insert-css/index.js":
/*!******************************************!*\
  !*** ./node_modules/insert-css/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      var containers = []; // will store container HTMLElement references
      var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

      var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

      function insertCss(css, options) {
        options = options || {};

        if (css === undefined) {
          throw new Error(usage);
        }

        var position = options.prepend === true ? 'prepend' : 'append';
        var container = options.container !== undefined ? options.container : document.querySelector('head');
        var containerId = containers.indexOf(container);

        // first time we see this container, create the necessary entries
        if (containerId === -1) {
          containerId = containers.push(container) - 1;
          styleElements[containerId] = {};
        }

        // try to get the correponding container + position styleElement, create it otherwise
        var styleElement;

        if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
          styleElement = styleElements[containerId][position];
        } else {
          styleElement = styleElements[containerId][position] = createStyleElement();

          if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
          } else {
            container.appendChild(styleElement);
          }
        }

        // strip potential UTF-8 BOM if css was read from a file
        if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

        // actually add the stylesheet
        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText += css
        } else {
          styleElement.textContent += css;
        }

        return styleElement;
      };

      function createStyleElement() {
        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        return styleElement;
      }

      module.exports = insertCss;
      module.exports.insertCss = insertCss;


      /***/
}),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function (module, exports) {

      /**
       * Helpers.
       */

      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var y = d * 365.25;

      /**
       * Parse or format the given `val`.
       *
       * Options:
       *
       *  - `long` verbose formatting [false]
       *
       * @param {String|Number} val
       * @param {Object} [options]
       * @throws {Error} throw an error if val is not a non-empty string or a number
       * @return {String|Number}
       * @api public
       */

      module.exports = function (val, options) {
        options = options || {};
        var type = typeof val;
        if (type === 'string' && val.length > 0) {
          return parse(val);
        } else if (type === 'number' && isNaN(val) === false) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          'val is not a non-empty string or a valid number. val=' +
          JSON.stringify(val)
        );
      };

      /**
       * Parse the given `str` and return milliseconds.
       *
       * @param {String} str
       * @return {Number}
       * @api private
       */

      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();
        switch (type) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return n * y;
          case 'days':
          case 'day':
          case 'd':
            return n * d;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return n * h;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return n * m;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return n * s;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return n;
          default:
            return undefined;
        }
      }

      /**
       * Short format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */

      function fmtShort(ms) {
        if (ms >= d) {
          return Math.round(ms / d) + 'd';
        }
        if (ms >= h) {
          return Math.round(ms / h) + 'h';
        }
        if (ms >= m) {
          return Math.round(ms / m) + 'm';
        }
        if (ms >= s) {
          return Math.round(ms / s) + 's';
        }
        return ms + 'ms';
      }

      /**
       * Long format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */

      function fmtLong(ms) {
        return plural(ms, d, 'day') ||
          plural(ms, h, 'hour') ||
          plural(ms, m, 'minute') ||
          plural(ms, s, 'second') ||
          ms + ' ms';
      }

      /**
       * Pluralization helper.
       */

      function plural(ms, n, name) {
        if (ms < n) {
          return;
        }
        if (ms < n * 1.5) {
          return Math.floor(ms / n) + ' ' + name;
        }
        return Math.ceil(ms / n) + ' ' + name + 's';
      }


      /***/
}),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var keysShim;
      if (!Object.keys) {
        // modified from https://github.com/es-shims/es5-shim
        var has = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;
        var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
        var isEnumerable = Object.prototype.propertyIsEnumerable;
        var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
        var hasProtoEnumBug = isEnumerable.call(function () { }, 'prototype');
        var dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ];
        var equalsConstructorPrototype = function (o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        var excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        var hasAutomationEqualityBug = (function () {
          /* global window */
          if (typeof window === 'undefined') { return false; }
          for (var k in window) {
            try {
              if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                try {
                  equalsConstructorPrototype(window[k]);
                } catch (e) {
                  return true;
                }
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        }());
        var equalsConstructorPrototypeIfNotBuggy = function (o) {
          /* global window */
          if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o);
          }
          try {
            return equalsConstructorPrototype(o);
          } catch (e) {
            return false;
          }
        };

        keysShim = function keys(object) {
          var isObject = object !== null && typeof object === 'object';
          var isFunction = toStr.call(object) === '[object Function]';
          var isArguments = isArgs(object);
          var isString = isObject && toStr.call(object) === '[object String]';
          var theKeys = [];

          if (!isObject && !isFunction && !isArguments) {
            throw new TypeError('Object.keys called on a non-object');
          }

          var skipProto = hasProtoEnumBug && isFunction;
          if (isString && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }

          if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j) {
              theKeys.push(String(j));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === 'prototype') && has.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }

          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

            for (var k = 0; k < dontEnums.length; ++k) {
              if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                theKeys.push(dontEnums[k]);
              }
            }
          }
          return theKeys;
        };
      }
      module.exports = keysShim;


      /***/
}),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var slice = Array.prototype.slice;
      var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

      var originalKeys = Object.keys;

      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = (function () {
            // Safari 5.0 bug
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          }(1, 2));
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) { // eslint-disable-line func-name-matching
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };

      module.exports = keysShim;


      /***/
}),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      var toStr = Object.prototype.toString;

      module.exports = function isArguments(value) {
        var str = toStr.call(value);
        var isArgs = str === '[object Arguments]';
        if (!isArgs) {
          isArgs = str !== '[object Array]' &&
            value !== null &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            value.length >= 0 &&
            toStr.call(value.callee) === '[object Function]';
        }
        return isArgs;
      };


      /***/
}),

/***/ "./node_modules/places.js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/places.js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      // we need to export using commonjs for ease of usage in all
      // JavaScript environments
      // We therefore need to import in commonjs too. see:
      // https://github.com/webpack/webpack/issues/4039

      /* eslint-disable import/no-commonjs */
      var places = __webpack_require__(/*! ./src/places */ "./node_modules/places.js/src/places.js");

      var version = __webpack_require__(/*! ./src/version */ "./node_modules/places.js/src/version.js"); // must use module.exports to be commonJS compatible


      module.exports = places["default"];
      module.exports.version = version["default"];
      /* eslint-enable import/no-commonjs */


      /***/
}),

/***/ "./node_modules/places.js/src/configure/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/configure/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      var extractParams = function extractParams(_ref) {
        var hitsPerPage = _ref.hitsPerPage,
          postcodeSearch = _ref.postcodeSearch,
          aroundLatLng = _ref.aroundLatLng,
          aroundRadius = _ref.aroundRadius,
          aroundLatLngViaIP = _ref.aroundLatLngViaIP,
          insideBoundingBox = _ref.insideBoundingBox,
          insidePolygon = _ref.insidePolygon,
          getRankingInfo = _ref.getRankingInfo,
          countries = _ref.countries,
          language = _ref.language,
          type = _ref.type;
        var extracted = {
          countries: countries,
          hitsPerPage: hitsPerPage || 5,
          language: language || navigator.language.split('-')[0],
          type: type
        };

        if (Array.isArray(countries)) {
          extracted.countries = extracted.countries.map(function (country) {
            return country.toLowerCase();
          });
        }

        if (typeof extracted.language === 'string') {
          extracted.language = extracted.language.toLowerCase();
        }

        if (aroundLatLng) {
          extracted.aroundLatLng = aroundLatLng;
        } else if (aroundLatLngViaIP !== undefined) {
          extracted.aroundLatLngViaIP = aroundLatLngViaIP;
        }

        if (postcodeSearch) {
          extracted.restrictSearchableAttributes = 'postcode';
        }

        return _objectSpread({}, extracted, {
          aroundRadius: aroundRadius,
          insideBoundingBox: insideBoundingBox,
          insidePolygon: insidePolygon,
          getRankingInfo: getRankingInfo
        });
      };

      var extractControls = function extractControls(_ref2) {
        var _ref2$useDeviceLocati = _ref2.useDeviceLocation,
          useDeviceLocation = _ref2$useDeviceLocati === void 0 ? false : _ref2$useDeviceLocati,
          _ref2$computeQueryPar = _ref2.computeQueryParams,
          computeQueryParams = _ref2$computeQueryPar === void 0 ? function (params) {
            return params;
          } : _ref2$computeQueryPar,
          formatInputValue = _ref2.formatInputValue,
          _ref2$onHits = _ref2.onHits,
          onHits = _ref2$onHits === void 0 ? function () { } : _ref2$onHits,
          _ref2$onError = _ref2.onError,
          onError = _ref2$onError === void 0 ? function (e) {
            throw e;
          } : _ref2$onError,
          onRateLimitReached = _ref2.onRateLimitReached,
          onInvalidCredentials = _ref2.onInvalidCredentials;
        return {
          useDeviceLocation: useDeviceLocation,
          computeQueryParams: computeQueryParams,
          formatInputValue: formatInputValue,
          onHits: onHits,
          onError: onError,
          onRateLimitReached: onRateLimitReached,
          onInvalidCredentials: onInvalidCredentials
        };
      };

      var params = {};
      var controls = {};

      var configure = function configure(configuration) {
        params = extractParams(_objectSpread({}, params, {}, configuration));
        controls = extractControls(_objectSpread({}, controls, {}, configuration));
        return {
          params: params,
          controls: controls
        };
      };

      var _default = configure;
      exports["default"] = _default;

      /***/
}),

/***/ "./node_modules/places.js/src/createAutocompleteDataset.js":
/*!*****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteDataset.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = createAutocompleteDataset;

      var _createAutocompleteSource = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteSource */ "./node_modules/places.js/src/createAutocompleteSource.js"));

      var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      function createAutocompleteDataset(options) {
        var templates = _objectSpread({}, _defaultTemplates["default"], {}, options.templates);

        var source = (0, _createAutocompleteSource["default"])(_objectSpread({}, options, {
          formatInputValue: templates.value,
          templates: undefined
        }));
        return {
          source: source,
          templates: templates,
          displayKey: 'value',
          name: 'places',
          cache: false
        };
      }

      /***/
}),

/***/ "./node_modules/places.js/src/createAutocompleteSource.js":
/*!****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteSource.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = createAutocompleteSource;

      var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

      var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

      var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      function createAutocompleteSource(_ref) {
        var algoliasearch = _ref.algoliasearch,
          clientOptions = _ref.clientOptions,
          apiKey = _ref.apiKey,
          appId = _ref.appId,
          hitsPerPage = _ref.hitsPerPage,
          postcodeSearch = _ref.postcodeSearch,
          aroundLatLng = _ref.aroundLatLng,
          aroundRadius = _ref.aroundRadius,
          aroundLatLngViaIP = _ref.aroundLatLngViaIP,
          insideBoundingBox = _ref.insideBoundingBox,
          insidePolygon = _ref.insidePolygon,
          getRankingInfo = _ref.getRankingInfo,
          countries = _ref.countries,
          formatInputValue = _ref.formatInputValue,
          _ref$computeQueryPara = _ref.computeQueryParams,
          computeQueryParams = _ref$computeQueryPara === void 0 ? function (params) {
            return params;
          } : _ref$computeQueryPara,
          _ref$useDeviceLocatio = _ref.useDeviceLocation,
          useDeviceLocation = _ref$useDeviceLocatio === void 0 ? false : _ref$useDeviceLocatio,
          _ref$language = _ref.language,
          language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
          _ref$onHits = _ref.onHits,
          onHits = _ref$onHits === void 0 ? function () { } : _ref$onHits,
          _ref$onError = _ref.onError,
          onError = _ref$onError === void 0 ? function (e) {
            throw e;
          } : _ref$onError,
          onRateLimitReached = _ref.onRateLimitReached,
          onInvalidCredentials = _ref.onInvalidCredentials,
          type = _ref.type;
        var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
        placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version["default"]));
        var configuration = (0, _configure["default"])({
          hitsPerPage: hitsPerPage,
          type: type,
          postcodeSearch: postcodeSearch,
          countries: countries,
          language: language,
          aroundLatLng: aroundLatLng,
          aroundRadius: aroundRadius,
          aroundLatLngViaIP: aroundLatLngViaIP,
          insideBoundingBox: insideBoundingBox,
          insidePolygon: insidePolygon,
          getRankingInfo: getRankingInfo,
          formatInputValue: formatInputValue,
          computeQueryParams: computeQueryParams,
          useDeviceLocation: useDeviceLocation,
          onHits: onHits,
          onError: onError,
          onRateLimitReached: onRateLimitReached,
          onInvalidCredentials: onInvalidCredentials
        });
        var params = configuration.params;
        var controls = configuration.controls;
        var userCoords;
        var tracker = null;

        if (controls.useDeviceLocation) {
          tracker = navigator.geolocation.watchPosition(function (_ref2) {
            var coords = _ref2.coords;
            userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
          });
        }

        function searcher(query, cb) {
          var searchParams = _objectSpread({}, params, {
            query: query
          });

          if (userCoords) {
            searchParams.aroundLatLng = userCoords;
          }

          return placesClient.search(controls.computeQueryParams(searchParams)).then(function (content) {
            var hits = content.hits.map(function (hit, hitIndex) {
              return (0, _formatHit["default"])({
                formatInputValue: controls.formatInputValue,
                hit: hit,
                hitIndex: hitIndex,
                query: query,
                rawAnswer: content
              });
            });
            controls.onHits({
              hits: hits,
              query: query,
              rawAnswer: content
            });
            return hits;
          }).then(cb)["catch"](function (e) {
            if (e.statusCode === 403 && e.message === 'Invalid Application-ID or API key') {
              controls.onInvalidCredentials();
              return;
            } else if (e.statusCode === 429) {
              controls.onRateLimitReached();
              return;
            }

            controls.onError(e);
          });
        }

        searcher.configure = function (partial) {
          var updated = (0, _configure["default"])(_objectSpread({}, params, {}, controls, {}, partial));
          params = updated.params;
          controls = updated.controls;

          if (controls.useDeviceLocation && tracker === null) {
            tracker = navigator.geolocation.watchPosition(function (_ref3) {
              var coords = _ref3.coords;
              userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
            });
          } else if (!controls.useDeviceLocation && tracker !== null) {
            navigator.geolocation.clearWatch(tracker);
            tracker = null;
            userCoords = null;
          }
        };

        return searcher;
      }

      /***/
}),

/***/ "./node_modules/places.js/src/createReverseGeocodingSource.js":
/*!********************************************************************!*\
  !*** ./node_modules/places.js/src/createReverseGeocodingSource.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;

      var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

      var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

      var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

      var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      var filterApplicableParams = function filterApplicableParams(params) {
        var hitsPerPage = params.hitsPerPage,
          aroundLatLng = params.aroundLatLng,
          getRankingInfo = params.getRankingInfo,
          language = params.language;
        var filtered = {};

        if (typeof hitsPerPage === 'number') {
          filtered.hitsPerPage = hitsPerPage;
        }

        if (typeof language === 'string') {
          filtered.language = language;
        }

        if (typeof getRankingInfo === 'boolean') {
          filtered.getRankingInfo = getRankingInfo;
        }

        if (typeof aroundLatLng === 'string') {
          filtered.aroundLatLng = aroundLatLng;
        }

        return filtered;
      };

      var createReverseGeocodingSource = function createReverseGeocodingSource(_ref) {
        var algoliasearch = _ref.algoliasearch,
          clientOptions = _ref.clientOptions,
          apiKey = _ref.apiKey,
          appId = _ref.appId,
          hitsPerPage = _ref.hitsPerPage,
          aroundLatLng = _ref.aroundLatLng,
          getRankingInfo = _ref.getRankingInfo,
          _ref$formatInputValue = _ref.formatInputValue,
          formatInputValue = _ref$formatInputValue === void 0 ? _defaultTemplates["default"].value : _ref$formatInputValue,
          _ref$language = _ref.language,
          language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
          _ref$onHits = _ref.onHits,
          onHits = _ref$onHits === void 0 ? function () { } : _ref$onHits,
          _ref$onError = _ref.onError,
          onError = _ref$onError === void 0 ? function (e) {
            throw e;
          } : _ref$onError,
          onRateLimitReached = _ref.onRateLimitReached,
          onInvalidCredentials = _ref.onInvalidCredentials;
        var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
        placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version["default"]));
        var configuration = (0, _configure["default"])({
          apiKey: apiKey,
          appId: appId,
          hitsPerPage: hitsPerPage,
          aroundLatLng: aroundLatLng,
          getRankingInfo: getRankingInfo,
          language: language,
          formatInputValue: formatInputValue,
          onHits: onHits,
          onError: onError,
          onRateLimitReached: onRateLimitReached,
          onInvalidCredentials: onInvalidCredentials
        });
        var params = filterApplicableParams(configuration.params);
        var controls = configuration.controls;

        var searcher = function searcher(queryAroundLatLng, cb) {
          var finalAroundLatLng = queryAroundLatLng || params.aroundLatLng;

          if (!finalAroundLatLng) {
            var error = new Error('A location must be provided for reverse geocoding');
            return Promise.reject(error);
          }

          return placesClient.reverse(_objectSpread({}, params, {
            aroundLatLng: finalAroundLatLng
          })).then(function (content) {
            var hits = content.hits.map(function (hit, hitIndex) {
              return (0, _formatHit["default"])({
                formatInputValue: controls.formatInputValue,
                hit: hit,
                hitIndex: hitIndex,
                query: finalAroundLatLng,
                rawAnswer: content
              });
            });
            controls.onHits({
              hits: hits,
              query: finalAroundLatLng,
              rawAnswer: content
            });
            return hits;
          }).then(cb)["catch"](function (e) {
            if (e.statusCode === 403 && e.message === 'Invalid Application-ID or API key') {
              controls.onInvalidCredentials();
              return;
            } else if (e.statusCode === 429) {
              controls.onRateLimitReached();
              return;
            }

            controls.onError(e);
          });
        };

        searcher.configure = function (partial) {
          var updated = (0, _configure["default"])(_objectSpread({}, params, {}, controls, {}, partial));
          params = filterApplicableParams(updated.params);
          controls = updated.controls;
          return searcher;
        };

        return searcher;
      };

      var _default = createReverseGeocodingSource;
      exports["default"] = _default;

      /***/
}),

/***/ "./node_modules/places.js/src/defaultTemplates.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/defaultTemplates.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;

      var _formatInputValue = _interopRequireDefault(__webpack_require__(/*! ./formatInputValue */ "./node_modules/places.js/src/formatInputValue.js"));

      var _formatDropdownValue = _interopRequireDefault(__webpack_require__(/*! ./formatDropdownValue */ "./node_modules/places.js/src/formatDropdownValue.js"));

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

      /* babel-plugin-inline-import './icons/algolia.svg' */
      var algoliaLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"117\" height=\"17\" viewBox=\"0 0 130 19\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill-rule=\"nonzero\"><path fill=\"#5468FF\" d=\"M59.399.044h13.299a2.372 2.372 0 0 1 2.377 2.364v13.234a2.372 2.372 0 0 1-2.377 2.364H59.399a2.372 2.372 0 0 1-2.377-2.364V2.403A2.368 2.368 0 0 1 59.399.044z\"/><path fill=\"#FFF\" d=\"M66.257 4.582c-2.815 0-5.1 2.272-5.1 5.078 0 2.806 2.284 5.072 5.1 5.072 2.815 0 5.1-2.272 5.1-5.078 0-2.806-2.279-5.072-5.1-5.072zm0 8.652c-1.983 0-3.593-1.602-3.593-3.574 0-1.972 1.61-3.574 3.593-3.574 1.983 0 3.593 1.602 3.593 3.574a3.582 3.582 0 0 1-3.593 3.574zm0-6.418V9.48c0 .076.082.131.153.093l2.377-1.226c.055-.027.071-.093.044-.147a2.96 2.96 0 0 0-2.465-1.487c-.055 0-.11.044-.11.104h.001zm-3.33-1.956l-.312-.31a.783.783 0 0 0-1.106 0l-.372.37a.773.773 0 0 0 0 1.1l.307.305c.049.05.121.038.164-.01.181-.246.378-.48.597-.698.225-.223.455-.42.707-.599.055-.033.06-.109.016-.158h-.001zm5.001-.806v-.616a.781.781 0 0 0-.783-.779h-1.824a.78.78 0 0 0-.783.78v.631c0 .071.066.12.137.104a5.736 5.736 0 0 1 1.588-.223c.52 0 1.035.071 1.534.207a.106.106 0 0 0 .131-.104z\"/><path fill=\"#252C61\" d=\"M5.027 10.246c0 .698-.252 1.246-.757 1.644-.505.397-1.201.596-2.089.596-.888 0-1.615-.138-2.181-.414v-1.214c.358.168.739.301 1.141.397.403.097.778.145 1.125.145.508 0 .884-.097 1.125-.29a.945.945 0 0 0 .363-.779.978.978 0 0 0-.333-.747c-.222-.204-.68-.446-1.375-.725C1.33 8.57.825 8.24.531 7.865c-.294-.372-.44-.82-.44-1.343 0-.655.233-1.17.698-1.547.465-.376 1.09-.564 1.875-.564.752 0 1.5.165 2.245.494l-.408 1.047c-.698-.294-1.321-.44-1.869-.44-.415 0-.73.09-.945.271a.89.89 0 0 0-.322.717c0 .204.043.38.129.524.086.145.227.282.424.411.197.13.551.3 1.063.51.577.24.999.464 1.268.671.269.208.465.442.591.704.125.261.188.57.188.924l-.001.002zm3.98 2.24c-.924 0-1.646-.269-2.167-.808-.521-.539-.781-1.28-.781-2.226 0-.97.242-1.733.725-2.288.483-.555 1.148-.833 1.993-.833.784 0 1.404.238 1.858.714.455.476.682 1.132.682 1.966v.682H7.359c.018.577.174 1.02.467 1.33.294.31.707.464 1.241.464.351 0 .678-.033.98-.099a5.1 5.1 0 0 0 .975-.33v1.026a3.865 3.865 0 0 1-.935.312 5.723 5.723 0 0 1-1.08.091zm7.46-.107l-.252-.827h-.043c-.286.362-.575.608-.865.74-.29.13-.662.195-1.117.195-.584 0-1.039-.158-1.367-.473-.328-.315-.491-.76-.491-1.337 0-.612.227-1.074.682-1.386.455-.312 1.148-.482 2.079-.51l1.026-.032v-.317c0-.38-.089-.663-.266-.85-.177-.189-.452-.283-.824-.283-.304 0-.596.045-.875.134a6.68 6.68 0 0 0-.806.317l-.408-.902a4.414 4.414 0 0 1 1.058-.384 4.856 4.856 0 0 1 1.085-.132c.756 0 1.326.165 1.711.494.385.33.577.847.577 1.552v4.001h-.904zm5.677-6.048c.254 0 .464.018.628.054l-.124 1.176a2.383 2.383 0 0 0-.559-.064c-.505 0-.914.165-1.227.494-.313.33-.47.757-.47 1.284v3.104H19.13V6.44h.988l.167 1.047h.064c.197-.354.454-.636.771-.843a1.83 1.83 0 0 1 1.023-.312h.001zm4.125 6.155c-.899 0-1.582-.262-2.049-.787-.467-.525-.701-1.277-.701-2.259 0-.999.244-1.767.733-2.304.489-.537 1.195-.806 2.119-.806.627 0 1.191.116 1.692.35l-.381 1.014c-.534-.208-.974-.312-1.321-.312-1.028 0-1.542.682-1.542 2.046 0 .666.128 1.166.384 1.501.256.335.631.502 1.125.502a3.23 3.23 0 0 0 1.595-.419v1.101a2.53 2.53 0 0 1-.722.285 4.356 4.356 0 0 1-.932.086v.002zm8.277-.107h-1.268V8.727c0-.458-.092-.8-.277-1.026-.184-.226-.477-.338-.878-.338-.53 0-.919.158-1.168.475-.249.317-.373.848-.373 1.593v2.95H29.32V4.022h1.262v2.122c0 .34-.021.704-.064 1.09h.081a1.76 1.76 0 0 1 .717-.666c.306-.158.663-.236 1.072-.236 1.439 0 2.159.725 2.159 2.175v3.873l-.001-.002zm7.648-6.048c.741 0 1.319.27 1.732.806.414.537.62 1.291.62 2.261 0 .974-.209 1.732-.628 2.275-.419.542-1.001.814-1.746.814-.752 0-1.336-.27-1.751-.81h-.086l-.231.703h-.945V4.023h1.262V6.01l-.021.655-.032.553h.054c.401-.59.992-.886 1.772-.886zm2.917.107h1.375l1.208 3.368c.183.48.304.931.365 1.354h.043c.032-.197.091-.436.177-.717.086-.28.541-1.616 1.364-4.004h1.364l-2.541 6.73c-.462 1.235-1.232 1.853-2.31 1.853-.279 0-.551-.03-.816-.09v-1c.19.043.406.064.65.064.609 0 1.037-.353 1.284-1.058l.22-.559-2.385-5.94h.002zm-3.244.924c-.508 0-.875.15-1.098.448-.224.3-.339.8-.346 1.501v.086c0 .723.115 1.247.344 1.571.229.324.603.486 1.123.486.448 0 .787-.177 1.018-.532.231-.354.346-.867.346-1.536 0-1.35-.462-2.025-1.386-2.025l-.001.001zm-27.28 4.157c.458 0 .826-.128 1.104-.384.278-.256.416-.615.416-1.077v-.516l-.763.032c-.594.021-1.027.121-1.297.298s-.406.448-.406.814c0 .265.079.47.236.615.158.145.394.218.709.218h.001zM8.775 7.287c-.401 0-.722.127-.964.381s-.386.625-.432 1.112h2.696c-.007-.49-.125-.862-.354-1.115-.229-.252-.544-.379-.945-.379l-.001.001z\"/></g><path fill=\"#5468FF\" d=\"M102.162 13.784c0 1.455-.372 2.517-1.123 3.193-.75.676-1.895 1.013-3.44 1.013-.564 0-1.736-.109-2.673-.316l.345-1.689c.783.163 1.819.207 2.361.207.86 0 1.473-.174 1.84-.523.367-.349.548-.866.548-1.553v-.349a6.374 6.374 0 0 1-.838.316 4.151 4.151 0 0 1-1.194.158 4.515 4.515 0 0 1-1.616-.278 3.385 3.385 0 0 1-1.254-.817 3.744 3.744 0 0 1-.811-1.35c-.192-.54-.29-1.505-.29-2.213 0-.665.104-1.498.307-2.054a3.925 3.925 0 0 1 .904-1.433 4.124 4.124 0 0 1 1.441-.926 5.31 5.31 0 0 1 1.945-.365c.696 0 1.337.087 1.961.191a15.86 15.86 0 0 1 1.588.332v8.456h-.001zm-5.955-4.206c0 .893.197 1.885.592 2.3.394.413.904.62 1.528.62.34 0 .663-.049.964-.142a2.75 2.75 0 0 0 .734-.332v-5.29a8.531 8.531 0 0 0-1.413-.18c-.778-.022-1.369.294-1.786.801-.411.507-.619 1.395-.619 2.223zm16.121 0c0 .72-.104 1.264-.318 1.858a4.389 4.389 0 0 1-.904 1.52c-.389.42-.854.746-1.402.975-.548.23-1.391.36-1.813.36-.422-.005-1.26-.125-1.802-.36a4.088 4.088 0 0 1-1.397-.975 4.486 4.486 0 0 1-.909-1.52 5.037 5.037 0 0 1-.329-1.858c0-.719.099-1.41.318-1.999.219-.588.526-1.09.92-1.509.394-.42.865-.74 1.402-.97a4.547 4.547 0 0 1 1.786-.338 4.69 4.69 0 0 1 1.791.338c.548.23 1.019.55 1.402.97.389.42.69.921.909 1.51.23.587.345 1.28.345 1.998h.001zm-2.192.005c0-.92-.203-1.689-.597-2.223-.394-.539-.948-.806-1.654-.806-.707 0-1.26.267-1.654.806-.394.54-.586 1.302-.586 2.223 0 .932.197 1.558.592 2.098.394.545.948.812 1.654.812.707 0 1.26-.272 1.654-.812.394-.545.592-1.166.592-2.098h-.001zm6.963 4.708c-3.511.016-3.511-2.822-3.511-3.274L113.583.95l2.142-.338v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001zM120.873 14.291h-2.153V5.095l2.153-.338zM119.794 3.75c.718 0 1.304-.579 1.304-1.292 0-.714-.581-1.29-1.304-1.29-.723 0-1.304.577-1.304 1.29 0 .714.586 1.291 1.304 1.291zm6.431 1.012c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.285.311.488.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.263.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a9.335 9.335 0 0 1 1.66-.142h-.001zm.179 7.73c.657 0 1.145-.038 1.484-.104V10.22a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.323.196.75.29 1.293.29h.001zM84.108 4.816c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.29.316.487.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.257.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a8.89 8.89 0 0 1 1.66-.142h-.001zm.185 7.736c.657 0 1.145-.038 1.484-.104V10.28a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.318.191.75.29 1.293.29h.001zm8.683 1.738c-3.511.016-3.511-2.822-3.511-3.274L89.46.948 91.602.61v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001z\"/></g></svg>";

      /* babel-plugin-inline-import './icons/osm.svg' */
      var osmLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n";
      var _default = {
        footer: "<div class=\"ap-footer\">\n  <a href=\"https://www.algolia.com/places\" title=\"Search by Algolia\" class=\"ap-footer-algolia\">".concat(algoliaLogo.trim(), "</a>\n  using <a href=\"https://community.algolia.com/places/documentation.html#license\" class=\"ap-footer-osm\" title=\"Algolia Places data \xA9 OpenStreetMap contributors\">").concat(osmLogo.trim(), " <span>data</span></a>\n  </div>"),
        value: _formatInputValue["default"],
        suggestion: _formatDropdownValue["default"]
      };
      exports["default"] = _default;

      /***/
}),

/***/ "./node_modules/places.js/src/errors.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/errors.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _default = {
        multiContainers: "Algolia Places: 'container' must point to a single <input> element.\nExample: instantiate the library twice if you want to bind two <inputs>.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
        badContainer: "Algolia Places: 'container' must point to an <input> element.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
        rateLimitReached: "Algolia Places: Current rate limit reached.\n\nSign up for a free 100,000 queries/month account at\nhttps://www.algolia.com/users/sign_up/places.\n\nOr upgrade your 100,000 queries/month plan by contacting us at\nhttps://community.algolia.com/places/contact.html.",
        invalidCredentials: "The APP ID or API key provided is invalid.",
        invalidAppId: "Your APP ID is invalid. A Places APP ID starts with 'pl'. You must create a valid Places app first.\n\nCreate a free Places app here: https://www.algolia.com/users/sign_up/places"
      };
      exports["default"] = _default;

      /***/
}),

/***/ "./node_modules/places.js/src/findCountryCode.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/findCountryCode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = findCountryCode;

      function findCountryCode(tags) {
        for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
          var tag = tags[tagIndex];
          var find = tag.match(/country\/(.*)?/);

          if (find) {
            return find[1];
          }
        }

        return undefined;
      }

      /***/
}),

/***/ "./node_modules/places.js/src/findType.js":
/*!************************************************!*\
  !*** ./node_modules/places.js/src/findType.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = findType;

      function findType(tags) {
        var types = {
          country: 'country',
          city: 'city',
          'amenity/bus_station': 'busStop',
          'amenity/townhall': 'townhall',
          'railway/station': 'trainStation',
          'aeroway/aerodrome': 'airport',
          'aeroway/terminal': 'airport',
          'aeroway/gate': 'airport'
        };

        for (var t in types) {
          if (tags.indexOf(t) !== -1) {
            return types[t];
          }
        }

        return 'address';
      }

      /***/
}),

/***/ "./node_modules/places.js/src/formatDropdownValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/places.js/src/formatDropdownValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = formatDropdownValue;

      /* babel-plugin-inline-import './icons/address.svg' */
      var addressIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

      /* babel-plugin-inline-import './icons/city.svg' */
      var cityIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n";

      /* babel-plugin-inline-import './icons/country.svg' */
      var countryIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n  <path d=\"M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L7 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H6V8h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/>\n</svg>\n";

      /* babel-plugin-inline-import './icons/bus.svg' */
      var busIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 54.9 50.5\"><path d=\"M9.6 12.7H8.5c-2.3 0-4.1 1.9-4.1 4.1v1.1c0 2.2 1.8 4 4 4.1v21.7h-.7c-1.3 0-2.3 1-2.3 2.3h7.1c0-1.3-1-2.3-2.3-2.3h-.5V22.1c2.2-.1 4-1.9 4-4.1v-1.1c0-2.3-1.8-4.2-4.1-4.2zM46 7.6h-7.5c0-1.8-1.5-3.3-3.3-3.3h-3.6c-1.8 0-3.3 1.5-3.3 3.3H21c-2.5 0-4.6 2-4.6 4.6v26.3c0 1.7 1.3 3.1 3 3.1h.8v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3-1.4 3-3.1v-1.6h14.3v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1v-1.6h.8c1.7 0 3.1-1.4 3.1-3.1V12.2c-.2-2.5-2.2-4.6-4.7-4.6zm-27.4 4.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v.3c0 1.3-1.1 2.4-2.4 2.4H21c-1.3 0-2.4-1.1-2.4-2.4v-.3zM21 38c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7zm0-10.1c-1.3 0-2.4-1.1-2.4-2.4v-6.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v6.6c0 1.3-1.1 2.4-2.4 2.4H21zm24.8 10c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7z\"/></svg>\n";

      /* babel-plugin-inline-import './icons/train.svg' */
      var trainIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 15 20\">\n  <path d=\"M13.105 20l-2.366-3.354H4.26L1.907 20H0l3.297-4.787c-1.1-.177-2.196-1.287-2.194-2.642V2.68C1.1 1.28 2.317-.002 3.973 0h7.065c1.647-.002 2.863 1.28 2.86 2.676v9.895c.003 1.36-1.094 2.47-2.194 2.647L15 20h-1.895zM6.11 2h2.78c.264 0 .472-.123.472-.27v-.46c0-.147-.22-.268-.472-.27H6.11c-.252.002-.47.123-.47.27v.46c0 .146.206.27.47.27zm6.26 3.952V4.175c-.004-.74-.5-1.387-1.436-1.388H4.066c-.936 0-1.43.648-1.436 1.388v1.777c-.002.86.644 1.384 1.436 1.388h6.868c.793-.004 1.44-.528 1.436-1.388zm-8.465 5.386c-.69-.003-1.254.54-1.252 1.21-.002.673.56 1.217 1.252 1.222.697-.006 1.26-.55 1.262-1.22-.002-.672-.565-1.215-1.262-1.212zm8.42 1.21c-.005-.67-.567-1.213-1.265-1.21-.69-.003-1.253.54-1.25 1.21-.003.673.56 1.217 1.25 1.222.698-.006 1.26-.55 1.264-1.22z\"/>\n</svg>\n";

      /* babel-plugin-inline-import './icons/townhall.svg' */
      var townhallIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M12 .6L2.5 6.9h18.9L12 .6zM3.8 8.2c-.7 0-1.3.6-1.3 1.3v8.8L.3 22.1c-.2.3-.3.5-.3.6 0 .6.8.6 1.3.6h21.5c.4 0 1.3 0 1.3-.6 0-.2-.1-.3-.3-.6l-2.2-3.8V9.5c0-.7-.6-1.3-1.3-1.3H3.8zm2.5 2.5c.7 0 1.1.6 1.3 1.3v7.6H5.1V12c0-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3z\"/></svg>\n";

      /* babel-plugin-inline-import './icons/plane.svg' */
      var planeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M22.9 1.1s1.3.3-4.3 6.5l.7 3.8.2-.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.2 1.2.3 1.7.1-.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.1 1.1c.2 1.9.3 3.6.1 4.5 0 0-1.2 1.2-1.8.5 0 0-2.3-7.7-3.8-11.1-5.9 6-6.4 5.6-6.4 5.6s1.2 3.8-.2 5.2l-2.3-4.3h.1l-4.3-2.3c1.3-1.3 5.2-.2 5.2-.2s-.5-.4 5.6-6.3C8.9 7.7 1.2 5.5 1.2 5.5c-.7-.7.5-1.8.5-1.8.9-.2 2.6-.1 4.5.1l1.1-1.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l1.7.3 1.2-1.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-.2.2 3.8.7c6.2-5.5 6.5-4.2 6.5-4.2z\"/></svg>\n";
      var icons = {
        address: addressIcon,
        city: cityIcon,
        country: countryIcon,
        busStop: busIcon,
        trainStation: trainIcon,
        townhall: townhallIcon,
        airport: planeIcon
      };

      function formatDropdownValue(_ref) {
        var type = _ref.type,
          highlight = _ref.highlight;
        var name = highlight.name,
          administrative = highlight.administrative,
          city = highlight.city,
          country = highlight.country;
        var out = "<span class=\"ap-suggestion-icon\">".concat(icons[type].trim(), "</span>\n<span class=\"ap-name\">").concat(name, "</span>\n<span class=\"ap-address\">\n  ").concat([city, administrative, country].filter(function (token) {
          return token !== undefined;
        }).join(', '), "</span>").replace(/\s*\n\s*/g, ' ');
        return out;
      }

      /***/
}),

/***/ "./node_modules/places.js/src/formatHit.js":
/*!*************************************************!*\
  !*** ./node_modules/places.js/src/formatHit.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = formatHit;

      var _findCountryCode = _interopRequireDefault(__webpack_require__(/*! ./findCountryCode */ "./node_modules/places.js/src/findCountryCode.js"));

      var _findType = _interopRequireDefault(__webpack_require__(/*! ./findType */ "./node_modules/places.js/src/findType.js"));

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      function getBestHighlightedForm(highlightedValues) {
        var defaultValue = highlightedValues[0].value; // collect all other matches

        var bestAttributes = [];

        for (var i = 1; i < highlightedValues.length; ++i) {
          if (highlightedValues[i].matchLevel !== 'none') {
            bestAttributes.push({
              index: i,
              words: highlightedValues[i].matchedWords
            });
          }
        } // no matches in this attribute, retrieve first value


        if (bestAttributes.length === 0) {
          return defaultValue;
        } // sort the matches by `desc(words), asc(index)`


        bestAttributes.sort(function (a, b) {
          if (a.words > b.words) {
            return -1;
          } else if (a.words < b.words) {
            return 1;
          }

          return a.index - b.index;
        }); // and append the best match to the first value

        return bestAttributes[0].index === 0 ? "".concat(defaultValue, " (").concat(highlightedValues[bestAttributes[1].index].value, ")") : "".concat(highlightedValues[bestAttributes[0].index].value, " (").concat(defaultValue, ")");
      }

      function getBestPostcode(postcodes, highlightedPostcodes) {
        var defaultValue = highlightedPostcodes[0].value; // collect all other matches

        var bestAttributes = [];

        for (var i = 1; i < highlightedPostcodes.length; ++i) {
          if (highlightedPostcodes[i].matchLevel !== 'none') {
            bestAttributes.push({
              index: i,
              words: highlightedPostcodes[i].matchedWords
            });
          }
        } // no matches in this attribute, retrieve first value


        if (bestAttributes.length === 0) {
          return {
            postcode: postcodes[0],
            highlightedPostcode: defaultValue
          };
        } // sort the matches by `desc(words)`


        bestAttributes.sort(function (a, b) {
          if (a.words > b.words) {
            return -1;
          } else if (a.words < b.words) {
            return 1;
          }

          return a.index - b.index;
        });
        var postcode = postcodes[bestAttributes[0].index];
        return {
          postcode: postcode,
          highlightedPostcode: highlightedPostcodes[bestAttributes[0].index].value
        };
      }

      function formatHit(_ref) {
        var formatInputValue = _ref.formatInputValue,
          hit = _ref.hit,
          hitIndex = _ref.hitIndex,
          query = _ref.query,
          rawAnswer = _ref.rawAnswer;

        try {
          var name = hit.locale_names[0];
          var country = hit.country;
          var administrative = hit.administrative && hit.administrative[0] !== name ? hit.administrative[0] : undefined;
          var city = hit.city && hit.city[0] !== name ? hit.city[0] : undefined;
          var suburb = hit.suburb && hit.suburb[0] !== name ? hit.suburb[0] : undefined;
          var county = hit.county && hit.county[0] !== name ? hit.county[0] : undefined;

          var _ref2 = hit.postcode && hit.postcode.length ? getBestPostcode(hit.postcode, hit._highlightResult.postcode) : {
            postcode: undefined,
            highlightedPostcode: undefined
          },
            postcode = _ref2.postcode,
            highlightedPostcode = _ref2.highlightedPostcode;

          var highlight = {
            name: getBestHighlightedForm(hit._highlightResult.locale_names),
            city: city ? getBestHighlightedForm(hit._highlightResult.city) : undefined,
            administrative: administrative ? getBestHighlightedForm(hit._highlightResult.administrative) : undefined,
            country: country ? hit._highlightResult.country.value : undefined,
            suburb: suburb ? getBestHighlightedForm(hit._highlightResult.suburb) : undefined,
            county: county ? getBestHighlightedForm(hit._highlightResult.county) : undefined,
            postcode: highlightedPostcode
          };
          var suggestion = {
            name: name,
            administrative: administrative,
            county: county,
            city: city,
            suburb: suburb,
            country: country,
            countryCode: (0, _findCountryCode["default"])(hit._tags),
            type: (0, _findType["default"])(hit._tags),
            latlng: {
              lat: hit._geoloc.lat,
              lng: hit._geoloc.lng
            },
            postcode: postcode,
            postcodes: hit.postcode && hit.postcode.length ? hit.postcode : undefined
          }; // this is the value to put inside the <input value=

          var value = formatInputValue(suggestion);
          return _objectSpread({}, suggestion, {
            highlight: highlight,
            hit: hit,
            hitIndex: hitIndex,
            query: query,
            rawAnswer: rawAnswer,
            value: value
          });
        } catch (e) {
          /* eslint-disable no-console */
          console.error('Could not parse object', hit);
          console.error(e);
          /* eslint-enable no-console */

          return {
            value: 'Could not parse object'
          };
        }
      }

      /***/
}),

/***/ "./node_modules/places.js/src/formatInputValue.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/formatInputValue.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = formatInputValue;

      function formatInputValue(_ref) {
        var administrative = _ref.administrative,
          city = _ref.city,
          country = _ref.country,
          name = _ref.name,
          type = _ref.type;
        var out = "".concat(name).concat(type !== 'country' && country !== undefined ? ',' : '', "\n ").concat(city ? "".concat(city, ",") : '', "\n ").concat(administrative ? "".concat(administrative, ",") : '', "\n ").concat(country ? country : '').replace(/\s*\n\s*/g, ' ').trim();
        return out;
      }

      /***/
}),

/***/ "./node_modules/places.js/src/navigatorLanguage.js":
/*!*********************************************************!*\
  !*** ./node_modules/places.js/src/navigatorLanguage.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      // polyfill for navigator.language (IE <= 10)
      // not polyfilled by https://cdn.polyfill.io/v2/docs/
      // Defined: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
      //   with allowable values at http://www.ietf.org/rfc/bcp/bcp47.txt
      // Note that the HTML spec suggests that anonymizing services return "en-US" by default for
      //   user privacy (so your app may wish to provide a means of changing the locale)
      if (!('language' in navigator)) {
        navigator.language = // IE 10 in IE8 mode on Windows 7 uses upper-case in
          // navigator.userLanguage country codes but per
          // http://msdn.microsoft.com/en-us/library/ie/ms533052.aspx (via
          // http://msdn.microsoft.com/en-us/library/ie/ms534713.aspx), they
          // appear to be in lower case, so we bring them into harmony with navigator.language.
          navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase) || 'en-US'; // Default for anonymizing services: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
      }

      /***/
}),

/***/ "./node_modules/places.js/src/places.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/places.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = places;

      var _events = _interopRequireDefault(__webpack_require__(/*! events */ "./node_modules/events/events.js"));

      var _algoliasearchLite = _interopRequireDefault(__webpack_require__(/*! algoliasearch/src/browser/builds/algoliasearchLite */ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js"));

      var _autocomplete = _interopRequireDefault(__webpack_require__(/*! autocomplete.js */ "./node_modules/autocomplete.js/index.js"));

      __webpack_require__(/*! ./navigatorLanguage */ "./node_modules/places.js/src/navigatorLanguage.js");

      var _createAutocompleteDataset = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteDataset */ "./node_modules/places.js/src/createAutocompleteDataset.js"));

      var _insertCss = _interopRequireDefault(__webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js"));

      var _errors = _interopRequireDefault(__webpack_require__(/*! ./errors */ "./node_modules/places.js/src/errors.js"));

      var _createReverseGeocodingSource = _interopRequireDefault(__webpack_require__(/*! ./createReverseGeocodingSource */ "./node_modules/places.js/src/createReverseGeocodingSource.js"));

      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

      function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

      function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

      function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

      function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

      function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

      /* babel-plugin-inline-import './icons/clear.svg' */
      var clearIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z\"/></svg>\n";

      /* babel-plugin-inline-import './icons/address.svg' */
      var pinIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

      /* babel-plugin-inline-import './places.css' */
      var css = ".algolia-places {\n  width: 100%;\n}\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px;\n  padding-left: 16px;\n  line-height: 40px;\n  height: 40px;\n  border: 1px solid #CCC;\n  border-radius: 3px;\n  outline: none;\n  font: inherit;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n\n.ap-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n.ap-input::-ms-clear {\n  display: none;\n}\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa;\n}\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden;\n}\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden;\n}\n\n.ap-suggestion em {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa;\n}\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle;\n}\n\n.ap-suggestion-icon svg {\n  -webkit-transform: scale(0.9) translateY(2px);\n          transform: scale(0.9) translateY(2px);\n  fill: #cfcfcf;\n}\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none;\n}\n\n.ap-input-icon.ap-icon-pin {\n  cursor: pointer;\n}\n\n.ap-input-icon svg {\n  fill: #cfcfcf;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.ap-cursor {\n  background: #efefef;\n}\n\n.ap-cursor .ap-suggestion-icon svg {\n  -webkit-transform: scale(1) translateY(2px);\n          transform: scale(1) translateY(2px);\n  fill: #aaaaaa;\n}\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px;\n}\n\n.ap-footer a {\n  color: inherit;\n  text-decoration: none;\n}\n\n.ap-footer a svg {\n  vertical-align: middle;\n}\n\n.ap-footer:hover {\n  opacity: 1;\n}\n";
      (0, _insertCss["default"])(css, {
        prepend: true
      });

      var applyAttributes = function applyAttributes(elt, attrs) {
        Object.entries(attrs).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            value = _ref2[1];

          elt.setAttribute(name, "".concat(value));
        });
        return elt;
      };

      function places(options) {
        var container = options.container,
          style = options.style,
          accessibility = options.accessibility,
          _options$autocomplete = options.autocompleteOptions,
          userAutocompleteOptions = _options$autocomplete === void 0 ? {} : _options$autocomplete; // multiple DOM elements targeted

        if (container instanceof NodeList) {
          if (container.length > 1) {
            throw new Error(_errors["default"].multiContainers);
          } // if single node NodeList received, resolve to the first one


          return places(_objectSpread({}, options, {
            container: container[0]
          }));
        } // container sent as a string, resolve it for multiple DOM elements issue


        if (typeof container === 'string') {
          var resolvedContainer = document.querySelectorAll(container);
          return places(_objectSpread({}, options, {
            container: resolvedContainer
          }));
        } // if not an <input>, error


        if (!(container instanceof HTMLInputElement)) {
          throw new Error(_errors["default"].badContainer);
        }

        var placesInstance = new _events["default"]();
        var prefix = "ap".concat(style === false ? '-nostyle' : '');

        var autocompleteOptions = _objectSpread({
          autoselect: true,
          hint: false,
          cssClasses: {
            root: "algolia-places".concat(style === false ? '-nostyle' : ''),
            prefix: prefix
          },
          debug: "development" === 'development'
        }, userAutocompleteOptions);

        var autocompleteDataset = (0, _createAutocompleteDataset["default"])(_objectSpread({}, options, {
          algoliasearch: _algoliasearchLite["default"],
          onHits: function onHits(_ref3) {
            var hits = _ref3.hits,
              rawAnswer = _ref3.rawAnswer,
              query = _ref3.query;
            return placesInstance.emit('suggestions', {
              rawAnswer: rawAnswer,
              query: query,
              suggestions: hits
            });
          },
          onError: function onError(e) {
            return placesInstance.emit('error', e);
          },
          onRateLimitReached: function onRateLimitReached() {
            var listeners = placesInstance.listenerCount('limit');

            if (listeners === 0) {
              console.log(_errors["default"].rateLimitReached); // eslint-disable-line no-console

              return;
            }

            placesInstance.emit('limit', {
              message: _errors["default"].rateLimitReached
            });
          },
          onInvalidCredentials: function onInvalidCredentials() {
            if (options && options.appId && options.appId.startsWith('pl')) {
              console.error(_errors["default"].invalidCredentials); // eslint-disable-line no-console
            } else {
              console.error(_errors["default"].invalidAppId); // eslint-disable-line no-console
            }
          },
          container: undefined
        }));
        var autocompleteInstance = (0, _autocomplete["default"])(container, autocompleteOptions, autocompleteDataset);
        var autocompleteContainer = container.parentNode;
        var autocompleteChangeEvents = ['selected', 'autocompleted'];
        autocompleteChangeEvents.forEach(function (eventName) {
          autocompleteInstance.on("autocomplete:".concat(eventName), function (_, suggestion) {
            placesInstance.emit('change', {
              rawAnswer: suggestion.rawAnswer,
              query: suggestion.query,
              suggestion: suggestion,
              suggestionIndex: suggestion.hitIndex
            });
          });
        });
        autocompleteInstance.on('autocomplete:cursorchanged', function (_, suggestion) {
          placesInstance.emit('cursorchanged', {
            rawAnswer: suggestion.rawAnswer,
            query: suggestion.query,
            suggestion: suggestion,
            suggestionIndex: suggestion.hitIndex
          });
        });
        var clear = document.createElement('button');
        clear.setAttribute('type', 'button');
        clear.setAttribute('aria-label', 'clear');

        if (accessibility && accessibility.clearButton && accessibility.clearButton instanceof Object) {
          applyAttributes(clear, accessibility.clearButton);
        }

        clear.classList.add("".concat(prefix, "-input-icon"));
        clear.classList.add("".concat(prefix, "-icon-clear"));
        clear.innerHTML = clearIcon;
        autocompleteContainer.appendChild(clear);
        clear.style.display = 'none';
        var pin = document.createElement('button');
        pin.setAttribute('type', 'button');
        pin.setAttribute('aria-label', 'focus');

        if (accessibility && accessibility.pinButton && accessibility.pinButton instanceof Object) {
          applyAttributes(pin, accessibility.pinButton);
        }

        pin.classList.add("".concat(prefix, "-input-icon"));
        pin.classList.add("".concat(prefix, "-icon-pin"));
        pin.innerHTML = pinIcon;
        autocompleteContainer.appendChild(pin);
        pin.addEventListener('click', function () {
          autocompleteDataset.source.configure({
            useDeviceLocation: true
          });
          autocompleteInstance.focus();
        });
        clear.addEventListener('click', function () {
          autocompleteInstance.autocomplete.setVal('');
          autocompleteInstance.focus();
          clear.style.display = 'none';
          pin.style.display = '';
          placesInstance.emit('clear');
        });
        var previousQuery = '';

        var inputListener = function inputListener() {
          var query = autocompleteInstance.val();

          if (query === '') {
            pin.style.display = '';
            clear.style.display = 'none';

            if (previousQuery !== query) {
              placesInstance.emit('clear');
            }
          } else {
            clear.style.display = '';
            pin.style.display = 'none';
          }

          previousQuery = query;
        };

        autocompleteContainer.querySelector(".".concat(prefix, "-input")).addEventListener('input', inputListener);
        var autocompleteIsomorphicMethods = ['open', 'close'];
        autocompleteIsomorphicMethods.forEach(function (methodName) {
          placesInstance[methodName] = function () {
            var _autocompleteInstance;

            (_autocompleteInstance = autocompleteInstance.autocomplete)[methodName].apply(_autocompleteInstance, arguments);
          };
        });

        placesInstance.getVal = function () {
          return autocompleteInstance.val();
        };

        placesInstance.destroy = function () {
          var _autocompleteInstance2;

          autocompleteContainer.querySelector(".".concat(prefix, "-input")).removeEventListener('input', inputListener);

          (_autocompleteInstance2 = autocompleteInstance.autocomplete).destroy.apply(_autocompleteInstance2, arguments);
        };

        placesInstance.setVal = function () {
          var _autocompleteInstance3;

          previousQuery = arguments.length <= 0 ? undefined : arguments[0];

          if (previousQuery === '') {
            pin.style.display = '';
            clear.style.display = 'none';
          } else {
            clear.style.display = '';
            pin.style.display = 'none';
          }

          (_autocompleteInstance3 = autocompleteInstance.autocomplete).setVal.apply(_autocompleteInstance3, arguments);
        };

        placesInstance.autocomplete = autocompleteInstance;

        placesInstance.search = function () {
          var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          return new Promise(function (resolve) {
            autocompleteDataset.source(query, resolve);
          });
        };

        placesInstance.configure = function (configuration) {
          var safeConfig = _objectSpread({}, configuration);

          delete safeConfig.onHits;
          delete safeConfig.onError;
          delete safeConfig.onRateLimitReached;
          delete safeConfig.onInvalidCredentials;
          delete safeConfig.templates;
          autocompleteDataset.source.configure(safeConfig);
          return placesInstance;
        };

        placesInstance.reverse = (0, _createReverseGeocodingSource["default"])(_objectSpread({}, options, {
          algoliasearch: _algoliasearchLite["default"],
          formatInputValue: (options.templates || {}).value,
          onHits: function onHits(_ref4) {
            var hits = _ref4.hits,
              rawAnswer = _ref4.rawAnswer,
              query = _ref4.query;
            return placesInstance.emit('reverse', {
              rawAnswer: rawAnswer,
              query: query,
              suggestions: hits
            });
          },
          onError: function onError(e) {
            return placesInstance.emit('error', e);
          },
          onRateLimitReached: function onRateLimitReached() {
            var listeners = placesInstance.listenerCount('limit');

            if (listeners === 0) {
              console.log(_errors["default"].rateLimitReached); // eslint-disable-line no-console

              return;
            }

            placesInstance.emit('limit', {
              message: _errors["default"].rateLimitReached
            });
          },
          onInvalidCredentials: function onInvalidCredentials() {
            if (options && options.appId && options.appId.startsWith('pl')) {
              console.error(_errors["default"].invalidCredentials); // eslint-disable-line no-console
            } else {
              console.error(_errors["default"].invalidAppId); // eslint-disable-line no-console
            }
          }
        }));
        return placesInstance;
      }

      /***/
}),

/***/ "./node_modules/places.js/src/version.js":
/*!***********************************************!*\
  !*** ./node_modules/places.js/src/version.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports["default"] = void 0;
      var _default = '1.18.1';
      exports["default"] = _default;

      /***/
}),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      }())
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }


      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }



      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() { }

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) { return [] }

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () { return '/' };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () { return 0; };


      /***/
}),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.



      // If obj.hasOwnProperty has been overridden, then calling
      // obj.hasOwnProperty(prop) will break.
      // See: https://github.com/joyent/node/issues/1707
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      module.exports = function (qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};

        if (typeof qs !== 'string' || qs.length === 0) {
          return obj;
        }

        var regexp = /\+/g;
        qs = qs.split(sep);

        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
          maxKeys = options.maxKeys;
        }

        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, '%20'),
            idx = x.indexOf(eq),
            kstr, vstr, k, v;

          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = '';
          }

          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);

          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }

        return obj;
      };

      var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };


      /***/
}),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.



      var stringifyPrimitive = function (v) {
        switch (typeof v) {
          case 'string':
            return v;

          case 'boolean':
            return v ? 'true' : 'false';

          case 'number':
            return isFinite(v) ? v : '';

          default:
            return '';
        }
      };

      module.exports = function (obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
          obj = undefined;
        }

        if (typeof obj === 'object') {
          return map(objectKeys(obj), function (k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray(obj[k])) {
              return map(obj[k], function (v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);

        }

        if (!name) return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq +
          encodeURIComponent(stringifyPrimitive(obj));
      };

      var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };

      function map(xs, f) {
        if (xs.map) return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          res.push(f(xs[i], i));
        }
        return res;
      }

      var objectKeys = Object.keys || function (obj) {
        var res = [];
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
        }
        return res;
      };


      /***/
}),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";


      exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
      exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


      /***/
}),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function (module, exports) {

      var g;

      // This works in non-strict mode
      g = (function () {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || new Function("return this")();
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;


      /***/
}),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = function (module) {
        if (!module.webpackPolyfill) {
          module.deprecate = function () { };
          module.paths = [];
          // module.parent = undefined by default
          if (!module.children) module.children = [];
          Object.defineProperty(module, "loaded", {
            enumerable: true,
            get: function () {
              return module.l;
            }
          });
          Object.defineProperty(module, "id", {
            enumerable: true,
            get: function () {
              return module.i;
            }
          });
          module.webpackPolyfill = 1;
        }
        return module;
      };


      /***/
}),

/***/ "./resources/js/algoliaPlaces.js":
/*!***************************************!*\
  !*** ./resources/js/algoliaPlaces.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      // Algolia Places 
      var places = __webpack_require__(/*! places.js */ "./node_modules/places.js/index.js");

      var fixedOptions = {
        appId: "",
        apiKey: "",
        container: document.querySelector('#address')
      };
      var reconfigurableOptions = {
        language: 'fr',
        countries: ['ca', 'ru']
      };
      var placesInstance = places(fixedOptions).configure(reconfigurableOptions); // dynamically reconfigure options
      // placesInstance.configure({
      //   countries: ['us'] // only search in the United States, the rest of the settings are unchanged: we're still searching for cities in German.
      // })

      var $address = document.querySelector('#address-value');
      var $addressData = document.querySelector('#address-data');
      placesInstance.on('change', function (e) {
        $addressData.value = JSON.stringify(e.suggestion);
        $address.textContent = e.suggestion.value;
      });
      placesInstance.on('clear', function () {
        $address.textContent = 'Aucune';
      });

      /***/
}),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
      /**
       * We'll load jQuery and the Bootstrap jQuery plugin which provides support
       * for JavaScript based Bootstrap features such as modals and tabs. This
       * code may be modified to fit the specific needs of your application.
       */

      try {
        window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"];
        window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

        __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
      } catch (e) { }
      /**
       * We'll load the axios HTTP library which allows us to easily issue requests
       * to our Laravel back-end. This library automatically handles sending the
       * CSRF token as a header based on the value of the "XSRF" token cookie.
       */


      window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
      window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      /***/
}),

/***/ "./resources/js/frontend.js":
/*!**********************************!*\
  !*** ./resources/js/frontend.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      /**
       * First we will load all of this project's JavaScript dependencies which
       * includes Vue and other libraries. It is a great starting point when
       * building robust, powerful web applications using Vue and Laravel.
       */
      __webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

      __webpack_require__(/*! ./algoliaPlaces */ "./resources/js/algoliaPlaces.js");

      /***/
}),

/***/ 1:
/*!****************************************!*\
  !*** multi ./resources/js/frontend.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(/*! /var/www/resources/js/frontend.js */"./resources/js/frontend.js");


      /***/
})

}, [[1, "/js/manifest", "/js/vendor"]]]);
