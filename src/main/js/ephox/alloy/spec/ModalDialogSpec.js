define(
  'ephox.alloy.spec.ModalDialogSpec',

  [
    'ephox.alloy.spec.SpecSchema',
    'ephox.alloy.spec.UiSubstitutes',
    'ephox.boulder.api.FieldSchema',
    'ephox.highway.Merger',
    'ephox.perhaps.Option',
    'ephox.sugar.api.SelectorFind'
  ],

  function (SpecSchema, UiSubstitutes, FieldSchema, Merger, Option, SelectorFind) {
    var schema = [
      FieldSchema.strict('dom')
    ];

    var make = function (spec) {
      var detail = SpecSchema.asStructOrDie('modal-dialog', schema, spec, [
        'title',
        'close',
        'draghandle'
      ]);

      var placeholders = {
        '<alloy.dialog.title>': UiSubstitutes.single(
          Merger.deepMerge(
            detail.parts().title(),
            detail.parts().title().base,
            {
              uid: detail.partUids().title
            }
          )
        ),
        '<alloy.dialog.close>': UiSubstitutes.single(
          Merger.deepMerge(
            detail.parts().close(),
            detail.parts().close().base,
            {
              uid: detail.partUids().close
            }
          )
        ),
        '<alloy.dialog.draghandle>': UiSubstitutes.single(
          Merger.deepMerge(
            detail.parts().draghandle(),
            detail.parts().draghandle().base,
            {
              uid: detail.partUids().draghandle,
              dragging: {
                mode: 'mouse',
                getTarget: function (handle) {
                  return SelectorFind.ancestor(handle, '[role="dialog"]').getOr(handle);
                }
              }
            }
          )
        )
      };

      var components = UiSubstitutes.substitutePlaces(
        Option.some('modal-dialog'),
        detail,
        detail.components(),
        placeholders,
        { }
      );

      return Merger.deepMerge(
        spec,
        {
          uiType: 'custom',
          dom: detail.dom(),
          components: components,
          keying: {
            mode: 'cyclic'
          }
        }
      );
    };

    return {
      make: make
    };
  }
);