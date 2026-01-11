export async function defineLEDToolBox() {
    await defineHuePickerBlock();
    await defineRGBBlock();
    await defineSetLEDBlock();
    await defineSetLEDRangeBlock();
    await defineSetAllLEDsBlock();
    await defineRunForeverBlock();
    await defineDelayBlock();
    await defineRepeatBlock();
    await defineForEachPositionBlock();
    await defineMathBlock();
    await defineNumberBlock();
    await defineMathSingleBlock();
    await defineMathModuloBlock();
    await defineMathRandomBlock();
    await defineMathMinMaxBlock();
    await defineConstantBlocks();
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
                .appendField("Set LED position");
            this.appendValueInput('COLOR')
                .setCheck('Colour')
                .appendField("tint");
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
            this.appendValueInput('START')
                .setCheck('Number')
                .appendField("Set LED position from");
            this.appendValueInput('END')
                .setCheck('Number')
                .appendField("to");
            this.appendValueInput('COLOR')
                .setCheck('Colour')
                .appendField("tint");
            this.setInputsInline(true);
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
                .appendField("Set all LEDs tint");
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
            this.appendValueInput('MILLISECONDS')
                .setCheck('Number')
                .appendField("Delay");
            this.appendDummyInput()
                .appendField("ms");
            this.setInputsInline(true);
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

async function defineForEachPositionBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['for_each_position'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("For each")
                .appendField(new Blockly.FieldVariable('position'), 'VAR')
                .appendField("in range");
            this.appendValueInput('FROM')
                .setCheck('Number');
            this.appendValueInput('TO')
                .setCheck('Number')
                .appendField("to");
            this.appendStatementInput('DO')
                .appendField("do");
            this.setInputsInline(true);
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
                    ['÷', 'DIVIDE'],
                    ['^', 'POWER']
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

async function defineMathSingleBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['math_single'] = {
        init: function () {
            this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ['abs', 'ABS'],
                    ['round', 'ROUND'],
                    ['floor', 'FLOOR'],
                    ['ceiling', 'CEILING']
                ]), 'OP');
            this.setInputsInline(true);
            this.setOutput(true, 'Number');
            this.setColour(230);
            this.setTooltip('Single number operations');
            this.setHelpUrl('');
        }
    };
}

async function defineMathModuloBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['math_modulo'] = {
        init: function () {
            this.appendValueInput('DIVIDEND')
                .setCheck('Number');
            this.appendValueInput('DIVISOR')
                .setCheck('Number')
                .appendField('%');
            this.setInputsInline(true);
            this.setOutput(true, 'Number');
            this.setColour(230);
            this.setTooltip('Remainder of division (modulo)');
            this.setHelpUrl('');
        }
    };
}

async function defineMathRandomBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['math_random'] = {
        init: function () {
            this.appendValueInput('FROM')
                .setCheck('Number')
                .appendField("random from");
            this.appendValueInput('TO')
                .setCheck('Number')
                .appendField("to");
            this.setInputsInline(true);
            this.setOutput(true, 'Number');
            this.setColour(230);
            this.setTooltip('Random number between two values');
            this.setHelpUrl('');
        }
    };
}

async function defineMathMinMaxBlock() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['math_minmax'] = {
        init: function () {
            this.appendValueInput('A')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ['min', 'MIN'],
                    ['max', 'MAX']
                ]), 'OP');
            this.appendValueInput('B')
                .setCheck('Number')
                .appendField('of');
            this.setInputsInline(true);
            this.setOutput(true, 'Number');
            this.setColour(230);
            this.setTooltip('Minimum or maximum of two numbers');
            this.setHelpUrl('');
        }
    };
}

async function defineConstantBlocks() {
    const Blockly = await import('blockly');
    
    Blockly.Blocks['constant_last'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("LAST");
            this.setOutput(true, 'Number');
            this.setColour(210);
            this.setTooltip('Last LED position (255)');
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
                    type: 'led_set_all'
                },
                {
                    kind: 'block',
                    type: 'led_set_range'
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
                },
                {
                    kind: 'block',
                    type: 'constant_last'
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
                },
                {
                    kind: 'block',
                    type: 'math_modulo'
                },
                {
                    kind: 'block',
                    type: 'math_single'
                },
                {
                    kind: 'block',
                    type: 'math_random'
                },
                {
                    kind: 'block',
                    type: 'math_minmax'
                }
            ]
        }
    ]
};
