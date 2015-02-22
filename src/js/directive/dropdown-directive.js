define(
    ['angular'],
    function(angular) {
        'use strict';

        angular
            .module('dropdown-directive', [])
            .directive('dropdownDirective', ['$sce', function($sce) {

                function generateDropdownOptionView(option) {
                    var seed = 142 / 12;
                    var view = '<div style="border:2px solid #a7a7a7;height:20px;">{content}</div>';
                    var content = '';
                    var sizes = option.split(',');
                    for (var i = 0; i < sizes.length; i++) {
                        content += '<div style="' + ((i == sizes.length - 1) ? '' : 'border-right:2px solid #a7a7a7;') + 'height:100%;position:relative;float:left;width:' + (sizes[i] * seed) + 'px; "></div>';
                    }
                    view = view.replace('{content}', content);
                    return view;
                }



                function addSortable(connectorSelector, handleSelector, placeholderSelector) {
                    $(function() {
                        $(connectorSelector).sortable({
                            connectWith: connectorSelector,
                            handle: handleSelector,
                            placeholder: placeholderSelector + ' ui-corner-all'
                        });
                    });
                }

                function changeColumnsSizes(newColumnsSizes, rowSelector, childrenSelector) {
                    var counter = 0;
                    $(rowSelector).children(childrenSelector).each(function() {
                        var classes = $(this).attr("class").split(' ');
                        var element = $(this);
                        $.each(classes, function(i, c) {
                            if (c.indexOf("col-") == 0) {
                                element.removeClass(c);
                            }
                        });

                        var newClass = ('col-md-{size} col-xs-{size} col-sm-{size} col-lg-{size}').replace(/{size}/g, newColumnsSizes[counter++]);
                        $(this).addClass(newClass);

                    });
                }

                function makeClass(name) {
                    return '.' + name;
                }

                function makelastChildSelector(name) {
                    return name + ':last-child';
                }

                return {
                    scope: {
                        layoutRow: '@layoutRow',
                        layoutColumn: '@layoutColumn',
                        draggableColumn: '@draggableColumn',
                        draggableHandle: '@draggableHandle',
                        draggablePlaceholder: '@draggablePlaceholder'
                    },
                    link: function(scope, elem) {
                        scope.generateDropdownOptionView = function(option) {
                            return $sce.trustAsHtml(generateDropdownOptionView(option));
                        }


                        $(makeClass(scope.layoutRow)).children(makeClass(scope.layoutColumn)).each(function() {
                            var children = $(this).children();
                            $(this).empty();
                            $(this).prepend('<div class=" ' + scope.draggableColumn + ' "></div>');
                            $(makeClass(scope.draggableColumn)).prepend(children);
                        });

                        scope.$watch('option', function(newValue, oldValue) {

                            var newColumnsSizes = newValue.split(',');
                            var oldColumnsSizes = oldValue.split(',');

                            if (newColumnsSizes.length < oldColumnsSizes.length) {

                                var extraColumns = oldColumnsSizes.length - newColumnsSizes.length;
                                var elements = [];
                                while (extraColumns > 0) {
                                    elements.push($(makelastChildSelector(makeClass(scope.layoutColumn)) + ' > ' + makeClass(scope.draggableColumn)).children());
                                    console.log(elements);
                                    $(makelastChildSelector(makeClass(scope.layoutColumn))).remove();
                                    extraColumns--;
                                }
                                $(makelastChildSelector(makeClass(scope.layoutColumn)) + ' > ' + makeClass(scope.draggableColumn)).append(elements);

                            } else {


                                var counter = oldColumnsSizes.length;
                                while (counter < newColumnsSizes.length) {
                                    var newColumn = ('<div class=" ' + scope.layoutColumn + ' col-md-{size} col-xs-{size} col-sm-{size} col-lg-{size}"><div class="' + scope.draggableColumn + '"></div></div>').replace(/{size}/g, newColumnsSizes[counter++]);
                                    $(makeClass(scope.layoutRow)).append(newColumn);
                                }

                            }

                            changeColumnsSizes(newColumnsSizes, makeClass(scope.layoutRow), makeClass(scope.layoutColumn));
                            addSortable(makeClass(scope.draggableColumn), makeClass(scope.draggableHandle), scope.draggablePlaceholder);
                        });

                    },
                    templateUrl: 'template/dropdown.html'
                };
            }]);
    }
);