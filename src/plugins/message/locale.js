/**
 * Locale module.
 *
 * @module
 */

/**
 * @constant
 */
module.exports = {
  PLUGIN_NAME: {
    en: 'DD Framework - Message Plugin'
  },
  PLUGIN_DESCRIPTION: {
    en: 'Message plugin for the Dank Developer framework.'
  },
  PLUGIN_AUTHOR: {
    en: 'kidthales <kidthales@agogpixel.com>'
  },
  PLUGIN_HELP: {
    en: require('./help.en.txt')
  },

  AC_PRINT_MESSAGES_001_NAME: {
    en: '[DD] [Message] Print Messages Mk I'
  },
  AC_PRINT_MESSAGES_001_DESCRIPTION: {
    en: 'Print a series of messages to implicit HUD layer. Uses relative positioning. Provides OK/CANCEL/EXPEDITE functionality.'
  },
  AC_PRINT_MESSAGES_002_NAME: {
    en: '[DD] [Message] Print Messages Mk II'
  },
  AC_PRINT_MESSAGES_002_DESCRIPTION: {
    en: 'Print a series of messages to implicit HUD layer, with graphical panel background. Uses relative positioning. Provides OK/CANCEL/EXPEDITE functionality.'
  },
  AC_PRINT_MESSAGES_003_NAME: {
    en: '[DD] [Message] Print Messages Mk III'
  },
  AC_PRINT_MESSAGES_003_DESCRIPTION: {
    en: 'Print a series of messages to implicit HUD layer, with 9-slice panel background. Uses relative positioning. Provides OK/CANCEL/EXPEDITE functionality.'
  },

  ERROR_OBJECT_INSTANCE_MISSING: {
    en: 'Object instance missing.'
  },
  ERROR_OK_SWITCH_MISSING: {
    en: 'OK switch missing.'
  },
  ERROR_MESSAGES_INVALID: {
    en: 'Input messages invalid.'
  },
  ERROR_PAGES_INVALID: {
    en: 'Processed messages invalid.'
  },
  ERROR_BACKGROUND_INVALID: {
    en: 'Background invalid.'
  },
  ERROR_BACKGROUND_IMAGE: {
    en: 'Background image not provided.'
  },

  PARAM_OBJECT_INSTANCE_MODE: {
    en: 'Object Instance Mode:'
  },

  PARAM_MESSAGES: {
    en: 'Messages:'
  },
  PARAM_MESSAGES_DESCRIPTION: {
    en: 'Required. JSON array of text IDs and/or message config objects (see "Help"\nfor more details).'
  },

  PARAM_PRINT_SPEED: {
    en: 'Print Speed:'
  },
  PARAM_CLEAR_SPEED: {
    en: 'Clear Speed:'
  },
  PARAM_LETTER_SPEED_DESCRIPTION: {
    en: 'Letters per second. A value of 0 will print or clear all letters immediately.'
  },

  PARAM_OVERRIDE_FONT: {
    en: 'Override Font:'
  },
  PARAM_OVERRIDE_FONT_DESCRIPTION: {
    en: 'Optional. When set, will be used instead of the font associated with a\ngiven text ID.'
  },

  PARAM_HORIZONTAL_TEXT_ALIGN: {
    en: 'Horizontal Text\nAlignment:'
  },
  PARAM_VERTICAL_TEXT_ALIGN: {
    en: 'Vertical Text\nAlignment:'
  },
  PARAM_MARGIN_LEFT: {
    en: 'Margin Left:'
  },
  PARAM_MARGIN_RIGHT: {
    en: 'Margin Right:'
  },
  PARAM_MARGIN_TOP: {
    en: 'Margin Top:'
  },
  PARAM_MARGIN_BOTTOM: {
    en: 'Margin Bottom:'
  },

  PARAM_COLOR_CHANNEL_RED: {
    en: 'Color Channel Red:'
  },
  PARAM_COLOR_CHANNEL_GREEN: {
    en: 'Color Channel Green:'
  },
  PARAM_COLOR_CHANNEL_BLUE: {
    en: 'Color Channel Blue:'
  },
  PARAM_OPACITY: {
    en: 'Opacity:'
  },
  'PARAM_SCALE_X_%': {
    en: 'Scale X (%):'
  },
  'PARAM_SCALE_Y_%': {
    en: 'Scale Y (%):'
  },

  PARAM_PRINTING_SFX: {
    en: 'Printing SFX:'
  },
  PARAM_SFX_DESCRIPTION: {
    en: 'Optional. When set, sound effect will play for each print event emitted;\ncool down time is applied.'
  },

  PARAM_HORIZONTAL_POSITION: {
    en: 'Horizontal\nPosition:'
  },
  PARAM_VERTICAL_POSITION: {
    en: 'Vertical\nPosition:'
  },
  PARAM_OFFSET_X: {
    en: 'Offset X:'
  },
  PARAM_OFFSET_Y: {
    en: 'Offset Y:'
  },

  PARAM_INDICATOR_IMAGE: {
    en: 'Indicator Image:'
  },
  PARAM_INDICATOR_IMAGE_FRAME_X: {
    en: 'Indicator Image\nFrame X:'
  },
  PARAM_INDICATOR_IMAGE_FRAME_Y: {
    en: 'Indicator Image\nFrame Y:'
  },
  PARAM_INDICATOR_IMAGE_FRAME_WIDTH: {
    en: 'Indicator Image\nFrame Width:'
  },
  PARAM_INDICATOR_IMAGE_FRAME_HEIGHT: {
    en: 'Indicator Image\nFrame Height:'
  },
  PARAM_INDICATOR_DESCRIPTION: {
    en: 'Optional. When set, image of specified size will be used; otherwise,\ndefaults to a graphical indicator. Effected by color, opacity, & scale.'
  },

  PARAM_OK_SWITCH_SOURCE: {
    en: 'OK Switch\nSource:'
  },
  PARAM_OK_SWITCH: {
    en: 'OK Switch:'
  },
  PARAM_OK_DESCRIPTION: {
    en: 'Required. When switch is ON, and the printer is accepting input, will\nadvance to next message or end (and sets switch to OFF).'
  },

  PARAM_CANCEL_SWITCH_SOURCE: {
    en: 'CANCEL Switch\nSource:'
  },
  PARAM_CANCEL_SWITCH: {
    en: 'CANCEL Switch:'
  },
  PARAM_CANCEL_DESCRIPTION: {
    en: 'Optional. When switch is ON, cancels all operations immediately (and sets\nswitch to OFF).'
  },

  PARAM_EXPEDITE: {
    en: 'Enable Expedite:'
  },
  PARAM_EXPEDITE_DESCRIPTION: {
    en: 'When TRUE and the OK switch is set to ON, currently printing message\nwill finish immediately.'
  },

  PARAM_OPEN_CLOSE_DELTA_X: {
    en: 'Open/Close Delta X:'
  },
  PARAM_OPEN_CLOSE_DELTA_Y: {
    en: 'Open/Close Delta Y:'
  },
  PARAM_OPEN_CLOSE_DESCRIPTION: {
    en: 'Interpolation delta applied each frame. A value of 1 will open or close the\naxis immediately.'
  },

  PARAM_BACKGROUND_COLOR_CHANNEL_RED: {
    en: 'Background Color\nChannel Red:'
  },
  PARAM_BACKGROUND_COLOR_CHANNEL_GREEN: {
    en: 'Background Color\nChannel Green:'
  },
  PARAM_BACKGROUND_COLOR_CHANNEL_BLUE: {
    en: 'Background Color\nChannel Blue:'
  },
  PARAM_BACKGROUND_OPACITY: {
    en: 'Background Opacity:'
  },
  PARAM_BORDER_THICKNESS_PX: {
    en: 'Border Thickness (px):'
  },
  PARAM_BORDER_COLOR_CHANNEL_RED: {
    en: 'Border Color\nChannel Red:'
  },
  PARAM_BORDER_COLOR_CHANNEL_GREEN: {
    en: 'Border Color\nChannel Green:'
  },
  PARAM_BORDER_COLOR_CHANNEL_BLUE: {
    en: 'Border Color\nChannel Blue:'
  },

  PARAM_BACKGROUND_IMAGE: {
    en: 'Background Image:'
  },
  PARAM_BACKGROUND_IMAGE_FRAME_X: {
    en: 'Background Image\nFrame X:'
  },
  PARAM_BACKGROUND_IMAGE_FRAME_Y: {
    en: 'Background Image\nFrame Y:'
  },
  PARAM_BACKGROUND_IMAGE_FRAME_WIDTH: {
    en: 'Background Image\nFrame Width:'
  },
  PARAM_BACKGROUND_IMAGE_FRAME_HEIGHT: {
    en: 'Background Image\nFrame Height:'
  },
  PARAM_BACKGROUND_CAP_INSET_X: {
    en: 'Background Cap\nInset X:'
  },
  PARAM_BACKGROUND_CAP_INSET_Y: {
    en: 'Background Cap\nInset Y:'
  },
  PARAM_BACKGROUND_CAP_INSET_WIDTH: {
    en: 'Background Cap\nInset Width:'
  },
  PARAM_BACKGROUND_CAP_INSET_HEIGHT: {
    en: 'Background Cap\nInset Height:'
  },
  PARAM_IMAGE_PANEL_DESCRIPTION: {
    en: 'Required. 9-slice specified image using cap-inset. The cap-inset is the\ninner rectangle (non-border) area of the image.'
  },

  LEFT: {
    en: 'LEFT'
  },
  RIGHT: {
    en: 'RIGHT'
  },
  TOP: {
    en: 'TOP'
  },
  BOTTOM: {
    en: 'BOTTOM'
  },
  CENTER: {
    en: 'CENTER'
  },

  TRUE: {
    en: 'TRUE'
  },
  FALSE: {
    en: 'FALSE'
  },

  SELF: {
    en: 'SELF'
  },
  PARENT: {
    en: 'PARENT'
  }
};
