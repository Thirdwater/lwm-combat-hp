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


/*global $ */ // So we can use easyTooltip.js
(function($) {

    'use strict';

    function main() {
        /*global war_scr */
        console.log(window);
        console.log(window.params);
        console.log(window.stage[war_scr].obj);

        var add_total_hp_node = function() {
            // Format becomes very messy, look for other alternatives.
            var hp_row = document.getElementById('cre_info_health').parentNode;
            var column = hp_row.parentNode;
            var next_row = hp_row.nextSibling.nextSilbing;

            var total_hp_row = document.createElement('div');
            var br_node = document.createElement('br');
            total_hp_row.style = 'background-image: url("https://dcdn.lordswm.com/i/combat/icons/attr_hit_points.png?v=6"); min-width: 139px;';
            total_hp_row.className = 'info_row';

            var total_hp_label = document.createElement('div');
            var total_hp_value = document.createElement('div');
            total_hp_label.innerHTML = "Total";
            total_hp_value.innerHTML = "1/1";

            total_hp_row.append(total_hp_label);
            total_hp_row.append(total_hp_value);

            column.insertBefore(total_hp_row, next_row);
            column.insertBefore(br_node, next_row);
        };
        var add_total_hp_tooltip = function() {
            var hp_row = document.getElementById('cre_info_health').parentNode;
            hp_row.classList.add('for_tooltip');
            hp_row.id = 'total_health';
            $('div#total_health').easyTooltip({
                useElement: 'total_health_desc'
            });

            var description_lists = document.getElementById('caster_desc').parentNode;
            var total_hp_description = document.createElement('div');
            total_hp_description.id = 'total_health_desc';
            total_hp_description.style = 'display: none;';
            total_hp_description.innerHTML = "Lorem ipsum";
            description_lists.append(total_hp_description);
        };
        var get_stack = function(stack_id) {
            return window.stage[war_scr].obj[stack_id];
        };
        var update_total_hp = function(stack_id) {
            var total_hp_description = document.getElementById('total_health_desc');
            var stack = get_stack(stack_id);
            var max_stack_size = stack.maxnumber;
            var current_stack_size = stack.nownumber;
            var max_max_hp = stack.realhealth;
            var current_max_hp = stack.maxhealth;
            var current_hp = stack.nowhealth;

            var stack_max_hp = max_stack_size * max_max_hp;
            var stack_base_current_hp = (current_stack_size - 1) * current_max_hp;
            var stack_head_current_hp = current_hp;
            var stack_current_hp = stack_base_current_hp + stack_head_current_hp;

            total_hp_description.innerHTML = stack_current_hp + "/" + stack_max_hp;
        };

        add_total_hp_tooltip();
        var onInfoWindowOpen = function(event) {
            /*global cur_unit_info */
            var stack_id = cur_unit_info;
            update_total_hp(stack_id);
        };

        var stage = document.getElementById(war_scr);
        stage.addEventListener('mouseup', onInfoWindowOpen);
        stage.addEventListener('touchend', onInfoWindowOpen);
    }

    // Inject main into the document so we can access window object.
    // See: https://stackoverflow.com/a/10828021/
    var script = document.createElement('script');
    script.type = "text/javascript";
    // script.textContent = "(" + main.toString() + ")();";
    script.textContent = "setTimeout(" + main.toString() + ", 2000);";
    document.body.appendChild(script);

})($);
