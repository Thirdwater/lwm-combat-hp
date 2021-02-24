// ==UserScript==
// @name            LWM Combat HP
// @name:ru         HWM Combat HP
// @namespace       https://greasyfork.org/en/users/731199-thirdwater
// @description     Displays the HP information during combats
// @description:ru  Displays the HP information during combats
// @match           *://www.lordswm.com/war.php?*
// @match           *://www.heroeswm.ru/war.php?*
// @run-at          document-end
// @grant           none
// @version         0.1
// ==/UserScript==

(function() {

    'use strict';

    function main() {
        console.log(window);
        console.log(window.params);

        /*global war_scr, cur_unit_info */
        var stage = document.getElementById(war_scr);
        stage.addEventListener('mouseup', function(event) {
            var i = cur_unit_info;
            document.getElementById('cre_info_attack').innerHTML = "foo";
            document.getElementById('cre_info_defence').innerHTML = window.obj[i].nowhealth;
        });
        //stage.addEventListener('touchend', hp_touch_end_event);
    }

    // Inject main into the document so we can access window object.
    // See: https://stackoverflow.com/a/10828021/
    var script = document.createElement('script');
    script.type = "text/javascript";
    // script.textContent = "(" + main.toString() + ")();";
    script.textContent = "setTimeout(" + main.toString() + ", 2000);";
    document.body.appendChild(script);

})();
