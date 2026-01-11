<script lang="ts">
import { onMount } from 'svelte';
import { defineLEDToolBox, ledToolbox } from '$lib/blocks/led-blocks';

let {
  initialXml = '',
  onWorkspaceChange = undefined
} = $props();

let workspaceDiv: HTMLDivElement;
let workspace: any = $state(null);

onMount(async () => {
  const Blockly = await import('blockly');
  const { registerFieldColour } = await import('@blockly/field-colour');
  registerFieldColour();
  await defineLEDToolBox();

  workspace = Blockly.inject(workspaceDiv, {
    toolbox: ledToolbox,
    grid: {
      spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    },
    trashcan: true,
  });

  // Load initial XML or create the run forever block
  if (initialXml) {
    const xml = Blockly.utils.xml.textToDom(initialXml);
    Blockly.Xml.domToWorkspace(xml, workspace);
  } else {
    // Create the run forever block at the start
    const runForeverBlock = workspace.newBlock('run_forever');
    runForeverBlock.moveBy(20, 20);
    runForeverBlock.initSvg();
    runForeverBlock.render();
  }

  if (onWorkspaceChange) {
    workspace.addChangeListener((event: any) => {
      onWorkspaceChange(workspace, event);
    });
  }

  return () => {
    if (workspace) {
      workspace.dispose();
    }
  };
});

export function getXml() {
  if (!workspace) return '';
  const xml = Blockly.Xml.workspaceToDom(workspace);
  return Blockly.Xml.domToText(xml);
}

export function getWorkspace() {
  return workspace;
}
</script>

<div bind:this={workspaceDiv} class="blockly-workspace"></div>

<style>
.blockly-workspace {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
