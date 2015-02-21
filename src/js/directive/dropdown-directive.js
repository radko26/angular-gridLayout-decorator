define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('dropdown-directive',[])
    .directive('dropdownDirective', [ function() {
     return{
      scope : {
       

      },
      link: function(scope,elem){
       
          $('.row').children('.layout-column').each(function(){
              var children = $(this).children();
              $(this).empty();
              $(this).prepend('<div class="column"></div>');
              $('.column').prepend(children);
          });

          function addSortable(){
              $(function() {
                  $( ".column" ).sortable({
                    connectWith: ".column",
                    handle: ".portlet-header",
                    cancel: ".portlet-toggle",
                    placeholder: "portlet-placeholder ui-corner-all"
                  });
                });
          }

          function changeColumnsSizes(newColumnsSizes){
              var counter = 0;
                  $('.row').children('.layout-column').each(function(){

                    var classes = $(this).attr("class").split(' ');
                    var element = $(this);
                    $.each(classes, function(i, c) {
                        if (c.indexOf("col-") == 0) {
                            element.removeClass(c);
                        }
                    });

                      var newClass = ('col-md-{size} col-xs-{size} col-sm-{size} col-lg-{size}').replace(/{size}/g,newColumnsSizes[counter++]);
                      $(this).addClass(newClass);
                      
                  });
                
          }

          scope.$watch('option',function(newValue,oldValue){
              
              
              var newColumnsSizes = newValue.split(',');
              var oldColumnsSizes = oldValue.split(',');
              
              if(newColumnsSizes.length < oldColumnsSizes.length){
                  
                var extraColumns = oldColumnsSizes.length - newColumnsSizes.length;
                var elements  = [];
                 while(extraColumns > 0){
                    elements.push( $('.layout-column:last-child > .column').children() );
                    console.log(elements);
                    $('.layout-column:last-child').remove();
                    extraColumns--;
                 } 
                 $('.layout-column:last-child > .column').append(elements);
                  changeColumnsSizes(newColumnsSizes);
              }else if(newColumnsSizes.length > oldColumnsSizes.length){
                  changeColumnsSizes(newColumnsSizes);
                  var counter = oldColumnsSizes.length;
                  while(counter < newColumnsSizes.length ){
                    var newColumn = ('<div class="layout-column col-md-{size} col-xs-{size} col-sm-{size} col-lg-{size}"><div class="column"></div></div>').replace(/{size}/g,newColumnsSizes[counter++]);
                    $('.row').append(newColumn);

                  }

              }else{
                changeColumnsSizes(newColumnsSizes);

              }


              addSortable();

          });

      },
        templateUrl: "template/dropdown.html"
     };
   }])

  }
);