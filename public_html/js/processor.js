var Global = new Object();
var Apps = {
    active: "app-desktop",
    firstClick: [true, true, true, true, true, true, true, true, true, true],
    txtAdd: function () {
        $('.txt').each(function () {
            var txtId = $(this).attr('data-txtid');
            $(this).append(Text[txtId]);
        });
    },
    setUser: function () {
        var nickName = '<img class=\"cover-image\" src=\"images\/select.png\">' + User.nick + '\n';
        $('.active-user').empty();
        $('.active-user').append(nickName);
    },
    logout: function () {
        $('.txt[data-href="logout"]').on('click', function () {
            alert('user logout;')
            //session cancel, page redirect
        });
    },
    title: function () {
        var appId = '.app-select[data-href="' + Apps.active + '"]';
        var appTxtId = $(appId).attr('data-txtid');
        var titleName = Text[0] + ': ' + Text[appTxtId];
        $('title').empty();
        $('title').append(titleName);
    },
    show: function (appName) {
        $('.content').each(function () {
            $(this).css('display', 'none');
        });
        $('.app-select').each(function () {
            $(this).css('display', 'block');
        });
        $('.main-menu').each(function () {
            $(this).css('display', 'none');
        });
        var contentName = '.content[data-app="' + appName + '"]';
        var selectName = '.app-select[data-href="' + appName + '"]';
        var menuName = '.main-menu[data-app="' + appName + '"]';
        $(contentName).css('display', 'block');
        $(selectName).css('display', 'none');
        $(menuName).css('display', 'inline-block');
        this.active = appName;
        this.title();
    },
    init: function () {
        this.setUser();
        this.show(this.active);
    },
    dropDown: function () {
        $('.main-wrapper').on('click', '.drop-call', function () {
            var mtGroup = $(this).attr('data-group');
            $(".drop-down[data-group='" + mtGroup + "']").css('display', 'block');
        });
    },
    rollUp: function () {
        $(document).click(function (event) {
            for (var i = 0; i < Apps.firstClick.length; i++) {
                var menu = $('#menu' + i);
                if (menu.css('display') === 'block') {
                    if ((!Apps.firstClick[i]) && ($(event.target).closest(menu).length === 0)) {
                        menu.css('display', 'none');
                        Apps.firstClick[i] = true;
                        event.stopPropagation();
                    } else {
                        Apps.firstClick[i] = false;
                    }
                }
            }
        });
    },
    callApp: function () {
        $('.app-select').on('click', function () {
            var appName = $(this).attr('data-href');
            Apps.show(appName);
        });
    }
};

var Tasks = new Object();
var Contacts = new Object();
var Clients = new Object();
var Projects = new Object();
var Chat = new Object();

function isEmpty(objName) {
    for (var key in objName) {
        return false;
    }
    return true;
}
function countKeys(objName) {
    var keyCounter = 0;
    for (var key in objName) {
        keyCounter++;
    }
    return keyCounter;
}




$(document).ready(function () {
    Apps.txtAdd();
    Apps.init();
    Apps.dropDown();
    Apps.rollUp();
    Apps.callApp();
    Apps.logout();
});