/**
 * NYC Clinic repeater — rows of inputs, add / delete / drag, image picker.
 * State lives in JS; on every change it is serialised into the hidden input
 * that the PHP save handler reads. No build step.
 */
(function ($) {
  "use strict";

  function init(el) {
    var $box = $(el);
    var config = $box.data("config");
    var $value = $box.siblings(".nyc-repeater-value");
    var rows = config.rows || [];
    var cols = config.columns;

    var $list = $('<div class="nyc-repeater-rows"></div>');
    var $add = $('<button type="button" class="button">+ Add row</button>');
    $box.append($list, $add);

    function emptyRow() {
      var row = {};
      Object.keys(cols).forEach(function (k) {
        row[k] = cols[k].type === "image" ? null : "";
      });
      return row;
    }

    function sync() {
      $value.val(
        JSON.stringify(
          rows.map(function (row) {
            var out = {};
            Object.keys(cols).forEach(function (k) {
              var v = row[k];
              out[k] = cols[k].type === "image" ? (v && v.id) || "" : v || "";
            });
            return out;
          })
        )
      );
    }

    function render() {
      $list.empty();
      rows.forEach(function (row, i) {
        var $row = $('<div class="nyc-repeater-row"></div>').attr("data-i", i);
        $row.append('<span class="nyc-repeater-handle dashicons dashicons-move" title="Drag to reorder"></span>');
        var $fields = $('<div class="nyc-repeater-fields"></div>');

        Object.keys(cols).forEach(function (k) {
          var col = cols[k];
          var $f = $(col.type === "image" ? '<div class="nyc-repeater-field"></div>' : '<label class="nyc-repeater-field"></label>').append(
            $("<span></span>").text(col.label)
          );
          if (col.type === "image") {
            var img = row[k];
            var $pick = $('<button type="button" class="button nyc-repeater-image"></button>');
            if (img && img.thumb) {
              $pick.append($("<img alt=''>").attr("src", img.thumb));
            } else {
              $pick.text("Select photo");
            }
            $pick.on("click", function () {
              var frame = wp.media({ title: col.label, library: { type: "image" }, multiple: false });
              frame.on("select", function () {
                var a = frame.state().get("selection").first().toJSON();
                var thumb = (a.sizes && a.sizes.thumbnail && a.sizes.thumbnail.url) || a.url;
                rows[i][k] = { id: a.id, thumb: thumb };
                sync();
                render();
              });
              frame.open();
            });
            $f.append($pick);
            if (img && img.id) {
              $f.append(
                $('<button type="button" class="button-link nyc-repeater-clear">Remove photo</button>').on(
                  "click",
                  function () {
                    rows[i][k] = null;
                    sync();
                    render();
                  }
                )
              );
            }
          } else {
            $f.append(
              $('<input type="text" class="widefat">')
                .val(row[k] || "")
                .on("input", function () {
                  rows[i][k] = this.value;
                  sync();
                })
            );
          }
          $fields.append($f);
        });

        $row.append($fields);
        $row.append(
          $('<button type="button" class="button-link nyc-repeater-delete" title="Delete row"><span class="dashicons dashicons-trash"></span></button>').on(
            "click",
            function () {
              rows.splice(i, 1);
              sync();
              render();
            }
          )
        );
        $list.append($row);
      });
    }

    $add.on("click", function () {
      rows.push(emptyRow());
      sync();
      render();
      $list.find(".nyc-repeater-row:last input:first").trigger("focus");
    });

    $list.sortable({
      handle: ".nyc-repeater-handle",
      axis: "y",
      update: function () {
        rows = $list
          .children()
          .map(function () {
            return rows[$(this).data("i")];
          })
          .get();
        sync();
        render();
      },
    });

    sync();
    render();
  }

  $(function () {
    $(".nyc-repeater").each(function () {
      init(this);
    });
  });
})(jQuery);
