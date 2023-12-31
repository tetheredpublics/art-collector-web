export const isMobile = {
    Android: function () {
        return window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return window.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return (
            window.navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
        );
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};