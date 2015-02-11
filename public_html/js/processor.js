var Global = new Object();
var Apps = {
    active: "app-desktop",
    firstClick: [true, true, true, true, true, true, true, true, true, true],
    menuStatus: {
        menu0: "close",
        menu1: "close",
        menu2: "close",
        menu3: "close",
        menu4: "close",
        menu5: "close",
        menu6: "close",
        menu7: "close",
        menu8: "close",
        menu9: "close"
    },
    txtAdd: function () {
        $('.txt').each(function () {
            var txtId = $(this).attr('data-txtid');
            $(this).append(Text[txtId]);
        });
    },
    setUser: function () {
        //var nickName = '<img class=\"cover-image\" src=\"images\/select.png\">' + User.nick + '\n';
        var userPic;
        if (User.userpic === "undefined") {
            switch (User.sex) {
                case 'male':
                    userPic = '<img class=\"userpic\" width=\"60\" height=\"60\" src=\"\/kickass\/images\/icons\/mavatar.jpg\">';
                    break;
                case 'female':
                    userPic = '<img class=\"userpic\" width=\"60\" height=\"60\" src=\"\/kickass\/images\/icons\/wavatar.jpg\">';
                    break;
                default:
                    userPic = '<img class=\"userpic\" width=\"60\" height=\"60\" src=\"\/kickass\/images\/icons\/tavatar.jpg\">';
            }
        } else {
            //real userpic
        }
        $('.active-user').empty();
        $('.active-user').append(userPic);
    },
    logout: function () {
        $('.txt[data-href="logout"]').on('click', function () {
            alert('user logout;');
            //session cancel, page redirect
        });
    },
    title: function (appName) {
        var appTitle;
        switch (appName) {
            case 'app-desktop':
                appTitle = Text[1];
                break;
            case 'app-tasks':
                appTitle = Text[2];
                break;
            case 'app-contacts':
                appTitle = Text[3];
                break;
            case 'app-clients':
                appTitle = Text[4];
                break;
            case 'app-projects':
                appTitle = Text[5];
                break;
            case 'app-chat':
                appTitle = Text[6];
                break;
            default:
                appTitle = Text[0];
                break;
        }
        return appTitle;
    },
    docTitle: function () {
        var docTitle = Text[0] + ' | ' + Apps.title(Apps.active);
        $('title').empty();
        $('title').append(docTitle);
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
        $('.main-caption-name').empty();
        this.active = appName;
        $('.main-caption-name').append(Apps.title(Apps.active));
        this.docTitle();
    },
    init: function () {
        this.setUser();
        this.show(this.active);
    },
    dropDown: function () {
        $('.main-wrapper').on('click', '.drop-call', function () {
            var mtGroup = $(this).attr('data-group');
            var dropDown = $(".drop-down[data-group='" + mtGroup + "']");
            var menuId = dropDown.attr("id");
            if (Apps.menuStatus[menuId] === "close") {
                var slideWidth = dropDown.outerWidth(true);
                var marginSize = '-' + slideWidth + 'px';
                if (dropDown.hasClass('from-left')) {
                    dropDown.css('margin-left', marginSize);
                    dropDown.css('display', 'block');
                    dropDown.animate({'margin-left': 0}, 500);
                } else if (dropDown.hasClass('from-right')) {
                    dropDown.css('margin-right', marginSize);
                    dropDown.css('display', 'block');
                    dropDown.animate({'margin-right': 0}, 500);
                } else {
                    dropDown.css('opacity', '0');
                    dropDown.css('display', 'block');
                    dropDown.animate({'opacity': 1}, 500);
                }
                Apps.menuStatus[menuId] = "open";
            }
        });
    },
    rollUp: function () {
        $(document).click(function (event) {
            for (var i = 0; i < Apps.firstClick.length; i++) {
                var menu = $('#menu' + i);
                var menuId = 'menu' + i;
                if (menu.css('display') === 'block') {
                    if ((!Apps.firstClick[i]) && ($(event.target).closest(menu).length === 0)) {
                        menu.css('display', 'none');
                        Apps.firstClick[i] = true;
                        Apps.menuStatus[menuId] = "close";
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