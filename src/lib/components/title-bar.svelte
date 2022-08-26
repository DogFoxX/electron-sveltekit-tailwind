<script>
    // Component Props
    export let title, isMax;

    const windowAction = (e) => {
		switch (e.target.id) {
			case "max":
				mainWindow.toggleMax();
				break;
			case "min":
				mainWindow.minimize();
				break;
			default:
				mainWindow.close();
				break;
		}
    }

</script>

<div id="titlebar">
    <span class="mx-3 text-sm title">{title}</span>
    <span class="window-btns">
        <button on:click={windowAction} id="min" class="window-btn" tabindex="-1" title="Minimize">
			<svg width="10px" height="1px">
				<line x1="10" stroke="currentColor" stroke-width="2"/>
			</svg>
		</button>
		<button on:click={windowAction} id="max" class="window-btn" tabindex="-1" title="Maximize">
			{#if isMax}
				<svg width="12px" height="12px" viewBox="0 0 963 963">
					<path fill="currentColor" d="M241 331l90 0 301 0 0 301 0 90 0 150 -542 0 0 -542 150 0zm90 -241l542 0 0 542 -150 0 0 -391 -391 0 0 -150zm391 632l241 0 0 -722 -722 0 0 241 -241 0 0 722 722 0 0 -241z"/>
				</svg>
			{:else}
				<svg width="10px" height="10px">
					<rect width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" />
				</svg>
			{/if}
		</button>
		<button on:click={windowAction} id="close" class="window-btn" tabindex="-1" title="Close">
			<svg width="10px" height="10px">
				<line y1="10" x2="10" y2="0" stroke="currentColor" stroke-width="1"/>
				<line y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1"/>
			</svg>
		</button>
    </span>
</div>