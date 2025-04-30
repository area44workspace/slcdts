(($) => {
  const $window = $(window);
  const $body = $("body");
  const $wrapper = $("#wrapper");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Transitions supported?
  if (browser.canUse("transition")) {
    // Play initial animations on page load.
    $window.on("load", () => {
      window.setTimeout(() => {
        $body.removeClass("is-preload");
      }, 100);
    });

    // Prevent transitions/animations on resize.
    let resizeTimeout;

    $window.on("resize", () => {
      window.clearTimeout(resizeTimeout);

      $body.addClass("is-resizing");

      resizeTimeout = window.setTimeout(() => {
        $body.removeClass("is-resizing");
      }, 100);
    });
  }

  // Scroll back to top.
  $window.scrollTop(0);

  // Panels.
  const $panels = $(".panel");

  $panels.each(function () {
    const $this = $(this);
    const $toggles = $(`[href="#${$this.attr("id")}"]`);
    const $closer = $('<div class="closer" />').appendTo($this);

    // Closer.
    $closer.on("click", (event) => {
      $this.trigger("---hide");
    });

    // Events.
    $this
      .on("click", (event) => {
        event.stopPropagation();
      })
      .on("---toggle", () => {
        if ($this.hasClass("active")) $this.triggerHandler("---hide");
        else $this.triggerHandler("---show");
      })
      .on("---show", () => {
        // Hide other content.
        if ($body.hasClass("content-active")) $panels.trigger("---hide");

        // Activate content, toggles.
        $this.addClass("active");
        $toggles.addClass("active");

        // Activate body.
        $body.addClass("content-active");
      })
      .on("---hide", () => {
        // Deactivate content, toggles.
        $this.removeClass("active");
        $toggles.removeClass("active");

        // Deactivate body.
        $body.removeClass("content-active");
      });

    // Toggles.
    $toggles
      .removeAttr("href")
      .css("cursor", "pointer")
      .on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        $this.trigger("---toggle");
      });
  });

  // Global events.
  $body.on("click", (event) => {
    if ($body.hasClass("content-active")) {
      event.preventDefault();
      event.stopPropagation();

      $panels.trigger("---hide");
    }
  });

  $window.on("keyup", (event) => {
    if (event.keyCode === 27 && $body.hasClass("content-active")) {
      event.preventDefault();
      event.stopPropagation();

      $panels.trigger("---hide");
    }
  });

  // Main.
  const $main = $("#main");

  // Thumbs.
  $main.children(".thumb").each(function () {
    const $this = $(this);
    const $image = $this.find(".image");
    const $image_img = $image.children("img");

    // No image? Bail.
    if ($image.length === 0) return;

    // Image.
    // This sets the background of the "image" <span> to the image pointed to by its child
    // <img> (which is then hidden). Gives us way more flexibility.

    // Set background.
    $image.css("background-image", `url(${$image_img.attr("src")})`);

    // Set background position.
    const x = $image_img.data("position");
    if (x) $image.css("background-position", x);

    // Hide original img.
    $image_img.hide();
  });

  // Poptrox.
  $main.poptrox({
    baseZIndex: 20000,
    caption: ($a) => {
      let s = "";

      $a.nextAll().each(function () {
        s += this.outerHTML;
      });

      return s;
    },
    fadeSpeed: 300,
    onPopupClose: () => {
      $body.removeClass("modal-active");
    },
    onPopupOpen: () => {
      $body.addClass("modal-active");
    },
    overlayOpacity: 0,
    popupCloserText: "",
    popupHeight: 150,
    popupLoaderText: "",
    popupSpeed: 300,
    popupWidth: 150,
    selector: ".thumb > a.image",
    usePopupCaption: true,
    usePopupCloser: true,
    usePopupDefaultStyling: false,
    usePopupForceClose: true,
    usePopupLoader: true,
    usePopupNav: true,
    windowMargin: 50,
  });

  // Hack: Set margins to 0 when 'xsmall' activates.
  breakpoints.on("<=xsmall", () => {
    $main[0]._poptrox.windowMargin = 0;
  });

  breakpoints.on(">xsmall", () => {
    $main[0]._poptrox.windowMargin = 50;
  });
})(jQuery);
