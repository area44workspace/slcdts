(($) => {
  const $window = $(window);
  const $body = $("body");

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
  }

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
