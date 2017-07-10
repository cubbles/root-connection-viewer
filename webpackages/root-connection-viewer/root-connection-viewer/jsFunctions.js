/* globals $ */
/**
 * Contains hookFunctions for component travel-planner
 */
(function () {
  'use strict';

  // set namespace containing the root-connection-viewer functions (i.e. hook functions)
  window.rootConnectionViewer = {
    // Open the modal containing the viewer
    openViewerModal: function (definitions, next) {
      var viewerModal = $('#iframe_view_modal');
      viewerModal.on('shown.bs.modal', function (e) {
        document.querySelector('cubx-iframe-viewer').setSlotChange({slot: 'scale', value: 'auto'});
      });
      viewerModal.modal('show');
      next({slot: 'definitions', value: definitions});
    }
  };
})();
