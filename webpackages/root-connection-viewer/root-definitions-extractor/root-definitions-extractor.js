(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'root-definitions-extractor',
    componentsDefs: {},
    membersDefs: {},
    slotsDefs: {},
    connectionDefs: [],

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
      document.addEventListener('keyup', function (e) {
        var shortcutAchieved = this.getShortcut().every(function (key) {
          return e[key.toLowerCase() + 'Key'] || e.key === key;
        });
        if (shortcutAchieved) {
          this.extractAndSetDefinitions();
        }
      }.bind(this), false);
    },

    /**
     * Add class to the button, when 'buttonVisible' slot changes
     * @param buttonVisible
     */
    modelButtonVisibleChanged: function (buttonVisible) {
      if (buttonVisible && this._readyToShowButton) {
        this.$$('button').style.display = 'block';
      } else {
        this.$$('button').style.display = 'none';
      }
    },

    /**
     * Add class to the button, when 'buttonClass' slot changes
     * @param newClass
     */
    modelButtonClassChanged: function (newClass) {
      this.$$('button').className += ' ' + newClass;
    },

    /**
     * Add class to the button, when 'shortcut' slot changes
     * @param shortcut
     */
    modelShortcutChanged: function (shortcut) {
      if (!this._validShortcut(shortcut)) {
        console.warn('Invalid key combination. Remember that it starts with a modifier: \'ctrl\', ' +
          '\'alt\', \'shift\' and \'meta\'. And you should use printable values of keys.\n' +
          'Default value would be use: [\'alt\', \'v\']', shortcut);
        this.model.shortcut = ['alt', 'v'];
      }
      this.$$('#extractInfoB').setAttribute('title', this.getShortcut().join('+'));
    },

    /**
     * Add class to the button, when 'readyEvent' slot changes
     * @param readyEvent
     */
    modelReadyEventChanged: function (readyEvent) {
      document.addEventListener(readyEvent, function () {
        this._readyToShowButton = true;
        if (this.getButtonVisible()) {
          this.$$('button').style.display = 'block';
        }
      }.bind(this));
    },

    /**
     * Method to be called when 'button' is clicked
     * @param event
     */
    extractAndSetDefinitions: function (event) {
      this.componentsDefs = {};
      this.membersDefs = {};
      this.slotsDefs = {};
      this.connectionDefs = [];
      this.setDefinitions(this._getDefsFromConnections(window.cubx.CRC._root.Context._connectionMgr._connections));
    },

    /**
     * Indicates whether a 'shortcut' array is valid.
     * @param {Array} shortcut - Array containing key names (e.g. 'ctrl') or values (e.g 'v').
     * @returns {boolean}
     * @private
     */
    _validShortcut: function (shortcut) {
      var validModifierNames = ['ctrl', 'alt', 'shift', 'meta'];
      return shortcut.every(function (key) {
        return typeof key === 'string' &&
          (key.length === 1 || validModifierNames.indexOf(key.toLowerCase()) !== -1);
      });
    },

    /**
     * Build an object containing a connection definition, based on a context connection object
     * @param {object} contextConnection - Root context connection object
     * @returns {{connectionId: *, copyValue: *, destination: {memberIdRef: *, slot: *}, source: {memberIdRef: *, slot: *}, hookFunction: *, repeatedValues: *}}
     * @private
     */
    _getConnectionDefFromContextConnection: function (contextConnection) {
      return {
        connectionId: contextConnection.connectionId,
        copyValue: contextConnection.copyValue,
        destination: {
          memberIdRef: contextConnection.destination.memberId ||
          contextConnection.destination.component.getAttribute('member-id'),
          slot: contextConnection.destination.slot
        },
        source: {
          memberIdRef: contextConnection.source.memberId ||
          contextConnection.source.component.getAttribute('member-id'),
          slot: contextConnection.source.slot
        },
        hookFunction: contextConnection.hookFunction,
        repeatedValues: contextConnection.repeatedValues
      };
    },

    /**
     * Add or update a component definition to 'this.componentsDefs' object
     * @param {object} connectionComponent - Source or destination object of a context connection
     * @param isSource - Boolean indicating whether the slot is the source of a connection
     * @private
     */
    _addComponentDefFromContextConnection: function (connectionComponent, isSource) {
      var artifactId = connectionComponent.component.tagName.toLowerCase();
      var runtimeId = connectionComponent.component.getAttribute('runtime-id');
      var webpackageId = runtimeId.slice(0, runtimeId.indexOf('/'));
      var slotDefId = this._generateSlotDefId(connectionComponent, artifactId);
      if (!this.componentsDefs.hasOwnProperty(artifactId)) {
        this.componentsDefs[artifactId] = {
          artifactId: artifactId,
          slots: [ slotDefId ],
          webpackageId: webpackageId
        };
      } else {
        if (this.componentsDefs[artifactId].slots.indexOf(slotDefId) === -1) {
          this.componentsDefs[artifactId].slots.push(slotDefId);
        }
      }
      var memberId = connectionComponent.memberId ||
        connectionComponent.component.getAttribute('member-id');
      if (!this.membersDefs.hasOwnProperty(memberId)) {
        this.membersDefs[memberId] = {
          memberId: memberId,
          artifactId: artifactId
        };
      }
      this._updateSlotDef(slotDefId, connectionComponent.slot, isSource);
    },

    /**
     * If the slotDef is not stored, then add it to 'this.slotsDefs', otherwise, check if it should
     * be updated.
     * @param {string} slotDefId - Generated slotId to identify al slot definition
     * @param {string} slotId - Slot name or id
     * @param {boolean} isSource - Boolean indicating whether the slot is the source of a connection
     * @private
     */
    _updateSlotDef: function (slotDefId, slotId, isSource) {
      var direction = isSource ? 'output' : 'input';
      if (!this.slotsDefs.hasOwnProperty(slotDefId)) {
        this.slotsDefs[slotDefId] = { slotId: slotId, direction: [direction] };
      } else if (this.slotsDefs[slotDefId].direction.indexOf(direction) === -1) {
        this.slotsDefs[slotDefId].direction.push(direction);
      }
    },

    /**
     * Generate a slot id to identify slots definitions
     * @param {object} connectionComponent - Source or destination object of a context connection
     * @param {string} artifactId - Artifact id of the component containing the slot
     * @returns {string} slotId
     * @private
     */
    _generateSlotDefId: function (connectionComponent, artifactId) {
      return connectionComponent.slot + '#' + artifactId;
    },

    /**
     * While definitions are built, the members of a component are stored as string, using a slot
     * definition key, after all definitions are ready, those ids should be replaced by the actual
     * slots definitions.
     * @private
     */
    _completeComponentSlotDefs: function () {
      Object.keys(this.componentsDefs).forEach(function (arifactId) {
        this.componentsDefs[arifactId].slots = this.componentsDefs[arifactId].slots.map(function (slotDefId) {
          return this.slotsDefs[slotDefId];
        }.bind(this));
      }.bind(this));
    },

    /**
     * While component definitions are built, slots definitions are stored as object in order to
     * avoid duplicate definitions. After all definitions are ready, these mebers shoudl be stored
     * as array.
     * @returns {Array} - Members' definitions as array
     * @private
     */
    _membersDefsToArray: function () {
      var members = [];
      Object.keys(this.membersDefs).forEach(function (memberDefId) {
        members.push(this.membersDefs[memberDefId]);
      }.bind(this));
      return members;
    },

    /**
     * Extract the definitions of components, members and connections based on the information
     * provided in connections array (from root context)
     * @param {Array} connections - Array containing root context connections
     * @returns {{components: (componentsDefs|{}|*), members: *, connections: Array}}
     * @private
     */
    _getDefsFromConnections: function (connections) {
      connections.forEach(function (connection) {
        this._addComponentDefFromContextConnection(connection.source, true);
        this._addComponentDefFromContextConnection(connection.destination);
        this.connectionDefs.push(this._getConnectionDefFromContextConnection(connection));
      }.bind(this));

      this._completeComponentSlotDefs();
      return { components: this.componentsDefs, members: this._membersDefsToArray(), connections: this.connectionDefs };
    }
  });
}());
