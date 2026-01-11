<script lang="ts">
import BlocklyWorkspace from './BlocklyWorkspace.svelte';
let number = 0;
</script>

<div class="container">
    <BlocklyWorkspace onWorkspaceChange="{(event) => console.log(number++)}" />
</div>

<style>
.container {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
}
</style>
