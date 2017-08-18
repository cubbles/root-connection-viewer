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
      var iframeViewer = document.querySelector('cubx-iframe-viewer');
      if (!iframeViewer._iframeCifReady) {
        document.addEventListener('iframeCifReady', function () {
          document.querySelector('root-definitions-extractor').setDefinitions(definitions);
        });
      } else {
        setTimeout(function (e) {
          iframeViewer.setHeight('100%');
          iframeViewer.setSlotChange({slot: 'viewerHeight', value: (iframeViewer.clientHeight * 0.8) + 'px'});
          iframeViewer.setSlotChange({slot: 'scale', value: 'auto'});
        }, 900);
        next({slot: 'definitions', value: definitions});
      }
    }
  };

  function setUpModal () {
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
  }

  document.addEventListener('cifReady', function () {
    setUpModal();
    setTimeout(function () {
      document.querySelector('cubx-iframe-viewer').setArtifactInfo({
        webpackageId: 'cubx-generic-component-viewer@1.1.1',
        artifactId: 'cubx-generic-component-viewer',
        inits: {
          viewerHeight: '20em'
        },
        dependencies: [
          {
            webpackageId: 'bootstrap-3.3.5@1.1.1',
            artifactId: 'bootstrap-bootstrap-css-only'
          }
        ]
      });
    }, 1000);
  });
})();
