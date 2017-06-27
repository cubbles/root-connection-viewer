/* globals $ */
/**
 * Contains hookFunctions for component travel-planner
 */
(function () {
  'use strict';

  // set namespace containing the cubx-webpackage-viewer functions (i.e. hook functions)
  window.rootConnectionViewer = {
    // Open the modal containing the viewer
    openViewerModal: function (definitions, next) {
      var viewerModal = $('#dataflow_view_modal');
      viewerModal.on('shown.bs.modal', function (e) {
        document.querySelector('cubx-generic-component-viewer').setScale('auto');
      });
      viewerModal.modal('show');
      next(definitions);
    }
  };
})();
