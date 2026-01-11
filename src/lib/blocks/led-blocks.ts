export async function defineLEDToolBox() {
    await defineHuePickerBlock();
    await defineRGBBlock();
    await defineSetLEDBlock();
    await defineSetLEDRangeBlock();
    await defineSetAllLEDsBlock();
    await defineRunForeverBlock();
    await defineDelayBlock();
    await defineRepeatBlock();
    await defineMoveLEDBlock();
    await defineForEachPositionBlock();
    await defineMathBlock();
    await defineNumberBlock();
}

async function defineHuePickerBlock() {
    const Blockly = await import('blockly');
    const { FieldColour } = await import('@blockly/field-colour');
    
    Blockly.Blocks['led_hue_picker'] = {
        init: function () {
            const colourField = new FieldColour('#ff0000', undefined, {
                colourOptions: null,
                colourTitles: null,
            });
            
            this.appendDummyInput()
                .appendField("Hue")
                .appendField(colourField, 'COLOR');
            this.setOutput(true, 'Colour');
            this.setColour(160);
            this.setTooltip('Pick a color');
            this.setHelpUrl('');
        }
    };
}

async function defineRGBBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['led_rgb'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("RGB")
                .appendField("R:")
                .appendField(new Blockly.FieldNumber(255, 0, 255), 'R')
                .appendField("G:")
                .appendField(new Blockly.FieldNumber(0, 0, 255), 'G')
                .appendField("B:")
                .appendField(new Blockly.FieldNumber(0, 0, 255), 'B');
            this.setOutput(true, 'Colour');
            this.setColour(160);
            this.setTooltip('Set RGB color values (0-255)');
            this.setHelpUrl('');
        }
    };
}

async function defineSetLEDBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['led_set_single'] = {
        init: function () {
            this.appendValueInput('LED_NUM')
                .setCheck('Number')
                .appendField("Set LED");
            this.appendValueInput('COLOR')
                .setCheck('Colour')
                .appendField("to");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('Set a single LED to a color');
            this.setHelpUrl('');
        }
    };
}

async function defineSetLEDRangeBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['led_set_range'] = {
        init: function () {
            this.appendValueInput('COLOR')
                .setCheck('Colour')
                .appendField("Set LEDs")
                .appendField(new Blockly.FieldNumber(0, 0, 255), 'START')
                .appendField("to")
                .appendField(new Blockly.FieldNumber(10, 0, 255), 'END')
                .appendField("to");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('Set a range of LEDs to a color');
            this.setHelpUrl('');
        }
    };
}

async function defineSetAllLEDsBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['led_set_all'] = {
        init: function () {
            this.appendValueInput('COLOR')
                .setCheck('Colour')
                .appendField("Set All LEDs to");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('Set all LEDs to a color');
            this.setHelpUrl('');
        }
    };
}

async function defineRunForeverBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['run_forever'] = {
        init: function () {
            this.appendStatementInput('DO')
                .appendField("Run Forever");
            this.setColour(120);
            this.setTooltip('Main loop that runs forever');
            this.setDeletable(false);  // Can't be deleted
            this.setMovable(false);    // Can't be moved
            this.setEditable(false);   // Can't be edited
        }
    };
}

async function defineDelayBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['delay'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Delay")
                .appendField(new Blockly.FieldNumber(1000, 0), 'MILLISECONDS')
                .appendField("ms");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
            this.setTooltip('Wait for a specified time in milliseconds');
            this.setHelpUrl('');
        }
    };
}

async function defineRepeatBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['repeat_times'] = {
        init: function () {
            this.appendStatementInput('DO')
                .appendField("Repeat")
                .appendField(new Blockly.FieldNumber(3, 1), 'TIMES')
                .appendField("times");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('Repeat the blocks inside a specified number of times');
            this.setHelpUrl('');
        }
    };
}

async function defineMoveLEDBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['move_led'] = {
        init: function () {
            this.appendValueInput('COLOR')
                .setCheck('Colour')
                .appendField("Move LED from")
                .appendField(new Blockly.FieldNumber(0, 0, 255), 'FROM')
                .appendField("to")
                .appendField(new Blockly.FieldNumber(10, 0, 255), 'TO')
                .appendField("with");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(330);
            this.setTooltip('Move an LED from one position to another');
            this.setHelpUrl('');
        }
    };
}

async function defineForEachPositionBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['for_each_position'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("For each")
                .appendField(new Blockly.FieldVariable('position'), 'VAR')
                .appendField("in range")
                .appendField(new Blockly.FieldNumber(0, 0, 255), 'FROM')
                .appendField("to")
                .appendField(new Blockly.FieldNumber(10, 0, 255), 'TO');
            this.appendStatementInput('DO')
                .appendField("do");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('Loop through each position in a range');
            this.setHelpUrl('');
        }
    };
}

async function defineMathBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['math_arithmetic'] = {
        init: function () {
            this.appendValueInput('A')
                .setCheck('Number');
            this.appendValueInput('B')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ['+', 'ADD'],
                    ['-', 'SUBTRACT'],
                    ['×', 'MULTIPLY'],
                    ['÷', 'DIVIDE']
                ]), 'OP');
            this.setInputsInline(true);
            this.setOutput(true, 'Number');
            this.setColour(230);
            this.setTooltip('Math operations');
            this.setHelpUrl('');
        }
    };
}

async function defineNumberBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['math_number'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldNumber(0), 'NUM');
            this.setOutput(true, 'Number');
            this.setColour(230);
            this.setTooltip('A number');
            this.setHelpUrl('');
        }
    };
}

export const ledToolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Colors',
            colour: '160',
            contents: [
                {
                    kind: 'block',
                    type: 'led_hue_picker'
                },
                {
                    kind: 'block',
                    type: 'led_rgb'
                }
            ]
        },
        {
            kind: 'category',
            name: 'LED Control',
            colour: '230',
            contents: [
                {
                    kind: 'block',
                    type: 'led_set_single'
                },
                {
                    kind: 'block',
                    type: 'led_set_range'
                },
                {
                    kind: 'block',
                    type: 'led_set_all'
                }
            ]
        },
        {
            kind: 'category',
            name: 'Control',
            colour: '290',
            contents: [
                {
                    kind: 'block',
                    type: 'delay'
                },
                {
                    kind: 'block',
                    type: 'repeat_times'
                }
            ]
        },
        {
            kind: 'category',
            name: 'Position Loop',
            colour: '120',
            contents: [
                {
                    kind: 'block',
                    type: 'for_each_position'
                },
                {
                    kind: 'block',
                    type: 'led_set_single',
                    inputs: {
                        LED_NUM: {
                            block: {
                                type: 'variables_get',
                                fields: {
                                    VAR: 'position'
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            kind: 'category',
            name: 'Variables',
            colour: '330',
            custom: 'VARIABLE'
        },
        {
            kind: 'category',
            name: 'Math',
            colour: '230',
            contents: [
                {
                    kind: 'block',
                    type: 'math_number'
                },
                {
                    kind: 'block',
                    type: 'math_arithmetic'
                }
            ]
        },
        {
            kind: 'category',
            name: 'Movement',
            colour: '210',
            contents: [
                {
                    kind: 'block',
                    type: 'move_led'
                }
            ]
        }
    ]
};
