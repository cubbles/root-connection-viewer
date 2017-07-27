/**
 * Contains hookFunctions for component travel-planner
 */
(function () {
  'use strict';

  // set namespace containing the root-connection-viewer functions (i.e. hook functions)
  window.rootConnectionViewer = {
    // Open the modal containing the viewer
    openViewerModal: function (definitions, next) {
      document.querySelector('#iframe_view_modal').style.display = 'block';
      setTimeout(function (e) {
        document.querySelector('cubx-generic-component-viewer').setViewerHeight('80%');
        document.querySelector('cubx-generic-component-viewer').setScale('auto');
      }, 900);
      next(definitions);
    }
  };

  document.addEventListener('cifReady', function setUpModal () {
    document.querySelector('.modal-body').style.height = window.innerHeight * 0.8 + 'px';
    var modal = document.querySelector('#iframe_view_modal');
    // Get the <span> element that closes the modal
    var spanClose = modal.querySelector('.close');
    spanClose.onclick = function () {
      modal.style.display = 'none';
    };

    var footerClose = modal.querySelector('.close-footer');
    footerClose.onclick = function () {
      modal.style.display = 'none';
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  });
})();
